import Link from "next/link";
import React from "react";
// FIX: Changed from @/lib/prisma to relative path to ensure resolution
import { prisma } from "../../../lib/prisma";
// FIX: Changed from @/components/... to relative path to ensure resolution
import DeleteButton from "../../../components/admin/DeleteButton"; 

// Force dynamic rendering so the list is always fresh
export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { gallery: true },
    });
  } catch (e) {
    console.error("Error loading projects:", e);
  }

  return (
    <div className="text-black">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <Link href="/admin/projects/new" className="px-4 py-2 bg-[#FFC40C] text-black font-bold rounded shadow-sm hover:bg-yellow-500 transition-colors">
          + Add Project
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{p.title}</td>
                  <td className="p-4 text-gray-600">{p.propertyType ?? "—"}</td>
                  <td className="p-4 text-gray-600">{p.location ?? "-"}</td>
                  <td className="p-4 text-gray-600">{p.price ?? "-"}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/projects/${p.slug || p.id}`} // Link to public view for "View"
                        target="_blank"
                        className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/projects/${p.id}/edit`}
                        className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-100 transition-colors"
                      >
                        Edit
                      </Link>
                      
                      {/* Your DeleteButton Component */}
                      <DeleteButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}

              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                    No projects found. Click "Add Project" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}