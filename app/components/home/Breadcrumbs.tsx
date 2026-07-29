import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { SITE_URL } from "../../lib/site";

export interface Crumb {
  label: string;
  href?: string;
}

/* Inner-page wayfinding. The navbar is hamburger-only, so without this the
   logo is the only visible route back — not discoverable enough on a page
   someone landed on straight from search or an ad. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  /* Mirrors the visible trail so Google renders it in the result snippet.
     `item` is omitted on the final crumb — it's the current page, and the
     spec treats a trailing self-URL as optional. */
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.label,
        ...(crumb.href && index !== items.length - 1
          ? { item: `${SITE_URL}${crumb.href}` }
          : {}),
      })),
    ],
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-[1160px] px-[20px] pt-[22px] md:px-[40px] md:pt-[28px]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ol className="flex flex-wrap items-center justify-center gap-x-[6px] gap-y-[4px] text-[12px] font-semibold uppercase tracking-[0.1em] md:text-[13px]">
        <li className="flex items-center gap-[6px]">
          <Link
            href="/"
            className="text-[var(--color-clinic-teal)] transition-colors hover:text-[var(--color-clinic-teal-dark)]"
          >
            Home
          </Link>
          <ChevronRight className="h-[13px] w-[13px] text-[#b3bcb9]" aria-hidden />
        </li>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-[6px]">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="text-[var(--color-clinic-teal)] transition-colors hover:text-[var(--color-clinic-teal-dark)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-[#8a938f]">
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRight className="h-[13px] w-[13px] text-[#b3bcb9]" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
