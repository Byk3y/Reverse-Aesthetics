import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import CopyIntakeLink from "../../components/admin/CopyIntakeLink";
import {
  PageHeader,
  Panel,
  PanelEmpty,
  StagePill,
  StatTile,
} from "../../components/admin/ui";
import {
  getCrmStats,
  getSourceMix,
  listRecallDue,
  listRecentPatients,
  listUpcomingAppointments,
} from "../../lib/patients/queries";
import {
  daysUntil,
  displayPhone,
  formatDateTime,
  formatNairaCompact,
  relativeDays,
  treatmentLabel,
} from "../../lib/patients/format";
import { SOURCE_LABELS, STAGE_LABELS } from "../../lib/patients/types";

export default async function AdminOverviewPage() {
  const [stats, recall, recent, upcoming, sources] = await Promise.all([
    getCrmStats(),
    listRecallDue(6),
    listRecentPatients(6),
    listUpcomingAppointments(6),
    getSourceMix(),
  ]);

  const delta = stats.newThisWeek - stats.newLastWeek;
  const repeatRate =
    stats.treated > 0 ? Math.round((stats.repeat / stats.treated) * 100) : 0;

  const sourceTotal = sources.reduce((sum, s) => sum + s.count, 0);

  return (
    <main className="mx-auto max-w-[1180px] px-[20px] py-[32px] md:px-[36px] md:py-[44px]">
      <PageHeader
        title="Overview"
        subtitle="Who came in, who's booked, and who's due back."
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

      <div className="mb-[22px] grid gap-[13px] sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="New this week"
          value={stats.newThisWeek}
          href="/admin/patients?view=new"
          hint={
            stats.newLastWeek === 0 && stats.newThisWeek === 0
              ? "No enquiries yet"
              : delta === 0
                ? "Same as last week"
                : `${delta > 0 ? "+" : ""}${delta} vs last week`
          }
        />
        <StatTile
          label="Booked, next 7 days"
          value={stats.upcoming}
          tone="teal"
          hint="Confirmed on Cal.com"
        />
        <StatTile
          label="Due back"
          value={stats.recallDue}
          tone="gold"
          href="/admin/patients?view=recall"
          hint="Past treatments say it's time to call"
        />
        <StatTile
          label="Last 30 days"
          value={formatNairaCompact(stats.revenue30)}
          hint={
            stats.treated > 0
              ? `${repeatRate}% of treated patients came back`
              : "Log a visit to start tracking"
          }
        />
      </div>

      <div className="grid gap-[16px] lg:grid-cols-[1.35fr_1fr]">
        <div className="grid gap-[16px]">
          {/* The list the clinic is currently leaving on the floor. */}
          <Panel title="Due back" action={{ label: "See all", href: "/admin/patients?view=recall" }}>
            {recall.length === 0 ? (
              <PanelEmpty>
                Nothing due yet. Recalls appear here once you log a visit with a
                &ldquo;bring them back in&rdquo; interval.
              </PanelEmpty>
            ) : (
              <ul className="divide-y divide-[#f1efeb]">
                {recall.map((patient) => {
                  const days = daysUntil(patient.recall_due_on);
                  const overdue = days !== null && days < 0;
                  return (
                    <li key={patient.id}>
                      <Link
                        href={`/admin/patients/${patient.id}`}
                        className="flex items-center justify-between gap-[14px] px-[20px] py-[13px] transition-colors hover:bg-[#faf9f7]"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-[14.5px] font-semibold text-[var(--color-clinic-navy)]">
                            {patient.full_name}
                          </span>
                          <span className="mt-[2px] block truncate text-[12.5px] text-[#8a857f]">
                            {displayPhone(patient.phone_e164) || patient.email}
                          </span>
                        </span>
                        <span
                          className={`shrink-0 text-[12.5px] font-semibold tabular-nums ${
                            overdue
                              ? "text-[var(--color-clinic-gold-hover)]"
                              : "text-[#8a857f]"
                          }`}
                        >
                          {overdue ? "overdue " : "due "}
                          {relativeDays(patient.recall_due_on)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>

          <Panel title="Newest enquiries" action={{ label: "All patients", href: "/admin/patients" }}>
            {recent.length === 0 ? (
              <PanelEmpty>
                No one in the directory yet. Share the intake link, or wait for
                the next Cal.com booking to land here on its own.
              </PanelEmpty>
            ) : (
              <ul className="divide-y divide-[#f1efeb]">
                {recent.map((patient) => (
                  <li key={patient.id}>
                    <Link
                      href={`/admin/patients/${patient.id}`}
                      className="flex items-center justify-between gap-[14px] px-[20px] py-[13px] transition-colors hover:bg-[#faf9f7]"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[14.5px] font-semibold text-[var(--color-clinic-navy)]">
                          {patient.full_name}
                        </span>
                        <span className="mt-[2px] block truncate text-[12.5px] text-[#8a857f]">
                          {SOURCE_LABELS[patient.source]}
                          {patient.treatment_interest.length > 0 &&
                            ` · ${treatmentLabel(patient.treatment_interest[0])}`}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-[10px]">
                        <StagePill
                          stage={patient.stage}
                          label={STAGE_LABELS[patient.stage]}
                        />
                        <span className="hidden text-[12px] tabular-nums text-[#a8a39c] sm:inline">
                          {relativeDays(patient.first_seen_at)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>

        <div className="grid gap-[16px] self-start">
          <Panel title="Coming up">
            {upcoming.length === 0 ? (
              <PanelEmpty>
                No upcoming bookings. Once the Cal.com webhook is connected,
                every booking appears here automatically.
              </PanelEmpty>
            ) : (
              <ul className="divide-y divide-[#f1efeb]">
                {upcoming.map((appointment) => (
                  <li key={appointment.id} className="px-[20px] py-[13px]">
                    <div className="flex items-baseline justify-between gap-[10px]">
                      <span className="truncate text-[14px] font-semibold text-[var(--color-clinic-navy)]">
                        {appointment.patient ? (
                          <Link
                            href={`/admin/patients/${appointment.patient.id}`}
                            className="transition-colors hover:text-[var(--color-clinic-teal)]"
                          >
                            {appointment.patient.full_name}
                          </Link>
                        ) : (
                          appointment.attendee_name ?? "Unknown"
                        )}
                      </span>
                      <span className="shrink-0 text-[12px] tabular-nums text-[#8a857f]">
                        {formatDateTime(appointment.starts_at)}
                      </span>
                    </div>
                    <p className="mt-[2px] truncate text-[12.5px] text-[#8a857f]">
                      {appointment.treatment ?? appointment.cal_event_slug ?? "Consultation"}
                      {appointment.clinic && ` · ${appointment.clinic === "lagos" ? "Lagos" : "Abuja"}`}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          {/* The ad-spend question: which channel is actually producing patients. */}
          <Panel title="Where they came from">
            {sources.length === 0 ? (
              <PanelEmpty>Nothing to chart yet.</PanelEmpty>
            ) : (
              <div className="grid gap-[11px] px-[20px] py-[17px]">
                <p className="text-[11.5px] text-[#a8a39c]">Last 90 days</p>
                {sources.map(({ source, count }) => (
                  <div key={source}>
                    <div className="mb-[4px] flex items-baseline justify-between gap-[10px]">
                      <span className="text-[13px] text-[#5a5651]">
                        {SOURCE_LABELS[source]}
                      </span>
                      <span className="text-[12.5px] font-semibold tabular-nums text-[var(--color-clinic-navy)]">
                        {count}
                      </span>
                    </div>
                    <div className="h-[5px] overflow-hidden rounded-full bg-[#f1efeb]">
                      <div
                        className="h-full rounded-full bg-[var(--color-clinic-teal)]"
                        style={{
                          width: `${Math.max(4, (count / sourceTotal) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          {stats.unconsented > 0 && (
            <Link
              href="/admin/patients?view=unconsented"
              className="group flex items-start gap-[12px] rounded-[14px] border border-[#eee6d5] bg-[#fdfaf3] px-[19px] py-[16px] transition-colors hover:border-[var(--color-clinic-gold)]"
            >
              <span className="min-w-0">
                <span className="block text-[13.5px] font-semibold text-[#8a6516]">
                  {stats.unconsented} patient{stats.unconsented === 1 ? "" : "s"} without
                  marketing consent
                </span>
                <span className="mt-[3px] block text-[12.5px] leading-[1.5] text-[#9d8348]">
                  Fine to contact them about their own care — but leave them out
                  of any broadcast.
                </span>
              </span>
              <ArrowUpRight
                className="mt-[2px] h-[15px] w-[15px] shrink-0 text-[#c6a673] transition-transform group-hover:translate-x-[2px]"
                aria-hidden
              />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
