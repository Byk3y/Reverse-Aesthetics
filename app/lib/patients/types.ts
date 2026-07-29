/**
 * Patient CRM types.
 *
 * Mirrors supabase/migrations/0004_patient_crm.sql. Non-clinical by design —
 * read the header of that migration before adding a medical field here.
 */

export type Clinic = "lagos" | "abuja";

export type PatientStage =
  | "lead"
  | "contacted"
  | "consult_booked"
  | "consulted"
  | "treated"
  | "repeat"
  | "dormant";

export type PatientSource =
  | "intake_link"
  | "cal_booking"
  | "whatsapp"
  | "instagram"
  | "google"
  | "referral"
  | "walk_in"
  | "blog"
  | "ad"
  | "other";

export type NoteKind =
  | "note"
  | "call"
  | "whatsapp"
  | "email"
  | "visit"
  | "intake"
  | "system";

export type AppointmentStatus =
  | "confirmed"
  | "pending"
  | "cancelled"
  | "rescheduled"
  | "completed"
  | "no_show";

export interface Patient {
  id: string;
  full_name: string;
  phone: string | null;
  phone_e164: string | null;
  email: string | null;
  gender: "female" | "male" | "other" | "undisclosed" | null;
  date_of_birth: string | null;
  clinic: Clinic | null;
  source: PatientSource;
  source_detail: string | null;
  landing_page: string | null;
  utm: Record<string, string>;
  treatment_interest: string[];
  stage: PatientStage;
  marketing_consent: boolean;
  consent_at: string | null;
  consent_source: string | null;
  assigned_to: string | null;
  tags: string[];
  first_seen_at: string;
  last_activity_at: string;
  created_at: string;
  updated_at: string;
}

/** A row of `patient_directory` — patient plus the rollups the list needs. */
export interface PatientRow extends Patient {
  visit_count: number;
  total_spend: number;
  last_visit_on: string | null;
  recall_due_on: string | null;
  next_appointment_at: string | null;
}

export interface PatientNote {
  id: string;
  patient_id: string;
  kind: NoteKind;
  body: string;
  author_id: string | null;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string | null;
  cal_booking_uid: string | null;
  cal_event_slug: string | null;
  clinic: Clinic | null;
  title: string | null;
  treatment: string | null;
  starts_at: string;
  ends_at: string | null;
  status: AppointmentStatus;
  attendee_name: string | null;
  attendee_email: string | null;
  attendee_phone: string | null;
}

export interface Visit {
  id: string;
  patient_id: string;
  treatment: string;
  clinic: Clinic | null;
  performed_at: string;
  practitioner: string | null;
  amount: number;
  recall_weeks: number | null;
  notes: string | null;
  created_at: string;
}

/**
 * The funnel, in order. Rendered as a progress rail on the patient page, so
 * the order here is load-bearing — it must match `stage_rank()` in SQL.
 * `dormant` sits outside the rail: it is an exit, not a step.
 */
export const STAGES: { value: PatientStage; label: string; hint: string }[] = [
  { value: "lead", label: "Lead", hint: "Enquired, not yet spoken to" },
  { value: "contacted", label: "Contacted", hint: "We've replied" },
  { value: "consult_booked", label: "Consult booked", hint: "Has a slot" },
  { value: "consulted", label: "Consulted", hint: "Came in, seen" },
  { value: "treated", label: "Treated", hint: "First treatment done" },
  { value: "repeat", label: "Repeat", hint: "Came back" },
];

export const DORMANT: { value: PatientStage; label: string; hint: string } = {
  value: "dormant",
  label: "Dormant",
  hint: "Gone quiet — stop chasing",
};

export const ALL_STAGES = [...STAGES, DORMANT];

export const STAGE_LABELS: Record<PatientStage, string> = Object.fromEntries(
  ALL_STAGES.map((s) => [s.value, s.label])
) as Record<PatientStage, string>;

export const SOURCE_LABELS: Record<PatientSource, string> = {
  intake_link: "Intake link",
  cal_booking: "Cal.com booking",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  google: "Google",
  referral: "Referral",
  walk_in: "Walk-in",
  blog: "Blog",
  ad: "Paid ad",
  other: "Other",
};

/** Sources a staff member can pick by hand. The other two are set by machines. */
export const MANUAL_SOURCES: PatientSource[] = [
  "whatsapp",
  "instagram",
  "google",
  "referral",
  "walk_in",
  "blog",
  "ad",
  "other",
];

export const NOTE_KIND_LABELS: Record<NoteKind, string> = {
  note: "Note",
  call: "Call",
  whatsapp: "WhatsApp",
  email: "Email",
  visit: "Visit",
  intake: "Intake form",
  system: "System",
};

/** Kinds a human can log. `intake` and `system` are written by the database. */
export const LOGGABLE_KINDS: NoteKind[] = [
  "note",
  "call",
  "whatsapp",
  "email",
];

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  confirmed: "Confirmed",
  pending: "Pending",
  cancelled: "Cancelled",
  rescheduled: "Rescheduled",
  completed: "Completed",
  no_show: "No-show",
};

export const CLINIC_LABELS: Record<Clinic, string> = {
  lagos: "Lagos",
  abuja: "Abuja",
};
