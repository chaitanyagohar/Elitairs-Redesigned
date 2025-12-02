import { z } from "zod";

export const projectSchema = z.object({
  // Required fields
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),

  // Optional fields
  propertyType: z.string().optional(),
  builder: z.string().optional(),
  
  // ✅ Location Logic
  city: z.string().optional(),     // Dropdown (Noida, Gurugram...)
  location: z.string().optional(), // Text (Sector 32...)
  
  status: z.string().optional(),
  rera: z.string().optional(),
  overview: z.string().optional(),
  videoUrl: z.string().optional(),
  googleMapUrl: z.string().optional(),

  // ✅ NEW: Configurations (BHKs)
  configurations: z.array(z.string()).default([]), 

  // Arrays
  amenities: z.array(z.string()).default([]),
  connectivity: z.array(z.string()).default([]),
  nearbyAmenities: z.array(z.string()).default([]),

  // Media
  coverImage: z.string().optional(),
  brochure: z.string().optional(),

  // Details
  price: z.string().optional(),
  launchDate: z.string().optional(),
  totalUnits: z.string().optional(),
  area: z.string().optional(),
});

export type CreateProjectInput = z.infer<typeof projectSchema>;