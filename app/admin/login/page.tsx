import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "../../components/admin/LoginForm";
import { isSupabaseConfigured } from "../../lib/supabase/config";

export const metadata: Metadata = {
  title: "Sign in | Reverse Aesthetics Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[var(--color-clinic-hero-top)] px-[20px] py-[60px]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <div className="w-full max-w-[420px]">
        <Link
          href="/"
          className="mb-[30px] inline-flex items-baseline gap-[6px] text-[18px] font-bold uppercase tracking-[0.08em] text-[var(--color-clinic-navy)]"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          Reverse
          <span className="font-extrabold text-[var(--color-clinic-teal)]">
            Aesthetics
          </span>
        </Link>

        <div className="rounded-[20px] border border-[#e6e2dc] bg-white p-[28px] md:p-[34px]">
          <h1 className="mb-[8px] text-[24px] font-semibold tracking-[-0.01em] text-[var(--color-clinic-navy)]">
            Admin
          </h1>
          <p className="mb-[26px] text-[14px] leading-[1.6] text-[#5a5651]">
            Sign in to manage the site.
          </p>

          {isSupabaseConfigured() ? (
            <Suspense
              fallback={<div className="h-[240px] animate-pulse rounded-[10px] bg-[#f4f2ee]" />}
            >
              <LoginForm />
            </Suspense>
          ) : (
            <div className="rounded-[12px] bg-[#fff8e8] p-[18px] text-[13px] leading-[1.65] text-[#7a5a12]">
              <p className="mb-[8px] font-semibold">Supabase isn&apos;t connected yet.</p>
              <p>
                Add <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
                <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
                <code className="font-mono">.env.local</code>, then restart the dev
                server. See <code className="font-mono">BLOG_SETUP.md</code>.
              </p>
            </div>
          )}
        </div>

        <p className="mt-[20px] text-center text-[13px] text-[#8a857f]">
          <Link href="/" className="transition-colors hover:text-[var(--color-clinic-teal)]">
            ← Back to the website
          </Link>
        </p>
      </div>
    </main>
  );
}
