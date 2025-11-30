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

export default function NRIServicesPage() {
  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white overflow-hidden">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[80vh] flex flex-col justify-center px-6 md:px-20 pt-20">
         <div className="absolute inset-0 z-0">
            <img 
              src="nri-services.jpg" 
              className="w-full h-full object-cover opacity-80" 
              alt="Global Indian"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
         </div>
         
         <div className="relative z-10 max-w-3xl">
            <Reveal>
              <p className="text-[#FFC40C] uppercase tracking-[0.3em] text-xs font-bold mb-6">For The Global Indian</p>
              <h1 className="text-6xl md:text-8xl font-medium leading-tight mb-8 text-white">
                Invest In Your <br/> <span className="text-[#FFC40C] italic">Roots.</span>
              </h1>
              <p className="text-xl text-gray-100 font-sm leading-relaxed mb-10 border-l-4 border-[#FFC40C] pl-6">
                Distance is no longer a barrier. We act as your trusted custodians, managing your Indian assets with the same care as if you were here.
              </p>
              <Link href="/contact" className="inline-block px-10 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#FFC40C] hover:text-black transition-all shadow-lg rounded-md">
                Schedule Virtual Meeting
              </Link>
            </Reveal>
         </div>
      </section>

      {/* ===== MARKET CONTEXT ===== */}
      <section className="py-32 bg-white text-black px-6 md:px-20 border-b border-gray-100">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
               <h2 className="text-4xl md:text-5xl font-medium mb-8">Why Invest Now?</h2>
               <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                 <p>
                   The recent acts and measurements from the government have made it easier and profitable for NRIs to invest in Indian markets. If you are an NRI, this is likely the right time for investment.
                 </p>
                 <p>
                   The real estate environment has been under constant evolution, both on the investment and legal fronts. It requires you to be adept on various aspects to capitalize on the market. At Elitairs, we offer assistance meant for handling the special requests of NRIs, enabling them to make the best out of this lucrative scenario.
                 </p>
                 <p className="font-medium text-black">
                   Upcoming financial and technology hubs right next to the nation’s capital, Gurgaon NCR, are currently booming.
                 </p>
               </div>
            </Reveal>
            
            <div className="grid gap-8">
               {[
                 { 
                   title: "Portfolio Services", 
                   desc: "We help build a balanced portfolio including high growth and safer bets, ensuring you stay afloat at all times. We identify lucrative investment options to build your wealth.", 
                   border: "border-[#FFC40C]" 
                 },
                 { 
                   title: "Transaction Assistance", 
                   desc: "Assistance in buying and selling properties to ensure optimum ROI. We work dedicatedly to provide market updates that help with resale and obtaining the best value.", 
                   border: "border-black" 
                 },
                 { 
                   title: "Investment Insights", 
                   desc: "We offer assistance to deal with existing property investments and provide deep insights to help you make informed decisions.", 
                   border: "border-[#FFC40C]" 
                 },
               ].map((item, i) => (
                 <Reveal key={i} delay={i * 150}>
                   <div className={`p-8 bg-gray-50 border-l-4 ${item.border} hover:shadow-lg transition-shadow duration-300`}>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                   </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* ===== EXPERTISE GRID ===== */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
           <Reveal>
             <div className="text-center mb-16">
               <span className="text-[#FFC40C] uppercase tracking-widest text-xs font-bold">The Advantage</span>
               <h2 className="text-4xl md:text-5xl font-medium mt-2">End-to-End Solutions</h2>
             </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { 
                  title: "Market Intelligence", 
                  desc: "We continuously study the market and legal environment, keeping you constantly updated on the latest customer behavior to provide you with the best options." 
                },
                { 
                  title: "Tax & Legal Ease", 
                  desc: "From understanding the tax treatment for buying and selling property to finishing legalities with minimal hassles, our team provides expert assistance." 
                },
                { 
                  title: "Consistent Efficiency", 
                  desc: "An endeavor to provide a consistently efficient platform for investments in real estate, ensuring transparency and ease of operation." 
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="p-10 bg-white border border-gray-100 hover:border-[#FFC40C] transition-all duration-300 rounded-xl group hover:-translate-y-2 shadow-sm">
                     <h3 className="text-xl font-bold text-black mb-4 group-hover:text-[#FFC40C] transition-colors">{item.title}</h3>
                     <p className="text-gray-500 text-sm leading-relaxed">
                       {item.desc}
                     </p>
                  </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 bg-[#0a0a0a] text-white text-center">
         <div className="container mx-auto px-6 max-w-4xl">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-medium mb-6">Let your wealth grow in your homeland.</h2>
              <p className="text-gray-400 text-lg mb-10 font-light max-w-2xl mx-auto">
                Experience professional NRI services with Elitairs.
              </p>
              <div className="flex justify-center gap-4">
                 <Link href="/contact" className="px-10 py-4 bg-[#FFC40C] text-black font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-md shadow-lg">
                   Consult an Expert
                 </Link>
              </div>
            </Reveal>
         </div>
      </section>

      <Footer />
    </div>
  );
}