import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import ClinicNavbar from "../../components/home/ClinicNavbar";
import { Breadcrumbs } from "../../components/home/Breadcrumbs";
import ScrollMotion from "../../components/home/ScrollMotion";
import { SiteFooter } from "../../components/home/SiteFooter";
import FloatingWhatsApp from "../../components/home/FloatingWhatsApp";
import { BOOKING_URL, WHATSAPP_URL } from "../../components/home/homeData";

const aestheticTreatments = [
  {
    name: "Botox & Dermal Fillers",
    description: "Restore volume, smooth wrinkles, and enhance facial contours with premium injectables.",
    price: "From ₦150,000",
    image: "/images/services/service-dermal-fillers.avif",
    href: "/treatments/botox-and-dermal-fillers-lagos",
  },
  {
    name: "HIFU Skin Tightening",
    description: "Non-surgical facelift using High-Intensity Focused Ultrasound to lift and tighten the skin.",
    price: "From ₦250,000",
    image: "/images/services/service-profile-balancing.avif",
    href: "/treatments/hifu-skin-tightening-nigeria",
  },
  {
    name: "Laser Skin Resurfacing",
    description: "Advanced laser technology to treat pigmentation, acne scars, and uneven skin tone.",
    price: "From ₦180,000",
    image: "/images/generated/hero_laser_treatment.avif",
    href: "/treatments/laser-skin-resurfacing-lagos",
  },
  {
    name: "IV Glow Therapy",
    description: "Intravenous vitamin and antioxidant infusions for deep hydration and a radiant complexion.",
    price: "From ₦85,000",
    image: "/images/generated/hero_iv_therapy.avif",
    href: "/treatments/iv-glow-therapy-lagos",
  },
];

export default function AestheticsPage() {
  return (
    <div
      className="w-full bg-white text-[var(--color-clinic-navy)]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <ClinicNavbar />
      <div className="h-[118px] md:h-[126px] bg-[var(--color-clinic-hero-top)]" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-clinic-hero-top)]">
        <Breadcrumbs
          items={[
            { label: "Clinics", href: "/clinics" },
            { label: "Aesthetics & Dermatology" },
          ]}
        />
        <div className="mx-auto max-w-[820px] px-[20px] pb-[54px] pt-[18px] text-center md:pb-[72px] md:pt-[30px]">
          <p className="hero-copy-reveal mb-[18px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)] md:text-[13px]">
            Specialist Clinic
          </p>
          <h1 className="hero-copy-reveal [animation-delay:120ms] mx-auto max-w-[760px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[52px] md:leading-[1.08]">
            Aesthetics &{" "}
            <span className="text-[var(--color-clinic-hero-accent)]">
              Dermatology
            </span>
          </h1>
          <p className="hero-copy-reveal [animation-delay:240ms] mx-auto mt-[26px] max-w-[620px] text-[16px] leading-[1.7] text-[#5a5651] md:text-[18px]">
            Our flagship clinic offering advanced, medically-led treatments designed
            to restore, protect, and enhance your skin&apos;s natural beauty.
          </p>
        </div>
      </section>

      <div className="motion-scope">
        <ScrollMotion />

        {/* TREATMENTS — alternating image / content rows */}
        {aestheticTreatments.map((treatment, index) => {
          const flipped = index % 2 !== 0;
          return (
            <section
              key={treatment.name}
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
                    src={treatment.image}
                    alt={treatment.name}
                    fill
                    sizes="(min-width: 768px) 540px, calc(100vw - 40px)"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className={`motion-heading ${flipped ? "md:order-1" : ""}`}>
                  <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                    0{index + 1} / Aesthetics &amp; Dermatology
                  </p>
                  <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
                    {treatment.name}
                  </h2>
                  <p className="mt-[18px] max-w-[560px] text-[15px] leading-[1.75] text-[#5f6c69] md:text-[16px]">
                    {treatment.description}
                  </p>

                  <div
                    className={`motion-card mt-[26px] inline-block rounded-[12px] border border-[#d8e6e7] px-[20px] py-[15px] ${
                      flipped ? "bg-white" : "bg-[#f8fbf9]"
                    }`}
                  >
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                      Starting Price
                    </p>
                    <p className="mt-[6px] text-[19px] font-bold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                      {treatment.price}
                    </p>
                  </div>

                  <div className="mt-[30px]">
                    <Link
                      href={treatment.href}
                      className="inline-flex h-[48px] w-full items-center justify-center rounded-full border border-[#d8e6e7] px-[32px] text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-clinic-navy)] transition-colors hover:bg-[#e4f1f2] sm:w-auto"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* PHILOSOPHY */}
        <section className="bg-[var(--color-clinic-warm-bg)] py-[70px] md:py-[100px]">
          <div className="mx-auto max-w-[820px] px-[20px] text-center md:px-[40px]">
            <div className="motion-heading">
              <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                Our philosophy
              </p>
              <p className="mx-auto max-w-[720px] text-[22px] font-semibold leading-[1.4] tracking-[-0.01em] text-[var(--color-clinic-navy)] md:text-[28px]">
                &ldquo;We don&apos;t believe in changing how you look. We believe in restoring your skin&apos;s health so your natural confidence can shine through.&rdquo;
              </p>
              <p className="mt-[22px] text-[12px] font-bold uppercase tracking-[0.14em] text-[#8a938f]">
                — Dr. Ral Abana
              </p>
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
                Ready to perfect your skin?
              </h2>
              <p className="mx-auto mt-[16px] max-w-[520px] text-[15px] leading-[1.7] text-white/70 md:text-[16px]">
                Schedule a consultation to build your bespoke treatment plan.
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
