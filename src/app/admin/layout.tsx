"use client";

import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-30">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/elitairs-logo.jpeg"
            alt="Elitairs Logo"
            width={120}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>

      <div className="flex h-[calc(100vh-65px)] md:h-screen overflow-hidden relative">
        
        {/* --- DESKTOP SIDEBAR --- */}
        <aside className="hidden md:flex w-64 flex-col bg-white border-r shadow-sm z-10 shrink-0 transition-all duration-300">
          <div className="px-6 py-5 border-b h-16 flex items-center">
            <Image
              src="/elitairs-logo.jpeg"
              alt="Elitairs Logo"
              width={140}
              height={45}
              className="object-contain"
              priority
            />
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <AdminSidebar />
          </div>
        </aside>

        {/* --- MOBILE DRAWER --- */}
        {mobileMenuOpen && (
          <div className="absolute inset-0 z-50 md:hidden">
            
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl flex flex-col animate-slide-in">
              
              <div className="px-6 py-5 border-b h-16 flex items-center justify-between">
               

                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500">
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4" onClick={() => setMobileMenuOpen(false)}>
                <AdminSidebar />
              </div>
            </aside>
          </div>
        )}

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          
          <div className="hidden md:block">
            <AdminHeader />
          </div>

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
