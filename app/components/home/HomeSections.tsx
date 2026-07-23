import ScrollMotion from "./ScrollMotion";
import { CareTeam } from "./CareTeam";
import { ContactSection } from "./ContactSection";
import { FaqSection } from "./FaqSection";
import { PatientJourney } from "./PatientJourney";
import { PaymentAccess } from "./PaymentAccess";
import { ServicesGrid } from "./ServicesGrid";
import { SiteFooter } from "./SiteFooter";
import { Testimonials } from "./Testimonials";
import { TrustStrip } from "./TrustStrip";
import { WhyChooseUs } from "./WhyChooseUs";

export default function HomeSections() {
  return (
    <div className="motion-scope">
      <ScrollMotion />
      <TrustStrip />
      <ServicesGrid />
      <PatientJourney />
      <PaymentAccess />
      <WhyChooseUs />
      <CareTeam />
      <Testimonials />
      <ContactSection />
      <FaqSection />
      <SiteFooter />
    </div>
  );
}
