import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Terms & Conditions | Elitairs",
  description: "Terms of service, usage guidelines, and legal policies for Elitairs.",
};

export default function TermsConditions() {
  return (
    <div className="bg-white text-black font-sans selection:bg-[#FFC40C] selection:text-white">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-28 bg-[#050505] z-0" />
        <Navbar />
      </div>

      <main className="pt-32 pb-20 container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black uppercase tracking-tight">
          Terms & Conditions
        </h1>

        <p className="text-gray-500 mb-12 text-lg border-b border-gray-200 pb-8">
          <strong>Elitairs</strong> (hereinafter referred to as the “Company”)
          provides real estate advisory and broking related services. By
          accessing or using this website, you acknowledge that you have read,
          understood, and agree to be bound by the following terms and
          conditions.
        </p>

        <div className="space-y-12 text-gray-700 leading-relaxed text-sm md:text-base text-justify">

          {/* A */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              A. Scope of Agreement
            </h2>
            <div className="space-y-4">
              <p>
                The Company, acting solely as a service facilitator, relies on
                project-related information provided by respective
                builders/developers through written communication,
                representatives, advertisements, or other publicly available
                sources.
              </p>
              <p>
                Clients are encouraged to regularly review updates directly on
                the websites of the Company and/or concerned
                builders/developers for any changes related to projects.
              </p>
              <p>
                If a client chooses to cancel a property/unit booked through the
                Company, an administrative fee may be applicable for issuance of
                a No Objection Certificate (NOC). Such charges may differ based
                on project, developer, or other relevant factors and must be
                cleared prior to issuance of the NOC.
              </p>
              <p>
                Clients must inform the Company in case of any transfer,
                assignment, or creation of third-party interest in a unit booked
                through the Company.
              </p>
              <p>
                The Company shall not be held responsible for delays, cost
                escalations, changes in layout, preferential location charges,
                project discontinuation, amendments in government or builder
                policies, judicial or administrative orders, or deviations in
                project deliverables.
              </p>
              <p>
                The Company is not associated with the internal business
                operations of any builder/developer and does not participate in
                statutory approvals or decision-making processes. Any
                misrepresentation by the developer shall not be attributable to
                the Company.
              </p>
              <p>
                The Company bears no responsibility for interest charges,
                penalties, or cancellations imposed by developers due to delayed
                payments by clients.
              </p>
              <p>
                No verbal assurances or unofficial written communications by
                employees shall be considered binding unless issued formally on
                the Company’s letterhead by an authorized representative.
              </p>
              <p>
                For any queries or grievances, clients may contact the Company
                at <strong>+91 70818 08180</strong> or via email at{" "}
                <strong>info@elitairs.com</strong>.
              </p>
              <p>
                The Company does not accept cash payments under any
                circumstances. All payments must be made directly in favor of
                the concerned developer through approved banking instruments.
              </p>
              <p>
                Any disputes arising shall be subject to the exclusive
                jurisdiction of courts located in{" "}
                <strong>Gurgaon, Haryana</strong>.
              </p>
            </div>
          </section>

          {/* B */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              B. Collection of Personal Information
            </h2>
            <div className="space-y-4">
              <p>
                Users acknowledge and consent to the collection and storage of
                personal information provided on the website, including but not
                limited to name, contact details, demographic information,
                browsing activity, and preferences.
              </p>
              <p>
                Certain technical information such as IP address, device data,
                and browsing behavior may be automatically collected for
                analytics and security purposes.
              </p>

              <div className="bg-yellow-50 p-6 border border-[#FFC40C]/30 rounded-md">
                <p className="font-bold text-black mb-2">
                  Consent for Communication (DND Override)
                </p>
                <p>
                  By submitting your contact details, you authorize{" "}
                  <strong>Elitairs</strong> to communicate with you via calls,
                  WhatsApp, SMS, or email for real estate and investment-related
                  services, even if your number is registered under NDNC/DND.
                </p>
              </div>

              <p>
                All collected information may be consolidated and maintained by
                the Company for service, compliance, and communication purposes.
              </p>
            </div>
          </section>

          {/* C */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              C. Cookies
            </h2>
            <div className="space-y-4">
              <p>
                Cookies are small data files stored on your device to enhance
                browsing experience and website functionality.
              </p>
              <p>
                The Website uses both session-based and persistent cookies to
                analyze traffic, measure performance, and improve security. By
                using the Website, you consent to the use of cookies.
              </p>
            </div>
          </section>

          {/* D */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              D. Sharing of Personal Information
            </h2>
            <div className="space-y-4">
              <p>
                Personal data may be shared with affiliates or service providers
                for fraud prevention, compliance, and service delivery.
              </p>
              <p>
                Disclosure may also occur when required by law, court orders, or
                regulatory authorities.
              </p>
            </div>
          </section>

          {/* E */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              E. User Consent
            </h2>
            <p>
              By using this Website, users expressly consent to the collection,
              use, and sharing of their information as outlined in these Terms
              and the Privacy Policy.
            </p>
          </section>

          {/* F */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              F. Advertisement Servers
            </h2>
            <p>
              Third-party advertising partners may collect limited technical data
              such as IP address or clickstream information to serve relevant
              advertisements.
            </p>
          </section>

          {/* G */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              G. Copyright & Trademark
            </h2>
            <p>
              All website content, including text, visuals, logos, and software,
              is the intellectual property of the Company and protected under
              applicable copyright laws.
            </p>
          </section>

          {/* H */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              H. Suspension of Access
            </h2>
            <p>
              The Company reserves the right to restrict or terminate access to
              the Website without prior notice if misuse or violation of terms
              is detected.
            </p>
          </section>

          {/* I */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              I. Third-Party Websites
            </h2>
            <p>
              Links to external websites are provided for convenience. The
              Company bears no responsibility for the content or privacy
              practices of third-party sites.
            </p>
          </section>

          {/* J */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              J. Indemnity & Liability
            </h2>
            <p>
              Users agree to indemnify and hold the Company harmless against any
              claims, losses, or damages arising from misuse of the Website or
              breach of these Terms.
            </p>
          </section>

          {/* K */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              K. Entire Agreement
            </h2>
            <p>
              These Terms, together with the Privacy Policy, constitute the
              complete agreement between the User and the Company.
            </p>
          </section>

          {/* L */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              L. Waiver
            </h2>
            <p>
              Failure to enforce any provision shall not be deemed a waiver of
              future enforcement.
            </p>
          </section>

          {/* M */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              M. Severability
            </h2>
            <p>
              If any provision is found unenforceable, remaining provisions
              shall remain valid and effective.
            </p>
          </section>

          {/* N */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-[#FFC40C] pl-3">
              N. Disclaimer
            </h2>
            <div className="space-y-4">
              <p>
                Project information displayed is collected from public and
                marketing sources and does not constitute an offer for sale.
              </p>
              <p>
                Clients are advised to independently verify all details with
                developers and RERA authorities prior to making any decisions.
              </p>
              <p>
                Visuals shown are artistic representations and actual
                developments may vary.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
