import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Disclaimer & Privacy Policy | Elitairs",
  description: "Legal disclaimer, terms of use, and privacy policy for Elitairs Real Estate.",
};

export default function DisclaimerPage() {
  return (
    <main className="bg-white text-black min-h-screen font-sans selection:bg-[#FFC40C] selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="bg-black text-white pt-32 pb-12 px-6 border-b border-gray-800">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4 text-[#FFC40C]">
            Disclaimer & Terms
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
            By using this website, you acknowledge that you have read, understood,
            and agreed to the terms and conditions outlined below.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-[#FAFAFA]">
        <div className="container mx-auto max-w-5xl bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">

          <div className="space-y-10 text-gray-600 text-sm md:text-base leading-relaxed">

            {/* 1 */}
            <div>
              <h3 className="text-black font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="text-[#FFC40C]">01.</span> General Information
              </h3>
              <p>
                The content available on this website is provided strictly for
                general reference purposes. It does not constitute legal advice,
                a formal offer, solicitation, or recommendation of any kind.
                While <strong>Elitairs</strong> endeavours to keep information
                accurate and up to date, no assurance is given regarding the
                accuracy, completeness, reliability, or suitability of any
                information displayed.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h3 className="text-black font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="text-[#FFC40C]">02.</span> Regulatory (RERA) Notice
              </h3>
              <p>
                In compliance with the Real Estate (Regulation and Development)
                Act, 2016 (RERA), the website content is subject to periodic
                review. Certain project details, visuals, specifications, or
                descriptions may be in the process of being updated. Users are
                strongly advised to independently verify all information,
                including pricing, amenities, approvals, and payment terms,
                directly with the developer or authorized representatives before
                making any real estate decision.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h3 className="text-black font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="text-[#FFC40C]">03.</span> Visual Illustrations
              </h3>
              <p>
                All images, layouts, walkthroughs, floor plans, and renderings
                displayed are artistic impressions unless expressly stated
                otherwise. Such visuals are indicative in nature and may differ
                from the final delivered product. Furniture, fittings, and décor
                shown are for representation only and do not form part of the
                standard offering.
              </p>
            </div>

            {/* 4 */}
            <div className="bg-yellow-50/50 p-6 rounded-lg border border-[#FFC40C]/20">
              <h3 className="text-black font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="text-[#FFC40C]">04.</span> Consent for Communication
              </h3>
              <p className="font-medium text-gray-800">
                By accessing this website or submitting your personal details
                through any form or interaction, you expressly authorize
                <strong> Elitairs</strong> and its authorized partners to contact
                you.
              </p>
              <p className="mt-3 text-sm">
                You provide unconditional consent to receive communications via
                phone calls, SMS, WhatsApp, or email related to real estate and
                investment services, even if your number is registered under
                the National Do Not Call (NDNC/DND) registry. Such communication
                shall not be treated as unsolicited commercial communication.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h3 className="text-black font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="text-[#FFC40C]">05.</span> Limitation of Liability
              </h3>
              <p>
                <strong>Elitairs</strong> shall not be held liable for any direct,
                indirect, incidental, consequential, or special damages arising
                from the use of this website or reliance on its content. Users
                are advised to exercise due diligence and consult independent
                legal, financial, or professional advisors before making any
                investment or property-related decisions.
              </p>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} Elitairs. All rights reserved. |{" "}
            <span className="hover:text-black cursor-pointer">
              Privacy Policy
            </span>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
