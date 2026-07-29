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
  title: "Acne & Scar Treatment in Lagos | Reverse Aesthetics",
  description: "Doctor-led acne and scar treatment in Lagos. Medical-grade solutions for active acne, post-acne marks and deep scarring. Book a consultation.",
  keywords: ["Acne Treatment Lagos", "Scar Treatment Nigeria", "Dermatologist Lagos", "Acne Clinic Lekki", "Acne Scar Removal Nigeria", "Skin Doctor Lagos"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/acne-scar-treatment-lagos",
  },
  openGraph: {
    title: "Acne & Scar Treatment in Lagos | Reverse Aesthetics",
    description: "Doctor-led acne and scar treatment in Lagos.",
    url: "https://reverseaesthetic.com/treatments/acne-scar-treatment-lagos",
  }
};

const FEATURES = [
  { title: "Medical Acne Management", body: "A comprehensive programme combining prescription topicals, oral medications where appropriate, and in-clinic treatments to control active acne. We address the underlying cause—whether hormonal, bacterial, or inflammatory—rather than just treating symptoms." },
  { title: "Chemical Peels & Microneedling", body: "Medical-grade chemical peels accelerate cell turnover and lighten post-inflammatory hyperpigmentation. Microneedling with collagen-inducing therapy stimulates your skin's repair mechanism, smoothing shallow scars and improving overall texture." },
  { title: "Scar Revision & Skin Renewal", body: "For deeper, pitted, or ice-pick scars, we combine fractional laser resurfacing with subcision and PRP therapy to rebuild the skin from within. Combining methods generally does more for old scarring than any single treatment, though deep scars soften rather than disappear." },
];

const FAQS = [
  { question: "What causes adult acne?", answer: "Adult acne is commonly triggered by hormonal fluctuations, stress, diet, and environmental factors. In women, it often worsens around menstrual cycles or during perimenopause. Our doctors investigate the root cause through a thorough skin analysis and, when needed, blood work to guide your treatment plan." },
  { question: "How long does acne scar treatment take?", answer: "Scar treatment runs as a course, not a single visit, and most plans run over 3–6 months depending on scar depth and type. We set expectations during your consultation and photograph progress at each visit, so you can judge the change against a record rather than against memory." },
  { question: "Can dark skin safely undergo scar treatment?", answer: "Yes, with settings chosen for it. Melanin-rich skin (Fitzpatrick types IV–VI) is more prone to post-inflammatory hyperpigmentation, so we work at lower laser settings, milder peel concentrations and shallower microneedling depths than the same treatment would use on pale skin. That lowers the risk; it does not remove it, and we go through it with you first." },
];

const RELATED = [
  { href: "/treatments/laser-skin-resurfacing-lagos", name: "Laser Skin Resurfacing", description: "Precision lasers for pigmentation correction, acne scars, and skin renewal." },
  { href: "/treatments/botox-and-dermal-fillers-lagos", name: "Botox & Dermal Fillers", description: "Targeted injectables for wrinkle reduction, volume restoration, and facial harmony." },
  { href: "/treatments/hifu-skin-tightening-nigeria", name: "HIFU Skin Tightening", description: "Non-surgical facelift using focused ultrasound for lifting and collagen regeneration." },
];

export default function AcneScarTreatmentPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Acne and Scar Treatment",
    "procedureType": "Dermatological treatment",
    "description": "Comprehensive acne management and scar revision including medical-grade peels, microneedling, and laser therapy.",
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
            { label: "Acne & Scar Treatment" },
          ]}
        />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Dermatology
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Advanced <span className="text-[var(--color-clinic-hero-accent)]">Acne</span> & <span className="text-[var(--color-clinic-hero-accent)]">Scar Treatment</span> in Lagos
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            Clear active breakouts, fade stubborn marks, and smooth deep scars with our medical dermatology approach. Our doctors combine prescription therapy with in-clinic treatment, starting from what is driving your breakouts rather than from the surface.
          </p>
          <div className="hero-copy-reveal [animation-delay:340ms] mt-[30px] flex justify-center">
            <Link
              href="/booking"
              className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[40px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] sm:w-auto"
            >
              Book Your Skin Consultation
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
                src="/images/services/service-bumps-breakout-square.avif"
                alt="Clear skin after acne scar treatment in Nigeria"
                fill
                priority
                sizes="(min-width: 768px) 540px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>

            <div className="motion-heading">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Dermatology
              </p>
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Medical solutions for <span className="text-[var(--color-clinic-hero-accent)]">lasting clear skin</span>.
              </h2>
              <p className="mt-[18px] max-w-[560px] text-[15px] leading-[1.75] text-[#5f6c69] md:text-[16px]">
                Acne is a medical condition, not a cosmetic inconvenience. Effective treatment requires identifying root causes—hormonal imbalances, bacterial overgrowth, or inflammatory responses—and addressing them with evidence-based protocols that go far beyond over-the-counter products.
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
                Common questions about acne and scar treatment in Nigeria.
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
