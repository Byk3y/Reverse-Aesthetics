import { ArrowRight, Check } from "lucide-react";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import Link from "next/link";
import { BOOKING_URL, INTAKE_CHECKLIST, WHATSAPP_URL } from "./homeData";

export function PaymentAccess() {
  return (
    <section id="consultation" className="bg-white [.thread-page_&]:bg-white/70 pb-[70px] pt-[22px] md:pb-[95px] md:pt-[34px]">
      <div className="mx-auto grid max-w-[1160px] gap-[18px] px-[20px] md:grid-cols-[1.1fr_0.9fr] md:px-[40px]">
        <div className="reveal-on-scroll rounded-[8px] bg-[var(--color-clinic-navy)] p-[26px] text-white md:p-[42px]">
          <p className="mb-[12px] text-[12px] font-bold uppercase tracking-[0.14em] text-[#aedee0]">
            Consultation &amp; pricing
          </p>
          <h2 className="max-w-[680px] text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] md:text-[44px]">
            Know your options before you book a thing.
          </h2>
          <p className="mt-[18px] max-w-[620px] text-[15px] leading-[1.75] text-white/72 md:text-[16px]">
            Every plan starts with a proper consultation — photography, a baseline
            assessment, and transparent pricing. Message the team with your goals
            and we&apos;ll guide you on the right, natural-first next step.
          </p>
          <div className="mt-[28px] flex flex-wrap gap-[12px]">
            <Link
              href={BOOKING_URL}
              className="inline-flex h-[46px] items-center justify-center gap-[8px] rounded-full bg-white px-[22px] text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-clinic-navy)]"
            >
              Book Appointment
              <ArrowRight className="h-[15px] w-[15px]" aria-hidden />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[46px] items-center justify-center gap-[8px] rounded-full border border-white/25 px-[22px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10"
            >
              Chat on WhatsApp
              <WhatsAppIcon variant="mono" className="h-[15px] w-[15px]" />
            </a>
          </div>
        </div>

        <div className="motion-card rounded-[8px] bg-[#f7f4f0] p-[24px] md:p-[32px]">
          <h3 className="text-[22px] font-bold tracking-[-0.02em] text-[var(--color-clinic-navy)]">
            Bring these to your consultation
          </h3>
          <div className="mt-[22px] grid gap-[10px]">
            {INTAKE_CHECKLIST.map((item) => (
              <div
                key={item}
                className="flex items-center gap-[10px] rounded-[8px] bg-white px-[14px] py-[12px]"
              >
                <Check className="h-[17px] w-[17px] text-[var(--color-clinic-teal)]" aria-hidden />
                <span className="text-[14px] font-semibold text-[var(--color-clinic-navy)]">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-[18px] text-[13px] leading-[1.6] text-[#6f7774]">
            Not sure where to start? Send a WhatsApp message before your visit and
            we&apos;ll point you to the right clinic.
          </p>
        </div>
      </div>
    </section>
  );
}
