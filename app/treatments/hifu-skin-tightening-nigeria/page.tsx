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
  title: "HIFU Skin Tightening in Lagos & Abuja | Reverse Aesthetics",
  description: "Get a non-surgical facelift with HIFU skin tightening in Lagos. Lift, firm, and rejuvenate your skin without downtime. Book your HIFU consultation today.",
  keywords: ["HIFU Lagos", "HIFU Treatment Nigeria", "Non-Surgical Facelift Lagos", "Skin Tightening Nigeria", "Face Lift Without Surgery Lagos", "HIFU Lekki"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/hifu-skin-tightening-nigeria",
  },
  openGraph: {
    title: "HIFU Skin Tightening Nigeria | Non-Surgical Facelift Lagos | Reverse Aesthetics",
    description: "Lift, firm, and rejuvenate your skin with advanced HIFU technology in Lagos.",
    url: "https://reverseaesthetic.com/treatments/hifu-skin-tightening-nigeria",
  }
};

const FEATURES = [
  { title: "High-Intensity Focused Ultrasound", body: "Focused ultrasound energy penetrates to the SMAS layer (4.5mm deep) to create controlled thermal coagulation points. This triggers a wound-healing response, producing new collagen and elastin fibres over the following months." },
  { title: "Non-Surgical Jawline & Neck Contouring", body: "Redefine a softening jawline, lift jowls, and tighten neck laxity without incisions. The lower face and submental area are where HIFU does most of its work. Treatment is usually a single session, with the change appearing gradually rather than on the day." },
  { title: "Collagen Regeneration & Skin Firming", body: "Collagen remodelling continues for months after the session, so the effect builds rather than arrives. It is not permanent. Skin carries on ageing, and most patients repeat the treatment to hold the result." },
];

const FAQS = [
  { question: "What is HIFU and how does it work?", answer: "HIFU stands for High-Intensity Focused Ultrasound. It delivers targeted ultrasound energy to the deep structural layers of the skin, causing controlled thermal injury that triggers your body's natural collagen production. The result is firmer, lifted skin without surgery, needles, or downtime." },
  { question: "How many HIFU sessions do I need?", answer: "One session is the usual starting point, repeated once or twice a year to maintain the effect. How much lift you get depends on your age, skin thickness and how much laxity you are starting with. Where there is more sagging than a non-surgical treatment can address, we will tell you that at the consultation instead of selling you a course." },
  { question: "Is HIFU painful?", answer: "You may feel warmth and a tingling or prickling sensation during the treatment, particularly along the jawline and forehead. This is temporary and indicates the ultrasound energy is reaching the target depth. Discomfort is well-tolerated by most clients and subsides immediately after the session." },
];

const RELATED = [
  { href: "/treatments/botox-and-dermal-fillers-lagos", name: "Botox & Dermal Fillers", description: "Targeted injectables for wrinkle reduction, volume restoration, and facial harmony." },
  { href: "/treatments/laser-skin-resurfacing-lagos", name: "Laser Skin Resurfacing", description: "Precision lasers for pigmentation correction, acne scars, and skin renewal." },
  { href: "/treatments/acne-scar-treatment-lagos", name: "Acne & Scar Treatment", description: "Medical dermatology for active acne, post-acne marks, and deep scarring." },
];

export default function HifuSkinTighteningPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "HIFU Skin Tightening",
    "procedureType": "Non-surgical aesthetic treatment",
    "description": "High-Intensity Focused Ultrasound (HIFU) for non-surgical skin tightening, lifting, and collagen regeneration.",
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
            { label: "HIFU Skin Tightening" },
          ]}
        />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Skin Tightening
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Advanced <span className="text-[var(--color-clinic-hero-accent)]">HIFU</span> Skin Tightening in <span className="text-[var(--color-clinic-hero-accent)]">Nigeria</span>
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            Lift sagging skin, define your jawline, and stimulate deep collagen production without surgery or downtime. HIFU works on the same tissue layer a surgical facelift addresses, using focused ultrasound instead of incisions, though the change it produces is more modest.
          </p>
          <div className="hero-copy-reveal [animation-delay:340ms] mt-[30px] flex justify-center">
            <Link
              href="/booking"
              className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[40px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] sm:w-auto"
            >
              Book Your HIFU Session
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
                src="/images/services/service-profile-balancing-square.avif"
                alt="Non-surgical facelift with HIFU technology in Nigeria"
                fill
                priority
                sizes="(min-width: 768px) 540px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>

            <div className="motion-heading">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Skin Tightening
              </p>
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                The non-surgical <span className="text-[var(--color-clinic-hero-accent)]">facelift</span> you&apos;ve been looking for.
              </h2>
              <p className="mt-[18px] max-w-[560px] text-[15px] leading-[1.75] text-[#5f6c69] md:text-[16px]">
                HIFU (High-Intensity Focused Ultrasound) targets the deep foundational layers of your skin—the same layers addressed in a surgical facelift—to trigger a natural lifting and tightening effect that improves over 2–3 months as your body produces fresh collagen.
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
                What to know about HIFU skin tightening in Nigeria.
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
