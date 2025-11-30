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

      {/* CONTENT */}
      <div className="relative z-30 text-center px-4 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* SPLIT-TEXT HEADLINE */}
        <h1
          ref={headlineRef}
          data-text="FIND YOUR DREAM HOME"
          className="headline text-5xl md:text-7xl font-sans font-medium text-white mb-6 tracking-wide drop-shadow-lg leading-tight"
          aria-label="Find your dream home"
        >
          FIND YOUR DREAM HOME
        </h1>

        {/* Subheadline */}
        <p className="text-gray-100 text-base md:text-lg max-w-3xl mb-12 font-light tracking-wide leading-relaxed opacity-0 transform translate-y-3 reveal delay-100">
          We are recognized for exceeding client expectations and delivering
          great results through dedication and ease of process.
        </p>

        {/* SEARCH BAR */}
        <div className="w-full max-w-5xl bg-white rounded-md flex flex-col md:flex-row shadow-2xl overflow-hidden animate-fade-up p-1">
          <div className="md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 relative bg-white">
            <select
              name="type"
              className="w-full h-full p-4 bg-transparent appearance-none outline-none font-bold text-gray-700 cursor-pointer text-sm uppercase tracking-wide"
            >
              <option value="">Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
              ▼
            </div>
          </div>

          <div className="md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200 bg-white">
            <input
              type="text"
              name="search"
              placeholder="Search by Developer (e.g. DLF) or Project Name..."
              className="w-full h-full p-4 outline-none placeholder-gray-400 text-black font-medium text-sm"
            />
          </div>

          <div className="md:w-1/4 bg-[#FFC40C]">
            <button className="w-full h-full text-black font-bold uppercase tracking-widest p-4 hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 text-sm">
              <span>Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* PREMIUM CHIPS (replaces icons) */}
       <div className="mt-16 w-full animate-fade-up delay-200">
  <p className="text-white/90 uppercase tracking-widest text-xs font-bold mb-6">
    Signature Services
  </p>

  <div className="flex flex-wrap justify-center gap-4">

    {/* BESPOKE CONSULTATIONS */}
    <div
      className="group px-5 py-3 rounded-full bg-white/20 border border-white/10 backdrop-blur-sm text-white text-sm font-medium tracking-wide uppercase shadow-xl hover:scale-105 transform transition-all duration-400 reveal-on-load flex items-center gap-2"
      style={{ transitionDelay: `0ms` }}
    >
      <span className="text-lg opacity-80 group-hover:opacity-100">🧭</span>
      <span>Bespoke Consultations</span>
    </div>

    {/* CINEMATIC PROPERTY TOURS */}
    <div
      className="group px-5 py-3 rounded-full bg-white/20 border border-white/10 backdrop-blur-sm text-white text-sm font-medium tracking-wide uppercase shadow-xl hover:scale-105 transform transition-all duration-400 reveal-on-load flex items-center gap-2"
      style={{ transitionDelay: `80ms` }}
    >
      <span className="text-lg opacity-80 group-hover:opacity-100">🎥</span>
      <span>Cinematic Property Tours</span>
    </div>

    {/* WEALTH-BUILDING PORTFOLIOS */}
    <div
      className="group px-5 py-3 rounded-full bg-white/20 border border-white/10 backdrop-blur-sm text-white text-sm font-medium tracking-wide uppercase shadow-xl hover:scale-105 transform transition-all duration-400 reveal-on-load flex items-center gap-2"
      style={{ transitionDelay: `160ms` }}
    >
      <span className="text-lg opacity-80 group-hover:opacity-100">💼</span>
      <span>Wealth-Building Portfolios</span>
    </div>

  </div>
</div>

      </div>

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
