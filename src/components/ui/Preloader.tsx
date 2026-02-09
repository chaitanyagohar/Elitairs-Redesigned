"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ✅ 1. Import Hook
import { useStartup } from "@/context/StartupContext";

export default function Preloader() {
  const { finishPreloader } = useStartup(); // ✅ Get function
  const pathname = usePathname(); // ✅ 2. Get current path
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  // ✅ 3. Check if we are on an admin page
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // ✅ 4. If on Admin page, do nothing (don't lock scroll, don't animate)
    if (isAdmin) return;

    // 1. Lock Body Scroll
    document.body.style.overflow = "hidden";

    // 2. Counter Animation
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 20);

    // 3. Dismiss Loader
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
      // ✅ TELL THE BRAIN: "I AM DONE"
      finishPreloader();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isAdmin]);

  // ✅ 5. Render NOTHING if on admin page
  if (isAdmin) return null;

  // Animation Variants for the Split Curtain
  const curtainVariants = {
    initial: { height: "50vh" },
    exit: { 
      height: 0, 
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
    }
  };

  const contentVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.3 } 
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none">
          
          {/* --- TOP CURTAIN PANEL --- */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#050505] z-0"
            variants={curtainVariants}
            initial="initial"
            exit="exit"
          />

          {/* --- BOTTOM CURTAIN PANEL --- */}
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-[#050505] z-0"
            variants={curtainVariants}
            initial="initial"
            exit="exit"
          />

          {/* --- MAIN CONTENT --- */}
          <motion.div 
            className="relative z-10 flex flex-col items-center justify-center w-full h-full"
            variants={contentVariants}
            initial="initial"
            exit="exit"
          >
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FFC40C]/5 blur-[100px] rounded-full pointer-events-none" />

            {/* LOGO CONTAINER */}
            <div className="relative mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-56 h-20 md:w-72 md:h-24"
              >
                <Image 
                  src="/elitairs-logo2trans.png" 
                  alt="Elitairs Logo" 
                  fill 
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100px, 200px" // Tells browser: "It's small, don't download the huge version
                />
              </motion.div>
            </div>

            {/* PROGRESS SEPARATOR LINE */}
            <div className="w-64 h-[1px] bg-gray-800 relative overflow-hidden mb-6">
               <motion.div 
                 className="absolute top-0 bottom-0 left-0 right-0 bg-[#FFC40C] m-auto"
                 initial={{ width: "0%" }}
                 animate={{ width: `${counter}%` }}
                 transition={{ ease: "linear", duration: 0.1 }}
               />
            </div>

            {/* TAGLINE */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-[10px] md:text-xs uppercase text-[#FFC40C] font-semibold text-center"
            >
              Elite Assets • Elevated Income
            </motion.p>

            {/* GIANT WATERMARK COUNTER */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16 overflow-hidden">
                <motion.span 
                    className="block text-6xl md:text-9xl font-black text-white/5 tabular-nums leading-none"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    {counter}
                </motion.span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}