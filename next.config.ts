import type { NextConfig } from "next";

/**
 * 301s from the old WordPress site, applied at the DNS cutover.
 *
 * Only genuinely-ours URLs appear here. The old install was a barely-modified
 * commercial theme: ~154 of its ~160 live URLs are demo content (invented
 * doctors, surgical procedures the clinic doesn't perform, a skincare shop, a
 * hair salon). Those are NOT redirected — 301 tells Google "this page became
 * that page", which would transfer plastic-surgery and salon topicality onto
 * real clinic pages. They're returned as 410 Gone in proxy.ts instead.
 *
 * The second group already 404s on the live site, so Google has likely dropped
 * them. They're kept because external links (directories, social bios) may
 * still point at them and a redirect costs nothing.
 */
const legacyRedirects = [
  // Live on the old site today.
  { source: "/about-us", destination: "/about" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/book-a-visit", destination: "/booking" },
  { source: "/faqs", destination: "/#faq" },

  // Already dead on the old site; rescued in case anything still links to them.
  { source: "/clinic", destination: "/clinics" },
  { source: "/aesthetics-dermatology-clinic", destination: "/clinics/aesthetics" },
  { source: "/weight-loss-clinic", destination: "/clinics/weightloss" },
  { source: "/dental-clinic", destination: "/clinics/dental" },
  { source: "/hair-clinic", destination: "/clinics/hair" },
  { source: "/bookings", destination: "/booking" },
  { source: "/team/ral-abana", destination: "/about" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Enable modern image formats (AVIF and WebP)
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different use cases
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 60 days
    minimumCacheTTL: 60 * 60 * 24 * 60,
    // Allow remote images if needed in the future
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      // YouTube Short poster frames embedded on the home page watch section.
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      // Blog cover images and in-article uploads live in Supabase Storage.
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
