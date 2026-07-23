import { Check } from "lucide-react";
import Image from "next/image";
import { WHY_POINTS } from "./homeData";

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-[#f7f4f0] py-[70px] md:py-[100px]">
      <div className="mx-auto grid max-w-[1160px] gap-[28px] px-[20px] md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-[40px]">
        <div className="motion-image-frame reveal-on-scroll relative min-h-[380px] overflow-hidden rounded-[8px] bg-[#e7efe7] md:min-h-[560px]">
          <Image
            src="/images/generated/clinic_interior.avif"
            alt="Reverse Aesthetics clinic interior in Lagos"
            fill
            sizes="(min-width: 768px) 520px, calc(100vw - 40px)"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,32,29,0)_25%,rgba(35,32,29,0.46)_100%)]" />
          <div className="absolute inset-x-[32px] bottom-[32px] rounded-[8px] bg-white/78 p-[18px] backdrop-blur-sm">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
              Subtle changes, powerful confidence
            </p>
            <p className="mt-[8px] text-[18px] font-semibold leading-[1.25] text-[var(--color-clinic-navy)]">
              Our goal is enhancement — not replacement. The best version of you,
              as your every day.
            </p>
          </div>
        </div>

        <div className="motion-heading">
          <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
            Why patients choose us
          </p>
          <h2 className="max-w-[620px] text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[44px]">
            Aesthetic medicine that respects what makes you, you.
          </h2>
          <p className="mt-[18px] max-w-[560px] text-[15px] leading-[1.75] text-[#5f6c69] md:text-[16px]">
            We pair medical precision with an eye for beauty — natural, tailored,
            and responsibly delivered. Your confidence, safety, and long-term skin
            and body health come first.
          </p>

          <div className="mt-[28px] grid gap-[12px]">
            {WHY_POINTS.map((point) => (
              <div
                key={point}
                className="motion-card flex items-start gap-[12px] rounded-[8px] bg-white px-[16px] py-[14px]"
              >
                <span className="mt-[1px] inline-flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[var(--color-clinic-teal)] text-white">
                  <Check className="h-[14px] w-[14px]" aria-hidden />
                </span>
                <span className="text-[15px] font-medium leading-[1.45] text-[var(--color-clinic-navy)]">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
