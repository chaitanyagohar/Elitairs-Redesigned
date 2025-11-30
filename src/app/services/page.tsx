// app/services/page.tsx  (client component)
"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

/* small Reveal helper (IntersectionObserver) */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setInView(true), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(.2,.9,.2,1)] transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

/* Services data — images must exist under /public/services/ */
const SERVICES = [
  {
    id: "research",
    title: "Research & Analysis",
    image: "/services/research.jpg",
    caption: "Data-driven market intelligence and valuations",
  },
  {
    id: "loan",
    title: "Home Loan Consulting",
    image: "/services/home-loan.jpg",
    caption: "Best-fit finance solutions for every purchase",
  },
  {
    id: "legal",
    title: "Legal Consultation",
    image: "/services/legal.jpg",
    caption: "Clear contracts, secure closings",
  },
  {
    id: "consulting",
    title: "Real Estate Consulting",
    image: "/services/consulting.jpg",
    caption: "Portfolio & feasibility advisory",
  },
  {
    id: "nri",
    title: "NRI Services",
    image: "/services/nri.jpg",
    caption: "Compliant, cross-border investment support",
  },
  {
    id: "after",
    title: "After Sales Assistance",
    image: "/services/after-sales.jpg",
    caption: "White-glove handovers & property management",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white antialiased">
      <Navbar />

      {/* HERO */}
      <header className="relative h-[44vh] md:h-[56vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2574&auto=format&fit=crop"
          alt="Services hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        <div className="relative z-10 max-w-4xl px-6">
          <p className="text-[#FFC40C] uppercase tracking-[0.32em] text-xs font-bold mb-4">What We Do</p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3 text-white">
            Premium Services, <span className="text-[#FFC40C]">Refined Delivery</span>
          </h1>
          <p className="text-gray-200 max-w-3xl mx-auto text-base md:text-lg font-light">
            Editorial-grade presentation of our core services — curated to protect and grow your capital.
          </p>
        </div>
      </header>

      {/* GRID: large image-first cards */}
      <main className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Signature Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mt-2">Image-led, editorial cards that showcase each service in depth.</p>
            </div>
          </Reveal>

          {/* Cards grid: two-column on lg, single on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <article className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500">
                  {/* Image block */}
                  <div className="relative h-72 md:h-[420px] lg:h-[460px] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover transform transition-transform duration-800 group-hover:scale-105"
                    />

                    {/* gradient overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                    {/* top-left small label */}
                    <div className="absolute left-6 top-6 z-20">
                      <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs uppercase tracking-widest">
                        Service
                      </div>
                    </div>

                    {/* centered title overlay */}
                    <div className="absolute left-6 right-6 bottom-8 z-30">
                      <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight drop-shadow-lg">{s.title}</h3>
                      <p className="mt-2 text-sm text-gray-200 max-w-lg">{s.caption}</p>
                    </div>
                  </div>

                  {/* content beneath image */}
                  <div className="bg-white px-6 md:px-10 py-8">
                    <p className="text-gray-700 mb-6">
                      {/* short editorial blurb — keep concise */}
                      {s.caption}. Our approach blends market insight, legal rigor and hands-on care so your investment performs.
                    </p>

                    <div className="flex items-center justify-between gap-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-5 py-3 rounded-md bg-[#FFC40C] text-black font-semibold uppercase tracking-wider text-xs shadow-md hover:scale-[1.02] transition-transform"
                      >
                        Consult Expert
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>

                      <a href="tel:+917081808180" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                        Or call <span className="font-semibold text-black">+91 70818 08180</span>
                      </a>
                    </div>
                  </div>

                  {/* subtle gold outline on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#FFC40C]/30 transition-colors duration-500" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className="py-16 bg-white p-5 text-white">
        <div className="mt-16">
            <Reveal delay={220}>
              <div className="rounded-2xl bg-[#0a0a0a] text-white p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold">Need a custom strategy?</h3>
                  <p className="text-gray-300 max-w-xl mt-2">Our consultants craft bespoke strategies that match your goals. Book a private consultation and let’s build something lasting.</p>
                </div>

                <div className="flex items-center gap-4">
                  <Link href="/contact" className="px-6 py-3 bg-[#FFC40C] text-black rounded-md font-semibold uppercase tracking-wider shadow-md">
                    Book Consultation
                  </Link>
                  <a href="tel:+917081808180" className="px-6 py-3 border border-white/10 rounded-md text-white hover:bg-white/30 transition-colors">Call +91 70818 08180</a>
                </div>
              </div>
            </Reveal>
          </div>
      </section>

      <Footer />

      {/* small inline CSS: reduced-motion support + minor tweaks */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .group-hover\\:scale-105 { transform: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
