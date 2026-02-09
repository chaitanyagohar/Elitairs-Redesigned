"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useStartup } from "@/context/StartupContext"; // ✅ Import Context

export default function DisclaimerModal() {
  const { stage, acceptDisclaimer } = useStartup(); // ✅ Get brain signals
  const pathname = usePathname();

  // 1. Check if admin
  const isAdmin = pathname?.startsWith("/admin");

  // 2. Check if it's the right time in the sequence
  // The context handles the 4-second delay after preloader automatically.
  const show = stage === "disclaimer" && !isAdmin;

  // 3. Handle Agreement
  const handleAgree = () => {
    // This tells the Brain: "I agreed, start the 6-second timer for the Form"
    acceptDisclaimer();
  };

  // 4. Render nothing if it's not time yet
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3">

      {/* Modal Box */}
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in duration-300">

        {/* Header */}
        <div className="flex flex-col items-center gap-2 bg-[#050505] py-3 border-b border-gray-700">

          {/* Logo */}
          <div className="relative w-28 h-8">
            <Image
              src="/elitairs-logo2trans.png"
              alt="Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100px, 200px"
            />
          </div>

          <h2 className="text-[#FFC40C] font-bold text-base tracking-wide">
            DISCLAIMER
          </h2>

        </div>

        {/* Content */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 max-h-[55vh] overflow-y-auto text-[12px] sm:text-sm text-gray-700 leading-relaxed">

          <p>
            The information available on this website is confidential and
            intended solely for informational and presentation purposes. All
            content is compiled from various sources and is provided on an
            “as-is” basis without any guarantee of accuracy.
          </p>

          <br />

          <p>
            This content shall not be treated as a marketing offer, sales
            proposal, advertisement, or invitation to acquire any property.
            Unauthorized copying or misuse is strictly prohibited.
          </p>

          <br />

          <p>
            By accessing this website, the user agrees to be contacted by
            <strong> Elitairs </strong> and its associates via WhatsApp, phone,
            SMS, email, or other channels.
          </p>

          <br />

          <p>
            All images and visuals are for illustrative purposes only. Users are
            advised to verify all project details, RERA status, pricing, and
            documentation directly with developers and authorities.
          </p>

          <br />

          <p>
            The company and its representatives shall not be liable for any loss,
            damage, or expense arising from reliance on this information.
          </p>

          <br />

          <p className="font-semibold text-gray-900">
            By clicking “I Agree”, you confirm acceptance of this disclaimer.
          </p>

        </div>

        {/* Footer */}
        <div className="flex justify-center py-3 bg-gray-50 border-t">

          <button
            onClick={handleAgree}
            className="px-8 py-2 bg-[#25A244] text-white text-sm font-semibold rounded-md hover:bg-[#1E8E3E] transition"
          >
            I Agree
          </button>

        </div>

      </div>
    </div>
  );
}