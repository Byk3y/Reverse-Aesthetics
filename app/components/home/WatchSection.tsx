"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Short = {
  id: string;
  label: string;
  title: string;
  tone: string;
};

const SHORTS: Short[] = [
  {
    id: "nJpj2B81yHE",
    label: "Facial profile balancing",
    title: "Harmonized facial proportions, without surgery.",
    tone: "bg-[#e4f1f2]",
  },
  {
    id: "NDqA7ZymnQg",
    label: "Hair restoration",
    title: "A natural hairline, restored step by step.",
    tone: "bg-[#efe6ea]",
  },
];

export function WatchSection() {
  return (
    <section id="watch" className="bg-[#f7f4f0] [.thread-page_&]:bg-[#f7f4f0]/70 py-[70px] md:py-[100px]">
      <div className="mx-auto max-w-[1160px] px-[20px] md:px-[40px]">
        <div className="motion-heading mb-[34px] flex flex-col gap-[18px] md:mb-[46px] md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
              Watch the difference
            </p>
            <h2 className="max-w-[620px] text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[44px]">
              Real treatments, on camera. Tap play to watch.
            </h2>
          </div>
          <p className="max-w-[280px] text-[15px] leading-[1.6] text-[#5f6c69] md:pb-[6px] md:text-right">
            Short, real, unscripted moments from our treatment rooms in Lagos and Abuja.
          </p>
        </div>

        <div className="grid gap-[14px] sm:grid-cols-2 md:mx-auto md:max-w-[840px] md:gap-[18px]">
          {SHORTS.map((short) => (
            <ShortCard key={short.id} short={short} />
          ))}
        </div>

        <p className="mt-[30px] text-center text-[13px] text-[#6f7774]">
          More behind-the-scenes clips on our{" "}
          <a
            href="https://www.youtube.com/@reverse-aesthetics"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--color-clinic-teal)] underline-offset-4 hover:underline"
          >
            YouTube channel
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function ShortCard({ short }: { short: Short }) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${short.id}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${short.id}?autoplay=1&rel=0`;

  return (
    <figure className={`motion-card motion-lift ${short.tone} overflow-hidden rounded-[8px] p-[14px]`}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[8px] bg-white/35">
        {playing ? (
          <iframe
            src={embedUrl}
            title={short.label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${short.label}`}
            className="group absolute inset-0 block h-full w-full"
          >
            <Image
              src={thumbnail}
              alt={short.label}
              fill
              sizes="(min-width: 768px) 540px, calc(100vw - 76px)"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[50%_30%] transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,32,29,0)_45%,rgba(35,32,29,0.55)_100%)]" />
            <span className="absolute left-1/2 top-[44%] flex h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--color-clinic-navy)] shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-white">
              <Play className="ml-[2px] h-[24px] w-[24px] fill-current" aria-hidden />
            </span>
            <span className="absolute right-[10px] top-[10px] inline-flex items-center gap-[5px] rounded-full bg-black/55 px-[10px] py-[5px] text-[10px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
              <span className="h-[7px] w-[7px] rounded-full bg-[#ff3d3d]" aria-hidden />
              Watch
            </span>
          </button>
        )}
      </div>

      <figcaption className="px-[4px] pb-[8px] pt-[16px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
          {short.label}
        </p>
        <h3 className="mt-[6px] text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-[var(--color-clinic-navy)]">
          {short.title}
        </h3>
      </figcaption>
    </figure>
  );
}