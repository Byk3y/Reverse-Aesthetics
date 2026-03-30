import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";

export const metadata = {
  title: "Wellness & IV Therapy | Reverse Aesthetics Lagos",
  description: "Boost your immunity, energy, and skin glow with premium IV Vitamin Drips and NAD+ therapy at Reverse Aesthetics Lekki.",
};

export default function WellnessClinic() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-28 lg:pt-36 pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze mb-5">
            Wellness & IV Therapy
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mb-6 max-w-4xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Beauty begins from <span className="italic font-light">Within</span>.
          </h1>
          <p className="text-warm-gray-400 font-light text-lg max-w-2xl mx-auto mb-10">
            Rapidly replenish nutrients, boost immunity, and enhance cellular aging with our premium bespoke IV drips.
          </p>
          <div className="flex justify-center">
            <Link href="/booking" className="btn-gold">
              Book a Drip
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
                100% absorption, immediate vitality.
              </h2>
              <p className="text-warm-gray-400 font-light leading-relaxed mb-6">
                When you take oral vitamins, your body only absorbs about 20-30%. Intravenous (IV)
                therapy bypasses the digestive system entirely, delivering essential vitamins,
                minerals, and antioxidants directly into your bloodstream for maximum absorption.
              </p>
              <p className="text-warm-gray-400 font-light leading-relaxed mb-10">
                Whether you need a post-travel immunity boost, a skin-brightening glutathione push,
                or advanced NAD+ anti-aging therapy, our customized drips provide the ultimate wellness upgrade.
              </p>

              <ul className="space-y-4">
                {[
                  "Custom-formulated vitamin blends",
                  "Administered by licensed nurses",
                  "Relaxing, luxury lounge experience",
                  "Immediate hydration and energy boost"
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
                src="/images/generated/hero_mobile.png"
                alt="IV Therapy Lounge"
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
              Our Drip Menu
            </h2>
            <div className="w-24 h-[1px] bg-bronze mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

            {/* Treatment Card */}
            <div className="bg-white p-8 lg:p-10 rounded-sm border border-warm-gray-100 group transition-all duration-300">
              <h3 className="text-2xl font-light text-charcoal mb-4" style={{ fontFamily: "var(--font-display), serif" }}>
                The Reverse Signature Glow
              </h3>
              <p className="text-warm-gray-400 font-light mb-6 leading-relaxed">
                Our most popular aesthetic drip. Packed with high-dose Vitamin C and Glutathione
                to detoxify the liver, inhibit melanin production, and give your skin a luminous, even tone.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] bg-ivory text-charcoal px-3 py-1">Skin Brightening</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] bg-warm-gray-50 text-bronze px-3 py-1">Detox</span>
              </div>
              <div className="flex items-center justify-between border-t border-warm-gray-100 pt-6">
                <span className="text-charcoal font-semibold">From ₦75,000</span>
                <Link href="/booking" className="text-bronze font-medium hover:text-bronze transition-colors uppercase tracking-wider text-sm flex items-center">
                  Book Session
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Treatment Card */}
            <div className="bg-white p-8 lg:p-10 rounded-sm border border-warm-gray-100 group transition-all duration-300">
              <h3 className="text-2xl font-light text-charcoal mb-4" style={{ fontFamily: "var(--font-display), serif" }}>
                NAD+ Anti-Aging Infusion
              </h3>
              <p className="text-warm-gray-400 font-light mb-6 leading-relaxed">
                The &ldquo;fountain of youth&rdquo; coenzyme. NAD+ repairs DNA, restores neurological function,
                improves mental clarity, and combats chronic fatigue at the cellular level.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] bg-ivory text-charcoal px-3 py-1">Anti-Aging</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] bg-warm-gray-50 text-bronze px-3 py-1">Cellular Health</span>
              </div>
              <div className="flex items-center justify-between border-t border-warm-gray-100 pt-6">
                <span className="text-charcoal font-semibold">From ₦150,000</span>
                <Link href="/booking" className="text-bronze font-medium hover:text-bronze transition-colors uppercase tracking-wider text-sm flex items-center">
                  Book Session
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
