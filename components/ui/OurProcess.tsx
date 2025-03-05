"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedButton } from './AnimatedButton';
import { getImageLoadingProps, IMAGE_SIZES, ImagePriority } from '@/utils/imageLoading';
import { SparklesCore } from './SparklesCore';

export function OurProcess() {
  return (
    <section className="relative py-16 px-4 md:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.2}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 order-2 md:order-1"
          >
            <div>
              <h3 className="text-[#00E6CA] font-medium uppercase tracking-wider mb-2">HASSLE-FREE PLUMBING</h3>
              <h2 className="text-4xl font-bold text-white mb-4">The HD Trade Services Process</h2>
              <p className="text-gray-300">
                Exceptional service begins with a streamlined, customer-focused process. Our approach is designed to make your plumbing experience as seamless and stress-free as possible.
              </p>
            </div>

            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#00E6CA]/20 flex items-center justify-center text-[#00E6CA] font-semibold text-sm">1</div>
                </div>
                <div>
                  <p className="text-white font-medium">Reach out <span className="text-gray-400">via phone or our website.</span></p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#00E6CA]/20 flex items-center justify-center text-[#00E6CA] font-semibold text-sm">2</div>
                </div>
                <div>
                  <p className="text-white font-medium">We assess <span className="text-gray-400">the issue, and provide an </span><span className="text-[#00E6CA]">upfront quote</span>.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#00E6CA]/20 flex items-center justify-center text-[#00E6CA] font-semibold text-sm">3</div>
                </div>
                <div>
                  <p className="text-white font-medium">Upon agreement, we <span className="text-[#00E6CA]">start the work</span> <span className="text-gray-400">promptly and efficiently. You pay only what we quote. </span><span className="text-[#00E6CA]">No hidden fees</span>.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#00E6CA]/20 flex items-center justify-center text-[#00E6CA] font-semibold text-sm">4</div>
                </div>
                <div>
                  <p className="text-white font-medium">We ensure everything is <span className="text-[#00E6CA]">perfect and clean</span> <span className="text-gray-400">before we leave.</span></p>
                </div>
              </li>
            </ul>

            <div className="pt-4">
              <AnimatedButton href="#book" variant="primary">
                Book Now
              </AnimatedButton>
            </div>
          </motion.div>

          {/* Image Column - Updated to plain style */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 md:order-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl bg-gray-900 group">
              <motion.div 
                className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 transition-all duration-500 group-hover:scale-105"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E6CA]/10 to-transparent opacity-50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,230,202,0.1),transparent_50%)] animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 