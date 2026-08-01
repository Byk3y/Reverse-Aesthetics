"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, MapPin, Sparkles } from "lucide-react";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import BookingStepper from "./BookingStepper";
import OptionCardGroup from "./OptionCardGroup";
import CalPopupButton from "./CalPopupButton";
import CalInline from "./CalInline";
import {
  BOOKING_CLINICS,
  TREATMENTS,
  WHATSAPP_URL,
  calLinkFor,
  findClinic,
  findTreatment,
} from "./bookingData";
import { PHONE_DISPLAY } from "@/app/components/home/homeData";
import { track } from "@/app/lib/track";

/**
 * The two calendars used to be switched with `md:hidden` / `hidden md:block`,
 * which is CSS-only — both stayed mounted, so every phone-width visitor also
 * loaded the desktop inline embed as a 0x0 cal.com iframe inside a display:none
 * box. Two live embeds sharing Cal's global runtime is a needless footgun (and
 * a wasted third-party request), so pick one and mount only that.
 */
const MD_QUERY = "(min-width: 768px)";
const subscribeMd = (onChange: () => void) => {
  const mq = window.matchMedia(MD_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

export default function BookingWizard() {
  // Read once. From then on the wizard owns its state and the URL follows it,
  // so a later history entry can't fight the user's in-page choices.
  const searchParams = useSearchParams();
  const [preClinic] = useState(
    () => findClinic(searchParams.get("clinic") ?? undefined)?.id ?? null,
  );
  const [preTreatment] = useState(
    () => findTreatment(searchParams.get("treatment") ?? undefined)?.id ?? null,
  );
  const startStep = preClinic && preTreatment ? 2 : preClinic ? 1 : 0;

  const [step, setStep] = useState(startStep);
  const [clinicId, setClinicId] = useState<string | null>(preClinic);
  const [treatmentId, setTreatmentId] = useState<string | null>(preTreatment);

  const clinic = findClinic(clinicId);
  const treatment = findTreatment(treatmentId);

  // Server snapshot is `false`: SSR emits the popup, which loads no iframe until tapped.
  const isDesktop = useSyncExternalStore(
    subscribeMd,
    () => window.matchMedia(MD_QUERY).matches,
    () => false,
  );

  /**
   * Every step gets its own history entry.
   *
   * The step used to live in React state alone, so the phone's back gesture —
   * which is how most people navigate — skipped past the whole wizard and threw
   * away the clinic and treatment they had already picked. Now back walks the
   * steps and only leaves the page from step one.
   *
   * Native pushState is the App Router-supported way to change the query
   * without a server round trip, which matters here: the point of making this
   * route static was to stop it going to another continent.
   */
  const goTo = useCallback((target: number) => {
    const sp = new URLSearchParams(window.location.search);
    sp.set("step", String(target));
    window.history.pushState(null, "", `${window.location.pathname}?${sp}`);
    setStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const raw = Number(
        new URLSearchParams(window.location.search).get("step"),
      );
      const restored =
        Number.isInteger(raw) && raw >= 0 && raw <= 2 ? raw : startStep;
      setStep(restored);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [startStep]);

  function next() {
    goTo(Math.min(step + 1, 2));
  }
  /** Delegated so the on-screen arrow and the system gesture do the same thing. */
  function back() {
    window.history.back();
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
          <Link href="/" aria-label="Reverse Aesthetics home" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Reverse Aesthetics"
              width={702}
              height={194}
              sizes="145px"
              priority
              className="h-[32px] w-auto"
            />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-[6px] text-[12px] font-semibold text-[#6f6a64] transition-colors hover:text-[var(--color-clinic-teal)]"
          >
            <WhatsAppIcon className="h-[15px] w-[15px]" />
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

      <div className={`mx-auto max-w-[725px] px-5 pt-8 sm:pt-10 ${step < 2 ? "pb-[132px]" : "pb-20"}`}>
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
            <ContinueButton visible={!!clinicId} onClick={next} />
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
            <ContinueButton visible={!!treatmentId} onClick={next} />
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
                onClick={() => goTo(0)}
                className="text-[12px] font-semibold text-[var(--color-clinic-teal)] underline underline-offset-2 hover:text-[var(--color-clinic-teal-dark)]"
              >
                Edit
              </button>
            </div>

            {clinic.calReady ? (
              isDesktop ? (
                /* Desktop (≥768px): inline calendar — compact, higher-converting */
                <div className="rounded-[14px] border border-[rgba(35,32,29,0.1)] bg-white p-[20px] text-center sm:p-[28px]">
                  <p className="mx-auto mb-[18px] max-w-[440px] text-[15px] leading-[1.6] text-[#5f5b55]">
                    You&apos;re booking
                    {treatment ? ` a ${treatment.label.toLowerCase()}` : " a consultation"} at
                    our{" "}
                    <span className="font-semibold text-[var(--color-clinic-navy)]">{clinic.city}</span>{" "}
                    clinic. Pick a time and you&apos;re confirmed instantly.
                  </p>
                  <div className="overflow-hidden rounded-[10px]">
                    <CalInline
                      calLink={calLinkFor(clinic, treatment?.calSlug)}
                      notes={treatment ? `Interested in: ${treatment.label}` : ""}
                      treatment={treatment?.label}
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
              ) : (
                /* Mobile (<768px): popup — avoids the long slot list inline */
                <div className="rounded-[14px] border border-[rgba(35,32,29,0.1)] bg-white p-[28px] text-center">
                  <span className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#e4f1f2] text-[var(--color-clinic-teal)]">
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
                    calLink={calLinkFor(clinic, treatment?.calSlug)}
                    notes={treatment ? `Interested in: ${treatment.label}` : ""}
                    treatment={treatment?.label}
                    onBooking={() =>
                      track("booking_submitted", {
                        service: treatment?.label ?? "consultation",
                        clinic: clinic.city,
                      })
                    }
                    className="mt-[22px] inline-flex h-[54px] w-full items-center justify-center gap-[9px] rounded-full bg-[var(--color-clinic-teal)] text-[15px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(1,120,125,0.7)] transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
                  >
                    Choose a time
                    <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
                  </CalPopupButton>
                  <p className="mt-[12px] text-[12px] text-[#8a857e]">
                    Instant email confirmation · reschedule anytime
                  </p>
                </div>
              )
            ) : (
              <div className="rounded-[14px] border border-[rgba(35,32,29,0.1)] bg-white p-[28px] text-center sm:p-[40px]">
                <span className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#e4f1f2] text-[var(--color-clinic-teal)]">
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
                  <WhatsAppIcon variant="mono" className="h-[16px] w-[16px]" />
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

/**
 * Floating action bar — slides up from the bottom as soon as a choice is made,
 * so a long option list never buries the Continue button below the fold.
 */
function ContinueButton({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(35,32,29,0.08)] bg-[var(--color-clinic-warm-bg)] shadow-[0_-10px_30px_-16px_rgba(35,32,29,0.28)] transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-[725px] px-5 pt-[14px] pb-[calc(14px_+_env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={onClick}
          tabIndex={visible ? 0 : -1}
          aria-hidden={!visible}
          className="inline-flex h-[52px] w-full items-center justify-center gap-[8px] rounded-full bg-[var(--color-clinic-teal)] text-[15px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(1,120,125,0.7)] transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
        >
          Continue
          <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
        </button>
      </div>
    </div>
  );
}
