import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TEAM } from "./homeData";

export function CareTeam() {
  return (
    <section id="care-team" className="bg-[#eef2ef] py-[70px] md:py-[100px]">
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

        <div className="grid gap-[14px] sm:grid-cols-2 md:gap-[18px]">
          {TEAM.map((member) => (
            <div key={member.name} className="motion-card motion-lift rounded-[8px] bg-white p-[14px]">
              <div
                className={`motion-image-frame ${member.tone} relative mb-[18px] h-[300px] overflow-hidden rounded-[8px]`}
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
              <div className="px-[4px] pb-[8px]">
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
          ))}
        </div>
      </div>
    </section>
  );
}
