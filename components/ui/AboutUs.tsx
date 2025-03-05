"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedButton } from './AnimatedButton';
import { getImageLoadingProps, IMAGE_SIZES, ImagePriority } from '@/utils/imageLoading';
import { SparklesCore } from './SparklesCore';

export function AboutUs() {
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
          {/* Image Column - Updated to plain style */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
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

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-[#00E6CA] font-medium uppercase tracking-wider mb-2">HIGHLY REVIEWED, RATED AND LOVED!</h3>
              <h2 className="text-4xl font-bold text-white mb-4">Over 14 Years of Trust and Reliability</h2>
              <p className="text-gray-300">
                HD Trade Services has been setting the standard for exceptional plumbing services in South East Queensland. Our unwavering commitment to quality, reliability, and customer satisfaction has made us the go-to choice for homeowners and businesses alike.
              </p>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#00E6CA]/20 p-1">
                  <div className="w-2 h-2 rounded-full bg-[#00E6CA]"></div>
                </div>
                <span className="text-gray-300">Our plumbers have seen it all and fixed it all</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#00E6CA]/20 p-1">
                  <div className="w-2 h-2 rounded-full bg-[#00E6CA]"></div>
                </div>
                <span className="text-gray-300">Meticulous attention to detail and workmanship</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#00E6CA]/20 p-1">
                  <div className="w-2 h-2 rounded-full bg-[#00E6CA]"></div>
                </div>
                <span className="text-gray-300">Cutting-edge technology for fast, effective solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#00E6CA]/20 p-1">
                  <div className="w-2 h-2 rounded-full bg-[#00E6CA]"></div>
                </div>
                <span className="text-gray-300">Swift, efficient service to minimise disruptions to daily life</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#00E6CA]/20 p-1">
                  <div className="w-2 h-2 rounded-full bg-[#00E6CA]"></div>
                </div>
                <span className="text-gray-300">Transparent, upfront pricing - no hidden costs or surprises</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#00E6CA]/20 p-1">
                  <div className="w-2 h-2 rounded-full bg-[#00E6CA]"></div>
                </div>
                <span className="text-gray-300">We're not satisfied until our clients are 100% happy</span>
              </li>
            </ul>

            <div className="pt-4">
              <AnimatedButton href="/about" variant="primary" className="text-black">
                Learn More About Us
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 