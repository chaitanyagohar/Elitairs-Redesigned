"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CITIES = ["Gurugram", "New Delhi", "Noida", "Faridabad", "Dwarka", "Pune", "Mumbai", "Goa"];
const BHKS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK", "Penthouse", "Villa", "Plot"];
const PRICES = ["50 L", "1 Cr", "1.5 Cr", "2 Cr", "2.5 Cr", "3 Cr", "5 Cr", "10 Cr"];

export default function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition(); // ✅ NEW: Handles smooth loading
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync local state with URL
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    bhk: searchParams.getAll("bhk"),
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  // Toggle BHK selection
  const toggleBHK = (bhk: string) => {
    setFilters(prev => {
      const current = prev.bhk;
      if (current.includes(bhk)) return { ...prev, bhk: current.filter(b => b !== bhk) };
      return { ...prev, bhk: [...current, bhk] };
    });
  };

  // Apply filters to URL
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    // Preserve Search
    const currentSearch = searchParams.get("search");
    if (currentSearch) params.set("search", currentSearch);

    // Set new filters
    if (filters.location) params.set("location", filters.location);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    filters.bhk.forEach(b => params.append("bhk", b));

    // ✅ SMOOTH TRANSITION: This prevents the "lag" feel
    startTransition(() => {
      router.push(`/projects?${params.toString()}`, { scroll: false });
      setShowMobileFilters(false);
    });
  };

  const resetFilters = () => {
    setFilters({ location: "", bhk: [], minPrice: "", maxPrice: "" });
    startTransition(() => {
        router.push("/projects");
    });
  };

  const FilterContent = () => (
    <div className={`space-y-6 ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
      {/* Location */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Location</label>
        <select 
          className="w-full border border-gray-300 rounded p-2 text-sm outline-none focus:border-[#FFC40C]"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">All Cities</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Unit Type */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Unit Type</label>
        <div className="flex flex-wrap gap-2">
          {BHKS.map(bhk => (
            <button
              key={bhk}
              onClick={() => toggleBHK(bhk)}
              className={`px-3 py-1 text-xs border rounded transition-all ${
                filters.bhk.includes(bhk) 
                  ? "bg-[#FFC40C] border-[#FFC40C] text-black font-bold" 
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              {bhk}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Budget</label>
        <div className="flex gap-2 items-center">
          <select 
            className="w-1/2 border border-gray-300 rounded p-2 text-xs outline-none"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          >
            <option value="">Min</option>
            {PRICES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <span className="text-gray-400">-</span>
          <select 
            className="w-1/2 border border-gray-300 rounded p-2 text-xs outline-none"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          >
            <option value="">Max</option>
            {PRICES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <button 
        onClick={applyFilters}
        disabled={isPending}
        className="w-full bg-[#FFC40C] text-black font-bold py-3 rounded uppercase text-sm hover:bg-black hover:text-white transition-all shadow-md flex justify-center"
      >
        {isPending ? "Updating..." : "Apply Filters"}
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-1/4 h-fit sticky top-24 z-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Filters</h3>
            <button onClick={resetFilters} className="text-xs text-[#FFC40C] font-bold uppercase hover:underline">Reset</button>
          </div>
          <FilterContent />
        </div>
      </aside>

      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button onClick={() => setShowMobileFilters(true)} className="flex-1 py-4 flex items-center justify-center gap-2 font-bold text-sm uppercase active:bg-gray-50">
          <span>🌪️</span> Filter / Sort
        </button>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)}></div>
          <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="text-2xl">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}