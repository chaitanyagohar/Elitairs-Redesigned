// src/validations/project.schema.ts
import { z } from "zod";

export const galleryItemSchema = z.object({
  url: z.string().url(),
  public_id: z.string().optional().nullable(),
  alt: z.string().optional().nullable(),
});

export const createProjectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  propertyType: z.string().optional().nullable(),
  coverImageUrl: z.string().url().optional().nullable(),
  gallery: z.array(galleryItemSchema).optional().nullable(),
  developerId: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  rera: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  flags: z.object({ featured: z.boolean().optional(), popular: z.boolean().optional() }).optional().nullable(),
});

export const updateProjectSchema = createProjectSchema.extend({
  id: z.string().min(1),
  // gallery in update uses same structure
});

export const deleteProjectSchema = z.object({
  id: z.string().min(1),
  removeCloudinary: z.boolean().optional().default(false),
});
