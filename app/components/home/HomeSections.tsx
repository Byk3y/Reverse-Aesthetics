import ScrollMotion from "./ScrollMotion";
import { CareTeam } from "./CareTeam";
import { ContactSection } from "./ContactSection";
import { FaqSection } from "./FaqSection";
import { PatientJourney } from "./PatientJourney";
import { PaymentAccess } from "./PaymentAccess";
import { Results } from "./Results";
import { ServicesGrid } from "./ServicesGrid";
import { SiteFooter } from "./SiteFooter";
import { WatchSection } from "./WatchSection";
import { Testimonials } from "./Testimonials";
import { WhyChooseUs } from "./WhyChooseUs";

export default function HomeSections() {
  return (
    <div className="motion-scope">
      <ScrollMotion />
      <ServicesGrid />
      <WatchSection />
      <PatientJourney />
      <PaymentAccess />
      <WhyChooseUs />
      <CareTeam />
      <Results />
      <Testimonials />
      <ContactSection />
      <FaqSection />
      <SiteFooter />
    </div>
  );
}
