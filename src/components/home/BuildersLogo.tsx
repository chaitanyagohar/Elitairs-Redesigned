"use client";

import React from "react";

type Builder = {
  name: string;
  url: string;
};

const BUILDERS: Builder[] = [
  // {
  //   name: "Sobha",
  //   url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwuEFbs-ekyT1y8l5Mpc8YV4aIPwIE4sTAZA&s",
  // },
  {
    name: "Adani",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Adani_logo_2012.svg/1200px-Adani_logo_2012.svg.png",
  },
  {
    name: "Elan",
    url: "https://elanltd.in/wp-content/uploads/2023/11/elan-logo.png",
  },
  {
    name: "SPJ",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQus-VdHxosGGN2gnjOct5E5IleOPoylbzz4Q&s",
  },
  {
    name: "Emaar",
    url: "https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Emaar_India.svg/1200px-Emaar_India.svg.png",
  },
  {
    name: "Omaxe",
    url: "https://companieslogo.com/img/orig/OMAXE.NS_BIG-7771e542.png?t=1720244493",
  },
  {
    name: "Trehan",
    url: "https://trehanluxuryfloors.com/wp-content/uploads/2025/05/Logo-Website.png",
  },
  {
    name: "Silverglades",
    url: "https://www.3horizons.in/images/builders/502291867silverglad-logo.png",
  },
  {
    name: "Godrej Properties",
    url: "https://mma.prnewswire.com/media/1308693/GPL_Logo.jpg?p=facebook",
  },
  { name: "AIPL", url: "https://aipl.com/wp-content/uploads/2024/01/AIPL.png" },
  { name: "BPTP", url: "https://bptpfaridabad.com/images/logo.png" },
  { name: "Hero Homes", url: "https://www.herohomes.in/images/logo.png" },
  {
    name: "Experion",
    url: "https://www.experion.co/img/logo/logo-parts-4.png",
  },
  {
    name: "Suncity Projects",
    url: "https://savemax.in/staticfiles/upload/builderlogo/suncity-projects_uyaYZoO.png",
  }
];

export default function BuilderLogos() {
  return (
    <section className="py-12 bg-[#FFFFFF] overflow-hidden relative">

<div 
  className="
    absolute inset-0 
    opacity-[0.4] 
    pointer-events-none 
    bg-[radial-gradient(#cbd5e1_2px,transparent_1px)] 
    [background-size:16px_16px]
    [mask-image:linear-gradient(to_bottom,transparent,black_6rem)]
  " 
/>

      {/* Heading */}
      <div className="container mx-auto px-4 mb-10 text-center relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Trusted Builder Partnerships
        </h3>
        <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base">
          We collaborate with India’s most established real estate developers to
          bring you premium inventory.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden z-10 group">
        {/* Gradient Fade Edges - Enhanced visibility */}
        <div className="absolute -left-3 top-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
        <div className="absolute -right-3 top-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none" />

        {/* The Marquee Track */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[...BUILDERS, ...BUILDERS].map((builder, i) => (
            <div
              key={`${builder.name}-${i}`}
              className="
                flex items-center justify-center 
                mx-8 h-24 w-40
                transition-all duration-300
              "
            >
              {builder.url ? (
                <img
                  src={builder.url}
                  alt={builder.name}
                  title={builder.name}
                  className="
                    max-h-24 max-w-[150px] w-auto h-auto object-contain
                    transition-all duration-500 ease-in-out
                     hover:opacity-100 hover:scale-110
                    /* Mix blend helps remove white box backgrounds on logos */
                    mix-blend-multiply
                  "
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                    // Fallback logic could go here to show text instead
                    (
                      e.currentTarget.parentElement as HTMLElement
                    ).innerText = builder.name;
                  }}
                />
              ) : (
                <span className="text-lg font-semibold text-slate-400 font-serif">
                  {builder.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}