"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import ClinicNavbar from "../components/home/ClinicNavbar";
import { Breadcrumbs } from "../components/home/Breadcrumbs";
import ScrollMotion from "../components/home/ScrollMotion";
import { SiteFooter } from "../components/home/SiteFooter";
import FloatingWhatsApp from "../components/home/FloatingWhatsApp";
import { BOOKING_URL, WHATSAPP_URL } from "../components/home/homeData";

const categories = ["All", "Clinic", "Aesthetics", "Weight Loss", "Dental", "Hair"];

/* Documentary imagery only — the clinic, the team, and treatments in progress.
   This page previously ran on AI-generated "before/after" pairs presented as
   patient results, which is both untrue and unusable in Meta ad creative. */
interface GalleryItem {
  category: string;
  image: string;
  title: string;
  description: string;
  /** Spans two columns. Optional, so the grid still supports a feature tile. */
  wide?: boolean;
}

const galleryItems: GalleryItem[] = [
  /* Lagos first, matching LOCATIONS order used in the nav, footer and contact. */
  {
    category: "Clinic",
    image: "/images/about/clinic.avif",
    title: "Our Lekki Clinic",
    description: "Historia Mews, Oniru — reception and consultation suites.",
  },
  {
    category: "Clinic",
    image: "/images/about/clinic-abuja.avif",
    title: "Our Mabushi Clinic",
    description: "The reception at our Abuja clinic, in Mabushi.",
  },
  {
    category: "Aesthetics",
    image: "/images/generated/hero_laser_treatment.avif",
    title: "Laser Skin Resurfacing",
    description: "Precision laser work for pigmentation, scarring, and skin renewal.",
  },
  {
    category: "Aesthetics",
    image: "/images/services/service-dermal-fillers-square.avif",
    title: "Dermal Fillers",
    description: "Targeted injectables for volume, contour, and facial balance.",
  },
  {
    category: "Aesthetics",
    image: "/images/generated/hero_iv_therapy.avif",
    title: "IV Glow Therapy",
    description: "Medical-grade vitamin infusions in our treatment lounge.",
  },
  {
    category: "Weight Loss",
    image: "/images/generated/hero_weightloss_consult.avif",
    title: "Medical Weight Loss",
    description: "Physician-led consultations and ongoing programme reviews.",
  },
  {
    category: "Dental",
    image: "/images/generated/hero_dental_smile.avif",
    title: "Smile Design",
    description: "Whitening, veneers, and complete smile makeovers.",
  },
  {
    category: "Hair",
    image: "/images/services/service-hair-restoration-square.avif",
    title: "Hair Restoration",
    description: "Hairline mapping, FUE transplant, and PRP therapy.",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div
      className="w-full bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <ClinicNavbar />
      <div className="h-[118px] md:h-[126px] bg-[var(--color-clinic-hero-top)]" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-clinic-hero-top)]">
        <Breadcrumbs items={[{ label: "Gallery" }]} />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Our Work
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Inside the clinic.{" "}
            <span className="text-[var(--color-clinic-hero-accent)]">
              Our treatments.
            </span>
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            A look inside both clinics — Lekki, Lagos and Mabushi, Abuja — and the
            treatments we perform day to day.
          </p>
        </div>
      </section>

      <div className="motion-scope">
        <ScrollMotion />

        {/* FILTER TABS */}
        <section className="sticky top-0 z-30 border-b border-[#e9ede9] bg-white/95 backdrop-blur-sm">
          <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
            <div className="flex gap-[10px] overflow-x-auto py-[16px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`inline-flex h-[38px] shrink-0 items-center justify-center rounded-full px-[18px] text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                    activeCategory === cat
                      ? "bg-[var(--color-clinic-teal)] text-white"
                      : "border border-[#d8e6e7] text-[var(--color-clinic-navy)] hover:bg-[#e4f1f2]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY GRID */}
        <section className="bg-white py-[70px] md:py-[100px]">
          <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
            <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3 md:gap-[18px]">
              {filtered.map((item) => (
                <figure
                  key={item.title}
                  className={`motion-card motion-lift overflow-hidden rounded-[14px] border border-[#e9ede9] bg-[#f8fbf9] ${
                    item.wide ? "sm:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`motion-image-frame relative overflow-hidden bg-[#e4f1f2] ${
                      item.wide ? "aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute left-[14px] top-[14px] rounded-full bg-white/90 px-[12px] py-[6px] text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-navy)] backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  <figcaption className="p-[20px] md:p-[22px]">
                    <h2 className="text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                      {item.title}
                    </h2>
                    <p className="mt-[8px] text-[14px] leading-[1.6] text-[#65716e]">
                      {item.description}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-[80px] text-center">
                <p className="text-[16px] leading-[1.7] text-[#65716e]">
                  No results in this category yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA BAND */}
        <section className="bg-white pb-[80px] pt-[10px] md:pb-[110px]">
          <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
            <div className="reveal-on-scroll relative overflow-hidden rounded-[22px] bg-[var(--color-clinic-navy)] px-[26px] py-[48px] text-center md:px-[40px] md:py-[68px]">
              <p className="mb-[14px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)]">
                Ready to explore your options?
              </p>
              <h2 className="mx-auto max-w-[640px] text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-[40px]">
                Book a consultation to discuss your personalized treatment plan.
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
