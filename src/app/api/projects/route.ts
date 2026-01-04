import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

/* =========================
   Validation Schema
========================= */

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

  // Specs
  configurations: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),

  // ✅ Connectivity & Locality
  connectivity: z.array(z.string()).optional(),
  schools: z.array(z.string()).optional(),
  hospitals: z.array(z.string()).optional(),
  nearbyAmenities: z.array(z.string()).optional(),

  // Media & Financials
  coverImage: z.string().optional(),
  brochure: z.string().optional(),
  price: z.string().optional(),
  launchDate: z.string().optional(),
  totalUnits: z.string().optional(),
  area: z.string().optional(),
});

/* =========================
   CREATE PROJECT
========================= */

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

        configurations: data.configurations ?? [],
        amenities: data.amenities ?? [],

        // ✅ FIXED: Locality fields
        connectivity: data.connectivity ?? [],
        schools: data.schools ?? [],
        hospitals: data.hospitals ?? [],
        nearbyAmenities: data.nearbyAmenities ?? [],

        coverImage: data.coverImage,
        brochure: data.brochure,
        price: data.price,
        launchDate: data.launchDate,
        totalUnits: data.totalUnits,
        area: data.area,
      },
    });

    return NextResponse.json(
      { ok: true, project },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error creating project:", err);

    return NextResponse.json(
      {
        ok: false,
        error: err?.message || "Failed to create project",
      },
      { status: 500 }
    );
  }
}
