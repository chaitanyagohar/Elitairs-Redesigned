import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-[#FFC40C]/20 font-sans relative overflow-hidden">
      
      {/* Golden Glow Effect at top */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFC40C] to-transparent shadow-[0_0_10px_#FFC40C]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* COLUMN 1: BRAND & LOGO */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              {/* Replace with your actual image path */}
              <div className="relative w-40 h-12">
                 {/* If image fails, fallback text is shown via alt */}
                 <Image 
                   src="/elitairs-logo2trans.png" 
                   alt="Elitairs" 
                   fill
                   className="object-contain object-left"
                 />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Architects of legacy. We curate the finest real estate experiences in Gurugram & NCR, bridging the gap between luxury and lifestyle.
            </p>
            <div className="flex gap-4 pt-2">
                {/* Social Icons */}
                {['Instagram', 'LinkedIn', 'Facebook'].map((social, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#FFC40C] hover:border-[#FFC40C] transition-all">
                        <span className="sr-only">{social}</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                ))}
            </div>
          </div>

          {/* COLUMN 2: DISCOVER */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 border-b border-[#FFC40C] inline-block pb-1">Discover</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-[#FFC40C] transition-colors">Home</Link></li>
              <li><Link href="/projects" className="hover:text-[#FFC40C] transition-colors">Projects</Link></li>
              <li><Link href="/services" className="hover:text-[#FFC40C] transition-colors">Services</Link></li>
              <li><Link href="/consulting" className="hover:text-[#FFC40C] transition-colors">Consulting</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: COMPANY */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 border-b border-[#FFC40C] inline-block pb-1">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-[#FFC40C] transition-colors">About Elitairs</Link></li>
              <li><Link href="/nri" className="hover:text-[#FFC40C] transition-colors">NRI Services</Link></li>
              <li><Link href="/careers" className="hover:text-[#FFC40C] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-[#FFC40C] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: CONTACT INFO */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 border-b border-[#FFC40C] inline-block pb-1">Visit Us</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <p className="leading-relaxed">
                <span className="block text-white font-semibold mb-1">Corporate Office:</span>
                Two Horizon Center,<br />Golf Course Road,<br />Gurugram, Haryana 122002
              </p>
              <div className="pt-2">
                <a href="tel:+917081808180" className="block text-white font-bold hover:text-[#FFC40C] transition-colors text-lg">
                  +91 70818 08180
                </a>
                <a href="mailto:info@elitairs.com" className="block hover:text-[#FFC40C] transition-colors">
                  info@elitairs.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR: LEGAL */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 uppercase tracking-widest">
          <p>&copy; {currentYear} Elitairs. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-[#FFC40C] transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-[#FFC40C] transition-colors">Terms & Conditions</Link>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hover:text-white cursor-pointer">RERA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}