'use client';

import ClientBackground from '@/app/components/ClientBackground';
import { motion } from 'framer-motion';
import { Testimonials } from "@/components/ui/Testimonials";
import { BookingForm } from "@/components/ui/BookingForm/BookingForm";
import { GoogleReviews } from "@/components/ui/GoogleReviews";

interface ServicePageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ServicePageLayout({ title, description, children }: ServicePageLayoutProps) {
  return (
    <div className="relative w-full min-h-screen">
      <ClientBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E6CA] to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: 1, 
                opacity: [0, 1, 1, 0.8],
              }}
              transition={{ 
                duration: 1.5,
                opacity: {
                  times: [0, 0.3, 0.7, 1],
                  duration: 1.5
                },
                ease: "easeOut"
              }}
              style={{
                transformOrigin: "center"
              }}
            />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 mb-4">
            {description}
          </p>
          <div className="flex justify-center">
            <GoogleReviews />
          </div>
        </div>

        {/* Services Grid */}
        {children}
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Booking Form Section */}
      <section id="book" className="w-full py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Book Your Service
              </h2>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E6CA] to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: 1, 
                  opacity: [0, 1, 1, 0.8],
                }}
                transition={{ 
                  duration: 1.5,
                  opacity: {
                    times: [0, 0.3, 0.7, 1],
                    duration: 1.5
                  },
                  ease: "easeOut"
                }}
                style={{
                  transformOrigin: "center"
                }}
              />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="bg-black/80 backdrop-blur-md rounded-2xl border border-[#00E6CA]/20 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Column - Benefits */}
                <div className="p-8 bg-gradient-to-br from-[#00E6CA]/10 via-black/50 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="text-[#00E6CA] mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </span>
                    Why Trust Our Services?
                  </h3>
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="mr-4 p-2 rounded-lg bg-[#00E6CA]/20 text-[#00E6CA]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </span>
                      <div>
                        <h4 className="font-semibold text-white text-lg">24/7 Emergency Response</h4>
                        <p className="text-gray-400">Available around the clock for urgent service calls. Your safety is our top priority.</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="mr-4 p-2 rounded-lg bg-[#00E6CA]/20 text-[#00E6CA]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 8v4l2 2"></path>
                        </svg>
                      </span>
                      <div>
                        <h4 className="font-semibold text-white text-lg">Licensed & Fully Insured</h4>
                        <p className="text-gray-400">Expert technicians with up-to-date certifications and comprehensive insurance coverage.</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="mr-4 p-2 rounded-lg bg-[#00E6CA]/20 text-[#00E6CA]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </span>
                      <div>
                        <h4 className="font-semibold text-white text-lg">Transparent Pricing</h4>
                        <p className="text-gray-400">Upfront quotes with no hidden fees. Quality service at competitive rates.</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="mr-4 p-2 rounded-lg bg-[#00E6CA]/20 text-[#00E6CA]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <path d="M14 2v6h6"></path>
                          <path d="M9 15h6"></path>
                          <path d="M9 11h6"></path>
                        </svg>
                      </span>
                      <div>
                        <h4 className="font-semibold text-white text-lg">Quality Workmanship</h4>
                        <p className="text-gray-400">Expert craftsmanship and attention to detail on every job, backed by our satisfaction guarantee.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right Column - Booking Form */}
                <div className="p-8 bg-black/50">
                  <BookingForm brandName="HD Trade Services" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 