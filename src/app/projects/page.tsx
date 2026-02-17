import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealStyles from "@/components/home/RevealStyles";
import ScrollReveal from "@/components/home/ScrollReveal";
import ProjectFilters from "@/components/project/ProjectFilters";
import ProjectSort from "@/components/project/ProjectSort";
import { Metadata } from "next"; // ✅ 1. Import Metadata

export const dynamic = "force-dynamic";

// ✅ 2. ADD THIS: Isse Google Search par title fix ho jayega
export const metadata: Metadata = {
  title: "Luxury Properties in Gurugram | Elitairs Real Estate",
  description: "Browse our exclusive collection of luxury apartments, penthouses, and commercial properties in Gurugram's prime locations.",
};

// --- HELPER: Price Logic ---
function parsePrice(priceStr: string | null): number {
  if (!priceStr) return 0;
  const clean = priceStr.toLowerCase().replace(/,/g, '').trim();
  const match = clean.match(/([\d.]+)/);
  if (!match) return 0;
  let val = parseFloat(match[1]);
  if (clean.includes("cr")) val *= 10000000;
  else if (clean.includes("l")) val *= 100000;
  else if (clean.includes("k")) val *= 1000;
  return val;
}

// --- FETCH & FILTER LOGIC ---
async function getFilteredProjects(searchParams: { [key: string]: string | string[] | undefined }) {
  const where: any = {};

  if (typeof searchParams.search === 'string' && searchParams.search.length > 0) {
    where.OR = [
      { title: { contains: searchParams.search, mode: 'insensitive' } },
      { builder: { contains: searchParams.search, mode: 'insensitive' } }
    ];
  }

  if (typeof searchParams.location === 'string' && searchParams.location.length > 0) {
    where.OR = [
       ...(where.OR || []),
       { city: { contains: searchParams.location, mode: 'insensitive' } },
       { location: { contains: searchParams.location, mode: 'insensitive' } }
    ];
  }

  const bhk = searchParams.bhk;
  if (bhk) {
    const bhkList = Array.isArray(bhk) ? bhk : [bhk];
    if (bhkList.length > 0) {
       where.configurations = { hasSome: bhkList };
    }
  }

  let projects = await prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const minPriceVal = parsePrice(searchParams.minPrice as string);
  const maxPriceVal = parsePrice(searchParams.maxPrice as string);
  const sortOption = searchParams.sort as string; 

  if (minPriceVal > 0 || maxPriceVal > 0) {
    projects = projects.filter(p => {
      const pVal = parsePrice(p.price);
      if (minPriceVal > 0 && pVal < minPriceVal) return false;
      if (maxPriceVal > 0 && pVal > maxPriceVal) return false;
      return true;
    });
  }

  if (sortOption === "price_asc") {
    projects.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (sortOption === "price_desc") {
    projects.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  }

  return projects;
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const projects = await getFilteredProjects(searchParams);
  const searchTerm = typeof searchParams.search === 'string' ? searchParams.search : "";

  return (
    <div className="bg-gray-50 text-black font-sans selection:bg-[#FFC40C] selection:text-white min-h-screen pb-20 lg:pb-0">
      <Navbar />
      <ScrollReveal />
      <RevealStyles />
      <section className="bg-gradient-to-b from-black via-gray-500 to-white border-b border-gray-200 pt-24 pb-4 md:pb-8 sticky top-0 z-30 lg:relative lg:top-auto">
        <div className="container mx-auto px-4">
            <div className="text-xs md:text-sm text-gray-800 mb-1 md:mb-2">
                <Link href="/" className="hover:text-white">Home</Link> &gt; <span className="text-gray-800">Properties</span>
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-gray-900">
                {searchTerm ? `Results for "${searchTerm}"` : "All Properties"} 
                
                {/* ✅ Agar aap chahein toh screen se bhi count hata sakte hain 
                   bas niche wali line delete kar dein: 
                */}
                <span className="text-[#ffb900] font-normal text-sm md:text-lg ml-2">({projects.length} Listings)</span>
            </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            <ProjectFilters />

            <main className="w-full lg:w-3/4">
                <div className="hidden lg:flex justify-between items-center mb-6 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-sm text-gray-500">Showing <span className="font-bold text-black">{projects.length}</span> Properties</span>
                    <ProjectSort />
                </div>

                <div className="space-y-4 md:space-y-6">
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group reveal-on-scroll"
                            data-delay={100}
                        >
                            {/* Image (Left/Top) */}
                            <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden bg-gray-200">
                                {project.coverImage ? (
                                    <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                                )}
                                <div className="absolute top-3 left-3 bg-[#FFC40C] text-black text-[10px] font-bold px-2 py-1 rounded uppercase shadow-sm">
                                    {project.status ?? "For Sale"}
                                </div>
                                <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md">
                                    {project.propertyType ?? "Residential"}
                                </div>
                            </div>

                            {/* Details (Right/Bottom) */}
                            <div className="w-full md:w-3/5 p-4 md:p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h2 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#FFC40C] transition-colors truncate">
                                                {project.title}
                                            </h2>
                                            <p className="text-xs md:text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                📍 {project.location ?? "Gurugram"}, {project.city}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl md:text-2xl font-bold text-[#FFC40C]">{project.price ?? "Call"}</p>
                                            <p className="text-[10px] text-gray-400 uppercase">Starting Price</p>
                                        </div>
                                    </div>

                                    {/* INFO GRID */}
                                    <div className="grid grid-cols-2 gap-3 my-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">🏠</span>
                                            <div>
                                                <span className="block text-[10px] text-gray-400 uppercase font-bold">Config</span>
                                                <span className="text-xs font-semibold text-gray-800">
                                                    {project.configurations?.length > 0 ? project.configurations.slice(0,2).join(", ") + (project.configurations.length > 2 ? "..." : "") : "N/A"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">📐</span>
                                            <div>
                                                <span className="block text-[10px] text-gray-400 uppercase font-bold">Area</span>
                                                <span className="text-xs font-semibold text-gray-800">{project.area ?? "On Request"}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">🏗️</span>
                                            <div>
                                                <span className="block text-[10px] text-gray-400 uppercase font-bold">Builder</span>
                                                <span className="text-xs font-semibold text-gray-800 truncate max-w-[100px]">{project.builder ?? "Elitairs"}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">📅</span>
                                            <div>
                                                <span className="block text-[10px] text-gray-400 uppercase font-bold">Possession</span>
                                                <span className="text-xs font-semibold text-gray-800">{project.launchDate ?? "Soon"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* RERA Badge */}
                                    {project.rera && (
                                        <div className="mb-4 inline-flex items-center gap-1 bg-green-50 px-2 py-1 rounded border border-green-100">
                                            <span className="text-green-600 text-xs">✅</span>
                                            <span className="text-[10px] text-green-700 font-medium">RERA: {project.rera}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    <Link 
                                        href={`/projects/${project.slug ?? project.id}`}
                                        className="flex-1 bg-black text-white text-center py-3 rounded font-bold uppercase text-[10px] md:text-xs tracking-wider hover:bg-[#FFC40C] hover:text-black transition-all"
                                    >
                                        View Details
                                    </Link>
                                    <Link 
                                        href="/contact"
                                        className="flex-1 border border-black text-black text-center py-3 rounded font-bold uppercase text-[10px] md:text-xs tracking-wider hover:bg-black hover:text-white transition-all"
                                    >
                                        Enquire
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {projects.length === 0 && (
                        <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
                            <div className="text-4xl mb-2">🔍</div>
                            <h3 className="font-bold text-lg">No properties found</h3>
                            <p className="text-gray-500 text-sm">Try adjusting your filters.</p>
                            <Link href="/projects" className="text-[#FFC40C] font-bold text-sm mt-4 inline-block underline">Clear All Filters</Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
      </section>

      <Footer />
    </div>
  );
}