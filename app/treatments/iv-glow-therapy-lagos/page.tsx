import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";
import TrustHighlights from "../../components/TrustHighlights";

export const metadata: Metadata = {
  title: "IV Glow Therapy Lagos | Vitamin IV Drip Nigeria | Reverse Aesthetics",
  description: "Premium IV vitamin drips and glow therapy in Lagos. Glutathione skin brightening, NAD+ anti-aging, and immunity infusions. Medical-grade wellness treatments. Book now.",
  keywords: ["IV Drip Lagos", "Vitamin IV Therapy Nigeria", "Glutathione Drip Lagos", "IV Glow Therapy Lekki", "NAD Drip Nigeria", "Wellness IV Infusion Lagos"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/iv-glow-therapy-lagos",
  },
  openGraph: {
    title: "IV Glow Therapy Lagos | Vitamin IV Drip Nigeria | Reverse Aesthetics",
    description: "Premium IV vitamin drips and glow therapy treatments in Lagos.",
    url: "https://reverseaesthetic.com/treatments/iv-glow-therapy-lagos",
  }
};

export default function IvGlowTherapyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "IV Glow Therapy and Vitamin Infusions",
    "procedureType": "Intravenous wellness therapy",
    "description": "Medical-grade IV vitamin infusions including glutathione skin brightening, NAD+ anti-aging, and immune-boosting drips.",
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
            src="/images/generated/blog_wellness.avif"
            alt="IV glow therapy and vitamin drip session in Lagos"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bronze mb-5 block">
              Wellness & IV Therapy
            </span>
            <h1
              className="text-5xl lg:text-[4rem] font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Premium <span className="italic">IV Glow Therapy</span> & Vitamin Drips in Lagos
            </h1>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-10 max-w-xl">
              Replenish your body from the inside out with medical-grade vitamin infusions. Our bespoke IV drips deliver instant hydration, skin radiance, immune defence, and anti-aging benefits directly into your bloodstream for maximum absorption.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-charcoal text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-bronze hover:text-white"
            >
              Book Your Drip Session
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
                src="/images/generated/aesthetics_service.avif"
                alt="Vitamin IV infusion drip therapy in Nigeria"
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
                Glow from within with <span className="italic">medical-grade infusions</span>.
              </h2>
              <p className="text-warm-gray-400 leading-relaxed font-light mb-8">
                Oral supplements lose up to 80% of their potency through digestion. IV therapy bypasses the gut entirely, delivering vitamins, minerals, and antioxidants directly to your cells at 100% bioavailability. The result: immediate energy, clearer skin, and whole-body rejuvenation.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Glutathione Skin Brightening Drip</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    The body&apos;s master antioxidant. High-dose glutathione inhibits melanin production, detoxifies the liver, and gives skin a luminous, even-toned glow. Our most popular treatment for achieving that &ldquo;lit from within&rdquo; radiance.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">NAD+ Anti-Aging Infusion</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    NAD+ is a coenzyme essential for cellular energy and DNA repair. Our NAD+ drip combats fatigue, improves mental clarity, supports neurological function, and slows biological aging at the cellular level. The ultimate longevity treatment.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Immunity & Energy Boost Drip</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    A potent blend of Vitamin C, B-complex, zinc, and selenium designed to fortify your immune system, fight chronic fatigue, and accelerate recovery from illness or jet lag. Ideal for busy professionals and frequent travellers.
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
              What to know about IV therapy in Lagos.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">What is IV glow therapy?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                IV glow therapy is a medical wellness treatment where high-dose vitamins and antioxidants (especially glutathione and Vitamin C) are infused directly into your bloodstream via an IV drip. It delivers skin-brightening, detoxifying, and energising benefits far more effectively than oral supplements.
              </p>
            </div>
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">How often should I get an IV drip?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                For skin brightening, we recommend weekly sessions for the first 4–6 weeks, then bi-weekly or monthly maintenance. For general wellness and immunity, monthly sessions are typically sufficient. Your practitioner will tailor a schedule based on your specific goals.
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">Are IV vitamin drips safe?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Yes. All our IV treatments are administered by qualified medical professionals in a clinical setting. We use pharmaceutical-grade ingredients and follow strict sterile protocols. A brief health screening is conducted before every session to ensure the treatment is appropriate for you.
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
            <Link href="/treatments/medical-weight-loss-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), serif" }}>Medical Weight Loss</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Physician-guided weight loss programmes, injection support, and body sculpting.</p>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">Learn More &rarr;</span>
            </Link>
            <Link href="/treatments/acne-scar-treatment-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), serif" }}>Acne & Scar Treatment</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Medical dermatology for active acne, post-acne marks, and deep scarring.</p>
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
