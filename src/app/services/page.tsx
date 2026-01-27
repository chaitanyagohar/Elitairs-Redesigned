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
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(.2,.9,.2,1)] transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

const PARTNERS = ["Global Trust Bank", "Apex Financial", "Heritage Federal", "Skyline Capital", "Unity Savings", "Summit Mortgage"];

const SERVICES = [
  {
    id: "research",
    title: "Research & Analysis",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    description: "In an era of volatile markets, data is your greatest asset. We provide institutional-grade intelligence that moves beyond surface-level listings to uncover true value.",
    features: ["Comparative Market Analysis", "Investment Yield Projection", "Risk Assessment Reports", "Micro-market Benchmarking"],
  },
  {
    id: "loan",
    title: "Home Loan Consulting",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2511&auto=format&fit=crop",
    description: "Strategic debt management is key to long-term wealth. We simplify the complexities of lending by matching your profile with the ideal financial institution.",
    features: ["Debt Structuring", "ROI Optimization", "Pre-approval Coordination", "Lender Comparison"],
  },
  {
    id: "legal",
    title: "Legal Consultation",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2670&auto=format&fit=crop",
    description: "Protecting your investment starts with ironclad due diligence. Our legal framework ensures that every contract is transparent and every title is undisputed.",
    features: ["Title Due Diligence", "Agreement Drafting", "RERA Compliance Check", "Registration Support"],
  },
  {
    id: "consulting",
    title: "Real Estate Consulting",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80&w=2670&auto=format&fit=crop",
    description: "Personalized advisory services for high-net-worth portfolios. We focus on asset allocation and feasibility studies to maximize your capital appreciation.",
    features: ["Portfolio Diversification", "Feasibility Studies", "Exit Strategy Planning", "Asset Management"],
  },
  {
    id: "nri",
    title: "NRI Services",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2670&auto=format&fit=crop",
    description: "Bespoke solutions for the global Indian. We handle the intricacies of FEMA regulations and remote property management so you can invest with total peace of mind.",
    features: ["FEMA Compliance", "Virtual Property Tours", "Repatriation Advisory", "Remote Documentation"],
  },
  {
    id: "after",
    title: "After Sales Assistance",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop",
    description: "Our commitment extends far beyond the closing date. We ensure a seamless transition into your property with white-glove management and utility coordination.",
    features: ["Possession Management", "Interior Coordination", "Tenant Sourcing", "Utility Transfers"],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white antialiased">
      <Navbar />

      {/* HERO SECTION */}
      <header className="relative h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
          alt="Services hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-4xl px-6">
          <Reveal>
            <p className="text-[#FFC40C] uppercase tracking-[0.4em] text-[10px] font-bold mb-4">The Gold Standard</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-white">
              Strategic <span className="text-[#FFC40C]">Advisory</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              Transforming real estate transactions into long-term wealth assets through rigorous analysis and white-glove service.
            </p>
          </Reveal>
        </div>
      </header>

      {/* BANKING PARTNERS STRIP */}
      <section className="bg-gray-50 border-y border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] uppercase tracking-widest text-gray-400 mb-6 font-bold">Trusted Banking Partners for Seamless Loans</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {PARTNERS.map((bank) => (
              <span key={bank} className="text-lg md:text-xl font-serif font-semibold italic text-gray-800 tracking-tight">
                {bank}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <main className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-20 text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our Core Competencies</h2>
              <div className="h-1 w-20 bg-[#FFC40C] mx-auto mt-6" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 100}>
                <article className="group flex flex-col h-full border-b border-gray-100 pb-12">
                  <div className="relative h-80 md:h-[400px] overflow-hidden rounded-2xl mb-8">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#FFC40C] transition-colors">{s.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {s.description}
                    </p>
                    
                    {/* KEYWORDS / FEATURES */}
                    <div className="flex flex-wrap gap-3 mb-10">
                      {s.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC40C]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <Link
                        href="/contact"
                        className="w-full sm:w-auto text-center px-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#FFC40C] hover:text-black transition-all duration-300 rounded-md"
                      >
                        Inquire Now
                      </Link>
                      <span className="hidden sm:block h-[1px] w-12 bg-gray-300" />
                      <p className="text-sm font-medium">Ref ID: 00{i + 1}/SRV</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      {/* FINAL CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="bg-[#0a0a0a] rounded-[2rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
               {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC40C] opacity-10 blur-[100px] rounded-full -mr-32 -mt-32" />
              
              <h3 className="text-3xl md:text-5xl font-bold mb-6">Ready for a Private Briefing?</h3>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-light">
                Our advisors are available for one-on-one consultations to discuss your specific portfolio requirements.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto px-10 py-4 bg-[#FFC40C] text-black rounded-md font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                  Book Appointment
                </Link>
                <a href="tel:+917081808180" className="w-full sm:w-auto px-10 py-4 border border-white/20 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">
                  Contact Support
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}