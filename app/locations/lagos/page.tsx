import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTABanner from "../../components/CTABanner";
import TrustHighlights from "../../components/TrustHighlights";

export const metadata: Metadata = {
  title: "Best Aesthetic Clinic in Lagos | Reverse Aesthetics Lekki",
  description: "Reverse Aesthetics is Lagos's leading medical aesthetic clinic in Oniru, Lekki. Offering Botox, dermal fillers, medical weight loss, and hair transplants.",
  keywords: ["Aesthetic Clinic in Lagos", "Best dermatologist in Lekki", "Skin clinic Victoria Island", "Medical aesthetics Oniru", "Botox Lagos", "Hair transplant Nigeria clinic"],
  alternates: {
    canonical: "https://reverseaesthetic.com/locations/lagos",
  },
  openGraph: {
    title: "Best Aesthetic Clinic in Lagos | Reverse Aesthetics Lekki",
    description: "Reverse Aesthetics is Lagos's leading medical aesthetic clinic, focusing on natural transformations.",
    url: "https://reverseaesthetic.com/locations/lagos",
  }
};

export default function LagosLocationPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Reverse Aesthetics - Lagos Clinic",
    "image": "https://reverseaesthetic.com/images/generated/clinic_interior.avif",
    "url": "https://reverseaesthetic.com/locations/lagos",
    "telephone": "09159188094",
    "email": "reverseaestheticsng@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Historia Mews, No. 5 Ayo Babatunde Crescent, Oniru",
      "addressLocality": "Lekki",
      "addressRegion": "Lagos",
      "addressCountry": "NG"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ]
  };

  return (
    <main>
      <Header />
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* SEO Optimized Local Hero */}
      <section className="pt-28 lg:pt-40 pb-16 lg:pb-24 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/generated/clinic_interior.avif"
            alt="Reverse Aesthetics Clinic in Lagos, Lekki"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bronze mb-5 block">
              Flagship Clinic
            </span>
            <h1
              className="text-5xl lg:text-[4rem] font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Premium Aesthetic Care in <span className="italic">Lagos</span>
            </h1>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-10 max-w-xl">
              Located in the heart of Oniru, Lekki. We serve patients from across Victoria Island, Ikoyi, and the mainland with world-class, medical-led skin, body, and hair treatments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-charcoal text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-bronze hover:text-white"
              >
                Book
              </Link>
              <a
                href="https://maps.google.com/?q=Reverse+Aesthetics+Historia+Mews,+No.+5+Ayo+Babatunde+Crescent,+Oniru,+Lekki,+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 border border-white/30 text-white text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white/10"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights Component */}
      <TrustHighlights />

      {/* Location Details Section */}
      <section className="py-20 lg:py-32 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Map Placeholder or Image */}
            <div className="relative aspect-square overflow-hidden bg-warm-gray-200">
               <Image
                src="/images/generated/treatment_room.avif"
                alt="Treatment room in Reverse Aesthetics Lagos"
                fill
                className="object-cover"
              />
            </div>

            {/* Visit Us Information */}
            <div>
              <h2
                className="text-charcoal text-4xl mb-6 font-light"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Visit us in <span className="italic">Lekki</span>.
              </h2>
              <p className="text-warm-gray-400 leading-relaxed font-light mb-12 max-w-lg">
                Our Lagos facility is designed to provide a discreet, luxurious, and highly sterile medical environment. Whether you are visiting from Ikoyi, Victoria Island, or mainland Lagos, our clinic offers privacy and comfort.
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-3 text-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Address
                  </h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed pl-8">
                    Historia Mews,<br />
                    No. 5 Ayo Babatunde Crescent,<br />
                    Oniru, Lekki, Lagos
                  </p>
                </div>
                
                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-3 text-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Opening Hours
                  </h3>
                  <ul className="text-warm-gray-400 font-light text-sm leading-relaxed pl-8 space-y-2">
                    <li className="flex justify-between max-w-xs"><span>Monday - Saturday:</span> <span>9:00 AM - 7:00 PM</span></li>
                    <li className="flex justify-between max-w-xs text-charcoal/50"><span>Sunday:</span> <span>Closed</span></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-charcoal font-medium text-lg mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-3 text-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    Contact
                  </h3>
                  <p className="text-warm-gray-400 font-light text-sm leading-relaxed pl-8">
                    0915 918 8094<br />
                    reverseaestheticsng@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Targeted Services Snippet */}
      <section className="py-20 bg-white border-t border-warm-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl text-charcoal text-center mb-12 font-light" style={{ fontFamily: "var(--font-display), serif" }}>
            Top Treatments at our <span className="italic">Lagos Clinic</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
             <Link href="/treatments/botox-and-dermal-fillers-lagos" className="group p-8 border border-warm-gray-100 bg-ivory/50 transition-colors hover:bg-bronze/5">
                <h3 className="text-charcoal font-medium mb-3 group-hover:text-bronze transition-colors">Botox & Fillers</h3>
                <p className="text-warm-gray-400 font-light text-sm">Targeted injectables for balanced facial harmony.</p>
             </Link>
             <Link href="/treatments/medical-weight-loss-lagos" className="group p-8 border border-warm-gray-100 bg-ivory/50 transition-colors hover:bg-bronze/5">
                <h3 className="text-charcoal font-medium mb-3 group-hover:text-bronze transition-colors">Weight Loss</h3>
                <p className="text-warm-gray-400 font-light text-sm">Medical-led programs to reduce fat and sculpt the body.</p>
             </Link>
             <Link href="/treatments/hair-transplant-nigeria" className="group p-8 border border-warm-gray-100 bg-ivory/50 transition-colors hover:bg-bronze/5">
                <h3 className="text-charcoal font-medium mb-3 group-hover:text-bronze transition-colors">Hair Restoration</h3>
                <p className="text-warm-gray-400 font-light text-sm">FUE transplants and regeneration treatments.</p>
             </Link>
             <Link href="/treatments/dental-aesthetics-lagos" className="group p-8 border border-warm-gray-100 bg-ivory/50 transition-colors hover:bg-bronze/5">
                <h3 className="text-charcoal font-medium mb-3 group-hover:text-bronze transition-colors">Dental Aesthetics</h3>
                <p className="text-warm-gray-400 font-light text-sm">Veneers, teeth whitening, and complete smile design.</p>
             </Link>
             <Link href="/treatments/hifu-skin-tightening-nigeria" className="group p-8 border border-warm-gray-100 bg-ivory/50 transition-colors hover:bg-bronze/5">
                <h3 className="text-charcoal font-medium mb-3 group-hover:text-bronze transition-colors">HIFU Skin Tightening</h3>
                <p className="text-warm-gray-400 font-light text-sm">Non-surgical facelift and skin firming.</p>
             </Link>
             <Link href="/treatments/laser-skin-resurfacing-lagos" className="group p-8 border border-warm-gray-100 bg-ivory/50 transition-colors hover:bg-bronze/5">
                <h3 className="text-charcoal font-medium mb-3 group-hover:text-bronze transition-colors">Laser Resurfacing</h3>
                <p className="text-warm-gray-400 font-light text-sm">Pigmentation correction and skin renewal.</p>
             </Link>
             <Link href="/treatments/iv-glow-therapy-lagos" className="group p-8 border border-warm-gray-100 bg-ivory/50 transition-colors hover:bg-bronze/5">
                <h3 className="text-charcoal font-medium mb-3 group-hover:text-bronze transition-colors">IV Glow Therapy</h3>
                <p className="text-warm-gray-400 font-light text-sm">Vitamin drips for radiance and immunity.</p>
             </Link>
             <Link href="/treatments/acne-scar-treatment-lagos" className="group p-8 border border-warm-gray-100 bg-ivory/50 transition-colors hover:bg-bronze/5">
                <h3 className="text-charcoal font-medium mb-3 group-hover:text-bronze transition-colors">Acne & Scar Treatment</h3>
                <p className="text-warm-gray-400 font-light text-sm">Medical-grade acne and scar solutions.</p>
             </Link>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
