"use client";

import React, { useState, useEffect } from "react";

export default function LiveVisitorTicker() {
  // Start with a realistic default number
  const [visitors, setVisitors] = useState(142);

  useEffect(() => {
    // Change the number every 6 seconds to simulate live traffic
    const interval = setInterval(() => {
      // Generates a random number between 100 and 150
      const newCount = Math.floor(Math.random() * (150 - 100 + 1)) + 100;
      setVisitors(newCount);
    }, 6000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div 
      className="absolute bottom-6 left-4 md:bottom-8 md:left-8 z-40 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 shadow-2xl reveal-on-scroll" 
      data-delay="300"
    >
      {/* Pulsating Green Dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
      </span>
      
      {/* Ticker Text */}
      <span className="text-gray-200 text-[10px] md:text-xs font-medium tracking-wide">
        <strong className="text-white font-bold transition-all duration-300">{visitors}</strong> people viewing right now
      </span>
    </div>
  );
}