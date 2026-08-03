import type { Metadata } from "next";

/**
 * page.tsx is a client component (category filtering uses state), so its
 * metadata lives here — without this the gallery inherits the site-wide title
 * and competes with the homepage in search results.
 *
 * This page documents the clinic and the procedures; it is deliberately not a
 * before/after results page, so nothing here may claim patient outcomes.
 */
export const metadata: Metadata = {
  title: "Our Work | Inside the Reverse Aesthetics Clinic, Lagos & Abuja",
  description:
    "A look inside both clinics — Lekki, Lagos and Mabushi, Abuja — the treatment rooms, and the aesthetic, weight loss, dental and hair procedures we perform.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Our Work | Inside the Reverse Aesthetics Clinic, Lagos & Abuja",
    description:
      "A look inside both clinics — Lekki, Lagos and Mabushi, Abuja — the treatment rooms, and the procedures we perform.",
    url: "/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
