import Link from "next/link";
import { Plus } from "lucide-react";
import CopyIntakeLink from "../../../components/admin/CopyIntakeLink";
import { PageHeader, StagePill } from "../../../components/admin/ui";
import { getStageCounts, listPatients } from "../../../lib/patients/queries";
import {
  daysUntil,
  displayPhone,
  formatNaira,
  relativeDays,
  treatmentLabel,
} from "../../../lib/patients/format";
import {
  ALL_STAGES,
  CLINIC_LABELS,
  SOURCE_LABELS,
  STAGE_LABELS,
  type Clinic,
  type PatientStage,
} from "../../../lib/patients/types";

const VIEW_TITLES: Record<string, { title: string; subtitle: string }> = {
  recall: {
    title: "Due back",
    subtitle: "Patients a past treatment says it's time to call. Overdue first.",
  },
  new: {
    title: "New this week",
    subtitle: "Everyone who arrived in the last seven days.",
  },
  unconsented: {
    title: "No marketing consent",
    subtitle:
      "Contact them about their own care, but keep them out of broadcasts.",
  },
};

interface Props {
  searchParams: Promise<{
    stage?: string;
    clinic?: string;
    q?: string;
    view?: string;
  }>;
}

export default async function PatientsPage({ searchParams }: Props) {
  const params = await searchParams;

  const stage = ALL_STAGES.find((s) => s.value === params.stage)?.value;
  const clinic =
    params.clinic === "lagos" || params.clinic === "abuja"
      ? (params.clinic as Clinic)
      : undefined;
  const view =
    params.view === "recall" || params.view === "new" || params.view === "unconsented"
      ? params.view
      : undefined;

  const [patients, counts] = await Promise.all([
    listPatients({ stage, clinic, search: params.q, view }),
    getStageCounts(),
  ]);

  const heading = view ? VIEW_TITLES[view] : null;

  // Preserve the other filters when one of them changes.
  const linkWith = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    const merged = { ...params, ...patch };
    for (const [key, value] of Object.entries(merged)) {
      if (value) next.set(key, value);
    }
    const query = next.toString();
    return query ? `/admin/patients?${query}` : "/admin/patients";
  };

  return (
    <main className="mx-auto max-w-[1180px] px-[20px] py-[32px] md:px-[36px] md:py-[44px]">
      <PageHeader
        title={heading?.title ?? "Patients"}
        subtitle={
          heading?.subtitle ??
          `${counts.all} in the directory · ${counts.lead} unworked lead${counts.lead === 1 ? "" : "s"}`
        }
      >
        <CopyIntakeLink />
        <Link
          href="/admin/patients/new"
          className="inline-flex h-[40px] items-center gap-[7px] rounded-full bg-[var(--color-clinic-navy)] px-[19px] text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-black"
        >
          <Plus className="h-[14px] w-[14px]" aria-hidden />
          Add patient
        </Link>
      </PageHeader>

      {view && (
        <Link
          href="/admin/patients"
          className="mb-[16px] inline-flex text-[12.5px] font-semibold text-[var(--color-clinic-teal)] transition-colors hover:text-[var(--color-clinic-teal-dark)]"
        >
          ← Everyone
        </Link>
      )}

      {/* Filters */}
      <div className="mb-[18px] flex flex-wrap items-center justify-between gap-[12px]">
        <nav className="flex flex-wrap gap-[7px]">
          <FilterChip href={linkWith({ stage: undefined })} active={!stage} count={counts.all}>
            All
          </FilterChip>
          {ALL_STAGES.map((s) => (
            <FilterChip
              key={s.value}
              href={linkWith({ stage: s.value })}
              active={stage === s.value}
              count={counts[s.value as PatientStage]}
            >
              {s.label}
            </FilterChip>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-[8px]">
          <nav className="flex gap-[7px]">
            <FilterChip href={linkWith({ clinic: undefined })} active={!clinic}>
              Both cities
            </FilterChip>
            {(["lagos", "abuja"] as Clinic[]).map((city) => (
              <FilterChip
                key={city}
                href={linkWith({ clinic: city })}
                active={clinic === city}
              >
                {CLINIC_LABELS[city]}
              </FilterChip>
            ))}
          </nav>

          <form action="/admin/patients" className="flex items-center gap-[7px]">
            {stage && <input type="hidden" name="stage" value={stage} />}
            {clinic && <input type="hidden" name="clinic" value={clinic} />}
            {view && <input type="hidden" name="view" value={view} />}
            <input
              type="search"
              name="q"
              defaultValue={params.q ?? ""}
              placeholder="Name, phone or email…"
              className="h-[36px] w-[200px] rounded-full border border-[#e0dcd6] bg-white px-[15px] text-[13px] outline-none transition-colors focus:border-[var(--color-clinic-teal)]"
            />
            <button
              type="submit"
              className="h-[36px] rounded-full border border-[#e0dcd6] bg-white px-[15px] text-[12px] font-semibold text-[#5a5651] transition-colors hover:border-[#b9b4ad]"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {patients.length === 0 ? (
        <EmptyState filtered={Boolean(stage || clinic || params.q || view)} />
      ) : (
        <div className="overflow-hidden rounded-[14px] border border-[#e6e2dc] bg-white">
          <div className="hidden grid-cols-[1.5fr_1fr_1fr_120px_110px_110px] gap-[16px] border-b border-[#eeebe6] bg-[#faf9f7] px-[22px] py-[11px] text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#a09b94] lg:grid">
            <span>Patient</span>
            <span>Interested in</span>
            <span>Source</span>
            <span>Stage</span>
            <span className="text-right">Value</span>
            <span className="text-right">
              {view === "recall" ? "Due" : "Last seen"}
            </span>
          </div>

          <ul className="divide-y divide-[#f1efeb]">
            {patients.map((patient) => {
              const dueDays = daysUntil(patient.recall_due_on);
              return (
                <li key={patient.id}>
                  <Link
                    href={`/admin/patients/${patient.id}`}
                    className="grid gap-[6px] px-[22px] py-[14px] transition-colors hover:bg-[#faf9f7] lg:grid-cols-[1.5fr_1fr_1fr_120px_110px_110px] lg:items-center lg:gap-[16px]"
                  >
                    <div className="min-w-0">
                      <span className="block truncate text-[14.5px] font-semibold text-[var(--color-clinic-navy)]">
                        {patient.full_name}
                      </span>
                      <span className="mt-[2px] block truncate text-[12.5px] tabular-nums text-[#8a857f]">
                        {displayPhone(patient.phone_e164) || patient.email || "—"}
                        {patient.clinic && (
                          <span className="text-[#c2bdb6]">
                            {" · "}
                            {CLINIC_LABELS[patient.clinic]}
                          </span>
                        )}
                      </span>
                    </div>

                    <span className="truncate text-[13px] text-[#5a5651]">
                      {patient.treatment_interest.length > 0 ? (
                        <>
                          {treatmentLabel(patient.treatment_interest[0])}
                          {patient.treatment_interest.length > 1 && (
                            <span className="text-[#b5b0a9]">
                              {" "}
                              +{patient.treatment_interest.length - 1}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-[#c2bdb6]">—</span>
                      )}
                    </span>

                    <span className="truncate text-[13px] text-[#5a5651]">
                      {SOURCE_LABELS[patient.source]}
                    </span>

                    <span>
                      <StagePill
                        stage={patient.stage}
                        label={STAGE_LABELS[patient.stage]}
                      />
                    </span>

                    <span className="text-[13px] tabular-nums text-[#5a5651] lg:text-right">
                      {patient.visit_count > 0 ? (
                        formatNaira(patient.total_spend)
                      ) : (
                        <span className="text-[#c2bdb6]">—</span>
                      )}
                    </span>

                    <span
                      className={`text-[12.5px] tabular-nums lg:text-right ${
                        view === "recall" && dueDays !== null && dueDays < 0
                          ? "font-semibold text-[var(--color-clinic-gold-hover)]"
                          : "text-[#a8a39c]"
                      }`}
                    >
                      {view === "recall"
                        ? relativeDays(patient.recall_due_on)
                        : relativeDays(patient.last_activity_at)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {patients.length >= 200 && (
        <p className="mt-[14px] text-[12.5px] text-[#a8a39c]">
          Showing the 200 most recent. Narrow it with a filter or a search.
        </p>
      )}
    </main>
  );
}

function FilterChip({
  href,
  active,
  count,
  children,
}: {
  href: string;
  active: boolean;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-[32px] items-center gap-[6px] rounded-full px-[13px] text-[12px] font-semibold transition-colors ${
        active
          ? "bg-[var(--color-clinic-navy)] text-white"
          : "border border-[#e0dcd6] bg-white text-[#5a5651] hover:border-[#b9b4ad]"
      }`}
    >
      {children}
      {count !== undefined && (
        <span className={`tabular-nums ${active ? "text-white/55" : "text-[#a8a39c]"}`}>
          {count}
        </span>
      )}
    </Link>
  );
}

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="rounded-[14px] border border-dashed border-[#dcd8d2] bg-white px-[24px] py-[60px] text-center">
      <h2 className="mb-[8px] text-[18px] font-semibold text-[var(--color-clinic-navy)]">
        {filtered ? "Nothing matches that" : "The directory is empty"}
      </h2>
      <p className="mx-auto mb-[24px] max-w-[420px] text-[14px] leading-[1.65] text-[#8a857f]">
        {filtered
          ? "Try a different filter, or search by name, phone number or email."
          : "Two things fill this up: the intake link you send patients on WhatsApp, and every Cal.com booking once the webhook is connected. You can also add someone by hand."}
      </p>
      {!filtered && (
        <Link
          href="/admin/patients/new"
          className="inline-flex h-[42px] items-center gap-[7px] rounded-full bg-[var(--color-clinic-navy)] px-[22px] text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-black"
        >
          <Plus className="h-[14px] w-[14px]" aria-hidden />
          Add patient
        </Link>
      )}
    </div>
  );
}
