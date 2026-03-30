import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";
import TrustHighlights from "../../components/TrustHighlights";

export const metadata: Metadata = {
  title: "Acne & Scar Treatment Lagos | Dermatologist Nigeria | Reverse Aesthetics",
  description: "Expert acne and scar treatment in Lagos by certified dermatologists. Medical-grade solutions for active acne, post-acne marks, and deep scarring. Book your consultation.",
  keywords: ["Acne Treatment Lagos", "Scar Treatment Nigeria", "Dermatologist Lagos", "Acne Clinic Lekki", "Acne Scar Removal Nigeria", "Skin Doctor Lagos"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/acne-scar-treatment-lagos",
  },
  openGraph: {
    title: "Acne & Scar Treatment Lagos | Dermatologist Nigeria | Reverse Aesthetics",
    description: "Expert acne and scar treatment by certified dermatologists in Lagos.",
    url: "https://reverseaesthetic.com/treatments/acne-scar-treatment-lagos",
  }
};

export default function AcneScarTreatmentPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Acne and Scar Treatment",
    "procedureType": "Dermatological treatment",
    "description": "Comprehensive acne management and scar revision including medical-grade peels, microneedling, and laser therapy.",
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
            src="/images/services/acne-face.avif"
            alt="Acne and scar treatment consultation in Lagos"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bronze mb-5 block">
              Dermatology
            </span>
            <h1
              className="text-5xl lg:text-[4rem] font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Advanced <span className="italic">Acne</span> & <span className="italic">Scar Treatment</span> in Lagos
            </h1>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-10 max-w-xl">
              Clear active breakouts, fade stubborn marks, and smooth deep scars with our medical dermatology approach. Our certified specialists combine prescription therapies with advanced clinical treatments to restore your skin&apos;s clarity and confidence.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-charcoal text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-bronze hover:text-white"
            >
              Book Your Skin Consultation
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
                src="/images/services/acne-healed-face.avif"
                alt="Clear skin after acne scar treatment in Nigeria"
                fill
                className="object-cover"
              />
            </div>

            {/* Copy */}
            <div>
              <h2
                className="text-charcoal text-4xl mb-6 font-light"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Medical solutions for <span className="italic">lasting clear skin</span>.
              </h2>
              <p className="text-warm-gray-400 leading-relaxed font-light mb-8">
                Acne is a medical condition, not a cosmetic inconvenience. Effective treatment requires identifying root causes—hormonal imbalances, bacterial overgrowth, or inflammatory responses—and addressing them with evidence-based protocols that go far beyond over-the-counter products.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Medical Acne Management</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    A comprehensive programme combining prescription topicals, oral medications where appropriate, and in-clinic treatments to control active acne. We address the underlying cause—whether hormonal, bacterial, or inflammatory—rather than just treating symptoms.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Chemical Peels & Microneedling</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Medical-grade chemical peels accelerate cell turnover and lighten post-inflammatory hyperpigmentation. Microneedling with collagen-inducing therapy stimulates your skin&apos;s repair mechanism, smoothing shallow scars and improving overall texture.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Scar Revision & Skin Renewal</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    For deeper, pitted, or ice-pick scars, we combine fractional laser resurfacing with subcision and PRP therapy to rebuild the skin from within. A multi-modality approach ensures the most dramatic improvement for long-standing scarring.
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
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-warm-gray-400 font-light">
              Common questions about acne and scar treatment in Nigeria.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">What causes adult acne?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Adult acne is commonly triggered by hormonal fluctuations, stress, diet, and environmental factors. In women, it often worsens around menstrual cycles or during perimenopause. Our dermatologists investigate the root cause through a thorough skin analysis and, when needed, blood work to guide your treatment plan.
              </p>
            </div>
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">How long does acne scar treatment take?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Visible improvement typically begins after 2–3 sessions, with optimal results achieved over 3–6 months depending on scar depth and type. We set realistic expectations during your consultation and track progress with clinical photography at each visit.
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">Can dark skin safely undergo scar treatment?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Absolutely. Our protocols are specifically designed for melanin-rich skin (Fitzpatrick types IV–VI). We use skin-safe laser settings, appropriate peel concentrations, and microneedling depths calibrated to minimise the risk of post-inflammatory hyperpigmentation while maximising scar improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-20 bg-ivory border-t border-warm-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl text-charcoal text-center mb-12 font-light" style={{ fontFamily: "var(--font-display), serif" }}>
            Related <span className="italic">Treatments</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/treatments/laser-skin-resurfacing-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), serif" }}>Laser Skin Resurfacing</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Precision lasers for pigmentation correction, acne scars, and skin renewal.</p>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">Learn More &rarr;</span>
            </Link>
            <Link href="/treatments/botox-and-dermal-fillers-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), serif" }}>Botox & Dermal Fillers</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Targeted injectables for wrinkle reduction, volume restoration, and facial harmony.</p>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">Learn More &rarr;</span>
            </Link>
            <Link href="/treatments/hifu-skin-tightening-nigeria" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), serif" }}>HIFU Skin Tightening</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Non-surgical facelift using focused ultrasound for lifting and collagen regeneration.</p>
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
