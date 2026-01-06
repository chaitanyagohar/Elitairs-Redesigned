"use client";
import React, { useEffect, useState } from "react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  message: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch leads
  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch(`/api/admin/leads?t=${Date.now()}`);
        const data = await res.json();
        setLeads(data);
      } catch (error) {
        console.error("Failed to load leads");
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  // ✅ NEW: Delete Function
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove the deleted lead from the list instantly
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
      } else {
        alert("Failed to delete lead.");
      }
    } catch (error) {
      alert("Error deleting lead.");
    }
  };

  if (loading) return <div className="p-8 text-white">Loading leads...</div>;

  return (
    <div className="p-8 bg-black min-h-screen text-white font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#FFC40C]">Inbound Leads</h1>
        <div className="bg-[#222] px-4 py-2 rounded text-sm text-gray-400">
          Total Leads: <span className="text-white font-bold">{leads.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-[#111] rounded-lg border border-[#333]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#222] text-gray-400 text-xs uppercase tracking-wider border-b border-[#333]">
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Phone</th>
              <th className="p-4 font-medium">Interest</th>
              <th className="p-4 font-medium">Message</th>
              <th className="p-4 font-medium text-right">Actions</th> {/* ✅ Header Added */}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-[#1a1a1a] transition-colors group">
                <td className="p-4 text-gray-500 text-sm whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </td>
                <td className="p-4 font-bold text-white">{lead.name}</td>
                <td className="p-4 text-[#FFC40C] font-mono">
                    <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    lead.propertyType === "Commercial" ? "bg-blue-900 text-blue-200" :
                    lead.propertyType === "Plots" ? "bg-green-900 text-green-200" :
                    "bg-yellow-900/40 text-yellow-200"
                  }`}>
                    {lead.propertyType || "General"}
                  </span>
                </td>
                <td className="p-4 text-gray-400 text-sm max-w-xs truncate" title={lead.message}>
                  {lead.message || "-"}
                </td>
                
                {/* ✅ Delete Button */}
                <td className="p-4 text-right">
                    <button 
                        onClick={() => handleDelete(lead.id)}
                        className="text-gray-600 hover:text-red-500 transition-colors p-2"
                        title="Delete Lead"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
                <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">No leads found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}