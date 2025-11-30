import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { 
        gallery: true, 
        floorplans: true, 
        projectAmenities: true 
      },
    });
    
    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    return NextResponse.json({ ok: true, project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { id } = params;

    // 1. Prepare Update Data (Scalar Fields)
    const updateData: any = {
      title: body.title,
      propertyType: body.propertyType,
      builder: body.builder,
      city: body.city,
      location: body.location,
      rera: body.rera,
      overview: body.overview,
      videoUrl: body.videoUrl,
      googleMapUrl: body.googleMapUrl,
      price: body.price,
      launchDate: body.launchDate,
      totalUnits: body.totalUnits,
      area: body.area,
      coverImage: body.coverImage,
      brochure: body.brochure || body.brochureUrl, // Handle key mismatch if any
      amenities: body.amenities,
      connectivity: body.connectivity,
      nearbyAmenities: body.nearbyAmenities,
    };
    
    if (body.brochureUrl) updateData.brochure = body.brochureUrl;

    // Remove undefined keys
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    // 2. Transaction for Relations (Delete Old -> Create New)
    await prisma.$transaction(async (tx) => {
      // Update scalar
      await tx.project.update({
        where: { id },
        data: updateData,
      });

      // Update Visual Amenities
      if (body.projectAmenities) {
        await tx.amenity.deleteMany({ where: { projectId: id } });
        if (body.projectAmenities.length > 0) {
          await tx.amenity.createMany({
            data: body.projectAmenities.map((am: any) => ({
              projectId: id,
              name: am.name,
              icon: am.icon
            }))
          });
        }
      }

      // Update Gallery
      if (body.gallery) {
        await tx.galleryImage.deleteMany({ where: { projectId: id } });
        if (body.gallery.length > 0) {
          await tx.galleryImage.createMany({
            data: body.gallery.map((img: any) => ({
              projectId: id,
              url: img.url,
              alt: img.alt || "Project Image"
            }))
          });
        }
      }

      // Update Floor Plans
      if (body.floorPlans || body.floorplans) {
        const plans = body.floorPlans || body.floorplans;
        await tx.floorPlan.deleteMany({ where: { projectId: id } });
        if (plans.length > 0) {
          await tx.floorPlan.createMany({
            data: plans.map((p: any) => ({
              projectId: id,
              url: p.url,
              type: p.type || "unit",
              alt: p.alt || (p.type === "master" ? "Master Plan" : "Unit Plan")
            }))
          });
        }
      }
    });

    const fresh = await prisma.project.findUnique({
      where: { id },
      include: { gallery: true, floorplans: true, projectAmenities: true },
    });

    return NextResponse.json({ ok: true, project: fresh });

  } catch (err: any) {
    console.error("[update] error:", err);
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}