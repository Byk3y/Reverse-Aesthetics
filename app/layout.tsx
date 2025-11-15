import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppointmentProvider } from "./contexts/AppointmentContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
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
  metadataBase: new URL('https://reverseaesthetic.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://reverseaesthetic.com',
    title: 'Reverse Aesthetics | Natural Transformations in Lagos & Abuja',
    description: "Nigeria's leading aesthetics, dermatology, weight loss, dental, and hair clinic. Safe, natural results with expert care. Book a visit in Lagos or Abuja.",
    siteName: 'Reverse Aesthetics',
    images: [
      {
        url: '/images/about/clinic.png',
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
    images: ['/images/about/clinic.png'],
    creator: '@reverseaesthetics',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': 'https://reverseaesthetic.com',
    name: 'Reverse Aesthetics',
    alternateName: 'Reverse Aesthetics Clinic',
    description: "Nigeria's leading aesthetics, dermatology, weight loss, dental, and hair restoration clinic offering natural transformations with expert medical care.",
    url: 'https://reverseaesthetic.com',
    telephone: '+2349159188094',
    email: 'reverseaestheticsng@gmail.com',
    priceRange: '$$',
    image: 'https://reverseaesthetic.com/images/about/clinic.png',
    logo: 'https://reverseaesthetic.com/images/about/clinic.png',
    founder: {
      '@type': 'Person',
      name: 'Dr. Ral Abana',
      jobTitle: 'Aesthetic Medical Physician',
      description: 'GMC (UK) registered aesthetic medical physician with nearly a decade of specialty experience'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Historia Mews, No. 5 Ayo Babatunde Crescent, Oniru',
      addressLocality: 'Lekki',
      addressRegion: 'Lagos',
      addressCountry: 'NG',
      postalCode: ''
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.4474,
      longitude: 3.4197
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Lagos'
      },
      {
        '@type': 'City',
        name: 'Abuja'
      }
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00'
      }
    ],
    medicalSpecialty: [
      'Dermatology',
      'Aesthetic Medicine',
      'Cosmetic Dermatology'
    ],
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Botox & Dermal Fillers',
        description: 'Injectable treatments for facial rejuvenation'
      },
      {
        '@type': 'MedicalProcedure',
        name: 'HIFU & Thread Lift',
        description: 'Non-surgical skin tightening treatments'
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Laser & RF Treatments',
        description: 'Advanced laser and radiofrequency skin treatments'
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Weight Loss Programs',
        description: 'Medical weight management and body contouring'
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Hair Restoration',
        description: 'Surgical and non-surgical hair restoration solutions'
      },
      {
        '@type': 'DentalService',
        name: 'Dental Aesthetics',
        description: 'Cosmetic dental treatments for smile enhancement'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1'
    },
    sameAs: [
      'https://www.instagram.com/reverseaesthetics',
      'https://www.facebook.com/reverseaesthetics',
      'https://twitter.com/reverseaesthetics'
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
        suppressHydrationWarning
      >
        <div suppressHydrationWarning>
          <AppointmentProvider>
            {children}
          </AppointmentProvider>
        </div>
      </body>
    </html>
  );
}
