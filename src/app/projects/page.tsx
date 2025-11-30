// app/projects/page.tsx
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealStyles from "@/components/home/RevealStyles";
import ScrollReveal from "@/components/home/ScrollReveal";

export const dynamic = "force-dynamic";

async function getAllProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white">
      <Navbar />

      {/* mount client helpers */}
      <ScrollReveal />
      <RevealStyles />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[60vh] flex flex-col justify-center items-center text-center px-6 pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/img5.jpg"
            className="w-full h-full object-cover"
            alt="Projects Hero"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        <div className="relative z-20 max-w-4xl">
          <div className="reveal-on-scroll" data-delay="60">
            <p className="text-[#FFC40C] uppercase tracking-[0.4em] text-xs font-bold mb-4">The Portfolio</p>
            <h1 className="text-6xl md:text-8xl font-medium mb-6 text-white/90 tracking-tight">
              Signature <span className="text-[#FFC40C] italic">Collection.</span>
            </h1>
            <p className="text-gray-100 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Explore our exclusive portfolio of residential and commercial developments across Gurugram's most coveted addresses.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FILTER STRIP (Visual) ===== */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-y border-gray-100">
        <div className="container mx-auto px-6 py-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-8 md:justify-center min-w-max">
            {["All Projects", "Residential", "Commercial"].map((filter, i) => (
              <button
                key={i}
                className={`filter-btn reveal-on-scroll px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest transition-colors ${i === 0 ? "active" : "text-gray-400 hover:text-black"}`}
                data-delay={100 + i * 80}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PROJECTS GRID (Staggered) ===== */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
              {projects.map((project, index) => (
                <Link
                  href={`/projects/${project.slug ?? project.id}`}
                  key={project.id}
                  className={`group block reveal-on-scroll project-card`}
                  data-delay={120 + (index % 6) * 60}
                >
                  {/* Image Card */}
                  <div className={`relative aspect-[3/4] overflow-hidden mb-8 bg-gray-100 rounded-sm shadow-sm transition-all duration-500 ${index % 2 !== 0 ? 'md:translate-y-20' : ''}`}>
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        Image Unavailable
                      </div>
                    )}

                    {/* Floating Status Badge */}
                    <div className="absolute top-6 left-6 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black shadow-md">
                      {project.status || "Active"}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="bg-[#FFC40C] text-black px-8 py-3 font-bold uppercase tracking-widest text-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex justify-between items-start border-t-2 p-5 border-transparent group-hover:border-[#FFC40C] pt-6 transition-colors duration-300">
                    <div className="max-w-[70%]">
                      <h3 className="text-3xl font-medium mb-2 group-hover:text-[#FFC40C] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">
                        {project.location || "Gurugram"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-xl font-bold text-black">{project.price}</span>
                      <span className="text-gray-400 text-[10px] uppercase">{project.propertyType}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center reveal-on-scroll" data-delay="160">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-2xl font-medium text-gray-900">No projects found.</h3>
              <p className="text-gray-500 mt-2">Check back later for new exclusive listings.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-32 bg-[#0a0a0a] text-white text-center">
        <div className="container mx-auto px-6">
          <div className="reveal-on-scroll" data-delay="200">
            <h2 className="text-4xl md:text-6xl font-medium mb-8">Can't find what you're looking for?</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-12 text-lg font-light">
              We have access to exclusive off-market listings that are not publicly advertised.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="px-10 py-4 bg-[#FFC40C] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-md">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
