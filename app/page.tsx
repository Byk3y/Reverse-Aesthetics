import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import Header from "./components/Header";
import TrustHighlights from "./components/TrustHighlights";
import ServiceCards from "./components/ServiceCards";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

const About = dynamic(() => import("./components/About"), { ssr: true });
const BeforeAfterGallery = dynamic(() => import("./components/BeforeAfterGallery"), { ssr: true });
const Testimonials = dynamic(() => import("./components/Testimonials"), { ssr: true });
const FAQ = dynamic(() => import("./components/FAQ"), { ssr: true });
const CTABanner = dynamic(() => import("./components/CTABanner"), { ssr: true });

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustHighlights />
      <About compact />
      <ServiceCards />
      <BeforeAfterGallery compact />
      <Testimonials />
      <FAQ compact />
      <CTABanner />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
