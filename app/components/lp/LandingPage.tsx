import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, ChevronRight, MapPin } from "lucide-react";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import LandingBooking from "./LandingBooking";
import { waLink, type LpService } from "./lpData";
import { LOCATIONS, PHONE_DISPLAY, PHONE_TEL } from "@/app/components/home/homeData";

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

            <div className="hero-copy-reveal [animation-delay:360ms] mt-[28px] flex flex-wrap items-center gap-[10px] md:gap-[12px]">
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[50px] flex-1 items-center justify-center gap-[8px] rounded-full border border-[var(--color-clinic-navy)]/20 px-[16px] text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-clinic-navy)] transition-colors hover:border-[var(--color-clinic-navy)]/45 sm:flex-none md:px-[26px] md:text-[13px] md:tracking-[0.1em]"
              >
                Chat on WhatsApp
                <WhatsAppIcon className="h-[16px] w-[16px]" />
              </a>
              <a
                href="#book"
                className="inline-flex h-[50px] flex-1 items-center justify-center gap-[8px] rounded-full bg-[var(--color-clinic-teal)] px-[18px] text-[11px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] sm:flex-none md:px-[32px] md:text-[13px] md:tracking-[0.1em]"
              >
                Book your visit
                <ArrowRight className="h-[16px] w-[16px]" aria-hidden />
              </a>
            </div>

            <p className="mt-[18px] flex items-center gap-[8px] text-[13px] font-medium text-[#6f6a64]">
              <BadgeCheck className="h-[16px] w-[16px] shrink-0 text-[var(--color-clinic-teal)]" aria-hidden />
              Led by Dr. Ral Abana, GMC (UK) · Non-surgical · Lagos &amp; Abuja
            </p>
          </div>

          {/* Desktop-only: on mobile the Real results section carries the visuals */}
          <div className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-[#e4f1f2] md:block md:aspect-auto md:h-[480px]">
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

      {/* Real results */}
      {service.results && service.results.length > 0 && (
        <section className="bg-[var(--color-clinic-warm-bg)] pb-[52px] pt-[32px] md:pb-[70px] md:pt-[70px]">
          <div className="mx-auto max-w-[1080px] px-5 md:px-8">
            <p className="mb-[10px] text-center text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
              Real results
            </p>
            <h2 className="mb-[28px] text-center text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[38px]">
              Recent results from our clinic.
            </h2>
            <div className="grid gap-[14px] sm:grid-cols-2 md:gap-[18px]">
              {service.results.map((result) => (
                <figure
                  key={result.label}
                  className="overflow-hidden rounded-[14px] border border-[#e6ece7] bg-white"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={result.image}
                      alt={result.imageAlt}
                      fill
                      sizes="(min-width: 768px) 520px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between px-[20px] py-[14px]">
                    <span className="text-[15px] font-semibold text-[var(--color-clinic-navy)]">
                      {result.label}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-teal)]">
                      Real patient
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What is it? (only for services a cold audience may not recognize) */}
      {service.about && (
        <section className="bg-white py-[52px] md:py-[70px]">
          <div className="mx-auto max-w-[760px] px-5 md:px-8">
            <p className="mb-[10px] text-center text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
              Understanding the treatment
            </p>
            <h2 className="mb-[18px] text-center text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[38px]">
              {service.about.title}
            </h2>
            <p className="mx-auto max-w-[620px] text-center text-[16px] leading-[1.7] text-[#5f5b55]">
              {service.about.body}
            </p>
          </div>
          <div className="mx-auto mt-[32px] grid max-w-[720px] gap-x-[40px] gap-y-[24px] px-5 sm:grid-cols-2 md:mt-[40px] md:px-8">
            {service.about.areas.map((area) => (
              <div key={area.label} className="flex items-start gap-[12px]">
                <span className="mt-[5px] h-[9px] w-[9px] shrink-0 rounded-full border-2 border-[var(--color-clinic-teal)]" aria-hidden />
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-navy)]">
                    {area.label}
                  </p>
                  <p className="mt-[4px] text-[14px] leading-[1.6] text-[#65716e]">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What to expect */}
      <section className="bg-white py-[52px] md:py-[70px]">
        <div className="mx-auto max-w-[1080px] px-5 md:px-8">
          <p className="mb-[10px] text-center text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
            How it works
          </p>
          <h2 className="mb-[36px] text-center text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[38px]">
            Three simple steps.
          </h2>
          <ol className="mx-auto max-w-[620px]">
            {service.expect.map((step, i) => {
              const last = i === service.expect.length - 1;
              return (
                <li key={step.title} className="relative flex gap-[18px] pb-[34px] last:pb-0 md:gap-[22px]">
                  {!last && (
                    <span
                      className="absolute bottom-0 left-[11px] top-[30px] w-[2px] bg-[#cfe2e2]"
                      aria-hidden
                    />
                  )}
                  <span
                    className={`relative z-10 mt-[1px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-clinic-teal)] bg-white ${
                      last ? "bg-[var(--color-clinic-teal)]" : ""
                    }`}
                    aria-hidden
                  >
                    {!last && <span className="h-[8px] w-[8px] rounded-full bg-[var(--color-clinic-teal)]" />}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-[5px] text-[19px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                      {step.title}
                    </h3>
                    <p className="mt-[5px] text-[14px] leading-[1.6] text-[#65716e]">{step.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
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
          <div className="mx-auto max-w-[620px] border-t border-[#e6ece7]">
            {service.faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-[#e6ece7]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-[20px] py-[18px] text-[16px] font-bold text-[var(--color-clinic-navy)]">
                  {faq.q}
                  <span className="inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[var(--color-clinic-teal)] transition-transform group-open:rotate-90">
                    <ChevronRight className="h-[15px] w-[15px]" aria-hidden />
                  </span>
                </summary>
                <p className="-mt-[6px] pb-[18px] pr-[30px] text-[14px] leading-[1.65] text-[#65716e]">{faq.a}</p>
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
                <span className="font-extrabold text-[#aedee0]">Aesthetics</span>
              </span>
              <div className="mt-[12px] grid gap-[6px] text-[13px] text-white/70">
                {LOCATIONS.map((loc) => (
                  <span key={loc.city} className="flex items-start gap-[8px]">
                    <MapPin className="mt-[2px] h-[14px] w-[14px] shrink-0 text-[#aedee0]" aria-hidden />
                    <span>
                      <strong className="text-white/90">{loc.city}:</strong> {loc.address}
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex h-[42px] items-center justify-center gap-[8px] rounded-full bg-[var(--color-clinic-teal)] px-[20px] text-[11px] font-bold uppercase tracking-[0.09em] text-white">
                <WhatsAppIcon variant="mono" className="h-[14px] w-[14px]" />
                WhatsApp
              </a>
              <a href={`tel:${PHONE_TEL}`} className="text-[13px] text-white/70 hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div className="mt-[24px] border-t border-white/10 pt-[16px] text-[12px] text-white/45">
            <p>© {new Date().getFullYear()} Reverse Aesthetics. Information here is educational and does not replace personalized medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
