"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { browserClient } from "../../lib/supabase/browser";

export default function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

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
      className="inline-flex h-[36px] items-center gap-[7px] rounded-full border border-[#dcd8d2] px-[14px] text-[12px] font-semibold text-[#5a5651] transition-colors hover:border-[#b9b4ad] hover:text-[var(--color-clinic-navy)] disabled:opacity-60"
    >
      <LogOut className="h-[14px] w-[14px]" aria-hidden />
      {busy ? "Signing out" : "Sign out"}
    </button>
  );
}
