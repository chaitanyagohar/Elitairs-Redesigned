// src/services/project.service.ts
import { prisma } from "@/lib/prisma";
import type { CreateProjectInput } from "@/validations/project.schema";

export async function listProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { gallery: true, floorplans: true },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: { gallery: true, floorplans: true },
  });
}

export async function createProject(data: CreateProjectInput) {
  // expects simple fields; children (images) created via upload endpoints
  const project = await prisma.project.create({
    data: {
      title: data.title,
      slug: data.slug,
      location: data.location,
      category: data.category,
      status: data.status,
      overview: data.overview,
      features: data.features || [],
      amenities: data.amenities || [],
      priceTable: data.priceTable || null,
      brochure: data.brochure || null,
    },
  });
  return project;
}

export async function updateProject(id: string, data: Partial<CreateProjectInput>) {
  const project = await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      location: data.location,
      category: data.category,
      status: data.status,
      overview: data.overview,
      features: data.features,
      amenities: data.amenities,
      priceTable: data.priceTable,
      brochure: data.brochure,
    },
  });
  return project;
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  return { ok: true };
}
