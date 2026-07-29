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
  title: "Medical Weight Loss Clinic in Lagos | Reverse Aesthetics",
  description: "Evidence-based weight loss programmes, injectable support and body contouring in Lagos. Sustainable results with expert medical guidance.",
  keywords: ["Weight loss clinic Lagos", "Fat dissolving injections Nigeria", "Medical weight loss Nigeria", "Body contouring Lagos", "Skin tightening after weight loss"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/medical-weight-loss-lagos",
  },
  openGraph: {
    title: "Medical Weight Loss Clinic in Lagos | Reverse Aesthetics",
    description: "Evidence-based weight loss programs with medical guidance and injectable support in Nigeria.",
    url: "https://reverseaesthetic.com/treatments/medical-weight-loss-lagos",
  }
};

const FEATURES = [
  { title: "Physician-Guided Programs", body: "Including baseline health reviews, lab diagnostics, lifestyle coaching, and potential injection-based weight loss support prescribed solely where clinically appropriate." },
  { title: "Body Contouring & Fat Reduction", body: "Targets stubborn pockets that don’t respond to exercise. Contouring changes shape, not weight, so it will not move the number on the scale and it works best once you are near your target weight." },
  { title: "Post-Weight Loss Firming", body: "Losing the weight is the first half. Skin does not always retract with it, and how much it does depends on your age, how quickly you lost the weight and how long the skin was stretched. We offer firming and tightening treatments for mild to moderate laxity. Significant loose skin after a large loss is a surgical problem, and we will say so rather than sell you sessions." },
];

const FAQS = [
  { question: "Do you prescribe injectable weight loss solutions?", answer: "Yes, after screening. We prescribe injection-based support only where it is clinically appropriate, which means bloods and a full medical history first, then monitoring while you are on it. Buying pens through Instagram skips all of that, and it is the main reason people get into trouble with these drugs." },
  { question: "How quickly will I see results?", answer: "Healthy weight loss is gradual. With fat-dissolving injections, the treated fat cells are broken down and cleared by the body over several weeks, so the change shows up around weeks three to six rather than immediately, and most areas need more than one session." },
  { question: "What happens after reaching my goal weight?", answer: "Maintenance is the hard part. You move onto a maintenance plan with scheduled check-ins and nutrition work, and we can treat stretch marks or residual laxity separately. Weight regain after stopping injectable support is common, which is why the habit work runs alongside the medication rather than after it." },
];

const RELATED = [
  { href: "/treatments/botox-and-dermal-fillers-lagos", name: "Botox & Dermal Fillers", description: "Targeted injectables for wrinkle reduction, volume restoration, and facial harmony." },
  { href: "/treatments/iv-glow-therapy-lagos", name: "IV Glow Therapy", description: "Medical-grade vitamin infusions for skin radiance, immunity, and anti-aging." },
  { href: "/treatments/hifu-skin-tightening-nigeria", name: "HIFU Skin Tightening", description: "Non-surgical facelift using focused ultrasound for lifting and collagen regeneration." },
];

export default function WeightLossPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Medical Weight Loss and Body Contouring",
    "procedureType": "Medical Weight Management",
    "description": "Physician-guided weight loss programs, metabolic labs, and targeted fat reduction technologies.",
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
            { label: "Medical Weight Loss & Body Contouring" },
          ]}
        />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Weight Loss Clinic
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Medical <span className="text-[var(--color-clinic-hero-accent)]">Weight Loss</span> & Contouring in Lagos
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            Sustainable change beats quick fixes. Our medical team designs highly personalized programs to reduce cravings, improve nutrition, refine your silhouette, and support lasting fat loss.
          </p>
          <div className="hero-copy-reveal [animation-delay:340ms] mt-[30px] flex justify-center">
            <Link
              href="/booking"
              className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[40px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] sm:w-auto"
            >
              Start Your Program
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
                src="/images/generated/hero_weightloss_consult.avif"
                alt="Body contouring consultation in Lagos"
                fill
                priority
                sizes="(min-width: 768px) 540px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>

            <div className="motion-heading">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Weight Loss Clinic
              </p>
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Safe, medically-directed <span className="text-[var(--color-clinic-hero-accent)]">body transformations</span>.
              </h2>
              <p className="mt-[18px] max-w-[560px] text-[15px] leading-[1.75] text-[#5f6c69] md:text-[16px]">
                Weight is regulated by biology as much as by behaviour. We run baseline labs, interpret them, and match the therapy to what they show: injectable support where it is clinically appropriate, contouring where the issue is shape rather than weight, and monitoring throughout either.
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
                Important insights about our weight programs in Nigeria.
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
