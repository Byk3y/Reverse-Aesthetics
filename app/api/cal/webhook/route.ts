import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { publicClient } from "@/app/lib/supabase/public";
import { BOOKING_CLINICS } from "@/app/components/booking/bookingData";

/**
 * Cal.com booking webhook → patient directory.
 *
 * This is what keeps the CRM honest. Nobody is going to retype every booking
 * into an admin panel, so every booking has to arrive on its own: Cal already
 * collects a name, an email, a required phone number and the `treatment`
 * select, which is exactly the shape of a patient row.
 *
 * Two locks, because this endpoint is public:
 *   1. Cal's own HMAC over the raw body (X-Cal-Signature-256).
 *   2. A shared token handed to `ingest_cal_booking()`, so a leaked anon key
 *      is not on its own enough to forge appointments.
 *
 * Both Cal accounts (Lagos and Abuja) point at this one URL; the organiser's
 * username in the payload decides which clinic the booking belongs to.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CalResponse = { value?: unknown } | string | number | null | undefined;

interface CalPayload {
  uid?: string;
  /** Seated events: identifies the person, where `uid` identifies the slot. */
  seatReferenceUid?: string;
  seatUid?: string;
  type?: string;
  title?: string;
  startTime?: string;
  endTime?: string;
  attendees?: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    seatReferenceUid?: string;
  }[];
  organizer?: { username?: string; email?: string; name?: string };
  eventType?: { slug?: string };
  responses?: Record<string, CalResponse>;
  userFieldsResponses?: Record<string, CalResponse>;
}

/** Cal sends fields either bare or wrapped in {label, value}. */
function readResponse(value: CalResponse): string | null {
  if (value == null) return null;
  if (typeof value === "string") return value.trim() || null;
  if (typeof value === "number") return String(value);
  if (typeof value === "object" && "value" in value) {
    const inner = (value as { value?: unknown }).value;
    if (typeof inner === "string") return inner.trim() || null;
    if (typeof inner === "number") return String(inner);
  }
  return null;
}

function pick(
  payload: CalPayload,
  key: string
): string | null {
  return (
    readResponse(payload.responses?.[key]) ??
    readResponse(payload.userFieldsResponses?.[key])
  );
}

function verify(rawBody: string, signature: string | null): boolean {
  const secrets = (process.env.CAL_WEBHOOK_SECRET ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (secrets.length === 0 || !signature) return false;

  const provided = Buffer.from(signature.trim().toLowerCase(), "utf8");

  // Both accounts may carry different secrets; any match is a pass.
  return secrets.some((secret) => {
    const expected = Buffer.from(
      createHmac("sha256", secret).update(rawBody).digest("hex"),
      "utf8"
    );
    if (expected.length !== provided.length) return false;
    return timingSafeEqual(expected, provided);
  });
}

export async function POST(request: Request) {
  const token = process.env.CAL_INGEST_TOKEN;
  if (!token || !process.env.CAL_WEBHOOK_SECRET) {
    console.error("[cal] webhook not configured — set CAL_WEBHOOK_SECRET and CAL_INGEST_TOKEN");
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  // The signature covers the exact bytes Cal sent, so the body must be read
  // as text and only parsed after it checks out.
  const rawBody = await request.text();
  const signature =
    request.headers.get("x-cal-signature-256") ??
    request.headers.get("X-Cal-Signature-256");

  if (!verify(rawBody, signature)) {
    console.warn("[cal] rejected a webhook with a bad signature");
    return NextResponse.json({ error: "bad signature" }, { status: 401 });
  }

  let body: { triggerEvent?: string; payload?: CalPayload };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const payload = body.payload ?? {};
  const uid = payload.uid;

  if (!uid) {
    // Nothing to key on. Accept it so Cal stops retrying, but say so.
    console.warn("[cal] webhook had no booking uid:", body.triggerEvent);
    return NextResponse.json({ ok: true, skipped: "no uid" });
  }

  const username = payload.organizer?.username ?? "";
  const clinic =
    BOOKING_CLINICS.find((c) => c.calUser === username)?.id ?? null;

  if (!clinic && username) {
    // A third city was added to Cal but not to bookingData.ts — the booking
    // still lands, it just won't be filed under a clinic until that's fixed.
    console.warn(`[cal] unknown organiser "${username}" — booking filed without a clinic`);
  }

  const attendee = payload.attendees?.[0];

  const supabase = publicClient();
  if (!supabase) {
    console.error("[cal] Supabase is not configured — booking dropped");
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  // Seated events (5 of the 6 have 3 seats) fire one webhook per seat, each
  // carrying only that seat's attendee. The seat uid is what makes three
  // patients in one 10:00 slot three rows instead of one; Cal puts it in more
  // than one place depending on the trigger, so check all of them.
  const seatUid =
    payload.seatReferenceUid ??
    payload.seatUid ??
    payload.attendees?.[0]?.seatReferenceUid ??
    null;

  const { error } = await supabase.rpc("ingest_cal_booking", {
    payload: {
      cal_booking_uid: uid,
      cal_seat_uid: seatUid,
      event: body.triggerEvent ?? "BOOKING_CREATED",
      cal_event_slug: payload.eventType?.slug ?? payload.type ?? null,
      clinic,
      title: payload.title ?? null,
      treatment: pick(payload, "treatment"),
      starts_at: payload.startTime ?? null,
      ends_at: payload.endTime ?? null,
      name: pick(payload, "name") ?? attendee?.name ?? null,
      email: pick(payload, "email") ?? attendee?.email ?? null,
      phone:
        pick(payload, "attendeePhoneNumber") ??
        pick(payload, "phone") ??
        attendee?.phoneNumber ??
        null,
      raw: body,
    },
    token,
  });

  if (error) {
    console.error("[cal] ingest_cal_booking:", error.message);
    // 500 makes Cal retry, which is what we want for a transient database
    // problem — the RPC is idempotent on cal_booking_uid.
    return NextResponse.json({ error: "ingest failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
