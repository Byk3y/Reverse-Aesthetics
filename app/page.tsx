import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ThreadBackdrop from "./components/ThreadBackdrop";
import ClinicNavbar from "./components/home/ClinicNavbar";
import HomeSections from "./components/home/HomeSections";
import FloatingWhatsApp from "./components/home/FloatingWhatsApp";
import { BOOKING_URL } from "./components/home/homeData";

export const metadata: Metadata = {
  // Title targets the head term ("aesthetic clinic lagos") rather than the
  // brand tagline, which has no search demand. The tagline still carries the
  // brand on-page in the H1. site-copy.md records the original.
  title: "Reverse Aesthetics | Aesthetic Clinic in Lagos & Abuja",
  description:
    "Nigeria's leading aesthetics, dermatology, weight loss, dental, and hair clinic. Safe, natural results with expert medical care. Book a visit in Lagos or Abuja.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    // `thread-page` opts this page's section bands into translucency so the
    // backdrop stays visible the whole way down; the backdrop paints the base
    // cream itself, so nothing here sets a page background.
    <div
      className="thread-page relative w-full text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <ThreadBackdrop />

      <div className="relative z-10">
        <ClinicNavbar />
        <div className="h-[118px] md:h-[126px]" />

        {/* Hero copy */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-[1000px] px-[20px] pt-[14px] md:pt-[24px] pb-[70px] md:pb-[120px] text-center relative z-[2]">
            <p className="hero-copy-reveal text-[15px] md:text-[17px] mb-[22px] md:mb-[30px]">
              Nigeria&apos;s leading{" "}
              <span className="font-bold">aesthetic &amp; dermatology clinic</span>
            </p>

            {/* Each line is masked and rises from under its own edge, so the
                headline reads as being uncovered rather than flown in — the
                calmer of the two, which is what a medical brand wants. */}
            <h1 className="text-[32px] leading-[1.12] md:text-[52px] md:leading-[1.08] font-semibold tracking-[-0.02em] mb-[34px] md:mb-[44px] text-[var(--color-clinic-navy)] max-w-[840px] mx-auto">
              <span className="hero-line">
                <span className="[animation-delay:150ms]">
                  Natural transformations.
                </span>
              </span>
              <span className="hero-line">
                <span className="[animation-delay:290ms] text-[var(--color-clinic-hero-accent)]">
                  Expertly delivered.
                </span>
              </span>
            </h1>

            <p className="hero-copy-reveal [animation-delay:440ms] text-[16px] md:text-[19px] leading-[1.6] text-[#5a5651] max-w-[620px] mx-auto mb-[36px] md:mb-[44px]">
              Personalized, medically-led treatments for skin, face, body, hair,
              and smile — designed to look like you, only refined.
            </p>

            <div className="hero-copy-reveal [animation-delay:560ms] flex justify-center">
              <Link
                href={BOOKING_URL}
                className="hero-cta inline-flex items-center justify-center rounded-full bg-[var(--color-clinic-teal)] text-white px-[50px] h-[48px] text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </section>

        {/* Hero image mosaic */}
        <section className="pb-[80px] -mt-[42px] md:pb-[120px] md:-mt-[220px] relative z-[1] overflow-hidden">
          <div className="hero-mosaic mx-auto md:w-[1160px] px-0">
            <div className="hero-mosaic-grid grid md:grid-cols-5 gap-[14px] md:[grid-template-rows:152px_241px_295px]">
              <div className="col-start-1 row-start-1 row-span-2 rounded-[20px] overflow-hidden relative bg-[#e4f1f2]">
                <Image
                  src="/images/generated/hero_laser_treatment.avif"
                  alt="Laser skin treatment in progress at Reverse Aesthetics"
                  fill
                  priority
                  sizes="(min-width: 768px) 220px, 202px"
                  className="hero-mosaic-image object-cover object-[50%_40%]"
                />
              </div>
              <div className="col-start-3 md:col-start-2 row-start-1 md:row-start-2 row-span-2 md:row-span-1 rounded-[20px] overflow-hidden relative bg-[#efe6ea]">
                <Image
                  src="/images/generated/hero_dental_smile.avif"
                  alt="Bright, natural smile after dental aesthetics"
                  fill
                  priority
                  sizes="(min-width: 768px) 220px, 202px"
                  className="hero-mosaic-image [animation-delay:120ms] object-cover object-[50%_35%]"
                />
              </div>
              <div className="col-start-2 md:col-start-3 row-start-2 md:row-start-2 md:row-span-2 self-start hero-mosaic-tall md:h-[424px] rounded-[20px] overflow-hidden relative bg-[#e4edf1]">
                <Image
                  src="/images/generated/hero_portrait_glow.avif"
                  alt="Reverse Aesthetics — natural, medical-led results"
                  fill
                  priority
                  sizes="(min-width: 768px) 240px, 200px"
                  className="hero-mosaic-image [animation-delay:220ms] object-cover object-[50%_35%]"
                />
              </div>
              <div className="hidden md:block col-start-4 row-start-2 row-span-2 rounded-[20px] overflow-hidden relative bg-[#f0e9e2]">
                <Image
                  src="/images/generated/hero_hair_consult.avif"
                  alt="Scalp and hairline assessment with a dermatoscope"
                  fill
                  sizes="220px"
                  className="hero-mosaic-image [animation-delay:320ms] object-cover object-[50%_40%]"
                />
              </div>
              <div className="hidden md:block col-start-5 row-start-1 row-span-2 rounded-[20px] overflow-hidden relative bg-[#e4f1f2]">
                <Image
                  src="/images/generated/hero_iv_therapy.avif"
                  alt="IV wellness therapy in a comfortable treatment chair"
                  fill
                  sizes="220px"
                  className="hero-mosaic-image [animation-delay:440ms] object-cover object-[50%_30%]"
                />
              </div>
              <div className="col-start-1 col-span-2 row-start-3 md:row-start-3 rounded-[20px] overflow-hidden relative bg-[#f0e9e2]">
                {/* Mobile + reduced-motion fall back to the poster still; the
                    loop is desktop-only so phones on mobile data never fetch it. */}
                <Image
                  src="/images/generated/hero_video_poster.avif"
                  alt="The Reverse Aesthetics medical team"
                  fill
                  priority
                  sizes="(min-width: 768px) 454px, 416px"
                  className="hero-mosaic-image hero-tile-still [animation-delay:560ms] object-cover object-[50%_50%]"
                />
                <video
                  className="hero-tile-video hero-mosaic-image [animation-delay:560ms] absolute inset-0 h-full w-full object-cover object-[50%_50%]"
                  poster="/images/generated/hero_video_poster.avif"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                >
                  <source src="/videos/hero-loop.webm" type="video/webm" />
                  <source src="/videos/hero-loop.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="col-start-3 md:col-start-5 row-start-3 md:row-start-3 self-start h-[190px] md:h-[200px] rounded-[20px] overflow-hidden relative bg-[#e4edf1]">
                <Image
                  src="/images/generated/hero_weightloss_consult.avif"
                  alt="Medical weight loss consultation at Reverse Aesthetics"
                  fill
                  sizes="(min-width: 768px) 220px, 202px"
                  className="hero-mosaic-image [animation-delay:680ms] object-cover object-[50%_50%]"
                />
              </div>
            </div>
          </div>

          {/* Credentials sit under the mosaic rather than under the CTA. Above it,
              the two lines wrap on a phone and push the whole mosaic down the
              fold — the images are the thing worth seeing first. */}
          <p className="hero-copy-reveal [animation-delay:860ms] mx-auto mt-[30px] md:mt-[44px] flex max-w-[620px] flex-wrap items-center justify-center gap-x-[10px] gap-y-[2px] px-[20px] text-center text-[13px] leading-[1.5] text-[#7d766d] md:text-[14px]">
            <span>GMC (UK) registered founding physician</span>
            <span aria-hidden className="hidden text-[var(--color-clinic-teal)] md:inline">
              ·
            </span>
            <span>Clinics in Lekki, Lagos and Mabushi, Abuja</span>
          </p>
        </section>

        <HomeSections />
      </div>
      <FloatingWhatsApp />
    </div>
  );
}
