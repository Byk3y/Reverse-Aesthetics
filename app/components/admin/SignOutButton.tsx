"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { browserClient } from "../../lib/supabase/browser";

/** `dark` is for the admin rail; `light` for the standalone notice screens. */
export default function SignOutButton({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const styles =
    tone === "dark"
      ? "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
      : "border-[#dcd8d2] text-[#5a5651] hover:border-[#b9b4ad] hover:text-[var(--color-clinic-navy)]";

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await browserClient().auth.signOut();
        router.replace("/admin/login");
        router.refresh();
      }}
      className={`inline-flex h-[36px] items-center gap-[7px] rounded-full border px-[14px] text-[12px] font-semibold transition-colors disabled:opacity-60 ${styles}`}
    >
      <LogOut className="h-[14px] w-[14px]" aria-hidden />
      {busy ? "Signing out" : "Sign out"}
    </button>
  );
}
