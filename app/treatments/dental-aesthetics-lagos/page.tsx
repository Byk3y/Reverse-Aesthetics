import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";
import TrustHighlights from "../../components/TrustHighlights";

export const metadata: Metadata = {
  title: "Dental Aesthetics Lagos | Teeth Whitening & Veneers Nigeria | Reverse Aesthetics",
  description: "Transform your smile with professional teeth whitening, porcelain veneers, and complete smile design at Lagos' leading aesthetic dental clinic. Book a consultation today.",
  keywords: ["Teeth Whitening Lagos", "Dental Veneers Nigeria", "Smile Makeover Lagos", "Cosmetic Dentist Lekki", "Porcelain Veneers Lagos", "Dental Aesthetics Nigeria"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/dental-aesthetics-lagos",
  },
  openGraph: {
    title: "Dental Aesthetics Lagos | Teeth Whitening & Veneers Nigeria | Reverse Aesthetics",
    description: "Transform your smile with professional teeth whitening and porcelain veneers in Lagos.",
    url: "https://reverseaesthetic.com/treatments/dental-aesthetics-lagos",
  }
};

export default function DentalAestheticsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Dental Aesthetics - Teeth Whitening and Veneers",
    "procedureType": "Cosmetic Dental Treatment",
    "description": "Professional teeth whitening, porcelain veneers, and complete smile design for a brighter, more confident smile.",
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
            src="/images/generated/dental_smile.avif"
            alt="Dental aesthetics and teeth whitening clinic in Lagos"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bronze mb-5 block">
              Dental Aesthetics
            </span>
            <h1
              className="text-5xl lg:text-[4rem] font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Premium <span className="italic">Teeth Whitening</span> & <span className="italic">Veneers</span> in Lagos
            </h1>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-10 max-w-xl">
              Achieve a radiant, camera-ready smile with our advanced cosmetic dental treatments. From professional-grade whitening to bespoke porcelain veneers, our dental specialists craft results that look natural and last.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-charcoal text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-bronze hover:text-white"
            >
              Book Your Smile Consultation
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
                src="/images/services/dental.avif"
                alt="Porcelain veneers and smile design in Nigeria"
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
                A confident smile starts with <span className="italic">expert dental care</span>.
              </h2>
              <p className="text-warm-gray-400 leading-relaxed font-light mb-8">
                Your smile is the first thing people notice. Our cosmetic dental team combines precision artistry with advanced dental technology to deliver results that enhance your natural beauty—whiter teeth, seamless veneers, and a smile designed uniquely for your face.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Laser Teeth Whitening</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Professional in-clinic whitening that lifts stains and brightens your teeth up to 8 shades in a single session. Safe, fast, and dramatically effective compared to at-home kits.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Porcelain Veneers & Bonding</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Custom-crafted, wafer-thin shells bonded to the front surface of your teeth to correct chips, gaps, discolouration, and uneven alignment. Each veneer is colour-matched and shaped to complement your facial features.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Complete Smile Design</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    A holistic approach combining whitening, veneers, gum contouring, and alignment to create a harmonious, balanced smile. We use digital smile simulation so you preview your results before any work begins.
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
              Common questions about dental aesthetics in Lagos.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">How long does professional teeth whitening last?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Results typically last 12–18 months depending on your diet and oral care routine. We recommend touch-up sessions every 6–12 months and provide at-home maintenance kits to extend your results between visits.
              </p>
            </div>
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">Are porcelain veneers safe for my natural teeth?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Yes. Modern veneer preparation removes only a minimal layer of enamel (0.3–0.5mm). Our dental specialists use conservative techniques that preserve as much natural tooth structure as possible while delivering a flawless finish.
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">What is the cost of dental aesthetics in Lagos?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Pricing varies by treatment. Professional whitening starts from ₦80,000, while porcelain veneers begin at ₦250,000 per tooth. We offer transparent pricing with no hidden fees—your personalised treatment plan and full cost breakdown are provided during your initial consultation.
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
            <Link href="/treatments/laser-skin-resurfacing-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), serif" }}>Laser Skin Resurfacing</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Precision lasers for pigmentation correction, acne scars, and skin renewal.</p>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">Learn More &rarr;</span>
            </Link>
            <Link href="/treatments/iv-glow-therapy-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), serif" }}>IV Glow Therapy</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Medical-grade vitamin infusions for skin radiance, immunity, and anti-aging.</p>
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
