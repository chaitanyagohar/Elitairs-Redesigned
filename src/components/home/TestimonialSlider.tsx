"use client";
import React, { useState, useEffect } from "react";

const testimonials = [
  {
    text: "Elitairs helped us find our dream penthouse in Camellias. The level of transparency and professionalism was unmatched.",
    author: "Rajesh Malhotra",
    role: "CEO, Tech India",
    photo: "/clients/rajesh.jpg",
  },
  {
    text: "As an NRI, I was worried about managing my assets. Their team handled everything from legal to leasing seamlessly.",
    author: "Anita Desai",
    role: "Investor, London",
    photo: "/clients/anita.jpg",
  },
  {
    text: "Their market insights helped me double my commercial portfolio returns in just 3 years. Highly recommended.",
    author: "Vikram Singh",
    role: "Real Estate Developer",
    photo: "/clients/vikram.jpg",
  },
  {
    text: "A truly curated experience. They understood exactly what we were looking for in Golf Course Extension.",
    author: "Meera Kapoor",
    role: "Interior Designer",
    photo: "/clients/meera.jpg",
  },
  {
    text: "The team at Elitairs operates with a level of sophistication that is rare in the Gurugram market.",
    author: "Dr. A.K. Sharma",
    role: "Surgeon",
    photo: "/clients/sharma.jpg",
  },
  {
    text: "Seamless paperwork and excellent after-sales support. They made buying our first luxury home a breeze.",
    author: "Priya & Rahul",
    role: "Entrepreneurs",
    photo: "/clients/priya-rahul.jpg",
  },
  {
    text: "Best consultation for commercial leasing. They secured a prime spot for our retail flagship.",
    author: "Sanjay Gupta",
    role: "Retail Chain Owner",
    photo: "/clients/sanjay.jpg",
  },
  {
    text: "Trustworthy and data-driven. I rely on their quarterly reports for all my investment moves.",
    author: "Kevin Pietersen",
    role: "Global Investor",
    photo: "/clients/kevin.jpg",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Container: Removed min-h-screen. Added padding (py-24) to define height naturally.
    <section className="relative w-full py-24 md:py-32 max-h-[66vh] flex items-center justify-center bg-white">
      
      {/* Background Dots: Fills the component space (inset-0) with a Radial Mask */}
      <div className="absolute inset-0 w-full h-full 
        bg-[radial-gradient(#e5c100_2px,transparent_1px)] 
        [background-size:24px_24px] 
        [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]
        pointer-events-none" 
      />

      <div className="relative w-full max-w-6xl px-6 z-10">
        <div className="relative min-h-[450px] flex items-center justify-center">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-in-out ${
                i === index
                  ? "opacity-100 translate-y-0 scale-100 blur-0 visible"
                  : "opacity-0 translate-y-8 scale-[0.95] blur-sm invisible"
              }`}
            >
              {/* Client Photo */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-[4px] border-white shadow-xl mb-6">
                {t.photo ? (
                  <img
                    src={t.photo}
                    alt={t.author}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </div>

              {/* Quote Icon */}
              <span className="text-7xl font-serif text-[#d9a507] opacity-50 mb-4 leading-none select-none">
                “
              </span>

              {/* Text - Bold & Serif */}
              <p className="text-2xl md:text-4xl font-serif font-medium leading-tight mb-8 text-gray-900 max-w-4xl tracking-tight drop-shadow-sm">
                {t.text}
              </p>

              {/* Author Details */}
              <div className="flex flex-col items-center gap-1">
                <h4 className="font-black text-lg md:text-xl tracking-wide uppercase text-black">
                  {t.author}
                </h4>
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#b58b00]">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out shadow-sm ${
                i === index
                  ? "w-12 bg-[#b58b00]"
                  : "w-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}