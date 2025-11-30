"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "All Projects", href: "/admin/projects", icon: "📁" },
    { name: "Add Project", href: "/admin/projects/new", icon: "➕" },
    // Add these if you have them, otherwise comment out
    // { name: "Leads", href: "/admin/leads", icon: "📝" }, 
    // { name: "Media", href: "/admin/media", icon: "🖼️" }, 
  ];

  const handleSignOut = () => {
    // 1. Remove the cookie
    document.cookie = "elitairs_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    // 2. Redirect to login
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex flex-col h-full text-black">
      <nav className="flex-1 space-y-1 px-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-[#FFC40C]/10 text-black border-l-4 border-[#FFC40C]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out Button - Essential for Mobile Users */}
      <div className="p-4 border-t mt-auto">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <span className="text-lg">🚪</span>
          Sign Out
        </button>
      </div>
    </div>
  );
}