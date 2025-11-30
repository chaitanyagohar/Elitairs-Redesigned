import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// 1. Define schema that MATCHES your Prisma Schema
const createSchema = z.object({
  title: z.string().min(1, "Title is required"), // REQUIRED
  slug: z.string().min(1, "Slug is required"),   // REQUIRED
  
  // Optional fields (must match schema.prisma names)
  propertyType: z.string().optional(),
  builder: z.string().optional(),
  city: z.string().optional(),
  status: z.string().optional(),
  location: z.string().optional(),
  rera: z.string().optional(),
  overview: z.string().optional(),
  videoUrl: z.string().optional(),
  googleMapUrl: z.string().optional(),
  
  // Arrays (ensure these are arrays of strings)
  amenities: z.array(z.string()).optional(), 
  connectivity: z.array(z.string()).optional(),
  nearbyAmenities: z.array(z.string()).optional(),
  
  // Media
  coverImage: z.string().optional(),
  brochure: z.string().optional(),
  
  // Details
  price: z.string().optional(),
  launchDate: z.string().optional(),
  totalUnits: z.string().optional(),
  area: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 2. Validate the data
    const data = createSchema.parse(body);

    // 3. Create project only with valid fields
    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        propertyType: data.propertyType,
        builder: data.builder,
        city: data.city,
        status: data.status,
        location: data.location,
        rera: data.rera,
        overview: data.overview,
        videoUrl: data.videoUrl,
        googleMapUrl: data.googleMapUrl,
        
        // Handle arrays (Prisma needs explicit arrays)
        amenities: data.amenities || [],
        connectivity: data.connectivity || [],
        nearbyAmenities: data.nearbyAmenities || [],
        
        coverImage: data.coverImage,
        brochure: data.brochure,
        price: data.price,
        launchDate: data.launchDate,
        totalUnits: data.totalUnits,
        area: data.area,
      },
    });

    return NextResponse.json({ ok: true, project }, { status: 201 });
  } catch (err: any) {
    console.error("Error creating project:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Failed to create project" },
      { status: 500 }
    );
  }
}