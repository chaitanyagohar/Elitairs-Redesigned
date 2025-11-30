// app/page.tsx
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import PartnerSlider from "@/components/home/PartnerSlider";
import AnimatedStats from "@/components/home/AnimatedStats";
import HeroVideo from "@/components/home/HeroVideo";
import ScrollReveal from "@/components/home/ScrollReveal";
import RevealStyles from "@/components/home/RevealStyles";

export const dynamic = "force-dynamic";

async function getProjects() {
  return await prisma.project.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white">
      <Navbar />

      {/* client that triggers intersection reveal */}
      <ScrollReveal />

      {/* HERO (client-side component with split-text) */}
      <HeroVideo />

      {/* --- FEATURED PROJECTS (Slider) --- */}
      <section className="py-24 bg-white relative z-10 border-b border-gray-100">
        <div className="container mx-auto px-6 relative">
          <div
            className="flex flex-col md:flex-row justify-between items-end mb-12 reveal-on-scroll"
            data-delay="80"
          >
            <div>
              <span className="text-[#FFC40C] uppercase tracking-widest text-xs font-bold">
                The Collection
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 text-black tracking-tight">
                Signature Residences
              </h2>
            </div>
            <Link
              href="/projects"
              className="group flex items-center gap-2 border-b-2 border-black pb-1 hover:text-[#FFC40C] hover:border-[#FFC40C] transition-all mt-6 md:mt-0"
            >
              <span className="uppercase tracking-widest text-xs font-bold">
                View All Projects
              </span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide">
            {projects.map((project) => {
              const thumb = project.coverImage;
              return (
                <article
                  key={project.id}
                  className="min-w-[85vw] md:min-w-[400px] snap-center group cursor-pointer reveal-on-scroll"
                  data-delay="120"
                >
                  <Link
                    href={`/projects/${project.slug ?? project.id}`}
                    className="block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6 shadow-sm group-hover:shadow-xl transition-shadow rounded-sm transform-gpu hover:-translate-y-1 hover:scale-[1.01]">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Image Unavailable
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black shadow-sm">
                        {project.status ?? "For Sale"}
                      </div>
                    </div>

                    <div className="space-y-1 px-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold group-hover:text-[#FFC40C] transition-colors text-black tracking-tight">
                          {project.title}
                        </h3>
                        <span className="text-[#FFC40C] font-bold whitespace-nowrap ml-4 text-sm">
                          {project.price}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide font-medium">
                        {project.location ?? "Gurugram"} •{" "}
                        {project.propertyType ?? "Residential"}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}

            <div
              className="min-w-[200px] flex items-center justify-center snap-center reveal-on-scroll"
              data-delay="160"
            >
              <Link
                href="/projects"
                className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#FFC40C] hover:border-[#FFC40C] hover:text-white transition-all text-gray-400"
              >
                <span className="text-2xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARTNERS STRIP --- */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 text-center mb-8 reveal-on-scroll" data-delay="80">
          <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold block">
            Trusted Partners
          </span>
        </div>
        <div className="reveal-on-scroll" data-delay="120">
          <PartnerSlider />
        </div>
      </section>

      {/* --- SERVICES BRIEF --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto reveal-on-scroll" data-delay="90">
            <span className="text-[#FFC40C] uppercase tracking-widest text-xs font-bold">
              Holistic Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
              Comprehensive Expertise
            </h2>
            <p className="text-gray-500 font-light">
              From market intelligence to after-sales care, we manage every
              aspect of your property journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Research & Analysis",
                icon: "📊",
                desc: "Data-driven insights into market trends and property values.",
              },
              {
                title: "Home Loan Consulting",
                icon: "💰",
                desc: "Navigating loan options for the best rates and easy repayment.",
              },
              {
                title: "Legal Consultation",
                icon: "⚖️",
                desc: "Expert guidance to handle regulations and secure acquisitions.",
              },
              {
                title: "Real Estate Consulting",
                icon: "🏢",
                desc: "Strategic advice to transform ventures into successful assets.",
              },
              {
                title: "NRI Services",
                icon: "🌏",
                desc: "Specialized ecosystem for Global Indians investing in India.",
              },
              {
                title: "After Sales Assistance",
                icon: "🤝",
                desc: "Documentation, handover, and property management support.",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="group p-8 border border-gray-100 hover:border-[#FFC40C] hover:shadow-xl transition-all duration-300 rounded-sm bg-gray-50/50 hover:bg-white reveal-on-scroll"
                data-delay={120 + i * 60}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 grayscale group-hover:grayscale-0">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#FFC40C] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal-on-scroll" data-delay="220">
            <Link
              href="/services"
              className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-[#FFC40C] hover:border-[#FFC40C] transition-all"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* --- ABOUT BRIEF (Staggered Layout) --- */}
      <section className="py-32 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 relative reveal-on-scroll" data-delay="100">
              <div className="absolute -top-4 -left-4 w-full h-full border border-[#FFC40C] opacity-50"></div>

              <img
                src="/homepage-about.jpeg"
                alt="About Elitairs"
                className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700 relative z-10"
              />
            </div>

            <div className="md:w-1/2 md:pl-10 reveal-on-scroll" data-delay="180">
              <span className="uppercase tracking-widest text-xs font-bold mb-4 block text-[#FFC40C]">
                About Elitairs
              </span>

              <h2 className="text-4xl md:text-6xl font-sans mb-8 leading-tight">
                More Than Agents, <br />
                <span className="text-gray-500 italic">We Are Partners.</span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
                Elitairs was born from a desire to elevate the real estate
                experience in Gurugram. We don't just sell square footage; we
                curate lifestyles and build wealth portfolios.
              </p>

              <div className="my-10 border-t border-gray-200 pt-10 reveal-on-scroll" data-delay="260">
                <AnimatedStats />
              </div>

              <Link
                href="/about"
                className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#FFC40C] hover:text-black transition-colors"
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- AREAS WE SERVE (Masonry Style) --- */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center mb-16 reveal-on-scroll" data-delay="90">
          <span className="uppercase tracking-widest text-xs font-bold text-[#FFC40C]">Prime Locations</span>

          <h2 className="text-4xl md:text-5xl font-sans mt-4">Where We Operate</h2>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px]">
          {[
            { name: "New Delhi", img: "/img8.jpg", span: "md:col-span-2 md:row-span-2" },
            { name: "Gurugram", img: "/img6.jpg", span: "md:col-span-1 md:row-span-1" },
            { name: "Faridabad", img: "/img7.jpg", span: "md:col-span-1 md:row-span-2" },
            { name: "Noida and Greater Noida", img: "/noida.avif", span: "md:col-span-1 md:row-span-1" },
          ].map((area, i) => (
            <div
              key={i}
              className={`relative group overflow-hidden ${area.span} reveal-on-scroll`}
              data-delay={120 + i * 80}
            >
              <img src={area.img} alt={area.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-bold font-sans">{area.name}</h3>

                <p className="text-[#FFC40C] text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  View Listings
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-on-scroll" data-delay="100">
            <span className="text-[#FFC40C] uppercase tracking-widest text-sm font-bold">Client Stories</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight">Trusted by the Best</h2>
          </div>

          <div className="reveal-on-scroll" data-delay="160">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* --- BIG CTA --- */}
      <section className="py-24 bg-[#0a0a0a] text-white text-center">
        <div className="container mx-auto px-6 reveal-on-scroll" data-delay="120">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Ready to find your dream home?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="px-10 py-4 bg-[#FFC40C] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Book Consultation
            </Link>
            <a href="tel:+917081808180" className="px-10 py-4 border border-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Call +91 70818 08180
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* inject reveal & micro interaction styles from client component */}
      <RevealStyles />
    </div>
  );
}
