import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import ClinicNavbar from "../../components/home/ClinicNavbar";
import { Breadcrumbs } from "../../components/home/Breadcrumbs";
import ScrollMotion from "../../components/home/ScrollMotion";
import { SiteFooter } from "../../components/home/SiteFooter";
import FloatingWhatsApp from "../../components/home/FloatingWhatsApp";
import TrustHighlights from "../../components/TrustHighlights";
import { BOOKING_URL, WHATSAPP_URL } from "../../components/home/homeData";

export const metadata: Metadata = {
  title: "Premium Aesthetic Clinic in Abuja | Reverse Aesthetics",
  description: "Medical aesthetics in Abuja — Botox, dermal fillers and more at our Mabushi clinic. Open Monday to Saturday, 9am–7pm. Book a consultation.",
  keywords: ["Aesthetic Clinic in Abuja", "Botox Abuja", "Dermatologist Abuja", "Medical aesthetics FCT", "Hair transplant consultation Abuja"],
  alternates: {
    canonical: "https://reverseaesthetic.com/locations/abuja",
  },
  openGraph: {
    title: "Premium Aesthetic Clinic in Abuja | Reverse Aesthetics",
    description: "Reverse Aesthetics offers premium medical aesthetic services in Abuja. Visit our Mabushi clinic, open Monday–Saturday, 9am–7pm.",
    url: "https://reverseaesthetic.com/locations/abuja",
  }
};

const AVAILABLE_TREATMENTS = [
  {
    name: "Injectables",
    description: "Botox and structural dermal fillers.",
    href: "/treatments/botox-and-dermal-fillers-lagos",
  },
  {
    name: "Weight Loss",
    description: "Medical-led diagnostics and prescribing mapping.",
    href: "/treatments/medical-weight-loss-lagos",
  },
  {
    name: "Hair Assessments",
    description: "Deep diagnostic mapping for hair regeneration and transplant planning.",
    href: "/treatments/hair-transplant-nigeria",
  },
  {
    name: "Dental Aesthetics",
    description: "Veneers, teeth whitening, and smile design.",
    href: "/treatments/dental-aesthetics-lagos",
  },
  {
    name: "HIFU Skin Tightening",
    description: "Non-surgical facelift and skin firming.",
    href: "/treatments/hifu-skin-tightening-nigeria",
  },
  {
    name: "Laser Resurfacing",
    description: "Pigmentation correction and skin renewal.",
    href: "/treatments/laser-skin-resurfacing-lagos",
  },
  {
    name: "IV Glow Therapy",
    description: "Vitamin drips for radiance and immunity.",
    href: "/treatments/iv-glow-therapy-lagos",
  },
  {
    name: "Acne & Scar Treatment",
    description: "Medical-grade acne and scar solutions.",
    href: "/treatments/acne-scar-treatment-lagos",
  },
];

