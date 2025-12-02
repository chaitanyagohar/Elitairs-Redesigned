"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * HeroVideo
 * - split-text tagline animation (staggered words)
 * - cinematic video background
 * - subtle parallax on scroll for the video
 * - section-level reveal animation uses the .reveal class
 *
 * Put your video at /public/hero.mp4 (or change src).
 */

export default function HeroVideo() {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Split headline into words and wrap each word in a span with--i for stagger
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const text = el.dataset.text ?? el.textContent ?? "";
    const words = text.trim().split(/\s+/);
    el.innerHTML = words
      .map((w, i) => {
        // wrap punctuation-friendly
        const safe = w.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `<span class="word" style="--i:${i}">${safe}</span>`;
      })
      .join(" ");
  }, []);

  // Subtle parallax: translate video slower than scroll
  useEffect(() => {
    const handle = () => {
      if (!videoRef.current) return;
      const scrolled = window.scrollY;
      // small translate so video moves subtly
      videoRef.current.style.transform = `translateY(${scrolled * 0.06}px) scale(1.03)`;
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <section className="relative h-[100vh] w-full flex flex-col justify-center items-center pt-20 overflow-hidden">
      {/* VIDEO BACKGROUND */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />

      {/* CINEMATIC OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,196,12,0.06),_transparent_25%)] z-20 pointer-events-none" />


      {/* --- local styles --- */}
      <style jsx>{`
        /* headline: words style */
        .headline {
          display: inline-block;
        }

        .headline .word {
          display: inline-block;
          opacity: 0;
          transform: translateY(18px) rotateX(-6deg);
          will-change: transform, opacity;
          /* stagger using CSS var --i */
          animation: word-in 800ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
          animation-delay: calc(var(--i) * 70ms);
          margin-right: 10px;
        }

        @keyframes word-in {
          0% {
            opacity: 0;
            transform: translateY(18px) rotateX(-6deg) scale(0.995);
            filter: blur(4px);
          }
          60% {
            transform: translateY(-6px) rotateX(2deg) scale(1.01);
            opacity: 1;
            filter: blur(0);
          }
          100% {
            transform: translateY(0) rotateX(0deg) scale(1);
            opacity: 1;
            filter: none;
          }
        }

        /* reveal utility for paragraphs and other items */
        .reveal {
          opacity: 0;
          transform: translateY(8px);
          animation: reveal-up 800ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
        }
        .reveal.delay-100 {
          animation-delay: 100ms;
        }
        @keyframes reveal-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* small global-like animation helper used on search bar */
        .animate-fade-up {
          opacity: 0;
          transform: translateY(10px);
          animation: fade-up 650ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
        }
        .animate-fade-up.delay-200 {
          animation-delay: 200ms;
        }
        @keyframes fade-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* accessibility: reduce-motion respects */
        @media (prefers-reduced-motion: reduce) {
          .headline .word,
          .reveal,
          .animate-fade-up {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
