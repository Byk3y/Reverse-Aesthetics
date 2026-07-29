"use client";

import { useEffect, useRef } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_BRAND } from "./bookingData";

const NS = "reverse-popup";

export default function CalPopupButton({
  calLink,
  notes,
  treatment,
  onBooking,
  className,
  children,
}: {
  calLink: string;
  notes?: string;
  /** Prefills the Cal.com "Which treatment?" question — must match an option exactly */
  treatment?: string;
  onBooking?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  /**
   * Callers pass an inline arrow for onBooking, so depending on it directly gave
   * the setup effect a new identity every parent render: cal("ui") was re-issued
   * against a possibly-open modal and a fresh bookingSuccessful listener piled up
   * each time (the old cleanup only flipped a flag, it never called cal("off")).
   * Holding the callback in a ref keeps the effect keyed to the namespace alone.
   */
  const onBookingRef = useRef(onBooking);
  useEffect(() => {
    onBookingRef.current = onBooking;
  }, [onBooking]);

  useEffect(() => {
    let cancelled = false;
    const handler = () => onBookingRef.current?.();
    (async () => {
      try {
        const cal = await getCalApi({ namespace: NS });
        if (cancelled) return;
        cal("ui", {
          // `styles.branding` is deprecated in embed 1.5.x and warns on every call
          cssVarsPerTheme: {
            light: { "cal-brand": CAL_BRAND },
            dark: { "cal-brand": CAL_BRAND },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        cal("on", { action: "bookingSuccessful", callback: handler });
      } catch {
        /* embed API not ready */
      }
    })();
    return () => {
      cancelled = true;
      getCalApi({ namespace: NS })
        .then((cal) => cal("off", { action: "bookingSuccessful", callback: handler }))
        .catch(() => {});
    };
  }, []);

  return (
    <button
      type="button"
      data-cal-namespace={NS}
      data-cal-link={calLink}
      data-cal-config={JSON.stringify({
        layout: "month_view",
        theme: "light",
        notes: notes ?? "",
        ...(treatment ? { treatment } : {}),
      })}
      className={className}
    >
      {children}
    </button>
  );
}
