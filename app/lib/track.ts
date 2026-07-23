/**
 * Lightweight conversion-tracking shim.
 *
 * Safe no-op until Google Ads / GA4 (gtag) or GTM (dataLayer) is added to the
 * site <head>. Once the client sets up their Google Ads account, map these
 * events to conversion actions:
 *   - "booking_submitted"  → a completed Cal.com booking (primary conversion)
 *   - "whatsapp_click"     → WhatsApp lead (secondary conversion)
 *   - "book_click"         → intent (scrolled to the booking widget)
 */
type TrackParams = Record<string, unknown>;

export function track(event: string, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: TrackParams[];
  };
  try {
    w.gtag?.("event", event, params);
    w.dataLayer?.push({ event, ...params });
  } catch {
    /* tracking must never break the page */
  }
}
