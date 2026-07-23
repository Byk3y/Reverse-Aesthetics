import { Star } from "lucide-react";
import { TESTIMONIALS } from "./homeData";

export function Testimonials() {
  return (
    <section id="testimonials" className="overflow-hidden bg-[#f8fbf9] pt-[70px] pb-[38px] md:py-[105px]">
      <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
        <div className="motion-heading mb-[30px] flex flex-col gap-[18px] md:mb-[44px] md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
              Patient stories
            </p>
            <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
              Natural results, from people who feel like themselves.
            </h2>
          </div>
          <div className="flex items-center gap-[10px] text-[13px] font-semibold uppercase tracking-[0.12em] text-[#8a968f]">
            <span className="hidden h-px w-[70px] bg-[#d7e2da] md:block" />
            <span className="md:hidden">Swipe stories →</span>
            <span className="hidden md:inline">Patient stories</span>
          </div>
        </div>
      </div>

      <div className="testimonial-scroll overflow-x-auto px-[20px] pb-[10px] md:overflow-visible md:px-[40px]">
        <div className="mx-auto flex w-max snap-x snap-mandatory gap-[14px] md:w-full md:max-w-[1160px] md:items-start md:gap-[18px]">
          {TESTIMONIALS.map((story, index) => (
            <figure
              key={story.name}
              className={`motion-card motion-float ${story.tone} relative flex min-h-[356px] w-[82vw] max-w-[360px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[8px] p-[22px] md:min-h-[410px] md:w-auto md:max-w-none md:flex-1 md:p-[28px] ${
                index === 1 ? "md:mt-[44px]" : ""
              } ${index === 2 ? "md:mt-[12px]" : ""}`}
            >
              <div className="absolute -right-[34px] -top-[34px] h-[126px] w-[126px] rounded-full bg-white/28" />
              <div className="absolute bottom-[88px] left-[22px] h-px w-[calc(100%-44px)] bg-white/45" />

              <div className="relative">
                <div className="mb-[34px] flex items-center justify-between">
                  <div className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/70 text-[15px] font-bold tracking-[0.08em] text-[var(--color-clinic-navy)]">
                    {story.initials}
                  </div>
                  <div className="rounded-full bg-white/55 px-[12px] py-[7px] text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-teal)]">
                    {story.context}
                  </div>
                </div>

                <div className="mb-[18px] text-[58px] font-semibold leading-none text-white/70">
                  &ldquo;
                </div>
                <blockquote className="text-[23px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[26px]">
                  {story.quote}
                </blockquote>
              </div>

              <figcaption className="relative mt-[34px] flex items-center justify-between gap-[16px]">
                <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--color-clinic-navy)]/70">
                  {story.name}
                </span>
                <span className="flex gap-[2px] text-[var(--color-clinic-gold)]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-[15px] w-[15px] fill-current"
                      aria-hidden
                    />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
