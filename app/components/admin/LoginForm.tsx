"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { browserClient } from "../../lib/supabase/browser";

/**
 * Google is the only way in — there is no password to leak, reset, or email.
 * Signing in is open to any Google account; the `admin_users` roster is what
 * actually grants access, and RLS enforces it.
 */
export default function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [error, setError] = useState<string | null>(
    searchParams.get("error")
  );
  const [busy, setBusy] = useState(false);

  const signIn = async () => {
    setBusy(true);
    setError(null);

    const { error: oauthError } = await browserClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    // On success the browser is already navigating to Google, so this only
    // runs when the handoff itself failed.
    if (oauthError) {
      setError(oauthError.message);
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-[16px]">
      <button
        type="button"
        onClick={signIn}
        disabled={busy}
        className="inline-flex h-[48px] items-center justify-center gap-[10px] rounded-full border border-[#dcd8d2] bg-white px-[28px] text-[14px] font-semibold text-[var(--color-clinic-navy)] transition-colors hover:bg-[#f7f6f3] disabled:opacity-60"
      >
        {busy ? (
          <Loader2 className="h-[16px] w-[16px] animate-spin" aria-hidden />
        ) : (
          <GoogleMark />
        )}
        {busy ? "Redirecting to Google" : "Continue with Google"}
      </button>

      {error && (
        <p
          role="alert"
          className="rounded-[10px] bg-[#fdecec] px-[14px] py-[11px] text-[13px] leading-[1.5] text-[#a3312c]"
        >
          {error}
        </p>
      )}

      <p className="text-[12px] leading-[1.6] text-[#8a857f]">
        Only accounts on the admin roster can get in. If yours isn&apos;t on it
        yet, you&apos;ll be told how to add it.
      </p>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg className="h-[17px] w-[17px]" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}
