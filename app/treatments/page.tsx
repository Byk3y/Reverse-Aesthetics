import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import ClinicNavbar from "../components/home/ClinicNavbar";
import { Breadcrumbs } from "../components/home/Breadcrumbs";
import ScrollMotion from "../components/home/ScrollMotion";
import { SiteFooter } from "../components/home/SiteFooter";
import FloatingWhatsApp from "../components/home/FloatingWhatsApp";
import { BOOKING_URL, WHATSAPP_URL } from "../components/home/homeData";

export const metadata: Metadata = {
  title: "Our Treatments | Reverse Aesthetics Lagos & Nigeria",
  description: "Explore every treatment at Reverse Aesthetics — Botox, HIFU, laser resurfacing, dental, IV therapy, hair transplant and weight loss in Lagos and Abuja.",
  keywords: ["Aesthetic Treatments Lagos", "Cosmetic Procedures Nigeria", "Skin Treatments Lekki", "Beauty Clinic Lagos", "Medical Aesthetics Nigeria"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments",
  },
  openGraph: {
    title: "Our Treatments | Reverse Aesthetics Lagos & Nigeria",
    description: "Explore all aesthetic treatments at Reverse Aesthetics in Lagos and Nigeria.",
    url: "https://reverseaesthetic.com/treatments",
  }
};

const treatmentCategories = [
  {
    category: "Aesthetics & Dermatology",
    treatments: [
      {
        name: "Botox & Dermal Fillers",
        description: "Targeted injectables for wrinkle reduction, volume restoration, and facial harmony.",
        href: "/treatments/botox-and-dermal-fillers-lagos",
      },
      {
        name: "HIFU Skin Tightening",
        description: "Non-surgical facelift using focused ultrasound for lifting and collagen regeneration.",
        href: "/treatments/hifu-skin-tightening-nigeria",
      },
      {
        name: "Laser Skin Resurfacing",
        description: "Precision lasers for pigmentation correction, acne scars, and skin renewal.",
        href: "/treatments/laser-skin-resurfacing-lagos",
      },
      {
        name: "IV Glow Therapy",
        description: "Medical-grade vitamin infusions for skin radiance, immunity, and anti-aging.",
        href: "/treatments/iv-glow-therapy-lagos",
      },
      {
        name: "Acne & Scar Treatment",
        description: "Medical dermatology for active acne, post-acne marks, and deep scarring.",
        href: "/treatments/acne-scar-treatment-lagos",
      },
    ],
  },
  {
    category: "Weight Loss",
    treatments: [
      {
        name: "Medical Weight Loss & Body Contouring",
        description: "Physician-guided weight loss programmes, injection support, and body sculpting.",
        href: "/treatments/medical-weight-loss-lagos",
      },
    ],
  },
  {
    category: "Dental Aesthetics",
    treatments: [
      {
        name: "Teeth Whitening & Veneers",
        description: "Professional whitening, porcelain veneers, and complete smile design.",
        href: "/treatments/dental-aesthetics-lagos",
      },
    ],
  },
  {
    category: "Hair Restoration",
    treatments: [
      {
        name: "Hair Transplant & Restoration",
        description: "FUE/DHI transplants, PRP therapy, and non-surgical hair regeneration.",
        href: "/treatments/hair-transplant-nigeria",
      },
    ],
  },
];

export default function TreatmentsPage() {
  /* Flatten before numbering — mapping inside flatMap restarts `i` at 0 for
     every category, which made four separate items all claim position 1. */
  const allTreatments = treatmentCategories.flatMap((cat) => cat.treatments);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Aesthetic Treatments at Reverse Aesthetics",
    "description": "Complete list of aesthetic, dental, hair, and wellness treatments available at Reverse Aesthetics in Lagos, Nigeria.",
    "numberOfItems": allTreatments.length,
    "itemListElement": allTreatments.map((t, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": t.name,
      "url": `https://reverseaesthetic.com${t.href}`,
    })),
  };

  return (
    <div
      className="w-full bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <ClinicNavbar />
      <div className="h-[118px] md:h-[126px] bg-[var(--color-clinic-hero-top)]" />

      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-clinic-hero-top)]">
        <Breadcrumbs items={[{ label: "Treatments" }]} />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Treatments
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Our{" "}
            <span className="text-[var(--color-clinic-hero-accent)]">
              Treatments
            </span>
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            Comprehensive aesthetic care across four specialist disciplines. Every treatment is medically-led, individually tailored, and designed to deliver natural, lasting results.
          </p>
        </div>
      </section>

      <div className="motion-scope">
        <ScrollMotion />

        {/* TREATMENT CATEGORIES */}
        {treatmentCategories.map((cat, index) => (
          <section
            key={cat.category}
            className={`py-[70px] md:py-[100px] ${
              index % 2 !== 0 ? "bg-[#eef2ef]" : "bg-white"
            }`}
          >
            <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
              <div className="motion-heading mb-[34px] max-w-[640px]">
                <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                  0{index + 1} / Specialist care
                </p>
                <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                  {cat.category}
                </h2>
              </div>

              <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3 md:gap-[18px]">
                {cat.treatments.map((treatment) => (
                  <Link
                    key={treatment.href}
                    href={treatment.href}
                    className="motion-card motion-lift group flex flex-col rounded-[14px] border border-[#e9ede9] bg-[#f8fbf9] p-[22px] transition-transform duration-300 hover:-translate-y-1 md:p-[26px]"
                  >
                    <h3 className="text-[19px] font-bold leading-[1.2] tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                      {treatment.name}
                    </h3>
                    <p className="mt-[10px] flex-1 text-[14px] leading-[1.6] text-[#65716e]">
                      {treatment.description}
                    </p>
                    <span className="mt-[18px] inline-flex items-center gap-[7px] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-teal)]">
                      Learn More
                      <ChevronRight
                        className="h-[15px] w-[15px] transition-transform duration-300 group-hover:translate-x-[3px]"
                        aria-hidden
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA BAND */}
        <section className="bg-white pb-[80px] pt-[70px] md:pb-[110px] md:pt-[100px]">
          <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
            <div className="reveal-on-scroll relative overflow-hidden rounded-[22px] bg-[var(--color-clinic-navy)] px-[26px] py-[48px] text-center md:px-[40px] md:py-[68px]">
              <p className="mb-[14px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)]">
                Ready to explore your options?
              </p>
              <h2 className="mx-auto max-w-[640px] text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-[40px]">
                Let&apos;s build a natural-first plan that fits you.
              </h2>
              <p className="mx-auto mt-[16px] max-w-[520px] text-[15px] leading-[1.7] text-white/70 md:text-[16px]">
                Book a consultation in Lagos or Abuja, or send us a quick message
                — we&apos;ll help you take the first step.
              </p>
              <div className="mt-[30px] flex flex-col items-center justify-center gap-[12px] sm:flex-row">
                <Link
                  href={BOOKING_URL}
                  className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[40px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] sm:w-auto"
                >
                  Book a Consultation
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
