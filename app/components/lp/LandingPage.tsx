import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, ChevronRight, MapPin, MessageCircle } from "lucide-react";
import LandingBooking from "./LandingBooking";
import { waLink, type LpService } from "./lpData";
import { LOCATIONS, PHONE_DISPLAY, PHONE_TEL } from "@/app/components/home/homeData";

const TRUST = [
  "Led by Dr. Ral Abana · GMC (UK)",
  "Natural-first results",
  "Two clinics — Lagos & Abuja",
  "Medical-led, accredited care",
];

export default function LandingPage({ service }: { service: LpService }) {
  const wa = waLink(service.waMessage);

  return (
    <div
      className="min-h-screen bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      {/* Minimal header (no full nav — keeps ad traffic focused) */}
      <header className="sticky top-0 z-50 border-b border-[rgba(35,32,29,0.08)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between px-5 py-[13px] md:px-8">
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
            href="#book"
            className="inline-flex h-[40px] items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[20px] text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
          >
            Book now
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[var(--color-clinic-hero-top)]">
        <div className="mx-auto grid max-w-[1080px] items-center gap-[32px] px-5 py-[44px] md:grid-cols-2 md:gap-[48px] md:px-8 md:py-[72px]">
          <div>
            <p className="hero-copy-reveal mb-[16px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
              {service.eyebrow}
            </p>
            <h1 className="hero-copy-reveal [animation-delay:100ms] text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[48px]">
              {service.h1}
            </h1>
            <p className="hero-copy-reveal [animation-delay:200ms] mt-[18px] max-w-[520px] text-[16px] leading-[1.65] text-[#5f5b55] md:text-[17px]">
              {service.subcopy}
            </p>

            <ul className="hero-copy-reveal [animation-delay:280ms] mt-[24px] grid gap-[10px]">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-[11px] text-[15px] leading-[1.45] text-[var(--color-clinic-navy)]">
                  <span className="mt-[1px] inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[var(--color-clinic-teal)] text-white">
                    <Check className="h-[13px] w-[13px]" aria-hidden />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="hero-copy-reveal [animation-delay:360ms] mt-[28px] flex flex-wrap items-center gap-[12px]">
              <a
                href="#book"
                className="inline-flex h-[50px] items-center justify-center gap-[8px] rounded-full bg-[var(--color-clinic-teal)] px-[32px] text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
              >
                Book your visit
                <ArrowRight className="h-[16px] w-[16px]" aria-hidden />
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[50px] items-center justify-center gap-[8px] rounded-full border border-[var(--color-clinic-navy)]/20 px-[26px] text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--color-clinic-navy)] transition-colors hover:border-[var(--color-clinic-navy)]/45"
              >
                Chat on WhatsApp
                <MessageCircle className="h-[16px] w-[16px]" aria-hidden />
              </a>
            </div>

            <p className="mt-[18px] flex items-center gap-[8px] text-[13px] font-medium text-[#6f6a64]">
              <BadgeCheck className="h-[16px] w-[16px] text-[var(--color-clinic-teal)]" aria-hidden />
              Medical-led care · natural-looking results · Lagos &amp; Abuja
            </p>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-[#e7efe7] md:aspect-auto md:h-[480px]">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 500px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-[#e9ede9] bg-white py-[22px]">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-center gap-x-[28px] gap-y-[10px] px-5 md:px-8">
          {TRUST.map((t) => (
            <span key={t} className="flex items-center gap-[8px] text-[13px] font-semibold text-[var(--color-clinic-navy)]">
              <span className="h-[6px] w-[6px] rounded-full bg-[var(--color-clinic-gold)]" aria-hidden />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* What to expect */}
      <section className="bg-white py-[52px] md:py-[70px]">
        <div className="mx-auto max-w-[1080px] px-5 md:px-8">
          <p className="mb-[10px] text-center text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
            How it works
          </p>
          <h2 className="mb-[36px] text-center text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[38px]">
            Three simple steps.
          </h2>
          <div className="grid gap-[14px] md:grid-cols-3 md:gap-[18px]">
            {service.expect.map((step, i) => (
              <div key={step.title} className="rounded-[12px] border border-[#e6ece7] bg-[var(--color-clinic-warm-bg)] p-[22px]">
                <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white text-[15px] font-bold text-[var(--color-clinic-teal)] shadow-sm">
                  {i + 1}
                </span>
                <h3 className="mt-[16px] text-[19px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                  {step.title}
                </h3>
                <p className="mt-[8px] text-[14px] leading-[1.6] text-[#65716e]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="scroll-mt-[70px] bg-[var(--color-clinic-warm-bg)] py-[52px] md:py-[72px]">
        <div className="mx-auto max-w-[720px] px-5">
          <p className="mb-[10px] text-center text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
            Book now
          </p>
          <h2 className="mb-[8px] text-center text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[38px]">
            Book your {service.treatmentLabel.toLowerCase()} visit
          </h2>
          <p className="mx-auto mb-[26px] max-w-[460px] text-center text-[15px] leading-[1.6] text-[#6f6a64]">
            Choose your clinic and pick a time that works — your booking is confirmed instantly.
          </p>
          <LandingBooking
            treatmentLabel={service.treatmentLabel}
            waMessage={service.waMessage}
            calSlug={service.slug}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-[52px] md:py-[70px]">
        <div className="mx-auto max-w-[760px] px-5 md:px-8">
          <h2 className="mb-[26px] text-center text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[34px]">
            Common questions
          </h2>
          <div className="grid gap-[10px]">
            {service.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-[10px] border border-[#e6ece7] bg-white px-[18px] py-[16px]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-[20px] text-[16px] font-bold text-[var(--color-clinic-navy)]">
                  {faq.q}
                  <span className="inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#eef5f2] text-[var(--color-clinic-teal)] transition-transform group-open:rotate-90">
                    <ChevronRight className="h-[15px] w-[15px]" aria-hidden />
                  </span>
                </summary>
                <p className="mt-[12px] text-[14px] leading-[1.65] text-[#65716e]">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-[34px] text-center">
            <a
              href="#book"
              className="inline-flex h-[50px] items-center justify-center gap-[8px] rounded-full bg-[var(--color-clinic-teal)] px-[34px] text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
            >
              Book your visit
              <ArrowRight className="h-[16px] w-[16px]" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="bg-[var(--color-clinic-navy)] text-white">
        <div className="mx-auto max-w-[1080px] px-5 py-[38px] md:px-8">
          <div className="flex flex-col gap-[18px] md:flex-row md:items-start md:justify-between">
            <div>
              <span
                className="inline-flex items-baseline gap-[5px] text-[18px] font-bold uppercase tracking-[0.07em]"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Reverse
                <span className="font-extrabold text-[#b8d6c9]">Aesthetics</span>
              </span>
              <div className="mt-[12px] grid gap-[6px] text-[13px] text-white/70">
                {LOCATIONS.map((loc) => (
                  <span key={loc.city} className="flex items-start gap-[8px]">
                    <MapPin className="mt-[2px] h-[14px] w-[14px] shrink-0 text-[#b8d6c9]" aria-hidden />
                    <span>
                      <strong className="text-white/90">{loc.city}:</strong> {loc.address}
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex h-[42px] items-center justify-center gap-[8px] rounded-full bg-[var(--color-clinic-teal)] px-[20px] text-[11px] font-bold uppercase tracking-[0.09em] text-white">
                <MessageCircle className="h-[14px] w-[14px]" aria-hidden />
                WhatsApp
              </a>
              <a href={`tel:${PHONE_TEL}`} className="text-[13px] text-white/70 hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div className="mt-[24px] border-t border-white/10 pt-[16px] text-[12px] text-white/45">
            <p>© 2025 Reverse Aesthetics. Information here is educational and does not replace personalized medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
