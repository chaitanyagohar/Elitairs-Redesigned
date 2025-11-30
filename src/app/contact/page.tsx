"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1500);
  }

  return (
    <div className="bg-white text-black font-sans selection:bg-[#C5A059] selection:text-white">
      <Navbar />

      {/* --- HERO SECTION WITH IMAGE --- */}
      <section className="relative h-[50vh] flex flex-col justify-center items-center text-center text-white px-6">
         <div className="absolute inset-0 z-0">
            {/* Image: Office / Desk / Phone */}
            <img 
              src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2671&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Contact Hero" 
            />
            <div className="absolute inset-0 bg-black/60 z-10" />
         </div>

         <div className="relative z-20">
            <p className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-bold mb-4">Get in Touch</p>
            <h1 className="text-5xl md:text-7xl font-serif font-medium">
              Start the <span className="italic text-gray-300">Conversation.</span>
            </h1>
         </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-24 px-6 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
         {/* Left Info */}
         <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-8">Contact Information</h2>
            <p className="text-gray-500 mb-12 text-lg">
              Whether you are looking to buy, sell, or simply explore the market, our consultants are ready to assist you.
            </p>

            <div className="space-y-8 text-lg font-light text-black">
               <div className="border-l-4 border-[#C5A059] pl-6">
                  <p className="uppercase text-xs font-bold text-gray-400 mb-1">Visit</p>
                  <p className="font-medium">Two Horizon Center, Golf Course Road,<br/> Gurugram, 122002</p>
               </div>
               <div className="border-l-4 border-gray-200 pl-6">
                  <p className="uppercase text-xs font-bold text-gray-400 mb-1">Call</p>
                  <p className="font-medium hover:text-[#C5A059] cursor-pointer">+91 70818 08180</p>
               </div>
               <div className="border-l-4 border-gray-200 pl-6">
                  <p className="uppercase text-xs font-bold text-gray-400 mb-1">Email</p>
                  <p className="font-medium hover:text-[#C5A059] cursor-pointer">info@elitairs.com</p>
               </div>
            </div>
         </div>

         {/* Right Form */}
         <div className="bg-gray-50 p-12 lg:p-16 border border-gray-100 shadow-xl rounded-sm">
            {status === "success" ? (
               <div className="text-center py-20">
                  <div className="text-6xl mb-6 text-[#C5A059]">✓</div>
                  <h3 className="text-3xl font-bold mb-2">Message Sent</h3>
                  <p className="text-gray-500">We will contact you shortly.</p>
                  <button onClick={() => setStatus("idle")} className="mt-8 underline text-sm">Send another</button>
               </div>
            ) : (
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Name</label>
                     <input type="text" className="w-full bg-white border border-gray-200 p-4 text-black focus:outline-none focus:border-[#C5A059] transition-colors" placeholder="John Doe" required />
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email</label>
                     <input type="email" className="w-full bg-white border border-gray-200 p-4 text-black focus:outline-none focus:border-[#C5A059] transition-colors" placeholder="john@example.com" required />
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Phone</label>
                     <input type="tel" className="w-full bg-white border border-gray-200 p-4 text-black focus:outline-none focus:border-[#C5A059] transition-colors" placeholder="+91..." required />
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Message</label>
                     <textarea rows={4} className="w-full bg-white border border-gray-200 p-4 text-black focus:outline-none focus:border-[#C5A059] transition-colors resize-none" placeholder="I am interested in..." required></textarea>
                  </div>
                  <button type="submit" disabled={status === "submitting"} className="w-full px-12 py-5 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-black transition-all">
                     {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>
               </form>
            )}
         </div>
      </section>

      <Footer />
    </div>
  );
}