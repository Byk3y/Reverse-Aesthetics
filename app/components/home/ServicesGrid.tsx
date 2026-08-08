import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BOOKING_URL, SERVICES } from "./homeData";

export function ServicesGrid() {
  return (
    <section id="services" className="bg-white [.thread-page_&]:bg-white/70 pb-[46px] pt-[58px] md:pb-[58px] md:pt-[70px]">
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

        {/* Five services into a two-column grid leaves the last cell empty, so
            the lead service runs full-width as a horizontal card and the
            remaining four fall into a clean 2x2. Below `sm` every card is the
            same stacked layout. */}
        <div className="grid gap-[14px] sm:grid-cols-2 md:gap-[18px]">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const featured = index === 0;
            return (
              <Link
                key={service.title}
                href={service.href}
                className={`motion-card motion-lift ${service.tone} group block rounded-[8px] p-[18px] transition-transform duration-300 hover:-translate-y-1 md:p-[22px] ${
                  featured ? "sm:col-span-2" : ""
                }`}
              >
                <div className={featured ? "sm:flex sm:items-center sm:gap-[26px] md:gap-[34px]" : ""}>
                  <div
                    className={`motion-image-frame relative mb-[24px] h-[196px] overflow-hidden rounded-[8px] bg-white/35 md:h-[220px] ${
                      featured
                        ? "sm:mb-0 sm:h-[236px] sm:w-[46%] sm:shrink-0 md:h-[286px]"
                        : ""
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes={
                        featured
                          ? "(min-width: 768px) 520px, calc(100vw - 76px)"
                          : "(min-width: 768px) 540px, calc(100vw - 76px)"
                      }
                      className="object-cover"
                    />
                    <span className="absolute left-[12px] top-[12px] inline-flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/80 text-[var(--color-clinic-teal)] backdrop-blur-sm">
                      <Icon className="h-[21px] w-[21px]" strokeWidth={1.8} aria-hidden />
                    </span>
                  </div>
                  <div
                    className={`flex items-start justify-between gap-[18px] ${
                      featured ? "sm:min-w-0 sm:flex-1" : ""
                    }`}
                  >
                    <div>
                      <h3
                        className={`text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--color-clinic-navy)] ${
                          featured ? "sm:text-[28px] md:text-[34px]" : ""
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`mt-[10px] text-[14px] leading-[1.55] text-[#65716e] ${
                          featured ? "sm:mt-[14px] sm:max-w-[44ch] sm:text-[15px] md:text-[16px]" : ""
                        }`}
                      >
                        {service.description.split("**").map((part, i) =>
                          i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                        )}
                      </p>
                    </div>
                    <span className="mt-[2px] inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white/60 text-[var(--color-clinic-navy)] transition-colors group-hover:bg-[var(--color-clinic-navy)] group-hover:text-white">
                      <ChevronRight className="h-[17px] w-[17px]" aria-hidden />
                    </span>
                  </div>
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
