"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Users, FileText } from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutGrid, exact: true },
  { href: "/admin/patients", label: "Patients", icon: Users, exact: false },
  { href: "/admin/posts", label: "Blog", icon: FileText, exact: false },
];

export default function AdminNav({ variant }: { variant: "rail" | "bar" }) {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  if (variant === "bar") {
    return (
      <nav className="flex items-center gap-[4px]">
        {ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex h-[36px] items-center gap-[7px] rounded-full px-[14px] text-[13px] font-semibold transition-colors ${
                active
                  ? "bg-white/[0.12] text-white"
                  : "text-white/60 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <Icon className="h-[15px] w-[15px]" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="grid gap-[3px]">
      {ITEMS.map(({ href, label, icon: Icon, exact }) => {
        const active = isActive(href, exact);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`group relative flex h-[42px] items-center gap-[12px] rounded-[10px] pl-[15px] pr-[12px] text-[14px] font-semibold transition-colors ${
              active
                ? "bg-white/[0.09] text-white"
                : "text-white/55 hover:bg-white/[0.05] hover:text-white/90"
            }`}
          >
            {/* The teal marker is the only saturated thing in the rail, so the
                current section reads instantly at the edge of vision. */}
            <span
              className={`absolute left-0 h-[18px] w-[3px] rounded-r-full bg-[var(--color-clinic-teal-bright)] transition-opacity ${
                active ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden
            />
            <Icon
              className={`h-[17px] w-[17px] transition-colors ${
                active ? "text-[var(--color-clinic-teal-bright)]" : ""
              }`}
              aria-hidden
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
