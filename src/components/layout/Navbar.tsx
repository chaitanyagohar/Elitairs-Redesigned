"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Consulting", href: "/consulting" },
    { name: "Services", href: "/services" },
    { name: "NRI", href: "/nri-services" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center pt-6`}
      >
        <div
          className={`
            flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500
            ${
              scrolled
                ? "bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl w-[90%] md:w-[70%]"
                : "w-[95%] bg-transparent"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" className="z-50 flex items-center">
            <Image
              src="/elitairs-logo2trans.png" // <-- PLACE LOGO IN /public FOLDER
              alt="Elitairs"
              width={140}
              height={50}
              className="object-fit"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-[#FFC40C] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action & Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={`hidden md:block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                scrolled
                  ? "bg-[#FFC40C] text-black hover:bg-white"
                  : "bg-white text-black hover:bg-[#FFC40C]"
              }`}
            >
              Contact
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2 z-50"
            >
              <div className="space-y-1.5">
                <span
                  className={`block w-6 h-[2px] bg-white transition-transform ${
                    menuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-[2px] bg-white transition-opacity ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-[2px] bg-white transition-transform ${
                    menuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#0a0a0a] z-40 flex items-center justify-center transition-transform duration-700 ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-5xl font-serif text-white hover:text-[#FFC40C] hover:italic transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
