import Hero from "./components/Hero";
import Header from "./components/Header";
import TrustHighlights from "./components/TrustHighlights";
import About from "./components/About";
import ServiceCards from "./components/ServiceCards";
import BeforeAfterGallery from "./components/BeforeAfterGallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

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
