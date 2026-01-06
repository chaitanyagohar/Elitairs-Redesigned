"use client";
import React from "react";

// Replace these URLs with your actual logo images in the /public folder
// Example: "/logos/dlf.png"
const partners = [
  { name: "DLF", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/ef/DLF_Limited_Logo.svg/1200px-DLF_Limited_Logo.svg.png" },
  { name: "M3M", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/M3M_India_Logo.jpg" },
  { name: "Emaar", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Emaar_Properties_logo.svg/2560px-Emaar_Properties_logo.svg.png" },
  { name: "Sobha", logo: "https://upload.wikimedia.org/wikipedia/en/8/89/Sobha_Limited_Logo.jpeg" },
  { name: "Godrej", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Godrej_Group_Logo.svg/2560px-Godrej_Group_Logo.svg.png" },
  { name: "Tata", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/2560px-Tata_logo.svg.png" },
  // Add more partners here...
];

export default function PartnerSlider() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient Masks to fade edges */}
      <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" />

      {/* Scrolling Container */}
      <div className="flex w-max animate-scroll">
        {/* First Set of Logos */}
        <div className="flex gap-20 px-10 items-center">
          {partners.map((p, i) => (
            <div key={`a-${i}`} className="w-32 h-20 relative hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <img 
                src={p.logo} 
                alt={p.name} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Duplicate Set for Seamless Loop */}
        <div className="flex gap-20 px-10 items-center">
          {partners.map((p, i) => (
            <div key={`b-${i}`} className="w-32 h-20 relative grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <img 
                src={p.logo} 
                alt={p.name} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Inline Styles for the Keyframe Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}