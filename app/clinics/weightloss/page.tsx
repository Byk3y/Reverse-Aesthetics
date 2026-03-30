import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";

export const metadata = {
  title: "Medical Weightloss & Body Contouring | Reverse Aesthetics Lagos",
  description: "Doctor-led medical weightloss programs including Semaglutide and body contouring treatments at Reverse Aesthetics Lekki.",
};

export default function WeightlossClinic() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            Medical Weightloss
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-plum mb-6 max-w-4xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Sustainable Weightloss, <span className="italic font-light">Medically Guided</span>.
          </h1>
          <p className="text-plum-muted text-lg max-w-2xl mx-auto mb-10">
            Achieve your exact body goals safely through our specialized physician-led 
            protocols and non-invasive contouring treatments.
          </p>
          <div className="flex justify-center">
            <Link href="/booking" className="btn-gold">
              Consult a Specialist
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy / Intro */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-[4/5] rounded-tl-[80px] rounded-br-[80px] overflow-hidden">
              <Image
                src="/images/generated/weightloss_service.png"
                alt="Medical Weightloss Consultation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border border-gold/20 m-4 rounded-tl-[64px] rounded-br-[64px]" />
            </div>
            
            <div>
              <h2
                className="text-3xl md:text-4xl text-plum mb-6"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                A clinical approach to body confidence.
              </h2>
              <p className="text-plum-muted leading-relaxed mb-6">
                Diet and exercise aren't always enough to reach your goals. At Reverse Aesthetics, 
                we recognize that weight management is a complex medical issue requiring clinical 
                intervention, not just willpower.
              </p>
              <p className="text-plum-muted leading-relaxed mb-10">
                Our programs combine cutting-edge GLP-1 medications (like Semaglutide) with 
                continuous medical monitoring, lifestyle adjustments, and targeted contouring 
                treatments for phenomenal, lasting results.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Comprehensive metabolic assessment",
                  "FDA-approved weightloss medications",
                  "Zero crash diets or extreme restrictions",
                  "Targeted fat reduction and skin tightening"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-plum">
                    <svg className="w-5 h-5 text-gold mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              className="text-3xl md:text-4xl text-plum mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Our Programs & Treatments
            </h2>
            <div className="w-24 h-[1px] bg-gold mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Treatment Card */}
            <div className="bg-white p-8 lg:p-10 rounded-2xl border border-warm-gray-100 shadow-sm group hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl text-plum mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Semaglutide Program
              </h3>
              <p className="text-plum-muted mb-6 leading-relaxed">
                A weekly injection that mimics a natural hormone to regulate appetite and blood sugar. 
                Our flagship medical weightloss protocol designed for significant, sustainable fat loss.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-xs uppercase tracking-wider bg-purple-50 text-purple-800 px-3 py-1 rounded-full">Medical Protocol</span>
                <span className="text-xs uppercase tracking-wider bg-gold/10 text-gold-dark px-3 py-1 rounded-full">Injectable</span>
              </div>
              <div className="flex items-center justify-between border-t border-warm-gray-100 pt-6">
                <span className="text-plum font-semibold">From ₦350,000 / month</span>
                <Link href="/booking" className="text-gold font-medium group-hover:text-purple-600 transition-colors uppercase tracking-wider text-sm flex items-center">
                  Book Consult
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Treatment Card */}
            <div className="bg-white p-8 lg:p-10 rounded-2xl border border-warm-gray-100 shadow-sm group hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl text-plum mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Body Contouring (Cavitation/RF)
              </h3>
              <p className="text-plum-muted mb-6 leading-relaxed">
                Non-invasive treatments to melt stubborn fat pockets and tighten loose skin. 
                Perfect for post-weightloss firming or targeting specific problem areas.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-xs uppercase tracking-wider bg-purple-50 text-purple-800 px-3 py-1 rounded-full">Body Sculpting</span>
                <span className="text-xs uppercase tracking-wider bg-gold/10 text-gold-dark px-3 py-1 rounded-full">Non-Invasive</span>
              </div>
              <div className="flex items-center justify-between border-t border-warm-gray-100 pt-6">
                <span className="text-plum font-semibold">From ₦80,000 / session</span>
                <Link href="/booking" className="text-gold font-medium group-hover:text-purple-600 transition-colors uppercase tracking-wider text-sm flex items-center">
                  Book Consult
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section className="py-24 bg-plum text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-800/20 rounded-full blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 text-center max-w-3xl">
          <svg className="w-12 h-12 text-gold mx-auto mb-6 opacity-80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.714-4.605-6.273-7.017-6.273v-2.336c0-.527.473-1 1-1h13.078c.527 0 1 .473 1 1v2.336c-2.412 0-7.017.559-7.017 6.273v7.391zM5 4h14v-2.062c0-.527-.473-1-1-1h-12c-.527 0-1 .473-1 1v2.062z" />
          </svg>
          <h2
            className="text-3xl md:text-4xl mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            "Weightloss is not a test of character, it is medicine. We treat the root cause."
          </h2>
          <p className="text-gold tracking-widest uppercase text-sm font-semibold">
            — Dr. Ral Abana
          </p>
        </div>
      </section>

      <CTABanner />

      <Footer />
    </main>
  );
}
