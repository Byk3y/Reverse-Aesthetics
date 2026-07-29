import type { Metadata } from "next";
import IntakeForm from "./IntakeForm";

export const metadata: Metadata = {
  title: "Tell us about you | Reverse Aesthetics",
  description:
    "Share your details with the Reverse Aesthetics team and we'll be in touch to arrange your consultation.",
  // A link the clinic hands out in a WhatsApp reply, not a page for Google.
  // Indexing it would also put it in competition with /booking.
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{
    clinic?: string;
    treatment?: string;
    ref?: string;
  }>;
}

export default async function IntakePage({ searchParams }: Props) {
  const { clinic, treatment, ref } = await searchParams;

  return (
    <main className="bg-[var(--color-clinic-hero-top)] px-[20px] py-[52px] md:py-[76px]">
      <div className="mx-auto max-w-[680px]">
        <header className="mb-[34px] text-center">
          <span className="mb-[16px] inline-flex items-center gap-[8px] rounded-full border border-[rgba(1,120,125,0.28)] bg-white px-[15px] py-[7px] text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
            Reverse Aesthetics
          </span>
          <h1
            className="mb-[14px] text-[32px] font-semibold leading-[1.14] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Tell us a little about you
          </h1>
          <p className="mx-auto max-w-[480px] text-[16px] leading-[1.68] text-[#6f6a64]">
            It takes under a minute. Once we have your details, a member of the
            clinic will get in touch to talk through your options and find you a
            time that works.
          </p>
        </header>

        <IntakeForm
          initialClinic={clinic}
          initialTreatment={treatment}
          referrer={ref}
        />
      </div>
    </main>
  );
}
