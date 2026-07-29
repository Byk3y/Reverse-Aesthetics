import Image from "next/image";
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
  title: "Our Clinics | Reverse Aesthetics",
  description: "Explore our five specialist clinics: Aesthetics & Dermatology, Weight Loss, Dental Aesthetics, Hair Restoration, and Wellness & IV Therapy. World-class care in Lagos & Abuja.",
  alternates: { canonical: "/clinics" },
};

const clinics = [
  {
    title: "Aesthetics & Dermatology",
    tagline: "Your skin, perfected.",
    description:
      "Our flagship clinic specializes in advanced skincare, injectables, skin tightening, and glow treatments. From acne management to anti-aging protocols, every treatment is tailored to your unique complexion and goals.",
    image: "/images/clinics/clinic-aesthetics.avif",
    href: "/clinics/aesthetics",
    treatments: [
      "Botox & Dermal Fillers",
      "HIFU Skin Tightening",
      "Thread Lifts",
      "Laser Skin Resurfacing",
      "Chemical Peels",
      "IV Glow Therapy",
      "Acne & Scar Treatment",
      "PRP Facial Rejuvenation",
    ],
  },
  {
    title: "Weight Loss",
    tagline: "Transform your body, sustainably.",
    description:
      "Our medical weight loss programs combine prescription support, nutritional guidance, body contouring, and ongoing supervision for results that last. Every program is physician-led and tailored to your body.",
    image: "/images/generated/hero_weightloss_consult.avif",
    href: "/clinics/weightloss",
    treatments: [
      "Medical Weight Programs",
      "Injection Support (Saxenda, etc.)",
      "Body Contouring",
      "Fat Dissolving Injections",
      "Nutritional Counseling",
      "Wellness Plans",
    ],
  },
  {
    title: "Dental Aesthetics",
    tagline: "Smile with absolute confidence.",
    description:
      "Our dental aesthetics clinic delivers smile makeovers that look completely natural. From whitening to full veneer transformations, we combine artistry with dental precision.",
    image: "/images/generated/dental_smile.avif",
    href: "/clinics/dental",
    treatments: [
      "Teeth Whitening",
      "Porcelain Veneers",
      "Composite Bonding",
      "Smile Design",
      "Gum Contouring",
      "Invisalign Consultations",
    ],
  },
  {
    title: "Hair Restoration",
    tagline: "Reclaim your crown.",
    description:
      "Surgical and non-surgical solutions for hair loss. Whether it's FUE transplant, PRP therapy, or scalp regeneration, our specialists help you regain natural, full hair.",
    image: "/images/clinics/clinic-hair.avif",
    href: "/clinics/hair",
    treatments: [
      "FUE Hair Transplant",
      "Beard Transplant",
      "Eyebrow Restoration",
      "PRP Hair Therapy",
      "Scalp Micropigmentation",
      "GFC Treatment",
    ],
  },
  {
    title: "Wellness & IV Therapy",
    tagline: "Beauty begins from within.",
    description:
      "Rapidly replenish nutrients, boost immunity, and enhance cellular aging with our premium bespoke IV drips. Every infusion is custom-formulated and administered by licensed nurses in our treatment lounge.",
    image: "/images/generated/hero_iv_therapy.avif",
    href: "/clinics/wellness",
    treatments: [
      "The Reverse Signature Glow",
      "NAD+ Anti-Aging Infusion",
      "Glutathione Skin Brightening",
      "Immunity & Post-Travel Drips",
      "Custom Vitamin Blends",
    ],
  },
];

export default function ClinicsPage() {
  return (
    <div
      className="w-full bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <ClinicNavbar />
      <div className="h-[118px] md:h-[126px] bg-[var(--color-clinic-hero-top)]" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-clinic-hero-top)]">
        <Breadcrumbs items={[{ label: "Clinics" }]} />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Our Clinics
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Five clinics.{" "}
            <span className="text-[var(--color-clinic-hero-accent)]">
              One standard
            </span>{" "}
            of excellence.
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            Each clinic is led by accredited specialists, using internationally
            approved products and techniques to deliver safe, natural results.
          </p>
        </div>
      </section>

      <div className="motion-scope">
        <ScrollMotion />

        {/* CLINICS — alternating image / content rows */}
        {clinics.map((clinic, index) => {
          const flipped = index % 2 !== 0;
          return (
            <section
              key={clinic.title}
              className={`py-[70px] md:py-[100px] ${
                flipped ? "bg-[#eef2ef]" : "bg-white"
              }`}
            >
              <div className="mx-auto grid max-w-[1160px] gap-[28px] px-[20px] md:grid-cols-2 md:items-center md:gap-[52px] md:px-[40px]">
                {/* Image */}
                <div
                  className={`motion-image-frame reveal-on-scroll relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#e4f1f2] ${
                    flipped ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={clinic.image}
                    alt={clinic.title}
                    fill
                    sizes="(min-width: 768px) 540px, calc(100vw - 40px)"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className={`motion-heading ${flipped ? "md:order-1" : ""}`}>
                  <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                    0{index + 1} / {clinic.tagline}
                  </p>
                  <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                    {clinic.title}
                  </h2>
                  <p className="mt-[18px] max-w-[560px] text-[15px] leading-[1.75] text-[#5f6c69] md:text-[16px]">
                    {clinic.description}
                  </p>

                  {/* Treatment list */}
                  <div className="mt-[26px] grid grid-cols-1 gap-[10px] sm:grid-cols-2">
                    {clinic.treatments.map((treatment) => (
                      <div
                        key={treatment}
                        className="motion-card flex items-center gap-[10px] rounded-[10px] bg-white px-[14px] py-[11px]"
                      >
                        <span className="inline-flex h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--color-clinic-teal)]" />
                        <span className="text-[14px] font-medium leading-[1.4] text-[var(--color-clinic-navy)]">
                          {treatment}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-[30px] flex flex-col gap-[12px] sm:flex-row">
                    <Link
                      href={BOOKING_URL}
                      className="inline-flex h-[48px] w-full items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[36px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] sm:w-auto"
                    >
                      Book a Consultation
                    </Link>
                    {/* Without this the clinic sub-pages have no inbound link
                        anywhere on the site outside the sitemap. */}
                    <Link
                      href={clinic.href}
                      className="inline-flex h-[48px] w-full items-center justify-center rounded-full border border-[#d8e6e7] px-[32px] text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-clinic-navy)] transition-colors hover:bg-[#e4f1f2] sm:w-auto"
                    >
                      Explore This Clinic
                    </Link>
                  </div>

                  <Link
                    href="/treatments"
                    className="group mt-[18px] inline-flex items-center gap-[7px] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-teal)] transition-colors hover:text-[var(--color-clinic-teal-dark)]"
                  >
                    View All Treatments
                    <ChevronRight
                      className="h-[15px] w-[15px] transition-transform duration-300 group-hover:translate-x-[3px]"
                      aria-hidden
                    />
                  </Link>
                </div>
              </div>
            </section>
          );
        })}

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
