"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, MapPin, MessageCircle, Sparkles } from "lucide-react";
import BookingStepper from "./BookingStepper";
import OptionCardGroup from "./OptionCardGroup";
import CalPopupButton from "./CalPopupButton";
import CalInline from "./CalInline";
import {
  BOOKING_CLINICS,
  TREATMENTS,
  WHATSAPP_URL,
  findClinic,
  findTreatment,
} from "./bookingData";
import { PHONE_DISPLAY } from "@/app/components/home/homeData";
import { track } from "@/app/lib/track";

export default function BookingWizard({
  initialClinic,
  initialTreatment,
}: {
  initialClinic?: string;
  initialTreatment?: string;
}) {
  const preClinic = findClinic(initialClinic)?.id ?? null;
  const preTreatment = findTreatment(initialTreatment)?.id ?? null;
  const startStep = preClinic && preTreatment ? 2 : preClinic ? 1 : 0;

  const [step, setStep] = useState(startStep);
  const [clinicId, setClinicId] = useState<string | null>(preClinic);
  const [treatmentId, setTreatmentId] = useState<string | null>(preTreatment);

  const clinic = findClinic(clinicId);
  const treatment = findTreatment(treatmentId);

  function next() {
    setStep((s) => Math.min(s + 1, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const clinicOptions = BOOKING_CLINICS.map((c) => ({
    value: c.id,
    label: `${c.city} clinic`,
    hint: c.address,
  }));

  const treatmentOptions = TREATMENTS.map((t) => ({
    value: t.id,
    label: t.label,
    hint: t.hint,
  }));

  return (
    <div className="min-h-screen bg-[var(--color-clinic-warm-bg)]">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-[rgba(35,32,29,0.08)] bg-[var(--color-clinic-warm-bg)]">
        <div className="mx-auto flex max-w-[725px] items-center justify-between px-5 py-[14px]">
          <Link
            href="/"
            aria-label="Reverse Aesthetics home"
            className="inline-flex items-baseline gap-[5px] text-[16px] font-bold uppercase tracking-[0.07em] text-[var(--color-clinic-navy)]"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Reverse
            <span className="font-extrabold text-[var(--color-clinic-teal)]">Aesthetics</span>
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-[6px] text-[12px] font-semibold text-[#6f6a64] transition-colors hover:text-[var(--color-clinic-teal)]"
          >
            <MessageCircle className="h-[15px] w-[15px]" aria-hidden />
            <span className="hidden sm:inline">Need help?</span>
          </a>
        </div>
        <div className="relative flex items-center justify-center px-5 pb-[12px]">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              aria-label="Back"
              className="absolute left-4 flex h-[34px] w-[34px] items-center justify-center rounded-full text-[var(--color-clinic-navy)] transition-colors hover:bg-black/5"
            >
              <ArrowLeft className="h-[20px] w-[20px]" aria-hidden />
            </button>
          )}
          <BookingStepper currentIndex={step} />
        </div>
      </header>

      <div className="mx-auto max-w-[725px] px-5 pb-20 pt-8 sm:pt-10">
        {/* STEP 0 — Clinic */}
        {step === 0 && (
          <div>
            <h1 className="mb-[8px] text-center text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-clinic-navy)] sm:text-[34px]">
              Which clinic would you like to visit?
            </h1>
            <p className="mb-[26px] text-center text-[15px] leading-[1.6] text-[#6f6a64]">
              Both clinics are open Monday–Saturday, 9 AM – 7 PM.
            </p>
            <OptionCardGroup
              name="clinic"
              options={clinicOptions}
              value={clinicId}
              onChange={setClinicId}
            />
            <ContinueButton disabled={!clinicId} onClick={next} />
          </div>
        )}

        {/* STEP 1 — Treatment */}
        {step === 1 && (
          <div>
            <h1 className="mb-[8px] text-center text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-clinic-navy)] sm:text-[34px]">
              What are you interested in?
            </h1>
            <p className="mb-[26px] text-center text-[15px] leading-[1.6] text-[#6f6a64]">
              Not sure yet? Pick a general consultation and we&apos;ll guide you.
            </p>
            <OptionCardGroup
              name="treatment"
              options={treatmentOptions}
              value={treatmentId}
              onChange={setTreatmentId}
            />
            <ContinueButton disabled={!treatmentId} onClick={next} />
          </div>
        )}

        {/* STEP 2 — Time (Cal.com) */}
        {step === 2 && clinic && (
          <div>
            <h1 className="mb-[8px] text-center text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-clinic-navy)] sm:text-[34px]">
              Choose your time
            </h1>
            <p className="mb-[20px] text-center text-[15px] leading-[1.6] text-[#6f6a64]">
              Pick a slot that works for you — we&apos;ll confirm by WhatsApp.
            </p>

            {/* Summary chips */}
            <div className="mb-[22px] flex flex-wrap items-center justify-center gap-[8px]">
              <span className="inline-flex items-center gap-[7px] rounded-full bg-white px-[14px] py-[8px] text-[13px] font-semibold text-[var(--color-clinic-navy)] shadow-sm">
                <MapPin className="h-[14px] w-[14px] text-[var(--color-clinic-teal)]" aria-hidden />
                {clinic.city}
              </span>
              {treatment && (
                <span className="inline-flex items-center gap-[7px] rounded-full bg-white px-[14px] py-[8px] text-[13px] font-semibold text-[var(--color-clinic-navy)] shadow-sm">
                  <Sparkles className="h-[14px] w-[14px] text-[var(--color-clinic-teal)]" aria-hidden />
                  {treatment.label}
                </span>
              )}
              <button
                type="button"
                onClick={() => setStep(0)}
                className="text-[12px] font-semibold text-[var(--color-clinic-teal)] underline underline-offset-2 hover:text-[var(--color-clinic-teal-dark)]"
              >
                Edit
              </button>
            </div>

            {clinic.calReady ? (
              <>
                {/* Desktop (≥768px): inline calendar — compact, higher-converting */}
                <div className="hidden rounded-[14px] border border-[rgba(35,32,29,0.1)] bg-white p-[20px] text-center sm:p-[28px] md:block">
                  <p className="mx-auto mb-[18px] max-w-[440px] text-[15px] leading-[1.6] text-[#5f5b55]">
                    You&apos;re booking
                    {treatment ? ` a ${treatment.label.toLowerCase()}` : " a consultation"} at
                    our{" "}
                    <span className="font-semibold text-[var(--color-clinic-navy)]">{clinic.city}</span>{" "}
                    clinic. Pick a time and you&apos;re confirmed instantly.
                  </p>
                  <div className="overflow-hidden rounded-[10px]">
                    <CalInline
                      calLink={clinic.calLink}
                      notes={treatment ? `Interested in: ${treatment.label}` : ""}
                      onBooking={() =>
                        track("booking_submitted", {
                          service: treatment?.label ?? "consultation",
                          clinic: clinic.city,
                        })
                      }
                    />
                  </div>
                  <p className="mt-[14px] text-[12px] text-[#8a857e]">
                    Instant email confirmation · reschedule anytime
                  </p>
                </div>

                {/* Mobile (<768px): popup — avoids the long slot list inline */}
                <div className="rounded-[14px] border border-[rgba(35,32,29,0.1)] bg-white p-[28px] text-center md:hidden">
                  <span className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#e7efe7] text-[var(--color-clinic-teal)]">
                    <Check className="h-[24px] w-[24px]" aria-hidden />
                  </span>
                  <p className="mx-auto mt-[16px] max-w-[420px] text-[15px] leading-[1.6] text-[#5f5b55]">
                    You&apos;re booking
                    {treatment ? ` a ${treatment.label.toLowerCase()}` : " a consultation"} at
                    our{" "}
                    <span className="font-semibold text-[var(--color-clinic-navy)]">{clinic.city}</span>{" "}
                    clinic. Pick a time and you&apos;re confirmed instantly.
                  </p>
                  <CalPopupButton
                    calLink={clinic.calLink}
                    notes={treatment ? `Interested in: ${treatment.label}` : ""}
                    onBooking={() =>
                      track("booking_submitted", {
                        service: treatment?.label ?? "consultation",
                        clinic: clinic.city,
                      })
                    }
                    className="mt-[22px] inline-flex h-[54px] w-full items-center justify-center gap-[9px] rounded-full bg-[var(--color-clinic-teal)] text-[15px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(46,147,111,0.7)] transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
                  >
                    Choose a time
                    <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
                  </CalPopupButton>
                  <p className="mt-[12px] text-[12px] text-[#8a857e]">
                    Instant email confirmation · reschedule anytime
                  </p>
                </div>
              </>
            ) : (
              <div className="rounded-[14px] border border-[rgba(35,32,29,0.1)] bg-white p-[28px] text-center sm:p-[40px]">
                <span className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#e7efe7] text-[var(--color-clinic-teal)]">
                  <Check className="h-[24px] w-[24px]" aria-hidden />
                </span>
                <h2 className="mt-[18px] text-[22px] font-bold text-[var(--color-clinic-navy)]">
                  Almost there — let&apos;s lock in your {clinic.city} visit
                </h2>
                <p className="mx-auto mt-[10px] max-w-[440px] text-[14px] leading-[1.65] text-[#6f6a64]">
                  Our {clinic.city} online calendar is being connected. Send us a
                  quick WhatsApp with your preferred day
                  {treatment ? ` for ${treatment.label}` : ""} and we&apos;ll
                  confirm your time right away.
                </p>
                <a
                  href={`${WHATSAPP_URL}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-[22px] inline-flex h-[48px] items-center justify-center gap-[9px] rounded-full bg-[var(--color-clinic-teal)] px-[26px] text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
                >
                  Book {clinic.city} on WhatsApp
                  <MessageCircle className="h-[16px] w-[16px]" aria-hidden />
                </a>
                <p className="mt-[14px] text-[13px] text-[#8a857e]">
                  Or call us at {PHONE_DISPLAY}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ContinueButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-[26px] inline-flex h-[52px] w-full items-center justify-center gap-[8px] rounded-full bg-[var(--color-clinic-teal)] text-[15px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(46,147,111,0.7)] transition-colors hover:bg-[var(--color-clinic-teal-dark)] disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
    >
      Continue
      <span aria-hidden>→</span>
    </button>
  );
}
