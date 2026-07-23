import type { Metadata } from "next";
import BookingWizard from "@/app/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book an Appointment | Reverse Aesthetics",
  description:
    "Book your consultation at Reverse Aesthetics in Lagos or Abuja. Choose your clinic and treatment, then pick a time that works for you.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ clinic?: string; treatment?: string }>;
}) {
  const params = await searchParams;
  return (
    <BookingWizard
      initialClinic={params.clinic}
      initialTreatment={params.treatment}
    />
  );
}
