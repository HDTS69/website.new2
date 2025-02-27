"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Shield, Award, CreditCard, Zap, Wrench, Recycle, Users, Gift, Truck, HeartHandshake } from "lucide-react";
import { SparklesCore } from "./SparklesCore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";

// Dynamically import the mobile version with no SSR to avoid hydration issues
const MobileWhyChooseUs = dynamic(
  () => import('@/components/mobile/WhyChooseUs'),
  { ssr: false }
);

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const rowVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    icon: Clock,
    title: "24/7 Service",
    description: "We're at your door ASAP when you need us most",
    highlight: "Always Available"
  },
  {
    icon: Truck,
    title: "Same Day Service",
    description: "Quick response for urgent repairs and installations",
    highlight: "Fast Turnaround"
  },
  {
    icon: Award,
    title: "Satisfaction Guarantee",
    description: "No band-aid fixes, just long-term solutions",
    highlight: "Quality Assured"
  },
  {
    icon: CreditCard,
    title: "Finance Options",
    description: "Flexible payment plans to suit your budget",
    highlight: "Interest-Free Available"
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully certified professionals you can trust",
    highlight: "100% Certified"
  },
  {
    icon: Zap,
    title: "Live Tracking",
    description: "Know exactly when your technician will arrive",
    highlight: "Real-Time Updates"
  },
  {
    icon: Wrench,
    title: "Premium Equipment",
    description: "Using the best tools and materials for lasting results",
    highlight: "Top Quality"
  },
  {
    icon: HeartHandshake,
    title: "Reliability & Trust",
    description: "Building long-term relationships with our customers",
    highlight: "Trusted Service"
  }
];

const bottomFeatures = [
  {
    icon: Award,
    title: "Fixed First Time",
    description: "Get it done right the first time, every time",
    subtext: "Guaranteed results"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Highly trained technicians ready to tackle any job",
    subtext: "Licensed professionals"
  },
  {
    icon: Gift,
    title: "Member Benefits",
    description: "Exclusive discounts and priority service for members",
    subtext: "Join our VIP program"
  },
  {
    icon: Recycle,
    title: "Eco-Friendly Solutions",
    description: "Sustainable options that reduce water & energy waste",
    subtext: "Environmental care"
  }
];

export function WhyChooseUs() {
  const [mounted, setMounted] = useState(false);
  
  // Set mounted to true after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // If not mounted yet, render the desktop version without any client-side logic
  if (!mounted) {
    return (
      <section className="relative py-16 px-4 md:px-6 lg:px-8 bg-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 w-full h-full opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px"
          }} />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="standard-header">
              Why Choose Us
            </h2>
            <p className="standard-subheader">
              Experience excellence with our comprehensive service offerings
            </p>
          </div>
          
          {/* Placeholder for content that will be hydrated */}
          <div className="min-h-[400px]"></div>
        </div>
      </section>
    );
  }
  
  // After mounting, check if mobile
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Render mobile version on small screens
  if (isMobile) {
    return <MobileWhyChooseUs />;
  }
  
  // Desktop version
  return (
    <section className="relative py-16 px-4 md:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px"
        }} />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUpVariant}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="standard-header">
            Why Choose Us
          </h2>
          <p className="standard-subheader">
            Experience excellence with our comprehensive service offerings
          </p>
        </motion.div>

        {/* Top Row Features */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="relative"
                variants={fadeInUpVariant}
                custom={index}
              >
                <div className="group relative p-4 sm:p-6 rounded-2xl bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#00E6CA]/10 rounded-full flex items-center justify-center group-hover:bg-[#00E6CA]/20 transition-colors duration-300 flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-[#00E6CA]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="text-[#00E6CA] font-semibold text-xs sm:text-sm line-clamp-1">{feature.highlight}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2 sm:line-clamp-none">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Row Features */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {bottomFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUpVariant}
                className="text-center group"
              >
                <div className="flex items-center gap-3 p-4 sm:p-6 rounded-xl bg-white/5 group-hover:bg-[#00E6CA]/10 transition-colors duration-300">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-[#00E6CA]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-base sm:text-xl font-bold text-white line-clamp-1">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-[#00E6CA] line-clamp-1">{feature.subtext}</p>
                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 sm:line-clamp-none mt-1">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          variants={fadeInUpVariant}
          className="text-center mt-8 sm:mt-16 text-xs sm:text-sm text-gray-400"
        >
          <p>* Terms and conditions apply. Contact us for full details.</p>
        </motion.div>
      </div>
    </section>
  );
} 