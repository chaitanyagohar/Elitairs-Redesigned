"use client";

import React, { useState } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    
    setLoading(true);
    try {
      // FIX: Use the new dynamic route structure
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE", // Changed from POST to DELETE
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Delete failed");
      }

      // Force a full page reload to show the updated list immediately
      window.location.reload();
      
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading} 
      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}