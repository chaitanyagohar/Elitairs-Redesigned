import { z } from "zod";

export const projectSchema = z.object({
  // Required fields
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"), // ✅ Added this to fix your error

  // Optional fields (Matching your Prisma Schema)
  propertyType: z.string().optional(),
  builder: z.string().optional(),
  city: z.string().optional(),
  status: z.string().optional(),
  location: z.string().optional(),
  rera: z.string().optional(),
  
  // Description
  overview: z.string().optional(), // Note: Use 'overview', not 'summary'
  videoUrl: z.string().optional(),
  googleMapUrl: z.string().optional(),

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

// Export the type so other files can use it
export type CreateProjectInput = z.infer<typeof projectSchema>;