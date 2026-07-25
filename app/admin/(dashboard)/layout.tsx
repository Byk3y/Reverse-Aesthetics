import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink } from "lucide-react";
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

  return (
    <div
      className="min-h-screen bg-[#f7f6f3]"
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <header className="sticky top-0 z-50 border-b border-[#e6e2dc] bg-white">
        <div className="mx-auto flex h-[64px] max-w-[1180px] items-center justify-between px-[20px] md:px-[32px]">
          <div className="flex items-center gap-[26px]">
            <Link
              href="/admin"
              className="inline-flex items-baseline gap-[5px] text-[15px] font-bold uppercase tracking-[0.08em] text-[var(--color-clinic-navy)]"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Reverse
              <span className="font-extrabold text-[var(--color-clinic-teal)]">
                Admin
              </span>
            </Link>
            <nav className="hidden items-center gap-[20px] md:flex">
              <Link
                href="/admin"
                className="text-[13px] font-semibold text-[#5a5651] transition-colors hover:text-[var(--color-clinic-teal)]"
              >
                Posts
              </Link>
              <Link
                href="/blog"
                target="_blank"
                className="inline-flex items-center gap-[5px] text-[13px] font-semibold text-[#5a5651] transition-colors hover:text-[var(--color-clinic-teal)]"
              >
                View blog
                <ExternalLink className="h-[12px] w-[12px]" aria-hidden />
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-[14px]">
            <span className="hidden text-[12px] text-[#8a857f] sm:inline">
              {admin.admin.full_name || user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      {children}
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
          3. Run{" "}
          <code className="font-mono text-[13px]">
            supabase/migrations/0001_blog_schema.sql
          </code>{" "}
          in the Supabase SQL editor.
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
