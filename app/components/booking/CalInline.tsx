"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const NS_BASE = "reverse-inline";

/**
 * Cal keeps embed state per namespace, so a shared one would keep serving the
 * first calLink it saw — switching clinic changed the address text but left the
 * calendar pointed at the other city. One namespace per link, plus a matching
 * `key` to force a remount, keeps the two in step.
 */
const namespaceFor = (calLink: string) =>
  `${NS_BASE}-${calLink.replace(/[^a-zA-Z0-9]+/g, "-")}`;

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
  const namespace = namespaceFor(calLink);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const cal = await getCalApi({ namespace });
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
  }, [namespace, onBooking]);

  return (
    <Cal
      key={calLink}
      namespace={namespace}
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
