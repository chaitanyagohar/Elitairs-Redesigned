// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
      },
    });
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}