import { TRUST_ITEMS } from "./homeData";

export function TrustStrip() {
  return (
    <section className="bg-white py-[34px] md:py-[44px] border-y border-[#e9ede9]">
      <div className="mx-auto grid max-w-[1160px] grid-cols-2 gap-[12px] px-[20px] md:grid-cols-4 md:px-[40px]">
        {TRUST_ITEMS.map((item) => (
          <div
            key={item.value}
            className="motion-card min-h-[104px] rounded-[8px] bg-[#f5f8f5] px-[18px] py-[18px]"
          >
            <div className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-[var(--color-clinic-teal)] md:text-[26px]">
              {item.value}
            </div>
            <div className="mt-[8px] text-[13px] leading-[1.4] text-[var(--color-clinic-navy)]/75 md:text-[14px]">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
