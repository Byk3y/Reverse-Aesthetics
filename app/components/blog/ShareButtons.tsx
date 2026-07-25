"use client";

import { Check, Link2, MessageCircle } from "lucide-react";
import { useState } from "react";

const BASE =
  "inline-flex h-[38px] items-center justify-center gap-[7px] rounded-full border border-[#e2ded8] px-[16px] text-[12px] font-semibold text-[#5a5651] transition-colors hover:border-[var(--color-clinic-teal)] hover:text-[var(--color-clinic-teal)]";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the
      // share links still work, so fail quietly.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-[10px]">
      <span className="mr-[4px] text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a857f]">
        Share
      </span>

      <a
        className={BASE}
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="h-[15px] w-[15px]" aria-hidden />
        WhatsApp
      </a>

      <a
        className={BASE}
        href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on X"
      >
        <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="currentColor" aria-hidden>
          <path d="M13.9 10.47 21.35 2h-1.76l-6.47 7.35L7.96 2H2l7.81 11.1L2 22h1.76l6.83-7.76L16.04 22H22l-8.1-11.53Z" />
        </svg>
        X
      </a>

      <a
        className={BASE}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on Facebook"
      >
        <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor" aria-hidden>
          <path d="M13.4 21.5v-8.65h2.9l.44-3.37H13.4V7.33c0-.97.27-1.63 1.66-1.63h1.78V2.69a23.9 23.9 0 0 0-2.6-.14c-2.57 0-4.33 1.57-4.33 4.45v2.48H7v3.37h2.91v8.65h3.49Z" />
        </svg>
        Facebook
      </a>

      <button type="button" onClick={copy} className={BASE}>
        {copied ? (
          <Check className="h-[15px] w-[15px]" aria-hidden />
        ) : (
          <Link2 className="h-[15px] w-[15px]" aria-hidden />
        )}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
