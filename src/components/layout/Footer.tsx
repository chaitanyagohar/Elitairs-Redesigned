import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white pt-16 md:pt-20 pb-10 border-t border-[#FFC40C]/20 font-sans relative overflow-hidden">

      {/* Golden Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFC40C] to-transparent shadow-[0_0_10px_#FFC40C]" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-14">

          {/* BRAND */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative w-36 sm:w-40 h-12">
                <Image
                  src="/elitairs-logo2trans.png"
                  alt="Elitairs"
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 100px, 200px" // Tells browser: "It's small, don't download the huge version
                />
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              We curate legacy-defining real estate across Gurugram & NCR,
              harmonizing architectural excellence with an elevated lifestyle.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-4 pt-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/elitairs_india?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
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
                href="https://www.linkedin.com/company/elitairs/"
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

          {/* DISCOVER */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 border-b border-[#FFC40C] inline-block pb-1">
              Discover
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-[#FFC40C]">Home</Link></li>
              <li><Link href="/projects" className="hover:text-[#FFC40C]">Projects</Link></li>
              <li><Link href="/services" className="hover:text-[#FFC40C]">Services</Link></li>
              <li><Link href="/consulting" className="hover:text-[#FFC40C]">Consulting</Link></li>
            </ul>
          </div>

       {/* COMPANY */}
<div>
  <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 border-b border-[#FFC40C] inline-block pb-1">
    Company
  </h4>

  <ul className="space-y-3 text-sm text-gray-400">
    <li>
      <Link href="/about" className="hover:text-[#FFC40C]">
        About Elitairs
      </Link>
    </li>
    <li>
      <Link href="/nri" className="hover:text-[#FFC40C]">
        NRI Services
      </Link>
    </li>

    {/* MASTER PLANS GROUP */}
    <li className="pt-3">
      <span className="block text-white font-semibold mb-2">
        Master Plans
      </span>

      <ul className="ml-3 space-y-2 text-gray-400 text-[13px]">
        <li>
          <Link href="/master-plan/gurgaon" className="hover:text-[#FFC40C]">
            Gurgaon 2031
          </Link>
        </li>
        <li>
          <Link href="/master-plan/delhi" className="hover:text-[#FFC40C]">
            Delhi
          </Link>
        </li>
        <li>
          <Link href="/master-plan/noida" className="hover:text-[#FFC40C]">
            Noida
          </Link>
        </li>
        <li>
          <Link href="/master-plan/yamuna" className="hover:text-[#FFC40C]">
            Yamuna Expressway
          </Link>
        </li>
        <li>
          <Link href="/master-plan/sohna" className="hover:text-[#FFC40C]">
            Sohna
          </Link>
        </li>
        <li>
          <Link href="/master-plan/faridabad" className="hover:text-[#FFC40C]">
            Faridabad
          </Link>
        </li>
      </ul>
    </li>

    <li className="pt-3">
      <Link href="/contact" className="hover:text-[#FFC40C]">
        Contact Us
      </Link>
    </li>
  </ul>
</div>


          {/* VISIT US */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 border-b border-[#FFC40C] inline-block pb-1">
              Visit Us
            </h4>

            <div className="space-y-4 text-sm text-gray-400">
              <p className="leading-relaxed">
                <span className="block text-white font-semibold mb-1">Corporate Office:</span>
                2nd Floor, Cross Point Mall, 307,<br />
                Opposite Galleria Market,<br />
                Sector 28, DLF Phase IV,<br />
                Gurugram, Haryana 122009
              </p>

              <div className="pt-2">
                <a href="tel:+917081808180" className="block text-white font-bold hover:text-[#FFC40C] text-lg">
                  +91 70 8180 8180
                </a>
                <a href="mailto:info@elitairs.com" className="block hover:text-[#FFC40C]">
                  info@elitairs.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 uppercase tracking-widest text-center md:text-left">
          <p>&copy; {currentYear} Elitairs. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <Link href="/privacy-policy" className="hover:text-[#FFC40C]">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-[#FFC40C]">Disclaimer</Link>
            <Link href="/terms-conditions" className="hover:text-[#FFC40C]">Terms & Conditions</Link>
            <span className="hover:text-white cursor-pointer">RERA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
