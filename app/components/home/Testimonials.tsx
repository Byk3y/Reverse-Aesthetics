import { Star } from "lucide-react";
import { TESTIMONIALS } from "./homeData";

const displayFont = { fontFamily: "var(--font-display), sans-serif" };

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#f7f4f0] [.thread-page_&]:bg-[#f7f4f0]/70 py-[56px] md:py-[88px]">
      <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
        <div className="motion-heading mb-[26px] flex flex-col gap-[12px] md:mb-[36px] md:flex-row md:items-end md:justify-between md:gap-[40px]">
          <div className="max-w-[700px]">
            <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
              Patient stories
            </p>
            <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[40px]">
              Natural results, from people who feel like themselves.
            </h2>
          </div>
          <p className="max-w-[260px] text-[15px] leading-[1.6] text-[#5f6c69] md:pb-[6px] md:text-right">
            Three patients, three different treatment paths.
          </p>
        </div>

        <div className="grid divide-y divide-[#ece6de] overflow-hidden rounded-[10px] border border-[#e6dfd6] bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
          {TESTIMONIALS.map((story) => (
            <figure
              key={story.name}
              className="motion-card relative flex flex-col p-[22px] md:min-h-[192px] md:p-[26px]"
            >
              <span
                aria-hidden
                style={displayFont}
                className="pointer-events-none absolute left-[14px] top-[2px] select-none text-[76px] leading-none text-[rgba(35,32,29,0.07)]"
              >
                &ldquo;
              </span>

              <blockquote
                style={displayFont}
                className="relative text-[16px] font-medium leading-[1.5] tracking-[-0.005em] text-[var(--color-clinic-navy)] md:text-[17px]"
              >
                {story.quote}
              </blockquote>

              <figcaption className="relative mt-[20px] flex items-center gap-[11px] md:mt-auto md:pt-[24px]">
                <span
                  className={`${story.tone} inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full text-[12px] font-bold tracking-[0.06em] text-[var(--color-clinic-navy)]`}
                >
                  {story.initials}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold leading-[1.35] text-[var(--color-clinic-navy)]">
                    {story.name}
                  </span>
                  <span className="block text-[12px] leading-[1.35] text-[#7c8279]">
                    {story.context}
                  </span>
                </span>
                <span className="ml-auto flex shrink-0 gap-[2px] text-[var(--color-clinic-gold)]">
                  <span className="sr-only">Rated 5 out of 5</span>
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-[12px] w-[12px] fill-current"
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
