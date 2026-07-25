import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "../home/homeData";
import type { Category } from "../../lib/blog/types";

/**
 * Conversion card dropped between the article body and the FAQs, pointed at
 * the clinic page matching the post's category.
 */
export default function InlineCta({ category }: { category: Category | null }) {
  const href = category?.clinic_href ?? "/booking";
  const label = category?.cta_label ?? "Book a consultation";
  const topic = category ? category.name.toLowerCase() : "your goals";

  return (
    <aside className="overflow-hidden rounded-[20px] bg-[var(--color-clinic-navy)] p-[28px] md:p-[36px]">
      <p className="mb-[10px] text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal)]">
        Talk to a clinician
      </p>
      <h2 className="mb-[12px] text-[21px] font-semibold leading-[1.25] tracking-[-0.01em] text-white md:text-[25px]">
        Want this assessed for your own case?
      </h2>
      <p className="mb-[24px] max-w-[520px] text-[15px] leading-[1.7] text-white/70">
        Article advice is general by necessity. Book a consultation and our
        medical team will build a plan around {topic} — your history, your skin,
        your goals.
      </p>

      <div className="flex flex-col gap-[10px] sm:flex-row sm:items-center">
        <Link
          href={href}
          className="inline-flex h-[46px] items-center justify-center gap-[9px] rounded-full bg-[var(--color-clinic-teal)] px-[26px] text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
        >
          {label}
          <ArrowRight className="h-[15px] w-[15px]" aria-hidden />
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-[46px] items-center justify-center gap-[9px] rounded-full border border-white/25 px-[26px] text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/60"
        >
          Ask on WhatsApp
          <MessageCircle className="h-[15px] w-[15px]" aria-hidden />
        </a>
      </div>
    </aside>
  );
}
