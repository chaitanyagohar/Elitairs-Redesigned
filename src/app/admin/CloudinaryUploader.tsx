"use client";
import React, { useState } from "react";

type UploadResult = {
  url?: string | null;
  secure_url?: string | null;
  public_id?: string | null;
  raw?: any;
} | null;

export default function CloudinaryUploader({
  onUpload,
  accept = "image/*", // You can pass "video/*" or "image/*,video/*"
  label = "Upload File",
  multiple = false,
}: {
  onUpload: (res: UploadResult) => void;
  accept?: string;
  label?: string;
  multiple?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);

    // 1. Get Config from Env
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert("Missing Cloudinary configuration. Check your .env file.");
      setLoading(false);
      return;
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // 2. Size Limit Check: 50MB
        // 50 MB * 1024 KB * 1024 Bytes
        if (file.size > 50 * 1024 * 1024) {
          alert(`File "${file.name}" is too large (Over 50MB).`);
          continue;
        }

        // 3. Auto-detect if it's a Video or Image
        // If it starts with "video/", use "video", otherwise default to "image"
        const resourceType = file.type.startsWith("video/") ? "video" : "image";

        // 4. Prepare Data for Direct Upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        // 5. Upload Directly to Cloudinary
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error?.message || "Upload failed");
        }

        const json = await res.json();

        // 6. Success! Send data back to your form
        onUpload({
          url: json.secure_url,
          secure_url: json.secure_url,
          public_id: json.public_id,
          raw: json,
        });
      }
    } catch (err: any) {
      console.error("Upload Error:", err);
      alert(`Upload Failed: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
      if (e.target) e.target.value = "";
    }
  }

  return (
    <div className="inline-block">
      <label
        className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Uploading...
          </span>
        ) : (
          <span>{label}</span>
        )}

        <input
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFile}
          disabled={loading}
        />
      </label>
    </div>
  );
}