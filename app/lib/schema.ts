/**
 * Single source of truth for the site's structured data.
 *
 * Everything is expressed as one linked @graph rather than as separate islands
 * of JSON-LD, so Google resolves the brand and its two clinics as one entity
 * with two branches instead of three unrelated businesses. The rule to keep:
 * an entity is DEFINED once (full properties) and REFERENCED everywhere else
 * by its @id. Never restate an entity's properties on another page — that's
 * how NAP drift starts.
 *
 * NAP here is authoritative and comes from site-copy.md. It must match the
 * Google Business Profiles character for character; inconsistent name, address
 * or phone across the web is the most common cause of a clinic failing to rank
 * in the local map pack.
 */
import { SITE_URL, SITE_NAME } from "./site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LAGOS_ID = `${SITE_URL}/locations/lagos#clinic`;
export const ABUJA_ID = `${SITE_URL}/locations/abuja#clinic`;

/** E.164 — the only phone format Google reliably parses. */
export const PHONE = "+2349159188094";
/* The Abuja clinic has its own line — see ABUJA_PHONE_TEL in homeData.ts.
   Each branch must carry its own number here or the two MedicalClinic nodes
   look like one location to Google. */
export const ABUJA_PHONE = "+2349010203696";
export const EMAIL = "reverseaestheticsng@gmail.com";

/** Mon–Sat 9–7, both clinics. Must match the hours set on each GBP listing. */
const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "19:00",
  },
];

/**
 * Verified brand profiles. Client-confirmed 2026-07-26.
 *
 * The Instagram handle is @reverse_aesthetics, with the underscore. A second
 * account at @reverseaesthetics also resolves but is not the clinic's — don't
 * "correct" the underscore away. sameAs is how Google ties this site to the
 * social profiles as one entity, so a wrong handle splits that signal.
 */
const SAME_AS = [
  "https://www.instagram.com/reverse_aesthetics",
  "https://www.facebook.com/profile.php?id=61566953914310",
  "https://x.com/reverseasthetic",
  "https://www.youtube.com/@reverse-aesthetics",
];

const ORGANIZATION = {
  "@type": ["Organization", "MedicalBusiness"],
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: "Reverse Aesthetics Clinic",
  description:
    "Medical-led aesthetics, dermatology, weight loss, dental and hair restoration clinic with locations in Lagos and Abuja.",
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/images/logo.png`,
  },
  image: { "@id": `${SITE_URL}/#logo` },
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/about#founder`,
    name: "Dr. Ral Abana",
    jobTitle: "Aesthetic Medical Physician",
    description:
      "GMC (UK) registered aesthetic medical physician with nearly a decade of specialty experience.",
  },
  sameAs: SAME_AS,
  // The brand has no single address — each branch below carries its own.
  location: [{ "@id": LAGOS_ID }, { "@id": ABUJA_ID }],
};

const MEDICAL_SPECIALTIES = [
  "Dermatology",
  "Aesthetic Medicine",
  "Cosmetic Dermatology",
];

const LAGOS_CLINIC = {
  "@type": "MedicalClinic",
  "@id": LAGOS_ID,
  name: "Reverse Aesthetics — Lagos",
  branchOf: { "@id": ORG_ID },
  parentOrganization: { "@id": ORG_ID },
  url: `${SITE_URL}/locations/lagos`,
  telephone: PHONE,
  email: EMAIL,
  priceRange: "$$",
  image: `${SITE_URL}/images/about/clinic.avif`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Historia Mews, No. 5 Ayo Babatunde Crescent, Oniru",
    addressLocality: "Lekki",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  // Approximate. Replace with the exact pin from the Lagos Google Business
  // Profile once it is verified — GBP, not this field, drives map placement.
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.4474,
    longitude: 3.4197,
  },
  areaServed: [
    { "@type": "City", name: "Lagos" },
    { "@type": "Place", name: "Lekki" },
    { "@type": "Place", name: "Victoria Island" },
    { "@type": "Place", name: "Ikoyi" },
  ],
  openingHoursSpecification: OPENING_HOURS,
  medicalSpecialty: MEDICAL_SPECIALTIES,
  sameAs: SAME_AS,
};

const ABUJA_CLINIC = {
  "@type": "MedicalClinic",
  "@id": ABUJA_ID,
  name: "Reverse Aesthetics — Abuja",
  // The Google Business Profile for this clinic is listed under a longer,
  // service-laden string. Recording it here ties the two records to the same
  // entity without making it the business's name on the site.
  alternateName:
    "Reverse Aesthetics Clinics Abuja, Dermatology, Hair Restoration, Teeth Whitening",
  branchOf: { "@id": ORG_ID },
  parentOrganization: { "@id": ORG_ID },
  url: `${SITE_URL}/locations/abuja`,
  telephone: ABUJA_PHONE,
  email: EMAIL,
  priceRange: "$$",
  image: `${SITE_URL}/images/about/clinic.avif`,
  address: {
    "@type": "PostalAddress",
    // Mirrors the verified Google Business Profile character for character.
    // The profile is the source of truth for NAP; if this drifts, the two
    // records stop reinforcing each other in local search.
    streetAddress: "4 Adamu Mathew Street, near Royal Specialist Hospital",
    addressLocality: "Mabushi",
    addressRegion: "FCT",
    postalCode: "900108",
    addressCountry: "NG",
  },
  // geo deliberately omitted: no verified coordinates for the Mabushi address.
  // Add it from the Abuja GBP pin rather than guessing — a wrong pin on a
  // medical listing sends patients to the wrong building.
  areaServed: [
    { "@type": "City", name: "Abuja" },
    { "@type": "Place", name: "Mabushi" },
    { "@type": "Place", name: "Wuse" },
    { "@type": "Place", name: "Maitama" },
  ],
  openingHoursSpecification: OPENING_HOURS,
  medicalSpecialty: MEDICAL_SPECIALTIES,
  sameAs: SAME_AS,
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-NG",
};

/**
 * The site-wide graph, rendered once in the root layout.
 *
 * Deliberately carries NO aggregateRating. Review markup a business supplies
 * about itself is ineligible for rich results under Google's structured data
 * policy, and an unverifiable review count on a medical site is a manual-action
 * risk. Real ratings belong on the Google Business Profiles; if they are ever
 * mirrored here, they must be traceable to actual reviews.
 */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [ORGANIZATION, WEBSITE, LAGOS_CLINIC, ABUJA_CLINIC],
};

/** Breadcrumbs — helps Google render the URL path in place of a raw link. */
export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/** Serialise for a <script type="application/ld+json"> tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data) };
}
