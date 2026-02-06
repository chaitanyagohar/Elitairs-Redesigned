/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // ✅ Updated to include ALL sources used in your project (Amenities, etc.)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com', // Needed for premium Unsplash images
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Needed for Pexels images in amenities
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com', // Needed for the Power Backup image
      },
    ],
    // Your custom sizes (kept as is)
    deviceSizes: [320, 420, 768, 1024, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async redirects() {
    return [
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true, // ✅ crucial: tells Google to update the search result
      },
    ]
  },
};

module.exports = nextConfig;