// src/app/admin/page.tsx
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminIndex() {
  // simple server-side counts (wrap in try/catch in prod)
  let projectCount = 0;
  let leadCount = 0;
  try {
    projectCount = await prisma.project.count();
    leadCount = await prisma.lead?.count?.() ?? 0;
  } catch (e) {
    console.error(e);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-black font-semibold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-5 rounded shadow">
          <div className="text-sm">Total Projects</div>
          <div className="text-2xl font-bold">{projectCount}</div>
          <Link href="/admin/projects" className="inline-block mt-4 bg-white/20 px-3 py-2 rounded">View Details</Link>
        </div>

        <div className="bg-green-500 text-white p-5 rounded shadow">
          <div className="text-sm">Total Leads</div>
          <div className="text-2xl font-bold">{leadCount}</div>
          <Link href="/admin/leads" className="inline-block mt-4 bg-white/20 px-3 py-2 rounded">View Details</Link>
        </div>

        <div className="bg-red-500 text-white p-5 rounded shadow">
          <div className="text-sm">Quick Actions</div>
          <div className="text-2xl font-bold">—</div>
          <div className="mt-4 flex gap-2">
            <Link href="/admin/projects/new" className="bg-white/20 px-3 py-2 rounded">Add Project</Link>
            <Link href="/admin/media" className="bg-white/20 px-3 py-2 rounded">Manage Media</Link>
          </div>
        </div>

        <div className="bg-yellow-400 text-gray-800 p-5 rounded shadow">
          <div className="text-sm">System</div>
          <div className="text-2xl font-bold">OK</div>
          <div className="mt-4 text-sm">No alerts</div>
        </div>
      </div>

    
    </div>
  );
}
