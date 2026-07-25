import { Plus } from "lucide-react";
import type { Faq } from "../../lib/blog/types";

/**
 * Native details/summary accordion — no client JS, and the answers stay in
 * the DOM for crawlers even while visually collapsed.
 */
export default function PostFaqs({ faqs }: { faqs: Faq[] }) {
  const items = faqs.filter((f) => f.question?.trim() && f.answer?.trim());
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="mb-[22px] text-[22px] font-semibold tracking-[-0.01em] text-[var(--color-clinic-navy)] md:text-[26px]">
        Frequently asked questions
      </h2>

      <div className="divide-y divide-[#eeebe6] border-y border-[#eeebe6]">
        {items.map((faq, i) => (
          <details key={i} className="group py-[18px]">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-[16px] text-[16px] font-semibold leading-[1.5] text-[var(--color-clinic-navy)] transition-colors hover:text-[var(--color-clinic-teal)] md:text-[17px] [&::-webkit-details-marker]:hidden">
              {faq.question}
              <Plus
                className="mt-[3px] h-[18px] w-[18px] shrink-0 text-[var(--color-clinic-teal)] transition-transform duration-300 group-open:rotate-45"
                aria-hidden
              />
            </summary>
            <p className="mt-[12px] max-w-[70ch] text-[15px] leading-[1.75] text-[#5a5651] md:text-[16px]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
