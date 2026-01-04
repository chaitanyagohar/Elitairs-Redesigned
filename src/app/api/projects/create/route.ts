import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper to create unique slugs
function makeSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "") + "-" + Date.now().toString(36).slice(-4);
}

export async function POST(req: Request) {
  console.log("🟢 1. API Route Started");
  try {
    console.log("🟢 2. Parsing Body");
    const body = await req.json();
    
    // Validate required fields
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const slug = makeSlug(body.title);

    // Sanitize Arrays
    const connectivity = Array.isArray(body.connectivity) ? body.connectivity : [];
    const nearbyAmenities = Array.isArray(body.nearbyAmenities) ? body.nearbyAmenities : [];
    const schools = Array.isArray(body.schools) ? body.schools : [];
    const hospitals = Array.isArray(body.hospitals) ? body.hospitals : [];
    const amenities = Array.isArray(body.amenities) ? body.amenities : []; // Legacy text amenities
    const configurations = Array.isArray(body.configurations) ? body.configurations : [];

    // Prepare Relations
    // 1. Visual Amenities (Icon + Name)
    const projectAmenities = Array.isArray(body.projectAmenities) 
      ? body.projectAmenities.filter((a: any) => a.name && a.icon) 
      : [];

    // 2. Gallery Images
    const gallery = Array.isArray(body.gallery) 
      ? body.gallery.filter((g: any) => g.url) 
      : [];

    // 3. Floor Plans (Handle both casings to be safe)
    const rawFloorPlans = body.floorplans || body.floorPlans || [];
    const floorPlans = Array.isArray(rawFloorPlans) 
      ? rawFloorPlans.filter((p: any) => p.url) 
      : [];

    const project = await prisma.project.create({
      data: {
        // Basic Info
        title: body.title,
        slug: slug,
        propertyType: body.propertyType,
        builder: body.builder,
        city: body.city,
        location: body.location,
        rera: body.rera,
        
        // ✅ NEW HIGHLIGHTS
        status: body.projectStatus || body.status || "New Launch",
        landArea: body.landArea,
        paymentPlan: body.paymentPlan,
        isFeatured: body.isFeatured || false,

        // Description & Media
        overview: body.overview,
        videoUrl: body.videoUrl,
        googleMapUrl: body.googleMapUrl,
        coverImage: body.coverImage,
        brochure: body.brochureUrl || body.brochure, // Handle key mismatch if any

        // Details
        price: body.price,
        launchDate: body.launchDate,
        totalUnits: body.totalUnits,
        area: body.area,

        // ✅ ARRAYS (Now includes Schools & Hospitals)
        connectivity: connectivity,
        nearbyAmenities: nearbyAmenities, // Malls
        schools: schools,                 // New
        hospitals: hospitals,             // New
        amenities: amenities,             // General Text
        configurations: configurations,

        // Relations (Nested Writes)
        projectAmenities: {
          create: projectAmenities.map((am: any) => ({
            name: am.name,
            icon: am.icon
          }))
        },
        gallery: {
          create: gallery.map((img: any) => ({
            url: img.url,
            alt: img.alt || "Project Image",
          })),
        },
        floorplans: {
          create: floorPlans.map((plan: any) => ({
            url: plan.url,
            type: plan.type || "unit", // Default to 'unit' if type is missing
            alt: plan.alt || (plan.type === "master" ? "Master Plan" : "Unit Plan"),
          })),
        },
      },
    });

    return NextResponse.json({ ok: true, project });

  } catch (err: any) {
    console.error("[create] error:", err);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}