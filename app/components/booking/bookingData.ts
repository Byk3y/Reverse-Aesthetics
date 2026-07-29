import { LOCATIONS, WHATSAPP_URL } from "@/app/components/home/homeData";

export { WHATSAPP_URL };

/** Brand colour handed to the Cal.com embed — mirrors --color-clinic-teal. */
export const CAL_BRAND = "#01787D";

export interface BookingClinic {
  id: "lagos" | "abuja";
  city: string;
  address: string;
  /** Cal.com username for this city's account */
  calUser: string;
  /** Flip to true once the Cal.com account + events for this city are live */
  calReady: boolean;
}

export const BOOKING_CLINICS: BookingClinic[] = [
  {
    id: "lagos",
    city: "Lagos",
    address: LOCATIONS[0].address,
    calUser: "reverse-aesthetics",
    calReady: true,
  },
  {
    id: "abuja",
    city: "Abuja",
    address: LOCATIONS[1].address,
    calUser: "reverse-aesthetics-abuja",
    calReady: true,
  },
];

/** Catch-all Cal.com event, used for anything without a dedicated one */
export const GENERAL_CAL_SLUG = "consultation";

/**
 * Builds a Cal.com link. Each flagship service has its own event so the
 * duration, description and confirmation email match what was booked;
 * everything else falls back to the general consultation.
 */
export function calLinkFor(clinic: BookingClinic, serviceSlug?: string | null) {
  return `${clinic.calUser}/${serviceSlug || GENERAL_CAL_SLUG}`;
}

export interface Treatment {
  id: string;
  /** Must match a "Which treatment?" option on the Cal.com event exactly, or the prefill is ignored */
  label: string;
  hint: string;
  /** Dedicated Cal.com event slug; omitted services use the general consultation */
  calSlug?: string;
}

export const TREATMENTS: Treatment[] = [
  { id: "aesthetics", label: "Aesthetics & Dermatology", hint: "Injectables, skin, tightening & glow" },
  { id: "dermal-fillers", label: "Dermal Fillers", hint: "Lift, shape & hydration", calSlug: "dermal-fillers" },
  { id: "facial-profile", label: "Facial Profile Balancing", hint: "Harmonize your features", calSlug: "facial-profile-balancing" },
  { id: "glass-skin", label: "Glass Skin Facial", hint: "Deep clean + luminous glow", calSlug: "glass-skin-facials" },
  { id: "bumps", label: "Bumps Treatment", hint: "Acne, breakouts & skin bumps", calSlug: "bumps-treatment" },
  { id: "hair", label: "Hair Restoration", hint: "Transplant, regeneration & hairline design", calSlug: "hair-restoration" },
  { id: "weight-loss", label: "Weight Loss", hint: "Medical programs & body contouring" },
  { id: "dental", label: "Dental Aesthetics", hint: "Whitening, veneers & smile design" },
  { id: "general", label: "Not sure — general consultation", hint: "We'll guide you to the right plan" },
];

export function findClinic(id?: string | null) {
  return BOOKING_CLINICS.find((c) => c.id === id) ?? null;
}

/**
 * Accepts either the treatment id or its Cal/LP slug — four of them differ
 * (`hair` vs `hair-restoration`), and a deep link built from the landing-page
 * URL would otherwise silently fail to preselect anything.
 */
export function findTreatment(idOrSlug?: string | null) {
  if (!idOrSlug) return null;
  return TREATMENTS.find((t) => t.id === idOrSlug || t.calSlug === idOrSlug) ?? null;
}
