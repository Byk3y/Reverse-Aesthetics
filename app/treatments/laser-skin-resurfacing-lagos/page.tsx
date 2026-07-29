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
  title: "Laser Skin Resurfacing in Lagos | Reverse Aesthetics",
  description: "Advanced laser resurfacing for pigmentation, acne scars and uneven skin tone in Lagos. Doctor-led, using medical-grade laser technology. Book now.",
  keywords: ["Laser Skin Treatment Lagos", "Pigmentation Laser Nigeria", "Skin Resurfacing Lagos", "Acne Scar Laser Lekki", "Fractional Laser Nigeria", "Dark Spot Treatment Lagos"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/laser-skin-resurfacing-lagos",
  },
  openGraph: {
    title: "Laser Skin Resurfacing Lagos | Pigmentation Treatment Nigeria | Reverse Aesthetics",
    description: "Advanced laser skin resurfacing for pigmentation and acne scars in Lagos.",
    url: "https://reverseaesthetic.com/treatments/laser-skin-resurfacing-lagos",
  }
};

const FEATURES = [
  { title: "Fractional Laser Resurfacing", body: "Creates thousands of microscopic treatment zones in the skin, stimulating rapid collagen remodelling while leaving surrounding tissue intact for faster healing. Ideal for textural irregularities, fine lines, and shallow scars." },
  { title: "Pigmentation & Dark Spot Correction", body: "Targeted laser wavelengths break down excess melanin deposits that cause dark spots, sun damage, and uneven skin tone. We use skin-type-specific settings with built-in cooling to protect the epidermis during treatment." },
  { title: "Acne Scar Laser Therapy", body: "For deeper, pitted acne scars we resurface across a course of sessions rather than in one aggressive pass, which is the safer route on darker skin. Laser is often combined with microneedling. Deep scars soften; they do not disappear." },
];

const FAQS = [
  { question: "What skin concerns can laser resurfacing treat?", answer: "Laser resurfacing effectively treats hyperpigmentation, melasma, sun damage, acne scars, enlarged pores, fine lines, and uneven skin texture. During your consultation, our doctor will assess your skin and recommend the most effective laser type for your specific concerns." },
  { question: "How many laser sessions are needed?", answer: "Most clients require 3–6 sessions spaced 4–6 weeks apart for optimal results. Mild pigmentation may clear in as few as 2 sessions, while deeper scars typically require a longer treatment course. We create a tailored plan with realistic timelines during your first visit." },
  { question: "Is laser treatment safe for dark skin?", answer: "Yes, when it is done by experienced practitioners on the right equipment. Our clinic uses lasers selected for use on Fitzpatrick skin types IV–VI, we patch test first, and we start at conservative settings. No laser is risk-free on any skin tone, and we go through the specific risks for your skin at the consultation." },
];

const RELATED = [
  { href: "/treatments/hifu-skin-tightening-nigeria", name: "HIFU Skin Tightening", description: "Non-surgical facelift using focused ultrasound for lifting and collagen regeneration." },
  { href: "/treatments/acne-scar-treatment-lagos", name: "Acne & Scar Treatment", description: "Medical dermatology for active acne, post-acne marks, and deep scarring." },
  { href: "/treatments/botox-and-dermal-fillers-lagos", name: "Botox & Dermal Fillers", description: "Targeted injectables for wrinkle reduction, volume restoration, and facial harmony." },
];

export default function LaserSkinResurfacingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Laser Skin Resurfacing",
    "procedureType": "Dermatological laser treatment",
    "description": "Advanced laser technology for skin resurfacing, pigmentation correction, and acne scar treatment.",
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
            { label: "Laser Skin Resurfacing" },
          ]}
        />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Laser & Pigmentation
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Expert <span className="text-[var(--color-clinic-hero-accent)]">Laser Skin Resurfacing</span> in Lagos
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            Target stubborn pigmentation, smooth acne scars, and reveal fresh, even-toned skin with our medical-grade laser systems. Protocols are set for melanin-rich skin, and every session is doctor-led.
          </p>
          <div className="hero-copy-reveal [animation-delay:340ms] mt-[30px] flex justify-center">
            <Link
              href="/booking"
              className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[40px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] sm:w-auto"
            >
              Book Your Skin Assessment
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
                src="/images/generated/hero_laser_treatment.avif"
                alt="Laser pigmentation treatment for dark skin in Nigeria"
                fill
                priority
                sizes="(min-width: 768px) 540px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>

            <div className="motion-heading">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Laser & Pigmentation
              </p>
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Precision lasers for <span className="text-[var(--color-clinic-hero-accent)]">clearer, more even skin</span>.
              </h2>
              <p className="mt-[18px] max-w-[560px] text-[15px] leading-[1.75] text-[#5f6c69] md:text-[16px]">
                Hyperpigmentation, post-inflammatory marks, melasma, and acne scarring are among the most common concerns for darker skin tones. Our laser protocols are calibrated for melanin-rich skin to lower the risk of post-inflammatory hyperpigmentation, which is what goes wrong when settings meant for pale skin are used on Fitzpatrick IV–VI.
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
                Key questions about laser skin treatments in Lagos.
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
