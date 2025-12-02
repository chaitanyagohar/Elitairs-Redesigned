"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import ProjectSliderClientWrapper from "@/components/project/ProjectSliderClientWrapper";

// Helpers
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
  const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const ytMatch = url.match(ytRegExp);
  if (ytMatch && ytMatch[2].length === 11) {
    return {
      type: "youtube",
      src: `https://www.youtube.com/embed/${ytMatch[2]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[2]}&controls=0&rel=0`,
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

export default function ProjectDetailView({ project, similarProjects }: any) {
  // page state
  const [activeSection, setActiveSection] = useState("overview");
  const [activePlanIndex, setActivePlanIndex] = useState(0);

  // gallery state
  const gallery = project?.gallery ?? [];
  const [galleryIndex, setGalleryIndex] = useState(0);
  const isInteracting = useRef(false);
  const autoplayRef = useRef<number | null>(null);
  const thumbsRowRef = useRef<HTMLDivElement | null>(null);
  const verticalThumbsRef = useRef<HTMLDivElement | null>(null);

  // lightbox state (existing)
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const mapUrl = getMapSrc(project?.googleMapUrl);
  const videoContent = getVideoContent(project?.videoUrl);
  const floorPlans = project?.floorplans ?? [];
  const amenities = project?.projectAmenities ?? [];

  // scroll spy
  useEffect(() => {
    const handler = () => {
      const sections = ["overview", "video", "location", "plans", "gallery", "amenities"];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top >= 0 && r.top <= 200) {
            setActiveSection(s);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 130;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // lightbox handlers
  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };
  const prevLightbox = () => setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const nextLightbox = () => setLightboxIndex((i) => (i + 1) % gallery.length);

  // autoplay that updates galleryIndex (no scrollIntoView for the main image)
  useEffect(() => {
    function start() {
      stop();
      autoplayRef.current = window.setInterval(() => {
        if (isInteracting.current) return;
        setGalleryIndex((g) => (gallery.length ? (g + 1) % gallery.length : 0));
      }, 4000);
    }
    function stop() {
      if (autoplayRef.current !== null) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    }
    if ((gallery?.length ?? 0) > 1) start();
    return () => stop();
  }, [gallery?.length]);

  // keep thumbnails visible when main changes
  useEffect(() => {
    // horizontal thumbs (mobile) - center the active thumb
    const mobileThumb = thumbsRowRef.current?.querySelectorAll<HTMLElement>("button")[galleryIndex];
    if (mobileThumb && thumbsRowRef.current) {
      const parent = thumbsRowRef.current;
      const left = mobileThumb.offsetLeft - parent.clientWidth / 2 + mobileThumb.clientWidth / 2;
      parent.scrollTo({ left, behavior: "smooth" });
    }
// AFTER (fix)
const vThumb = verticalThumbsRef.current?.querySelectorAll<HTMLElement>("button")[galleryIndex];
if (vThumb && verticalThumbsRef.current) {
  // center the active vertical thumb smoothly
  vThumb.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
}

  }, [galleryIndex]);

  // manual controls
  const goTo = (i: number) => {
    if (!gallery.length) return;
    const total = gallery.length;
    setGalleryIndex(((i % total) + total) % total);
  };
  const prev = () => goTo(galleryIndex - 1);
  const next = () => goTo(galleryIndex + 1);

  const handleInteractionStart = () => (isInteracting.current = true);
  const handleInteractionEnd = () => (isInteracting.current = false);

  // defensive: clamp index if gallery changes
  useEffect(() => {
    if (galleryIndex >= (gallery?.length ?? 0)) setGalleryIndex(0);
  }, [gallery?.length, galleryIndex]);

  // render
  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white">
      <Navbar />

      {/* HERO */}
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
                <span className="bg-[#FFC40C] text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  {project?.status || "New Launch"}
                </span>
                <span className="text-white border border-white/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm backdrop-blur-sm">
                  {project?.propertyType}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white uppercase leading-none tracking-tight">{project?.title}</h1>
              <p className="text-xl md:text-2xl text-gray-200 font-light flex items-center gap-2 mt-4">
                <span className="text-[#FFC40C]">📍</span> {project?.location}, {project?.city}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY NAV */}
      <div className="sticky top-[68px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex overflow-x-auto momentum-scroll scrollbar-hide gap-10">
            {["Overview", "Video", "Location", "Plans", "Gallery", "Amenities"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`py-5 text-xs font-bold uppercase tracking-widest border-b-4 whitespace-nowrap ${
                  activeSection === item.toLowerCase() ? "border-[#FFC40C] text-black" : "border-transparent text-gray-400 hover:text-black"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {project?.brochure && (
              <a href={project.brochure} target="_blank" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#FFC40C] px-4 py-2 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Brochure</span>
              </a>
            )}
            <Link href="/contact" className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#FFC40C] hover:text-black">
              Enquire Now
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#F8F9FA]">
        {/* Overview */}
        <section id="overview" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="text-[#FFC40C] text-xs uppercase font-bold">Overview</span>
                <h2 className="text-4xl md:text-5xl font-bold uppercase mt-4">{project?.title} <span className="text-gray-400 font-light block">At a Glance</span></h2>
                <div className="prose prose-lg text-gray-600 mt-6 whitespace-pre-wrap">{project?.overview}</div>

                <div className="grid grid-cols-2 gap-6 mt-8 border-t pt-8">
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Starting Price</p>
                    <p className="text-2xl font-bold text-[#FFC40C]">{project?.price || "On Request"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Builder</p>
                    <p className="text-2xl font-bold text-black">{project?.builder || "Elitairs"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Possession</p>
                    <p className="text-2xl font-bold text-black">{project?.launchDate || "Soon"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Total Units</p>
                    <p className="text-2xl font-bold text-black">{project?.totalUnits || "Limited"}</p>
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

        {/* Video */}
        {videoContent && (
          <section id="video" className="w-full h-[60vh] bg-black relative overflow-hidden">
            {videoContent.type === "youtube" ? (
              <iframe src={videoContent.src} className="absolute inset-0 w-full h-full object-cover" allowFullScreen title="project-video" />
            ) : (
              <video src={videoContent.src} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline />
            )}
            <div className="absolute inset-0 bg-black/20" />
          </section>
        )}

        {/* Location */}
        <section id="location" className="py-24 bg-[#F8F9FA] border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#FFC40C] text-xs uppercase font-bold">Connectivity</span>
              <h2 className="text-4xl font-bold mt-2 uppercase">What is near you?</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="lg:col-span-2 min-h-[420px] bg-gray-200 relative">
                {mapUrl ? (
                  <iframe src={mapUrl} className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all" loading="lazy" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">Map Not Available</div>
                )}
              </div>
              <div className="lg:col-span-1 p-8 h-[420px] overflow-y-auto">
                <h3 className="font-bold text-xl mb-4">Location Highlights</h3>
                <div className="space-y-4">
                  {project?.connectivity?.length ? project.connectivity.map((c: string, i: number) => (
                    <div key={i} className="text-sm text-gray-700">● {c}</div>
                  )) : <div className="text-gray-400">Connectivity details coming soon.</div>}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section id="plans" className="py-24 bg-white border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-[#FFC40C] text-xs uppercase font-bold">Blueprints</span>
              <h2 className="text-4xl font-bold mt-2 uppercase">Smartly Designed Plans</h2>
            </div>

            {floorPlans.length ? (
              <div className="flex flex-col items-center gap-8">
                <div className="w-full max-w-5xl h-[520px] bg-gray-50 border border-dashed border-gray-300 rounded-xl overflow-hidden flex items-center justify-center">
                  <img src={getHighQualityUrl(floorPlans[activePlanIndex].url)} alt="plan" className="w-full h-full object-contain" />
                </div>

                <div className="flex gap-4 overflow-x-auto momentum-scroll scrollbar-hide pb-4 w-full justify-center">
                  {floorPlans.map((p: any, idx: number) => (
                    <button key={idx} onClick={() => setActivePlanIndex(idx)} className={`w-28 h-28 rounded-lg overflow-hidden border ${activePlanIndex === idx ? "border-[#FFC40C] scale-105" : "border-gray-200 opacity-60"}`}>
                      <img src={getHighQualityUrl(p.url)} alt={`plan-${idx}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-20 bg-gray-50 rounded-lg">No Plans Uploaded</div>
            )}
          </div>
        </section>

        {/* GALLERY: single responsive main image + vertical thumbs on desktop + horizontal thumbs on mobile */}
        <section id="gallery" className="py-24 bg-[#0a0a0a] text-white">
          <div className="container mx-auto px-6 mb-8 flex justify-between items-end">
            <h2 className="text-4xl font-bold uppercase">Image Gallery</h2>
            <span className="text-[#FFC40C] text-sm font-bold uppercase tracking-widest">{gallery.length} Photos</span>
          </div>

          <div className="container mx-auto px-6">
            {gallery.length ? (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: vertical thumbs (desktop) */}
                <div className="hidden lg:block w-[96px]">
                  <div ref={verticalThumbsRef} className="space-y-3 max-h-[520px] overflow-y-auto scrollbar-hide">
                    {gallery.map((img: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => { handleInteractionStart(); goTo(i); handleInteractionEnd(); }}
                        className={`w-full h-20 rounded-md overflow-hidden border-2 ${galleryIndex === i ? "border-[#FFC40C]" : "border-transparent"} transition-all`}
                        aria-label={`thumb-${i}`}
                      >
                        <img src={getHighQualityUrl(img.url)} alt={img.alt || `thumb-${i}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Center: main image */}
                <div className="flex-1 relative">
                  <div
                    className="rounded-lg overflow-hidden bg-gray-800"
                    onMouseEnter={handleInteractionStart}
                    onMouseLeave={handleInteractionEnd}
                  >
                    {/* Responsive main image with aspect control */}
                    <div className="w-full">
                      <div className="w-full">
                        <img
                          src={getHighQualityUrl(gallery[galleryIndex].url)}
                          alt={gallery[galleryIndex].alt || `Gallery ${galleryIndex + 1}`}
                          className="w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[520px] object-cover transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Dots */}
                    <div className="absolute left-0 right-0 bottom-6 flex items-center justify-center gap-2">
                      {gallery.map((_, d) => (
                        <button
                          key={`dot-${d}`}
                          onClick={() => { handleInteractionStart(); goTo(d); handleInteractionEnd(); }}
                          className={`w-2 h-2 rounded-full ${d === galleryIndex ? "bg-white" : "bg-white/40"}`}
                        />
                      ))}
                    </div>

                    {/* Prev/Next */}
                    <button onClick={() => { handleInteractionStart(); prev(); handleInteractionEnd(); }} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-20" aria-label="Previous">
                      <svg width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2"><path d="M13 5l-7 7 7 7" /></svg>
                    </button>
                    <button onClick={() => { handleInteractionStart(); next(); handleInteractionEnd(); }} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-20" aria-label="Next">
                      <svg width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2"><path d="M11 5l7 7-7 7" /></svg>
                    </button>

                    {/* Expand */}
                    <button onClick={() => openLightbox(galleryIndex)} className="absolute right-4 bottom-4 text-white bg-black/40 p-2 rounded-md" aria-label="Expand">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11V3h-8" /><path d="M3 13v8h8" /><path d="M21 3l-10 10" /></svg>
                    </button>
                  </div>

                  {/* Mobile thumbs below */}
                  <div className="mt-4 lg:hidden">
                    <div
                      ref={thumbsRowRef}
                      className="flex gap-3 overflow-x-auto momentum-scroll scrollbar-hide pb-2 px-1"
                      onTouchStart={handleInteractionStart}
                      onTouchEnd={handleInteractionEnd}
                    >
                      {gallery.map((img: any, i: number) => (
                        <button key={`mthumb-${i}`} onClick={() => goTo(i)} className={`flex-shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 ${galleryIndex === i ? "border-[#FFC40C]" : "border-transparent"}`}>
                          <img src={getHighQualityUrl(img.url)} alt={img.alt || `mthumb-${i}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-20 bg-gray-50 rounded-lg">
                <span className="text-4xl block mb-2 text-black">🖼️</span>
                <p className="text-black">No Photos Available</p>
              </div>
            )}
          </div>

          {/* Lightbox */}
          {lightboxOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={closeLightbox} role="dialog" aria-modal="true">
              <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} className="absolute top-6 right-6 text-white p-2 bg-black/40 rounded-full">✕</button>
              <button onClick={(e) => { e.stopPropagation(); prevLightbox(); }} className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 text-white p-3 bg-black/40 rounded-full">‹</button>

              <div className="max-w-[95vw] max-h-[90vh] flex items-center justify-center">
                <img src={getHighQualityUrl(gallery[lightboxIndex].url)} alt={gallery[lightboxIndex].alt || `Image ${lightboxIndex + 1}`} className="max-w-full max-h-full object-contain rounded" onClick={(e) => e.stopPropagation()} />
              </div>

              <button onClick={(e) => { e.stopPropagation(); nextLightbox(); }} className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 text-white p-3 bg-black/40 rounded-full">›</button>
            </div>
          )}
        </section>

        {/* Amenities */}
        <section id="amenities" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-4">
                <span className="text-[#FFC40C] uppercase text-xs font-bold">Lifestyle</span>
                <h2 className="text-5xl font-serif font-bold mt-4">Luxury, <span className="text-gray-400 italic">Tailored</span> for Life.</h2>
              </div>
              <div className="lg:col-span-8">
                {amenities.length ? (
                  <div className="flex overflow-x-auto momentum-scroll gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
                    {amenities.map((am: any, i: number) => (
                      <div key={i} className="min-w-[300px] h-[400px] rounded-xl overflow-hidden shadow-lg snap-center">
                        <img src={getHighQualityUrl(am.icon)} alt={am.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">No Visual Amenities Uploaded</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Similar projects */}
        <section id="similar" className="py-24 bg-[#F8F9FA] border-t border-gray-200">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Similar Projects</h2>
            <p className="text-gray-500">Explore other properties that match your lifestyle.</p>

            {similarProjects?.length ? (
              <div className="mt-12">
                <ProjectSliderClientWrapper projects={similarProjects} />
              </div>
            ) : (
              <p className="mt-8 text-gray-400">No similar projects available.</p>
            )}

            <div className="mt-12">
              <Link href="/projects" className="text-[#FFC40C] font-bold uppercase text-xs hover:text-black">View All Projects →</Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
