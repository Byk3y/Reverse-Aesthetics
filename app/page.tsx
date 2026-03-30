import Hero from "./components/Hero";
import Header from "./components/Header";
import TrustHighlights from "./components/TrustHighlights";
import ServiceCards from "./components/ServiceCards";
import Testimonials from "./components/Testimonials";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustHighlights />
      <ServiceCards />
      <Testimonials />
      <CTABanner />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
