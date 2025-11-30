import React from "react";
import { prisma } from "@/lib/prisma";
import DeleteLeadButton from "@/components/admin/DeleteLeadButton"; // We will create this below

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  let leads: any[] = [];
  try {
    leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Leads fetch error:", e);
  }

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Inquiries & Leads</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Message</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-medium text-gray-900">{lead.name}</td>
                  <td className="p-4 text-sm text-gray-600">
                    <div>{lead.email}</div>
                    <div className="text-xs text-gray-400">{lead.phone}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 max-w-xs truncate">
                    {lead.message || "-"}
                  </td>
                  <td className="p-4">
                    <DeleteLeadButton id={lead.id} />
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                    No leads found yet.
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