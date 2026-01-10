"use client";
import Link from "next/link";

const cities = [
  { name: "Gurgaon", slug: "gurgaon" },
  { name: "Delhi", slug: "delhi" },
  { name: "Noida", slug: "noida" },
  { name: "Yamuna Expressway", slug: "yamuna" },
  { name: "Sohna", slug: "sohna" },
  { name: "Faridabad", slug: "faridabad" },
];

export default function MasterPlanHub() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-12">Regional Master Plans</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/master-plan/${city.slug}`}
            className="border border-[#FFC40C] px-12 py-10 text-center hover:bg-[#FFC40C] hover:text-black transition text-xl uppercase tracking-wider"
          >
            {city.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
