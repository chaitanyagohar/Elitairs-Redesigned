import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import React from "react";
import NextTopLoader from 'nextjs-toploader';
import dynamic from "next/dynamic";
import Preloader from "@/components/ui/Preloader";

// ✅ PERFORMANCE: Lazy load non-critical UI components
const AutoPopupModal = dynamic(() => import("@/components/ui/AutoPopupModal"), { ssr: false });
const FloatingWhatsApp = dynamic(() => import("@/components/ui/FloatingWhatsApp"), { ssr: false });
const DisclaimerModal = dynamic(() => import("@/components/ui/DisclaimerModal"), { ssr: false });

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

// ✅ SEO: Enhanced Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL("https://www.elitairs.com"), // ⚠️ REPLACE with your actual domain
  title: {
    default: "Elitairs | Luxury Real Estate in Gurugram",
    template: "%s | Elitairs",
  },
  description: "Discover premium real estate, luxury apartments, and commercial properties in Gurugram. Expert consultation for high-end investments.",
  keywords: [
    "Luxury Real Estate", 
    "Gurugram Property", 
    "High End Apartments", 
    "Commercial Real Estate", 
    "Elitairs", 
    "Property Investment India"
  ],
  authors: [{ name: "Elitairs" }],
  openGraph: {
    title: "Elitairs | Luxury Real Estate",
    description: "Premium properties and investment opportunities in Gurugram.",
    url: "https://www.elitairs.com",
    siteName: "Elitairs",
    images: [
      {
        url: "/og-image.jpg", // ⚠️ Ensure you have an image named 'og-image.jpg' in your public folder
        width: 1200,
        height: 630,
        alt: "Elitairs Luxury Real Estate",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elitairs | Luxury Real Estate",
    description: "Premium properties and investment opportunities in Gurugram.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // ⚠️ ADD YOUR VERIFICATION CODE FROM GOOGLE SEARCH CONSOLE HERE
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE_HERE", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-black text-white">
        <Preloader />
        <NextTopLoader
          color="#FFC40C"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #FFC40C,0 0 5px #FFC40C"
        />
        
        {/* ✅ Non-Critical UI Components */}
        <DisclaimerModal />
        <AutoPopupModal />
        <FloatingWhatsApp />
        
        {children}
      </body>
    </html>
  );
}