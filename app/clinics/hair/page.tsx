import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";

export const metadata = {
  title: "Hair Restoration | Reverse Aesthetics Lagos",
  description: "Advanced PRP and hair restoration treatments to combat hair loss and stimulate growth at Reverse Aesthetics.",
};

export default function HairClinic() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-28 lg:pt-36 pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze mb-5">
            Hair & Scalp Clinic
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-charcoal mb-6 max-w-4xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Revitalize your <span className="italic font-light">Hair Growth</span>.
          </h1>
          <p className="text-warm-gray-400 font-light text-lg max-w-2xl mx-auto mb-10">
            Backed by science, our intensive non-surgical hair restoration
            protocols stimulate natural growth and restore density.
          </p>
          <div className="flex justify-center">
            <Link href="/booking" className="btn-gold">
              Book Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy / Intro */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="/images/generated/hair_restoration.avif"
                alt="Hair Restoration Therapy"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2
                className="text-3xl md:text-4xl font-semibold text-charcoal mb-6"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Harnessing your body&apos;s healing power.
              </h2>
              <p className="text-warm-gray-400 font-normal leading-relaxed mb-6">
                Hair loss can occur due to genetics, stress, hormones, or trauma. At Reverse,
                we address the root cause and utilize the latest in regenerative medicine to
                awaken dormant hair follicles.
              </p>
              <p className="text-warm-gray-400 font-normal leading-relaxed mb-10">
                Our signature PRP (Platelet-Rich Plasma) therapy uses the growth factors found
                naturally in your own blood to significantly boost hair thickness and combat thinning.
              </p>

              <ul className="space-y-4">
                {[
                  "In-depth scalp assessment",
                  "Regenerative PRP therapy",
                  "Targeted nutrient infusions",
                  "Prescription topicals and supplements"
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
          </div>
        </div>
      </section>

      {/* Treatments List */}
      <section className="py-24 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-semibold text-charcoal mb-4"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Our Protocols
            </h2>
            <div className="w-24 h-[1px] bg-bronze mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">

            {/* Treatment Card */}
            <div className="bg-white p-8 lg:p-10 rounded-sm border border-warm-gray-100 group transition-all duration-300 col-span-1 md:col-span-2">
              <h3 className="text-2xl font-semibold text-charcoal mb-4" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                PRP Hair Restoration (Platelet-Rich Plasma)
              </h3>
              <p className="text-warm-gray-400 font-light mb-6 leading-relaxed">
                A highly effective, non-surgical procedure where a small amount of your blood is drawn, spun in a centrifuge to isolate the platelet-rich plasma, and precisely injected into the scalp. These concentrated growth factors stimulate inactive hair follicles into an active growth phase. We recommend a series of 3-6 sessions for optimal results.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] bg-ivory text-charcoal px-3 py-1">Regenerative</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] bg-warm-gray-50 text-bronze px-3 py-1">Injectable</span>
              </div>
              <div className="flex items-center justify-between border-t border-warm-gray-100 pt-6">
                <span className="text-charcoal font-semibold">From ₦120,000 / session</span>
                <Link href="/treatments/hair-transplant-nigeria" className="text-bronze font-medium hover:text-bronze transition-colors uppercase tracking-wider text-sm flex items-center">
                  Learn More
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
