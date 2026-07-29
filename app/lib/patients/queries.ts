import { serverClient } from "../supabase/server";
import { isSupabaseConfigured } from "../supabase/config";
import { normalizePhone } from "./format";
import type {
  Appointment,
  Clinic,
  Patient,
  PatientNote,
  PatientRow,
  PatientSource,
  PatientStage,
  Visit,
} from "./types";

/**
 * Admin-side CRM reads.
 *
 * All of these go through the cookie-bound client, so RLS decides what comes
 * back: a signed-in admin sees everything, anyone else sees nothing. They
 * return empty rather than throwing when Supabase isn't configured, matching
 * the blog queries — the layout shows a setup notice, but layouts and pages
 * render in parallel, so the guard has to live here too.
 */

/** PostgREST `or()` is comma-delimited, so those characters have to go. */
function safeSearch(term: string): string {
  return term.trim().replace(/[,()*]/g, " ").trim();
}

export interface PatientFilters {
  stage?: PatientStage;
  clinic?: Clinic;
  source?: PatientSource;
  search?: string;
  /** Named shortcuts the overview links into. */
  view?: "recall" | "new" | "unconsented";
  limit?: number;
}

export async function listPatients(
  filters: PatientFilters = {}
): Promise<PatientRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await serverClient();

  let query = supabase
    .from("patient_directory")
    .select("*")
    .order("last_activity_at", { ascending: false })
    .limit(filters.limit ?? 200);

  if (filters.stage) query = query.eq("stage", filters.stage);
  if (filters.clinic) query = query.eq("clinic", filters.clinic);
  if (filters.source) query = query.eq("source", filters.source);

  if (filters.view === "recall") {
    query = query
      .not("recall_due_on", "is", null)
      .lte("recall_due_on", inDays(30).slice(0, 10))
      .neq("stage", "dormant")
      .order("recall_due_on", { ascending: true });
  }

  if (filters.view === "new") {
    query = query.gte("first_seen_at", inDays(-7));
  }

  // Consent audit: who is in the book that we may not legally market to.
  if (filters.view === "unconsented") {
    query = query.eq("marketing_consent", false);
  }

  const term = safeSearch(filters.search ?? "");
  if (term) {
    const digits = term.replace(/[^0-9+]/g, "");
    const clauses = [`full_name.ilike.%${term}%`, `email.ilike.%${term}%`];

    // A number typed in any local format has to find the E.164 we stored.
    if (digits.length >= 4) {
      const e164 = normalizePhone(digits);
      if (e164) clauses.push(`phone_e164.ilike.%${e164.replace("+", "")}%`);
      clauses.push(`phone.ilike.%${digits}%`);
    }

    query = query.or(clauses.join(","));
  }

  const { data, error } = await query;

  if (error) {
    console.error("[crm] listPatients:", error.message);
    return [];
  }

  return (data ?? []) as PatientRow[];
}

export async function getPatient(id: string): Promise<PatientRow | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from("patient_directory")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as PatientRow;
}

export async function listNotes(patientId: string): Promise<PatientNote[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await serverClient();

  const { data } = await supabase
    .from("patient_notes")
    .select("*")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false });

  return (data ?? []) as PatientNote[];
}

export async function listAppointments(
  patientId: string
): Promise<Appointment[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await serverClient();

  const { data } = await supabase
    .from("appointments")
    .select("*")
    .eq("patient_id", patientId)
    .order("starts_at", { ascending: false });

  return (data ?? []) as Appointment[];
}

export async function listVisits(patientId: string): Promise<Visit[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await serverClient();

  const { data } = await supabase
    .from("visits")
    .select("*")
    .eq("patient_id", patientId)
    .order("performed_at", { ascending: false });

  return (data ?? []) as Visit[];
}

/** Everything the patient page needs, in one round trip's worth of waiting. */
export async function getPatientChart(id: string) {
  const [patient, notes, appointments, visits] = await Promise.all([
    getPatient(id),
    listNotes(id),
    listAppointments(id),
    listVisits(id),
  ]);

  return { patient, notes, appointments, visits };
}

// ------------------------------------------------------------
// Overview
// ------------------------------------------------------------

function inDays(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString();
}

export interface CrmStats {
  total: number;
  newThisWeek: number;
  newLastWeek: number;
  upcoming: number;
  recallDue: number;
  treated: number;
  repeat: number;
  revenue30: number;
  unconsented: number;
}

