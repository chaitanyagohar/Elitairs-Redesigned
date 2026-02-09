import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next"; 

// Import View
import ProjectDetailView from "../ProjectDetailView";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

// ✅ 1. DYNAMIC SEO METADATA
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await prisma.project.findFirst({
    where: { 
      OR: [{ slug: params.slug }, { id: params.slug }] 
    },
    select: { title: true, overview: true, coverImage: true, location: true, city: true }
  });

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.overview?.slice(0, 160) || `Luxury property in ${project.location}, ${project.city}.`,
    openGraph: {
      title: project.title,
      description: `Check out ${project.title} located in ${project.location}.`,
      images: [project.coverImage || "/og-image.jpg"],
    },
  };
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

  // 2️⃣ Fetch similar/latest projects
  const similarProjects = await prisma.project.findMany({
    where: {
      id: {
        not: project.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4, 
  });

  // ✅ 3️⃣ STRUCTURED DATA (JSON-LD)
  // Logic updated to cleanly filter out any missing images
  const allImages = [
    project.coverImage,
    ...(project.gallery?.map((g) => g.url) || [])
  ].filter(Boolean) as string[]; // Removes null/undefined values

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product", // Helps in Rich Results
    name: project.title,
    description: project.overview?.slice(0, 300),
    image: allImages, // ✅ Passing the clean array of all project images
    brand: {
      "@type": "Brand",
      name: project.builder || "Elitairs",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.elitairs.com/projects/${project.slug}`,
      priceCurrency: "INR",
      price: project.price, 
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  };

  // 4️⃣ RETURN VIEW
  return (
    <>
      {/* Inject Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Single View for ALL projects */}
      <ProjectDetailView project={project} similarProjects={similarProjects} />
    </>
  );
}