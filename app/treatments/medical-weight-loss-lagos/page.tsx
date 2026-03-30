import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";
import TrustHighlights from "../../components/TrustHighlights";

export const metadata: Metadata = {
  title: "Medical Weight Loss Clinic in Lagos | Reverse Aesthetics",
  description: "Evidence-based weight loss programs, injectable support, body contouring, and fat-dissolving treatments. Achieve sustainable results with expert medical guidance.",
  keywords: ["Weight loss clinic Lagos", "Fat dissolving injections Nigeria", "Medical weight loss Nigeria", "Body contouring Lagos", "Skin tightening after weight loss"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/medical-weight-loss-lagos",
  },
  openGraph: {
    title: "Medical Weight Loss Clinic in Lagos | Reverse Aesthetics",
    description: "Evidence-based weight loss programs with medical guidance and injectable support in Nigeria.",
    url: "https://reverseaesthetic.com/treatments/medical-weight-loss-lagos",
  }
};

export default function WeightLossPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Medical Weight Loss and Body Contouring",
    "procedureType": "Medical Weight Management",
    "description": "Physician-guided weight loss programs, metabolic labs, and targeted fat reduction technologies.",
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
            src="/images/generated/weight_service.avif"
            alt="Medical weight loss and health clinic"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bronze mb-5 block">
              Weight Loss Clinic
            </span>
            <h1
              className="text-5xl lg:text-[4rem] font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Medical <span className="italic">Weight Loss</span> & Contouring in Lagos
            </h1>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-10 max-w-xl">
              Sustainable change beats quick fixes. Our medical team designs highly personalized programs to reduce cravings, improve nutrition, refine your silhouette, and support lasting fat loss.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-charcoal text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-bronze hover:text-white"
            >
              Start Your Program
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
                src="/images/generated/hero_desktop.avif"
                alt="Body contouring consultation in Lagos"
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
                Safe, medically-directed <span className="italic">body transformations</span>.
              </h2>
              <p className="text-warm-gray-400 leading-relaxed font-light mb-8">
                Weight loss is biological, not just behavioral. We provide the labs, medical insights, and effective therapies—ranging from injectable support to advanced body sculpting techniques—to ensure you meet your aesthetic goals responsibly.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Physician-Guided Programs</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Including baseline health reviews, lab diagnostics, lifestyle coaching, and potential injection-based weight loss support prescribed solely where clinically appropriate.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Body Contouring & Fat Reduction</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Target stubborn pockets that don’t respond to exercise. We employ leading energy-based technologies to smoothly sculpt targeted problem areas for a refined shape.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Post-Weight Loss Firming</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Shedding weight is only step one. We incorporate powerful skin firming and tightening protocols designed to resolve loose skin and redefine your jawline and body proportions post-loss.
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
              Important insights about our weight programs in Nigeria.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">Do you prescribe injectable weight loss solutions?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Yes, but strict diagnostic screening is mandatory. We only prescribe modern injection-based support where a patient is formally mapped to be clinically suitable, prioritizing cardiovascular safety and long-term habits.
              </p>
            </div>
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">How quickly will I see results?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Healthy weight loss is progressive. Fat dissolving injections and body contouring results begin appearing incrementally between weeks 3 to 6 as your body synthesizes and metabolizes the treated cells.
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">What happens after reaching my goal weight?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Maintenance is vital. You transition immediately to a maintenance roadmap involving check-ins and nutrition stabilization, alongside treatments to handle stretch marks or residual laxity. 
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
            <Link href="/treatments/botox-and-dermal-fillers-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), serif" }}>Botox & Dermal Fillers</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Targeted injectables for wrinkle reduction, volume restoration, and facial harmony.</p>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">Learn More &rarr;</span>
            </Link>
            <Link href="/treatments/iv-glow-therapy-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), serif" }}>IV Glow Therapy</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Medical-grade vitamin infusions for skin radiance, immunity, and anti-aging.</p>
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
