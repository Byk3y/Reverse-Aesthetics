import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTABanner from "../components/CTABanner";

export const metadata: Metadata = {
  title: "Our Clinics | Reverse Aesthetics",
  description: "Explore our four specialist clinics: Aesthetics & Dermatology, Weight Loss, Dental Aesthetics, and Hair Restoration. World-class care in Lagos & Abuja.",
};

const clinics = [
  {
    title: "Aesthetics & Dermatology",
    tagline: "Your skin, perfected.",
    description:
      "Our flagship clinic specializes in advanced skincare, injectables, skin tightening, and glow treatments. From acne management to anti-aging protocols, every treatment is tailored to your unique complexion and goals.",
    image: "/images/generated/aesthetics_service.png",
    treatments: [
      "Botox & Dermal Fillers",
      "HIFU Skin Tightening",
      "Thread Lifts",
      "Laser Skin Resurfacing",
      "Chemical Peels",
      "IV Glow Therapy",
      "Acne & Scar Treatment",
      "PRP Facial Rejuvenation",
    ],
  },
  {
    title: "Weight Loss",
    tagline: "Transform your body, sustainably.",
    description:
      "Our medical weight loss programs combine prescription support, nutritional guidance, body contouring, and ongoing supervision for results that last. Every program is physician-led and tailored to your body.",
    image: "/images/generated/weightloss_service.png",
    treatments: [
      "Medical Weight Programs",
      "Injection Support (Saxenda, etc.)",
      "Body Contouring",
      "Fat Dissolving Injections",
      "Nutritional Counseling",
      "Wellness Plans",
    ],
  },
  {
    title: "Dental Aesthetics",
    tagline: "Smile with absolute confidence.",
    description:
      "Our dental aesthetics clinic delivers smile makeovers that look completely natural. From whitening to full veneer transformations, we combine artistry with dental precision.",
    image: "/images/generated/dental_smile.png",
    treatments: [
      "Teeth Whitening",
      "Porcelain Veneers",
      "Composite Bonding",
      "Smile Design",
      "Gum Contouring",
      "Invisalign Consultations",
    ],
  },
  {
    title: "Hair Restoration",
    tagline: "Reclaim your crown.",
    description:
      "Surgical and non-surgical solutions for hair loss. Whether it's FUE transplant, PRP therapy, or scalp regeneration, our specialists help you regain natural, full hair.",
    image: "/images/generated/hair_restoration.png",
    treatments: [
      "FUE Hair Transplant",
      "Beard Transplant",
      "Eyebrow Restoration",
      "PRP Hair Therapy",
      "Scalp Micropigmentation",
      "GFC Treatment",
    ],
  },
];

export default function ClinicsPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="pt-28 lg:pt-32 pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            Our Clinics
          </p>
          <h1
            className="text-plum mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Four clinics. <span className="italic">One standard</span> of excellence.
          </h1>
          <p className="text-plum-muted text-lg leading-relaxed">
            Each clinic is led by accredited specialists, using internationally
            approved products and techniques to deliver safe, natural results.
          </p>
        </div>
      </section>

      {/* Clinics */}
      <section>
        {clinics.map((clinic, index) => (
          <div
            key={clinic.title}
            className={`section-padding ${
              index % 2 === 0 ? "bg-white" : "bg-ivory"
            }`}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
              <div
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 !== 0 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ${index % 2 !== 0 ? "lg:[direction:ltr]" : ""}`}>
                  <Image
                    src={clinic.image}
                    alt={clinic.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className={index % 2 !== 0 ? "lg:[direction:ltr]" : ""}>
                  <hr className="divider-gold mb-6" />
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-2">
                    {clinic.tagline}
                  </p>
                  <h2
                    className="text-plum text-3xl mb-4"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {clinic.title}
                  </h2>
                  <p className="text-plum-muted leading-relaxed mb-6">
                    {clinic.description}
                  </p>

                  {/* Treatment Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {clinic.treatments.map((treatment) => (
                      <div
                        key={treatment}
                        className="flex items-center gap-2 text-sm text-plum"
                      >
                        <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                        {treatment}
                      </div>
                    ))}
                  </div>

                  <Link href="/booking" className="btn-gold">
                    Book a Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
