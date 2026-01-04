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

      <main className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">
          Last Updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="space-y-10 text-gray-700 leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
              1. General
            </h2>
            <p>
              This website (“Site”) is operated by <strong>Elitairs</strong>
              (“we”, “our”, “us”). We respect your privacy and are committed to
              protecting personal data in accordance with the Information
              Technology Act, 2000 and other applicable Indian laws.
            </p>
            <p className="mt-3">
              Personal information is collected solely to deliver, manage, and
              continuously improve our real estate and investment-related
              services. This Privacy Policy may be updated periodically to
              reflect legal or operational changes, and users are encouraged to
              review it regularly.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
              2. How We Collect Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Information you voluntarily provide via forms on our Site</li>
              <li>Information obtained through business or client interactions</li>
              <li>
                Information received from publicly available sources, social
                media platforms, or marketing partners
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
              3. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>
                Technical data such as IP address, browser type, device details,
                operating system, access times, and referring URLs
              </li>
              <li>
                Website usage data including clickstream activity, page
                interactions, and visit duration
              </li>
            </ul>
            <p className="mt-3">
              We do not knowingly collect sensitive personal information. Cookies
              and log data are used to improve website functionality, analytics,
              and user experience.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
              4. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide and manage real estate and investment services</li>
              <li>Respond to inquiries and arrange site visits</li>
              <li>Send updates, offers, and service-related communications</li>
              <li>Improve website performance and service quality</li>
              <li>
                Contact users via phone, WhatsApp, SMS, or email (including
                service-related communication overriding NDNC/DND where
                applicable)
              </li>
              <li>
                Detect, prevent, and investigate fraud, misuse, or unlawful
                activity as required by law
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
              5. Data Sharing & Transfer
            </h2>
            <p>
              We do not sell personal data. Information may be shared with
              trusted affiliates, service providers, or vendors strictly for
              operational, legal, or service delivery purposes. Such parties are
              required to process data in accordance with applicable data
              protection laws and this Privacy Policy.
            </p>
            <p className="mt-3">
              Personal data may also be disclosed where required to comply with
              legal obligations, enforce agreements, or protect the rights,
              safety, and security of users and the Company.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
              6. Cookies
            </h2>
            <p>
              Cookies are small text files stored on your device that help us
              enhance site functionality, analyze usage patterns, and improve
              security. You may disable cookies through browser settings,
              however, certain features of the Site may not function as
              intended.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
              7. Data Security
            </h2>
            <p>
              We employ reasonable physical, technical, and organizational
              safeguards, including SSL encryption, to protect personal data
              against unauthorized access, loss, or misuse. Users are
              responsible for maintaining the confidentiality of their login
              credentials and securing their devices.
            </p>
            <p className="mt-3">
              While we strive to protect information, no method of transmission
              over the internet or electronic storage is completely secure.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
              8. Third-Party Links
            </h2>
            <p>
              Our Site may contain links to third-party websites. We are not
              responsible for the privacy practices or content of such external
              sites and encourage users to review their respective privacy
              policies.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
              9. Children
            </h2>
            <p>
              Users under the age of 18 may access the Site only with parental or
              legal guardian consent. We are not liable for any misuse resulting
              from incorrect age representation.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
              10. Your Rights & Choices
            </h2>
            <p>
              You may request access, correction, or deletion of your personal
              data and opt out of promotional communications by contacting us.
              Service-related or transactional messages may still be sent where
              necessary.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
              11. Policy Updates
            </h2>
            <p>
              Any updates to this Privacy Policy will be reflected by a revised
              “Last Updated” date. Continued use of the Site constitutes
              acceptance of the updated policy.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
              12. Contact Us
            </h2>
            <p>
              If you have questions or concerns regarding this Privacy Policy or
              our data practices, please contact us at:
              <br />
              <a
                href="mailto:info@elitairs.com"
                className="text-[#FFC40C] font-bold hover:underline"
              >
                info@elitairs.com
              </a>
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
