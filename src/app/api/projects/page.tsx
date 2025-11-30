// src/app/admin/projects/page.tsx (server component)
import Link from "next/link";
import { prisma } from "@/lib/auth";
import AdminProjectForm from "@/components/admin/AdminProjectForm"; // client component
import ProjectCard from "@/components/admin/ProjectCard"; // client component
import React from "react";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" }, include: { gallery: true } });

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        {/* AdminProjectForm will include a "New project" button when no props */}
        <AdminProjectForm />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          // ProjectCard is a client component that supports edit/delete
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
