"use client";

import { useEffect, useState } from "react";
import type { Heading } from "../../lib/blog/format";

/** Sticky in-article nav with a scroll spy. Desktop only. */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer whichever tracked heading sits highest in the viewport.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
          return;
        }

        // Nothing visible (mid-section scroll): fall back to the last heading
        // that has scrolled past the top of the viewport.
        const passed = elements.filter(
          (el) => el.getBoundingClientRect().top < 140
        );
        if (passed.length > 0) setActiveId(passed[passed.length - 1].id);
      },
      { rootMargin: "-130px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page" className="sticky top-[130px]">
      <p className="mb-[16px] text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a857f]">
        On this page
      </p>
      <ul className="border-l border-[#e6e2dc]">
        {headings.map((heading) => {
          const active = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`-ml-px block border-l-[2px] py-[7px] text-[13px] leading-[1.45] transition-colors ${
                  heading.level === 3 ? "pl-[26px]" : "pl-[16px]"
                } ${
                  active
                    ? "border-[var(--color-clinic-teal)] font-semibold text-[var(--color-clinic-navy)]"
                    : "border-transparent text-[#7d7872] hover:text-[var(--color-clinic-teal)]"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
