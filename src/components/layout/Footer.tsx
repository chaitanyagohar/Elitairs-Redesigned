import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0a0a0a] to-black text-white py-12 border-t border-white/10 font-sans relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFC40C]/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-10">
          
          {/* 1. BRAND & CONTACT */}
          <div className="space-y-4">

            {/* ⭐ Replace text logo with Image logo */}
            <Link href="/" className="inline-block group">
              <Image
                src="/elitairs-logo2trans.png"        // ← change path if needed
                alt="Elitairs Logo"
                width={140}
                height={50}
                className="object-contain"
                priority
              />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Architects of legacy. Curating the finest real estate experiences in Gurugram & NCR.
            </p>

            <div className="pt-2 text-sm text-gray-300 space-y-1">
              <p>Two Horizon Center, Golf Course Road</p>
              <a href="tel:+917081808180" className="block font-bold text-white hover:text-[#FFC40C] transition-colors">
                +91 70818 08180
              </a>
              <a href="mailto:info@elitairs.com" className="block hover:text-[#FFC40C] transition-colors">
                info@elitairs.com
              </a>
            </div>
          </div>

          {/* REST OF FOOTER UNCHANGED */}


          {/* 2. COMPANY LINKS */}
          <div>
             <h4 className="text-[#FFC40C] font-bold text-xs uppercase tracking-widest mb-4">Company</h4>
             <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Our Services</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
             </ul>
          </div>

          {/* 3. DISCOVER LINKS */}
          <div>
             <h4 className="text-[#FFC40C] font-bold text-xs uppercase tracking-widest mb-4">Discover</h4>
             <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/projects" className="hover:text-white transition-colors">All Projects</Link></li>
                <li><Link href="/nri-services" className="hover:text-white transition-colors">NRI Services</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
             </ul>
          </div>

          {/* 4. NEWSLETTER (Compact) */}
          <div className="bg-white/5 p-6 rounded-sm border border-white/10 h-fit">
             <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFC40C] mb-3">Join Exclusive List</h3>
             <form className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-black/40 border border-white/10 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#FFC40C] transition-colors placeholder-gray-500"
                />
                <button className="w-full px-4 py-2 bg-[#FFC40C] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors">
                  Subscribe
                </button>
             </form>
          </div>
        </div>

        {/* BOTTOM BAR: Compact */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[10px] text-gray-500 uppercase tracking-widest">
             &copy; {new Date().getFullYear()} Elitairs Real Estate.
           </p>
           
           {/* Social Icons */}
           <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-[#FFC40C] transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-[#FFC40C] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
           </div>
        </div>
      </div>
    </footer>
  );
}