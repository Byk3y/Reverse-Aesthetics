import { LOCATIONS, WHATSAPP_URL } from "@/app/components/home/homeData";

export { WHATSAPP_URL };

export interface BookingClinic {
  id: "lagos" | "abuja";
  city: string;
  address: string;
  /** Public Cal.com link: "username/event-slug" */
  calLink: string;
  /** Flip to true once the Cal.com account + event for this city is live */
  calReady: boolean;
}

export const BOOKING_CLINICS: BookingClinic[] = [
  {
    id: "lagos",
    city: "Lagos",
    address: LOCATIONS[0].address,
    // TODO: swap "30min" for the real consultation slug once created
    calLink: "reverse-aesthetics/30min",
    calReady: true,
  },
  {
    id: "abuja",
    city: "Abuja",
    address: LOCATIONS[1].address,
    // TODO: create the Abuja Cal.com account + event, then set calReady: true
    calLink: "reverse-aesthetics-abuja/consultation",
    calReady: false,
  },
];

export interface Treatment {
  id: string;
  label: string;
  hint: string;
}

export const TREATMENTS: Treatment[] = [
  { id: "aesthetics", label: "Aesthetics & Dermatology", hint: "Injectables, skin, tightening & glow" },
  { id: "dermal-fillers", label: "Dermal Fillers", hint: "Lift, shape & hydration" },
  { id: "facial-profile", label: "Facial Profile Balancing", hint: "Harmonize your features" },
  { id: "glass-skin", label: "Glass Skin Facial", hint: "Deep clean + luminous glow" },
  { id: "bumps", label: "Bumps Treatment", hint: "Acne, breakouts & skin bumps" },
  { id: "hair", label: "Hair Restoration", hint: "Transplant, regeneration & hairline design" },
  { id: "weight-loss", label: "Weight Loss", hint: "Medical programs & body contouring" },
  { id: "dental", label: "Dental Aesthetics", hint: "Whitening, veneers & smile design" },
  { id: "general", label: "Not sure — general consultation", hint: "We'll guide you to the right plan" },
];

export function findClinic(id?: string | null) {
  return BOOKING_CLINICS.find((c) => c.id === id) ?? null;
}

export function findTreatment(id?: string | null) {
  return TREATMENTS.find((t) => t.id === id) ?? null;
}
