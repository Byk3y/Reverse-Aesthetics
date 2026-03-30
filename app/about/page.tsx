import Image from "next/image";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTABanner from "../components/CTABanner";

export const metadata: Metadata = {
  title: "About Us | Reverse Aesthetics",
  description: "Meet the team behind Nigeria's leading aesthetic clinic. Led by Dr. Ral Abana, a GMC (UK) registered physician with nearly a decade of specialty experience.",
};

export default function AboutPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="pt-28 lg:pt-32 pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              About Reverse Aesthetics
            </p>
            <h1
              className="text-plum mb-6"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              <span className="italic">Redefining</span> beauty standards in Nigeria
            </h1>
            <p className="text-plum-muted text-lg leading-relaxed">
              We believe in enhancing what&apos;s already beautiful — delivering
              natural, medically safe results that let you feel like the best
              version of yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/generated/founder_portrait.png"
                alt="Dr. Ral Abana - Founder of Reverse Aesthetics"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div>
              <hr className="divider-gold mb-6" />
              <h2
                className="text-plum mb-2"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Dr. Ral Abana
              </h2>
              <p className="text-gold font-medium text-sm uppercase tracking-wider mb-6">
                Founder & Lead Physician
              </p>
              <div className="space-y-4 text-plum-muted leading-relaxed">
                <p>
                  Dr. Ral Abana is a GMC (UK) registered aesthetic medical physician
                  with nearly a decade of specialty experience in aesthetic medicine.
                  After extensive training in the UK and across globally recognized
                  aesthetic institutions, she returned to Nigeria with a mission: to
                  bring internationally standardized aesthetic care to West Africa.
                </p>
                <p>
                  Her philosophy is rooted in subtlety — treatments should enhance,
                  not transform beyond recognition. Every procedure at Reverse
                  Aesthetics is designed to look like you, only refreshed and refined.
                </p>
                <p>
                  Under her leadership, Reverse Aesthetics has become one of
                  Nigeria&apos;s most trusted names in medical aesthetics, dermatology,
                  dental care, weight management, and hair restoration.
                </p>
              </div>

              {/* Credentials */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Years Experience", value: "10+" },
                  { label: "Patients Treated", value: "5,000+" },
                  { label: "GMC Registered", value: "UK" },
                  { label: "Clinics", value: "Lagos & Abuja" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-ivory rounded-xl p-4 text-center"
                  >
                    <p
                      className="text-2xl text-purple-600 font-semibold mb-1"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-plum-muted uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-14">
            <hr className="divider-gold mx-auto mb-6" />
            <h2
              className="text-plum"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Safety First",
                description:
                  "Every treatment meets international medical standards. We never compromise on safety, using only approved products and techniques.",
                icon: "🛡️",
              },
              {
                title: "Natural Results",
                description:
                  "We enhance, never overdo. Our approach prioritizes subtlety and authenticity — you should always look like yourself, only better.",
                icon: "✨",
              },
              {
                title: "Patient-Centered",
                description:
                  "Your goals drive everything. We listen deeply, consult thoroughly, and create personalized treatment plans for every patient.",
                icon: "💜",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-8 text-center border border-warm-gray-100 hover:border-gold/30 hover:shadow-lg transition-all duration-400"
              >
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3
                  className="text-lg text-plum mb-3"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {value.title}
                </h3>
                <p className="text-plum-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Image */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/about/clinic.png"
              alt="Reverse Aesthetics clinic interior in Lagos"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <p className="text-center mt-4 text-xs text-plum-muted uppercase tracking-wider">
            Our Lagos Clinic — Historia Mews, Oniru, Lekki
          </p>
        </div>
      </section>

      <CTABanner variant="purple" />
      <Footer />
    </main>
  );
}
