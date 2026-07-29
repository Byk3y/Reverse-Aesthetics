import Link from "next/link";

/**
 * Shared admin furniture.
 *
 * The house style is a ledger, not a dashboard: hairline rules instead of drop
 * shadows, one saturated accent at a time, and every figure set in tabular
 * numerals so columns of numbers line up and can be scanned down.
 */

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-[28px] flex flex-wrap items-end justify-between gap-[16px]">
      <div className="min-w-0">
        <h1
          className="text-[27px] font-semibold tracking-[-0.02em] text-[var(--color-clinic-navy)] md:text-[32px]"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-[6px] text-[14px] leading-[1.5] text-[#8a857f]">
            {subtitle}
          </p>
        )}
      </div>
      {children && <div className="flex flex-wrap items-center gap-[10px]">{children}</div>}
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
  tone = "plain",
  href,
}: {
  label: string;
  value: string | number;
  hint?: React.ReactNode;
  /** `gold` is reserved for recall urgency — one accent, one meaning. */
  tone?: "plain" | "gold" | "teal";
  href?: string;
}) {
  const accent =
    tone === "gold"
      ? "text-[var(--color-clinic-gold)]"
      : tone === "teal"
        ? "text-[var(--color-clinic-teal)]"
        : "text-[var(--color-clinic-navy)]";

  const body = (
    <>
      <span className="block text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#a09b94]">
        {label}
      </span>
      <span
        className={`mt-[12px] block text-[34px] font-semibold leading-none tabular-nums tracking-[-0.02em] ${accent}`}
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        {value}
      </span>
      {hint && (
        <span className="mt-[9px] block text-[12.5px] leading-[1.45] text-[#8a857f]">
          {hint}
        </span>
      )}
    </>
  );

  const shell =
    "block rounded-[14px] border border-[#e6e2dc] bg-white px-[20px] py-[19px]";

  if (href) {
    return (
      <Link
        href={href}
        className={`${shell} transition-colors hover:border-[#c9c4bc]`}
      >
        {body}
      </Link>
    );
  }

  return <div className={shell}>{body}</div>;
}

export function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[14px] border border-[#e6e2dc] bg-white">
      <header className="flex items-center justify-between border-b border-[#f1efeb] px-[20px] py-[13px]">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a857f]">
          {title}
        </h2>
        {action && (
          <Link
            href={action.href}
            className="text-[12px] font-semibold text-[var(--color-clinic-teal)] transition-colors hover:text-[var(--color-clinic-teal-dark)]"
          >
            {action.label}
          </Link>
        )}
      </header>
      {children}
    </section>
  );
}

export function PanelEmpty({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-[20px] py-[30px] text-center text-[13.5px] leading-[1.6] text-[#a8a39c]">
      {children}
    </p>
  );
}

const STAGE_TONES: Record<string, string> = {
  lead: "bg-[#f0eeea] text-[#6b6660]",
  contacted: "bg-[#eef1f6] text-[#4d5d78]",
  consult_booked: "bg-[#e2f6f7] text-[var(--color-clinic-teal-dark)]",
  consulted: "bg-[#e2f6f7] text-[var(--color-clinic-teal-dark)]",
  treated: "bg-[#e6f4ea] text-[#2c6b41]",
  repeat: "bg-[#f1eaf9] text-[var(--color-clinic-violet-dark)]",
  dormant: "bg-[#f4f2ef] text-[#a8a39c]",
};

export function StagePill({ stage, label }: { stage: string; label: string }) {
  return (
    <span
      className={`inline-flex h-[23px] items-center whitespace-nowrap rounded-full px-[10px] text-[10.5px] font-bold uppercase tracking-[0.07em] ${
        STAGE_TONES[stage] ?? STAGE_TONES.lead
      }`}
    >
      {label}
    </span>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-[22px] items-center rounded-full border border-[#e6e2dc] px-[9px] text-[11.5px] font-medium text-[#6f6a64]">
      {children}
    </span>
  );
}
