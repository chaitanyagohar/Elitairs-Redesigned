"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// --- Utility: Animated Counter ---
function CountUp({ end, prefix = "", suffix = "", duration = 2000 }: { end: number, prefix?: string, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(ease * end));
      if (percentage < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{prefix}{count}{suffix}</span>;
}

// --- Utility: Scroll Reveal ---
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-black overflow-x-hidden">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-24 px-6 bg-gradient-to-b from-black/90 via-white to-white">
        <div className="container mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col lg:flex-row items-end justify-between border-b border-black/10 pb-8 mb-10">
              <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight tracking-tight text-black">
                Elite <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC40C] to-[#b88a00]">
                  Assets.
                </span>
              </h1>
              <div className="mt-6 lg:mt-0 lg:max-w-xl text-right">
                {/* REPHRASED: Removed "More than brokers" */}
                <p className="text-lg text-black font-medium mb-2">
                  Beyond transactions. We are your strategic wealth partners.
                </p>
                <p className="text-sm md:text-base text-gray-900 font-light leading-relaxed">
                  Navigating the complexities of Gurugram’s real estate market requires precision, data, and foresight. We structure wealth through high-value assets, ensuring every square foot you own contributes to your financial legacy.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 relative group overflow-hidden rounded-xl">
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700 z-10"></div>
               <img
                src="/about-hero.png"
                alt="Elitairs Luxury Property"
                className="w-full h-[450px] md:h-[550px] object-cover transition-transform duration-1000 transform group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-4 flex flex-col justify-between bg-[#f8f8f8] p-8 rounded-xl">
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFC40C] mb-4">The Firm</h3>
                <p className="text-xl font-serif leading-snug mb-4">
                  "We prioritize human values in every transaction, from consulting to closure."
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Elitairs is a Gurugram-based real estate advisory focused on high-quality residential & commercial projects, NRI services, and end-to-end transaction support.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Our portfolio ranges from pre-leased commercial assets to ultra-luxury residential dwellings in the NCR region.
                </p>
              </div>
              <div className="mt-8">
                  <Link href="/contact" className="group flex items-center justify-between w-full py-3 border-b border-black hover:border-[#FFC40C] transition-colors">
                    <span className="font-bold text-base">Get Advice</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </Link>
                  <Link href="/services" className="group flex items-center justify-between w-full py-3 border-b border-black/10 hover:border-[#FFC40C] transition-colors">
                    <span className="font-bold text-base text-gray-600 group-hover:text-black">Our Services</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300 text-gray-400 group-hover:text-black">→</span>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMPACT METRICS ===== */}
      <section className="bg-black text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            <Reveal delay={0}>
              <div className="border-l-4 border-[#FFC40C] pl-6">
                <div className="text-5xl md:text-6xl font-bold font-serif mb-2">
                  <CountUp end={15} suffix="+" />
                </div>
                <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Years of Excellence</p>
                <p className="text-gray-500 text-xs mt-2">Consistently outperforming market averages.</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="border-l-4 border-gray-800 pl-6">
                <div className="text-5xl md:text-6xl font-bold font-serif mb-2">
                  <CountUp end={500} suffix="+" />
                </div>
                <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Properties Curated</p>
                <p className="text-gray-500 text-xs mt-2">Handpicked for legal purity & appreciation.</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
               <div className="border-l-4 border-gray-800 pl-6">
                <div className="text-5xl md:text-6xl font-bold font-serif mb-2">
                  <CountUp end={500} prefix="₹" suffix="Cr+" />
                </div>
                <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Value Transacted</p>
                <p className="text-gray-500 text-xs mt-2">Generating sustained wealth for clients.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FOUNDER / LEADERSHIP SECTION ===== */}
      <section className="relative py-24 bg-[#FFC40C] overflow-hidden">
        {/* Abstract Background Typography */}
        <div className="absolute -top-10 -left-10 text-[10rem] md:text-[15rem] font-black text-white opacity-20 select-none pointer-events-none leading-none z-0">
          VISION
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             
            {/* Image Side */}
            <div className="relative">
              <Reveal>
                 <div className="relative z-10">
                    <img 
                      src="/saurabh.png" 
                      alt="Saurabh Puri" 
                      className="w-full h-[550px] object-cover object-top transition-all duration-700 shadow-xl rounded-sm"
                    />
                    <div className="absolute bottom-0 left-0 bg-black text-white p-5 md:p-6 w-full opacity-90">
                       <p className="text-xs tracking-widest uppercase text-[#FFC40C] mb-1">Founder & CEO</p>
                       <h3 className="text-2xl font-serif">Saurabh Puri</h3>
                    </div>
                 </div>
                 <div className="absolute top-8 -right-4 w-full h-full border-4 border-black z-0 hidden md:block"></div>
              </Reveal>
            </div>

            {/* Text Side */}
            <div className="bg-white p-8 md:p-12 shadow-xl relative">
              <Reveal delay={200}>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                  The Architect of <br/> Wealth.
                </h2>
                
                <p className="text-lg text-black font-medium italic mb-6 border-l-4 border-[#FFC40C] pl-5">
                  "Converting traditional real estate investments into long-term wealth engines."
                </p>

                <div className="prose text-gray-600 mb-6 text-base leading-relaxed">
                   <p className="mb-4">
                     Saurabh Puri brings over <strong className="text-black">15 years of deep expertise</strong> in real estate consulting. 
                     {/* REPHRASED: "Unlike typical brokerage" */}
                     Distinct from conventional agencies, his approach is rooted in financial structuring—understanding market cycles to enter and exit at the right time.
                   </p>
                   <p className="mb-4">
                     Based out of Gurugram, he has cultivated a network of HNIs and UHNIs who trust Elitairs for <strong className="text-black">Risk Mitigation</strong> and <strong className="text-black">Capital Appreciation</strong>.
                   </p>
                   <p>
                     He personally oversees mandates involving:
                   </p>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Land Consolidations",
                    "JV Structuring",
                    "Strategic Acquisitions",
                    "Institutional Investment",
                    "Pre-leased Assets",
                    "Asset Structuring"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 border-b border-gray-100 pb-2">
                       <span className="text-[#FFC40C] text-lg">■</span>
                       <span className="font-bold text-xs uppercase tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
{/* ===== NEW: FOUNDER'S MESSAGE ===== */}
      <section className="py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-6 max-w-5xl">
            <Reveal>
                <div className="text-center mb-12">
                     <span className="text-[#FFC40C] font-bold tracking-[0.2em] text-xs uppercase block mb-4">Founder’s Message</span>
                     <h2 className="text-3xl md:text-5xl font-serif text-black leading-tight">
                         "Real estate is not a transaction— <br/>it is a strategic financial asset class."
                     </h2>
                </div>

                <div className="bg-white p-10 md:p-16 shadow-lg border border-gray-100 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#FFC40C]"></div>
                    <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-light">
                        <p className="mb-6">
                            {/* Wraps "At" in a span to make both letters big */}
                            <span className="text-5xl font-serif font-bold text-black mr-3 float-left leading-[0.8] mt-2">
                              At
                            </span>
                            Elitairs, real estate is not viewed as a transaction—it is treated as a strategic financial asset class.
                        </p>
                        <p className="mb-6">
                            Over the last 15 years, I have worked closely with HNIs and UHNIs to help them navigate complex real estate decisions—whether it involves portfolio restructuring, land banking, joint ventures, or institutional-grade investments. My philosophy has always been simple: capital protection first, performance next, and sustainability always.
                        </p>
                        <p className="mb-8">
                            Markets evolve, cycles change, and sentiment fluctuates—but well-structured real estate continues to create enduring wealth. At Elitairs, every advisory mandate is driven by research, market intelligence, and a long-term vision aligned with our clients’ financial objectives.
                        </p>
                        
                        <div className="p-6 bg-gray-50 border-l-4 border-black mb-8 italic text-black font-medium">
                            Our role is not to sell property, but to build wealth frameworks through real estate—with discretion, precision, and accountability.
                        </div>

                        <div className="flex items-center gap-4 mt-10 pt-8 border-t border-gray-100">
                             <img src="/saurabh10.webp" alt="Saurabh Puri" className="w-16 h-16 rounded-full object-fit " />
                             <div>
                                 <h4 className="font-serif text-xl font-bold text-black">Saurabh Puri</h4>
                                 <p className="text-[#FFC40C] text-xs uppercase tracking-wider font-bold">Founder & CEO, Elitairs</p>
                             </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
      </section>

      {/* ===== DETAILED EXPERTISE SECTION (NEW) ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
           <Reveal>
             <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl md:text-5xl font-serif mb-6">Comprehensive Real Estate Ecosystem</h2>
               <p className="text-gray-500">
                 We provide specialized advisory across three distinct verticals, ensuring that whether you are buying a home or structuring a commercial deal, you have expert guidance.
               </p>
             </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-12">
              <Reveal delay={0}>
                <div className="pr-4">
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                     <span className="w-2 h-2 bg-[#FFC40C] rounded-full"></span> Residential Luxury
                   </h3>
                   <p className="text-sm text-gray-600 leading-relaxed mb-4">
                     We specialize in high-end apartments, penthouses, and villas in Gurugram's prime sectors. Our focus is on:
                   </p>
                   <ul className="text-sm text-gray-500 space-y-2">
                     <li>• End-use vs Investment Analysis</li>
                     <li>• Builder Reputation Audits</li>
                     <li>• Luxury Amenities Valuation</li>
                   </ul>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div className="pr-4 md:border-l md:border-gray-200 md:pl-8">
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                     <span className="w-2 h-2 bg-[#FFC40C] rounded-full"></span> Commercial Assets
                   </h3>
                   <p className="text-sm text-gray-600 leading-relaxed mb-4">
                     For investors seeking regular rental yield and capital appreciation, we identify Grade-A commercial spaces.
                   </p>
                   <ul className="text-sm text-gray-500 space-y-2">
                     <li>• Pre-leased Properties</li>
                     <li>• High Street Retail & Office Spaces</li>
                     <li>• ROI & Yield Calculations</li>
                   </ul>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="md:border-l md:border-gray-200 md:pl-8">
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                     <span className="w-2 h-2 bg-[#FFC40C] rounded-full"></span> Land & Consulting
                   </h3>
                   <p className="text-sm text-gray-600 leading-relaxed mb-4">
                     Strategic land acquisition for long-term holding or development. We handle the complex legalities.
                   </p>
                   <ul className="text-sm text-gray-500 space-y-2">
                     <li>• Legal Due Diligence (CLU/License)</li>
                     <li>• Joint Venture Facilitation</li>
                     <li>• Home Loan & Financial Consulting</li>
                   </ul>
                </div>
              </Reveal>
           </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY IMAGE BANNER ===== */}
      <section className="py-12 bg-white px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="relative h-[350px] w-full rounded-2xl overflow-hidden shadow-inner">
             <img 
               src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" 
               className="w-full h-full object-cover"
               alt="Team Workspace" 
             />
          </div>
        </div>
      </section>

      {/* ===== PROCESS (Expanded Text) ===== */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="mb-16 relative">
             <h2 className="text-6xl font-bold font-serif text-gray-200 absolute select-none -translate-y-8 z-0">PROCESS</h2>
             <h2 className="text-3xl md:text-4xl font-bold relative z-10 pl-2">How We Work</h2>
             <p className="mt-4 text-gray-500 max-w-2xl relative z-10">
               Our workflow is designed to eliminate ambiguity. We follow a structured three-step protocol to ensure every transaction is compliant, profitable, and smooth.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Reveal delay={0}>
                 <div className="group bg-white p-8 h-full border border-gray-100 hover:border-black transition-all duration-300 hover:shadow-xl rounded-lg">
                    <div className="text-5xl font-black text-[#FFC40C]/30 mb-4 group-hover:text-[#FFC40C] transition-colors">01</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:underline decoration-[#FFC40C] decoration-4">Strategic Consultation</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      We begin by understanding your financial goals. Are you looking for end-use, rental yield, or capital gains?
                    </p>
                    <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                      <li>Requirement Mapping</li>
                      <li>Budget Structuring</li>
                      <li>Loan Eligibility Check</li>
                    </ul>
                 </div>
              </Reveal>

              <Reveal delay={150}>
                 <div className="group bg-white p-8 h-full border border-gray-100 hover:border-black transition-all duration-300 hover:shadow-xl rounded-lg">
                    <div className="text-5xl font-black text-[#FFC40C]/30 mb-4 group-hover:text-[#FFC40C] transition-colors">02</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:underline decoration-[#FFC40C] decoration-4">Identification & Analysis</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      We filter the market noise to present only assets with clean titles and high growth potential.
                    </p>
                    <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                      <li>Market Comparative Analysis</li>
                      <li>Legal History Check</li>
                      <li>RERA Compliance Verification</li>
                    </ul>
                 </div>
              </Reveal>

              <Reveal delay={300}>
                 <div className="group bg-white p-8 h-full border border-gray-100 hover:border-black transition-all duration-300 hover:shadow-xl rounded-lg">
                    <div className="text-5xl font-black text-[#FFC40C]/30 mb-4 group-hover:text-[#FFC40C] transition-colors">03</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:underline decoration-[#FFC40C] decoration-4">Execution & Closure</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      We handle the paperwork, negotiations, and registration, ensuring a hassle-free handover.
                    </p>
                    <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                      <li>Negotiation Support</li>
                      <li>Registration Assistance</li>
                      <li>Post-Sales Property Management</li>
                    </ul>
                 </div>
              </Reveal>
           </div>
        </div>
      </section>

      {/* ===== FEATURES / WHY US ===== */}
      <section className="py-24 bg-[#111] text-white">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-6">
               <h2 className="text-3xl md:text-5xl font-serif">Why Choose <span className="text-[#FFC40C]">Us?</span></h2>
               <p className="text-gray-400 max-w-md mt-6 md:mt-0 text-right text-sm">
                 {/* REPHRASED: "Property Dealer" */}
                 We elevate the experience from "Asset Acquisition" to "Wealth Management".
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800">
               {[
                 { title: "Holistic Consulting", icon: "🌐", desc: "A 360-degree approach covering residential living, commercial leasing, and land banking." },
                 { title: "Financial Aid", icon: "💰", desc: "In-house home loan consulting to structure your debt and optimize tax benefits." },
                 { title: "Legal Expertise", icon: "⚖️", desc: "Rigorous due diligence to ensure zero-litigation properties and clear titles." },
                 { title: "Transparent Dealings", icon: "🔍", desc: "No hidden costs. We maintain complete transparency in pricing and documentation." },
                 { title: "After Sales Support", icon: "🤝", desc: "Our relationship doesn't end at the sale. We assist with leasing, resale, and maintenance." },
                 { title: "Market Intel", icon: "📊", desc: "Backed by real-time data analytics to predict appreciation trends in Gurugram sectors." },
               ].map((item, i) => (
                 <Reveal key={i} delay={i * 50}>
                    <div className="bg-[#111] p-8 h-full hover:bg-[#1a1a1a] transition-colors group">
                       <div className="text-2xl mb-4transition-all">{item.icon}</div>
                       <h4 className="text-lg font-bold mb-2 text-[#FFC40C]">{item.title}</h4>
                       <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300">{item.desc}</p>
                    </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* ===== VISION & MISSION ===== */}
      <section className="relative py-32 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-fixed bg-center">
         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               <Reveal>
                  <div className="bg-white/5 border border-white/10 p-10 backdrop-blur-md rounded-lg">
                     <span className="text-[#FFC40C] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Our Vision</span>
                     <h3 className="text-2xl md:text-3xl text-white font-serif leading-snug mb-4">
                       To be India's most trusted Real Estate Advisory.
                     </h3>
                     <p className="text-gray-300 text-sm leading-relaxed">
                       We aim to set a new benchmark for professionalism in the property sector, where every client interaction is defined by integrity, knowledge, and mutual respect.
                     </p>
                  </div>
               </Reveal>
               <Reveal delay={200}>
                  <div className="bg-white/5 border border-white/10 p-10 backdrop-blur-md rounded-lg">
                     <span className="text-[#FFC40C] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Our Mission</span>
                     <h3 className="text-2xl md:text-3xl text-white font-serif leading-snug mb-4">
                       To empower informed decisions.
                     </h3>
                     <p className="text-gray-300 text-sm leading-relaxed">
                       To assist customers in making data-backed decisions when dealing with properties in Gurugram, ensuring their investments are safe, profitable, and hassle-free.
                     </p>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
           <Reveal>
             <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
               Let your wealth grow <br/> in your <span className="text-[#FFC40C]">homeland.</span>
             </h2>
             <p className="text-lg text-gray-500 mb-10 font-light">
               Professional NRI services, Commercial Structuring, and Luxury Residential consulting await at Elitairs.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Link href="/contact" className="px-8 py-4 bg-black text-white text-base font-bold rounded hover:bg-[#FFC40C] hover:text-black transition-all duration-300">
                   Contact Us
                 </Link>
                 <a href="tel:+917081808180" className="px-8 py-4 border-2 border-black text-black text-base font-bold rounded hover:bg-black hover:text-white transition-all duration-300">
                   +91 70818 08180
                 </a>
             </div>
           </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}