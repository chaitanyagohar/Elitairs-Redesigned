"use client";

import React, { useState, useEffect } from "react";

export default function HeroSlideshow({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={img}
            alt="Hero Background"
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${
              index === currentIndex ? "scale-110" : "scale-100"
            }`}
          />
        </div>
      ))}
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-20" />
    </div>
  );
}