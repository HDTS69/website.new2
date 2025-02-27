"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/SparklesCore";

export default function TermsPage() {
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Terms and Conditions</h1>
            <p className="text-xl text-[#1CD4A7]">
              HD Trade Services Pty Ltd
            </p>
            <p className="text-gray-400 mt-2">
              Effective Date: {currentDate}
            </p>
          </motion.div>

          {/* Terms content */}
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]"
              >
                <p className="text-gray-300">
                  These Terms and Conditions ("Agreement") govern the services provided by HD Trade Services Pty Ltd ("Company," "we," "us," or "our") to the client ("you" or "Customer"). By engaging our services, you agree to these terms and conditions in full. Please read this Agreement carefully before proceeding.
                </p>
              </motion.div>

              {/* Section 1 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">1. Scope of Work</h2>
                <p className="text-gray-300">
                  HD Trade Services Pty Ltd will provide plumbing services as detailed in the quotation or written agreement issued prior to commencement. Services will be conducted professionally, promptly, and in compliance with all relevant regulations and standards in Queensland, Australia.
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">2. Payment Terms</h2>
                
                <div className="space-y-6">
                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">2.1 Payment Upon Completion</h3>
                    <p className="text-gray-300">Full payment is due immediately upon completion of work unless agreed otherwise in writing.</p>
                  </div>

                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">2.2 Late Payment Interest</h3>
                    <p className="text-gray-300">If payment is not received within 7 days of completion, interest will accrue on the overdue amount at a rate of 10% per annum, calculated daily until the outstanding amount is paid in full.</p>
                  </div>

                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">2.3 Recovery Costs</h3>
                    <p className="text-gray-300">The Customer agrees to reimburse all reasonable costs incurred by the Company in recovering unpaid amounts.</p>
                  </div>

                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">2.4 Hourly Recovery Fee</h3>
                    <p className="text-gray-300">In the event of late payment, the Customer agrees to pay for the Company's time spent on recovery efforts, including but not limited to:</p>
                    <ul className="list-disc ml-6 mt-2 text-gray-300">
                      <li>Administrative efforts, such as drafting letters, making phone calls, and corresponding regarding the debt.</li>
                      <li>Site visits to the property to discuss or collect payment.</li>
                      <li>Coordination with debt collection agencies or legal representatives.</li>
                    </ul>
                    <p className="mt-2 text-gray-300">These efforts will be billed at a rate of $140 per hour, calculated in 15-minute increments. The Customer will receive an itemized statement detailing the time spent and activities performed.</p>
                  </div>

                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">2.5 Non-Attendance Fee</h3>
                    <p className="text-gray-300">If HD Trade Services Pty Ltd attends the Customer's property at the scheduled time and no one is available to provide access to the property or otherwise allow work to proceed, the Customer agrees to pay a non-attendance fee of $123.43.</p>
                  </div>

                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">2.6 Deposit Policy</h3>
                    <p className="text-gray-300">For certain services, the Company may require a deposit before commencing work. Deposits are non-refundable unless otherwise stated in the quotation or agreement.</p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">3. Customer Obligations</h2>
                <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                  <p className="text-gray-300">The Customer agrees to:</p>
                  <ul className="list-disc ml-6 mt-2 text-gray-300">
                    <li>Provide safe, unobstructed access to the property for our personnel and equipment.</li>
                    <li>Ensure that someone is available at the property at the scheduled time to provide access and facilitate the work.</li>
                    <li>Disclose any relevant property conditions, hazards, or issues that may affect our services.</li>
                  </ul>
                  <p className="mt-4 text-gray-300">Failure to comply with these obligations may result in delays or additional costs, which the Customer agrees to bear.</p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">4. Warranties and Liability</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">4.1 Workmanship Warranty</h3>
                    <p className="text-gray-300">The Company provides a 1-year warranty on all workmanship starting from the date of work completion.</p>
                  </div>
                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">4.2 Warranty Exclusions</h3>
                    <p className="text-gray-300">The warranty is void under the following circumstances:</p>
                    <ul className="list-disc ml-6 mt-2 text-gray-300">
                      <li>Misuse, neglect, or accidental damage.</li>
                      <li>Lack of routine maintenance as specified by us.</li>
                      <li>Unauthorized repairs, modifications, or tampering by third parties.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">5. Confidentiality and Non-Disparagement</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">5.1 Confidentiality</h3>
                    <p className="text-gray-300">The Customer agrees to maintain the confidentiality of all communications, pricing, and project details shared by the Company.</p>
                  </div>
                  <div className="border-l-2 border-[#1CD4A7]/50 pl-4">
                    <h3 className="text-white font-semibold mb-2">5.2 Non-Disparagement</h3>
                    <p className="text-gray-300">The Customer agrees not to post, share, or publish any negative, critical, misleading, or defamatory statements about the Company.</p>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">6. Dispute Resolution</h2>
                <p className="text-gray-300">All disputes will be addressed through direct negotiation first, followed by mediation if necessary, in Queensland, Australia.</p>
              </div>

              {/* Section 7 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">7. Termination</h2>
                <p className="text-gray-300">The Company may terminate this Agreement immediately if the Customer breaches any terms or if payments are overdue.</p>
              </div>

              {/* Section 8 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">8. Governing Law</h2>
                <p className="text-gray-300">This Agreement is governed by and interpreted in accordance with the laws of Queensland, Australia.</p>
              </div>

              {/* Section 9 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">9. Severability</h2>
                <p className="text-gray-300">If any part of this Agreement is deemed invalid or unenforceable, the remaining provisions will remain in full force and effect.</p>
              </div>

              {/* Section 10 */}
              <div className="space-y-4 bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-[#1CD4A7]/10 shadow-[0_0_15px_rgba(28,212,167,0.1)]" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">10. Variation of Terms</h2>
                <p className="text-gray-300">The Company reserves the right to update these Terms and Conditions at any time. Customers will be notified of changes before engaging services under the updated terms.</p>
              </div>

              {/* Acknowledgment section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-12 p-8 bg-[#1CD4A7]/10 backdrop-blur-lg rounded-xl border border-[#1CD4A7]/20 shadow-[0_0_30px_rgba(28,212,167,0.2)]"
              >
                <h2 className="text-2xl font-bold text-[#1CD4A7] mb-4">Customer Acknowledgment</h2>
                <p className="text-gray-300">
                  By engaging HD Trade Services Pty Ltd, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 