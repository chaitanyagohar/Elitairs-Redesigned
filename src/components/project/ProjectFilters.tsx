"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// ✅ 1. EXACT CONSTANTS FROM ADMIN FORM (Do not change spelling)
const CITIES = ["Gurugram", "New Delhi", "Noida", "Faridabad", "Dwarka"];
const BHKS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4.5 BHK", "5+ BHK", "Penthouse", "Villa", "Plot", "SCO"];
const PROPERTY_TYPES = ["Residential", "Commercial", "Plots", "Industrial"];
const STATUSES = ["New Launch", "Under Construction", "Ready to Move", "Sold Out"];

// Price ranges for UI (Backend logic handles the comparison)
const PRICES = ["50 L", "1 Cr", "1.5 Cr", "2 Cr", "2.5 Cr", "3 Cr", "4 Cr", "5 Cr", "10 Cr"];

export default function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // ✅ 2. SYNC STATE WITH URL PARAMS
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "", // Changed from 'location' to 'city' to match DB field
    bhk: searchParams.getAll("bhk"),
    type: searchParams.get("type") || "",
    status: searchParams.get("status") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  // Helper: Toggle BHK (Multi-select)
  const toggleBHK = (val: string) => {
    setFilters(prev => {
      const current = prev.bhk;
      if (current.includes(val)) return { ...prev, bhk: current.filter(b => b !== val) };
      return { ...prev, bhk: [...current, val] };
    });
  };

  // ✅ 3. APPLY FILTERS (Push to URL)
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    // Keep existing search text if any
    const currentSearch = searchParams.get("search");
    if (currentSearch) params.set("search", currentSearch);

    // Append Filters
    if (filters.city) params.set("city", filters.city);
    if (filters.type) params.set("type", filters.type);
    if (filters.status) params.set("status", filters.status);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    
    // Append Arrays
    filters.bhk.forEach(b => params.append("bhk", b));

    startTransition(() => {
      router.push(`/projects?${params.toString()}`, { scroll: false });
      setShowMobileFilters(false);
    });
  };

  const resetFilters = () => {
    setFilters({ city: "", bhk: [], type: "", status: "", minPrice: "", maxPrice: "" });
    startTransition(() => router.push("/projects"));
  };

  // --- FILTER UI COMPONENT ---
  const FilterContent = () => (
    <div className={`space-y-6 ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
      
      {/* 1. CITY */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">City</label>
        <select 
          className="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#FFC40C] outline-none bg-white"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        >
          <option value="">All Cities</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* 2. PROPERTY TYPE */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Property Type</label>
        <select 
          className="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#FFC40C] outline-none bg-white"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">Any Type</option>
          {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* 3. CONFIGURATION (BHK) */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Configuration</label>
        <div className="flex flex-wrap gap-2">
          {BHKS.map(bhk => (
            <button
              key={bhk}
              onClick={() => toggleBHK(bhk)}
              className={`px-3 py-1 text-xs border rounded transition-all ${
                filters.bhk.includes(bhk) 
                  ? "bg-[#FFC40C] border-[#FFC40C] text-black font-bold" 
                  : "border-gray-200 text-gray-600 hover:border-gray-400 bg-white"
              }`}
            >
              {bhk}
            </button>
          ))}
        </div>
      </div>

      {/* 4. STATUS */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Project Status</label>
        <div className="space-y-2">
          {STATUSES.map(s => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="status"
                checked={filters.status === s}
                onChange={() => setFilters({ ...filters, status: s })}
                className="accent-[#FFC40C] w-4 h-4"
              />
              <span className="text-sm text-gray-700">{s}</span>
            </label>
          ))}
          {/* Option to clear status specifically */}
          {filters.status && (
             <button onClick={() => setFilters({...filters, status: ""})} className="text-xs text-gray-400 underline pl-6">Clear</button>
          )}
        </div>
      </div>

      {/* 5. BUDGET */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Budget</label>
        <div className="flex gap-2 items-center">
          <select 
            className="w-1/2 border border-gray-300 rounded p-2 text-xs outline-none bg-white"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          >
            <option value="">Min Price</option>
            {PRICES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <span className="text-gray-400">-</span>
          <select 
            className="w-1/2 border border-gray-300 rounded p-2 text-xs outline-none bg-white"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          >
            <option value="">Max Price</option>
            {PRICES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <button 
        onClick={applyFilters}
        disabled={isPending}
        className="w-full bg-[#FFC40C] text-black font-bold py-3 rounded uppercase text-sm hover:bg-black hover:text-white transition-all shadow-md flex justify-center items-center gap-2"
      >
        {isPending ? "Filtering..." : "View Results"}
      </button>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:block w-1/4 h-fit sticky top-24 z-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="text-[#FFC40C]">⚡</span> Filters
            </h3>
            <button onClick={resetFilters} className="text-xs text-gray-400 font-bold uppercase hover:text-black">Reset All</button>
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* MOBILE BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button onClick={() => setShowMobileFilters(true)} className="flex-1 py-4 flex items-center justify-center gap-2 font-bold text-sm uppercase bg-black text-white">
          <span>🌪️</span> Filter Properties
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)}></div>
          <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="text-2xl text-gray-500">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <FilterContent />
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-between gap-4">
               <button onClick={resetFilters} className="flex-1 py-3 text-xs font-bold uppercase border border-gray-300 rounded hover:bg-gray-100">Reset</button>
               <button onClick={applyFilters} className="flex-1 py-3 text-xs font-bold uppercase bg-[#FFC40C] rounded text-black">Apply</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}