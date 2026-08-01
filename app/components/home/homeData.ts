import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  ClipboardList,
  Droplets,
  MessageCircle,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
} from "lucide-react";

/* ----------------------------------------------------------------
   Reverse Aesthetics — home page content
   (arogyam-style layout, real clinic content from site-copy.md)
----------------------------------------------------------------- */

export const PHONE_DISPLAY = "+234 915 918 8094";
export const PHONE_TEL = "+2349159188094";
export const EMAIL = "info@reverseaesthetic.com";
export const WHATSAPP_URL =
  "https://wa.me/2349159188094?text=" +
  encodeURIComponent(
    "Hello Reverse Aesthetics! I'd like to book a consultation."
  );
export const BOOKING_URL = "/booking";

/* Abuja has its own line. Two clinics sharing one number is allowed but reads
   as one location to Google, and it makes an inbound call impossible to
   attribute to a clinic. */
export const ABUJA_PHONE_DISPLAY = "+234 901 020 3696";
export const ABUJA_PHONE_TEL = "+2349010203696";

export interface ClinicLocation {
  city: string;
  address: string;
  short: string;
  phoneDisplay: string;
  phoneTel: string;
  mapEmbedUrl: string;
  mapDirectionsUrl: string;
}

export const LOCATIONS: ClinicLocation[] = [
  {
    city: "Lagos",
    address: "Historia Mews, No. 5 Ayo Babatunde Crescent, Oniru, Lekki, Lagos",
    short: "Oniru, Lekki",
    phoneDisplay: PHONE_DISPLAY,
    phoneTel: PHONE_TEL,
    mapEmbedUrl:
      "https://www.google.com/maps?hl=en&q=Ayo%20Babatunde%20Crescent%2C%20Oniru%2C%20Lekki%2C%20Lagos%2C%20Nigeria&t=m&z=15&ie=UTF8&iwloc=B&output=embed",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Ayo%20Babatunde%20Crescent%2C%20Oniru%2C%20Lekki%2C%20Lagos%2C%20Nigeria",
  },
  {
    city: "Abuja",
    address:
      "4 Adamu Mathew Street, near Royal Specialist Hospital, Mabushi, Abuja 900108",
    short: "Mabushi, Abuja",
    phoneDisplay: ABUJA_PHONE_DISPLAY,
    phoneTel: ABUJA_PHONE_TEL,
    mapEmbedUrl:
      "https://www.google.com/maps?hl=en&q=4%20Adamu%20Mathew%20Street%2C%20Mabushi%2C%20Abuja%2C%20Nigeria&t=m&z=15&ie=UTF8&iwloc=B&output=embed",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=4%20Adamu%20Mathew%20Street%2C%20Mabushi%2C%20Abuja%2C%20Nigeria",
  },
];

/* Both clinics, short form — for compact strips */
export const CITIES_SHORT = "Lekki, Lagos · Mabushi, Abuja";

/* Back-compat single-value exports (Lagos = primary clinic) */
export const CLINIC_ADDRESS = LOCATIONS[0].address;
export const CLINIC_ADDRESS_SHORT = LOCATIONS[0].short;
export const MAP_EMBED_URL = LOCATIONS[0].mapEmbedUrl;
export const MAP_DIRECTIONS_URL = LOCATIONS[0].mapDirectionsUrl;

export interface HomeService {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  tone: string;
  href: string;
}

/* Our 5 flagship services — each has a dedicated page (also used for Google Ads).
   Featured on the homepage; cards deep-link to their /lp/[slug] page. */
export const SERVICES: HomeService[] = [
  {
    title: "Dermal Fillers",
    description:
      "Lift, shape, and hydration with medical-grade fillers — subtly done, never overdone.",
    icon: Syringe,
    image: "/images/services/service-dermal-fillers.avif",
    imageAlt: "Dermal filler treatment at Reverse Aesthetics",
    tone: "bg-[#e4f1f2]",
    href: "/lp/dermal-fillers",
  },
  {
    title: "Glass Skin Facials",
    description:
      "Deep-cleansing, hydrating facials for a luminous, healthy, glass-skin glow.",
    icon: Droplets,
    image: "/images/services/service-glass-skin.avif",
    imageAlt: "Hydrating glass-skin facial at Reverse Aesthetics",
    tone: "bg-[#e4edf1]",
    href: "/lp/glass-skin-facials",
  },
  {
    title: "Hair Restoration",
    description:
      "Natural hairline design, transplants, and non-surgical regeneration for lasting hair health.",
    icon: Scissors,
    image: "/images/services/service-hair-restoration.avif",
    imageAlt: "Hair restoration and hairline design consultation",
    tone: "bg-[#efe6ea]",
    href: "/lp/hair-restoration",
  },
  {
    title: "Facial Profile Balancing",
    description:
      "Non-surgical refinements that harmonize your features and proportions — naturally you.",
    icon: Sparkles,
    image: "/images/services/service-profile-balancing.avif",
    imageAlt: "Facial profile assessment at Reverse Aesthetics",
    tone: "bg-[#f0e9e2]",
    href: "/lp/facial-profile-balancing",
  },
  {
    title: "Bumps & Breakout Treatment",
    description:
      "Medical-led plans for clearer, calmer skin — treating acne, breakouts, and bumps at the cause.",
    icon: Stethoscope,
    image: "/images/services/service-bumps-breakout.avif",
    imageAlt: "Acne, breakout, and bumps consultation at Reverse Aesthetics",
    tone: "bg-[#e4f1f2]",
    href: "/lp/bumps-treatment",
  },
];

