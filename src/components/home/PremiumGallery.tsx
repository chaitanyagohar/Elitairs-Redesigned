"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const galleryImages = [
  "/saurabh1.jpeg",
  "/saurabh2.jpeg",
  "/saurabh3.jpeg",
  "/saurabh4.jpeg",
  "/saurabh6.jpeg",
  "/saurabh7.jpeg",
  "/saurabh8.jpeg",
  "/saurabh10.jpeg",
];

/* Animation Variants */
const frameVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

export default function PremiumGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-b from-gray-100 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Frames of Excellence
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            A curated collection of moments where vision meets reality.
          </p>
        </motion.div>

        {/* Responsive Grid (No 1 Column Issue) */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6 sm:gap-8 md:gap-10
          "
        >
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              variants={frameVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ y: -15 }}
              className="relative group cursor-pointer"
            >
              {/* Drop Shadow */}
              <div className="absolute inset-0 bg-black/30 blur-2xl scale-90 translate-y-8 -z-20 transition-all duration-500 group-hover:translate-y-12 group-hover:scale-105"></div>

              {/* Fixed Aspect Ratio Wrapper */}
              <div className="relative w-full aspect-[3/4]">

                {/* Image Inside Frame */}
                <div className="absolute inset-[14%] overflow-hidden rounded-sm">
                  <Image
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Subtle Inner Shadow for Realism */}
                  <div className="absolute inset-0 shadow-inner shadow-black/30 pointer-events-none"></div>
                </div>

                {/* Frame Overlay */}
                <Image
                  src="/frame.png"
                  alt="Gold Frame"
                  fill
                  priority={i < 2}
                  className="object-contain pointer-events-none select-none"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
