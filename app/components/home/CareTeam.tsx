import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TEAM } from "./homeData";

export function CareTeam() {
  return (
    <section id="care-team" className="bg-[#eef2ef] [.thread-page_&]:bg-[#eef2ef]/70 py-[70px] md:py-[100px]">
      <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
        <div className="motion-heading mb-[34px] flex flex-col gap-[14px] md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
              Care team
            </p>
            <h2 className="max-w-[560px] text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[42px]">
              Led by Dr. Ral Abana, backed by a specialist team.
            </h2>
          </div>
          <Link
            href="/about"
            className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-clinic-teal)] hover:text-[var(--color-clinic-teal-dark)]"
          >
            Meet the team →
          </Link>
        </div>

        {/* A single member in a two-column grid leaves half the row empty, so
            they run full-width as a horizontal card instead — the same shape
            ServicesGrid uses for its lead service. */}
        <div
          className={`grid gap-[14px] md:gap-[18px] ${
            TEAM.length > 1 ? "sm:grid-cols-2" : ""
          }`}
        >
          {TEAM.map((member) => {
            const solo = TEAM.length === 1;
            return (
            <div
              key={member.name}
              className={`motion-card motion-lift rounded-[8px] bg-white p-[14px] ${
                solo ? "sm:flex sm:items-center sm:gap-[26px] md:gap-[34px]" : ""
              }`}
            >
              <div
                className={`motion-image-frame ${member.tone} relative mb-[18px] h-[300px] overflow-hidden rounded-[8px] ${
                  solo ? "sm:mb-0 sm:h-[340px] sm:w-[46%] sm:shrink-0 md:h-[380px]" : ""
                }`}
              >
                <Image
                  src={member.image}
                  alt={member.imageAlt}
                  fill
                  sizes="(min-width: 768px) 540px, calc(100vw - 68px)"
                  className="object-cover object-[50%_28%]"
                />
                <span className="absolute bottom-[12px] right-[12px] inline-flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/80 text-[var(--color-clinic-teal)] backdrop-blur-sm">
                  <BadgeCheck className="h-[20px] w-[20px]" strokeWidth={1.7} aria-hidden />
                </span>
              </div>
              <div className={`px-[4px] pb-[8px] ${solo ? "sm:min-w-0 sm:flex-1 sm:pb-0" : ""}`}>
                <h3 className="text-[22px] font-bold tracking-[-0.02em] text-[var(--color-clinic-navy)]">
                  {member.name}
                </h3>
                <p className="mt-[6px] text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-clinic-teal)]">
                  {member.role}
                </p>
                <p className="mt-[10px] text-[14px] leading-[1.55] text-[#65716e]">
                  {member.note}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
