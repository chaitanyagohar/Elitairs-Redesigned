import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { id: string };
}

export default async function ViewProjectPage({ params }: PageProps) {
  const { id } = params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { gallery: true },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto text-black">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
          <p className="text-gray-500 mt-1">{project.location} • {project.city ?? "Gurugram"}</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/admin/projects"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
          >
            Back to List
          </Link>
          <Link 
            href={`/admin/projects/${project.id}/edit`}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
          >
            Edit Project
          </Link>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left Column: Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden h-64 md:h-80 border">
          {project.coverImage ? (
            <img 
              src={project.coverImage} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400">
               No Cover Image
             </div>
          )}
        </div>

        {/* Right Column: Stats */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border shadow-sm">
              <span className="block text-xs text-gray-500 uppercase font-semibold">Price</span>
              <span className="text-lg font-medium text-blue-600">{project.price || "N/A"}</span>
            </div>
            <div className="bg-white p-4 rounded border shadow-sm">
              <span className="block text-xs text-gray-500 uppercase font-semibold">Type</span>
              <span className="text-lg font-medium">{project.propertyType || "N/A"}</span>
            </div>
            <div className="bg-white p-4 rounded border shadow-sm">
              <span className="block text-xs text-gray-500 uppercase font-semibold">Status</span>
              <span className="text-lg font-medium">{project.status || "Open"}</span>
            </div>
            <div className="bg-white p-4 rounded border shadow-sm">
              <span className="block text-xs text-gray-500 uppercase font-semibold">Developer</span>
              <span className="text-lg font-medium truncate">{project.developerId || "N/A"}</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded border shadow-sm">
             <span className="block text-xs text-gray-500 uppercase font-semibold mb-2">Slug</span>
             <code className="bg-gray-100 px-2 py-1 rounded text-sm text-pink-600 break-all">
               {project.slug}
             </code>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Overview</h2>
        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
          {project.overview || "No overview provided."}
        </div>
      </div>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Gallery ({project.gallery.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.gallery.map((img: any) => (
              <div key={img.id} className="relative aspect-square bg-gray-100 rounded overflow-hidden border">
                <img 
                  src={img.url} 
                  alt={img.alt || "Gallery image"} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}