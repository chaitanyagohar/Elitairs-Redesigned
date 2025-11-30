// app/admin/projects/layout.tsx
import React from "react";
import Link from "next/link";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/"><strong className="text-gold">ELITAIRS</strong></Link>
          <Link href="/admin" className="text-sm">Admin Home</Link>
          <Link href="/admin/projects" className="text-sm underline">Projects</Link>
        </div>
        <div>
          {/* optional auth/logout area */}
          <span className="text-sm text-slate-400">Admin</span>
        </div>
      </nav>

      <div className="p-8">
        {children}
      </div>
    </div>
  );
}
