import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";
import TrustHighlights from "../../components/TrustHighlights";

export const metadata: Metadata = {
  title: "Laser Skin Resurfacing Lagos | Pigmentation Treatment Nigeria | Reverse Aesthetics",
  description: "Advanced laser skin resurfacing for pigmentation, acne scars, and uneven skin tone in Lagos. Expert dermatologists using medical-grade laser technology. Book now.",
  keywords: ["Laser Skin Treatment Lagos", "Pigmentation Laser Nigeria", "Skin Resurfacing Lagos", "Acne Scar Laser Lekki", "Fractional Laser Nigeria", "Dark Spot Treatment Lagos"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/laser-skin-resurfacing-lagos",
  },
  openGraph: {
    title: "Laser Skin Resurfacing Lagos | Pigmentation Treatment Nigeria | Reverse Aesthetics",
    description: "Advanced laser skin resurfacing for pigmentation and acne scars in Lagos.",
    url: "https://reverseaesthetic.com/treatments/laser-skin-resurfacing-lagos",
  }
};

export default function LaserSkinResurfacingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Laser Skin Resurfacing",
    "procedureType": "Dermatological laser treatment",
    "description": "Advanced laser technology for skin resurfacing, pigmentation correction, and acne scar treatment.",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Reverse Aesthetics",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Historia Mews, No. 5 Ayo Babatunde Crescent, Oniru",
        "addressLocality": "Lekki",
        "addressRegion": "Lagos",
        "addressCountry": "NG"
      }
    }
  };

  return (
    <main>
      <Header />

      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* SEO Optimized Hero */}
      <section className="pt-28 lg:pt-40 pb-16 lg:pb-24 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/generated/clinic_interior.avif"
            alt="Laser skin resurfacing treatment at clinic in Lagos"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bronze mb-5 block">
              Laser & Pigmentation
            </span>
            <h1
              className="text-5xl lg:text-[4rem] font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Expert <span className="italic">Laser Skin Resurfacing</span> in Lagos
            </h1>
            <p className="text-lg text-white/80 font-normal leading-relaxed mb-10 max-w-xl">
              Target stubborn pigmentation, smooth acne scars, and reveal fresh, even-toned skin with our medical-grade laser systems. Tailored protocols for melanin-rich skin, delivered by certified dermatology specialists.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-charcoal text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-bronze hover:text-white"
            >
              Book Your Skin Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Highlights Component */}
      <TrustHighlights />

      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden w-full max-w-md mx-auto lg:max-w-none">
              <Image
                src="/images/generated/hero_mobile.avif"
                alt="Laser pigmentation treatment for dark skin in Nigeria"
                fill
                className="object-cover"
              />
            </div>

            {/* Copy */}
            <div>
              <h2
                className="text-charcoal text-4xl mb-6 font-light"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Precision lasers for <span className="italic">flawless, even skin</span>.
              </h2>
              <p className="text-warm-gray-400 leading-relaxed font-light mb-8">
                Hyperpigmentation, post-inflammatory marks, melasma, and acne scarring are among the most common concerns for darker skin tones. Our laser protocols are specifically calibrated for melanin-rich skin, ensuring effective results without the risk of post-treatment darkening.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Fractional Laser Resurfacing</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Creates thousands of microscopic treatment zones in the skin, stimulating rapid collagen remodelling while leaving surrounding tissue intact for faster healing. Ideal for textural irregularities, fine lines, and shallow scars.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Pigmentation & Dark Spot Correction</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Targeted laser wavelengths break down excess melanin deposits that cause dark spots, sun damage, and uneven skin tone. We use skin-type-specific settings with built-in cooling to protect the epidermis during treatment.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Acne Scar Laser Therapy</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    For deeper, pitted acne scars, our ablative and non-ablative laser options resurface the skin layer by layer, encouraging new, smoother skin to form. Often combined with microneedling for enhanced results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2
              className="text-charcoal text-4xl font-light mb-4"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-warm-gray-400 font-light">
              Key questions about laser skin treatments in Lagos.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">What skin concerns can laser resurfacing treat?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Laser resurfacing effectively treats hyperpigmentation, melasma, sun damage, acne scars, enlarged pores, fine lines, and uneven skin texture. During your consultation, our dermatologist will assess your skin and recommend the most effective laser type for your specific concerns.
              </p>
            </div>
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">How many laser sessions are needed?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Most clients require 3–6 sessions spaced 4–6 weeks apart for optimal results. Mild pigmentation may clear in as few as 2 sessions, while deeper scars typically require a longer treatment course. We create a tailored plan with realistic timelines during your first visit.
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">Is laser treatment safe for dark skin?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Yes, when performed by experienced practitioners using the right equipment. Our clinic uses lasers specifically selected for safety on Fitzpatrick skin types IV–VI. We conduct patch tests and use conservative settings to ensure safe, effective results for all skin tones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-20 bg-ivory border-t border-warm-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl text-charcoal text-center mb-12 font-light" style={{ fontFamily: "var(--font-display), sans-serif" }}>
            Related <span className="italic">Treatments</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/treatments/hifu-skin-tightening-nigeria" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), sans-serif" }}>HIFU Skin Tightening</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Non-surgical facelift using focused ultrasound for lifting and collagen regeneration.</p>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">Learn More &rarr;</span>
            </Link>
            <Link href="/treatments/acne-scar-treatment-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), sans-serif" }}>Acne & Scar Treatment</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Medical dermatology for active acne, post-acne marks, and deep scarring.</p>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">Learn More &rarr;</span>
            </Link>
            <Link href="/treatments/botox-and-dermal-fillers-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), sans-serif" }}>Botox & Dermal Fillers</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Targeted injectables for wrinkle reduction, volume restoration, and facial harmony.</p>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">Learn More &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
