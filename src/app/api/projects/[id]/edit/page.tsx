// app/admin/projects/[id]/edit/page.tsx
import { prisma } from "@/lib/prisma";
import AdminProjectForm from "@/components/admin/AdminProjectForm";

export default async function EditProjectPage({ params }: any) {
  const id = params.id;
  const project = await prisma.project.findUnique({ where: { id }, include: { gallery: true, floorplans: true } });
  if (!project) return <div>Project not found</div>;
import React from "react";
import { prisma } from "@/lib/prisma";
import AdminProjectForm from "@/components/admin/AdminProjectForm";
import { notFound } from "next/navigation";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

interface PageProps {
  params: { id: string };
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = params;

  // Fetch project with gallery images
  const project = await prisma.project.findUnique({
    where: { id },
    include: { 
      gallery: true,
      floorplans: true 
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Project</h1>
        <span className="text-sm text-gray-500">ID: {project.id}</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Pass the fetched data to your Client Form */}
        <AdminProjectForm initialData={project} />
      </div>
    </div>
  );
}
  return (
    <div>
      <h1 className="text-2xl font-bold text-gold mb-4">Edit: {project.title}</h1>
      {/* AdminProjectForm is a client component */}
      {/* @ts-ignore */}
      <AdminProjectForm initialData={project} />
    </div>
  );
}
