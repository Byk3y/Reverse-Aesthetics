import { BadgeCheck, Eye, ShieldCheck, Sparkles } from "lucide-react";

const highlights = [
  {
    title: "Medical-Led Care",
    description: "GMC (UK) registered physicians with decades of combined expertise.",
    icon: ShieldCheck,
  },
  {
    title: "Natural Results",
    description: "Subtle enhancements that look like you, only refined and refreshed.",
    icon: Sparkles,
  },
  {
    title: "Accredited Clinicians",
    description: "Award-winning specialists across aesthetics, dental, and hair.",
    icon: BadgeCheck,
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees. Clear consultation and treatment costs upfront.",
    icon: Eye,
  },
];

export default function TrustHighlights() {
  return (
    <section className="bg-[var(--color-clinic-navy)] py-[54px] md:py-[70px]">
      <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
        <div className="grid grid-cols-2 gap-[14px] md:grid-cols-4 md:gap-[18px]">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="motion-card rounded-[14px] border border-white/10 bg-white/[0.04] p-[20px] text-center md:p-[24px]"
              >
                <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white/10 text-[var(--color-clinic-teal)]">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <p className="mt-[16px] text-[12px] font-bold uppercase tracking-[0.12em] text-white md:text-[13px]">
                  {item.title}
                </p>
                <p className="mt-[9px] text-[13px] leading-[1.6] text-white/55 md:text-[14px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
