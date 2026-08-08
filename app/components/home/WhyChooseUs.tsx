import { Check, MapPin } from "lucide-react";
import Image from "next/image";
import { WHY_POINTS } from "./homeData";

const FRAME_SIZES = "(min-width: 768px) 520px, calc(100vw - 40px)";
// Navy rather than the white of the caption card below it: both photos are
// bright ceiling in this corner, and a white chip disappeared into them.
const LABEL_CLASS =
  "absolute left-[20px] top-[20px] inline-flex items-center gap-[6px] rounded-full bg-[var(--color-clinic-navy)]/78 px-[12px] py-[7px] text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm";

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-[#f7f4f0] [.thread-page_&]:bg-[#f7f4f0]/70 py-[70px] md:py-[100px]">
      <div className="mx-auto grid max-w-[1160px] gap-[28px] px-[20px] md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-[40px]">
        <div className="motion-image-frame reveal-on-scroll relative min-h-[380px] overflow-hidden rounded-[8px] bg-[#e4f1f2] md:min-h-[560px]">
          {/* Lagos sits underneath and is always painted; Abuja crossfades
              over it and back, so the frame shows both clinics in turn. */}
          <Image
            src="/images/about/clinic.avif"
            alt="Reverse Aesthetics clinic reception in Lekki, Lagos"
            fill
            sizes={FRAME_SIZES}
            className="object-cover"
          />
          <div className="clinic-swap-alt absolute inset-0">
            <Image
              src="/images/about/clinic-abuja.avif"
              alt="Reverse Aesthetics clinic reception in Mabushi, Abuja"
              fill
              sizes={FRAME_SIZES}
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,32,29,0)_25%,rgba(35,32,29,0.46)_100%)]" />

          {/* Without these the swap just looks like two rooms of one clinic. */}
          <p className={`clinic-swap-label ${LABEL_CLASS}`}>
            <MapPin className="h-[12px] w-[12px]" aria-hidden />
            Lekki, Lagos
          </p>
          <p className={`clinic-swap-label-alt ${LABEL_CLASS}`}>
            <MapPin className="h-[12px] w-[12px]" aria-hidden />
            Mabushi, Abuja
          </p>
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
