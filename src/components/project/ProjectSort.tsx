"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProjectSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 1. Get current URL params (so we don't lose location filters)
    const params = new URLSearchParams(searchParams.toString());
    
    // 2. Update the 'sort' param
    params.set("sort", e.target.value);
    
    // 3. Push new URL
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-gray-400 uppercase">Sort By:</span>
        <select 
           defaultValue={searchParams.get("sort") || "newest"}
           onChange={handleSortChange}
           className="text-sm border-none outline-none font-semibold text-gray-700 bg-transparent cursor-pointer"
        >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
        </select>
    </div>
  );
}