export const JOURNEY = [
  {
    title: "Book a consultation",
    description:
      "Tell us your goals on WhatsApp or through the booking page, and we'll suggest a time that works for you.",
    icon: MessageCircle,
  },
  {
    title: "Meet your clinician",
    description:
      "We assess your features, lifestyle, and medical history, then take a baseline before any treatment.",
    icon: Stethoscope,
  },
  {
    title: "Leave with a plan",
    description:
      "Get a step-wise, natural-first treatment plan with clear pricing, aftercare, and follow-up checkpoints.",
    icon: CalendarCheck,
  },
];

export const WHY_POINTS = [
  "Medical-led care with advanced, evidence-based techniques",
  "Personalized plans focused on natural-looking results",
  "Accredited clinicians and hospital-grade safety standards",
  "Transparent pricing and aftercare you can rely on",
];

export interface TeamMember {
  role: string;
  name: string;
  note: string;
  image: string;
  imageAlt: string;
  tone: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Dr. Ral Abana",
    role: "Founder · Aesthetic Medical Physician",
    note: "GMC (UK) registered, award-winning, specialist in injectables, skin health, and non-surgical lifting.",
    image: "/images/team/dr-ral-abana.avif",
    imageAlt: "Dr. Ral Abana, founder and aesthetic medical physician at Reverse Aesthetics",
    tone: "bg-[#e4f1f2]",
  },
  {
    name: "Clinical Care Team",
    role: "Dermatology · Weight · Dental · Hair",
    note: "Accredited clinicians across every clinic, matched to the concern in front of you.",
    image: "/images/team/clinical-team.avif",
    imageAlt: "The Reverse Aesthetics clinical team at the clinic",
    tone: "bg-[#f0e9e2]",
  },
];

export const INTAKE_CHECKLIST = [
  "Relevant medical history",
  "Current medications",
  "Past treatment or product notes",
  "Your goals and questions",
];

export const TESTIMONIALS = [
  {
    quote:
      "From booking to results, the experience was seamless. I feel like myself — just better.",
    name: "Caroline A.",
    initials: "CA",
    context: "Aesthetics & skin",
    tone: "bg-[#e4f1f2]",
  },
  {
    quote:
      "Swift service, thorough aftercare, and truly natural outcomes. Highly recommend.",
    name: "Funsho A.",
    initials: "FA",
    context: "Dermatology",
    tone: "bg-[#f0e9e2]",
  },
  {
    quote:
      "I did my hair transplant here. The result is fuller, natural, and confidence-boosting.",
    name: "Nnamdi A.",
    initials: "NA",
    context: "Hair restoration",
    tone: "bg-[#e4edf1]",
  },
];

export const FAQS = [
  {
    question: "Are my results going to look natural?",
    answer:
      "Yes. Our philosophy prioritizes proportion, subtlety, and harmony. We tailor plans to enhance — not change — your features.",
  },
  {
    question: "How do I know which treatment is right for me?",
    answer:
      "Start with a consultation. We assess your goals, lifestyle, and medical history, then recommend a clear, step-by-step plan.",
  },
  {
    question: "Do you offer non-surgical alternatives?",
    answer:
      "Absolutely — threads, injectables, energy-based tightening, and skin programs often achieve meaningful results without surgery.",
  },
  {
    question: "Are treatments safe?",
    answer:
      "We use medical-grade products, accredited techniques, and hospital-standard safety protocols. Suitability is always assessed first.",
  },
  {
    question: "Where are you located?",
    answer:
      "We have two clinics — Lagos (Oniru, Lekki) and Abuja (Mabushi). See the contact section for both addresses and opening hours.",
  },
];

/* Icons re-exported for section decoration */
export const ICONS = {
  ShieldCheck,
  Droplets,
  Syringe,
  ClipboardList,
};
