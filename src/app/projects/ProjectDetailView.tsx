"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import ProjectSliderClientWrapper from "@/components/project/ProjectSliderClientWrapper";
import AmenitiesSlider from "@/components/project/AmenitiesSlider";

// --- HELPERS ---
const getMapSrc = (input: string) => {
  if (!input) return null;
  if (input.startsWith("<iframe")) {
    const match = input.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  }
  return input;
};

const getVideoContent = (url: string) => {
  if (!url) return null;
  // Support standard youtube, youtu.be, and embed links
  const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const ytMatch = url.match(ytRegExp);
  if (ytMatch && ytMatch[2].length === 11) {
    return {
      type: "youtube",
      // Added rel=0 to show related videos from same channel only, and enablejsapi for better control
      src: `https://www.youtube.com/embed/${ytMatch[2]}?autoplay=0&controls=1&rel=0&enablejsapi=1`,
    };
  }
  return { type: "file", src: url };
};

const getHighQualityUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("cloudinary.com") && url.includes("/upload/")) {
    if (url.includes("q_auto:best")) return url;
    return url.replace("/upload/", "/upload/q_auto:best,f_auto/");
  }
  return url;
};

// --- GOLD ICONS (Legacy Fallback) ---
const GoldIcon = ({ name }: { name: string }) => {
  const n = name.toLowerCase();
  const color = "#B08D55"; 
  let path = <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;

  if (n.includes("pool")) path = <path d="M2 20c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2M2 16c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2M2 12c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2" />;
  else if (n.includes("gym") || n.includes("fitness")) path = <path d="M6.5 6.5l11 11M21 21l-1-1M3 3l1 1M18 22l3-3-3-3M3 6l3-3 3 3M18 2l3 3-3 3M3 22l3-3-3-3M2 20l20-20" />; 
  else if (n.includes("security") || n.includes("cctv")) path = <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
  else if (n.includes("park") || n.includes("garden") || n.includes("green")) path = <path d="M12 22v-9m0 0l-3-3m3 3l3-3m-3 3c-4.5 0-8-3.5-8-8s8-12 8-12 8 7.5 8 12-3.5 8-8 8z" />;
  else if (n.includes("car") || n.includes("parking")) path = <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2m10-5h4m-14 0h4m-2 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />;
  else if (n.includes("play") || n.includes("kids")) path = <path d="M12 2L2 12l10 10 10-10L12 2zm0 0v20" />;
  else if (n.includes("jog") || n.includes("track")) path = <path d="M4 16l4-2 2 4 6-6M4 22h16" />;
  else if (n.includes("yoga") || n.includes("meditation")) path = <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zm0-14a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />;
  else if (n.includes("club") || n.includes("hall")) path = <path d="M2 22h20M4 22V10l8-4 8 4v12M12 10v12" />;
  else if (n.includes("tennis") || n.includes("court") || n.includes("badminton")) path = <circle cx="12" cy="12" r="10" />;
  else if (n.includes("senior") || n.includes("sit")) path = <path d="M4 12h16v8H4zm0 0V8h16v4M2 20v2h20v-2" />;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2 transition-transform duration-300 group-hover:scale-110">
      {path}
    </svg>
  );
};

const TabIcon = ({ type }: { type: string }) => {
  const color = "#B08D55";

  switch (type) {
    case "connectivity":
      return (
        <svg width="14" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z" />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
      );

    case "schools":
      return (
        <svg width="14" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M22 10L12 4 2 10l10 6 10-6z" />
          <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" />
        </svg>
      );

    case "hospitals":
      return (
        <svg width="14" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M12 2v20M2 12h20" />
        </svg>
      );

    case "malls":
      return (
        <svg width="14" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M6 2l1 4h10l1-4" />
          <path d="M3 6h18l-1 14H4L3 6z" />
        </svg>
      );

    default:
      return null;
  }
};

