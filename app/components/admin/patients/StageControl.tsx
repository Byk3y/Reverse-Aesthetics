"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { setStage } from "../../../lib/patients/actions";
import { DORMANT, STAGES, type PatientStage } from "../../../lib/patients/types";

/**
 * The funnel as a rail rather than a dropdown.
 *
 * A dropdown hides where someone is; this shows it at a glance and makes the
 * next step the obvious thing to click, which is the whole job of a CRM.
 */
export default function StageControl({
  patientId,
  stage,
}: {
  patientId: string;
  stage: PatientStage;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const current = STAGES.findIndex((s) => s.value === stage);
  const dormant = stage === "dormant";

  const move = (next: PatientStage) => {
    if (pending || next === stage) return;
    setError(null);
    startTransition(async () => {
      const result = await setStage(patientId, next);
      if (!result.ok) setError(result.error);
      else router.refresh();
    });
  };

  return (
    <div className={pending ? "opacity-60 transition-opacity" : "transition-opacity"}>
      <div className="mb-[10px] flex items-center justify-between gap-[10px]">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a857f]">
          Stage
        </h2>
        <button
          type="button"
          onClick={() => move(dormant ? "lead" : "dormant")}
          className="text-[11.5px] font-semibold text-[#a8a39c] transition-colors hover:text-[var(--color-clinic-navy)]"
        >
          {dormant ? "Bring back" : "Mark dormant"}
        </button>
      </div>

      {dormant ? (
        <p className="rounded-[10px] border border-[#eae7e2] bg-[#f7f6f3] px-[15px] py-[13px] text-[13px] leading-[1.55] text-[#8a857f]">
          {DORMANT.hint}. They stay in the directory and out of the recall list.
        </p>
      ) : (
        <div className="flex gap-[4px]">
          {STAGES.map((step, index) => {
            const reached = index <= current;
            const isCurrent = index === current;
            return (
              <button
                key={step.value}
                type="button"
                onClick={() => move(step.value)}
                title={step.hint}
                aria-current={isCurrent ? "step" : undefined}
                className="group min-w-0 flex-1 text-left"
              >
                <span
                  className={`block h-[5px] rounded-full transition-colors ${
                    reached
                      ? "bg-[var(--color-clinic-teal)]"
                      : "bg-[#eae7e2] group-hover:bg-[#d5d0c9]"
                  }`}
                />
                <span
                  className={`mt-[8px] block truncate text-[11px] font-semibold leading-[1.3] transition-colors ${
                    isCurrent
                      ? "text-[var(--color-clinic-navy)]"
                      : "text-[#a8a39c] group-hover:text-[#5a5651]"
                  }`}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <p role="alert" className="mt-[10px] text-[12px] text-[#a3312c]">
          {error}
        </p>
      )}
    </div>
  );
}
