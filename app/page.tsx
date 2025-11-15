import Hero from "./components/Hero";
import Header from "./components/Header";
import BookAppointmentCard from "./components/BookAppointmentCard";
import Services from "./components/Services";
import About from "./components/About";
import BeforeAfterGallery from "./components/BeforeAfterGallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <main suppressHydrationWarning>
      <Header />
      <Hero />
      <BookAppointmentCard />
      <Services />
      <About />
      <BeforeAfterGallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
