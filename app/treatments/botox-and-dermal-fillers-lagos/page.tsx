import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";
import TrustHighlights from "../../components/TrustHighlights";

export const metadata: Metadata = {
  title: "Botox in Lagos & Dermal Fillers Nigeria | Reverse Aesthetics",
  description: "Top-rated aesthetic clinic in Lagos for Botox and Dermal Fillers. Get natural, balanced results with our expert doctors. Book a consultation today.",
  keywords: ["Botox Lagos", "Dermal Fillers Nigeria", "Lip fillers Lagos", "Anti-aging clinic Lagos", "Aesthetic treatment near me", "Facial balancing Nigeria"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/botox-and-dermal-fillers-lagos",
  },
  openGraph: {
    title: "Botox in Lagos & Dermal Fillers Nigeria | Reverse Aesthetics",
    description: "Get natural, balanced results with our expert doctors in Lagos.",
    url: "https://reverseaesthetic.com/treatments/botox-and-dermal-fillers-lagos",
  }
};

export default function BotoxAndFillersPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Botox and Dermal Fillers",
    "procedureType": "Non-surgical aesthetic treatment",
    "description": "Injectable treatments for facial rejuvenation, wrinkle reduction, and profile balancing using Botox and Dermal Fillers.",
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
            src="/images/generated/aesthetics_service.avif"
            alt="Botox treatment at clinic in Lagos"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bronze mb-5 block">
              Aesthetics & Dermatology
            </span>
            <h1
              className="text-5xl lg:text-[4rem] font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Premium <span className="italic">Botox</span> & <span className="italic">Dermal Fillers</span> in Lagos
            </h1>
            <p className="text-lg text-white/80 font-normal leading-relaxed mb-10 max-w-xl">
              Restore volume, smooth out deep lines, and achieve perfect facial harmony without surgery. Our expert medical team delivers subtle, natural results tailored purely to your unique anatomy.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-charcoal text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-bronze hover:text-white"
            >
              Book Your Consultation
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
                alt="Dermal filler consultation in Nigeria"
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
                Refined injectables for a <span className="italic">natural aesthetic</span>.
              </h2>
              <p className="text-warm-gray-400 leading-relaxed font-light mb-8">
                Healthy skin and facial harmony are a long game. We combine advanced medical dermatology with modern aesthetic injectables to help you look fresh, lifted, and naturally radiant—without losing what makes you, you.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Botox & Muscle Relaxants</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Used for anti-aging, wrinkle reduction, and shoulder/jawline slimming. We map out your facial muscles to deliver precise doses, preventing static wrinkles while ensuring continuous natural movement.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Targeted Dermal Fillers</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Designed to restore lost volume, hydrate the skin from within, and provide structural lift. Perfect for lip enhancement, cheek contouring, and holistic profile balancing.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Fat-Dissolving (Lipolysis)</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Target stubborn pockets of fat under the chin or jawline. A highly effective injectable alternative for redefining the lower face.
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
              Everything you need to know about injectables in Nigeria.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">Are my results going to look natural?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Yes. Our philosophy prioritizes proportion, subtlety, and harmony. Our UK GMC-registered practitioners tailor plans to enhance, not dramatically change, your features.
              </p>
            </div>
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">Is getting Botox in Lagos safe?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Absolutely. We use purely medical-grade, internationally approved products. Every treatment runs through strict, hospital-standard safety protocols at our Lekki clinic.
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">How long is the recovery time?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Injectables feature virtually no downtime. You can return to your routine immediately, though we advise against strenuous exercise or intense heat for 24 hours. We provide thorough aftercare guides post-treatment.
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
            <Link href="/treatments/laser-skin-resurfacing-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), sans-serif" }}>Laser Skin Resurfacing</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Precision lasers for pigmentation correction, acne scars, and skin renewal.</p>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">Learn More &rarr;</span>
            </Link>
            <Link href="/treatments/acne-scar-treatment-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), sans-serif" }}>Acne & Scar Treatment</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Medical dermatology for active acne, post-acne marks, and deep scarring.</p>
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
