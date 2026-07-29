import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink } from "lucide-react";
import AdminNav from "../../components/admin/AdminNav";
import SignOutButton from "../../components/admin/SignOutButton";
import { currentUser, currentAdmin } from "../../lib/supabase/server";
import { isSupabaseConfigured } from "../../lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin | Reverse Aesthetics",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) return <NotConfigured />;

  const user = await currentUser();
  if (!user) redirect("/admin/login");

  // Signed in but not on the roster: RLS would block every write anyway,
  // so say so plainly instead of showing an admin UI that silently fails.
  const admin = await currentAdmin();
  if (!admin) return <NoAccess email={user.email ?? ""} />;

  const who = admin.admin.full_name || user.email || "";

  return (
    <div
      className="min-h-screen bg-[#f7f6f3] lg:flex"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      {/* ---- Rail (desktop) ----------------------------------------
          Dark and permanent, deliberately unlike the public site's airy top
          nav: this is a tool the clinic sits inside all day, not a page they
          pass through. */}
      <aside className="sticky top-0 hidden h-screen w-[236px] shrink-0 flex-col justify-between bg-[var(--color-clinic-navy)] px-[16px] py-[22px] lg:flex">
        <div>
          <Link
            href="/admin"
            className="mb-[28px] flex items-baseline gap-[5px] px-[13px] text-[15px] font-bold uppercase tracking-[0.08em] text-white"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Reverse
            <span className="font-extrabold text-[var(--color-clinic-teal-bright)]">
              Admin
            </span>
          </Link>

          <AdminNav variant="rail" />
        </div>

        <div className="grid gap-[14px] border-t border-white/10 px-[13px] pt-[18px]">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-[6px] text-[12.5px] font-semibold text-white/50 transition-colors hover:text-white"
          >
            View site
            <ExternalLink className="h-[12px] w-[12px]" aria-hidden />
          </Link>
          <p className="truncate text-[12px] text-white/40" title={who}>
            {who}
          </p>
          <div>
            <SignOutButton tone="dark" />
          </div>
        </div>
      </aside>

      {/* ---- Bar (mobile) ---- */}
      <header className="sticky top-0 z-50 bg-[var(--color-clinic-navy)] px-[16px] py-[12px] lg:hidden">
        <div className="mb-[10px] flex items-center justify-between">
          <Link
            href="/admin"
            className="flex items-baseline gap-[5px] text-[14px] font-bold uppercase tracking-[0.08em] text-white"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Reverse
            <span className="font-extrabold text-[var(--color-clinic-teal-bright)]">
              Admin
            </span>
          </Link>
          <SignOutButton tone="dark" />
        </div>
        <div className="-mx-[16px] overflow-x-auto px-[16px]">
          <AdminNav variant="bar" />
        </div>
      </header>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[var(--color-clinic-hero-top)] px-[20px] py-[60px]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <div className="w-full max-w-[520px] rounded-[20px] border border-[#e6e2dc] bg-white p-[30px] md:p-[38px]">
        {children}
      </div>
    </main>
  );
}

function NotConfigured() {
  return (
    <Shell>
      <h1 className="mb-[12px] text-[22px] font-semibold text-[var(--color-clinic-navy)]">
        Supabase isn&apos;t connected yet
      </h1>
      <p className="mb-[18px] text-[15px] leading-[1.7] text-[#5a5651]">
        The admin needs your Supabase project credentials before it can do
        anything.
      </p>
      <ol className="grid gap-[10px] text-[14px] leading-[1.65] text-[#5a5651]">
        <li>
          1. Copy <code className="font-mono text-[13px]">.env.local.example</code> to{" "}
          <code className="font-mono text-[13px]">.env.local</code>.
        </li>
        <li>2. Paste in your project URL and anon key.</li>
        <li>
          3. Run the files in{" "}
          <code className="font-mono text-[13px]">supabase/migrations/</code> in
          order, in the Supabase SQL editor.
        </li>
        <li>4. Restart the dev server.</li>
      </ol>
      <p className="mt-[20px] text-[14px] text-[#8a857f]">
        Full walkthrough in <code className="font-mono text-[13px]">BLOG_SETUP.md</code>.
      </p>
    </Shell>
  );
}

function NoAccess({ email }: { email: string }) {
  return (
    <Shell>
      <h1 className="mb-[12px] text-[22px] font-semibold text-[var(--color-clinic-navy)]">
        This account doesn&apos;t have admin access
      </h1>
      <p className="mb-[22px] text-[15px] leading-[1.7] text-[#5a5651]">
        You&apos;re signed in as{" "}
        <span className="font-semibold text-[var(--color-clinic-navy)]">{email}</span>,
        but that address isn&apos;t on the admin allowlist.
      </p>
      <p className="text-[14px] leading-[1.65] text-[#8a857f]">
        Ask someone who already has access to add it, then sign in again —
        you&apos;ll be let in automatically, no reload dance required.
      </p>
      <div className="mt-[24px]">
        <SignOutButton />
      </div>
    </Shell>
  );
}
