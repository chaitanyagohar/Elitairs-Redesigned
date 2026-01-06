"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export default function MasterPlanPage() {
  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex flex-col justify-center items-center text-center text-white px-6">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" 
            alt="Gurgaon Skyline" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/70 z-10" />
        </div>
        <div className="relative z-20 max-w-4xl">
          <span className="text-[#FFC40C] uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Urban Vision</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Gurgaon Master Plan 2031</h1>
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            The blueprint for the future. Explore the strategic development zones, upcoming metro corridors, and the new growth sectors of the Millennium City.
          </p>
        </div>
      </section>

      {/* --- MAP VIEWER SECTION --- */}
      <section className="py-20 px-6 bg-[#F8F9FA]">
        <div className="container mx-auto">
          
          {/* Controls / Download Bar */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight">Interactive Map</h2>
              <p className="text-gray-500 text-sm mt-2">High-Resolution Zoning Plan • Approved by DTCP</p>
            </div>
            <a 
              href="/files/gurgaon-master-plan-2031.pdf" // 🔴 Replace with your actual PDF path
              download
              className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#FFC40C] hover:text-black transition-all shadow-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download PDF
            </a>
          </div>

          {/* Map Container */}
          <div className="bg-white p-2 border border-gray-200 shadow-xl rounded-lg overflow-hidden relative group">
            <div className="aspect-[16/9] w-full bg-gray-100 relative overflow-hidden">
               <Image 
                 src="/masterplan.png" // Placeholder
                 alt="Gurgaon Master Plan 2031 Map" 
                 fill
                 className="object-contain transform transition-transform duration-700 hover:scale-150 cursor-zoom-in"
               />
               
               {/* Hint Overlay */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                  <span className="bg-black/50 text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest backdrop-blur-md">
                    Hover to Zoom
                  </span>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- KEY HIGHLIGHTS --- */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center uppercase">Key Highlights of 2031 Plan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Highlight 1 */}
            <div className="flex gap-6">
              <div className="w-12 h-12 flex-shrink-0 bg-yellow-50 border border-[#FFC40C] flex items-center justify-center text-[#FFC40C] font-bold text-xl rounded-full">01</div>
              <div>
                <h3 className="text-xl font-bold mb-3">Expansion of Sohna Road</h3>
                <p className="text-gray-500 leading-relaxed">
                  The plan emphasizes the development of the Sohna Road corridor as a major residential and commercial hub, connecting directly to the Delhi-Mumbai Expressway.
                </p>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="flex gap-6">
              <div className="w-12 h-12 flex-shrink-0 bg-yellow-50 border border-[#FFC40C] flex items-center justify-center text-[#FFC40C] font-bold text-xl rounded-full">02</div>
              <div>
                <h3 className="text-xl font-bold mb-3">New Sectors (58-115)</h3>
                <p className="text-gray-500 leading-relaxed">
                  Introduction of low-density residential zones along the Dwarka Expressway and Southern Peripheral Road (SPR), designed for premium living.
                </p>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="flex gap-6">
              <div className="w-12 h-12 flex-shrink-0 bg-yellow-50 border border-[#FFC40C] flex items-center justify-center text-[#FFC40C] font-bold text-xl rounded-full">03</div>
              <div>
                <h3 className="text-xl font-bold mb-3">Global City Project</h3>
                <p className="text-gray-500 leading-relaxed">
                  A designated 1000+ acre zone for the 'Global City' project near Sector 36B and 37B, intended to be a world-class central business district.
                </p>
              </div>
            </div>

            {/* Highlight 4 */}
            <div className="flex gap-6">
              <div className="w-12 h-12 flex-shrink-0 bg-yellow-50 border border-[#FFC40C] flex items-center justify-center text-[#FFC40C] font-bold text-xl rounded-full">04</div>
              <div>
                <h3 className="text-xl font-bold mb-3">Green Belts & Metro</h3>
                <p className="text-gray-500 leading-relaxed">
                  Enhanced green belts along major arteries and the proposed extension of the Metro line connecting Old Gurgaon to the new sectors.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}