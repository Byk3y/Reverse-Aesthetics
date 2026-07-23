import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BOOKING_URL, SERVICES } from "./homeData";

export function ServicesGrid() {
  return (
    <section id="services" className="bg-white pb-[46px] pt-[58px] md:pb-[58px] md:pt-[70px]">
      <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
        <div className="motion-heading mb-[34px] flex flex-col gap-[18px] md:mb-[46px] md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
              Signature services
            </p>
            <h2 className="max-w-[640px] text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[44px]">
              The treatments our patients ask for most.
            </h2>
          </div>
          <Link
            href="/clinics"
            className="inline-flex h-[44px] w-fit items-center justify-center gap-[8px] rounded-full bg-[var(--color-clinic-navy)] px-[22px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-black"
          >
            Explore all clinics
            <ChevronRight className="h-[16px] w-[16px]" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-[14px] sm:grid-cols-2 md:gap-[18px]">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className={`motion-card motion-lift ${service.tone} group block rounded-[8px] p-[18px] transition-transform duration-300 hover:-translate-y-1 md:p-[22px]`}
              >
                <div className="motion-image-frame relative mb-[24px] h-[196px] overflow-hidden rounded-[8px] bg-white/35 md:h-[220px]">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 768px) 540px, calc(100vw - 76px)"
                    className="object-cover"
                  />
                  <span className="absolute left-[12px] top-[12px] inline-flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/80 text-[var(--color-clinic-teal)] backdrop-blur-sm">
                    <Icon className="h-[21px] w-[21px]" strokeWidth={1.8} aria-hidden />
                  </span>
                </div>
                <div className="flex items-start justify-between gap-[18px]">
                  <div>
                    <h3 className="text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--color-clinic-navy)]">
                      {service.title}
                    </h3>
                    <p className="mt-[10px] text-[14px] leading-[1.55] text-[#65716e]">
                      {service.description}
                    </p>
                  </div>
                  <span className="mt-[2px] inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white/60 text-[var(--color-clinic-navy)] transition-colors group-hover:bg-[var(--color-clinic-navy)] group-hover:text-white">
                    <ChevronRight className="h-[17px] w-[17px]" aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-[22px] text-center text-[13px] text-[#7b837f] md:hidden">
          Tap a service to see details, or{" "}
          <Link href={BOOKING_URL} className="font-semibold text-[var(--color-clinic-teal)]">
            book an appointment
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
