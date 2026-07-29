import { TREATMENTS } from "@/app/components/booking/bookingData";

/** Formatting helpers for the CRM. */

/**
 * Nigeria-aware E.164, kept byte-for-byte in step with `normalize_phone()` in
 * 0004_patient_crm.sql. Used client-side to show the front desk what a number
 * will merge as before they save it — the database remains the authority.
 */
export function normalizePhone(raw: string | null | undefined): string | null {
  const n = (raw ?? "").replace(/[^0-9]/g, "");
  if (!n) return null;
  if (n.length === 11 && n.startsWith("0")) return `+234${n.slice(1)}`;
  if (n.length === 10) return `+234${n}`;
  if (n.startsWith("234")) return `+${n}`;
  return `+${n}`;
}

/** +2348031234567 → 0803 123 4567, the way a Nigerian reads it back. */
export function displayPhone(e164: string | null | undefined): string {
  if (!e164) return "";
  if (e164.startsWith("+234") && e164.length === 14) {
    const local = `0${e164.slice(4)}`;
    return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}`;
  }
  return e164;
}

/** A wa.me link for the number, so the desk can reply in one tap. */
export function whatsappLink(e164: string | null | undefined): string | null {
  if (!e164) return null;
  return `https://wa.me/${e164.replace(/[^0-9]/g, "")}`;
}

export function formatNaira(amount: number | null | undefined): string {
  const value = Number(amount ?? 0);
  return `₦${value.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
}

/** Compact money for stat tiles: ₦1.2m, ₦840k. */
export function formatNairaCompact(amount: number | null | undefined): string {
  const value = Number(amount ?? 0);
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `₦${Math.round(value / 1_000)}k`;
  return `₦${value}`;
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** "3 days ago", "in 2 weeks" — the unit the front desk actually thinks in. */
export function relativeDays(value: string | null | undefined): string {
  if (!value) return "—";
  const then = new Date(value).getTime();
  if (Number.isNaN(then)) return "—";

  const days = Math.round((then - Date.now()) / 86_400_000);
  const abs = Math.abs(days);

  if (abs === 0) return "today";
  if (abs === 1) return days > 0 ? "tomorrow" : "yesterday";
  if (abs < 21) return days > 0 ? `in ${abs} days` : `${abs} days ago`;

  const weeks = Math.round(abs / 7);
  if (abs < 60) return days > 0 ? `in ${weeks} weeks` : `${weeks} weeks ago`;

  const months = Math.round(abs / 30);
  if (months < 24) return days > 0 ? `in ${months} months` : `${months} months ago`;

  return days > 0
    ? `in ${Math.round(months / 12)} years`
    : `${Math.round(months / 12)} years ago`;
}

/** Days until a date; negative once it's overdue. */
export function daysUntil(value: string | null | undefined): number | null {
  if (!value) return null;
  const then = new Date(value).getTime();
  if (Number.isNaN(then)) return null;
  return Math.round((then - Date.now()) / 86_400_000);
}

/**
 * Treatment ids are stored, not labels, so the CRM keeps working if marketing
 * renames a service. Falls back to the raw value for free-text visit entries.
 */
export function treatmentLabel(idOrLabel: string): string {
  const match = TREATMENTS.find(
    (t) => t.id === idOrLabel || t.calSlug === idOrLabel || t.label === idOrLabel
  );
  return match?.label ?? idOrLabel;
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
