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
          
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative w-40 h-12">
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

  {/* Instagram */}
  <a
    href="https://www.instagram.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center transition-all hover:scale-105"
    aria-label="Instagram"
  >
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <defs>
        <linearGradient id="ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f58529" />
          <stop offset="30%" stopColor="#dd2a7b" />
          <stop offset="60%" stopColor="#8134af" />
          <stop offset="100%" stopColor="#515bd4" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ig-gradient)"
        d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5C22 19.55 19.55 22 16.25 22h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 1.5A4.26 4.26 0 003.5 7.75v8.5A4.26 4.26 0 007.75 20.5h8.5a4.26 4.26 0 004.25-4.25v-8.5A4.26 4.26 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.88a1.13 1.13 0 110 2.26 1.13 1.13 0 010-2.26z"
      />
    </svg>
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center transition-all hover:scale-105"
    aria-label="LinkedIn"
  >
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0A66C2]">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.266 2.37 4.266 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.123 2.062 2.062 0 010 4.123zM6.813 20.452H3.861V9h2.952v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0z" />
    </svg>
  </a>

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
            <Link href="/disclaimer" className="hover:text-[#FFC40C] transition-colors">Disclaimer</Link>
            <Link href="/terms-conditions" className="hover:text-[#FFC40C] transition-colors">Terms & Conditions</Link>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hover:text-white cursor-pointer">RERA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}