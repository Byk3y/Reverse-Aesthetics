"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deletePatient } from "../../../lib/patients/actions";

/**
 * Right to erasure. A patient can ask to be taken off the books and the clinic
 * has to be able to do it without calling a developer, so this lives on the
 * record rather than in a settings page nobody finds.
 */
export default function DeletePatientButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="text-right">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (
            !window.confirm(
              `Erase ${name}? This permanently deletes their record, notes and visit history. Appointments already booked on Cal.com are not cancelled.`
            )
          ) {
            return;
          }
          setError(null);
          startTransition(async () => {
            const result = await deletePatient(id);
            if (!result.ok) {
              setError(result.error);
              return;
            }
            router.push("/admin/patients");
            router.refresh();
          });
        }}
        className="text-[12px] font-semibold text-[#b5b0a9] transition-colors hover:text-[#a3312c] disabled:opacity-60"
      >
        {pending ? "Erasing…" : "Erase this patient"}
      </button>
      {error && (
        <p role="alert" className="mt-[6px] text-[12px] text-[#a3312c]">
          {error}
        </p>
      )}
    </div>
  );
}
