import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/auth', '/dashboard'], // Protect sensitive routes
    },
    sitemap: 'https://www.elitairs.com/sitemap.xml',
  }
}