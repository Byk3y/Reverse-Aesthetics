import type { Metadata } from "next";

/**
 * page.tsx is a client component (category filtering uses state), so its
 * metadata lives here — without this the gallery inherits the site-wide title
 * and competes with the homepage in search results.
 */
export const metadata: Metadata = {
  title: "Before & After Results | Reverse Aesthetics Lagos & Abuja",
  description:
    "Real patient results from our Lagos and Abuja clinics — skin, weight loss, dental and hair restoration transformations, treated by our medical team.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Before & After Results | Reverse Aesthetics Lagos & Abuja",
    description:
      "Real patient results from our Lagos and Abuja clinics — skin, weight loss, dental and hair restoration transformations.",
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
