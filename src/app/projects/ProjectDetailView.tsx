"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

// --- Helpers ---

// 1. Map Helper
const getMapSrc = (input: string) => {
  if (!input) return null;
  if (input.startsWith("<iframe")) {
    const match = input.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  }
  return input;
};

// 2. Video Helper
const getVideoContent = (url: string) => {
  if (!url) return null;

  // Check for YouTube
  const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const ytMatch = url.match(ytRegExp);
  
  if (ytMatch && ytMatch[2].length === 11) {
    return {
      type: "youtube",
      src: `https://www.youtube.com/embed/${ytMatch[2]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[2]}&controls=0&showinfo=0&rel=0`
    };
  }

  // Assume direct file
  return {
    type: "file",
    src: url
  };
};

// 3. Image Quality Helper (CRITICAL FIX)
const getHighQualityUrl = (url: string) => {
  if (!url) return "";
  // Only apply to Cloudinary URLs
  if (url.includes("cloudinary.com") && url.includes("/upload/")) {
    // Prevent double patching
    if (url.includes("q_auto:best")) return url;
    // Inject quality parameters: q_auto:best (Highest Quality), f_auto (Best Format)
    return url.replace("/upload/", "/upload/q_auto:best,f_auto/");
  }
  return url;
};

interface ProjectDetailViewProps {
  project: any;
  similarProjects?: any[];
}

