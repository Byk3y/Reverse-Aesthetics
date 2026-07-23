"use client";

import { useEffect } from "react";

const MOTION_SELECTOR = ".motion-heading, .motion-card, .reveal-on-scroll";

export default function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(MOTION_SELECTOR)
    );

    root.classList.add("js-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("is-visible");
          target.dataset.motionSeen = "true";
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("js-motion-ready");
    };
  }, []);

  return null;
}
