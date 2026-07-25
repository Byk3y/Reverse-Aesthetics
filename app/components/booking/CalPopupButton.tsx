"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

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
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const cal = await getCalApi({ namespace: NS });
        cal("ui", {
          styles: { branding: { brandColor: "#2E936F" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        if (onBooking) {
          cal("on", {
            action: "bookingSuccessful",
            callback: () => {
              if (mounted) onBooking();
            },
          });
        }
      } catch {
        /* embed API not ready */
      }
    })();
    return () => {
      mounted = false;
    };
  }, [onBooking]);

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
