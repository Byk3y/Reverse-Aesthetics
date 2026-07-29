"use server";

import { headers } from "next/headers";
import { publicClient } from "../lib/supabase/public";
import { normalizePhone } from "../lib/patients/format";
import { TREATMENTS } from "../components/booking/bookingData";

/**
 * The public intake link.
 *
 * Writes through `submit_intake()`, a security-definer function that only ever
 * inserts and returns a bare {ok:true}. Anon holds no read access to any CRM
 * table, so the worst a determined stranger achieves here is junk leads — the
 * same exposure as any public form, and the reason for the checks below.
 */

export interface IntakeInput {
  full_name: string;
  phone: string;
  email: string;
  clinic: string;
  treatment_interest: string[];
  message: string;
  marketing_consent: boolean;
  landing_page: string;
  source_detail: string;
}

export type IntakeResult = { ok: true } | { ok: false; error: string };

/**
 * Best-effort per-IP throttle. In-process, so it resets on redeploy and is not
 * shared between serverless instances — it is a speed bump, not a wall. The
 * real backstop is the two-minute duplicate guard inside `submit_intake()`.
 */
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function throttled(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);

  // Keep the map from growing without bound on a long-lived instance.
  if (recent.size > 500) {
    for (const [key, times] of recent) {
      if (times.every((t) => now - t >= WINDOW_MS)) recent.delete(key);
    }
  }

  return hits.length > MAX_PER_WINDOW;
}

const VALID_TREATMENTS = new Set(TREATMENTS.map((t) => t.id));

/**
 * There is deliberately NO honeypot and no timing gate here, and nothing in
 * this function may return success without writing.
 *
 * Both existed and both silently ate real patient enquiries: the form showed
 * the thank-you screen, the action returned {ok:true}, and nothing reached the
 * database — invisible from the browser and invisible in the admin. Two
 * separate real submissions were lost that way before the pattern was spotted.
 *
 * The trade is lopsided. This link is noindex, unlinked from anywhere, and
 * handed out one-to-one over WhatsApp, so drive-by spam bots do not find it.
 * A junk row costs one click to delete; a lost enquiry costs a patient and
 * nobody ever learns it happened. What remains is the per-IP throttle below
 * and the two-minute duplicate guard inside submit_intake(), both of which
 * fail *loudly* with a visible message.
 *
 * If spam ever becomes real, add Cloudflare Turnstile — it blocks with an
 * error the visitor can see, rather than pretending to have succeeded.
 */
export async function submitIntake(input: IntakeInput): Promise<IntakeResult> {
  const name = input.full_name.trim();
  if (name.length < 2) {
    return { ok: false, error: "Please enter your name." };
  }

  const phone = input.phone.trim();
  const email = input.email.trim();
  if (!phone && !email) {
    return { ok: false, error: "Please leave a phone number or an email address." };
  }

  if (phone) {
    const e164 = normalizePhone(phone);
    // +234 plus ten digits. Anything shorter is a typo, not a diaspora number.
    if (!e164 || e164.replace(/\D/g, "").length < 10) {
      return { ok: false, error: "That phone number doesn't look complete." };
    }
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  if (throttled(ip)) {
    return {
      ok: false,
      error: "That's a few submissions in a row — give it a few minutes.",
    };
  }

  const supabase = publicClient();
  if (!supabase) {
    console.error("[intake] Supabase is not configured — form submission dropped");
    return {
      ok: false,
      error: "We couldn't save that just now. Please message us on WhatsApp instead.",
    };
  }

  const { error } = await supabase.rpc("submit_intake", {
    payload: {
      full_name: name,
      phone: phone || null,
      email: email || null,
      clinic: input.clinic === "lagos" || input.clinic === "abuja" ? input.clinic : null,
      // Only ids we recognise, so a tampered payload can't write junk into the
      // column the admin filters on.
      treatment_interest: input.treatment_interest.filter((id) =>
        VALID_TREATMENTS.has(id)
      ),
      message: input.message.trim().slice(0, 2000) || null,
      marketing_consent: input.marketing_consent,
      landing_page: input.landing_page.slice(0, 300) || null,
      source_detail: input.source_detail.slice(0, 120) || null,
    },
  });

  if (error) {
    console.error("[intake] submit_intake:", error.message);
    return {
      ok: false,
      error: "We couldn't save that just now. Please message us on WhatsApp instead.",
    };
  }

  // No name or number here — server logs are not the place for patient
  // details. This exists purely so "did it save?" is answerable at a glance.
  console.info("[intake] saved a submission");
  return { ok: true };
}
