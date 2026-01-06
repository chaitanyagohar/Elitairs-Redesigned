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

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[index];

  return (
    <section className="relative w-full bg-white py-28 md:py-36 overflow-hidden">
      {/* Subtle gold divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[2px] bg-[#b58b00]" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT: Editorial Heading */}
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[#b58b00] font-semibold">
              Client Perspectives
            </p>

            <h2 className="text-4xl md:text-6xl font-serif font-semibold text-black leading-tight">
              Trusted by those<br />
              who expect more.
            </h2>

            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              Every relationship we build is rooted in discretion, insight, and long-term value creation.
            </p>
          </div>

          {/* RIGHT: Testimonial */}
          <div className="relative min-h-[260px]">
            <div
              key={index}
              className="absolute inset-0 transition-all duration-1000 ease-out
                opacity-100 translate-y-0"
            >
              <blockquote className="text-2xl md:text-3xl font-serif text-black leading-snug mb-10">
                <span className="text-[#b58b00] text-5xl leading-none mr-2">“</span>
                {t.text}
              </blockquote>

              <div className="border-l-2 border-[#b58b00] pl-6">
                <p className="font-bold uppercase tracking-wide text-black">
                  {t.author}
                </p>
                <p className="text-sm uppercase tracking-widest text-gray-500 mt-1">
                  {t.role}
                </p>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="absolute -bottom-10 left-0 flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-[2px] transition-all duration-500 ${
                    i === index
                      ? "w-14 bg-[#b58b00]"
                      : "w-6 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
