"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { addNote } from "../../../lib/patients/actions";
import { LOGGABLE_KINDS, NOTE_KIND_LABELS, type NoteKind } from "../../../lib/patients/types";

export default function NoteComposer({ patientId }: { patientId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [kind, setKind] = useState<NoteKind>("note");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (pending || !body.trim()) return;

    setError(null);
    startTransition(async () => {
      const result = await addNote(patientId, kind, body);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setBody("");
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="border-b border-[#f1efeb] px-[20px] py-[16px]">
      <div className="mb-[10px] flex flex-wrap gap-[6px]">
        {LOGGABLE_KINDS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setKind(option)}
            aria-pressed={kind === option}
            className={`inline-flex h-[29px] items-center rounded-full px-[12px] text-[11.5px] font-semibold transition-colors ${
              kind === option
                ? "bg-[var(--color-clinic-navy)] text-white"
                : "border border-[#e0dcd6] bg-white text-[#5a5651] hover:border-[#b9b4ad]"
            }`}
          >
            {NOTE_KIND_LABELS[option]}
          </button>
        ))}
      </div>

      <textarea
        rows={2}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Spoke to her about filler pricing — sending the Lagos price list."
        className="w-full resize-y rounded-[10px] border border-[#e0dcd6] bg-[#fcfbf9] px-[13px] py-[10px] text-[14px] leading-[1.55] text-[var(--color-clinic-navy)] outline-none transition-colors placeholder:text-[#b5b0a9] focus:border-[var(--color-clinic-teal)] focus:bg-white"
      />

      <div className="mt-[10px] flex items-center gap-[10px]">
        <button
          type="submit"
          disabled={pending || !body.trim()}
          className="inline-flex h-[36px] items-center gap-[7px] rounded-full bg-[var(--color-clinic-teal)] px-[18px] text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-clinic-teal-dark)] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {pending && <Loader2 className="h-[13px] w-[13px] animate-spin" aria-hidden />}
          Log it
        </button>
        {error && (
          <span role="alert" className="text-[12px] text-[#a3312c]">
            {error}
          </span>
        )}
      </div>
    </form>
  );
}
