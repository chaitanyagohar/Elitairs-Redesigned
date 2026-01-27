import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import React from "react";
import AutoPopupModal from "@/components/ui/AutoPopupModal";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import NextTopLoader from 'nextjs-toploader';
import DisclaimerModal from "@/components/ui/DisclaimerModal";

// Configure fonts with weights and CSS variable names
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
    // apply font variables on the html element so CSS can use them via var(--font-xxx)
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      {/* Body uses the site-wide color scheme and default sans font */}
      <body className="font-sans bg-black text-white">
        <NextTopLoader
          color="#FFC40C"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false} // Spinner looks cheap, keep it false
          easing="ease"
          speed={200}
          shadow="0 0 10px #FFC40C,0 0 5px #FFC40C" // Adds a nice gold glow
        />
        <DisclaimerModal />
        <AutoPopupModal />
        <FloatingWhatsApp />
        {children}
      </body>
    </html>
  );
}
