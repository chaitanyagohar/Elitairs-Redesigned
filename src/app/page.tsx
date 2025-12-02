import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroVideo from "@/components/home/HeroVideo";
import ScrollReveal from "@/components/home/ScrollReveal";
import RevealStyles from "@/components/home/RevealStyles";

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

  // Other sections
  const dwarkaProjects = projects.slice(0, 5); 
  const sprProjects = projects.slice(0, 5).reverse(); 

  // City Tabs
  const cityTabs = ["All", "Gurugram", "New Delhi", "Noida", "Faridabad"];

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

      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="w-full h-full [&>video]:object-cover [&>video]:w-full [&>video]:h-full">
             <HeroVideo /> 
          </div>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-16 md:mt-20">
            
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

      {/* --- 2. PREMIUM PICKS (NOW A SLIDER) --- */}
      <section className="py-12 md:py-20 container mx-auto px-4 md:px-8">
        <div className="mb-8 reveal-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Premium Picks</h2>
            <p className="text-sm md:text-base text-gray-500">Explore the finest homes across premium locations.</p>
            
            {/* City Tabs */}
            <div className="flex gap-3 md:gap-4 mt-6 overflow-x-auto pb-4 md:pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
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

        {/* ✅ CHANGED: Grid -> Slider (Flex Row) */}
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
      <section className="py-12 md:py-20 bg-[#FDF8E9]"> 
        <div className="container mx-auto px-4 text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Your Home, Our Hustle</h2>
            <p className="text-sm md:text-base text-gray-500">We simplify your property journey with expert support.</p>
        </div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 reveal-on-scroll">
            {[
                { title: "Consultancy", icon: "💬", desc: "Get comprehensive advice from Elitairs experts." },
                { title: "Guided Site Visits", icon: "🚗", desc: "Explore your dream home at your time of choice." },
                { title: "Post-Sales Support", icon: "🤝", desc: "From home loans to handovers, we handle it all." },
                { title: "Portfolio Management", icon: "📈", desc: "Achieve long term financial goals with advisory." },
            ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-[#FFC40C] text-center md:text-left">
                    <div className="w-12 h-12 bg-yellow-100 text-[#FFC40C] rounded-full flex items-center justify-center text-2xl mb-4 mx-auto md:mx-0">
                        {item.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* --- 4. LOCALITIES SLIDERS --- */}
      <section className="py-12 md:py-20 bg-white container mx-auto px-4 md:px-8">
         <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Discover Your Dream Home</h2>
            <p className="text-sm md:text-base text-gray-500">Explore premium homes in top Gurgaon localities</p>
         </div>

         {/* Locality 1 */}
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

         {/* Locality 2 */}
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
                {/* 1. New Delhi */}
                <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl h-[200px] md:h-full">
                    <img src="/img8.jpg" alt="New Delhi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg md:text-2xl font-bold">New Delhi</h3>
                        <p className="text-[#FFC40C] text-xs font-bold uppercase">View Listings</p>
                    </div>
                </div>
                {/* 2. Gurugram */}
                <div className="relative group overflow-hidden rounded-xl h-[200px] md:h-auto">
                    <img src="/img6.jpg" alt="Gurugram" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-bold">Gurugram</h3>
                        <p className="text-[#FFC40C] text-xs font-bold uppercase">View Listings</p>
                    </div>
                </div>
                {/* 3. Faridabad */}
                <div className="relative group overflow-hidden rounded-xl h-[200px] md:h-auto">
                    <img src="/img7.jpg" alt="Faridabad" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-bold">Faridabad</h3>
                        <p className="text-[#FFC40C] text-xs font-bold uppercase">View Listings</p>
                    </div>
                </div>
                {/* 4. Noida */}
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
         <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center md:text-left">Media and Latest Updates</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="group cursor-pointer">
                    <div className="h-40 md:h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden relative">
                         <div className="absolute inset-0 bg-gray-300"></div>
                         <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent">
                            <span className="text-white text-[10px] md:text-xs font-bold px-2">News</span>
                         </div>
                    </div>
                    <h3 className="font-bold text-base md:text-lg leading-tight group-hover:text-[#FFC40C] transition-colors">
                        Things You Need To Know Before Buying Resale Flat in Gurgaon
                    </h3>
                </div>
            ))}
         </div>
      </section>

      {/* --- 8. STATS COUNTER --- */}
      <section className="py-12 md:py-16 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:divide-x divide-gray-700">
            {[
                { label: "Properties", val: "229", icon: "🏢" },
                { label: "Happy Customers", val: "158", icon: "😊" },
                { label: "Team Members", val: "61", icon: "👥" },
                { label: "Total Sq. Ft", val: "1.3M+", icon: "📏" },
            ].map((stat, i) => (
                <div key={i} className="px-2">
                    <div className="text-[#FFC40C] text-2xl md:text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl md:text-4xl font-bold mb-1">{stat.val}</div>
                    <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>

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
                {[
                    { name: "Alka Sharma", msg: "Their professionalism and detailed approach made the process smooth." },
                    { name: "Manish Himthani", msg: "They understood my vision perfectly. Thank you Elitairs!" },
                    { name: "Amit Verma", msg: "Found a home that exceeded my expectations. Trusted partners." },
                ].map((t, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-md relative mt-4 md:mt-0">
                        <div className="absolute -top-4 left-6 w-8 h-8 md:w-10 md:h-10 bg-[#FFC40C] flex items-center justify-center text-white text-lg font-serif font-bold rounded">“</div>
                        <p className="text-gray-600 italic mb-6 mt-4 text-sm leading-relaxed">"{t.msg}"</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full"></div>
                            <div>
                                <h4 className="font-bold text-sm">{t.name}</h4>
                                <div className="text-[#FFC40C] text-xs">★★★★★</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* --- 11. FOOTER CONTACT FORM --- */}
      <section className="bg-white py-12 border-t border-gray-200">
         <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
            {/* Left: Map & Info */}
            <div className="w-full md:w-1/2">
                <div className="bg-gray-100 h-48 md:h-64 w-full rounded-xl mb-6 relative overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">Google Map Preview</div>
                    <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow text-xs">
                        <p className="font-bold">Elitairs Office</p>
                        <p>Sector 32, Gurugram</p>
                    </div>
                </div>
                <div className="space-y-2 text-center md:text-left">
                    <p className="font-bold">Elitairs</p>
                    <p className="text-sm text-gray-600">95, Institutional Area, Sector 32, Gurugram</p>
                    <p className="font-bold text-[#FFC40C] mt-2">+91 98 9800 9900</p>
                    <p className="text-sm text-gray-500">marketing@elitairs.com</p>
                </div>
            </div>

            {/* Right: The Form */}
            <div className="w-full md:w-1/2 bg-[#F9F9F9] p-6 md:p-8 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg md:text-xl mb-1">Please share your contact details</h3>
                <p className="text-xs text-gray-500 mb-6 uppercase tracking-wider">To Unlock Exclusive Deals</p>
                
                <form className="space-y-4">
                    <input type="text" placeholder="Name" className="w-full p-3 text-sm rounded border border-gray-300 outline-none focus:border-[#FFC40C]" />
                    <input type="text" placeholder="Phone Number" className="w-full p-3 text-sm rounded border border-gray-300 outline-none focus:border-[#FFC40C]" />
                    <input type="email" placeholder="Email" className="w-full p-3 text-sm rounded border border-gray-300 outline-none focus:border-[#FFC40C]" />
                    <button className="w-full bg-[#FFC40C] text-white font-bold py-3 rounded hover:bg-black transition-all uppercase tracking-wider text-sm">Submit</button>
                </form>
            </div>
         </div>
      </section>

      {/* --- BANNER CTA --- */}
      <div className="bg-[#FDF8E9] py-6 text-center">
         <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                 <div className="w-full h-full bg-gray-300"></div>
            </div>
            <div>
                <h4 className="font-bold text-base md:text-lg">Give us a call and book your visit now!</h4>
            </div>
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
                
                {/* Configuration List from Array */}
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