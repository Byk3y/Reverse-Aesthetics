"use client";

import { useState } from "react";
import { ArrowRight, Check, MapPin, MessageCircle } from "lucide-react";
import CalPopupButton from "@/app/components/booking/CalPopupButton";
import CalInline from "@/app/components/booking/CalInline";
import { BOOKING_CLINICS } from "@/app/components/booking/bookingData";
import { PHONE_DISPLAY } from "@/app/components/home/homeData";
import { waLink } from "./lpData";
import { track } from "@/app/lib/track";

export default function LandingBooking({
  treatmentLabel,
  waMessage,
}: {
  treatmentLabel: string;
  waMessage: string;
}) {
  const [clinicId, setClinicId] = useState<"lagos" | "abuja">("lagos");
  const clinic = BOOKING_CLINICS.find((c) => c.id === clinicId)!;
  const wa = waLink(waMessage);

  return (
    <div className="rounded-[16px] border border-[rgba(35,32,29,0.1)] bg-white p-[16px] shadow-[0_20px_50px_-30px_rgba(35,32,29,0.5)] sm:p-[22px]">
      {/* Clinic toggle */}
      <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.12em] text-[#6f6a64]">
        Choose your clinic
      </p>
      <div className="mb-[18px] grid grid-cols-2 gap-[10px]">
        {BOOKING_CLINICS.map((c) => {
          const active = c.id === clinicId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setClinicId(c.id)}
              className={`flex items-center justify-center gap-[8px] rounded-[10px] border-2 px-[16px] py-[13px] text-[15px] font-semibold transition-all ${
                active
                  ? "border-[var(--color-clinic-teal)] bg-[#e7efe7] text-[var(--color-clinic-navy)]"
                  : "border-[rgba(35,32,29,0.14)] bg-white text-[#6f6a64] hover:border-[rgba(35,32,29,0.3)]"
              }`}
            >
              <MapPin
                className={`h-[16px] w-[16px] ${active ? "text-[var(--color-clinic-teal)]" : "text-[#9a958e]"}`}
                aria-hidden
              />
              {c.city}
            </button>
          );
        })}
      </div>

      {/* Scheduler */}
      {clinic.calReady ? (
        <div className="rounded-[12px] border border-[rgba(35,32,29,0.1)] bg-[var(--color-clinic-warm-bg)] p-[16px] text-center sm:p-[22px]">
          <p className="mx-auto mb-[16px] max-w-[360px] text-[14px] leading-[1.6] text-[#6f6a64]">
            Pick a date and time at our{" "}
            <span className="font-semibold text-[var(--color-clinic-navy)]">{clinic.city}</span>{" "}
            clinic for your {treatmentLabel.toLowerCase()} — confirmed instantly.
          </p>

          {/* Desktop (≥768px): inline calendar — compact, higher-converting */}
          <div className="hidden overflow-hidden rounded-[10px] bg-white md:block">
            <CalInline
              calLink={clinic.calLink}
              notes={`Interested in: ${treatmentLabel}`}
              onBooking={() =>
                track("booking_submitted", { service: treatmentLabel, clinic: clinic.city })
              }
            />
          </div>

          {/* Mobile (<768px): popup — avoids the long slot list inline */}
          <CalPopupButton
            calLink={clinic.calLink}
            notes={`Interested in: ${treatmentLabel}`}
            onBooking={() =>
              track("booking_submitted", { service: treatmentLabel, clinic: clinic.city })
            }
            className="inline-flex h-[54px] w-full items-center justify-center gap-[9px] rounded-full bg-[var(--color-clinic-teal)] text-[15px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(46,147,111,0.7)] transition-colors hover:bg-[var(--color-clinic-teal-dark)] md:hidden"
          >
            Choose a time
            <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
          </CalPopupButton>

          <p className="mt-[12px] text-[12px] text-[#8a857e]">
            Instant email confirmation · reschedule anytime
          </p>
        </div>
      ) : (
        <div className="rounded-[12px] border border-[rgba(35,32,29,0.1)] bg-[var(--color-clinic-warm-bg)] p-[24px] text-center">
          <span className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#e7efe7] text-[var(--color-clinic-teal)]">
            <Check className="h-[22px] w-[22px]" aria-hidden />
          </span>
          <h3 className="mt-[14px] text-[18px] font-bold text-[var(--color-clinic-navy)]">
            Book your {clinic.city} visit
          </h3>
          <p className="mx-auto mt-[8px] max-w-[380px] text-[14px] leading-[1.6] text-[#6f6a64]">
            Our {clinic.city} online calendar is being connected. Send us a quick
            WhatsApp and we&apos;ll confirm your {treatmentLabel} appointment right
            away.
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("whatsapp_click", { service: treatmentLabel, clinic: clinic.city })}
            className="mt-[18px] inline-flex h-[46px] items-center justify-center gap-[9px] rounded-full bg-[var(--color-clinic-teal)] px-[24px] text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
          >
            Book {clinic.city} on WhatsApp
            <MessageCircle className="h-[16px] w-[16px]" aria-hidden />
          </a>
        </div>
      )}

      {/* WhatsApp secondary */}
      <div className="mt-[16px] flex flex-col items-center gap-[4px] border-t border-[rgba(35,32,29,0.08)] pt-[16px] text-center">
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("whatsapp_click", { service: treatmentLabel, clinic: clinic.city })}
          className="inline-flex items-center gap-[7px] text-[14px] font-semibold text-[var(--color-clinic-teal)] hover:text-[var(--color-clinic-teal-dark)]"
        >
          <MessageCircle className="h-[16px] w-[16px]" aria-hidden />
          Prefer to chat? Book on WhatsApp
        </a>
        <span className="text-[12px] text-[#8a857e]">Or call us at {PHONE_DISPLAY}</span>
      </div>
    </div>
  );
}
