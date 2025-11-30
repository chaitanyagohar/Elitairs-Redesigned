// src/app/api/projects/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth"; // we exported prisma in lib/auth earlier
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  summary: z.string().optional(),
  overview: z.string().optional(),
  price: z.string().optional(),
  priceTable: z.any().optional(),
  features: z.string().optional(),
  amenities: z.string().optional(),
  address: z.string().optional(),
  location: z.string().optional(),
  brochure: z.string().optional(),
});

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { gallery: true, floorplans: true },
  });
  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = createSchema.parse(body);
    const project = await prisma.project.create({
      data: data,
    });
    return NextResponse.json({ ok: true, project }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Invalid data" }, { status: 400 });
  }
}
