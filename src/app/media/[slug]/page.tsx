import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// --- FULL ARTICLE DATABASE WITH DEEP-DIVE CONTENT ---
const ARTICLES = [
  {
    id: 1,
    slug: "things-to-know-resale-flat-gurgaon",
    title: "The Ultimate Checklist Before Buying a Resale Flat in Gurugram (2024 Updated)",
    category: "Guide",
    date: "Feb 12, 2024",
    author: "Elitairs Legal Team",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-700">Gurugram's secondary (resale) market is bustling, offering the advantage of 'ready-to-move' homes in established sectors like DLF Phase 1-5, Sushant Lok, and Sohna Road. However, resale transactions are legally more complex than buying new.</p>
      
      <h3 class="text-2xl font-bold mt-10 mb-4 text-black">1. The "Transfer Charges" Trap</h3>
      <p class="mb-4">Unlike other cities, Gurugram developers often levy a "Transfer Fee" to change the ownership name in their records. This typically ranges from <strong>₹100 to ₹500 per sq. ft.</strong>.</p>
      <ul class="list-disc pl-5 mb-6 space-y-2 bg-gray-50 p-6 rounded-lg border border-gray-100">
        <li><strong>Example:</strong> For a 2,000 sq. ft. apartment, transfer charges could be as high as ₹10 Lakhs.</li>
        <li><strong>Tip:</strong> Negotiate with the seller on who bears this cost before signing the Agreement to Sell (ATS).</li>
      </ul>

      <h3 class="text-2xl font-bold mt-8 mb-4 text-black">2. Stamp Duty & Registration (Haryana 2024 Rates)</h3>
      <p class="mb-4">Budget for these government levies on top of the property cost:</p>
      <div class="overflow-x-auto mb-8">
        <table class="w-full text-sm text-left text-gray-600 border border-gray-200">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                    <th class="px-6 py-3 border-r">Buyer Category</th>
                    <th class="px-6 py-3">Stamp Duty Rate</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b">
                    <td class="px-6 py-4 font-medium border-r">Male</td>
                    <td class="px-6 py-4">7%</td>
                </tr>
                <tr class="border-b">
                    <td class="px-6 py-4 font-medium border-r">Female</td>
                    <td class="px-6 py-4">5%</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 font-medium border-r">Joint (Male + Female)</td>
                    <td class="px-6 py-4">6%</td>
                </tr>
            </tbody>
        </table>
      </div>

      <h3 class="text-2xl font-bold mt-8 mb-4 text-black">3. The Chain of Title Documents</h3>
      <p class="mb-4">For a resale property, you must trace the ownership history back to the original allotment. Ensure you have the original copies of:</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>Conveyance Deed:</strong> Proof that the builder transferred the land title to the owner.</li>
        <li><strong>No Dues Certificate (NDC):</strong> From the RWA (Residents Welfare Association) confirming maintenance bills are paid.</li>
        <li><strong>Encumbrance Certificate:</strong> Proves the property has no pending legal dues or mortgages.</li>
      </ul>
    `
  },
  {
    id: 2,
    slug: "sohna-road-connectivity-analysis",
    title: "Sohna Road: Why It Is Projected to Appreciation 1.6x by 2030",
    category: "Market Update",
    date: "Jan 28, 2024",
    author: "Elitairs Market Analyst",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-700">Once considered the outskirts, Sohna Road has transformed into a premium micro-market. Recent reports by Colliers project a capital appreciation of up to <strong>1.6x by 2030</strong>. Here is the data behind the boom.</p>

      <h3 class="text-2xl font-bold mt-10 mb-4 text-black">1. The Game Changer: Delhi-Mumbai Expressway</h3>
      <p class="mb-4">The newly operational Sohna-Dausa stretch has positioned Sohna as the entry gateway to the Delhi-Mumbai Expressway. This has reduced travel time to Dausa (Rajasthan) to just 2.5 hours, boosting demand for weekend homes and second homes in the region.</p>

      <h3 class="text-2xl font-bold mt-8 mb-4 text-black">2. Price Trends & Affordability</h3>
      <p class="mb-4">Despite the surge, Sohna remains affordable compared to Golf Course Extension Road (GCER). Currently, premium properties in Sohna trade between <strong>₹10,000 - ₹12,000 per sq. ft.</strong>, which is nearly 2.3x cheaper than central Gurugram.</p>

      <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 my-8">
        <h4 class="font-bold text-blue-900 mb-2">Investment Verdict</h4>
        <p class="text-blue-800 text-sm">For investors with a horizon of 5-7 years, Sohna offers higher appreciation potential (%) than saturated markets like Cyber City.</p>
      </div>

      <h3 class="text-2xl font-bold mt-8 mb-4 text-black">3. Infrastructure Pipeline</h3>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>IMT Sohna:</strong> A massive industrial township attracting manufacturing units, driving rental demand for housing.</li>
        <li><strong>Jungle Safari:</strong> The proposed 10,000-acre Aravalli Safari park will boost tourism and hospitality real estate in the vicinity.</li>
      </ul>
    `
  },
  {
    id: 3,
    slug: "commercial-vs-residential",
    title: "Commercial vs Residential: Rental Yields & ROI Analysis 2024",
    category: "Investment",
    date: "Mar 10, 2024",
    author: "Elitairs Investment Desk",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-700">The classic dilemma: Buy a luxury apartment or a high-street retail shop? In 2024, the data clearly favors one for <em>cash flow</em> and the other for <em>stability</em>.</p>

      <h3 class="text-2xl font-bold mt-10 mb-4 text-black">1. Rental Yield Comparison</h3>
      <p class="mb-4">Rental yield is the annual rent earned as a percentage of the property value.</p>
      <div class="overflow-x-auto mb-8">
        <table class="w-full text-sm text-left text-gray-600 border border-gray-200">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                    <th class="px-6 py-3 border-r">Asset Class</th>
                    <th class="px-6 py-3">Avg. Rental Yield (NCR)</th>
                    <th class="px-6 py-3">Risk Profile</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b">
                    <td class="px-6 py-4 font-bold border-r">Residential</td>
                    <td class="px-6 py-4">2% - 3.5%</td>
                    <td class="px-6 py-4 text-green-600">Low (Always in demand)</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 font-bold border-r">Commercial (Office/Retail)</td>
                    <td class="px-6 py-4">6% - 9%</td>
                    <td class="px-6 py-4 text-orange-600">Medium (Economy dependent)</td>
                </tr>
            </tbody>
        </table>
      </div>

      <h3 class="text-2xl font-bold mt-8 mb-4 text-black">2. The SCO (Shop-cum-Office) Phenomenon</h3>
      <p class="mb-4">In Gurugram, SCO plots have outperformed traditional malls. Since you own the land <em>and</em> the building, you have more control. Capital appreciation in SCO sectors (like Sector 114, 88) has hit <strong>15-20% annually</strong> post-pandemic.</p>

      <h3 class="text-2xl font-bold mt-8 mb-4 text-black">3. Lease Terms</h3>
      <p class="mb-4"><strong>Commercial:</strong> Leases are long (9-15 years) with a lock-in period of 3 years, ensuring stable cash flow.<br/>
      <strong>Residential:</strong> Standard 11-month leases mean frequent tenant turnover and maintenance costs.</p>
    `
  },
  {
    id: 4,
    slug: "dwarka-expressway-investment",
    title: "Dwarka Expressway vs. Golf Course Road: The 2024 Reality Check",
    category: "Trends",
    date: "Feb 05, 2024",
    author: "Elitairs Research Team",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-700">With the Dwarka Expressway (DXP) officially inaugurated, the price gap between it and the established Golf Course Road (GCR) is narrowing. Is DXP the new luxury capital?</p>

      <h3 class="text-2xl font-bold mt-10 mb-4 text-black">1. Price Appreciation Data</h3>
      <p class="mb-4">Property values on Dwarka Expressway have nearly <strong>doubled between 2020 and 2024</strong>, jumping from ~₹6,000/sq. ft. to over ₹14,000/sq. ft.. In contrast, Golf Course Road has stabilized at ₹25,000 - ₹40,000/sq. ft.</p>

      <h3 class="text-2xl font-bold mt-8 mb-4 text-black">2. The 'Global City' Catalyst</h3>
      <p class="mb-4">The proposed <strong>1,000-acre Global City</strong> near Sector 36B/37B is set to be Gurugram's new CBD (Central Business District). Unlike Cyber City, this is a master-planned mixed-use hub, which will directly fuel rental demand for DXP sectors.</p>

      <blockquote class="border-l-4 border-[#FFC40C] pl-4 italic text-gray-700 my-8">
        "While Golf Course Road is 'Old Money', Dwarka Expressway is the 'New Growth Engine'. Investors looking for 2x returns should look West."
      </blockquote>

      <h3 class="text-2xl font-bold mt-8 mb-4 text-black">3. Proximity to Delhi</h3>
      <p class="mb-4">DXP offers direct, signal-free connectivity to IGI Airport (Terminal 3) in 20 minutes. For frequent flyers and professionals working in Aerocity, DXP is logically superior to Golf Course Extension Road.</p>
    `
  },
  {
    id: 5,
    slug: "nri-investment-guide-2024",
    title: "NRI Investment Guide 2024: TDS, Repatriation & FEMA Rules",
    category: "Guide",
    date: "Jan 15, 2024",
    author: "Elitairs Legal Team",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=80",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-700">The weakening Rupee (₹83+ to USD) makes Indian real estate highly attractive for NRIs. However, navigating FEMA rules and taxation is critical.</p>

      <h3 class="text-2xl font-bold mt-10 mb-4 text-black">1. TDS on Property Sale (The 20% Rule)</h3>
      <p class="mb-4">When an NRI sells property in India, the buyer <strong>must deduct TDS</strong> at source. This is not 1% like for residents, but much higher:</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>Long Term Capital Gains (LTCG):</strong> 20% TDS (if held > 2 years).</li>
        <li><strong>Short Term Capital Gains (STCG):</strong> 30% TDS (if held < 2 years).</li>
      </ul>
      <p class="text-sm text-gray-500 italic">Note: You can apply for a 'Lower Deduction Certificate' to reduce this if your actual tax liability is lower.</p>

      <h3 class="text-2xl font-bold mt-8 mb-4 text-black">2. Repatriation Limits</h3>
      <p class="mb-4">Under the Liberalised Remittance Scheme (LRS), an NRI can repatriate up to <strong>USD 1 Million per financial year</strong> from the sale proceeds of assets in India. This requires a certificate (Form 15CB) from a Chartered Accountant.</p>

      <h3 class="text-2xl font-bold mt-8 mb-4 text-black">3. No Agricultural Land</h3>
      <p class="mb-4">NRIs can buy residential and commercial properties freely, but they are <strong>strictly prohibited</strong> from buying agricultural land, farmhouses, or plantation properties without specific RBI approval.</p>
    `
  },
  {
    id: 6,
    slug: "delhi-alwar-rrts-impact",
    title: "RRTS Impact: How 'Namo Bharat' Will Change Gurugram Real Estate",
    category: "Infra News",
    date: "Dec 20, 2023",
    author: "Elitairs News Desk",
    image: "https://images.unsplash.com/photo-1470723710355-95304d8aece4?auto=format&fit=crop&w=1200&q=80",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-700">The Delhi-Gurugram-SNB-Alwar RRTS corridor is a ₹37,000 Cr project expected to be operational by 2028. It serves as a high-speed rail link connecting industrial hubs.</p>

      <h3 class="text-2xl font-bold mt-10 mb-4 text-black">1. The Route & Key Stations</h3>
      <p class="mb-4">The corridor will pass through Old Gurugram with major stations at:</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>Udyog Vihar</strong></li>
        <li><strong>Sector 17</strong></li>
        <li><strong>Rajiv Chowk</strong></li>
        <li><strong>Kherki Daula</strong> (Connecting to Dwarka Expressway)</li>
        <li><strong>Manesar</strong> (Industrial Hub)</li>
      </ul>

      <h3 class="text-2xl font-bold mt-8 mb-4 text-black">2. Impact on Property Prices</h3>
      <p class="mb-4">Historically, mass transit projects boost property values by <strong>15-20%</strong> in their immediate vicinity. The biggest beneficiaries will be <strong>Manesar and Dharuhera</strong>, which will suddenly be within a 30-minute commute to Cyber City.</p>

      <h3 class="text-2xl font-bold mt-8 mb-4 text-black">3. Why it matters for Investors?</h3>
      <p class="mb-4">While New Gurugram (Golf Course Road) is saturated, the RRTS corridor opens up affordable investment zones along <strong>NH-48</strong>. Investing in land or warehousing near the Manesar/Bawal stations today could yield high commercial returns by 2028.</p>
    `
  },
];

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // Find article by slug
  const article = ARTICLES.find((a) => a.slug === params.slug);

  if (!article) return notFound();

  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white">
      <Navbar />

      {/* ARTICLE HEADER (Hero Image) */}
      <div className="relative h-[60vh] w-full">
         <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-black/60" />
         <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest mb-4">
                    <span className="bg-[#FFC40C] text-black px-3 py-1 rounded-sm">{article.category}</span>
                    <span>{article.date}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{article.title}</h1>
                <p className="text-gray-300 text-sm">By {article.author}</p>
            </div>
         </div>
      </div>

      {/* CONTENT BODY */}
      <article className="container mx-auto max-w-3xl px-6 py-16">
         {/* Render HTML Content safely */}
         <div 
            className="prose prose-lg prose-headings:font-sans prose-a:text-[#FFC40C] text-gray-600 leading-8"
            dangerouslySetInnerHTML={{ __html: article.content }} 
         />

         {/* Share / Tags */}
         <div className="border-t border-gray-200 mt-12 pt-8 flex justify-between items-center">
            <div className="flex gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Share:</span>
                <div className="flex gap-2 opacity-50">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px]">FB</div>
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px]">LI</div>
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px]">WA</div>
                </div>
            </div>
            <Link href="/media" className="text-sm font-bold uppercase tracking-widest text-[#FFC40C] hover:text-black transition-colors">
                ← Back to Insights
            </Link>
         </div>
      </article>

      {/* CTA SECTION */}
      <section className="bg-[#F8F9FA] py-16 text-center border-t border-gray-200">
         <div className="container mx-auto px-6 max-w-2xl">
            <h3 className="text-2xl font-bold mb-4">Need Personalized Investment Advice?</h3>
            <p className="text-gray-500 mb-8">Our consultants can help you navigate the market with data-backed insights.</p>
            <Link href="/contact" className="bg-black text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#FFC40C] hover:text-black transition-all">
                Get Free Consultation
            </Link>
         </div>
      </section>

      <Footer />
    </div>
  );
}