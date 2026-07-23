import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ClinicNavbar from "./components/home/ClinicNavbar";
import HomeSections from "./components/home/HomeSections";
import FloatingWhatsApp from "./components/home/FloatingWhatsApp";
import { BOOKING_URL } from "./components/home/homeData";

export const metadata: Metadata = {
  title: "Reverse Aesthetics | Natural Transformations in Lagos & Abuja",
  description:
    "Nigeria's leading aesthetics, dermatology, weight loss, dental, and hair clinic. Safe, natural results with expert medical care. Book a visit in Lagos or Abuja.",
};

export default function Home() {
  return (
    <div
      className="w-full bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <ClinicNavbar />
      <div className="h-[118px] md:h-[126px] bg-[var(--color-clinic-hero-top)]" />

      {/* Hero copy */}
      <section className="relative bg-[var(--color-clinic-hero-top)] overflow-hidden">
        <div className="mx-auto max-w-[1000px] px-[20px] pt-[14px] md:pt-[24px] pb-[70px] md:pb-[120px] text-center relative z-[2]">
          <p className="hero-copy-reveal text-[15px] md:text-[17px] mb-[22px] md:mb-[30px]">
            Nigeria&apos;s leading{" "}
            <span className="font-bold">aesthetic &amp; dermatology clinic</span>
          </p>

          <h1 className="hero-copy-reveal [animation-delay:120ms] text-[32px] leading-[1.12] md:text-[52px] md:leading-[1.08] font-semibold tracking-[-0.02em] mb-[34px] md:mb-[44px] text-[var(--color-clinic-navy)] max-w-[840px] mx-auto">
            Natural transformations.{" "}
            <span className="text-[var(--color-clinic-hero-accent)]">
              Expertly delivered.
            </span>
          </h1>

          <p className="hero-copy-reveal [animation-delay:240ms] text-[16px] md:text-[19px] leading-[1.6] text-[#5a5651] max-w-[620px] mx-auto mb-[36px] md:mb-[44px]">
            Personalized, medically-led treatments for skin, face, body, hair,
            and smile — designed to look like you, only refined.
          </p>

          <div className="hero-copy-reveal [animation-delay:360ms] flex justify-center">
            <Link
              href={BOOKING_URL}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-clinic-teal)] text-white px-[50px] h-[48px] text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Hero image mosaic */}
      <section className="bg-[var(--color-clinic-hero-top)] pb-[80px] -mt-[42px] md:pb-[120px] md:-mt-[220px] relative z-[1] overflow-hidden">
        <div className="hero-mosaic mx-auto md:w-[1160px] px-0">
          <div className="hero-mosaic-grid grid md:grid-cols-5 gap-[14px] md:[grid-template-rows:152px_241px_295px]">
            <div className="col-start-1 row-start-1 row-span-2 rounded-[20px] overflow-hidden relative bg-[#e7efe7]">
              <Image
                src="/images/generated/aesthetics_service.avif"
                alt="Aesthetic skin treatment at Reverse Aesthetics"
                fill
                priority
                sizes="(min-width: 768px) 220px, 202px"
                className="hero-mosaic-image object-cover object-[50%_40%]"
              />
            </div>
            <div className="col-start-3 md:col-start-2 row-start-1 md:row-start-2 row-span-2 md:row-span-1 rounded-[20px] overflow-hidden relative bg-[#efe6ea]">
              <Image
                src="/images/generated/hair_service.avif"
                alt="Hair restoration consultation"
                fill
                priority
                sizes="(min-width: 768px) 220px, 202px"
                className="hero-mosaic-image [animation-delay:120ms] object-cover object-[50%_35%]"
              />
            </div>
            <div className="col-start-2 md:col-start-3 row-start-2 md:row-start-2 md:row-span-2 self-start hero-mosaic-tall md:h-[424px] rounded-[20px] overflow-hidden relative bg-[#e4edf1]">
              <Image
                src="/images/generated/hero_desktop.avif"
                alt="Reverse Aesthetics — natural, medical-led results"
                fill
                priority
                sizes="(min-width: 768px) 240px, 200px"
                className="hero-mosaic-image [animation-delay:220ms] object-cover object-[50%_35%]"
              />
            </div>
            <div className="hidden md:block col-start-4 row-start-2 row-span-2 rounded-[20px] overflow-hidden relative bg-[#f0e9e2]">
              <Image
                src="/images/generated/dental_smile.avif"
                alt="Bright, natural smile after dental aesthetics"
                fill
                sizes="220px"
                className="hero-mosaic-image [animation-delay:320ms] object-cover object-[50%_40%]"
              />
            </div>
            <div className="hidden md:block col-start-5 row-start-1 row-span-2 rounded-[20px] overflow-hidden relative bg-[#e7efe7]">
              <Image
                src="/images/generated/testimonial_patient.avif"
                alt="Happy Reverse Aesthetics patient with natural, glowing skin"
                fill
                sizes="220px"
                className="hero-mosaic-image [animation-delay:440ms] object-cover object-[50%_30%]"
              />
            </div>
            <div className="col-start-1 col-span-2 row-start-3 md:row-start-3 rounded-[20px] overflow-hidden relative bg-[#f0e9e2]">
              <Image
                src="/images/generated/clinic_interior_2.avif"
                alt="Reverse Aesthetics clinic interior"
                fill
                priority
                sizes="(min-width: 768px) 454px, 416px"
                className="hero-mosaic-image [animation-delay:560ms] object-cover object-[50%_50%]"
              />
            </div>
            <div className="col-start-3 md:col-start-5 row-start-3 md:row-start-3 self-start h-[190px] md:h-[200px] rounded-[20px] overflow-hidden relative bg-[#e4edf1]">
              <Image
                src="/images/generated/weightloss_service.avif"
                alt="Medical weight loss and body contouring"
                fill
                sizes="(min-width: 768px) 220px, 202px"
                className="hero-mosaic-image [animation-delay:680ms] object-cover object-[50%_40%]"
              />
            </div>
          </div>
        </div>
      </section>

      <HomeSections />
      <FloatingWhatsApp />
    </div>
  );
}
