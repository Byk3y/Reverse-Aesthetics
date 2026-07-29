import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarCheck,
  CircleDollarSign,
  Mail,
  MessageCircle,
  Pencil,
  Phone,
} from "lucide-react";
import DeletePatientButton from "../../../../components/admin/patients/DeletePatientButton";
import NoteComposer from "../../../../components/admin/patients/NoteComposer";
import StageControl from "../../../../components/admin/patients/StageControl";
import VisitForm from "../../../../components/admin/patients/VisitForm";
import { Panel, StagePill, Tag } from "../../../../components/admin/ui";
import { getPatientChart } from "../../../../lib/patients/queries";
import {
  daysUntil,
  displayPhone,
  formatDate,
  formatDateTime,
  formatNaira,
  initials,
  relativeDays,
  treatmentLabel,
  whatsappLink,
} from "../../../../lib/patients/format";
import {
  APPOINTMENT_STATUS_LABELS,
  CLINIC_LABELS,
  NOTE_KIND_LABELS,
  SOURCE_LABELS,
  STAGE_LABELS,
} from "../../../../lib/patients/types";

interface TimelineEntry {
  id: string;
  at: string;
  label: string;
  body: string;
  tone: "note" | "visit" | "appointment" | "system";
}

export default async function PatientChartPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { patient, notes, appointments, visits } = await getPatientChart(id);

  if (!patient) notFound();

  const wa = whatsappLink(patient.phone_e164);
  const dueDays = daysUntil(patient.recall_due_on);

  // One chronological feed rather than three lists — the desk wants "what has
  // happened with this person", not three separate half-stories.
  const timeline: TimelineEntry[] = [
    ...notes.map((note) => ({
      id: `note-${note.id}`,
      at: note.created_at,
      label: NOTE_KIND_LABELS[note.kind],
      body: note.body,
      tone: (note.kind === "system" ? "system" : "note") as TimelineEntry["tone"],
    })),
    ...visits.map((visit) => ({
      id: `visit-${visit.id}`,
      at: visit.performed_at,
      label: "Visit",
      body: [
        treatmentLabel(visit.treatment),
        visit.amount > 0 ? formatNaira(visit.amount) : null,
        visit.practitioner,
        visit.notes,
      ]
        .filter(Boolean)
        .join(" · "),
      tone: "visit" as const,
    })),
    ...appointments.map((appointment) => ({
      id: `appt-${appointment.id}`,
      at: appointment.starts_at,
      label: APPOINTMENT_STATUS_LABELS[appointment.status],
      body: [
        appointment.treatment ?? appointment.cal_event_slug ?? "Appointment",
        appointment.clinic ? CLINIC_LABELS[appointment.clinic] : null,
        formatDateTime(appointment.starts_at),
      ]
        .filter(Boolean)
        .join(" · "),
      tone: "appointment" as const,
    })),
  ].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());

  return (
    <main className="mx-auto max-w-[1180px] px-[20px] py-[28px] md:px-[36px] md:py-[38px]">
      <Link
        href="/admin/patients"
        className="text-[13px] font-semibold text-[#8a857f] transition-colors hover:text-[var(--color-clinic-teal)]"
      >
        ← All patients
      </Link>

      <div className="mb-[26px] mt-[10px] flex flex-wrap items-center justify-between gap-[14px]">
        <div className="flex items-center gap-[14px]">
          <span
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[var(--color-clinic-navy)] text-[17px] font-semibold text-white"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
            aria-hidden
          >
            {initials(patient.full_name)}
          </span>
          <div className="min-w-0">
            <h1
              className="text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[30px]"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {patient.full_name}
            </h1>
            <p className="mt-[5px] flex flex-wrap items-center gap-[9px] text-[13px] text-[#8a857f]">
              <StagePill stage={patient.stage} label={STAGE_LABELS[patient.stage]} />
              <span>First seen {relativeDays(patient.first_seen_at)}</span>
            </p>
          </div>
        </div>

        <Link
          href={`/admin/patients/${patient.id}/edit`}
          className="inline-flex h-[40px] items-center gap-[7px] rounded-full border border-[#e0dcd6] bg-white px-[18px] text-[12.5px] font-semibold text-[#5a5651] transition-colors hover:border-[var(--color-clinic-teal)] hover:text-[var(--color-clinic-teal)]"
        >
          <Pencil className="h-[14px] w-[14px]" aria-hidden />
          Edit details
        </Link>
      </div>

      <div className="grid gap-[16px] lg:grid-cols-[330px_1fr] lg:items-start">
        {/* ---- Identity panel ---- */}
        <div className="grid gap-[16px] lg:sticky lg:top-[22px]">
          <section className="rounded-[14px] border border-[#e6e2dc] bg-white px-[20px] py-[19px]">
            <div className="grid gap-[10px]">
              {patient.phone_e164 && (
                <div className="flex items-center gap-[10px]">
                  <Phone className="h-[15px] w-[15px] shrink-0 text-[#b5b0a9]" aria-hidden />
                  <a
                    href={`tel:${patient.phone_e164}`}
                    className="text-[14.5px] tabular-nums text-[var(--color-clinic-navy)] transition-colors hover:text-[var(--color-clinic-teal)]"
                  >
                    {displayPhone(patient.phone_e164)}
                  </a>
                </div>
              )}
              {patient.email && (
                <div className="flex items-center gap-[10px]">
                  <Mail className="h-[15px] w-[15px] shrink-0 text-[#b5b0a9]" aria-hidden />
                  <a
                    href={`mailto:${patient.email}`}
                    className="truncate text-[14px] text-[var(--color-clinic-navy)] transition-colors hover:text-[var(--color-clinic-teal)]"
                  >
                    {patient.email}
                  </a>
                </div>
              )}
            </div>

            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[15px] flex h-[42px] items-center justify-center gap-[8px] rounded-full bg-[var(--color-clinic-teal)] text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
              >
                <MessageCircle className="h-[15px] w-[15px]" aria-hidden />
                Message on WhatsApp
              </a>
            )}
          </section>

          <section className="rounded-[14px] border border-[#e6e2dc] bg-white px-[20px] py-[19px]">
            <dl className="grid gap-[13px]">
              <Row label="Clinic">
                {patient.clinic ? CLINIC_LABELS[patient.clinic] : "Not decided"}
              </Row>
              <Row label="Source">
                {SOURCE_LABELS[patient.source]}
                {patient.source_detail && (
                  <span className="text-[#8a857f]"> · {patient.source_detail}</span>
                )}
              </Row>
              {patient.landing_page && (
                <Row label="Came from">
                  <span className="break-all font-mono text-[12px]">
                    {patient.landing_page}
                  </span>
                </Row>
              )}
              {patient.date_of_birth && (
                <Row label="Born">{formatDate(patient.date_of_birth)}</Row>
              )}
              <Row label="Marketing consent">
                {patient.marketing_consent ? (
                  <span className="text-[#2c6b41]">
                    Yes · {formatDate(patient.consent_at)}
                  </span>
                ) : (
                  <span className="text-[#9d8348]">
                    Not given — no broadcasts
                  </span>
                )}
              </Row>
            </dl>

            {patient.treatment_interest.length > 0 && (
              <div className="mt-[16px] border-t border-[#f1efeb] pt-[14px]">
                <span className="mb-[8px] block text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#a09b94]">
                  Interested in
                </span>
                <div className="flex flex-wrap gap-[6px]">
                  {patient.treatment_interest.map((t) => (
                    <Tag key={t}>{treatmentLabel(t)}</Tag>
                  ))}
                </div>
              </div>
            )}

            {patient.tags.length > 0 && (
              <div className="mt-[14px] flex flex-wrap gap-[6px]">
                {patient.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
          </section>

          <section className="grid gap-[1px] overflow-hidden rounded-[14px] border border-[#e6e2dc] bg-[#eeebe6]">
            <Metric
              icon={<CircleDollarSign className="h-[15px] w-[15px]" aria-hidden />}
              label="Lifetime value"
              value={formatNaira(patient.total_spend)}
              hint={`${patient.visit_count} visit${patient.visit_count === 1 ? "" : "s"}`}
            />
            <Metric
              icon={<CalendarCheck className="h-[15px] w-[15px]" aria-hidden />}
              label="Next appointment"
              value={
                patient.next_appointment_at
                  ? formatDateTime(patient.next_appointment_at)
                  : "None booked"
              }
              hint={
                patient.next_appointment_at
                  ? relativeDays(patient.next_appointment_at)
                  : undefined
              }
            />
            {patient.recall_due_on && (
              <Metric
                icon={<CalendarCheck className="h-[15px] w-[15px]" aria-hidden />}
                label="Due back"
                value={formatDate(patient.recall_due_on)}
                hint={relativeDays(patient.recall_due_on)}
                urgent={dueDays !== null && dueDays <= 0}
              />
            )}
          </section>

          <DeletePatientButton id={patient.id} name={patient.full_name} />
        </div>

        {/* ---- Working column ---- */}
        <div className="grid gap-[16px]">
          <section className="rounded-[14px] border border-[#e6e2dc] bg-white px-[20px] py-[18px]">
            <StageControl patientId={patient.id} stage={patient.stage} />
          </section>

          <Panel title="Activity">
            <VisitForm patientId={patient.id} defaultClinic={patient.clinic} />
            <NoteComposer patientId={patient.id} />

            {timeline.length === 0 ? (
              <p className="px-[20px] py-[28px] text-center text-[13.5px] text-[#a8a39c]">
                Nothing logged yet.
              </p>
            ) : (
              <ul className="divide-y divide-[#f1efeb]">
                {timeline.map((entry) => (
                  <li key={entry.id} className="flex gap-[14px] px-[20px] py-[14px]">
                    <span
                      className={`mt-[6px] h-[7px] w-[7px] shrink-0 rounded-full ${
                        entry.tone === "visit"
                          ? "bg-[var(--color-clinic-gold)]"
                          : entry.tone === "appointment"
                            ? "bg-[var(--color-clinic-teal)]"
                            : entry.tone === "system"
                              ? "bg-[#d5d0c9]"
                              : "bg-[var(--color-clinic-violet)]"
                      }`}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-[8px]">
                        <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#a09b94]">
                          {entry.label}
                        </span>
                        <span className="text-[11.5px] tabular-nums text-[#b5b0a9]">
                          {formatDate(entry.at)}
                        </span>
                      </div>
                      <p className="mt-[3px] text-[14px] leading-[1.55] text-[#3f3b37]">
                        {entry.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </main>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#a09b94]">
        {label}
      </dt>
      <dd className="mt-[3px] text-[13.5px] leading-[1.5] text-[var(--color-clinic-navy)]">
        {children}
      </dd>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  hint,
  urgent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  urgent?: boolean;
}) {
  return (
    <div className="bg-white px-[20px] py-[15px]">
      <span className="flex items-center gap-[7px] text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#a09b94]">
        <span className="text-[#c2bdb6]">{icon}</span>
        {label}
      </span>
      <span
        className={`mt-[6px] block text-[17px] font-semibold tabular-nums ${
          urgent
            ? "text-[var(--color-clinic-gold-hover)]"
            : "text-[var(--color-clinic-navy)]"
        }`}
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        {value}
      </span>
      {hint && (
        <span className="mt-[2px] block text-[12px] text-[#8a857f]">{hint}</span>
      )}
    </div>
  );
}
