"use client";
import React, { useState } from "react";

type UploadResult = { url: string; public_id?: string } | null;

export default function CloudinaryUploader({
  onUpload,
  accept = "image/*", 
  label = "Upload File"
}: {
  onUpload: (res: UploadResult) => void;
  accept?: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side size check (Limit to 4MB to prevent server timeout)
    if (file.size > 4 * 1024 * 1024) {
      alert("File is too large! Please upload files smaller than 4MB.");
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;

      try {
        const res = await fetch("/api/upload/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64 }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Upload failed");
        }

        const json = await res.json();
        onUpload({
          url: json.url,
          public_id: json.public_id,
        });
      } catch (err: any) {
        console.error("Upload Error:", err);
        alert(`Upload Failed: ${err.message}`);
        onUpload(null);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="inline-block">
      <label className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Uploading...
          </span>
        ) : (
          <span>{label}</span>
        )}
        <input 
          type="file" 
          className="hidden" 
          accept={accept} 
          onChange={handleFile} 
          disabled={loading}
        />
      </label>
    </div>
  );
}