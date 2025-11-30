"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

// --- Scroll Reveal Component ---
function Reveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function ConsultingPage() {
  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white overflow-hidden">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[70vh] flex flex-col justify-center items-center text-center px-6 pt-20">
         <div className="absolute inset-0 z-0">
            <img 
              src="/cons.jpg"
              className="w-full h-full object-cover opacity-100"
              alt="Consulting Hero" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-white/10 to-black/70" />
         </div>

         <div className="relative z-10 max-w-4xl">
            <Reveal>
              <p className="text-[#FFC40C] uppercase tracking-[0.3em] text-xs font-bold mb-6">Strategic Advisory</p>
              <h1 className="text-6xl md:text-8xl font-medium mb-8 text-white/80 leading-tight">
                Data <span className="text-[#FFC40C]">&</span> Insight.
              </h1>
              <p className="text-xl text-gray-100 font-light max-w-2xl mx-auto border-l-4 border-[#FFC40C] pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                Real estate acquisition is a multi-dimensional process. We provide the expertise to navigate due diligence, risk assessment, and system integration with precision.
              </p>
            </Reveal>
         </div>
      </section>

      {/* ===== THE CHALLENGE & SOLUTION ===== */}
      <section className="py-24 bg-white text-black px-6 md:px-20 border-b border-gray-100">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
               <h2 className="text-4xl md:text-5xl font-medium mb-8">The Complexity of Acquisition</h2>
               <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                 <p>
                   Whether you are an individual investor or a growing organization, acquisition involves property identification, rigorous due diligence, and risk assessment. 
                 </p>
                 <p>
                   More often than not, investors find themselves pulled in multiple directions, stretching internal resources beyond limits. With the legal and financial environment constantly evolving, you need an able team that handles the smallest details with utmost care.
                 </p>
               </div>
            </Reveal>
            
            <div className="bg-gray-50 p-10 border border-gray-200 shadow-lg rounded-xl">
               <Reveal delay={200}>
                 <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                 <ul className="space-y-6">
                    {[
                      "Portfolio Evaluation & Restructuring",
                      "Market Feasibility Studies",
                      "Due Diligence Reports",
                      "Cost Optimization Strategies"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-[#FFC40C] flex items-center justify-center text-white font-bold text-sm">✓</span>
                        <span className="text-lg font-medium">{item}</span>
                      </li>
                    ))}
                 </ul>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ===== WHY NEED US (Grid) ===== */}
      <section className="py-24 bg-[#0a0a0a] text-white">
         <div className="container mx-auto px-6">
            <Reveal>
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <span className="text-[#FFC40C] uppercase tracking-widest text-xs font-bold">The Elitairs Advantage</span>
                <h2 className="text-4xl md:text-5xl font-medium mt-2 mb-6">Why Partner With Us?</h2>
                <p className="text-gray-400 font-light">
                  When speaking of huge investments and long-term horizons, you need strategic soundness. This is where our professionalism comes in handy.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { 
                   title: "Unbiased Counsel", 
                   icon: "⚖️",
                   desc: "We are known for offering objective, well-thought-out recommendations that prioritize your interests over transactions." 
                 },
                 { 
                   title: "Deep Expertise", 
                   icon: "🏗️",
                   desc: "Decades of experience handling properties in developing locations like Gurgaon with the country's most reputed builders." 
                 },
                 { 
                   title: "Real-Time Data", 
                   icon: "📊",
                   desc: "Fast and accurate information based on real-time market data to ensure precision planning and forecasting." 
                 },
                 { 
                   title: "Holistic Handholding", 
                   icon: "🤝",
                   desc: "A service where every step is guided, empowering clients to make informed decisions across residential, commercial, and retail assets." 
                 },
               ].map((item, i) => (
                 <Reveal key={i} delay={i * 100}>
                   <div className="p-8 border border-white/10 hover:border-[#FFC40C] bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-xl group h-full">
                      <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                      <h3 className="text-xl font-bold mb-4 group-hover:text-[#FFC40C] transition-colors">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                   </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* ===== ASSET CLASSES ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
           <Reveal>
             <h2 className="text-3xl font-medium mb-12">Expertise Across Asset Classes</h2>
           </Reveal>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
              <Reveal delay={0}>
                <div className="bg-white p-12 hover:bg-gray-50 transition-colors">
                   <h3 className="text-xl font-bold mb-2">Residential</h3>
                   <p className="text-gray-500 text-sm">Luxury apartments, villas, and penthouses.</p>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <div className="bg-white p-12 hover:bg-gray-50 transition-colors">
                   <h3 className="text-xl font-bold mb-2">Commercial</h3>
                   <p className="text-gray-500 text-sm">High-yield office spaces and IT parks.</p>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <div className="bg-white p-12 hover:bg-gray-50 transition-colors">
                   <h3 className="text-xl font-bold mb-2">Retail</h3>
                   <p className="text-gray-500 text-sm">High-street shops and mall spaces.</p>
                </div>
              </Reveal>
           </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 bg-[#FFC40C] text-black text-center">
         <div className="container mx-auto px-6 max-w-4xl">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-medium mb-6">Make a Sound Strategic Decision.</h2>
              <p className="text-black/80 text-lg mb-10 font-medium max-w-2xl mx-auto">
                Leverage our seasoned professionals to improve performance and derive optimum value for your money.
              </p>
              <div className="flex justify-center gap-4">
                 <Link href="/contact" className="px-10 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-md shadow-lg">
                   Get Expert Advice
                 </Link>
              </div>
            </Reveal>
         </div>
      </section>

      <Footer />
    </div>
  );
}