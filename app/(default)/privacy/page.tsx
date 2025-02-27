"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/SparklesCore";

export default function PrivacyPage() {
  useEffect(() => {
    // Refresh AOS animations when content changes
    if ((window as any).AOS) {
      (window as any).AOS.refresh();
    }
  }, []);

  const currentDate = new Date().toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-screen bg-black">
      {/* Sparkles Animation */}
      <div className="absolute inset-0 z-[1]">
        <SparklesCore
          background="transparent"
          minSize={1}
          maxSize={2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.3}
        />
      </div>

      <div className="relative z-[2] max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center pb-12 md:pb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-xl text-[#1CD4A7]">
              HD Trade Services Pty Ltd
            </p>
            <p className="text-gray-400 mt-2">
              Last Updated: {currentDate}
            </p>
          </motion.div>

          {/* Privacy Policy content */}
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]"
              >
                <p className="text-gray-300">
                  This Privacy Policy describes how HD Trade Services Pty Ltd ("we," "us," or "our") collects, uses, and protects your personal information. We are committed to protecting your privacy and ensuring the security of your personal information.
                </p>
              </motion.div>

              {/* Section 1 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">1. Information We Collect</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">1.1 Personal Information</h3>
                    <p className="text-gray-300">We may collect the following personal information:</p>
                    <ul className="list-disc ml-6 mt-2 text-gray-300">
                      <li>Name and contact details</li>
                      <li>Address and location information</li>
                      <li>Phone numbers and email addresses</li>
                      <li>Payment and billing information</li>
                      <li>Service history and preferences</li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">1.2 Technical Information</h3>
                    <p className="text-gray-300">We may automatically collect:</p>
                    <ul className="list-disc ml-6 mt-2 text-gray-300">
                      <li>Device and browser information</li>
                      <li>IP address and location data</li>
                      <li>Website usage and interaction data</li>
                      <li>Cookies and similar technologies</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">2. How We Use Your Information</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">2.1 Service Delivery</h3>
                    <p className="text-gray-300">We use your information to:</p>
                    <ul className="list-disc ml-6 mt-2 text-gray-300">
                      <li>Provide and improve our services</li>
                      <li>Process payments and transactions</li>
                      <li>Schedule and manage appointments</li>
                      <li>Communicate about service updates</li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">2.2 Marketing and Communications</h3>
                    <p className="text-gray-300">With your consent, we may use your information for:</p>
                    <ul className="list-disc ml-6 mt-2 text-gray-300">
                      <li>Sending newsletters and updates</li>
                      <li>Promotional offers and discounts</li>
                      <li>Service recommendations</li>
                      <li>Customer feedback and surveys</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">3. Information Sharing</h2>
                <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                  <p className="text-gray-300">We may share your information with:</p>
                  <ul className="list-disc ml-6 mt-2 text-gray-300">
                    <li>Service providers and contractors</li>
                    <li>Payment processors and financial institutions</li>
                    <li>Legal and regulatory authorities</li>
                    <li>Business partners and affiliates</li>
                  </ul>
                  <p className="mt-4 text-gray-300">We do not sell your personal information to third parties.</p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">4. Data Security</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">4.1 Security Measures</h3>
                    <p className="text-gray-300">We implement appropriate security measures to protect your information, including:</p>
                    <ul className="list-disc ml-6 mt-2 text-gray-300">
                      <li>Encryption of sensitive data</li>
                      <li>Secure data storage systems</li>
                      <li>Access controls and authentication</li>
                      <li>Regular security assessments</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">5. Your Rights</h2>
                <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                  <p className="text-gray-300">You have the right to:</p>
                  <ul className="list-disc ml-6 mt-2 text-gray-300">
                    <li>Access your personal information</li>
                    <li>Request corrections to your data</li>
                    <li>Withdraw consent for marketing</li>
                    <li>Request data deletion</li>
                    <li>Lodge a complaint with authorities</li>
                  </ul>
                </div>
              </div>

              {/* Section 6 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">6. Cookies and Tracking</h2>
                <p className="text-gray-300">
                  We use cookies and similar technologies to enhance your experience and collect usage data. You can control cookie settings through your browser preferences.
                </p>
              </div>

              {/* Section 7 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">7. Changes to Privacy Policy</h2>
                <p className="text-gray-300">
                  We may update this Privacy Policy periodically. We will notify you of any material changes and obtain consent where required by law.
                </p>
              </div>

              {/* Section 8 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">8. Contact Us</h2>
                <p className="text-gray-300">
                  For privacy-related inquiries or to exercise your rights, please contact us at:
                </p>
                <div className="mt-4 text-gray-300">
                  <p>Email: privacy@hdtradeservices.com.au</p>
                  <p>Phone: 1300 420 911</p>
                  <p>Address: Brisbane, QLD</p>
                </div>
              </div>

              {/* Acknowledgment section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-12 p-8 bg-[#1CD4A7]/10 backdrop-blur-lg rounded-xl border border-[#1CD4A7]/20 shadow-[0_0_30px_rgba(28,212,167,0.2)]"
              >
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">Your Privacy Matters</h2>
                <p className="text-gray-300">
                  By using our services, you acknowledge that you have read and understood this Privacy Policy and consent to our collection and use of your information as described herein.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 