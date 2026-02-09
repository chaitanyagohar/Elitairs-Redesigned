import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.elitairs.com'

  // 1. Fetch all projects with Images and Titles
  const projects = await prisma.project.findMany({
    select: {
      slug: true,
      id: true,
      updatedAt: true,
      title: true,      // ✅ Required for Image SEO
      coverImage: true, // ✅ Required for Image SEO
    },
  })

  // 2. Create the dynamic project entries with Image data
  const projectUrls = projects.map((project) => {
    // Basic entry
    const entry: any = {
      url: `${baseUrl}/projects/${project.slug ?? project.id}`,
      lastModified: project.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    };

    // ✅ Add Image Sitemap Extension (This triggers Google Image Indexing)
    if (project.coverImage) {
      entry.images = [
        {
          url: project.coverImage,
          title: project.title,
          caption: `Luxury real estate project: ${project.title}`,
        },
      ];
    }

    return entry;
  })

  // 3. Define your static main pages
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]

  return [...staticRoutes, ...projectUrls] as MetadataRoute.Sitemap
}