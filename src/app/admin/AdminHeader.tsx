// src/components/admin/AdminHeader.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();
  return (
    <header className="bg-gray-800 text-white flex items-center justify-between px-6 py-3 shadow">
      <div className="flex items-center gap-4">
        <div className="text-white/80"> </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            // sign-out endpoint or action
            fetch("/api/auth/logout", { method: "POST" }).then(() => router.push("/admin/login"));
          }}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white flex items-center gap-2"
        >
          Sign out
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
          </svg>
        </button>
      </div>
    </header>
  );
}