export default function ProjectDetailView({ project, similarProjects }: any) {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeLocalityTab, setActiveLocalityTab] = useState("connectivity");

  // Gallery & Lightbox
  const gallery = project?.gallery ?? [];
  const [galleryIndex, setGalleryIndex] = useState(0);
  const isInteracting = useRef(false);
  const autoplayRef = useRef<number | null>(null);
  const thumbsRowRef = useRef<HTMLDivElement | null>(null);
  const verticalThumbsRef = useRef<HTMLDivElement | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // ✅ New State for Floor Plans Modal
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<string | null>(null);

  const mapUrl = getMapSrc(project?.googleMapUrl);
  const videoContent = getVideoContent(project?.videoUrl);
  const floorPlans = project?.floorplans ?? [];
  
  // Amenities Data
const visualAmenities =
  (project?.projectAmenities ?? []).filter(
    (am: any) =>
      am &&
      (am.title || am.name) &&
      (am.image || am.icon)
  );

  const legacyAmenities = project?.amenities ?? [];

  // ✅ SMART NAV LOGIC
  const navSections = ["Overview"];
  if (videoContent) navSections.push("Video");
  navSections.push("Amenities", "Plans", "Location", "Gallery");

  // Scroll Spy
  useEffect(() => {
    const handler = () => {
      for (const s of navSections) {
        const id = s.toLowerCase();
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top >= -100 && r.top <= 250) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [navSections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 130;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Lightbox Handlers
  const openLightbox = (i: number) => { setLightboxIndex(i); setLightboxOpen(true); document.body.style.overflow = "hidden"; };
  const closeLightbox = () => { setLightboxOpen(false); document.body.style.overflow = ""; };
  const prevLightbox = () => setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const nextLightbox = () => setLightboxIndex((i) => (i + 1) % gallery.length);

  useEffect(() => {
    function start() {
      stop();
      autoplayRef.current = window.setInterval(() => {
        if (isInteracting.current) return;
        setGalleryIndex((g) => (gallery.length ? (g + 1) % gallery.length : 0));
      }, 4000);
    }
    function stop() {
      if (autoplayRef.current !== null) { window.clearInterval(autoplayRef.current); autoplayRef.current = null; }
    }
    if ((gallery?.length ?? 0) > 1) start();
    return () => stop();
  }, [gallery?.length]);

  useEffect(() => {
    const mobileThumb = thumbsRowRef.current?.querySelectorAll<HTMLElement>("button")[galleryIndex];
    if (mobileThumb && thumbsRowRef.current) {
      const parent = thumbsRowRef.current;
      const left = mobileThumb.offsetLeft - parent.clientWidth / 2 + mobileThumb.clientWidth / 2;
      parent.scrollTo({ left, behavior: "smooth" });
    }
    const vThumb = verticalThumbsRef.current?.querySelectorAll<HTMLElement>("button")[galleryIndex];
    if (vThumb && verticalThumbsRef.current) {
      const parent = verticalThumbsRef.current;
      const top = vThumb.offsetTop - parent.clientHeight / 2 + vThumb.clientHeight / 2;
      parent.scrollTo({ top, behavior: "smooth" });
    }
  }, [galleryIndex]);

  const goTo = (i: number) => { if (!gallery.length) return; setGalleryIndex(((i % gallery.length) + gallery.length) % gallery.length); };
  const prev = () => goTo(galleryIndex - 1);
  const next = () => goTo(galleryIndex + 1);
  const handleInteractionStart = () => (isInteracting.current = true);
  const handleInteractionEnd = () => (isInteracting.current = false);

  const getLocalityData = () => {
    if (activeLocalityTab === "connectivity") return project?.connectivity || [];
    if (activeLocalityTab === "schools") return project?.schools || [];
    if (activeLocalityTab === "hospitals") return project?.hospitals || [];
    if (activeLocalityTab === "malls") return project?.nearbyAmenities || [];
    return [];
  };

  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white">
      <Navbar />

      {/* --- HERO --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {project?.coverImage ? (
            <img src={getHighQualityUrl(project.coverImage)} alt={project.title} className="w-full h-full object-cover animate-scale-slow" />
          ) : (
            <div className="w-full h-full bg-gray-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
        </div>
        <div className="absolute bottom-0 left-0 w-full z-20 pb-24 pt-32 px-6 md:px-12 bg-gradient-to-t from-black to-transparent">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#FFC40C] text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">{project?.status || "New Launch"}</span>
                <span className="text-white border border-white/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm backdrop-blur-sm">{project?.propertyType}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white uppercase leading-none tracking-tight">{project?.title}</h1>
              <p className="text-xl md:text-2xl text-gray-200 font-light flex items-center gap-2 mt-4"><span className="text-[#FFC40C]">📍</span> {project?.location}, {project?.city}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NAV --- */}
      <div className="sticky top-[68px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex overflow-x-auto momentum-scroll scrollbar-hide gap-8">
            {navSections.map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className={`py-5 text-xs font-bold uppercase tracking-widest border-b-4 whitespace-nowrap ${activeSection === item.toLowerCase() ? "border-[#FFC40C] text-black" : "border-transparent text-gray-400 hover:text-black"}`}>{item}</button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#FFC40C] hover:text-black">Enquire Now</Link>
          </div>
        </div>
      </div>

      <div className="bg-[#F8F9FA]">
        
        {/* --- OVERVIEW --- */}
        <section id="overview" className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="bg-[#FFF9F0] border border-[#FFE08A]/30 rounded-xl p-4 md:p-6 mb-12 shadow-sm">
               <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-4 text-center divide-x-0 md:divide-x divide-[#FFE08A]/50">
                  <div className="flex flex-col items-center">
                      <svg className="w-6 h-6 text-[#B08D55] mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Config</span>
                      <span className="text-sm font-bold text-gray-900 mt-1">{project?.configurations?.length > 0 ? project.configurations[0] : "Multi"}</span>
                  </div>
                  <div className="flex flex-col items-center">
                      <svg className="w-6 h-6 text-[#B08D55] mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 12h20M2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6" /></svg>
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Area</span>
                      <span className="text-sm font-bold text-gray-900 mt-1">{project?.area || "On Request"}</span>
                  </div>
                  <div className="flex flex-col items-center">
                      <svg className="w-6 h-6 text-[#B08D55] mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 3h12M6 8h12M9 13h9M9 13l-3 8" /></svg>
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Price</span>
                      <span className="text-sm font-bold text-gray-900 mt-1">{project?.price || "Call"}</span>
                  </div>
                  <div className="flex flex-col items-center">
                      <svg className="w-6 h-6 text-[#B08D55] mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 22h20M4 22V10l8-4 8 4v12M12 10v12" /></svg>
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Status</span>
                      <span className="text-sm font-bold text-gray-900 mt-1">{project?.status || "New"}</span>
                  </div>
                  <div className="flex flex-col items-center col-span-2 md:col-span-1">
                      <svg className="w-6 h-6 text-[#B08D55] mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M21 10h-8.35A5.99 5.99 0 007 6c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 005.65-4H17v4h4v-4h2v-4zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Possession</span>
                      <span className="text-sm font-bold text-gray-900 mt-1">{project?.launchDate || "Soon"}</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="text-[#FFC40C] text-xs uppercase font-bold">Overview</span>
                <h2 className="text-4xl md:text-5xl font-bold uppercase mt-4">{project?.title}</h2>
                <div className="prose prose-lg text-gray-600 mt-6 whitespace-pre-wrap">{project?.overview}</div>
                
                <div className="grid grid-cols-2 gap-6 mt-8 border-t border-gray-100 pt-8">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Builder</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{project?.builder || "Elitairs"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Units</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{project?.totalUnits || "Limited Edition"}</p>
                  </div>
                </div>

              </div>
              <div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 shadow-2xl">
                  {project?.coverImage ? (
                    <img src={getHighQualityUrl(project.coverImage)} alt="cover" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">Image Unavailable</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ VIDEO SECTION (CONDITIONAL) */}
        {videoContent && (
          <section id="video" className="py-0 bg-black text-white">
            <div className="container mx-auto ">
              <div className="w-full mx-auto overflow-hidden shadow-2xl border border-gray-800 bg-gray-900">
                <div className="aspect-video w-full">
                  {videoContent.type === "youtube" ? (
                    <iframe
                      src={videoContent.src}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video src={videoContent.src} autoPlay loop muted className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- AMENITIES --- */}
        <section id="amenities" className="py-16 bg-white overflow-hidden border-t border-gray-100">
          <div className="container mx-auto ">
            {visualAmenities.length > 0 ? (
                <AmenitiesSlider amenities={visualAmenities} />
            ) : (
                <>
                    <div className="text-center mb-12">
                        <span className="text-[#FFC40C] text-xs uppercase font-bold">Features</span>
                        <h2 className="text-3xl font-bold mt-2 uppercase">Premium Amenities</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {legacyAmenities.map((am: string, i: number) => (
                            <div key={i} className="flex flex-col items-center justify-center p-3 bg-gradient-to-b from-white to-[#FFF9F0] border border-[#FFE08A]/20 rounded-lg shadow-sm hover:shadow-md transition-all text-center">
                                <GoldIcon name={am} />
                                <span className="text-[10px] font-bold uppercase text-gray-600 tracking-wider leading-tight">{am}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
          </div>
        </section>

        {/* --- PLANS (Updated: Clickable Images) --- */}
        <section id="plans" className="py-16 bg-[#F8F9FA] border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-[#FFC40C] text-xs uppercase font-bold">Blueprints</span>
              <h2 className="text-3xl font-bold mt-2 uppercase">Floor Plans</h2>
            </div>

            {floorPlans.length ? (
               <div className="flex overflow-x-auto momentum-scroll gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
                  {floorPlans.map((p: any, i: number) => (
                     <div key={i} className="min-w-[280px] md:min-w-[350px] bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden snap-center group">
                        {/* ✅ Clickable Image */}
                        <div 
                            className="h-[250px] p-4 flex items-center justify-center bg-gray-50 relative cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => setSelectedFloorPlan(getHighQualityUrl(p.url))}
                        >
                           <img src={getHighQualityUrl(p.url)} alt={p.alt || "Plan"} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                                <span className="bg-white/90 text-black text-xs font-bold px-3 py-1 rounded shadow-sm">View Full Screen</span>
                           </div>
                        </div>
                        <div className="p-4 border-t border-gray-100 bg-white">
                           <h4 className="font-bold text-lg text-gray-800">{p.alt || `Unit Plan ${i + 1}`}</h4>
                           <span className="text-xs text-gray-400 uppercase tracking-widest mt-1 block">Layout Configuration</span>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
              <div className="text-center text-gray-400 py-12 bg-white rounded-lg border border-dashed">No Plans Uploaded</div>
            )}
          </div>
        </section>

        {/* ✅ CONNECTIVITY SECTION (Responsive Update) */}
        <section id="location" className="py-16 bg-white border-t border-gray-200">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[#FFC40C] text-xs uppercase font-bold">Connectivity</span>
                    <h2 className="text-4xl font-bold mt-2 uppercase">Locality Guide</h2>
                </div>

                {/* ✅ Changed layout: Flex column on mobile, Grid on desktop */}
                <div className="flex flex-col lg:grid lg:grid-cols-3 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 h-auto lg:h-[500px]">
                    
                    {/* MAP (Fixed height on mobile, full height on desktop) */}
                    <div className="lg:col-span-2 bg-gray-200 relative h-[300px] lg:h-full w-full">
                        {mapUrl ? (
                            <iframe
                                src={mapUrl}
                                className="absolute inset-0 w-full h-full border-0 "
                                loading="lazy"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                Map Not Available
                            </div>
                        )}
                    </div>

                    {/* TABS (Fixed height on mobile to allow scrolling inside list) */}
                    <div className="lg:col-span-1 flex flex-col h-[400px] lg:h-full">
                        <div className="flex border-b overflow-x-auto scrollbar-hide">
                            {[
                                { label: "Connectivity", key: "connectivity" },
                                { label: "Schools", key: "schools" },
                                { label: "Hospitals", key: "hospitals" },
                                { label: "Malls", key: "malls" },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveLocalityTab(tab.key)}
                                    className={`flex-1 min-w-[90px] py-4 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap
                                        ${activeLocalityTab === tab.key
                                            ? "bg-[#FFC40C] text-black"
                                            : "bg-white text-gray-500 hover:text-black"
                                        }`}
                                >
                                    <TabIcon type={tab.key} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 bg-white">
                            <ul className="space-y-4">
                                {getLocalityData().length ? (
                                    getLocalityData().map((item: string, i: number) => (
                                        <li key={i} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
                                            <span className="text-gray-700 font-medium">{item}</span>
                                            <span className="text-[#FFC40C] text-xs">●</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-400 italic text-center mt-10">
                                        No data available for this category.
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-24 bg-[#0a0a0a] text-white">
          <div className="container mx-auto px-6 mb-8 flex justify-between items-end">
            <h2 className="text-4xl font-bold uppercase">Image Gallery</h2>
            <span className="text-[#FFC40C] text-sm font-bold uppercase tracking-widest">{gallery.length} Photos</span>
          </div>
          <div className="container mx-auto px-6">
            {gallery.length ? (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="hidden lg:block w-[96px]">
                  <div ref={verticalThumbsRef} className="space-y-3 max-h-[520px] overflow-y-auto scrollbar-hide">
                    {gallery.map((img: any, i: number) => (
                      <button key={i} onClick={() => { handleInteractionStart(); goTo(i); handleInteractionEnd(); }} className={`w-full h-20 rounded-md overflow-hidden border-2 ${galleryIndex === i ? "border-[#FFC40C]" : "border-transparent"} transition-all`}>
                        <img src={getHighQualityUrl(img.url)} alt={img.alt || `thumb-${i}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 relative">
                  <div className="rounded-lg overflow-hidden bg-gray-800" onMouseEnter={handleInteractionStart} onMouseLeave={handleInteractionEnd}>
                    <img src={getHighQualityUrl(gallery[galleryIndex].url)} alt={gallery[galleryIndex].alt || `Gallery ${galleryIndex + 1}`} className="w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[520px] object-cover transition-all duration-500" />
                    <div className="absolute left-0 right-0 bottom-6 flex items-center justify-center gap-2">
                      {gallery.map((_: any, d: number) => (
                        <button key={`dot-${d}`} onClick={() => { handleInteractionStart(); goTo(d); handleInteractionEnd(); }} className={`w-2 h-2 rounded-full ${d === galleryIndex ? "bg-white" : "bg-white/40"}`} />
                      ))}
                    </div>
                    <button onClick={() => openLightbox(galleryIndex)} className="absolute right-4 bottom-4 text-white bg-black/40 p-2 rounded-md">⤢</button>
                  </div>
                  <div className="mt-4 lg:hidden">
                    <div ref={thumbsRowRef} className="flex gap-3 overflow-x-auto momentum-scroll scrollbar-hide pb-2 px-1">
                      {gallery.map((img: any, i: number) => (
                        <button key={`mthumb-${i}`} onClick={() => goTo(i)} className={`flex-shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 ${galleryIndex === i ? "border-[#FFC40C]" : "border-transparent"}`}>
                          <img src={getHighQualityUrl(img.url)} alt={`mthumb-${i}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : <div className="text-center text-gray-400 py-20 bg-gray-50 rounded-lg">No Photos Available</div>}
          </div>
          {lightboxOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={closeLightbox}>
               <button onClick={closeLightbox} className="absolute top-6 right-6 text-white p-2 bg-black/40 rounded-full">✕</button>
               <img src={getHighQualityUrl(gallery[lightboxIndex].url)} className="max-w-[95vw] max-h-[90vh] object-contain rounded" onClick={(e) => e.stopPropagation()} />
            </div>
          )}
        </section>

        {/* Similar projects */}
        <section id="similar" className="py-24 bg-[#F8F9FA] border-t border-gray-200">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Similar Projects</h2>
            <p className="text-gray-500">Explore other properties that match your lifestyle.</p>
            {similarProjects?.length ? <div className="mt-12"><ProjectSliderClientWrapper projects={similarProjects} /></div> : <p className="mt-8 text-gray-400">No similar projects available.</p>}
            <div className="mt-12"><Link href="/projects" className="text-[#FFC40C] font-bold uppercase text-xs hover:text-black">View All Projects →</Link></div>
          </div>
        </section>
      </div>

      {/* ✅ FLOOR PLAN LIGHTBOX MODAL */}
      {selectedFloorPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedFloorPlan(null)}>
            <button 
                onClick={() => setSelectedFloorPlan(null)} 
                className="absolute top-6 right-6 text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
                ✕
            </button>
            <img 
                src={selectedFloorPlan} 
                className="max-w-[95vw] max-h-[90vh] object-contain rounded shadow-2xl bg-white" 
                onClick={(e) => e.stopPropagation()} 
                alt="Floor Plan Full View"
            />
        </div>
      )}

      <Footer />
    </div>
  );
}