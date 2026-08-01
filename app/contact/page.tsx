import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import ClinicNavbar from "../components/home/ClinicNavbar";
import { Breadcrumbs } from "../components/home/Breadcrumbs";
import ScrollMotion from "../components/home/ScrollMotion";
import { SiteFooter } from "../components/home/SiteFooter";
import FloatingWhatsApp from "../components/home/FloatingWhatsApp";
import MapEmbed from "../components/home/MapEmbed";
import {
  BOOKING_URL,
  CLINIC_ADDRESS,
  MAP_DIRECTIONS_URL,
  MAP_EMBED_URL,
  WHATSAPP_URL,
} from "../components/home/homeData";

export const metadata: Metadata = {
  title: "Contact Us | Reverse Aesthetics",
  description: "Get in touch with Reverse Aesthetics. Visit our clinics in Lekki, Lagos or Mabushi, Abuja — or reach out for booking inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div
      className="w-full bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <ClinicNavbar />
      <div className="h-[118px] md:h-[126px] bg-[var(--color-clinic-hero-top)]" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-clinic-hero-top)]">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Get In Touch
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Visit our{" "}
            <span className="text-[var(--color-clinic-hero-accent)]">
              Lagos Clinic
            </span>
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            Our patient care team is here to assist with bookings, treatment inquiries,
            and specialized care pathways.
          </p>

          <div className="hero-copy-reveal [animation-delay:340ms] mt-[30px] flex flex-col items-center justify-center gap-[12px] sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] w-full items-center justify-center gap-[9px] rounded-full bg-[var(--color-clinic-teal)] px-[40px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] sm:w-auto"
            >
              Chat on WhatsApp
              <WhatsAppIcon variant="mono" className="h-[16px] w-[16px]" />
            </a>
            <a
              href="mailto:info@reverseaesthetic.com"
              className="inline-flex h-[52px] w-full items-center justify-center rounded-full border border-[#d8e6e7] px-[34px] text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-clinic-navy)] transition-colors hover:bg-[#e4f1f2] sm:w-auto"
            >
              Send an Email
            </a>
          </div>
        </div>
      </section>

      <div className="motion-scope">
        <ScrollMotion />

        {/* CONTACT DETAILS & MAP */}
        <section className="bg-white py-[70px] md:py-[100px]">
          <div className="mx-auto grid max-w-[1160px] gap-[28px] px-[20px] md:grid-cols-2 md:gap-[52px] md:px-[40px]">
            {/* Info cards */}
            <div className="grid content-start gap-[14px] md:gap-[18px]">
              <div className="motion-card motion-lift rounded-[14px] border border-[#e9ede9] bg-[#f8fbf9] p-[22px] md:p-[26px]">
                <span className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[#e4f1f2] text-[var(--color-clinic-teal)]">
                  <MapPin className="h-[24px] w-[24px]" strokeWidth={1.7} aria-hidden />
                </span>
                <h2 className="mt-[18px] text-[19px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                  Location
                </h2>
                <p className="mt-[9px] text-[14px] leading-[1.65] text-[#65716e]">
                  Historia Mews,<br />
                  No. 5 Ayo Babatunde Crescent,<br />
                  Oniru, Lekki, Lagos
                </p>
                <a
                  href="https://maps.google.com/?q=Reverse+Aesthetics+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-[16px] inline-flex items-center gap-[7px] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-teal)] transition-colors hover:text-[var(--color-clinic-teal-dark)]"
                >
                  Get Directions
                </a>
              </div>

              <div className="grid gap-[14px] sm:grid-cols-2 md:gap-[18px]">
                <div className="motion-card motion-lift rounded-[14px] border border-[#e9ede9] bg-[#f8fbf9] p-[22px] md:p-[26px]">
                  <span className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#e4f1f2] text-[var(--color-clinic-teal)]">
                    <Clock className="h-[21px] w-[21px]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <h2 className="mt-[16px] text-[17px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                    Hours
                  </h2>
                  <p className="mt-[9px] whitespace-pre-line text-[14px] leading-[1.65] text-[#65716e]">
                    Mon - Sat: 9:00 AM – 7:00 PM{"\n"}
                    Sun: Closed
                  </p>
                </div>

                <div className="motion-card motion-lift rounded-[14px] border border-[#e9ede9] bg-[#f8fbf9] p-[22px] md:p-[26px]">
                  <span className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#e4f1f2] text-[var(--color-clinic-teal)]">
                    <Phone className="h-[21px] w-[21px]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <h2 className="mt-[16px] text-[17px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                    Contact
                  </h2>
                  <a
                    href="tel:+2349159188094"
                    className="mt-[9px] block text-[14px] leading-[1.65] text-[#65716e] transition-colors hover:text-[var(--color-clinic-teal)]"
                  >
                    +234 915 918 8094
                  </a>
                  <a
                    href="mailto:info@reverseaesthetic.com"
                    className="block truncate text-[14px] leading-[1.65] text-[#65716e] transition-colors hover:text-[var(--color-clinic-teal)]"
                  >
                    info@reverseaesthetic.com
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="motion-image-frame reveal-on-scroll overflow-hidden rounded-[16px]">
              <MapEmbed
                address={CLINIC_ADDRESS}
                className="h-[360px] md:h-full md:min-h-[480px]"
                directionsUrl={MAP_DIRECTIONS_URL}
                embedUrl={MAP_EMBED_URL}
                title="Map showing Reverse Aesthetics Lagos"
              />
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
