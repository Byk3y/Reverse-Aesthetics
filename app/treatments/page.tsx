import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTABanner from "../components/CTABanner";

export const metadata: Metadata = {
  title: "Our Treatments | Reverse Aesthetics Lagos & Nigeria",
  description: "Explore all aesthetic treatments at Reverse Aesthetics — Botox, HIFU, laser resurfacing, dental aesthetics, IV therapy, hair transplant, weight loss, and acne solutions in Lagos.",
  keywords: ["Aesthetic Treatments Lagos", "Cosmetic Procedures Nigeria", "Skin Treatments Lekki", "Beauty Clinic Lagos", "Medical Aesthetics Nigeria"],
  alternates: {
    canonical: "https://reverseaesthetic.com/treatments",
  },
  openGraph: {
    title: "Our Treatments | Reverse Aesthetics Lagos & Nigeria",
    description: "Explore all aesthetic treatments at Reverse Aesthetics in Lagos and Nigeria.",
    url: "https://reverseaesthetic.com/treatments",
  }
};

const treatmentCategories = [
  {
    category: "Aesthetics & Dermatology",
    treatments: [
      {
        name: "Botox & Dermal Fillers",
        description: "Targeted injectables for wrinkle reduction, volume restoration, and facial harmony.",
        href: "/treatments/botox-and-dermal-fillers-lagos",
      },
      {
        name: "HIFU Skin Tightening",
        description: "Non-surgical facelift using focused ultrasound for lifting and collagen regeneration.",
        href: "/treatments/hifu-skin-tightening-nigeria",
      },
      {
        name: "Laser Skin Resurfacing",
        description: "Precision lasers for pigmentation correction, acne scars, and skin renewal.",
        href: "/treatments/laser-skin-resurfacing-lagos",
      },
      {
        name: "IV Glow Therapy",
        description: "Medical-grade vitamin infusions for skin radiance, immunity, and anti-aging.",
        href: "/treatments/iv-glow-therapy-lagos",
      },
      {
        name: "Acne & Scar Treatment",
        description: "Medical dermatology for active acne, post-acne marks, and deep scarring.",
        href: "/treatments/acne-scar-treatment-lagos",
      },
    ],
  },
  {
    category: "Weight Loss",
    treatments: [
      {
        name: "Medical Weight Loss & Body Contouring",
        description: "Physician-guided weight loss programmes, injection support, and body sculpting.",
        href: "/treatments/medical-weight-loss-lagos",
      },
    ],
  },
  {
    category: "Dental Aesthetics",
    treatments: [
      {
        name: "Teeth Whitening & Veneers",
        description: "Professional whitening, porcelain veneers, and complete smile design.",
        href: "/treatments/dental-aesthetics-lagos",
      },
    ],
  },
  {
    category: "Hair Restoration",
    treatments: [
      {
        name: "Hair Transplant & Restoration",
        description: "FUE/DHI transplants, PRP therapy, and non-surgical hair regeneration.",
        href: "/treatments/hair-transplant-nigeria",
      },
    ],
  },
];

export default function TreatmentsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Aesthetic Treatments at Reverse Aesthetics",
    "description": "Complete list of aesthetic, dental, hair, and wellness treatments available at Reverse Aesthetics in Lagos, Nigeria.",
    "numberOfItems": 8,
    "itemListElement": treatmentCategories.flatMap((cat) =>
      cat.treatments.map((t, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": t.name,
        "url": `https://reverseaesthetic.com${t.href}`,
      }))
    ),
  };

  return (
    <main>
      <Header />

      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-16 bg-ivory">
        <div className="mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze mb-5">
            Treatments
          </p>
          <h1
            className="text-charcoal font-light mb-6"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Our <span className="italic">Treatments</span>
          </h1>
          <p className="text-warm-gray-400 font-light text-lg leading-relaxed">
            Comprehensive aesthetic care across four specialist disciplines. Every treatment is medically-led, individually tailored, and designed to deliver natural, lasting results.
          </p>
        </div>
      </section>

      {/* Treatment Categories */}
      {treatmentCategories.map((cat) => (
        <section key={cat.category} className="py-16 lg:py-20 bg-white border-b border-warm-gray-100 last:border-b-0">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2
              className="text-2xl lg:text-3xl text-charcoal font-light mb-10"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              {cat.category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.treatments.map((treatment) => (
                <Link
                  key={treatment.href}
                  href={treatment.href}
                  className="group p-8 border border-warm-gray-100 bg-ivory/50 hover:bg-ivory transition-all duration-300"
                >
                  <h3
                    className="text-xl text-charcoal font-light mb-3 group-hover:text-bronze transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display), serif" }}
                  >
                    {treatment.name}
                  </h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed mb-4">
                    {treatment.description}
                  </p>
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                    Learn More &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTABanner />
      <Footer />
    </main>
  );
}
