"use client";

import React, { useEffect, useRef, useState } from "react";

type Stat = {
  id: string;
  label: string;
  value: number | string;
  suffix?: string;
  icon?: React.ReactNode;
};

function useCountUp(target: number, startWhen: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startWhen) return;

    let start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, startWhen, duration]);

  return value;
}

export default function StatsStrip({
  items,
  backgroundImage = "/statstrip.jpg",
}: {
  items: Stat[];
  backgroundImage?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-16 text-white overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          className="w-full h-full object-cover"
          alt="stats background"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 text-center">

          {items.map((stat) => {
           const isNumeric = typeof stat.value === "number";
const animatedValue = useCountUp(
  typeof stat.value === "number" ? stat.value : 0,
  visible
);

return (
  <div key={stat.id} className="flex flex-col items-center gap-2">

    <div className="text-3xl md:text-4xl">{stat.icon}</div>

    <div className="text-2xl md:text-4xl font-extrabold">
      {isNumeric
        ? animatedValue.toLocaleString()
        : stat.value}
      {stat.suffix ?? ""}
    </div>

    <div className="text-[10px] md:text-xs uppercase tracking-widest text-gray-300">
      {stat.label}
    </div>

  </div>
);

          })}

        </div>
      </div>
    </section>
  );
}
