import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Check,
  ClipboardList,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import ClinicNavbar from "../components/home/ClinicNavbar";
import ScrollMotion from "../components/home/ScrollMotion";
import { SiteFooter } from "../components/home/SiteFooter";
import FloatingWhatsApp from "../components/home/FloatingWhatsApp";
import { BOOKING_URL, WHATSAPP_URL } from "../components/home/homeData";

export const metadata: Metadata = {
  title: "About Reverse Aesthetics | Our Mission, Team, and Standards",
  description:
    "We deliver safe, natural, and lasting results through medical-led care, technology, and a culture of excellence. Meet our founder, Dr. Ral Abana.",
  alternates: { canonical: "/about" },
};

const PURPOSE = [
  {
    label: "Our mission",
    title: "Deliver natural, life-enhancing results through safe, expert care.",
    body: "Every plan is medically led and tailored to you — enhancing proportion and balance so the outcome always looks like you, only refined.",
  },
  {
    label: "Our vision",
    title: "Become Africa's most trusted and innovative aesthetic brand.",
    body: "Setting the gold standard for outcomes, safety, and education — and mentoring the next generation of clinicians through the Reverse Aesthetics Training Academy.",
  },
];

const FOUNDER_HIGHLIGHTS = [
  "Award-winning in aesthetic medicine, including 2023 recognition",
  "Ethics-first, results-driven treatment philosophy",
  "Specialist in injectables, skin health, and non-surgical lifting",
];

const FOUNDER_CREDENTIALS = [
  { value: "GMC (UK)", label: "Registered physician" },
  { value: "2023", label: "Aesthetic medicine award" },
  { value: "Lagos & Abuja", label: "Two clinics" },
];

const APPROACH = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    body: "Hospital-grade protocols, medical screening, and evidence-based care on every visit.",
  },
  {
    icon: ClipboardList,
    title: "Personalization",
    body: "Your goals, lifestyle, and features inform a plan built specifically for you.",
  },
  {
    icon: Sparkles,
    title: "Natural Aesthetic",
    body: "We enhance proportion, balance, and harmony — never overdo the result.",
  },
  {
    icon: HeartPulse,
    title: "Aftercare",
    body: "Clear guidance, easy access to the team, and thoughtful follow-up checkpoints.",
  },
];

const ASSURANCE = [
  {
    icon: Stethoscope,
    title: "Medical oversight",
    body: "Accredited clinicians and physician-guided care across every clinic.",
  },
  {
    icon: BadgeCheck,
    title: "High-standard products",
    body: "Approved medical-grade devices and products, used to protocol.",
  },
  {
    icon: ShieldCheck,
    title: "Confidentiality",
    body: "Discreet consultations with careful data-protection practices.",
  },
];

