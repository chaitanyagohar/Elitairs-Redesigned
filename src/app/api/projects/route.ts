import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema definition (Copy from validation file or keep inline)
const createSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  propertyType: z.string().optional(),
  builder: z.string().optional(),
  city: z.string().optional(),
  location: z.string().optional(),
  status: z.string().optional(),
  rera: z.string().optional(),
  overview: z.string().optional(),
  videoUrl: z.string().optional(),
  googleMapUrl: z.string().optional(),
  configurations: z.array(z.string()).optional(), // ✅ NEW
  amenities: z.array(z.string()).optional(),
  connectivity: z.array(z.string()).optional(),
  nearbyAmenities: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
  brochure: z.string().optional(),
  price: z.string().optional(),
  launchDate: z.string().optional(),
  totalUnits: z.string().optional(),
  area: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = createSchema.parse(body);

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        propertyType: data.propertyType,
        builder: data.builder,
        city: data.city,
        location: data.location,
        status: data.status,
        rera: data.rera,
        overview: data.overview,
        videoUrl: data.videoUrl,
        googleMapUrl: data.googleMapUrl,
        
        // ✅ NEW: Save BHK configurations
        configurations: data.configurations || [],

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