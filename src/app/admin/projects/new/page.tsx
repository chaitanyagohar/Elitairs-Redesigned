
// src/app/admin/projects/new/page.tsx
import dynamic from "next/dynamic";
import React from "react";

const AdminProjectForm = dynamic(() => import("@/components/admin/AdminProjectForm"), { ssr: false });

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl text-black font-semibold mb-4">Add Project</h1>
      <div className="bg-white p-6 rounded shadow">
        {/* AdminProjectForm is a client component that handles uploads and POST to your create route */}
        {/* If you already have AdminProjectForm, this will use it. */}
        {/* @ts-ignore */}
        <AdminProjectForm />
      </div>
    </div>
  );
}
