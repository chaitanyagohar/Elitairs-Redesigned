import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Media & Insights | Elitairs Real Estate",
  description: "Latest updates, market trends, and expert insights on Indian Real Estate.",
};

// --- STATIC DATA (Simulating a database) ---
const ARTICLES = [
  {
    id: 1,
    slug: "things-to-know-resale-flat-gurgaon",
    title: "Things You Need To Know Before Buying Resale Flat in Gurgaon",
    category: "Guide",
    date: "Oct 12, 2023",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    excerpt: "Navigating the secondary market in Gurugram can be tricky. Here is your checklist for a safe investment.",
  },
  {
    id: 2,
    slug: "sohna-road-connectivity-analysis",
    title: "Sohna Road: Connectivity & Future Appreciation Analysis",
    category: "Market Update",
    date: "Sep 28, 2023",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    excerpt: "With the new expressway links, Sohna Road is poised for a significant price correction upwards.",
  },
  {
    id: 3,
    slug: "delhi-alwar-rrts-impact",
    title: "Namo Bharat Train to Connect Delhi-Alwar: Impact on Gurugram",
    category: "News",
    date: "Nov 05, 2023",
    image: "https://images.unsplash.com/photo-1470723710355-95304d8aece4?auto=format&fit=crop&w=800&q=80",
    excerpt: "The upcoming RRTS corridor will transform commute times and property valuations along the route.",
  },
  {
    id: 4,
    slug: "dwarka-expressway-investment",
    title: "Is Dwarka Expressway the New Golf Course Road?",
    category: "Investment",
    date: "Aug 15, 2023",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
    excerpt: "Comparing the luxury quotient and appreciation potential of Gurugram's hottest new corridor.",
  },
  {
    id: 5,
    slug: "nri-investment-guide-2024",
    title: "NRI Investment Guide: Rules & Opportunities in 2024",
    category: "Guide",
    date: "Dec 01, 2023",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80",
    excerpt: "Everything Global Indians need to know about investing in Indian residential and commercial real estate.",
  },
  {
    id: 6,
    slug: "commercial-vs-residential",
    title: "Commercial vs Residential: Where is the Smart Money?",
    category: "Investment",
    date: "Jan 10, 2024",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    excerpt: "Analyzing rental yields and capital appreciation to help you choose the right asset class.",
  },
];

export default function MediaPage() {
  const featured = ARTICLES[0];
  const others = ARTICLES.slice(1);

  return (
    <div className="bg-gray-50 text-black font-sans selection:bg-[#FFC40C] selection:text-white min-h-screen">
      <Navbar />
      
      {/* HEADER */}
      <section className="bg-white pt-32 pb-16 border-b border-gray-200">
        <div className="container mx-auto px-6 text-center">
            <span className="text-[#FFC40C] font-bold uppercase tracking-widest text-xs">Insights & Updates</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">Market Intelligence</h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Stay ahead of the curve with expert analysis, latest news, and investment guides from the Elitairs team.
            </p>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="py-16 container mx-auto px-6">
         <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 grid grid-cols-1 lg:grid-cols-2 group">
            <div className="relative h-[400px] lg:h-auto overflow-hidden">
                <img 
                    src={featured.image} 
                    alt={featured.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-[#FFC40C] text-black text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                    Featured
                </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                    <span className="text-[#FFC40C]">{featured.category}</span>
                    <span>•</span>
                    <span>{featured.date}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 leading-tight group-hover:text-[#FFC40C] transition-colors">
                    <Link href={`/media/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                    {featured.excerpt}
                </p>
                <Link href={`/media/${featured.slug}`} className="text-black font-bold uppercase tracking-widest text-sm border-b-2 border-black pb-1 self-start hover:text-[#FFC40C] hover:border-[#FFC40C] transition-all">
                    Read Article
                </Link>
            </div>
         </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="pb-24 container mx-auto px-6">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Latest Articles</h3>
            <div className="hidden md:flex gap-2">
                {["All", "News", "Investment", "Guide"].map(cat => (
                    <button key={cat} className="px-4 py-2 border rounded-full text-xs font-bold uppercase hover:bg-black hover:text-white transition-all border-gray-300">
                        {cat}
                    </button>
                ))}
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {others.map((article) => (
                <Link href={`/media/${article.slug}`} key={article.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full">
                    <div className="h-56 overflow-hidden relative">
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                            {article.category}
                        </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <span className="text-gray-400 text-xs font-bold uppercase mb-2">{article.date}</span>
                        <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-[#FFC40C] transition-colors">
                            {article.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
                            {article.excerpt}
                        </p>
                        <span className="text-[#FFC40C] text-xs font-bold uppercase tracking-widest mt-auto">Read More →</span>
                    </div>
                </Link>
            ))}
         </div>
      </section>

      <Footer />
    </div>
  );
}