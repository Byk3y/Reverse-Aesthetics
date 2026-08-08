import Image from "next/image";
import Link from "next/link";
import { BOOKING_URL, RESULTS } from "./homeData";

const FRAME_SIZES = "(min-width: 768px) 350px, calc(100vw - 76px)";

export function Results() {
  return (
    <section id="results" className="bg-white [.thread-page_&]:bg-white/70 py-[70px] md:py-[100px]">
      <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
        <div className="motion-heading mb-[34px] flex flex-col gap-[18px] md:mb-[46px] md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
              Real results
            </p>
            <h2 className="max-w-[560px] text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[44px]">
              Recent treatments, photographed at our clinic.
            </h2>
          </div>
          <p className="max-w-[260px] text-[15px] leading-[1.6] text-[#5f6c69] md:pb-[6px] md:text-right">
            Consented patients, natural outcomes — photographed in-house.
          </p>
        </div>

        <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3 md:gap-[18px]">
          {RESULTS.map((result) => (
            <figure
              key={result.name}
              className={`motion-card motion-lift ${result.tone} overflow-hidden rounded-[8px] p-[14px] transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="motion-image-frame relative aspect-square overflow-hidden rounded-[8px] bg-white/35">
                <Image
                  src={result.image}
                  alt={result.imageAlt}
                  fill
                  sizes={FRAME_SIZES}
                  className="object-cover object-top"
                />
                {result.secondaryImage && (
                  <div className="clinic-swap-alt absolute inset-0">
                    <Image
                      src={result.secondaryImage}
                      alt={result.secondaryImageAlt ?? result.imageAlt}
                      fill
                      sizes={FRAME_SIZES}
                      className="object-cover object-top"
                    />
                  </div>
                )}
              </div>
              <figcaption className="px-[4px] pb-[8px] pt-[16px]">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
                  {result.treatment}
                </p>
                <h3 className="mt-[6px] text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-[var(--color-clinic-navy)]">
                  {result.name}
                </h3>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="motion-card mt-[28px] text-center">
          <Link
            href={BOOKING_URL}
            className="inline-flex h-[46px] items-center justify-center rounded-full bg-[var(--color-clinic-teal)] px-[34px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)]"
          >
            Book your consultation
          </Link>
        </div>
      </div>
    </section>
  );
}