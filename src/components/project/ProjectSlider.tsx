// components/project/ProjectSlider.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

type Project = {
  id: string | number;
  slug?: string;
  title: string;
  coverImage?: string | null;
  location?: string | null;
  price?: string | null;
  status?: string | null;
};

export default function ProjectSlider({ projects, title = "You may also like" }: { projects: Project[]; title?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const check = () => {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    };

    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [projects]);

  function scrollBy(direction: "left" | "right") {
    const el = containerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".slider-card");
    const cardWidth = (card?.offsetWidth ?? 300) + 16; // card width + gap
    const distance = direction === "left" ? -cardWidth * 1.2 : cardWidth * 1.2;
    el.scrollBy({ left: distance, behavior: "smooth" });
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-bold">{title}</h3>

          {/* controls (hidden on very small devices but touch still works) */}
          <div className="flex gap-2">
            <button
              onClick={() => scrollBy("left")}
              aria-label="Previous"
              className={`p-2 rounded-full border bg-white shadow-sm hover:shadow-md transition ${!canScrollLeft ? "opacity-40 pointer-events-none" : ""}`}
            >
              ‹
            </button>
            <button
              onClick={() => scrollBy("right")}
              aria-label="Next"
              className={`p-2 rounded-full border bg-white shadow-sm hover:shadow-md transition ${!canScrollRight ? "opacity-40 pointer-events-none" : ""}`}
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-4 px-4"
          // allow mouse drag on desktop too (enhancement)
          onMouseDown={(e) => {
            const el = containerRef.current;
            if (!el) return;
            const startX = e.pageX - el.offsetLeft;
            const scrollLeft = el.scrollLeft;
            const onMove = (ev: MouseEvent) => {
              const x = ev.pageX - el.offsetLeft;
              const walk = (x - startX) * 1; // drag speed
              el.scrollLeft = scrollLeft - walk;
            };
            const onUp = () => {
              document.removeEventListener("mousemove", onMove);
              document.removeEventListener("mouseup", onUp);
            };
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
          }}
        >
          <div className="flex gap-4 pb-4">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.slug ?? p.id}`}
                className="slider-card snap-center min-w-[240px] md:min-w-[280px] lg:min-w-[320px] bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0"
              >
                <div className="relative h-40 md:h-44 bg-gray-200 overflow-hidden">
                  {p.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                  )}
                  {p.status && <div className="absolute top-3 left-3 bg-[#FFC40C] text-white text-[10px] font-bold px-2 py-1 rounded uppercase">{p.status}</div>}
                </div>

                <div className="p-3 flex flex-col flex-grow">
                  <h4 className="font-bold text-sm md:text-base line-clamp-2">{p.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{p.location ?? "Gurugram"}</p>
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Starting from</p>
                    <p className="font-bold text-sm md:text-base">{p.price ?? "Call for Price"}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
