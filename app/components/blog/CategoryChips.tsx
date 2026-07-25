import Link from "next/link";
import type { Category } from "../../lib/blog/types";

export default function CategoryChips({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  if (categories.length === 0) return null;

  const chip =
    "inline-flex h-[38px] items-center justify-center rounded-full border px-[20px] text-[12px] font-semibold tracking-[0.02em] transition-colors whitespace-nowrap";

  return (
    <nav aria-label="Blog categories" className="-mx-[20px] px-[20px] md:mx-0 md:px-0">
      <ul className="flex gap-[10px] overflow-x-auto pb-[4px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <li>
          <Link
            href="/blog"
            className={`${chip} ${
              activeSlug
                ? "border-[#e2ded8] text-[#5a5651] hover:border-[var(--color-clinic-teal)] hover:text-[var(--color-clinic-teal)]"
                : "border-[var(--color-clinic-navy)] bg-[var(--color-clinic-navy)] text-white"
            }`}
          >
            All articles
          </Link>
        </li>
        {categories.map((category) => {
          const active = category.slug === activeSlug;
          return (
            <li key={category.id}>
              <Link
                href={`/blog/category/${category.slug}`}
                className={`${chip} ${
                  active
                    ? "border-[var(--color-clinic-navy)] bg-[var(--color-clinic-navy)] text-white"
                    : "border-[#e2ded8] text-[#5a5651] hover:border-[var(--color-clinic-teal)] hover:text-[var(--color-clinic-teal)]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
