"use server";

import { revalidatePath } from "next/cache";
import { serverClient, currentAdmin } from "../supabase/server";
import type {
  Clinic,
  NoteKind,
  PatientSource,
  PatientStage,
} from "./types";

/**
 * Staff-side CRM writes. Every one re-checks `currentAdmin()` before touching
 * anything — RLS would refuse a non-admin anyway, but failing here gives a
 * readable message instead of a silent no-op.
 */

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export interface PatientInput {
  id?: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  clinic: Clinic | null;
  gender: "female" | "male" | "other" | "undisclosed" | null;
  date_of_birth: string | null;
  source: PatientSource;
  source_detail: string | null;
  stage: PatientStage;
  treatment_interest: string[];
  tags: string[];
  marketing_consent: boolean;
}

function refresh(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/patients");
  if (id) revalidatePath(`/admin/patients/${id}`);
}

/** Postgres tells us which unique index blew up; translate it for a human. */
function duplicateMessage(message: string): string | null {
  if (message.includes("patients_phone_e164_key")) {
    return "Another patient already has that phone number — open their record instead of creating a second one.";
  }
  if (message.includes("patients_email_key")) {
    return "Another patient already has that email address.";
  }
  return null;
}

export async function savePatient(
  input: PatientInput
): Promise<ActionResult<{ id: string }>> {
  const admin = await currentAdmin();
  if (!admin) return { ok: false, error: "Not authorised." };

  const name = input.full_name.trim();
  if (!name) return { ok: false, error: "A name is required." };

  const phone = input.phone?.trim() || null;
  const email = input.email?.trim().toLowerCase() || null;
  if (!phone && !email) {
    return { ok: false, error: "A phone number or an email address is required." };
  }

  const supabase = await serverClient();

  const row = {
    full_name: name,
    phone,
    email,
    clinic: input.clinic,
    gender: input.gender,
    date_of_birth: input.date_of_birth || null,
    source: input.source,
    source_detail: input.source_detail?.trim() || null,
    stage: input.stage,
    treatment_interest: input.treatment_interest,
    tags: input.tags.map((t) => t.trim()).filter(Boolean),
    marketing_consent: input.marketing_consent,
    last_activity_at: new Date().toISOString(),
  };

  const { data, error } = input.id
    ? await supabase
        .from("patients")
        .update(row)
        .eq("id", input.id)
        .select("id")
        .single()
    : await supabase.from("patients").insert(row).select("id").single();

  if (error) {
    return { ok: false, error: duplicateMessage(error.message) ?? error.message };
  }

  // Consent needs a timestamp the first time it is given — the intake RPC does
  // this in SQL, and a staff member ticking the box by hand must match.
  if (input.marketing_consent) {
    await supabase
      .from("patients")
      .update({ consent_at: new Date().toISOString(), consent_source: "staff" })
      .eq("id", data.id)
      .is("consent_at", null);
  }

  if (!input.id) {
    await supabase.from("patient_notes").insert({
      patient_id: data.id,
      kind: "system",
      body: `Added to the directory by ${admin.admin.full_name || admin.user.email}.`,
      author_id: admin.user.id,
    });
  }

  refresh(data.id);
  return { ok: true, data: { id: data.id } };
}

export async function setStage(
  id: string,
  stage: PatientStage
): Promise<ActionResult> {
  const admin = await currentAdmin();
  if (!admin) return { ok: false, error: "Not authorised." };

  const supabase = await serverClient();

  const { error } = await supabase
    .from("patients")
    .update({ stage, last_activity_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };

  await supabase.from("patient_notes").insert({
    patient_id: id,
    kind: "system",
    body: `Stage set to ${stage.replace(/_/g, " ")}.`,
    author_id: admin.user.id,
  });

  refresh(id);
  return { ok: true, data: undefined };
}

export async function addNote(
  patientId: string,
  kind: NoteKind,
  body: string
): Promise<ActionResult> {
  const admin = await currentAdmin();
  if (!admin) return { ok: false, error: "Not authorised." };

  const text = body.trim();
  if (!text) return { ok: false, error: "Write something first." };

  const supabase = await serverClient();

  const { error } = await supabase.from("patient_notes").insert({
    patient_id: patientId,
    kind,
    body: text,
    author_id: admin.user.id,
  });

  if (error) return { ok: false, error: error.message };

  await supabase
    .from("patients")
    .update({ last_activity_at: new Date().toISOString() })
    .eq("id", patientId);

  refresh(patientId);
  return { ok: true, data: undefined };
}

export interface VisitInput {
  patient_id: string;
  treatment: string;
  clinic: Clinic | null;
  performed_at: string;
  practitioner: string | null;
  amount: number;
  recall_weeks: number | null;
  notes: string | null;
}

export async function addVisit(input: VisitInput): Promise<ActionResult> {
  const admin = await currentAdmin();
  if (!admin) return { ok: false, error: "Not authorised." };

  if (!input.treatment.trim()) {
    return { ok: false, error: "Pick or name the treatment." };
  }

  const supabase = await serverClient();

  const { error } = await supabase.from("visits").insert({
    patient_id: input.patient_id,
    treatment: input.treatment.trim(),
    clinic: input.clinic,
    performed_at: input.performed_at,
    practitioner: input.practitioner?.trim() || null,
    amount: input.amount,
    recall_weeks: input.recall_weeks,
    notes: input.notes?.trim() || null,
  });

  if (error) return { ok: false, error: error.message };

  // Logging a visit is the moment someone stops being a lead. Second visit
  // onwards makes them a repeat patient — the number the clinic lives on.
  const { count } = await supabase
    .from("visits")
    .select("id", { count: "exact", head: true })
    .eq("patient_id", input.patient_id);

  const { data: current } = await supabase
    .from("patients")
    .select("stage")
    .eq("id", input.patient_id)
    .maybeSingle();

  // Never pull someone backwards: a dormant patient who comes in is treated,
  // but a repeat patient logging another visit stays repeat.
  const nextStage = (count ?? 0) > 1 ? "repeat" : "treated";
  const shouldPromote =
    current?.stage !== "repeat" || nextStage === "repeat";

  if (shouldPromote) {
    await supabase
      .from("patients")
      .update({ stage: nextStage, last_activity_at: new Date().toISOString() })
      .eq("id", input.patient_id);
  }

  refresh(input.patient_id);
  return { ok: true, data: undefined };
}

export async function deleteVisit(
  id: string,
  patientId: string
): Promise<ActionResult> {
  const admin = await currentAdmin();
  if (!admin) return { ok: false, error: "Not authorised." };

  const supabase = await serverClient();
  const { error } = await supabase.from("visits").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  refresh(patientId);
  return { ok: true, data: undefined };
}

/**
 * Right to erasure (NDPA 2023 s.34). A patient can ask to be removed and the
 * clinic has to be able to do it without a developer. Cascades take the notes
 * and visits; appointments keep their Cal record but lose the link.
 */
export async function deletePatient(id: string): Promise<ActionResult> {
  const admin = await currentAdmin();
  if (!admin) return { ok: false, error: "Not authorised." };

  const supabase = await serverClient();
  const { error } = await supabase.from("patients").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  refresh();
  return { ok: true, data: undefined };
}
