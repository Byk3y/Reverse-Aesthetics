import type { Metadata } from "next";

/**
 * page.tsx is a client component (it uses hooks), and client components cannot
 * export metadata — which is why this page was shipping the site-wide default
 * title. Metadata lives here instead.
 *
 * This URL is the 301 target for the old WordPress /aesthetics-dermatology-clinic/,
 * so its title carries the terms that page ranked for.
 */
export const metadata: Metadata = {
  title: "Aesthetics & Dermatology Clinic in Lagos | Reverse Aesthetics",
  description:
    "Doctor-led aesthetics and dermatology in Lekki, Lagos. Botox, dermal fillers, HIFU, laser resurfacing and acne scar treatment by a GMC-registered physician.",
  alternates: { canonical: "/clinics/aesthetics" },
  openGraph: {
    title: "Aesthetics & Dermatology Clinic in Lagos | Reverse Aesthetics",
    description:
      "Doctor-led aesthetics and dermatology in Lekki, Lagos. Botox, dermal fillers, HIFU, laser resurfacing and acne scar treatment.",
    url: "/clinics/aesthetics",
  },
};

export default function AestheticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
