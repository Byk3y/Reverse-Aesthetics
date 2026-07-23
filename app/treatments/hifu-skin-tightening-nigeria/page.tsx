import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";
import TrustHighlights from "../../components/TrustHighlights";

export const metadata: Metadata = {
  title: "HIFU Skin Tightening Nigeria | Non-Surgical Facelift Lagos | Reverse Aesthetics",
  description: "Get a non-surgical facelift with HIFU skin tightening in Lagos. Lift, firm, and rejuvenate your skin without downtime. Book your HIFU consultation today.",
  keywords: ["HIFU Lagos", "HIFU Treatment Nigeria", "Non-Surgical Facelift Lagos", "Skin Tightening Nigeria", "Face Lift Without Surgery Lagos", "HIFU Lekki"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments/hifu-skin-tightening-nigeria",
  },
  openGraph: {
    title: "HIFU Skin Tightening Nigeria | Non-Surgical Facelift Lagos | Reverse Aesthetics",
    description: "Lift, firm, and rejuvenate your skin with advanced HIFU technology in Lagos.",
    url: "https://reverseaesthetic.com/treatments/hifu-skin-tightening-nigeria",
  }
};

export default function HifuSkinTighteningPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "HIFU Skin Tightening",
    "procedureType": "Non-surgical aesthetic treatment",
    "description": "High-Intensity Focused Ultrasound (HIFU) for non-surgical skin tightening, lifting, and collagen regeneration.",
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
            src="/images/generated/testimonial_patient.avif"
            alt="HIFU skin tightening treatment in Lagos Nigeria"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bronze mb-5 block">
              Skin Tightening
            </span>
            <h1
              className="text-5xl lg:text-[4rem] font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Advanced <span className="italic">HIFU</span> Skin Tightening in <span className="italic">Nigeria</span>
            </h1>
            <p className="text-lg text-white/80 font-normal leading-relaxed mb-10 max-w-xl">
              Lift sagging skin, define your jawline, and stimulate deep collagen production—all without surgery or downtime. HIFU delivers the results of a facelift using precision ultrasound technology.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-charcoal text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-bronze hover:text-white"
            >
              Book Your HIFU Session
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
                alt="Non-surgical facelift with HIFU technology in Nigeria"
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
                The non-surgical <span className="italic">facelift</span> you&apos;ve been looking for.
              </h2>
              <p className="text-warm-gray-400 leading-relaxed font-light mb-8">
                HIFU (High-Intensity Focused Ultrasound) targets the deep foundational layers of your skin—the same layers addressed in a surgical facelift—to trigger a natural lifting and tightening effect that improves over 2–3 months as your body produces fresh collagen.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">High-Intensity Focused Ultrasound</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Focused ultrasound energy penetrates to the SMAS layer (4.5mm deep) to create controlled thermal coagulation points. This triggers an intense wound-healing response, producing new collagen and elastin fibres for long-lasting firmness.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Non-Surgical Jawline & Neck Contouring</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Redefine a softening jawline, lift jowls, and tighten neck laxity without incisions. HIFU is particularly effective for the lower face and submental area, delivering visible structural improvement in a single session.
                  </p>
                </div>
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-2">Collagen Regeneration & Skin Firming</h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                    Beyond immediate tightening, HIFU stimulates a progressive collagen remodelling process. Results continue to improve for up to 6 months post-treatment, with the full lifting effect lasting 12–18 months.
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
              What to know about HIFU skin tightening in Nigeria.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">What is HIFU and how does it work?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                HIFU stands for High-Intensity Focused Ultrasound. It delivers targeted ultrasound energy to the deep structural layers of the skin, causing controlled thermal injury that triggers your body&apos;s natural collagen production. The result is firmer, lifted skin without surgery, needles, or downtime.
              </p>
            </div>
            <div className="border-b border-warm-gray-200 pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">How many HIFU sessions do I need?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                Most clients see significant results after a single session. For optimal results, we recommend 1–2 sessions per year as a maintenance protocol. Your practitioner will design a personalised treatment schedule based on your skin&apos;s condition and goals.
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-charcoal font-medium text-lg mb-2">Is HIFU painful?</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed">
                You may feel warmth and a tingling or prickling sensation during the treatment, particularly along the jawline and forehead. This is temporary and indicates the ultrasound energy is reaching the target depth. Discomfort is well-tolerated by most clients and subsides immediately after the session.
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
            <Link href="/treatments/botox-and-dermal-fillers-lagos" className="group p-8 border border-warm-gray-100 bg-white hover:bg-ivory transition-all duration-300">
              <h3 className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontFamily: "var(--font-display), sans-serif" }}>Botox & Dermal Fillers</h3>
              <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">Targeted injectables for wrinkle reduction, volume restoration, and facial harmony.</p>
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