export async function getCrmStats(): Promise<CrmStats> {
  const empty: CrmStats = {
    total: 0,
    newThisWeek: 0,
    newLastWeek: 0,
    upcoming: 0,
    recallDue: 0,
    treated: 0,
    repeat: 0,
    revenue30: 0,
    unconsented: 0,
  };

  if (!isSupabaseConfigured()) return empty;
  const supabase = await serverClient();

  const patients = () =>
    supabase.from("patients").select("id", { count: "exact", head: true });

  const [
    total,
    newThisWeek,
    newLastWeek,
    upcoming,
    recallDue,
    treated,
    repeat,
    unconsented,
    revenue,
  ] = await Promise.all([
    patients(),
    patients().gte("first_seen_at", inDays(-7)),
    patients().gte("first_seen_at", inDays(-14)).lt("first_seen_at", inDays(-7)),
    supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .gte("starts_at", new Date().toISOString())
      .lte("starts_at", inDays(7))
      .in("status", ["confirmed", "pending"]),
    supabase
      .from("patient_directory")
      .select("id", { count: "exact", head: true })
      .not("recall_due_on", "is", null)
      .lte("recall_due_on", inDays(30).slice(0, 10))
      .neq("stage", "dormant"),
    patients().in("stage", ["treated", "repeat"]),
    patients().eq("stage", "repeat"),
    patients().eq("marketing_consent", false),
    supabase
      .from("visits")
      .select("amount")
      .gte("performed_at", inDays(-30).slice(0, 10)),
  ]);

  return {
    total: total.count ?? 0,
    newThisWeek: newThisWeek.count ?? 0,
    newLastWeek: newLastWeek.count ?? 0,
    upcoming: upcoming.count ?? 0,
    recallDue: recallDue.count ?? 0,
    treated: treated.count ?? 0,
    repeat: repeat.count ?? 0,
    unconsented: unconsented.count ?? 0,
    revenue30: (revenue.data ?? []).reduce(
      (sum, row) => sum + Number((row as { amount: number }).amount ?? 0),
      0
    ),
  };
}

/**
 * How many sit at each stage. Drives the filter chips on the list — a pile of
 * untouched leads should be visible without clicking into anything.
 */
export async function getStageCounts(): Promise<
  Record<PatientStage | "all", number>
> {
  const empty = {
    all: 0,
    lead: 0,
    contacted: 0,
    consult_booked: 0,
    consulted: 0,
    treated: 0,
    repeat: 0,
    dormant: 0,
  };

  if (!isSupabaseConfigured()) return empty;
  const supabase = await serverClient();

  const { data, error } = await supabase.from("patients").select("stage");
  if (error) {
    console.error("[crm] getStageCounts:", error.message);
    return empty;
  }

  const counts = { ...empty };
  for (const row of (data ?? []) as { stage: PatientStage }[]) {
    counts[row.stage] = (counts[row.stage] ?? 0) + 1;
    counts.all += 1;
  }
  return counts;
}

/** Where patients came from over the last 90 days — the ad-spend question. */
export async function getSourceMix(): Promise<
  { source: PatientSource; count: number }[]
> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await serverClient();

  const { data } = await supabase
    .from("patients")
    .select("source")
    .gte("first_seen_at", inDays(-90));

  const tally = new Map<PatientSource, number>();
  for (const row of (data ?? []) as { source: PatientSource }[]) {
    tally.set(row.source, (tally.get(row.source) ?? 0) + 1);
  }

  return [...tally.entries()]
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

export async function listRecentPatients(limit = 6): Promise<PatientRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await serverClient();

  const { data } = await supabase
    .from("patient_directory")
    .select("*")
    .order("first_seen_at", { ascending: false })
    .limit(limit);

  return (data ?? []) as PatientRow[];
}

/**
 * The list that makes the CRM pay for itself: people a past treatment says
 * are due back. Overdue first — those are the ones going cold.
 */
export async function listRecallDue(limit = 8): Promise<PatientRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await serverClient();

  const { data } = await supabase
    .from("patient_directory")
    .select("*")
    .not("recall_due_on", "is", null)
    .lte("recall_due_on", inDays(30).slice(0, 10))
    .neq("stage", "dormant")
    .order("recall_due_on", { ascending: true })
    .limit(limit);

  return (data ?? []) as PatientRow[];
}

export interface UpcomingAppointment extends Appointment {
  patient: Pick<Patient, "id" | "full_name"> | null;
}

export async function listUpcomingAppointments(
  limit = 8
): Promise<UpcomingAppointment[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from("appointments")
    .select("*, patient:patients(id, full_name)")
    .gte("starts_at", new Date().toISOString())
    .in("status", ["confirmed", "pending"])
    .order("starts_at", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("[crm] listUpcomingAppointments:", error.message);
    return [];
  }

  return (data ?? []).map((input) => {
    const row = input as Record<string, unknown>;
    const patient = row.patient;
    return {
      ...(row as unknown as UpcomingAppointment),
      patient: (Array.isArray(patient) ? patient[0] : patient) ?? null,
    };
  });
}
