"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const NS = "reverse-inline";

export default function CalInline({
  calLink,
  notes,
  treatment,
  onBooking,
}: {
  calLink: string;
  notes?: string;
  /** Prefills the Cal.com "Which treatment?" question — must match an option exactly */
  treatment?: string;
  onBooking?: () => void;
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
        /* embed API not ready — the calendar still renders */
      }
    })();
    return () => {
      mounted = false;
    };
  }, [onBooking]);

  return (
    <Cal
      namespace={NS}
      calLink={calLink}
      // width only → the embed auto-resizes to its content height (no nested scroll)
      style={{ width: "100%" }}
      config={{
        layout: "month_view",
        theme: "light",
        notes: notes ?? "",
        ...(treatment ? { treatment } : {}),
      }}
    />
  );
}
