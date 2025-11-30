"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteLeadButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this lead?")) return;
    setLoading(true);
    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" });
      router.refresh();
    } catch (e) {
      alert("Failed to delete");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="text-red-600 hover:text-red-800 text-xs font-bold uppercase tracking-wider">
      {loading ? "..." : "Delete"}
    </button>
  );
}