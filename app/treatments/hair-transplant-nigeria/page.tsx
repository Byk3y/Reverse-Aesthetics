import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";
import TrustHighlights from "../../components/TrustHighlights";

export const metadata: Metadata = {
  title: "Hair Transplant in Lagos & Hair Restoration Nigeria | Reverse Aesthetics",
  description: "Restore density and refine your hairline with natural-looking hair transplants and non-surgical regeneration in Lagos. Book your hair assessment today.",
  keywords: ["Hair Transplant Lagos", "Hair Restoration Nigeria", "FUE Hair Transplant", "DHI Hair Transplant", "Beard transplant Nigeria", "Hair loss clinic Lagos"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/hair-transplant-nigeria",
  },
  openGraph: {
    title: "Hair Transplant in Lagos & Hair Restoration Nigeria | Reverse Aesthetics",
    description: "Restore density and protect long-term hair health with expert hair restoration in Nigeria.",
    url: "https://reverseaesthetic.com/treatments/hair-transplant-nigeria",
  }
};

export default function HairTransplantPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Hair Transplant and Restoration",
    "procedureType": "Surgical and Non-Surgical Hair Restoration",
    "description": "Hair transplant surgery, hairline design, and non-surgical hair regeneration protocols for long-term hair health.",
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
            src="/images/generated/hair_service.avif"
            alt="Hair Transplant and Restoration in Lagos"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bronze mb-5 block">
              Hair Clinic
            </span>
            <h1
              className="text-5xl lg:text-[4rem] font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Expert <span className="italic">Hair Transplants</span> & Restoration in Nigeria
            </h1>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-10 max-w-xl">
              We restore density, refine hairlines, and protect long‑term hair health with surgical and non‑surgical solutions—always with a natural finish.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-charcoal text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-bronze hover:text-white"
            >
              Book Your Hair Assessment
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
                src="/images/generated/clinic_interior_2.avif"
                alt="Hair Transplant Consultation in Nigeria"
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
                Comprehensive solutions for <span className="italic">lasting hair health</span>.
              </h2>
              <p className="text-warm-gray-400 leading-relaxed font-light mb-8">
                Thinning hair or a receding hairline shouldn't dictate your confidence. Our dedicated Hair Clinic provides rigorous diagnostics and advanced restoration protocols to help you look like the best version of yourself.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Hair Transplants (FUE & DHI)</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Enjoy natural-looking density and expertly designed hairlines. We focus on natural direction, precise extraction, and optimal graft survival. We also specialize in beard, eyebrow, and body hair transplants.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Non-Surgical Regeneration</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Not quite ready for a transplant? We offer evidence-based protocols to support follicle growth, halt ongoing shedding, and optimize your overall scalp environment safely and naturally.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Diagnosis & Post-Transplant Care</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Every journey starts with a root-cause approach to your hair loss. Beyond the procedure, we offer continuous, guided maintenance so your investment is protected and your results last.
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
              Clear answers regarding hair restoration in Lagos.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">Is the transplant result going to look natural?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Yes. Our priority is seamless hairline design that is perfectly proportional to your face. We carefully match natural density and hair direction to ensure the transplant looks completely natural.
              </p>
            </div>
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">How long is the recovery from a hair transplant?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Most patients can return to work within a few days. We provide a detailed recovery roadmap covering post-operative washing and maintenance, ensuring your grafts heal efficiently.
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">Do you treat female hair loss?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Absolutely. We handle various forms of hair thinning for both men and women, employing extensive non-surgical regeneration protocols mapping out root causes.
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
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
