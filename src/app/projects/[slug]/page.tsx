import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectDetailView from "../ProjectDetailView";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = params;

  // 1️⃣ Fetch the main project
  const project = await prisma.project.findFirst({
    where: {
      OR: [{ slug: slug }, { id: slug }],
    },
    include: {
      gallery: true,
      floorplans: true,
      projectAmenities: true,
    },
  });

  if (!project) {
    notFound();
  }

  // 2️⃣ Fetch similar/latest projects (excluding current project)
  const similarProjects = await prisma.project.findMany({
    where: {
      id: {
        not: project.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4, // show latest 4 projects
  });

  // 3️⃣ Return updated view
  return <ProjectDetailView project={project} similarProjects={similarProjects} />;
}
