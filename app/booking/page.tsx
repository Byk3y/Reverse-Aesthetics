import { Suspense } from "react";
import type { Metadata } from "next";
import BookingWizard from "@/app/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book an Appointment | Reverse Aesthetics",
  description:
    "Book your consultation at Reverse Aesthetics in Lagos or Abuja. Choose your clinic and treatment, then pick a time that works for you.",
  alternates: { canonical: "/booking" },
};

/**
 * Deliberately reads no searchParams here.
 *
 * Awaiting `searchParams` opted this route into dynamic rendering, and Vercel
 * runs functions in one region while static pages come off the edge. Measured
 * against the deployment: every other page returned `x-vercel-cache: HIT` from
 * `cpt1`, while /booking was a MISS routed through to `iad1`. A patient in
 * Lagos paid a transatlantic round trip on the single page that matters most,
 * and — with no loading state anywhere in the app — stared at the old page
 * while it happened, which is why the button felt dead.
 *
 * The wizard is already a client component, so it reads the deep-link params
 * itself and this page goes back to being prerendered. useSearchParams needs
 * the Suspense boundary; loading.tsx covers the visible fallback.
 */
export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingWizard />
    </Suspense>
  );
}
