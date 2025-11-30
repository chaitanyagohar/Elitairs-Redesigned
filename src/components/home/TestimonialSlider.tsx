"use client";
import React, { useState, useEffect } from "react";

const testimonials = [
  {
    text: "Elitairs helped us find our dream penthouse in Camellias. The level of transparency and professionalism was unmatched.",
    author: "Rajesh Malhotra",
    role: "CEO, Tech India",
  },
  {
    text: "As an NRI, I was worried about managing my assets. Their team handled everything from legal to leasing seamlessly.",
    author: "Anita Desai",
    role: "Investor, London",
  },
  {
    text: "Their market insights helped me double my commercial portfolio returns in just 3 years. Highly recommended.",
    author: "Vikram Singh",
    role: "Real Estate Developer",
  },
  {
    text: "A truly curated experience. They understood exactly what we were looking for in Golf Course Extension.",
    author: "Meera Kapoor",
    role: "Interior Designer",
  },
  {
    text: "The team at Elitairs operates with a level of sophistication that is rare in the Gurugram market.",
    author: "Dr. A.K. Sharma",
    role: "Surgeon",
  },
  {
    text: "Seamless paperwork and excellent after-sales support. They made buying our first luxury home a breeze.",
    author: "Priya & Rahul",
    role: "Entrepreneurs",
  },
  {
    text: "Best consultation for commercial leasing. They secured a prime spot for our retail flagship.",
    author: "Sanjay Gupta",
    role: "Retail Chain Owner",
  },
  {
    text: "Trustworthy and data-driven. I rely on their quarterly reports for all my investment moves.",
    author: "Kevin Pietersen",
    role: "Global Investor",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Display 3 items at a time on desktop, 1 on mobile
  // We'll just slice the array to show a "window" of testimonials
  // For a simple smooth effect, we just render one big active one or a row.
  // Let's do a single active highlight with a fading effect for maximum "Premium" feel.

  return (
    <div className="relative w-full max-w-4xl mx-auto min-h-[300px] flex flex-col items-center justify-center text-center">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center justify-center ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <span className="text-6xl text-[#ffc40c] opacity-40 mb-6">“</span>
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-8 text-gray-700 max-w-2xl">
            {t.text}
          </p>
          <div>
            <h4 className="font-bold text-lg tracking-wide uppercase">{t.author}</h4>
            <p className="text-xs uppercase tracking-widest text-[#ffc40c] mt-1">{t.role}</p>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute -bottom-12 flex gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 transition-all duration-300 ${
              i === index ? "w-8 bg-[#ffc40c]" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}