export default function ProjectDetailView({ project, similarProjects }: any) {
  const [activeSection, setActiveSection] = useState("overview");
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  
  const mapUrl = getMapSrc(project.googleMapUrl);
  const videoContent = getVideoContent(project.videoUrl);
  
  // Safe Access
  const floorPlans = project.floorplans || [];
  const amenities = project.projectAmenities || [];

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "video", "location", "plans", "gallery", "amenities"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 130;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
           {project.coverImage ? (
             <img 
               src={getHighQualityUrl(project.coverImage)} 
               alt={project.title} 
               className="w-full h-full object-cover animate-scale-slow" 
             />
           ) : (
             <div className="w-full h-full bg-gray-900" />
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20 pb-24 pt-32 px-6 md:px-12 bg-gradient-to-t from-black to-transparent">
           <div className="container mx-auto">
              <div className="max-w-4xl">
                 <div className="flex items-center gap-3 mb-4 animate-fade-in-up">
                    <span className="bg-[#FFC40C] text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                      {project.status || "New Launch"}
                    </span>
                    <span className="text-white border border-white/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm backdrop-blur-sm">
                      {project.propertyType}
                    </span>
                 </div>
                 
                 <h1 className="text-5xl md:text-7xl font-sans font-bold text-white mb-2 uppercase leading-none tracking-tight animate-fade-in-up delay-100">
                   {project.title}
                 </h1>
                 
                 <p className="text-xl md:text-2xl text-gray-200 font-light flex items-center gap-2 mb-6 animate-fade-in-up delay-200">
                    <span className="text-[#FFC40C]">📍</span> {project.location}, {project.city}
                 </p>

                 <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-mono border-t border-white/20 pt-6 animate-fade-in-up delay-300">
                    <div>
                       <span className="block text-gray-500 uppercase tracking-widest text-[9px] mb-1">RERA Registration</span>
                       <span className="text-white">{project.rera || "Pending"}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 2. STICKY NAV */}
      <div className="sticky top-[68px] z-40 bg-white border-b border-gray-200 shadow-sm">
         <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="flex overflow-x-auto scrollbar-hide gap-10">
               {["Overview", "Video", "Location", "Plans", "Gallery", "Amenities"].map((item) => (
                 <button 
                   key={item} 
                   onClick={() => scrollTo(item.toLowerCase())} 
                   className={`py-5 text-xs font-bold uppercase tracking-widest border-b-4 transition-all whitespace-nowrap ${
                     activeSection === item.toLowerCase() 
                       ? "border-[#FFC40C] text-black" 
                       : "border-transparent text-gray-400 hover:text-black"
                   }`}
                 >
                   {item}
                 </button>
               ))}
            </div>
            
            <div className="hidden md:flex items-center gap-4">
               {project.brochure && (
                 <a href={project.brochure} target="_blank" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#FFC40C] px-4 py-2 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span>Brochure</span>
                 </a>
               )}
               <Link href="/contact" className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#FFC40C] hover:text-black transition-colors">
                 Enquire Now
               </Link>
            </div>
         </div>
      </div>

      <div className="bg-[#F8F9FA]">
      
         {/* 3. OVERVIEW (Text + Image Only) */}
         <section id="overview" className="py-24 bg-white">
            <div className="container mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-8">
                     <span className="text-[#FFC40C] font-bold uppercase tracking-widest text-xs">Overview</span>
                     <h2 className="text-4xl md:text-5xl font-sans font-bold leading-tight text-black uppercase">
                       {project.title} <br/> <span className="text-gray-400 font-light">At a Glance</span>
                     </h2>
                     <div className="prose prose-lg text-gray-600 font-light leading-relaxed whitespace-pre-wrap">
                        {project.overview || "Experience the epitome of luxury living."}
                     </div>
                     
                     <div className="grid grid-cols-2 gap-y-8 gap-x-12 pt-8 border-t border-gray-100">
                        <div><p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Starting Price</p><p className="text-2xl font-bold text-[#FFC40C]">{project.price || "On Request"}</p></div>
                        <div><p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Builder</p><p className="text-2xl font-bold text-black">{project.builder || "Elitairs"}</p></div>
                        <div><p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Possession</p><p className="text-2xl font-bold text-black">{project.launchDate || "Soon"}</p></div>
                        <div><p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Total Units</p><p className="text-2xl font-bold text-black">{project.totalUnits || "Limited"}</p></div>
                     </div>
                  </div>

                  {/* Featured Image (High Quality) */}
                  <div className="relative">
                     <div className="aspect-[4/3] w-full rounded-lg overflow-hidden shadow-2xl bg-gray-200 relative">
                        {project.coverImage ? (
                          <img 
                            src={getHighQualityUrl(project.coverImage)} 
                            alt="Overview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">Image Unavailable</div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 4. CINEMATIC VIDEO (60vh, Autoplay) */}
         {videoContent && (
           <section id="video" className="w-full h-[60vh] bg-black relative overflow-hidden group">
              {videoContent.type === "youtube" ? (
                <iframe 
                  src={videoContent.src} 
                  title="Project Video" 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  style={{ border: 0 }}
                />
              ) : (
                <video
                  src={videoContent.src}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}
              <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
           </section>
         )}

         {/* 5. LOCATION */}
         <section id="location" className="py-24 bg-[#F8F9FA] border-t border-gray-200">
            <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                  <span className="text-[#FFC40C] font-bold uppercase tracking-widest text-xs">Connectivity</span>
                  <h2 className="text-4xl font-bold mt-2 uppercase">What is near you?</h2>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
                  <div className="lg:col-span-2 min-h-[500px] relative bg-gray-200">
                     {mapUrl ? (
                        <iframe src={mapUrl} className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
                     ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold bg-gray-100">Map Data Not Available</div>
                     )}
                  </div>
                  <div className="lg:col-span-1 p-8 lg:p-10 bg-white h-[500px] overflow-y-auto custom-scrollbar">
                     <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-[#FFC40C]"></span> Location Highlights
                     </h3>
                     <div className="space-y-6">
                        {project.connectivity?.map((c: string, i: number) => (
                           <div key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium border-b border-gray-100 pb-3">
                              <span className="text-[#FFC40C] mt-1">●</span> {c}
                           </div>
                        ))}
                        {!project.connectivity?.length && <p className="text-gray-400 text-sm">Connectivity details coming soon.</p>}
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 6. FLOOR PLANS (Hero Slider with High Quality) */}
         <section id="plans" className="py-24 bg-white border-t border-gray-200">
            <div className="container mx-auto px-6">
               <div className="text-center mb-12">
                  <span className="text-[#FFC40C] font-bold uppercase tracking-widest text-xs">Blueprints</span>
                  <h2 className="text-4xl font-bold mt-2 uppercase">Smartly Designed Plans</h2>
               </div>

               {floorPlans.length > 0 ? (
                 <div className="flex flex-col items-center gap-8">
                    {/* Large Preview Area */}
                    <div className="w-full max-w-5xl h-[600px] bg-gray-50 border border-dashed border-gray-300 rounded-xl flex items-center justify-center p-8 relative overflow-hidden shadow-lg">
                       <img 
                         src={getHighQualityUrl(floorPlans[activePlanIndex].url)} 
                         alt="Plan Preview" 
                         className="w-full h-full object-contain mix-blend-multiply transition-all duration-500" 
                       />
                       {/* Title Overlay */}
                       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-8 py-3 rounded-full shadow-md border border-gray-200">
                          <p className="text-sm font-bold uppercase tracking-widest text-gray-900">
                             {floorPlans[activePlanIndex].alt || "Floor Plan"}
                          </p>
                       </div>
                    </div>
                    
                    {/* Thumbnails Strip */}
                    <div className="flex gap-4 overflow-x-auto pb-4 max-w-full px-4 scrollbar-hide w-full justify-start md:justify-center">
                       {floorPlans.map((plan: any, index: number) => (
                          <button 
                            key={index}
                            onClick={() => setActivePlanIndex(index)}
                            className={`flex-shrink-0 w-28 h-28 border-2 rounded-lg overflow-hidden transition-all bg-white p-1 relative group ${
                               activePlanIndex === index ? "border-[#FFC40C] ring-2 ring-[#FFC40C]/20 opacity-100 scale-105" : "border-gray-200 opacity-60 hover:opacity-100"
                            }`}
                          >
                             <img src={getHighQualityUrl(plan.url)} className="w-full h-full object-contain" />
                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[8px] text-white font-bold uppercase text-center px-1">{plan.alt || "Plan"}</span>
                             </div>
                          </button>
                       ))}
                    </div>
                 </div>
               ) : (
                 <div className="text-center text-gray-400 py-20 bg-gray-50 rounded-lg"><span className="text-4xl block mb-2">📐</span><p>No Plans Uploaded</p></div>
               )}
            </div>
         </section>

         {/* 7. GALLERY (High Quality) */}
         <section id="gallery" className="py-24 bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
               <h2 className="text-4xl font-bold uppercase">Visual Gallery</h2>
               <span className="text-[#FFC40C] text-sm font-bold uppercase tracking-widest">{project.gallery?.length || 0} Photos</span>
            </div>
            <div className="container mx-auto px-6">
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-[250px]">
                  {project.gallery?.slice(0, 8).map((img: any, i: number) => (
                     <div key={i} className={`relative group overflow-hidden rounded-lg ${i === 0 || i === 4 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                        <img src={getHighQualityUrl(img.url)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 8. AMENITIES (Split Slider - High Quality) */}
         <section id="amenities" className="py-24 bg-white">
            <div className="container mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  <div className="lg:col-span-4 space-y-6">
                     <span className="text-[#FFC40C] font-bold uppercase tracking-widest text-xs">Lifestyle</span>
                     <h2 className="text-5xl font-serif font-bold leading-tight text-black">Luxury, <br/> Tailored for <br/> <span className="text-gray-400 italic">Life.</span></h2>
                     <p className="text-gray-500 text-lg font-light leading-relaxed">Inspired by global luxury standards, our amenities are crafted to elevate your family living experience.</p>
                  </div>
                  <div className="lg:col-span-8 overflow-hidden">
                     {amenities && amenities.length > 0 ? (
                        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
                           {amenities.map((am: any, i: number) => (
                              <div key={i} className="min-w-[300px] h-[400px] relative group rounded-xl overflow-hidden shadow-lg snap-center cursor-grab">
                                 <img src={getHighQualityUrl(am.icon)} alt={am.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
                                 <div className="absolute bottom-8 left-8">
                                    <h3 className="text-white font-bold text-2xl font-serif tracking-wide">{am.name}</h3>
                                    <div className="w-12 h-1 bg-[#FFC40C] mt-3"></div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <div className="h-64 flex items-center justify-center bg-gray-50 text-gray-400 rounded-xl border border-dashed border-gray-300"><p>No Visual Amenities Uploaded</p></div>
                     )}
                  </div>
               </div>
            </div>
         </section>

         {/* 9. SIMILAR PROJECTS */}
         <section id="similar" className="py-24 bg-[#F8F9FA] border-t border-gray-200">
             <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-8">Similar Projects</h2>
                <p className="text-gray-500">Explore other properties that match your lifestyle.</p>
                
                {similarProjects?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
                    {similarProjects.map((item: any, idx: number) => (
                      <Link
                        key={item.id}
                        href={`/projects/${item.slug ?? item.id}`}
                        className="group block"
                      >
                        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-md shadow-sm transition-all duration-500">
                          <img
                            src={getHighQualityUrl(item.coverImage)}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                          />
                          <span className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-md">
                            {item.status || "Active"}
                          </span>
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                            <span className="bg-[#FFC40C] text-black px-6 py-2 text-xs font-bold uppercase tracking-widest group-hover:translate-y-0 translate-y-2 transition-all duration-500">
                              View Details
                            </span>
                          </div>
                        </div>
                        <div className="mt-5 border-t border-transparent group-hover:border-[#FFC40C] pt-4 transition-all duration-300 text-left">
                          <h3 className="text-xl font-bold group-hover:text-[#FFC40C] transition-colors">{item.title}</h3>
                          <p className="text-gray-400 text-[11px] uppercase tracking-widest mt-1">{item.location}</p>
                          <p className="text-black font-bold mt-1">{item.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="mt-8 text-gray-400 text-sm italic">No similar projects available at the moment.</p>
                )}

                <div className="mt-12">
                   <Link href="/projects" className="text-[#FFC40C] font-bold uppercase tracking-widest text-xs hover:text-black">
                      View All Projects →
                   </Link>
                </div>
             </div>
         </section>

      </div>
      <Footer />
    </div>
  );
}