import Link from "next/link";

function href(base: string, page: number) {
  return page <= 1 ? base : `${base}/page/${page}`;
}

export default function Pagination({
  base = "/blog",
  page,
  totalPages,
}: {
  base?: string;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1
  );

  const box =
    "inline-flex h-[42px] min-w-[42px] items-center justify-center rounded-full px-[14px] text-[13px] font-semibold transition-colors";

  return (
    <nav aria-label="Pagination" className="mt-[56px] flex justify-center">
      <ul className="flex items-center gap-[8px]">
        {page > 1 && (
          <li>
            <Link
              href={href(base, page - 1)}
              rel="prev"
              className={`${box} border border-[#e2ded8] text-[#5a5651] hover:border-[var(--color-clinic-teal)] hover:text-[var(--color-clinic-teal)]`}
            >
              Previous
            </Link>
          </li>
        )}

        {pages.map((n, i) => {
          const gap = i > 0 && n - pages[i - 1] > 1;
          return (
            <li key={n} className="flex items-center gap-[8px]">
              {gap && <span className="text-[13px] text-[#b6b1aa]">…</span>}
              <Link
                href={href(base, n)}
                aria-current={n === page ? "page" : undefined}
                className={`${box} ${
                  n === page
                    ? "bg-[var(--color-clinic-navy)] text-white"
                    : "border border-[#e2ded8] text-[#5a5651] hover:border-[var(--color-clinic-teal)] hover:text-[var(--color-clinic-teal)]"
                }`}
              >
                {n}
              </Link>
            </li>
          );
        })}

        {page < totalPages && (
          <li>
            <Link
              href={href(base, page + 1)}
              rel="next"
              className={`${box} border border-[#e2ded8] text-[#5a5651] hover:border-[var(--color-clinic-teal)] hover:text-[var(--color-clinic-teal)]`}
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
