import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";

export const metadata = {
  title: "Dental Aesthetics | Reverse Aesthetics Lagos",
  description: "Premium dental aesthetics including teeth whitening, scaling, scaling and polishing at Reverse Aesthetics Lekki.",
};

export default function DentalClinic() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-28 lg:pt-36 pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze mb-5">
            Dental Aesthetics
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mb-6 max-w-4xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Design your <span className="italic font-light">Signature Smile</span>.
          </h1>
          <p className="text-warm-gray-400 font-light text-lg max-w-2xl mx-auto mb-10">
            A beautiful smile is the ultimate accessory. Our dental experts focus on
            aesthetic enhancements that brighten and perfect your teeth.
          </p>
          <div className="flex justify-center">
            <Link href="/booking" className="btn-gold">
              Consult a Dentist
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy / Intro */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <div className="order-2 lg:order-1">
              <h2
                className="text-3xl md:text-4xl font-light text-charcoal mb-6"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Where oral health meets high aesthetics.
              </h2>
              <p className="text-warm-gray-400 font-light leading-relaxed mb-6">
                Your smile is often the first thing people notice. Our dental clinic doesn&apos;t just treat teeth;
                we design smiles that complement your facial features and boost your confidence.
              </p>
              <p className="text-warm-gray-400 font-light leading-relaxed mb-10">
                From professional hygiene routines to advanced whitening systems, we provide gentle,
                premium dental care in a luxury environment designed to alleviate any dental anxiety.
              </p>

              <ul className="space-y-4">
                {[
                  "Painless scaling and polishing",
                  "Enamel-safe professional whitening",
                  "Smile design consultation",
                  "Luxury, spa-like dental environment"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-charcoal">
                    <svg className="w-5 h-5 text-bronze mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden order-1 lg:order-2 rounded-sm">
              <Image
                src="/images/generated/dental_smile.avif"
                alt="Dental Aesthetics"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Treatments List */}
      <section className="py-24 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-light text-charcoal mb-4"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Our Treatments
            </h2>
            <div className="w-24 h-[1px] bg-bronze mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

            {/* Treatment Card */}
            <div className="bg-white p-8 lg:p-10 rounded-sm border border-warm-gray-100 group transition-all duration-300">
              <h3 className="text-2xl font-light text-charcoal mb-4" style={{ fontFamily: "var(--font-display), serif" }}>
                Laser Teeth Whitening
              </h3>
              <p className="text-warm-gray-400 font-light mb-6 leading-relaxed">
                Lift stains up to 8 shades lighter in a single visit. We use professional-grade,
                enamel-safe bleaching agents activated by laser technology for immediate, brilliant results with minimal sensitivity.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] bg-ivory text-charcoal px-3 py-1">Cosmetic</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] bg-warm-gray-50 text-bronze px-3 py-1">1 Hour</span>
              </div>
              <div className="flex items-center justify-between border-t border-warm-gray-100 pt-6">
                <span className="text-charcoal font-semibold">From ₦80,000</span>
                <Link href="/treatments/dental-aesthetics-lagos" className="text-bronze font-medium hover:text-bronze transition-colors uppercase tracking-wider text-sm flex items-center">
                  Learn More
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Treatment Card */}
            <div className="bg-white p-8 lg:p-10 rounded-sm border border-warm-gray-100 group transition-all duration-300">
              <h3 className="text-2xl font-light text-charcoal mb-4" style={{ fontFamily: "var(--font-display), serif" }}>
                Scaling & Polishing
              </h3>
              <p className="text-warm-gray-400 font-light mb-6 leading-relaxed">
                The foundation of a healthy smile. Gentle removal of plaque and tartar buildup,
                followed by a high-gloss polish to remove superficial surface stains and freshen breath.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] bg-ivory text-charcoal px-3 py-1">Hygiene</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] bg-warm-gray-50 text-bronze px-3 py-1">Routine</span>
              </div>
              <div className="flex items-center justify-between border-t border-warm-gray-100 pt-6">
                <span className="text-charcoal font-semibold">From ₦35,000</span>
                <Link href="/booking" className="text-bronze font-medium hover:text-bronze transition-colors uppercase tracking-wider text-sm flex items-center">
                  Book Consult
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTABanner />

      <Footer />
    </main>
  );
}