export default function AbujaLocationPage() {
  // See the note on the Lagos page — the clinic entity lives in
  // app/lib/schema.ts and is emitted site-wide. The breadcrumb trail is
  // emitted as JSON-LD by <Breadcrumbs> itself.
  return (
    <div
      className="w-full bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <ClinicNavbar />
      <div className="h-[118px] md:h-[126px] bg-[var(--color-clinic-hero-top)]" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-clinic-hero-top)]">
        <Breadcrumbs items={[{ label: "Abuja Clinic" }]} />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Consultation & Care
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Expert Aesthetics in{" "}
            <span className="text-[var(--color-clinic-hero-accent)]">Abuja</span>
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            Delivering our signature standard of natural transformations and medical-grade care to the capital city. Consultations and exclusive treatments available by private appointment.
          </p>
          <div className="hero-copy-reveal [animation-delay:340ms] mt-[30px] flex justify-center">
            <Link
              href={BOOKING_URL}
              className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[40px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] sm:w-auto"
            >
              Request an Appointment
            </Link>
          </div>
        </div>
      </section>

      <div className="motion-scope">
        <ScrollMotion />

        <TrustHighlights />

        {/* LOCATION DETAILS */}
        <section className="bg-[#eef2ef] py-[70px] md:py-[100px]">
          <div className="mx-auto grid max-w-[1160px] gap-[28px] px-[20px] md:grid-cols-2 md:items-start md:gap-[52px] md:px-[40px]">
            <div className="motion-image-frame reveal-on-scroll relative aspect-square overflow-hidden rounded-[16px] bg-[#e4f1f2]">
              <Image
                src="/images/about/clinic-abuja.avif"
                alt="Reverse Aesthetics clinic reception in Mabushi, Abuja"
                fill
                priority
                sizes="(min-width: 768px) 540px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>

            <div className="motion-heading">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Consultation & Care
              </p>
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Exclusive care in the{" "}
                <span className="text-[var(--color-clinic-hero-accent)]">Capital</span>.
              </h2>
              <p className="mt-[18px] max-w-[560px] text-[15px] leading-[1.75] text-[#5f6c69] md:text-[16px]">
                Our Abuja clinic in Mabushi is open six days a week, offering the same medical-led care as our Lagos practice — unhurried consultations, dedicated clinical attention, and complete discretion.
              </p>

              <div className="mt-[28px] grid gap-[14px]">
                <div className="motion-card flex items-start gap-[16px] rounded-[14px] bg-white p-[20px] md:p-[24px]">
                  <span className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#e4f1f2] text-[var(--color-clinic-teal)]">
                    <MapPin className="h-[21px] w-[21px]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                      Location
                    </h3>
                    <p className="mt-[7px] text-[14px] leading-[1.65] text-[#65716e]">
                      4 Adamu Mathew Street,<br />
                      near Royal Specialist Hospital,<br />
                      Mabushi, Abuja 900108
                    </p>
                  </div>
                </div>

                <div className="motion-card flex items-start gap-[16px] rounded-[14px] bg-white p-[20px] md:p-[24px]">
                  <span className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#e4f1f2] text-[var(--color-clinic-teal)]">
                    <Clock className="h-[21px] w-[21px]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                      Operating Hours
                    </h3>
                    <p className="mt-[7px] text-[14px] leading-[1.65] text-[#65716e]">
                      Monday – Saturday: 9:00 AM – 7:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="motion-card flex items-start gap-[16px] rounded-[14px] bg-white p-[20px] md:p-[24px]">
                  <span className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#e4f1f2] text-[var(--color-clinic-teal)]">
                    <Phone className="h-[21px] w-[21px]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                      Contact
                    </h3>
                    <p className="mt-[7px] text-[14px] leading-[1.65] text-[#65716e]">
                      0901 020 3696<br />
                      info@reverseaesthetic.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AVAILABLE TREATMENTS */}
        <section className="bg-white py-[70px] md:py-[100px]">
          <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
            <div className="motion-heading mb-[34px] text-center">
              <h2 className="mx-auto max-w-[640px] text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Available for Consultation in{" "}
                <span className="text-[var(--color-clinic-hero-accent)]">Abuja</span>
              </h2>
            </div>

            <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4 md:gap-[18px]">
              {AVAILABLE_TREATMENTS.map((treatment) => (
                <Link
                  key={treatment.href}
                  href={treatment.href}
                  className="motion-card motion-lift group flex flex-col rounded-[14px] border border-[#e9ede9] bg-[#f8fbf9] p-[22px] transition-transform duration-300 hover:-translate-y-1 md:p-[26px]"
                >
                  <h3 className="text-[17px] font-bold leading-[1.25] tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                    {treatment.name}
                  </h3>
                  <p className="mt-[10px] flex-1 text-[14px] leading-[1.6] text-[#65716e]">
                    {treatment.description}
                  </p>
                </Link>
              ))}
            </div>
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