export default function AboutPage() {
  return (
    <div
      className="w-full bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <ClinicNavbar />
      <div className="h-[118px] md:h-[126px] bg-[var(--color-clinic-hero-top)]" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-clinic-hero-top)]">
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            About Reverse Aesthetics
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            More than a clinic.{" "}
            <span className="text-[var(--color-clinic-hero-accent)]">
              A commitment to confidence.
            </span>
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            Reverse Aesthetics was founded to elevate aesthetic medicine in
            Africa — pairing medical precision with an eye for beauty. We believe
            the best results are natural, tailored, and responsibly delivered.
            Your confidence, safety, and long-term skin and body health come
            first.
          </p>
        </div>
      </section>

      <div className="motion-scope">
        <ScrollMotion />

        {/* WIDE CLINIC IMAGE */}
        <section className="bg-[var(--color-clinic-hero-top)] pb-[70px] md:pb-[100px]">
          <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
            <div className="motion-image-frame reveal-on-scroll relative aspect-[16/10] overflow-hidden rounded-[16px] bg-[#e4f1f2] md:aspect-[21/9]">
              <Image
                src="/images/about/clinic.avif"
                alt="Reverse Aesthetics clinic interior in Lagos"
                fill
                priority
                sizes="(min-width: 768px) 1080px, calc(100vw - 40px)"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,32,29,0)_55%,rgba(35,32,29,0.5)_100%)]" />
              <p className="absolute inset-x-[24px] bottom-[22px] text-[12px] font-semibold uppercase tracking-[0.14em] text-white/90 md:inset-x-[36px]">
                Our Lagos clinic — Historia Mews, Oniru, Lekki
              </p>
            </div>
          </div>
        </section>

        {/* PURPOSE — Mission & Vision */}
        <section className="bg-white py-[70px] md:py-[100px]">
          <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
            <div className="motion-heading mb-[34px] max-w-[640px]">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Our purpose
              </p>
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Precision medicine, delivered with an eye for beauty.
              </h2>
            </div>

            <div className="grid gap-[14px] md:grid-cols-2 md:gap-[18px]">
              {PURPOSE.map((item) => (
                <div
                  key={item.label}
                  className="motion-card motion-lift rounded-[14px] border border-[#e9ede9] bg-[#f8fbf9] p-[26px] md:p-[34px]"
                >
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                    {item.label}
                  </p>
                  <h3 className="mt-[14px] text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[26px]">
                    {item.title}
                  </h3>
                  <p className="mt-[12px] text-[15px] leading-[1.7] text-[#65716e]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="bg-[#eef2ef] py-[70px] md:py-[100px]">
          <div className="mx-auto grid max-w-[1160px] gap-[28px] px-[20px] md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-[52px] md:px-[40px]">
            <div className="motion-image-frame reveal-on-scroll relative min-h-[380px] overflow-hidden rounded-[16px] bg-[#e4f1f2] md:min-h-[540px]">
              <Image
                src="/images/team/dr-ral-abana.avif"
                alt="Dr. Ral Abana, founder and aesthetic medical physician at Reverse Aesthetics"
                fill
                sizes="(min-width: 768px) 480px, calc(100vw - 40px)"
                className="object-cover object-[50%_22%]"
              />
              <span className="absolute bottom-[16px] right-[16px] inline-flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white/85 text-[var(--color-clinic-teal)] backdrop-blur-sm">
                <BadgeCheck className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
            </div>

            <div className="motion-heading">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Meet the founder
              </p>
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Dr. Ral Abana
              </h2>
              <p className="mt-[8px] text-[12px] font-bold uppercase tracking-[0.12em] text-[#9aa7a2]">
                Founder · Aesthetic Medical Physician
              </p>
              <p className="mt-[18px] max-w-[560px] text-[15px] leading-[1.75] text-[#5f6c69] md:text-[16px]">
                Dr. Ral Abana is an award-winning aesthetic medical physician and
                the founder of Reverse Aesthetics. With nearly a decade of
                specialty experience, she is known for subtle, elegant outcomes
                and uncompromising safety. A registered practitioner with the GMC
                (UK), she has consulted for leading clinics across Nigeria and is
                building the Reverse Aesthetics Training Academy to mentor the
                next generation.
              </p>

              <div className="mt-[24px] grid gap-[12px]">
                {FOUNDER_HIGHLIGHTS.map((point) => (
                  <div
                    key={point}
                    className="motion-card flex items-start gap-[12px] rounded-[10px] bg-white px-[16px] py-[13px]"
                  >
                    <span className="mt-[1px] inline-flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[var(--color-clinic-teal)] text-white">
                      <Check className="h-[14px] w-[14px]" aria-hidden />
                    </span>
                    <span className="text-[14px] font-medium leading-[1.45] text-[var(--color-clinic-navy)] md:text-[15px]">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-[26px] grid grid-cols-3 gap-[10px]">
                {FOUNDER_CREDENTIALS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[10px] border border-[#d8e6e7] bg-white/60 px-[12px] py-[14px]"
                  >
                    <p className="text-[16px] font-bold leading-[1.1] tracking-[-0.01em] text-[var(--color-clinic-teal)] md:text-[18px]">
                      {stat.value}
                    </p>
                    <p className="mt-[6px] text-[11px] leading-[1.3] text-[#65716e]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* OUR APPROACH */}
        <section className="bg-white py-[70px] md:py-[100px]">
          <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
            <div className="motion-heading mb-[34px] max-w-[640px]">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Our approach
              </p>
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Four principles behind every treatment.
              </h2>
            </div>

            <div className="grid gap-[14px] sm:grid-cols-2 md:grid-cols-4 md:gap-[18px]">
              {APPROACH.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="motion-card motion-lift rounded-[14px] border border-[#e9ede9] bg-[#f8fbf9] p-[22px] md:p-[26px]"
                  >
                    <span className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[#e4f1f2] text-[var(--color-clinic-teal)]">
                      <Icon className="h-[24px] w-[24px]" strokeWidth={1.7} aria-hidden />
                    </span>
                    <h3 className="mt-[18px] text-[19px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                      {item.title}
                    </h3>
                    <p className="mt-[9px] text-[14px] leading-[1.6] text-[#65716e]">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ACCREDITATIONS & ASSURANCE */}
        <section className="bg-[var(--color-clinic-warm-bg)] py-[70px] md:py-[100px]">
          <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
            <div className="motion-heading mb-[34px] max-w-[640px]">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Accreditations & assurance
              </p>
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                Standards you can rely on.
              </h2>
            </div>

            <div className="grid gap-[14px] md:grid-cols-3 md:gap-[18px]">
              {ASSURANCE.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="motion-card flex items-start gap-[16px] rounded-[14px] bg-white p-[22px] md:p-[26px]"
                  >
                    <span className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#e4f1f2] text-[var(--color-clinic-teal)]">
                      <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-[17px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                        {item.title}
                      </h3>
                      <p className="mt-[7px] text-[14px] leading-[1.6] text-[#65716e]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
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
