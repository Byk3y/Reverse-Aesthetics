import { Check } from "lucide-react";

/**
 * Summary block at the head of an article.
 *
 * Doubles as the passage AI search engines are most likely to lift when
 * citing the page, so it is plain prose in a list — no clever markup.
 */
export default function KeyTakeaways({ items }: { items: string[] }) {
  const takeaways = items.filter((item) => item.trim().length > 0);
  if (takeaways.length === 0) return null;

  return (
    <aside className="rounded-[18px] border border-[#dde9e3] bg-[#f4f9f6] p-[24px] md:p-[30px]">
      <h2 className="mb-[16px] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-clinic-teal-dark)]">
        Key takeaways
      </h2>
      <ul className="grid gap-[12px]">
        {takeaways.map((item, i) => (
          <li key={i} className="flex gap-[12px]">
            <span className="mt-[3px] inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--color-clinic-teal)]">
              <Check className="h-[11px] w-[11px] text-white" aria-hidden />
            </span>
            <span className="text-[15px] leading-[1.6] text-[#3f3b37] md:text-[16px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
