import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import React from "react";
import NextTopLoader from 'nextjs-toploader';
import dynamic from "next/dynamic"; // ✅ Import dynamic

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

export const metadata: Metadata = {
  title: "Elitairs | Luxury Real Estate",
  description: "Premium real estate consulting and luxury residences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-black text-white">
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
        
        {/* ✅ These now load in the background, improving initial load speed */}
        <DisclaimerModal />
        <AutoPopupModal />
        <FloatingWhatsApp />
        
        {children}
      </body>
    </html>
  );
}