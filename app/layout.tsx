import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppointmentProvider } from "./contexts/AppointmentContext";
import Analytics from "./components/Analytics";
import { jsonLd, siteGraph } from "./lib/schema";

const onest = localFont({
  variable: "--font-display",
  src: "./fonts/Onest.ttf",
  display: "swap",
});

const redHatText = localFont({
  variable: "--font-body",
  src: "./fonts/RedHatText.ttf",
  display: "swap",
});

const montserrat = localFont({
  variable: "--font-poppins",
  src: "./fonts/Montserrat.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://reverseaesthetic.com'),
  title: "Reverse Aesthetics | Natural Transformations in Lagos & Abuja",
  description: "Nigeria's leading aesthetics, dermatology, weight loss, dental, and hair clinic. Safe, natural results with expert care. Book a visit in Lagos or Abuja.",
  keywords: [
    "aesthetics clinic Lagos",
    "dermatology Nigeria",
    "Botox Lagos",
    "dermal fillers Abuja",
    "weight loss clinic Nigeria",
    "hair transplant Lagos",
    "dental aesthetics Abuja",
    "HIFU treatment",
    "laser skin treatment Lagos",
    "medical aesthetics Nigeria",
    "GMC registered doctor",
    "Reverse Aesthetics",
    "Dr. Ral Abana"
  ],
  authors: [{ name: "Reverse Aesthetics" }],
  creator: "Reverse Aesthetics",
  publisher: "Reverse Aesthetics",
  // No `alternates.canonical` here on purpose. Next inherits root-layout
  // metadata into every page that doesn't override it, so setting a canonical
  // of '/' at this level told Google that /about, /contact, /clinics/* and the
  // rest were all duplicates of the homepage. Each page declares its own.
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://reverseaesthetic.com',
    title: 'Reverse Aesthetics | Natural Transformations in Lagos & Abuja',
    description: "Nigeria's leading aesthetics, dermatology, weight loss, dental, and hair clinic. Safe, natural results with expert care. Book a visit in Lagos or Abuja.",
    siteName: 'Reverse Aesthetics',
    images: [
      {
        url: '/images/about/clinic.avif',
        width: 1200,
        height: 630,
        alt: 'Reverse Aesthetics Clinic - Lagos & Abuja',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Aesthetics | Natural Transformations in Lagos & Abuja',
    description: "Nigeria's leading aesthetics, dermatology, weight loss, dental, and hair clinic. Safe, natural results with expert care.",
    images: ['/images/about/clinic.avif'],
    creator: '@reverseasthetic',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Search Console / Bing Webmaster ownership. Set the env vars and redeploy —
  // the HTML-tag method survives DNS changes, which the file-upload method on
  // the old Hostinger WordPress install will not.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(siteGraph)}
        />
        <Analytics />
      </head>
      <body
        className={`${onest.variable} ${redHatText.variable} ${montserrat.variable} antialiased`}
        suppressHydrationWarning
      >
        <div suppressHydrationWarning className="overflow-x-clip">
          <AppointmentProvider>
            {children}
          </AppointmentProvider>
        </div>
      </body>
    </html>
  );
}
