// components/home/RevealStyles.tsx
"use client";
import React from "react";

export default function RevealStyles() {
  return (
    <>
      <style jsx global>{`
        /* Reveal-on-scroll base */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(16px) scale(0.995);
          transition: opacity 650ms cubic-bezier(.2,.9,.2,1), transform 650ms cubic-bezier(.2,.9,.2,1);
          will-change: transform, opacity;
        }
        .reveal-on-scroll.in-view {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Stagger children when container appears */
        .reveal-on-scroll.in-view > * {
          transform: none;
          transition: all 420ms ease;
        }

        /* Hover micro interactions */
        .project-card { transition: box-shadow 280ms ease, transform 280ms ease, border-color 280ms ease; }
        .project-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(2,6,23,0.12); border-color: rgba(255,196,12,0.18); }

        /* Filter button active animation */
        .filter-btn { transition: color 200ms ease, transform 200ms ease; }
        .filter-btn.active { color: #FFC40C; transform: translateY(-2px); }

        /* sticky image fade helper */
        .sticky-image { transition: opacity 700ms cubic-bezier(.2,.9,.2,1), transform 700ms cubic-bezier(.2,.9,.2,1); }

        /* small helpers */
        .fade-in-up { opacity: 0; transform: translateY(8px); transition: all 600ms cubic-bezier(.2,.9,.2,1); }
        .fade-in-up.in-view { opacity: 1; transform: translateY(0); }

        /* accessibility: respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .reveal-on-scroll, .project-card, .sticky-image, .fade-in-up, .filter-btn { transition: none !important; transform: none !important; opacity: 1 !important; }
        }
      `}</style>
    </>
  );
}
