"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

type MapEmbedProps = {
  address: string;
  className: string;
  directionsUrl: string;
  embedUrl: string;
  title: string;
};

export default function MapEmbed({
  address,
  className,
  directionsUrl,
  embedUrl,
  title,
}: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setShowFallback(false), 2200);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  return (
    <div
      className={`relative overflow-hidden rounded-[6px] bg-[#eef2ef] ${className}`}
    >
      <div
        className={`absolute inset-0 z-[2] flex items-center justify-center bg-[linear-gradient(135deg,#eef2ef_0%,#e7efe7_100%)] p-[18px] text-center transition-opacity duration-500 ${
          loaded || !showFallback ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="max-w-[360px]">
          <span className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[var(--color-clinic-teal)] text-white">
            <MapPin className="h-[22px] w-[22px]" aria-hidden />
          </span>
          <p className="mt-[14px] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-clinic-teal)]">
            Reverse Aesthetics
          </p>
          <p className="mt-[8px] text-[15px] font-bold leading-[1.45] text-[var(--color-clinic-navy)]">
            {address}
          </p>
          <a
            href={directionsUrl}
            className="mt-[16px] inline-flex h-[38px] items-center justify-center rounded-full bg-white px-[16px] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-clinic-navy)] shadow-sm"
          >
            Open directions
          </a>
        </div>
      </div>

      <iframe
        title={title}
        src={embedUrl}
        className="relative z-[1] h-full w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
