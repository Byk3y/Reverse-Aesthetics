import { ChevronRight } from "lucide-react";
import { FAQS } from "./homeData";

export function FaqSection() {
  return (
    <section id="faq" className="bg-[#f7f4f0] py-[70px] md:py-[100px]">
      <div className="mx-auto max-w-[900px] px-[20px] md:px-[40px]">
        <div className="motion-heading mb-[30px] text-center">
          <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
            Good to know
          </p>
          <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
            Before your visit.
          </h2>
        </div>

        <div className="grid gap-[10px]">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="motion-card group rounded-[8px] bg-white px-[18px] py-[16px]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-[20px] text-[16px] font-bold text-[var(--color-clinic-navy)]">
                {faq.question}
                <span className="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#ecf7f7] text-[var(--color-clinic-teal)] transition-transform group-open:rotate-90">
                  <ChevronRight className="h-[16px] w-[16px]" aria-hidden />
                </span>
              </summary>
              <p className="mt-[12px] max-w-[720px] text-[14px] leading-[1.65] text-[#65716e]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
