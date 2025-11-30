"use client";

import React, { useEffect, useState, useRef } from "react";

function CountUp({ end, prefix = "", suffix = "", duration = 2000 }: { end: number, prefix?: string, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(ease * end));
      if (percentage < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{prefix}{count}{suffix}</span>;
}

export default function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
      {[
        { val: 500, suffix: "+", label: "Happy Families" },
        { val: 15, suffix: "+", label: "Years Experience" },
        { val: 50, suffix: "+", label: "Partner Developers" }
      ].map((s, i) => (
        <div key={i} className="p-4">
          <h3 className="text-4xl md:text-5xl font-extrabold text-[#ffc40c] mb-2 font-serif">
            <CountUp end={s.val} prefix={s.prefix} suffix={s.suffix} />
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{s.label}</p>
        </div>
      ))}
    </div>
  );
}