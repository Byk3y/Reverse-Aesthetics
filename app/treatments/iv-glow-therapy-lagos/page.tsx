import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import ClinicNavbar from "../../components/home/ClinicNavbar";
import { Breadcrumbs } from "../../components/home/Breadcrumbs";
import ScrollMotion from "../../components/home/ScrollMotion";
import { SiteFooter } from "../../components/home/SiteFooter";
import FloatingWhatsApp from "../../components/home/FloatingWhatsApp";
import TrustHighlights from "../../components/TrustHighlights";
import { BOOKING_URL, WHATSAPP_URL } from "../../components/home/homeData";
import { ORG_ID } from "../../lib/schema";

export const metadata: Metadata = {
  title: "IV Drips & Glow Therapy in Lagos | Reverse Aesthetics",
  description: "Premium IV vitamin drips in Lagos: glutathione skin brightening, NAD+ and immunity infusions. Medical-grade wellness treatments. Book now.",
  keywords: ["IV Drip Lagos", "Vitamin IV Therapy Nigeria", "Glutathione Drip Lagos", "IV Glow Therapy Lekki", "NAD Drip Nigeria", "Wellness IV Infusion Lagos"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/iv-glow-therapy-lagos",
  },
  openGraph: {
    title: "IV Glow Therapy Lagos | Vitamin IV Drip Nigeria | Reverse Aesthetics",
    description: "Premium IV vitamin drips and glow therapy treatments in Lagos.",
    url: "https://reverseaesthetic.com/treatments/iv-glow-therapy-lagos",
  }
};

const FEATURES = [
  { title: "Glutathione Skin Brightening Drip", body: "Glutathione is an antioxidant the body makes itself. It takes part in how the liver clears waste and in the pathway that controls how much pigment skin produces, which is why patients ask for it for tone and brightness. The evidence for infused glutathione as a skin-lightening treatment is thin, so we go through what it can and cannot do before you commit to a course." },
  { title: "NAD+ Anti-Aging Infusion", body: "NAD+ is a coenzyme cells use to produce energy and repair DNA, and levels fall with age. Patients book this drip for energy and mental clarity. Human research on infused NAD+ is still early, so we will tell you what is known and what is not rather than promise you a result." },
  { title: "Immunity & Energy Boost Drip", body: "Vitamin C, B-complex, zinc and selenium, all nutrients the immune system depends on. Patients book this one around long-haul travel, heavy working weeks, or after an illness. It is not a treatment for an active infection, and fatigue that persists needs a proper medical workup rather than a drip." },
];

const FAQS = [
  { question: "What is IV glow therapy?", answer: "IV glow therapy is a medical wellness treatment where vitamins and antioxidants, usually including glutathione and Vitamin C, are infused into your bloodstream through a drip. Because it bypasses digestion, the full dose reaches circulation. That is the practical difference from taking the same nutrients by mouth." },
  { question: "How often should I get an IV drip?", answer: "For skin brightening, we recommend weekly sessions for the first 4–6 weeks, then bi-weekly or monthly maintenance. For general wellness and immunity, monthly sessions are typically sufficient. Your practitioner will tailor a schedule based on your specific goals." },
  { question: "Are IV vitamin drips safe?", answer: "Yes. All our IV treatments are administered by qualified medical professionals in a clinical setting. We use pharmaceutical-grade ingredients and follow strict sterile protocols. A brief health screening is conducted before every session to ensure the treatment is appropriate for you." },
];

const RELATED = [
  { href: "/treatments/medical-weight-loss-lagos", name: "Medical Weight Loss", description: "Physician-guided weight loss programmes, injection support, and body sculpting." },
  { href: "/treatments/acne-scar-treatment-lagos", name: "Acne & Scar Treatment", description: "Medical dermatology for active acne, post-acne marks, and deep scarring." },
  { href: "/treatments/hifu-skin-tightening-nigeria", name: "HIFU Skin Tightening", description: "Non-surgical facelift using focused ultrasound for lifting and collagen regeneration." },
];

