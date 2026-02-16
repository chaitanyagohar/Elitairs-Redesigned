import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import React from "react";
import NextTopLoader from 'nextjs-toploader';
import dynamic from "next/dynamic";
import Preloader from "@/components/ui/Preloader";
import { StartupProvider } from "@/context/StartupContext";

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
  // 1. Base URL is critical for images to show up on WhatsApp
  metadataBase: new URL("https://www.elitairs.com"), 

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
  
  // 2. Favicon & Icons (Shows in Browser Tab & Phone Home Screen)
  icons: {
    icon: "/elitairs-logo2trans.png", // Using your existing logo
    shortcut: "/elitairs-logo2trans.png",
    apple: "/elitairs-logo2trans.png", // For iPhone/iPad home screen
  },

  // 3. Open Graph (Facebook, LinkedIn, WhatsApp, iMessage)
  openGraph: {
    title: "Elitairs | Premium Real Estate Consultants",
    description: "Exclusive access to Gurugram's finest residential and commercial properties. Invest with confidence.",
    url: "https://www.elitairs.com",
    siteName: "Elitairs",
    images: [
      {
        url: "/og-image.jpeg", // ✅ Must exist in public folder
        width: 1200,
        height: 630,
        alt: "Elitairs Luxury Real Estate",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  // 4. Twitter Card (X)
  twitter: {
    card: "summary_large_image",
    title: "Elitairs | Luxury Real Estate",
    description: "Premium properties and investment opportunities in Gurugram.",
    images: ["/og-image.jpeg"], // ✅ Must exist in public folder
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
  
  // 5. Verification (Add code later if you have it)
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
       <StartupProvider>
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
       </StartupProvider>
      </body>
    </html>
  );
}