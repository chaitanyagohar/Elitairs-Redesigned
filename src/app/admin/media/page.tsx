import React from "react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  // Fetch all projects to gather their images
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      coverImage: true,
      gallery: true,
      floorplans: true,
      projectAmenities: true, // <--- Added this so amenity icons show up
    },
    orderBy: { createdAt: "desc" },
  });

  // Flatten all images into a single list
  const allMedia = projects.flatMap((p) => {
    const list = [];
    
    // Cover
    if (p.coverImage) list.push({ url: p.coverImage, type: "Cover", project: p.title });
    
    // Gallery
    p.gallery.forEach((g) => list.push({ url: g.url, type: "Gallery", project: p.title }));
    
    // Floor Plans
    p.floorplans.forEach((f) => list.push({ url: f.url, type: "Floor Plan", project: p.title }));
    
    // Amenity Icons
    p.projectAmenities.forEach((a) => list.push({ url: a.icon, type: "Amenity", project: p.title }));

    return list;
  });

  return (
    <div className="text-black">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Media Library</h1>
        <span className="text-sm text-gray-500">{allMedia.length} Assets Found</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {allMedia.map((media, i) => (
          <div key={i} className="group relative aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <img src={media.url} className="w-full h-full object-cover" loading="lazy" />
            
            {/* Overlay Info */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
               <p className="text-[10px] text-white font-bold truncate">{media.project}</p>
               <span className="text-[10px] text-[#FFC40C] uppercase tracking-wider">{media.type}</span>
            </div>
            
            {/* Link Icon */}
            <a href={media.url} target="_blank" className="absolute top-2 right-2 bg-white text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
               ↗
            </a>
          </div>
        ))}
        {allMedia.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-400">
            No media uploaded yet. Images added to projects will appear here.
          </div>
        )}
      </div>
    </div>
  );
}