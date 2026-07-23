"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";

const aestheticTreatments = [
  {
    name: "Botox & Dermal Fillers",
    description: "Restore volume, smooth wrinkles, and enhance facial contours with premium injectables.",
    price: "From ₦150,000",
    image: "/images/generated/aesthetics_service.avif",
    href: "/treatments/botox-and-dermal-fillers-lagos",
  },
  {
    name: "HIFU Skin Tightening",
    description: "Non-surgical facelift using High-Intensity Focused Ultrasound to lift and tighten the skin.",
    price: "From ₦250,000",
    image: "/images/generated/testimonial_patient.avif",
    href: "/treatments/hifu-skin-tightening-nigeria",
  },
  {
    name: "Laser Skin Resurfacing",
    description: "Advanced laser technology to treat pigmentation, acne scars, and uneven skin tone.",
    price: "From ₦180,000",
    image: "/images/generated/clinic_interior.avif",
    href: "/treatments/laser-skin-resurfacing-lagos",
  },
  {
    name: "IV Glow Therapy",
    description: "Intravenous vitamin and antioxidant infusions for deep hydration and a radiant complexion.",
    price: "From ₦85,000",
    image: "/images/generated/aesthetics_service.avif",
    href: "/treatments/iv-glow-therapy-lagos",
  },
];

export default function AestheticsPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center max-w-3xl mx-auto">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze mb-5">
            Specialist Clinic
          </p>
          <h1
            className="text-charcoal font-light mb-6"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Aesthetics & <span className="italic">Dermatology</span>
          </h1>
          <p className="text-warm-gray-400 font-light text-lg leading-relaxed">
            Our flagship clinic offering advanced, medically-led treatments designed
            to restore, protect, and enhance your skin's natural beauty.
          </p>
        </div>
      </section>

      {/* Treatments List */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="space-y-16 lg:space-y-24">
            {aestheticTreatments.map((treatment, index) => (
              <div
                key={treatment.name}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 !== 0 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative aspect-square lg:aspect-[4/3] rounded-sm overflow-hidden ${index % 2 !== 0 ? "lg:[direction:ltr]" : ""}`}>
                  <Image
                    src={treatment.image}
                    alt={treatment.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className={index % 2 !== 0 ? "lg:[direction:ltr]" : ""}>
                  <h2
                    className="text-2xl lg:text-3xl font-semibold text-charcoal mb-4"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {treatment.name}
                  </h2>
                  <p className="text-warm-gray-400 font-normal leading-relaxed mb-6">
                    {treatment.description}
                  </p>

                  <div className="bg-ivory rounded-sm p-4 inline-block mb-8 border border-warm-gray-100">
                    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze mb-1">
                      Starting Price
                    </p>
                    <p className="font-semibold text-charcoal">
                      {treatment.price}
                    </p>
                  </div>

                  <div>
                    <Link href={treatment.href} className="btn-outline">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-ivory text-center">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-bronze/20 text-6xl leading-none font-serif mb-4">&ldquo;</div>
          <p className="text-xl lg:text-2xl text-charcoal font-light mb-6 italic" style={{ fontFamily: "var(--font-display), sans-serif" }}>
            We don&apos;t believe in changing how you look. We believe in restoring your skin&apos;s health so your natural confidence can shine through.
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal">
            — Dr. Ral Abana
          </p>
        </div>
      </section>

      <CTABanner
        variant="purple"
        title="Ready to perfect your skin?"
        subtitle="Schedule a consultation to build your bespoke treatment plan."
      />
      <Footer />
    </main>
  );
}
