// src/services/upload.service.ts
import { cloud } from "@/lib/cloudinary";

export async function uploadImageBase64(base64: string, folder = "elitairs") {
  const result = await cloud.uploader.upload(base64, { folder, resource_type: "image" });
  return result.secure_url;
}

export async function uploadRaw(base64: string, folder = "elitairs/brochures") {
  const result = await cloud.uploader.upload(base64, { folder, resource_type: "raw" });
  return result.secure_url;
}
