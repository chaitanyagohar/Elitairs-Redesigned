// components/home/ScrollReveal.tsx
"use client";

import { useEffect } from "react";

/**
 * Attach to the app root once. It will add `.in-view` to elements with
 * the class `reveal-on-scroll` when they enter the viewport.
 *
 * Also supports `data-delay` (ms) on each element to stagger.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll"));

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const delay = Number(el.dataset.delay ?? 0);
            if (delay > 0) {
              setTimeout(() => el.classList.add("in-view"), delay);
            } else {
              el.classList.add("in-view");
            }
            io.unobserve(el);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
