"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MapViewer from "@/components/MapViewer";

const cityData: any = {
    gurgaon: {
  name: "Gurgaon",
  hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  map: "/maps/Gurgaon.jpg",
  pdf: "/files/Gurgaon.pdf",
},
  delhi: {
    name: "Delhi",
    hero:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    map: "/maps/Delhi.jpg",
    pdf: "/files/Delhi.pdf",
  },
  noida: {
    name: "Noida",
    hero:
      "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a",
    map: "/maps/Noida.jpg",
    pdf: "/files/Noida.pdf",
  },
  yamuna: {
    name: "Yamuna Expressway",
    hero:
      "https://images.unsplash.com/photo-1627824855534-7d299f75a3b4",
    map: "/maps/Yamuna.jpg",
    pdf: "/files/Yamuna.pdf",
  },
  sohna: {
    name: "Sohna",
    hero:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    map: "/maps/Sohna.jpg",
    pdf: "/files/Sohna.pdf",
  },
  faridabad: {
    name: "Faridabad",
    hero:
      "https://images.unsplash.com/photo-1605106715994-18d3fecffb98",
    map: "/maps/Faridabad.jpg",
    pdf: "/files/Faridabad.pdf",
  },
};

export default function CityMasterPlan({ params }: any) {
  const city = cityData[params.city];

  const [zoom, setZoom] = React.useState(1);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  const move = (e: any) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    setPos({ x: -x * 120, y: -y * 120 });
  };

  if (!city) return null;

  return (
    <div className="bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center text-white">
        <Image src={city.hero} fill className="object-cover" alt="" />
        <div className="absolute inset-0 bg-black/70" />
        <h1 className="relative z-10 text-6xl font-bold">
          {city.name} Master Plan
        </h1>
      </section>

      {/* MAP */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-bold">{city.name} Zoning Map</h2>
          <a
            href={city.pdf}
            download
            className="bg-black text-white px-6 py-3 hover:bg-[#FFC40C] hover:text-black transition"
          >
            Download PDF
          </a>
        </div>

       <MapViewer src={city.map} />
      </section>

      <Footer />
    </div>
  );
}
