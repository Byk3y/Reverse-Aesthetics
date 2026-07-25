"use client";

import { useEffect, useState } from "react";

/** Thin teal bar pinned under the navbar showing progress through the article. */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.getElementById("article-body");
    if (!article) return;

    const update = () => {
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(rect.bottom <= window.innerHeight ? 100 : 0);
        return;
      }
      const scrolled = (-rect.top / total) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[120] h-[3px] w-full bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-[var(--color-clinic-teal)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