export default function IvGlowTherapyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "IV Glow Therapy and Vitamin Infusions",
    "procedureType": "Intravenous wellness therapy",
    "description": "Medical-grade IV vitamin infusions including glutathione skin brightening, NAD+ anti-aging, and immune-boosting drips.",
    // The clinic is one entity, defined in app/lib/schema.ts and emitted
    // site-wide. Referencing it by @id keeps a single business in the graph
    // rather than eight unlinked copies whose addresses can drift apart.
    "provider": { "@id": ORG_ID }
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
        <Breadcrumbs
          items={[
            { label: "Treatments", href: "/treatments" },
            { label: "IV Glow Therapy" },
          ]}
        />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Wellness & IV Therapy
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Premium <span className="text-[var(--color-clinic-hero-accent)]">IV Glow Therapy</span> & Vitamin Drips in Lagos
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            Replenish your body from the inside out with medical-grade vitamin infusions. Our drips are mixed to your goals and given by our medical team, so fluids, vitamins and antioxidants go straight into the bloodstream rather than through the gut. A short health screening before each session confirms the formula that suits you.
          </p>
          <div className="hero-copy-reveal [animation-delay:340ms] mt-[30px] flex justify-center">
            <Link
              href="/booking"
              className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[40px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] sm:w-auto"
            >
              Book Your Drip Session
            </Link>
          </div>
        </div>
      </section>

      <div className="motion-scope">
        <ScrollMotion />

        <TrustHighlights />

        {/* OVERVIEW */}
        <section className="bg-[#eef2ef] py-[70px] md:py-[100px]">
          <div className="mx-auto grid max-w-[1160px] gap-[28px] px-[20px] md:grid-cols-2 md:items-center md:gap-[52px] md:px-[40px]">
            <div className="motion-image-frame reveal-on-scroll relative aspect-[4/5] overflow-hidden rounded-[16px] bg-[#e4f1f2]">
              <Image
                src="/images/generated/hero_iv_therapy.avif"
                alt="Vitamin IV infusion drip therapy in Nigeria"
                fill
                priority
                sizes="(min-width: 768px) 540px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>

            <div className="motion-heading">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Wellness & IV Therapy
              </p>
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Glow from within with <span className="text-[var(--color-clinic-hero-accent)]">medical-grade infusions</span>.
              </h2>
              <p className="mt-[18px] max-w-[560px] text-[15px] leading-[1.75] text-[#5f6c69] md:text-[16px]">
                An oral supplement has to survive the gut and the liver before any of it reaches your bloodstream, and how much arrives varies by nutrient and by person. An infusion skips that step, so what goes into the drip is what enters circulation. Whether that helps depends on what you are actually short of, which is why we screen before we treat.
              </p>

              <div className="mt-[26px] grid gap-[12px]">
                {FEATURES.map((item) => (
                  <div
                    key={item.title}
                    className="motion-card rounded-[12px] bg-white p-[18px] md:p-[20px]"
                  >
                    <h3 className="text-[16px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                      {item.title}
                    </h3>
                    <p className="mt-[8px] text-[14px] leading-[1.65] text-[#65716e]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-[70px] md:py-[100px]">
          <div className="mx-auto max-w-[820px] px-[20px] md:px-[40px]">
            <div className="motion-heading mb-[34px] text-center">
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Frequently Asked Questions
              </h2>
              <p className="mt-[14px] text-[15px] leading-[1.7] text-[#65716e] md:text-[16px]">
                What to know about IV therapy in Lagos.
              </p>
            </div>

            <div className="grid gap-[14px]">
              {FAQS.map((item) => (
                <div
                  key={item.question}
                  className="motion-card rounded-[14px] border border-[#e9ede9] bg-[#f8fbf9] p-[22px] md:p-[26px]"
                >
                  <h3 className="text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                    {item.question}
                  </h3>
                  <p className="mt-[10px] text-[14px] leading-[1.65] text-[#65716e] md:text-[15px]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED TREATMENTS */}
        <section className="bg-[#eef2ef] py-[70px] md:py-[100px]">
          <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
            <div className="motion-heading mb-[34px] text-center">
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Related <span className="text-[var(--color-clinic-hero-accent)]">Treatments</span>
              </h2>
            </div>

            <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3 md:gap-[18px]">
              {RELATED.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="motion-card motion-lift group flex flex-col rounded-[14px] border border-[#e9ede9] bg-white p-[22px] transition-transform duration-300 hover:-translate-y-1 md:p-[26px]"
                >
                  <h3 className="text-[19px] font-bold leading-[1.2] tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                    {item.name}
                  </h3>
                  <p className="mt-[10px] flex-1 text-[14px] leading-[1.6] text-[#65716e]">
                    {item.description}
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
