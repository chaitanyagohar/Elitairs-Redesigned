// src/components/admin/ProjectCard.tsx
"use client";
import AdminProjectForm from "./AdminProjectForm";
import { useState } from "react";

export default function ProjectCard({ project }: any) {
  const [deleting, setDeleting] = useState(false);
  async function doDelete() {
    if (!confirm("Delete this project?")) return;
    setDeleting(true);
    const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
    if (res.ok) window.location.reload();
    else {
      alert("Delete failed");
      setDeleting(false);
    }
  }

  return (
    <div className="p-4 bg-white/5 rounded">
      <h3 className="text-lg font-bold">{project.title}</h3>
      <p className="text-sm text-gray-300">{project.summary}</p>
      <div className="mt-3 flex gap-2">
        <AdminProjectForm initialData={project} />
        <button onClick={doDelete} disabled={deleting} className="px-3 py-1 border rounded text-red-400">
          {deleting ? "Deleting…" : "Delete"}
        </button>
        <a href={`/projects/${project.slug}`} target="_blank" rel="noreferrer" className="px-3 py-1 border rounded">
          View
        </a>
      </div>
    </div>
  );
}
