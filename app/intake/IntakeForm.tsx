"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { BOOKING_CLINICS, TREATMENTS, WHATSAPP_URL } from "../components/booking/bookingData";
import { submitIntake } from "./actions";

interface Props {
  initialClinic?: string;
  initialTreatment?: string;
  /** ?ref= — lets the clinic tell which staff member's link was used. */
  referrer?: string;
}

export default function IntakeForm({
  initialClinic,
  initialTreatment,
  referrer,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [clinic, setClinic] = useState(
    BOOKING_CLINICS.some((c) => c.id === initialClinic) ? initialClinic! : ""
  );
  const [treatments, setTreatments] = useState<string[]>(
    TREATMENTS.some((t) => t.id === initialTreatment) ? [initialTreatment!] : []
  );
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const doneRef = useRef<HTMLDivElement>(null);

  // Land the confirmation in view — on a phone the form is taller than the
  // screen and the success panel would otherwise appear off-screen.
  useEffect(() => {
    if (done) doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [done]);

  function toggleTreatment(id: string) {
    setTreatments((current) =>
      current.includes(id)
        ? current.filter((t) => t !== id)
        : [...current, id]
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;

    setPending(true);
    setError(null);

    const result = await submitIntake({
      full_name: name,
      phone,
      email,
      clinic,
      treatment_interest: treatments,
      message,
      marketing_consent: consent,
      landing_page: typeof window === "undefined" ? "" : window.location.pathname + window.location.search,
      source_detail: referrer ?? "",
    });

    setPending(false);
    if (result.ok) setDone(true);
    else setError(result.error);
  }

  if (done) {
    return (
      <div
        ref={doneRef}
        className="rounded-[20px] border border-[#e6e2dc] bg-white px-[26px] py-[44px] text-center md:px-[44px]"
      >
        <span className="mx-auto mb-[20px] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[var(--color-clinic-teal)]">
          <Check className="h-[28px] w-[28px] text-white" strokeWidth={2.5} aria-hidden />
        </span>
        <h2
          className="mb-[12px] text-[26px] font-semibold tracking-[-0.015em] text-[var(--color-clinic-navy)]"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          Thank you, {name.split(" ")[0]}.
        </h2>
        <p className="mx-auto mb-[28px] max-w-[420px] text-[15.5px] leading-[1.7] text-[#6f6a64]">
          We have your details. Someone from the clinic will reach out shortly to
          talk through what you&apos;re looking for and find you a time.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[48px] items-center rounded-full border border-[#e0dcd6] bg-white px-[26px] text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-navy)] transition-colors hover:border-[var(--color-clinic-teal)] hover:text-[var(--color-clinic-teal)]"
        >
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-[20px] border border-[#e6e2dc] bg-white px-[22px] py-[30px] md:px-[40px] md:py-[40px]"
    >
      {/* No honeypot field here on purpose — see the note in actions.ts. Two
          versions of it silently swallowed real enquiries while catching no
          bots, and this form is not worth losing a patient to protect. */}

      <Field label="Your name" required>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          placeholder="Chidinma Okeke"
          className={INPUT}
        />
      </Field>

      <div className="grid gap-[22px] md:grid-cols-2">
        <Field label="Phone number" hint="WhatsApp is fine">
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="0803 123 4567"
            className={INPUT}
          />
        </Field>

        <Field label="Email" hint="Optional">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            className={INPUT}
          />
        </Field>
      </div>

      <Field label="Which clinic is easier for you?">
        <div className="flex flex-wrap gap-[10px]">
          {BOOKING_CLINICS.map((option) => (
            <Chip
              key={option.id}
              selected={clinic === option.id}
              onClick={() => setClinic(clinic === option.id ? "" : option.id)}
            >
              {option.city}
            </Chip>
          ))}
        </div>
      </Field>

      <Field
        label="What are you interested in?"
        hint="Pick as many as you like — nothing is committed to yet"
      >
        <div className="flex flex-wrap gap-[9px]">
          {TREATMENTS.map((treatment) => (
            <Chip
              key={treatment.id}
              selected={treatments.includes(treatment.id)}
              onClick={() => toggleTreatment(treatment.id)}
            >
              {treatment.label}
            </Chip>
          ))}
        </div>
      </Field>

      <Field label="Anything you'd like us to know?" hint="Optional">
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={2000}
          placeholder="What you're hoping to change, questions about pricing, a date that suits you…"
          className={`${INPUT} resize-y leading-[1.6]`}
        />
      </Field>

      <label className="mb-[26px] flex cursor-pointer items-start gap-[12px]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-[3px] h-[18px] w-[18px] shrink-0 accent-[var(--color-clinic-teal)]"
        />
        <span className="text-[13.5px] leading-[1.6] text-[#6f6a64]">
          I&apos;m happy for Reverse Aesthetics to contact me about treatments,
          offers and appointment reminders. You can ask us to stop at any time.
        </span>
      </label>

      {error && (
        <p
          role="alert"
          className="mb-[18px] rounded-[10px] border border-[#f0d5d5] bg-[#fdf4f4] px-[16px] py-[12px] text-[14px] leading-[1.55] text-[#9c3535]"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-[52px] w-full items-center justify-center gap-[10px] rounded-full bg-[var(--color-clinic-teal)] px-[30px] text-[11.5px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
      >
        {pending && <Loader2 className="h-[16px] w-[16px] animate-spin" aria-hidden />}
        {pending ? "Sending…" : "Send my details"}
      </button>

      <p className="mt-[16px] text-[12.5px] leading-[1.6] text-[#a8a39c]">
        Your details are held by the clinic to arrange your care and are never
        sold or shared.
      </p>
    </form>
  );
}

const INPUT =
  "h-[50px] w-full rounded-[11px] border border-[#e0dcd6] bg-[#fcfbf9] px-[16px] text-[15.5px] text-[var(--color-clinic-navy)] outline-none transition-colors placeholder:text-[#b5b0a9] focus:border-[var(--color-clinic-teal)] focus:bg-white";

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
    <label className="mb-[22px] block">
      <span className="mb-[9px] block text-[11px] font-bold uppercase tracking-[0.13em] text-[#8a857f]">
        {label}
        {required && <span className="ml-[4px] text-[var(--color-clinic-teal)]">*</span>}
        {hint && (
          <span className="ml-[8px] font-medium normal-case tracking-normal text-[#b5b0a9]">
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`inline-flex h-[40px] items-center rounded-full border px-[17px] text-[13.5px] font-semibold transition-all ${
        selected
          ? "border-[var(--color-clinic-teal)] bg-[var(--color-clinic-teal)] text-white"
          : "border-[#e0dcd6] bg-white text-[#5a5651] hover:border-[#b9b4ad]"
      }`}
    >
      {children}
    </button>
  );
}
