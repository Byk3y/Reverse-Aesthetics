"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { savePatient } from "../../../lib/patients/actions";
import { displayPhone, normalizePhone } from "../../../lib/patients/format";
import {
  ALL_STAGES,
  CLINIC_LABELS,
  MANUAL_SOURCES,
  SOURCE_LABELS,
  type Clinic,
  type PatientRow,
  type PatientSource,
  type PatientStage,
} from "../../../lib/patients/types";
import { TREATMENTS } from "../../booking/bookingData";

export default function PatientForm({ patient }: { patient?: PatientRow }) {
  const router = useRouter();

  const [name, setName] = useState(patient?.full_name ?? "");
  const [phone, setPhone] = useState(patient?.phone ?? "");
  const [email, setEmail] = useState(patient?.email ?? "");
  const [clinic, setClinic] = useState<Clinic | "">(patient?.clinic ?? "");
  const [gender, setGender] = useState(patient?.gender ?? "");
  const [dob, setDob] = useState(patient?.date_of_birth ?? "");
  const [source, setSource] = useState<PatientSource>(patient?.source ?? "walk_in");
  const [sourceDetail, setSourceDetail] = useState(patient?.source_detail ?? "");
  const [stage, setStage] = useState<PatientStage>(patient?.stage ?? "lead");
  const [treatments, setTreatments] = useState<string[]>(
    patient?.treatment_interest ?? []
  );
  const [tags, setTags] = useState((patient?.tags ?? []).join(", "));
  const [consent, setConsent] = useState(patient?.marketing_consent ?? false);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Shows the front desk what this number will merge as before they save —
  // two spellings of the same number must not become two patients.
  const merged = normalizePhone(phone);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;

    setPending(true);
    setError(null);

    const result = await savePatient({
      id: patient?.id,
      full_name: name,
      phone: phone || null,
      email: email || null,
      clinic: clinic || null,
      gender: (gender || null) as PatientRow["gender"],
      date_of_birth: dob || null,
      source,
      source_detail: sourceDetail || null,
      stage,
      treatment_interest: treatments,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      marketing_consent: consent,
    });

    setPending(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push(`/admin/patients/${result.data.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-[16px]">
      <section className="rounded-[14px] border border-[#e6e2dc] bg-white px-[22px] py-[22px]">
        <h2 className="mb-[18px] text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a857f]">
          Who they are
        </h2>

        <Field label="Full name" required>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={INPUT}
            placeholder="Chidinma Okeke"
          />
        </Field>

        <div className="grid gap-[16px] md:grid-cols-2">
          <Field
            label="Phone"
            hint={
              merged && merged !== phone.trim()
                ? `saves as ${displayPhone(merged)}`
                : undefined
            }
          >
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={INPUT}
              placeholder="0803 123 4567"
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={INPUT}
              placeholder="them@example.com"
            />
          </Field>

          <Field label="Clinic">
            <select
              value={clinic}
              onChange={(e) => setClinic(e.target.value as Clinic | "")}
              className={INPUT}
            >
              <option value="">Not decided</option>
              {(Object.keys(CLINIC_LABELS) as Clinic[]).map((c) => (
                <option key={c} value={c}>
                  {CLINIC_LABELS[c]}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Gender">
            <select
              value={gender ?? ""}
              onChange={(e) => setGender(e.target.value as typeof gender)}
              className={INPUT}
            >
              <option value="">Not recorded</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="undisclosed">Prefers not to say</option>
            </select>
          </Field>

          <Field label="Date of birth" hint="Optional">
            <input
              type="date"
              value={dob ?? ""}
              onChange={(e) => setDob(e.target.value)}
              className={INPUT}
            />
          </Field>
        </div>
      </section>

      <section className="rounded-[14px] border border-[#e6e2dc] bg-white px-[22px] py-[22px]">
        <h2 className="mb-[18px] text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a857f]">
          Where they came from
        </h2>

        <div className="grid gap-[16px] md:grid-cols-2">
          <Field label="Source">
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as PatientSource)}
              className={INPUT}
            >
              {/* The two automated sources stay selectable so an edit doesn't
                  silently rewrite how a patient actually arrived. */}
              {(patient && !MANUAL_SOURCES.includes(patient.source)
                ? [patient.source, ...MANUAL_SOURCES]
                : MANUAL_SOURCES
              ).map((s) => (
                <option key={s} value={s}>
                  {SOURCE_LABELS[s]}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Detail" hint="Who referred them, which campaign">
            <input
              type="text"
              value={sourceDetail ?? ""}
              onChange={(e) => setSourceDetail(e.target.value)}
              className={INPUT}
              placeholder="Referred by Ada O."
            />
          </Field>
        </div>

        <Field label="Interested in">
          <div className="flex flex-wrap gap-[8px]">
            {TREATMENTS.map((treatment) => {
              const selected = treatments.includes(treatment.id);
              return (
                <button
                  key={treatment.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() =>
                    setTreatments((current) =>
                      current.includes(treatment.id)
                        ? current.filter((t) => t !== treatment.id)
                        : [...current, treatment.id]
                    )
                  }
                  className={`inline-flex h-[34px] items-center rounded-full border px-[14px] text-[12.5px] font-semibold transition-colors ${
                    selected
                      ? "border-[var(--color-clinic-teal)] bg-[var(--color-clinic-teal)] text-white"
                      : "border-[#e0dcd6] bg-white text-[#5a5651] hover:border-[#b9b4ad]"
                  }`}
                >
                  {treatment.label}
                </button>
              );
            })}
          </div>
        </Field>

        <div className="grid gap-[16px] md:grid-cols-2">
          <Field label="Stage">
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as PatientStage)}
              className={INPUT}
            >
              {ALL_STAGES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label} — {s.hint}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tags" hint="Comma separated">
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={INPUT}
              placeholder="vip, price-sensitive"
            />
          </Field>
        </div>

        <label className="flex cursor-pointer items-start gap-[11px] rounded-[11px] border border-[#eee6d5] bg-[#fdfaf3] px-[15px] py-[13px]">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-[2px] h-[17px] w-[17px] shrink-0 accent-[var(--color-clinic-teal)]"
          />
          <span className="text-[13px] leading-[1.55] text-[#7c6733]">
            They agreed to marketing contact. Only tick this if they actually
            said so — it&apos;s the record that makes a broadcast lawful under
            the NDPA.
          </span>
        </label>
      </section>

      {error && (
        <p
          role="alert"
          className="rounded-[10px] border border-[#f0d5d5] bg-[#fdf4f4] px-[15px] py-[11px] text-[13.5px] leading-[1.5] text-[#9c3535]"
        >
          {error}
        </p>
      )}

      <div className="flex items-center gap-[10px]">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-[44px] items-center gap-[9px] rounded-full bg-[var(--color-clinic-navy)] px-[24px] text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-black disabled:opacity-60"
        >
          {pending && <Loader2 className="h-[15px] w-[15px] animate-spin" aria-hidden />}
          {patient ? "Save changes" : "Add patient"}
        </button>
        <Link
          href={patient ? `/admin/patients/${patient.id}` : "/admin/patients"}
          className="text-[13px] font-semibold text-[#8a857f] transition-colors hover:text-[var(--color-clinic-navy)]"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

const INPUT =
  "h-[44px] w-full rounded-[10px] border border-[#e0dcd6] bg-[#fcfbf9] px-[14px] text-[14.5px] text-[var(--color-clinic-navy)] outline-none transition-colors placeholder:text-[#b5b0a9] focus:border-[var(--color-clinic-teal)] focus:bg-white";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-[16px] block">
      <span className="mb-[7px] block text-[11px] font-bold uppercase tracking-[0.12em] text-[#8a857f]">
        {label}
        {required && <span className="ml-[3px] text-[var(--color-clinic-teal)]">*</span>}
        {hint && (
          <span className="ml-[7px] font-medium normal-case tracking-normal text-[#b5b0a9]">
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
