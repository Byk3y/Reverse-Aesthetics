"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { addVisit } from "../../../lib/patients/actions";
import type { Clinic } from "../../../lib/patients/types";
import { TREATMENTS } from "../../booking/bookingData";

/**
 * Logging a visit is the single highest-value thing the desk can do in here:
 * it sets the money, and `recall_weeks` is what puts the patient back on the
 * "due back" list months later instead of them quietly never returning.
 */
export default function VisitForm({
  patientId,
  defaultClinic,
}: {
  patientId: string;
  defaultClinic: Clinic | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [treatment, setTreatment] = useState(TREATMENTS[0].id);
  const [performedAt, setPerformedAt] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [amount, setAmount] = useState("");
  const [practitioner, setPractitioner] = useState("");
  const [recallWeeks, setRecallWeeks] = useState("24");
  const [notes, setNotes] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;

    setError(null);
    startTransition(async () => {
      const result = await addVisit({
        patient_id: patientId,
        treatment,
        clinic: defaultClinic,
        performed_at: performedAt,
        practitioner: practitioner || null,
        amount: Number(amount.replace(/[^0-9.]/g, "")) || 0,
        recall_weeks: recallWeeks ? Number(recallWeeks) : null,
        notes: notes || null,
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setAmount("");
      setNotes("");
      setOpen(false);
      router.refresh();
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-[7px] border-b border-[#f1efeb] px-[20px] py-[13px] text-[12.5px] font-semibold text-[var(--color-clinic-teal)] transition-colors hover:bg-[#faf9f7]"
      >
        <Plus className="h-[14px] w-[14px]" aria-hidden />
        Log a visit
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="border-b border-[#f1efeb] bg-[#faf9f7] px-[20px] py-[17px]">
      <div className="mb-[13px] flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a857f]">
          Log a visit
        </h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cancel"
          className="text-[#a8a39c] transition-colors hover:text-[var(--color-clinic-navy)]"
        >
          <X className="h-[15px] w-[15px]" aria-hidden />
        </button>
      </div>

      <div className="grid gap-[12px] sm:grid-cols-2">
        <Labelled label="Treatment">
          <select
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            className={INPUT}
          >
            {TREATMENTS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </Labelled>

        <Labelled label="Date">
          <input
            type="date"
            value={performedAt}
            onChange={(e) => setPerformedAt(e.target.value)}
            className={INPUT}
          />
        </Labelled>

        <Labelled label="Amount paid (₦)">
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="250000"
            className={INPUT}
          />
        </Labelled>

        <Labelled label="Bring back in (weeks)" hint="Blank for no recall">
          <input
            type="number"
            min={0}
            value={recallWeeks}
            onChange={(e) => setRecallWeeks(e.target.value)}
            className={INPUT}
          />
        </Labelled>

        <Labelled label="Practitioner">
          <input
            type="text"
            value={practitioner}
            onChange={(e) => setPractitioner(e.target.value)}
            className={INPUT}
          />
        </Labelled>

        <Labelled label="Note" hint="Non-clinical">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Wants to redo before December"
            className={INPUT}
          />
        </Labelled>
      </div>

      {error && (
        <p role="alert" className="mt-[10px] text-[12px] text-[#a3312c]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-[14px] inline-flex h-[36px] items-center gap-[7px] rounded-full bg-[var(--color-clinic-navy)] px-[18px] text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-black disabled:opacity-60"
      >
        {pending && <Loader2 className="h-[13px] w-[13px] animate-spin" aria-hidden />}
        Save visit
      </button>
    </form>
  );
}

const INPUT =
  "h-[40px] w-full rounded-[9px] border border-[#e0dcd6] bg-white px-[12px] text-[13.5px] text-[var(--color-clinic-navy)] outline-none transition-colors placeholder:text-[#b5b0a9] focus:border-[var(--color-clinic-teal)]";

function Labelled({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-[5px] block text-[10.5px] font-bold uppercase tracking-[0.11em] text-[#8a857f]">
        {label}
        {hint && (
          <span className="ml-[6px] font-medium normal-case tracking-normal text-[#b5b0a9]">
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
