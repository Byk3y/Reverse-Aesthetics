export const CLINIC_WA_PHONE = "2349159188094";

export function waLink(message: string) {
  return `https://wa.me/${CLINIC_WA_PHONE}?text=${encodeURIComponent(message)}`;
}

export interface LpExpectStep {
  title: string;
  desc: string;
}

export interface LpFaq {
  q: string;
  a: string;
}

export interface LpService {
  slug: string;
  /** matches a Cal.com "Which treatment?" value + shown in booking notes */
  treatmentLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  subcopy: string;
  image: string;
  imageAlt: string;
  benefits: string[];
  expect: LpExpectStep[];
  faqs: LpFaq[];
  waMessage: string;
}

export const LP_SERVICES: LpService[] = [
  {
    slug: "hair-restoration",
    treatmentLabel: "Hair Restoration",
    metaTitle: "Hair Restoration in Lagos & Abuja | Reverse Aesthetics",
    metaDescription:
      "Natural hair restoration in Lagos & Abuja — transplant, non-surgical regeneration, and hairline design by a medical-led team. Book your assessment.",
    eyebrow: "Hair Restoration · Lagos & Abuja",
    h1: "Restore your hairline. Naturally.",
    subcopy:
      "Surgical and non-surgical hair restoration with natural density and a hairline designed around your face — led by Reverse Aesthetics' medical team.",
    image: "/images/services/service-hair-restoration-square.avif",
    imageAlt: "Hairline design marked during a hair restoration consultation",
    benefits: [
      "Natural-looking density and hairline design",
      "Surgical transplant & non-surgical regeneration",
      "Root-cause diagnosis before any plan",
      "Aftercare for long-term hair health",
    ],
    expect: [
      { title: "Book your assessment", desc: "Pick a clinic and time, or message us on WhatsApp." },
      { title: "Scalp & follicle review", desc: "We assess your hair loss and its cause in person." },
      { title: "Your restoration plan", desc: "A realistic plan for density, direction, and recovery." },
    ],
    faqs: [
      { q: "Will it look natural?", a: "Yes — our priority is a hairline and density that suit your face and features." },
      { q: "Surgical or non-surgical?", a: "Both are available. We recommend the right approach after your assessment." },
      { q: "How long is recovery?", a: "It varies by procedure. We outline recovery and aftercare clearly before we begin." },
    ],
    waMessage: "Hi Reverse Aesthetics, I'd like to book a Hair Restoration assessment.",
  },
  {
    slug: "dermal-fillers",
    treatmentLabel: "Dermal Fillers",
    metaTitle: "Dermal Fillers in Lagos & Abuja | Reverse Aesthetics",
    metaDescription:
      "Medical-led dermal fillers in Lagos & Abuja for natural lift, shape, and hydration. Accredited clinicians, subtle results. Book your consultation.",
    eyebrow: "Dermal Fillers · Lagos & Abuja",
    h1: "Dermal fillers, subtly done.",
    subcopy:
      "Medical-led dermal fillers for lift, shape, and hydration — designed to enhance your features, never overdo them.",
    image: "/images/services/service-dermal-fillers-square.avif",
    imageAlt: "Dermal filler treatment at Reverse Aesthetics",
    benefits: [
      "Natural lift, shape & hydration",
      "Administered by accredited clinicians",
      "Profile balancing and refinement",
      "Clear aftercare and follow-up",
    ],
    expect: [
      { title: "Book your consultation", desc: "Choose a clinic and time that works for you." },
      { title: "Assessment & plan", desc: "We assess your features and agree a natural-first plan." },
      { title: "Gentle treatment", desc: "Treatment with medical-grade products and clear aftercare." },
    ],
    faqs: [
      { q: "Will I look overdone?", a: "No — our whole philosophy is subtle enhancement that still looks like you." },
      { q: "Is it safe?", a: "We use medical-grade products and assess your suitability before any treatment." },
      { q: "How long does it last?", a: "It depends on the product and area treated — we'll explain at your consultation." },
    ],
    waMessage: "Hi Reverse Aesthetics, I'd like to book a Dermal Fillers consultation.",
  },
  {
    slug: "bumps-treatment",
    treatmentLabel: "Bumps Treatment",
    metaTitle: "Bumps & Breakout Treatment in Lagos & Abuja | Reverse Aesthetics",
    metaDescription:
      "Dermatology-led treatment for acne, breakouts, and stubborn skin bumps in Lagos & Abuja. Tailored, evidence-based plans. Book your skin consultation.",
    eyebrow: "Bumps & Breakout Treatment · Lagos & Abuja",
    h1: "Clearer, calmer skin.",
    subcopy:
      "Dermatology-led treatment for acne, breakouts, and stubborn skin bumps — a tailored plan for healthier, smoother skin.",
    image: "/images/services/service-bumps-breakout-square.avif",
    imageAlt: "Skin assessment during a bumps and breakout consultation",
    benefits: [
      "Medical assessment of your skin",
      "Plans for acne, bumps & breakouts",
      "Evidence-based, skin-type-specific care",
      "Aftercare to protect your results",
    ],
    expect: [
      { title: "Book your consultation", desc: "Pick a clinic and time, or reach us on WhatsApp." },
      { title: "Skin assessment", desc: "We diagnose the cause of your bumps before treating." },
      { title: "Your skin plan", desc: "A tailored, step-wise plan with realistic milestones." },
    ],
    faqs: [
      { q: "What causes the bumps?", a: "There are many causes — we diagnose yours first, then tailor treatment to it." },
      { q: "How soon will I see results?", a: "Skin is a long game; we set realistic milestones and review your progress." },
      { q: "Is it right for my skin?", a: "We assess your skin type and history before recommending any plan." },
    ],
    waMessage: "Hi Reverse Aesthetics, I'd like to book a Bumps Treatment consultation.",
  },
  {
    slug: "facial-profile-balancing",
    treatmentLabel: "Facial Profile Balancing",
    metaTitle: "Facial Profile Balancing in Lagos & Abuja | Reverse Aesthetics",
    metaDescription:
      "Non-surgical facial profile balancing in Lagos & Abuja — jawline, chin, and proportion refinement for natural harmony. Book your consultation.",
    eyebrow: "Facial Profile Balancing · Lagos & Abuja",
    h1: "Balanced features. Naturally you.",
    subcopy:
      "Harmonize your profile — jawline, chin, nose, and proportions — with subtle, medical-led, non-surgical refinements.",
    image: "/images/services/service-profile-balancing-square.avif",
    imageAlt: "Facial profile assessment at Reverse Aesthetics",
    benefits: [
      "Non-surgical profile refinement",
      "Harmony and proportion, not change",
      "Injectable & thread techniques",
      "Natural, understated results",
    ],
    expect: [
      { title: "Book your consultation", desc: "Choose a clinic and a time that suits you." },
      { title: "Assessment & photos", desc: "We map your proportions and plan subtle refinements." },
      { title: "Gentle treatment", desc: "Non-surgical treatment with clear aftercare and follow-up." },
    ],
    faqs: [
      { q: "Is this surgery?", a: "No — we focus on non-surgical, subtle refinements to balance your profile." },
      { q: "Will it look natural?", a: "Yes — proportion and harmony are the entire point, never an obvious change." },
      { q: "How much downtime?", a: "Often minimal; we explain exactly what to expect before we begin." },
    ],
    waMessage: "Hi Reverse Aesthetics, I'd like to book a Facial Profile Balancing consultation.",
  },
  {
    slug: "glass-skin-facials",
    treatmentLabel: "Glass Skin Facial",
    metaTitle: "Glass Skin Facials in Lagos & Abuja | Reverse Aesthetics",
    metaDescription:
      "Glass skin facials in Lagos & Abuja — deep-cleansing, hydrating treatment for smooth, luminous, glass-skin glow. Tailored to your skin. Book now.",
    eyebrow: "Glass Skin Facials · Lagos & Abuja",
    h1: "That glass-skin glow.",
    subcopy:
      "A deep-cleansing, hydrating facial for smooth, luminous, glass-skin radiance — tailored to your skin type.",
    image: "/images/services/service-glass-skin-square.avif",
    imageAlt: "Hydrating glass-skin facial at Reverse Aesthetics",
    benefits: [
      "Deep clean + deep hydration",
      "Luminous, smooth, glass-skin finish",
      "Tailored to your skin type",
      "Relaxing, results-driven session",
    ],
    expect: [
      { title: "Book your facial", desc: "Pick a clinic and time — sessions run about 60 minutes." },
      { title: "Cleanse & treat", desc: "A deep-cleansing, hydrating facial tailored to your skin." },
      { title: "Glow & aftercare", desc: "Leave glowing, with simple aftercare to keep the results." },
    ],
    faqs: [
      { q: "How long is a session?", a: "Around 60 minutes — we'll confirm the exact time when you book." },
      { q: "Is there any downtime?", a: "Typically none — most people leave glowing and go straight back to their day." },
      { q: "How often should I come?", a: "We'll suggest a rhythm based on your skin type and goals." },
    ],
    waMessage: "Hi Reverse Aesthetics, I'd like to book a Glass Skin Facial.",
  },
];

export function getService(slug: string) {
  return LP_SERVICES.find((s) => s.slug === slug) ?? null;
}
