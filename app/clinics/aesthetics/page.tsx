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
    image: "/images/generated/aesthetics_service.png",
  },
  {
    name: "HIFU Skin Tightening",
    description: "Non-surgical facelift using High-Intensity Focused Ultrasound to lift and tighten the skin.",
    price: "From ₦250,000",
    image: "/images/generated/testimonial_patient.png",
  },
  {
    name: "Laser Skin Resurfacing",
    description: "Advanced laser technology to treat pigmentation, acne scars, and uneven skin tone.",
    price: "From ₦180,000",
    image: "/images/generated/clinic_interior.png",
  },
  {
    name: "IV Glow Therapy",
    description: "Intravenous vitamin and antioxidant infusions for deep hydration and a radiant complexion.",
    price: "From ₦85,000",
    image: "/images/generated/aesthetics_service.png",
  },
];

export default function AestheticsPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="pt-28 lg:pt-32 pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            Specialist Clinic
          </p>
          <h1
            className="text-plum mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Aesthetics & <span className="italic">Dermatology</span>
          </h1>
          <p className="text-plum-muted text-lg leading-relaxed">
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
                <div className={`relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ${index % 2 !== 0 ? "lg:[direction:ltr]" : ""}`}>
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
                    className="text-2xl lg:text-3xl text-plum mb-4"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {treatment.name}
                  </h2>
                  <p className="text-plum-muted leading-relaxed mb-6">
                    {treatment.description}
                  </p>
                  
                  <div className="bg-ivory rounded-xl p-4 inline-block mb-8 border border-warm-gray-100">
                    <p className="text-xs text-plum-muted uppercase tracking-wider mb-1">
                      Starting Price
                    </p>
                    <p className="font-semibold text-plum">
                      {treatment.price}
                    </p>
                  </div>

                  <div>
                    <Link href="/booking" className="btn-outline">
                      Book Consultation
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
          <div className="text-gold/20 text-6xl leading-none font-serif mb-4">"</div>
          <p className="text-xl lg:text-2xl text-plum mb-6 italic" style={{ fontFamily: "var(--font-playfair), serif" }}>
            We don't believe in changing how you look. We believe in restoring your skin's health so your natural confidence can shine through.
          </p>
          <p className="text-sm font-semibold text-plum uppercase tracking-widest">
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
