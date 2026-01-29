// File: src/components/project/AmenitiesSlider.tsx
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Define the shape of our amenity data
interface Amenity {
  id: string;
  name: string;
  icon: string; // Image URL
}

export default function AmenitiesSlider({
  amenities,
}: {
  amenities: Amenity[];
}) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="w-full bg-[#fffadd] py-10">

      {/* Section Heading */}
      <div className="text-center mb-8">
        <h3 className="text-[#C5A059] font-bold tracking-widest text-xs uppercase mb-2">
          Experience Luxury
        </h3>
        <h2 className="text-4xl font-serif text-black">
          Premium Amenities
        </h2>
      </div>

      {/* Custom Navigation */}
      <div className="flex justify-end gap-3 mb-4 pr-4">
        <button
          className="amenities-prev custom-nav-btn"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          className="amenities-next custom-nav-btn"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1.2}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".amenities-next",
          prevEl: ".amenities-prev",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="w-full h-[350px] !pb-12"
      >
        {amenities.map((item, index) => (
          <SwiperSlide key={index} className="h-full ">
            <div className="relative w-full h-full rounded-sm overflow-hidden group shadow-lg cursor-pointer">

              {/* Background Image */}
              <img
                src={item.icon || ""}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">

                <div className="w-10 h-1 bg-[#C5A059] mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <h3 className="text-white text-xl font-bold font-serif tracking-wide">
                  {item.name}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Custom Arrow Buttons */
        .custom-nav-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: white;
          color: #c5a059;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .custom-nav-btn:hover {
          background: #c5a059;
          color: white;
          transform: scale(1.05);
        }

        /* Hide Default Swiper Arrows */
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }

        /* Active Pagination Dot */
        .swiper-pagination-bullet-active {
          background: #c5a059 !important;
        }
      `}</style>
    </div>
  );
}
