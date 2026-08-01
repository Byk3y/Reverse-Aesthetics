"use client";

import { useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CAL_BRAND } from "./bookingData";

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

  // See CalPopupButton — an inline onBooking arrow re-ran this effect on every
  // parent render, re-issuing cal("ui") and leaking a listener each time.
  const onBookingRef = useRef(onBooking);
  useEffect(() => {
    onBookingRef.current = onBooking;
  }, [onBooking]);

  useEffect(() => {
    let cancelled = false;
    const handler = () => onBookingRef.current?.();
    (async () => {
      try {
        const cal = await getCalApi({ namespace });
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
        /* embed API not ready — the calendar still renders */
      }
    })();
    return () => {
      cancelled = true;
      getCalApi({ namespace })
        .then((cal) => cal("off", { action: "bookingSuccessful", callback: handler }))
        .catch(() => {});
    };
  }, [namespace]);

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
