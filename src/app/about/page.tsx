"use client"; // Essential for animations

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// --- Animated Counter Component ---
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

export default function AboutPage() {
  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white overflow-hidden">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative py-20 pt-32">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2000&auto=format&fit=crop"
                alt="Elitairs - property"
                className="w-full h-[520px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[#FFC40C] uppercase tracking-widest text-xs font-bold mb-4">About Elitairs</p>
              <h1 className="text-4xl md:text-6xl font-medium leading-tight mb-6">
                Elite Assets. <br/> Elevated Income.
              </h1>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed font-light">
                Elitairs is a Gurugram-based real estate advisory focused on high-quality residential & commercial projects, NRI services, and end-to-end transaction support.
              </p>
              <div className="flex gap-4">
                <Link href="/contact" className="inline-block px-8 py-3 bg-[#FFC40C] text-black rounded-md font-bold text-sm shadow-md hover:bg-black hover:text-white transition-all">
                  Get Advice
                </Link>
                <Link href="/services" className="inline-block px-8 py-3 border border-gray-300 rounded-md text-gray-700 font-bold text-sm hover:border-black hover:text-black transition-all">
                  Our Services
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== ANIMATED STATS ===== */}
      <section className="py-16 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-800">
            <div>
              <div className="text-4xl md:text-6xl font-bold text-[#FFC40C] mb-2 font-mono">
                <CountUp end={15} suffix="+" />
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold text-[#FFC40C] mb-2 font-mono">
                <CountUp end={500} suffix="+" />
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">Properties Curated</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold text-[#FFC40C] mb-2 font-mono">
                <CountUp end={500} prefix="₹" suffix="Cr+" />
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">Value Transacted</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WELCOME / WHAT WE DO ===== */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-medium mb-6">Welcome to Elitairs</h2>
              <div className="w-20 h-1 bg-[#FFC40C] mb-8"></div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Real estate is not just about buying and selling properties; it involves a human element in every project and every sale. At Elitairs, we prioritize human values when dealing with real estate consulting, NRI services, and home loan consulting.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Based out of Gurugram and NCR, the financial and technological hub, Elitairs works towards enhancing the value of the business for property sellers and leasers. We provide a whole spectrum of consulting to after-sales assistance for customers looking to buy or lease properties.
              </p>
            </Reveal>
            
            <div className="relative h-[400px] lg:h-[500px]">
               <div className="absolute top-0 right-0 w-2/3 h-full bg-[#FFC40C] rounded-2xl opacity-10 transform translate-x-4 translate-y-4"></div>
               <img 
                 src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" 
                 className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
                 alt="Office Team" 
               />
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW WE WORK (Step Process) ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#FFC40C] uppercase tracking-widest text-xs font-bold">Process</span>
              <h2 className="text-4xl font-medium mt-2">How Do We Work?</h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                We follow a structured approach in every project we undertake, believing in providing only the best deals to our consumers.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

            {[
              {
                step: "01",
                title: "Consultation",
                desc: "We meet with our clients to understand requirements deeply—whether it's home loan consulting, legal aid, or property search.",
                delay: 0
              },
              {
                step: "02",
                title: "Custom Solutions",
                desc: "Once we have a clear idea, we find the perfect fit. For NRIs, our special team provides solutions befitting their specific needs.",
                delay: 200
              },
              {
                step: "03",
                title: "Execution",
                desc: "Punctuality and due diligence are our core values. Expect your solutions to come to full fruition as promised, on time.",
                delay: 400
              }
            ].map((item, i) => (
              <Reveal key={i} delay={item.delay}>
                <div className="bg-white p-8 border border-gray-100 rounded-2xl hover:shadow-2xl hover:border-[#FFC40C] transition-all duration-300 group text-center">
                  <div className="w-24 h-24 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-3xl font-bold text-[#FFC40C] mb-6 group-hover:bg-[#FFC40C] group-hover:text-black transition-colors shadow-inner">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US (Bento Grid) ===== */}
      <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-medium mb-6">Why Choose <span className="text-[#FFC40C]">Us?</span></h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Holistic real estate consulting solutions that meet all requirements of all customers including NRI services.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Holistic Consulting", icon: "🌐", desc: "Complete solutions covering residential, commercial, and investment needs." },
              { title: "Financial Aid", icon: "💰", desc: "Home loan consulting to help on the financial aspect of property deals." },
              { title: "Legal Expert", icon: "⚖️", desc: "Expert assistance so that you can avoid bottlenecks on all grounds." },
              { title: "Transparency", icon: "🔍", desc: "Complete transparency guaranteed at all times with regular updates." },
              { title: "After Sales", icon: "🤝", desc: "100% satisfaction guaranteed with quality after-sales assistance." },
              { title: "Market Intel", icon: "📊", desc: "We continuously study the market to provide you with the best options." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="p-8 border border-white/10 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#FFC40C] transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VISION & MISSION (Parallax Visual) ===== */}
      <section className="relative py-32 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-fixed bg-center text-white">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
           <Reveal>
             <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20">
                <h3 className="text-[#FFC40C] uppercase tracking-widest text-sm font-bold mb-4">Our Vision</h3>
                <p className="text-xl md:text-2xl font-light leading-relaxed">
                  To become the leading property portal offering consultation services in the country, building upon the trust and respect of customers all over.
                </p>
             </div>
           </Reveal>
           <Reveal delay={200}>
             <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20">
                <h3 className="text-[#FFC40C] uppercase tracking-widest text-sm font-bold mb-4">Our Mission</h3>
                <p className="text-xl md:text-2xl font-light leading-relaxed">
                  To assist customers in making informed decisions when dealing with properties in Gurugram, irrespective of the action involved.
                </p>
             </div>
           </Reveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <Reveal>
            <h3 className="text-4xl font-bold mb-6">Let your wealth grow in your homeland.</h3>
            <p className="text-gray-500 mb-10 text-lg">
              With professional NRI services and expert consulting at Elitairs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 bg-[#FFC40C] text-black rounded-lg font-bold shadow-lg hover:bg-[#e0ac00] transition-colors">
                Contact Us
              </Link>
              <a href="tel:+917081808180" className="px-8 py-4 border-2 border-black text-black rounded-lg font-bold hover:bg-black hover:text-white transition-colors">
                Call +91 70818 08180
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}