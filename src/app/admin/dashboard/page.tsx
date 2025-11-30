import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const projectCount = await prisma.project.count();
  
  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold text-black mb-6">Dashboard Overview</h1>
      
      {/* Responsive Grid: 1 col on mobile -> 2 on tablet -> 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Projects</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-2">{projectCount}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">📁</div>
        </div>

        {/* Stat Card 2 (Placeholder) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Leads</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-2">--</h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">👥</div>
        </div>

        {/* Stat Card 3 (Placeholder) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
           <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Views</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-2">--</h3>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">👁️</div>
        </div>

        {/* Quick Action Card */}
        <Link href="/admin/projects/new" className="bg-[#FFC40C] p-6 rounded-xl shadow-sm border border-[#e0ac00] flex flex-col items-center justify-center text-center group cursor-pointer hover:brightness-105 transition-all">
           <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">＋</span>
           <span className="font-bold text-black uppercase tracking-wider text-xs">Create Project</span>
        </Link>

      </div>

      {/* Recent Activity Table (Placeholder) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="text-xs text-gray-400 uppercase border-b">
              <th className="py-3 font-bold">Action</th>
              <th className="py-3 font-bold">Date</th>
              <th className="py-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} className="py-8 text-center text-gray-400 text-sm">
                No recent activity logs found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}