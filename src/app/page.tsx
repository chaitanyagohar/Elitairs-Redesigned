import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// 1. Remove HeroVideo import
// import HeroVideo from "@/components/home/HeroVideo"; 
// 2. Import new Slideshow
import HeroSlideshow from "@/components/home/HeroSlideshow";
import ScrollReveal from "@/components/home/ScrollReveal";
import RevealStyles from "@/components/home/RevealStyles";
import StatsStrip from "@/components/home/StatsStrip";

export const dynamic = "force-dynamic";

// Fetch projects from DB
async function getProjects() {
  return await prisma.project.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
  });
}

// 1. Accept searchParams to handle City Filters
export default async function HomePage({ searchParams }: { searchParams: { city?: string } }) {
  const projects = await getProjects();
  
  // 2. Default active city is "All"
  const activeCity = searchParams.city || "All";

  // 3. Filter "Premium Picks" based on the active city
  let premiumPicks = projects;
  
  if (activeCity !== "All") {
    premiumPicks = projects.filter(
      (p) => p.city?.toLowerCase() === activeCity.toLowerCase()
    );
  }
  // Limit to top 8 for the slider (so it scrolls)
  premiumPicks = premiumPicks.slice(0, 8);

  // 4. ✅ PREPARE IMAGES FOR SLIDESHOW
  // We take the coverImage from the top 5 premium projects. 
  // If a project doesn't have an image, we filter it out.
  const slideshowImages = premiumPicks
    .map(p => p.coverImage)
    .filter((img): img is string => !!img) // Remove null/undefined
    .slice(0, 6); // Take top 6 images

  // If no images found, add a fallback placeholder
  if (slideshowImages.length === 0) {
    slideshowImages.push("/homepage-about.jpeg"); 
  }

  // Other sections
  const dwarkaProjects = projects.slice(0, 5); 
  const sprProjects = projects.slice(0, 5).reverse(); 

  // City Tabs
  const cityTabs = ["All", "Gurugram", "New Delhi", "Noida", "Faridabad"];

  const statsData = [
    {
      id: "props",
      label: "Properties",
      value: 229,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: "happy",
      label: "Happy Customers",
      value: 158,
      icon: "😊",
    },
    {
      id: "team",
      label: "Team Members",
      value: 61,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      id: "sqft",
      label: "Total Sq. Ft",
      value: 1300000, // 1.3M+
      suffix: "+",
      icon: "📏",
    },
  ];

  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white overflow-x-hidden">
      
      {/* Styles for Metallic Animation */}
      <style>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        .metallic-text {
          background: linear-gradient(
            to right,
            #bf953f 20%,
            #fcf6ba 40%,
            #b38728 60%,
            #fbf5b7 80%,
            #bf953f 100%
          );
          background-size: 200% auto;
          color: #000;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s linear infinite;
        }
      `}</style>

      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <ScrollReveal />

      {/* --- 1. HERO SECTION (UPDATED) --- */}
      <section className="relative h-[80vh] md:h-[80vh] w-full overflow-hidden flex flex-col items-center justify-center bg-black">
        
        {/* ✅ REPLACED Video with Slideshow */}
        <HeroSlideshow images={slideshowImages} />

        <div className="relative z-30 container mx-auto px-4 text-center mt-16 md:mt-20">
            
            {/* TAGLINE */}
            <div className="mb-10 reveal-on-scroll" data-delay="50">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-2">
                    <span className="metallic-text drop-shadow-sm">
                        Elite Assets • Elevated Income
                    </span>
                </h1>
                <p className="text-gray-200 text-lg md:text-xl font-light mt-4 max-w-2xl mx-auto">
                    Discover the pinnacle of luxury real estate and investment opportunities.
                </p>
            </div>

            {/* SEARCH BAR */}
            <form action="/projects" method="GET" className="bg-white rounded-2xl md:rounded-full p-3 md:p-2 md:pl-6 shadow-2xl max-w-md md:max-w-3xl mx-auto flex flex-col md:flex-row items-center reveal-on-scroll" data-delay="100">
                <input 
                    name="search"
                    type="text" 
                    placeholder="Search By Project Name or Builder" 
                    className="w-full md:flex-grow outline-none text-gray-700 font-medium placeholder-gray-400 bg-transparent text-sm md:text-base py-3 md:py-3 text-center md:text-left mb-3 md:mb-0"
                />
                <button type="submit" className="w-full md:w-auto bg-[#FFC40C] text-white hover:bg-black transition-all duration-300 rounded-xl md:rounded-full px-8 md:px-12 py-3 md:py-3 font-bold uppercase tracking-wider text-sm shadow-md">
                    Search
                </button>
            </form>
        </div>
      </section>

      {/* --- 2. PREMIUM PICKS --- */}
      <section className="py-8 md:py-8 container mx-auto px-4 md:px-8">
        <div className="mb-8 ">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Premium Picks</h2>
            <p className="reveal-on-scroll text-sm md:text-base text-gray-500">Explore the finest homes across premium locations.</p>
            
            {/* City Tabs */}
            <div className="reveal-on-scroll flex gap-3 md:gap-4 mt-6 overflow-x-auto pb-4 md:pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {cityTabs.map((city) => {
                    const isActive = activeCity.toLowerCase() === city.toLowerCase();
                    return (
                        <Link 
                            key={city} 
                            href={`/?city=${city}`}
                            scroll={false} 
                            className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap text-sm font-bold flex-shrink-0 ${
                                isActive 
                                ? 'bg-[#FFC40C] border-[#FFC40C] text-white' 
                                : 'bg-white border-gray-300 text-gray-600 hover:border-[#FFC40C] hover:text-[#FFC40C]'
                            }`}
                        >
                            {city}
                        </Link>
                    );
                })}
            </div>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 reveal-on-scroll" data-delay="100">
            {premiumPicks.length > 0 ? (
                premiumPicks.map((project) => (
                    <div key={project.id} className="min-w-[300px] md:min-w-[350px] snap-center">
                        <ProjectCard project={project} />
                    </div>
                ))
            ) : (
                <div className="w-full py-10 text-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No premium projects found in <span className="font-bold">{activeCity}</span>.</p>
                    <Link href="/projects" className="text-[#FFC40C] text-sm underline mt-2 inline-block">View All Properties</Link>
                </div>
            )}
        </div>
        
        <div className="text-center mt-6">
            <Link href="/projects" className="text-[#FFC40C] font-bold border-b border-[#FFC40C] pb-1 hover:text-black hover:border-black transition-all text-sm">View all projects</Link>
        </div>
      </section>

      {/* --- 3. SERVICES --- */}
      <section id="services" className="py-12 md:py-20 bg-gradient-to-b from-[#FFF7E6] to-[#FDF8E9]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2">We Handle It — You Move In</h2>
              <p className="text-sm md:text-base text-gray-600 max-w-xl">
                Premium, worry-free property services.
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <a href="/contact" className="inline-flex items-center gap-3 bg-[#FFC40C] hover:bg-[#e6b500] text-black font-semibold px-4 md:px-5 py-2.5 md:py-3 rounded-2xl shadow-lg transition transform md:hover:-translate-y-0.5">
                Book a Free Consult
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
              <a href="tel:+919898009900" className="hidden md:inline-flex items-center gap-2 text-sm text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-white/70 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FFC40C]" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884l2-3A1 1 0 015 2h3a1 1 0 011 .883L9 6a1 1 0 01-.293.707l-1 1A13.034 13.034 0 0011 11a13.034 13.034 0 003.293-1.293l1-1A1 1 0 0116 8l3 1a1 1 0 01.883 1V16a1 1 0 01-1 1h-2c-7.18 0-13-5.82-13-13V6a1 1 0 01.003-.116z" /></svg>
                +91 98 9800 9900
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Consultation", desc: "Shortlist matched to your needs.", img: "/services/consulting.jpg" },
              { title: "Site Visits", desc: "Organised tours with an expert.", img: "/services/sitevisit.jpeg" },
              { title: "Finance Help", desc: "Loan support & paperwork.", img: "/services/finance.jpeg" },
              { title: "Handover Support", desc: "Smooth final delivery & follow-up.", img: "/services/handover.jpeg" },
            ].map((item, i) => (
              <article key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-transparent md:hover:border-[#FFE08A] md:group-hover:shadow-lg transition">
                <div className="w-full h-32 md:h-40 overflow-hidden bg-gray-100">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500">{item.desc}</p>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider">Service</span>
                    <a href="/contact" className="text-sm font-medium text-[#B06C00] hover:text-[#8a4f00] transition">Learn more →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 bg-white/80 border border-gray-100 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-700"><span className="font-semibold">Need a personalised plan?</span> We'll craft a shortlist of properties tailored to your budget and goal.</p>
            </div>
            <div className="flex w-full md:w-auto gap-3 flex-col sm:flex-row mt-3 md:mt-0">
              <a href="/projects" className="w-full sm:w-auto px-4 py-2 rounded-md bg-transparent border border-[#FFC40C] text-[#B06C00] font-semibold hover:bg-[#FFF0C6] transition text-center">View Properties</a>
              <a href="/contact" className="w-full sm:w-auto px-4 py-2 rounded-md bg-[#FFC40C] text-black font-semibold hover:bg-[#e6b500] transition text-center">Schedule Call</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. LOCALITIES SLIDERS --- */}
      <section className="py-12 md:py-20 bg-white container mx-auto px-4 md:px-8">
         <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Discover Your Dream Home</h2>
            <p className="text-sm md:text-base text-gray-500">Explore premium homes in top Gurgaon localities</p>
         </div>

         <div className="mb-12 md:mb-16 reveal-on-scroll" data-delay="100">
            <div className="flex justify-between items-end mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold border-l-4 border-[#FFC40C] pl-3">Dwarka Expressway</h3>
            </div>
            <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {dwarkaProjects.map((p) => (
                    <div key={p.id} className="min-w-[260px] md:min-w-[320px] snap-center">
                        <ProjectCard project={p} />
                    </div>
                ))}
            </div>
         </div>

         <div className="reveal-on-scroll" data-delay="200">
            <div className="flex justify-between items-end mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold border-l-4 border-[#FFC40C] pl-3">Southern Peripheral Road</h3>
            </div>
            <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {sprProjects.map((p) => (
                    <div key={p.id} className="min-w-[260px] md:min-w-[320px] snap-center">
                        <ProjectCard project={p} />
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* --- 5. BANNER AD --- */}
      <section className="w-full h-[300px] md:h-[400px] bg-gray-900 relative flex items-center justify-center reveal-on-scroll">
         <div className="absolute inset-0 opacity-40">
            <img src="/homepage-about.jpeg" alt="Luxury Banner" className="w-full h-full object-cover" />
         </div>
         <div className="relative z-10 text-center text-white p-6">
            <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">LUXURY THAT FITS YOUR LIFE</h2>
            <p className="text-sm md:text-xl mb-4 md:mb-6">AND YOUR PAYMENT PLAN</p>
            <div className="bg-white/10 backdrop-blur-md inline-block px-4 py-2 md:px-6 border border-white/30 rounded">
                <span className="block text-[10px] md:text-xs uppercase tracking-widest">Starting At Just</span>
                <span className="text-xl md:text-3xl font-bold text-[#FFC40C]">₹ 3.3 Cr.*</span>
            </div>
         </div>
      </section>

      {/* --- 6. EXPLORE TOP CITIES --- */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center md:text-left">Explore Top Cities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 h-auto md:h-[400px]">
                <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl h-[200px] md:h-full">
                    <img src="/img8.jpg" alt="New Delhi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg md:text-2xl font-bold">New Delhi</h3>
                        <p className="text-[#FFC40C] text-xs font-bold uppercase">View Listings</p>
                    </div>
                </div>
                <div className="relative group overflow-hidden rounded-xl h-[200px] md:h-auto">
                    <img src="/img6.jpg" alt="Gurugram" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-bold">Gurugram</h3>
                        <p className="text-[#FFC40C] text-xs font-bold uppercase">View Listings</p>
                    </div>
                </div>
                <div className="relative group overflow-hidden rounded-xl h-[200px] md:h-auto">
                    <img src="/img7.jpg" alt="Faridabad" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-bold">Faridabad</h3>
                        <p className="text-[#FFC40C] text-xs font-bold uppercase">View Listings</p>
                    </div>
                </div>
                <div className="md:col-span-2 relative group overflow-hidden rounded-xl h-[200px] md:h-auto">
                    <img src="/noida.avif" alt="Noida" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg md:text-2xl font-bold">Noida</h3>
                        <p className="text-[#FFC40C] text-xs font-bold uppercase">View Listings</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- 7. MEDIA & UPDATES --- */}
      <section className="py-12 md:py-20 bg-white container mx-auto px-4">
         <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">Media and Latest Updates</h2>
            <Link href="/media" className="hidden md:block text-[#FFC40C] font-bold text-sm uppercase tracking-widest hover:text-black">
                View All Insights →
            </Link>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
                { title: "Things You Need To Know Before Buying Resale Flat in Gurgaon", slug: "things-to-know-resale-flat-gurgaon", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80", tag: "Guide" },
                { title: "Sohna Road: Connectivity & Future Appreciation Analysis", slug: "sohna-road-connectivity-analysis", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", tag: "Market Update" },
                { title: "Commercial vs Residential: Where is the Smart Money?", slug: "commercial-vs-residential", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", tag: "Investment" },
                { title: "Is Dwarka Expressway the New Golf Course Road?", slug: "dwarka-expressway-investment", image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80", tag: "Trends" },
                { title: "NRI Investment Guide 2024: Rules & Opportunities", slug: "nri-investment-guide-2024", image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80", tag: "Guide" },
                { title: "Namo Bharat Train (RRTS) Impact on Gurugram Realty", slug: "delhi-alwar-rrts-impact", image: "https://images.unsplash.com/photo-1470723710355-95304d8aece4?auto=format&fit=crop&w=800&q=80", tag: "Infra News" }
            ].map((item, i) => (
                <Link href={`/media/${item.slug}`} key={i} className="group cursor-pointer block h-full">
                    <div className="h-48 md:h-56 bg-gray-200 rounded-xl mb-4 overflow-hidden relative">
                         <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                         <div className="absolute bottom-4 left-4">
                            <span className="bg-[#FFC40C] text-black text-[10px] md:text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest">{item.tag}</span>
                         </div>
                    </div>
                    <h3 className="font-bold text-lg md:text-xl leading-snug group-hover:text-[#FFC40C] transition-colors line-clamp-2">{item.title}</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-3 flex items-center gap-2 group-hover:gap-3 transition-all">Read Article <span>→</span></p>
                </Link>
            ))}
         </div>
         <div className="mt-8 text-center md:hidden">
            <Link href="/media" className="text-[#FFC40C] font-bold text-sm uppercase tracking-widest border-b border-[#FFC40C] pb-1">View All Insights</Link>
         </div>
      </section>

      <StatsStrip items={statsData} />

      {/* --- 9. GALLERY --- */}
      <section className="py-12 md:py-20 container mx-auto px-4 text-center">
         <h2 className="text-2xl md:text-3xl font-bold mb-2">Frames of Excellence</h2>
         <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8">Where vision meets reality at Elitairs.</p>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
             {[1,2,3,4].map((i) => (
                 <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="w-full h-full bg-gray-200"></div>
                 </div>
             ))}
         </div>
      </section>

      {/* --- 10. TESTIMONIALS --- */}
      <section className="py-12 md:py-16 bg-[#FDF8E9]">
         <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Trusted by Homebuyers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 mt-8">
                {[{ name: "Alka Sharma", msg: "Their professionalism and detailed approach made the process smooth." }, { name: "Manish Himthani", msg: "They understood my vision perfectly. Thank you Elitairs!" }, { name: "Amit Verma", msg: "Found a home that exceeded my expectations. Trusted partners." }].map((t, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-md relative mt-4 md:mt-0">
                        <div className="absolute -top-4 left-6 w-8 h-8 md:w-10 md:h-10 bg-[#FFC40C] flex items-center justify-center text-white text-lg font-serif font-bold rounded">“</div>
                        <p className="text-gray-600 italic mb-6 mt-4 text-sm leading-relaxed">"{t.msg}"</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full"></div>
                            <div><h4 className="font-bold text-sm">{t.name}</h4><div className="text-[#FFC40C] text-xs">★★★★★</div></div>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* --- 11. FOOTER CONTACT FORM --- */}
      <section className="bg-white py-12 border-t border-gray-200">
  <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
    
    {/* LEFT: MAP + DETAILS */}
    <div className="w-full md:w-1/2">
      <div className="bg-gray-100 h-48 md:h-64 w-full rounded-xl mb-6 relative overflow-hidden">
        
        {/* Google Map Embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.4112281189273!2d77.07922007528266!3d28.467159775755448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d191751850aad%3A0xea9c107b7288b8f4!2sElitairs!5e0!3m2!1sen!2sin!4v1767016799849!5m2!1sen!2sin"
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Office Label */}
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow text-xs">
          <p className="font-bold">Elitairs Office</p>
          <p>Sector 32, Gurugram</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 text-center md:text-left">
        <p className="font-bold">Elitairs</p>
        <p className="text-sm text-gray-600">
          95, Institutional Area, Sector 32, Gurugram
        </p>
        <p className="font-bold text-[#FFC40C] mt-2">
          +91 98 9800 9900
        </p>
        <p className="text-sm text-gray-500">
          marketing@elitairs.com
        </p>
      </div>
    </div>

    {/* RIGHT: FORM */}
    <div className="w-full md:w-1/2 bg-[#F9F9F9] p-6 md:p-8 rounded-xl border border-gray-200">
      <h3 className="font-bold text-lg md:text-xl mb-1">
        Please share your contact details
      </h3>
      <p className="text-xs text-gray-500 mb-6 uppercase tracking-wider">
        To Unlock Exclusive Deals
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 text-sm rounded border border-gray-300 outline-none focus:border-[#FFC40C]"
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 text-sm rounded border border-gray-300 outline-none focus:border-[#FFC40C]"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 text-sm rounded border border-gray-300 outline-none focus:border-[#FFC40C]"
        />
        <button className="w-full bg-[#FFC40C] text-white font-bold py-3 rounded hover:bg-black transition-all uppercase tracking-wider text-sm">
          Submit
        </button>
      </form>
    </div>

  </div>
</section>


      {/* --- BANNER CTA --- */}
      <div className="bg-[#FDF8E9] py-6 text-center">
         <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.57 2.35a2 2 0 0 1-.45 2.11L9.03 10.97a16 16 0 0 0 4 4l1.79-1.09a2 2 0 0 1 2.11-.45c.75.27 1.54.45 2.35.57A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div><h4 className="font-bold text-base md:text-lg">Give us a call and book your visit now!</h4></div>
         </div>
      </div>

      <Footer />
      <RevealStyles />
    </div>
  );
}

// --- HELPER COMPONENT: PROPERTY CARD ---
function ProjectCard({ project }: { project: any }) {
    return (
        <Link href={`/projects/${project.slug ?? project.id}`} className="group block bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
            <div className="relative h-40 md:h-48 bg-gray-200 overflow-hidden">
                {project.coverImage ? (
                    <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                )}
                {project.status && (
                    <div className="absolute top-3 left-3 bg-[#FFC40C] text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                        {project.status}
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 truncate mb-1 text-sm md:text-base group-hover:text-[#FFC40C] transition-colors">{project.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{project.location ?? "Gurugram"}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                    {project.configurations && project.configurations.length > 0 ? (
                        project.configurations.slice(0, 2).map((conf: string, i: number) => (
                            <span key={i} className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">{conf}</span>
                        ))
                    ) : (
                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">{project.propertyType ?? "Apartment"}</span>
                    )}
                </div>
                <div className="mt-auto pt-3 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Starting from</p>
                    <p className="font-bold text-base md:text-lg text-gray-800">{project.price ?? "Call for Price"}</p>
                </div>
            </div>
        </Link>
    );
}