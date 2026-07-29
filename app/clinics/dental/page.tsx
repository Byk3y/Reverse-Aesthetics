import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import ClinicNavbar from "../../components/home/ClinicNavbar";
import { Breadcrumbs } from "../../components/home/Breadcrumbs";
import ScrollMotion from "../../components/home/ScrollMotion";
import { SiteFooter } from "../../components/home/SiteFooter";
import FloatingWhatsApp from "../../components/home/FloatingWhatsApp";
import { BOOKING_URL, WHATSAPP_URL } from "../../components/home/homeData";

export const metadata = {
  title: "Dental Aesthetics | Reverse Aesthetics Lagos",
  description: "Premium dental aesthetics including teeth whitening, scaling and polishing at Reverse Aesthetics Lekki.",
  alternates: { canonical: "/clinics/dental" },
};

const HIGHLIGHTS = [
  "Painless scaling and polishing",
  "Enamel-safe professional whitening",
  "Smile design consultation",
  "Luxury, spa-like dental environment",
];

const TREATMENTS = [
  {
    title: "Laser Teeth Whitening",
    body: "Lift stains up to 8 shades lighter in a single visit. We use professional-grade, enamel-safe bleaching agents activated by laser technology for immediate, brilliant results with minimal sensitivity.",
    tags: ["Cosmetic", "1 Hour"],
    price: "From ₦80,000",
    href: "/treatments/dental-aesthetics-lagos",
    linkLabel: "Learn More",
  },
  {
    title: "Scaling & Polishing",
    body: "The foundation of a healthy smile. Gentle removal of plaque and tartar buildup, followed by a high-gloss polish to remove superficial surface stains and freshen breath.",
    tags: ["Hygiene", "Routine"],
    price: "From ₦35,000",
    href: BOOKING_URL,
    linkLabel: "Book Consult",
  },
];

export default function DentalClinic() {
  return (
    <div
      className="w-full bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <ClinicNavbar />
      <div className="h-[118px] md:h-[126px] bg-[var(--color-clinic-hero-top)]" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-clinic-hero-top)]">
        <Breadcrumbs
          items={[
            { label: "Clinics", href: "/clinics" },
            { label: "Dental Aesthetics" },
          ]}
        />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Dental Aesthetics
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Design your{" "}
            <span className="text-[var(--color-clinic-hero-accent)]">
              Signature Smile
            </span>
            .
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            A beautiful smile is the ultimate accessory. Our dental experts focus on
            aesthetic enhancements that brighten and perfect your teeth.
          </p>
          <div className="hero-copy-reveal [animation-delay:340ms] mt-[30px] flex justify-center">
            <Link
              href={BOOKING_URL}
              className="inline-flex h-[52px] items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[40px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
            >
              Consult a Dentist
            </Link>
          </div>
        </div>
      </section>

      <div className="motion-scope">
        <ScrollMotion />

        {/* PHILOSOPHY / INTRO */}
        <section className="bg-white py-[70px] md:py-[100px]">
          <div className="mx-auto grid max-w-[1160px] gap-[28px] px-[20px] md:grid-cols-2 md:items-center md:gap-[52px] md:px-[40px]">
            <div className="motion-heading order-2 md:order-1">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Our approach
              </p>
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Where oral health meets high aesthetics.
              </h2>
              <p className="mt-[18px] max-w-[560px] text-[15px] leading-[1.75] text-[#5f6c69] md:text-[16px]">
                Your smile is often the first thing people notice. Our dental clinic doesn&apos;t just treat teeth;
                we design smiles that complement your facial features and boost your confidence.
              </p>
              <p className="mt-[14px] max-w-[560px] text-[15px] leading-[1.75] text-[#5f6c69] md:text-[16px]">
                From professional hygiene routines to advanced whitening systems, we provide gentle,
                premium dental care in a luxury environment designed to alleviate any dental anxiety.
              </p>

              <div className="mt-[26px] grid gap-[12px]">
                {HIGHLIGHTS.map((item) => (
                  <div
                    key={item}
                    className="motion-card flex items-start gap-[12px] rounded-[10px] bg-[#f8fbf9] px-[16px] py-[13px]"
                  >
                    <span className="mt-[1px] inline-flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[var(--color-clinic-teal)] text-white">
                      <Check className="h-[14px] w-[14px]" aria-hidden />
                    </span>
                    <span className="text-[14px] font-medium leading-[1.45] text-[var(--color-clinic-navy)] md:text-[15px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="motion-image-frame reveal-on-scroll relative order-1 aspect-[4/5] overflow-hidden rounded-[16px] bg-[#e4f1f2] md:order-2">
              <Image
                src="/images/generated/hero_dental_smile.avif"
                alt="Dental Aesthetics"
                fill
                sizes="(min-width: 768px) 540px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* TREATMENTS */}
        <section className="bg-[#eef2ef] py-[70px] md:py-[100px]">
          <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
            <div className="motion-heading mb-[34px] max-w-[640px]">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Dental Aesthetics
              </p>
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Our Treatments
              </h2>
            </div>

            <div className="grid gap-[14px] md:grid-cols-2 md:gap-[18px]">
              {TREATMENTS.map((treatment) => (
                <div
                  key={treatment.title}
                  className="motion-card motion-lift flex flex-col rounded-[14px] border border-[#e9ede9] bg-white p-[22px] md:p-[26px]"
                >
                  <h3 className="text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[26px]">
                    {treatment.title}
                  </h3>
                  <p className="mt-[12px] flex-1 text-[15px] leading-[1.7] text-[#65716e]">
                    {treatment.body}
                  </p>
                  <div className="mt-[18px] flex flex-wrap gap-[8px]">
                    {treatment.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#e4f1f2] px-[12px] py-[6px] text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-teal)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-[22px] flex flex-wrap items-center justify-between gap-[12px] border-t border-[#e9ede9] pt-[18px]">
                    <span className="text-[17px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                      {treatment.price}
                    </span>
                    <Link
                      href={treatment.href}
                      className="group inline-flex items-center gap-[7px] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-teal)] transition-colors hover:text-[var(--color-clinic-teal-dark)]"
                    >
                      {treatment.linkLabel}
                      <ChevronRight
                        className="h-[15px] w-[15px] transition-transform duration-300 group-hover:translate-x-[3px]"
                        aria-hidden
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="bg-white pb-[80px] pt-[70px] md:pb-[110px] md:pt-[100px]">
          <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
            <div className="reveal-on-scroll relative overflow-hidden rounded-[22px] bg-[var(--color-clinic-navy)] px-[26px] py-[48px] text-center md:px-[40px] md:py-[68px]">
              <p className="mb-[14px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)]">
                Ready to explore your options?
              </p>
              <h2 className="mx-auto max-w-[640px] text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-[40px]">
                Ready to begin your transformation?
              </h2>
              <p className="mx-auto mt-[16px] max-w-[520px] text-[15px] leading-[1.7] text-white/70 md:text-[16px]">
                Book a consultation with our expert team and discover what&apos;s possible.
              </p>
              <div className="mt-[30px] flex flex-col items-center justify-center gap-[12px] sm:flex-row">
                <Link
                  href={BOOKING_URL}
                  className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[40px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] sm:w-auto"
                >
                  Book a Visit
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[52px] w-full items-center justify-center gap-[9px] rounded-full border border-white/25 px-[34px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10 sm:w-auto"
                >
                  Chat on WhatsApp
                  <WhatsAppIcon variant="mono" className="h-[16px] w-[16px]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>

      <FloatingWhatsApp />
    </div>
  );
}
