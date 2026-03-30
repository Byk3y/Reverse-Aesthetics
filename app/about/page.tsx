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
      <section className="pt-28 lg:pt-36 pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze mb-5">
              About Reverse Aesthetics
            </p>
            <h1
              className="text-charcoal mb-6"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              <span className="italic">Redefining</span> beauty standards in Nigeria
            </h1>
            <p className="text-warm-gray-400 text-lg leading-relaxed font-light">
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
            <div className="relative aspect-[4/5] overflow-hidden">
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
                className="text-charcoal mb-2"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Dr. Ral Abana
              </h2>
              <p className="text-bronze font-medium text-[11px] uppercase tracking-[0.2em] mb-6">
                Founder & Lead Physician
              </p>
              <div className="space-y-4 text-warm-gray-500 leading-relaxed font-light">
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

              {/* Credentials — editorial stats */}
              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { label: "Years Experience", value: "10+" },
                  { label: "Patients Treated", value: "5,000+" },
                  { label: "GMC Registered", value: "UK" },
                  { label: "Clinics", value: "Lagos & Abuja" },
                ].map((stat) => (
                  <div key={stat.label} className="border-t border-warm-gray-100 pt-4">
                    <p
                      className="text-3xl text-bronze font-light mb-1"
                      style={{ fontFamily: "var(--font-display), serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[10px] text-warm-gray-400 uppercase tracking-[0.25em]">
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
            <hr className="divider-gold mx-auto mb-7" />
            <h2
              className="text-charcoal"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-warm-gray-100">
            {[
              {
                number: "01",
                title: "Safety First",
                description:
                  "Every treatment meets international medical standards. We never compromise on safety, using only approved products and techniques.",
              },
              {
                number: "02",
                title: "Natural Results",
                description:
                  "We enhance, never overdo. Our approach prioritizes subtlety and authenticity — you should always look like yourself, only better.",
              },
              {
                number: "03",
                title: "Patient-Centered",
                description:
                  "Your goals drive everything. We listen deeply, consult thoroughly, and create personalized treatment plans for every patient.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white p-10 lg:p-12"
              >
                <span className="text-[11px] font-medium tracking-[0.3em] text-bronze mb-5 block">
                  {value.number}
                </span>
                <h3
                  className="text-xl text-charcoal mb-3"
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  {value.title}
                </h3>
                <p className="text-warm-gray-400 text-sm leading-relaxed font-light">
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
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              src="/images/about/clinic.png"
              alt="Reverse Aesthetics clinic interior in Lagos"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <p className="text-center mt-5 text-[10px] text-warm-gray-400 uppercase tracking-[0.25em]">
            Our Lagos Clinic — Historia Mews, Oniru, Lekki
          </p>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
