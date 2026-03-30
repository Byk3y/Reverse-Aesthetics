import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | Reverse Aesthetics",
  description: "Get in touch with Reverse Aesthetics. Visit our clinic in Lekki, Lagos or reach out for booking inquiries.",
};

export default function ContactPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center max-w-3xl mx-auto">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze mb-5">
            Get In Touch
          </p>
          <h1
            className="text-charcoal mb-6"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Visit our <span className="italic">Lagos Clinic</span>
          </h1>
          <p className="text-warm-gray-400 text-lg leading-relaxed mb-8 font-light">
            Our patient care team is here to assist with bookings, treatment inquiries,
            and specialized care pathways.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/2349159188094"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Chat on WhatsApp
            </a>
            <a href="mailto:reverseaestheticsng@gmail.com" className="btn-outline">
              Send an Email
            </a>
          </div>
        </div>
      </section>

      {/* Contact Details & Map */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Info Cards */}
            <div className="space-y-6">
              <div className="bg-ivory p-8 border border-warm-gray-100">
                <div className="text-bronze mb-5">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h3
                  className="text-xl text-charcoal mb-2"
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  Location
                </h3>
                <p className="text-warm-gray-400 leading-relaxed font-light">
                  Historia Mews,<br />
                  No. 5 Ayo Babatunde Crescent,<br />
                  Oniru, Lekki, Lagos
                </p>
                <a
                  href="https://maps.google.com/?q=Reverse+Aesthetics+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block text-[11px] font-medium text-charcoal uppercase tracking-[0.2em] mt-4"
                >
                  Get Directions
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-bronze" />
                </a>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-ivory p-8 border border-warm-gray-100">
                  <div className="text-bronze mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3
                    className="text-lg text-charcoal mb-2"
                    style={{ fontFamily: "var(--font-display), serif" }}
                  >
                    Hours
                  </h3>
                  <p className="text-warm-gray-400 text-sm leading-relaxed font-light whitespace-pre-line">
                    Mon - Sat: 9:00 AM – 7:00 PM{"\n"}
                    Sun: Closed
                  </p>
                </div>

                <div className="bg-ivory p-8 border border-warm-gray-100">
                  <div className="text-bronze mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.08-7.076-6.975l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <h3
                    className="text-lg text-charcoal mb-2"
                    style={{ fontFamily: "var(--font-display), serif" }}
                  >
                    Contact
                  </h3>
                  <a href="tel:+2349159188094" className="text-warm-gray-400 text-sm hover:text-bronze transition-colors block mb-1 font-light">
                    +234 915 918 8094
                  </a>
                  <a href="mailto:reverseaestheticsng@gmail.com" className="text-warm-gray-400 text-sm hover:text-bronze transition-colors block truncate font-light">
                    reverseaestheticsng@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-warm-gray-50 aspect-square xl:aspect-auto xl:h-full relative overflow-hidden flex items-center justify-center border border-warm-gray-100">
              <div className="text-center p-8">
                <svg className="w-10 h-10 text-warm-gray-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-charcoal font-light text-sm" style={{ fontFamily: "var(--font-display), serif" }}>Interactive Map</p>
                <p className="text-warm-gray-300 text-xs mt-1">Historia Mews, Oniru</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
