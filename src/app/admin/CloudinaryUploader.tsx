"use client";
import React, { useState } from "react";

type UploadResult = {
  url?: string | null;
  secure_url?: string | null;
  public_id?: string | null;
  raw?: any; // original JSON response for debugging
} | null;

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

    // Client-side size check (limit ~8MB here; adjust if your server can handle bigger)
    if (file.size > 8 * 1024 * 1024) {
      alert("File is too large! Please upload files smaller than 8MB.");
      return;
    }

    setLoading(true);

    try {
      // Read as base64 (keeps your existing backend unchanged)
      const base64 = await readFileAsDataURL(file);

      const res = await fetch("/api/upload/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64, filename: file.name, contentType: file.type }),
      });

      if (!res.ok) {
        // try to parse JSON error body if present
        let errText = res.statusText || "Upload failed";
        try {
          const errJson = await res.json();
          errText = errJson.error || errJson.message || JSON.stringify(errJson);
        } catch (e) {
          // ignore JSON parse errors
        }
        throw new Error(errText);
      }

      const json = await res.json();
      // Defensive extraction for common Cloudinary response shapes
      const candidates = [
        json.secure_url,
        json.url,
        json.result?.secure_url,
        json.data?.secure_url,
        json.data?.url,
        json.result?.url,
        json.secureUrl,
        json.link,
      ];

      const finalUrl = candidates.find((c: any) => typeof c === "string" && c.length > 0) || null;
      const public_id = json.public_id || json.result?.public_id || json.data?.public_id || null;

      // Helpful debug log (remove in production if you want)
      // eslint-disable-next-line no-console
      console.debug("Upload response (CloudinaryUploader):", { json, finalUrl, public_id });

      onUpload({
        url: finalUrl,
        secure_url: finalUrl,
        public_id: public_id,
        raw: json,
      });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error("Upload Error:", err);
      alert(`Upload Failed: ${err.message || err}`);
      onUpload(null);
    } finally {
      setLoading(false);
      // clear the file input value so same file can be uploaded again if needed
      if (e.target) e.target.value = "";
    }
  }

  const readFileAsDataURL = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  return (
    <div className="inline-block">
      <label
        className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
          onChange={handleFile}
          disabled={loading}
        />
      </label>
    </div>
  );
}
