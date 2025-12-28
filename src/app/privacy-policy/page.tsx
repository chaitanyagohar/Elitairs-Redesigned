import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy | Elitairs",
  description: "Privacy policy and data protection guidelines for Elitairs.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white">
      <div className="relative">
  <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-black via-gray-600 to-white z-0" />
  <Navbar />
</div>

      
      <main className=" pt-32 pb-20 container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">1. Introduction</h2>
            <p>
              Welcome to <strong>Elitairs</strong> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring your personal data is handled in compliance with applicable laws. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or engage with our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">2. Information We Collect</h2>
            <p className="mb-2">We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and property preferences when you fill out forms on our site.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and browsing patterns via cookies.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">3. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Provide and maintain our services.</li>
              <li>Notify you about changes to our projects or services.</li>
              <li>Provide customer support and schedule site visits.</li>
              <li>Monitor the usage of our service to improve user experience.</li>
              <li>Send newsletters or promotional materials (only if opted in).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">4. Data Sharing & Security</h2>
            <p>
              We do not sell your personal data. We may share data with trusted third-party service providers (e.g., CRM systems, email services) strictly for operational purposes. We implement industry-standard security measures to protect your data, though no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <br />
              <a href="mailto:info@elitairs.com" className="text-[#FFC40C] font-bold hover:underline">info@elitairs.com</a>
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}