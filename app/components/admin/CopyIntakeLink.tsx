"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * The intake link, one tap from being in a WhatsApp reply.
 *
 * This is how the directory fills up between bookings: a patient messages
 * asking about prices, the desk pastes this, and whatever they type lands in
 * the CRM instead of scrolling out of a chat thread.
 *
 * Copy is the whole feature. There was briefly a second, icon-only button that
 * opened wa.me to "share" the link, but with no recipient that just lands you
 * in a contact picker — slower than pasting, and an unlabelled speech bubble
 * next to a labelled button reads as noise. Deleted.
 *
 * The URL is read at click time rather than held in state — `window` doesn't
 * exist during the server render, and setting it from an effect just causes a
 * second render for a string that never changes.
 */
export default function CopyIntakeLink() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const intakeUrl = () => `${window.location.origin}/intake`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(intakeUrl());
      setCopied(true);
    } catch {
      // Clipboard access is blocked on insecure origins and inside some in-app
      // browsers. Falling back to a prompt still lets them get the link out.
      window.prompt("Copy the intake link:", intakeUrl());
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-[40px] items-center gap-[8px] rounded-full border border-[#e0dcd6] bg-white px-[16px] text-[12.5px] font-semibold text-[#5a5651] transition-colors hover:border-[var(--color-clinic-teal)] hover:text-[var(--color-clinic-teal)]"
    >
      {copied ? (
        <Check className="h-[14px] w-[14px] text-[var(--color-clinic-teal)]" aria-hidden />
      ) : (
        <Copy className="h-[14px] w-[14px]" aria-hidden />
      )}
      {copied ? "Link copied" : "Copy intake link"}
    </button>
  );
}
