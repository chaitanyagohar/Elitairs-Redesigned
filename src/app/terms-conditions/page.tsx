import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Terms & Conditions | Elitairs",
  description: "Terms of service and usage guidelines for Elitairs.",
};

export default function TermsConditions() {
  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white">
 <div className="relative">
  <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-black via-gray-600 to-white z-0" />
  <Navbar />
</div>
      
      <main className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Terms & Conditions</h1>
        <p className="text-gray-500 mb-12">Please read these terms carefully before using our services.</p>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">1. Agreement to Terms</h2>
            <p>
              By accessing our website and using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">2. Real Estate Information Disclaimer</h2>
            <p className="mb-3">
              The information provided on this website regarding property projects (including images, floor plans, prices, and specifications) is for informational purposes only and does not constitute an offer or contract.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Prices:</strong> Prices mentioned are indicative and subject to change without prior notice by the developer.</li>
              <li><strong>Images:</strong> Artistic impressions and stock images may be used for representation. Actual properties may vary.</li>
              <li><strong>Availability:</strong> Unit availability is dynamic and subject to confirmation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">3. RERA Compliance</h2>
            <p>
              <strong>Elitairs</strong> functions as a RERA-registered real estate agent. We strictly adhere to the guidelines set by the Real Estate (Regulation and Development) Act, 2016. Users are advised to verify all project details including RERA registration numbers directly from the official state RERA website before making any purchase decision.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">4. Limitation of Liability</h2>
            <p>
              In no event shall Elitairs, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the website or reliance on information provided herein.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">5. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts in Gurugram, Haryana.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}