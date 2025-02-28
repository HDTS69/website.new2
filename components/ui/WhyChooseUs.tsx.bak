"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Shield, Award, CreditCard, Zap, Wrench, Recycle, Users, Gift, Truck, HeartHandshake } from "lucide-react";
import { SparklesCore } from "./SparklesCore";

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
  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-black overflow-hidden">
      {/* SparklesCore Background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.3}
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-1"></div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUpVariant}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-xl text-[#00E6CA] max-w-2xl mx-auto">
            Experience excellence with our comprehensive service offerings
          </p>
        </motion.div>

        {/* Top Row Features */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="relative"
                variants={fadeInUpVariant}
              >
                <div className="group h-full relative p-6 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-gray-800/50 hover:border-[#00E6CA]/30 shadow-lg hover:shadow-[#00E6CA]/10 transition-all duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00E6CA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#00E6CA]/20 to-[#00E6CA]/5 rounded-xl flex items-center justify-center group-hover:from-[#00E6CA]/30 group-hover:to-[#00E6CA]/10 transition-colors duration-300 flex-shrink-0 shadow-inner">
                      <Icon className="w-7 h-7 text-[#00E6CA] drop-shadow-[0_0_8px_rgba(0,230,202,0.5)]" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00E6CA] transition-colors duration-300">{feature.title}</h3>
                  </div>
                  
                  <p className="text-[#00E6CA] font-medium text-sm mb-2">{feature.highlight}</p>
                  <p className="text-gray-300 text-base">{feature.description}</p>
                  
                  {/* Subtle glow effect on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E6CA]/0 via-[#00E6CA]/50 to-[#00E6CA]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {bottomFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUpVariant}
                className="group"
              >
                <div className="h-full p-6 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-gray-800/50 hover:border-[#00E6CA]/30 shadow-lg hover:shadow-[#00E6CA]/10 transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00E6CA]/20 to-[#00E6CA]/5 rounded-full flex items-center justify-center group-hover:from-[#00E6CA]/30 group-hover:to-[#00E6CA]/10 transition-colors duration-300 mb-4 shadow-inner">
                      <Icon className="w-8 h-8 text-[#00E6CA] drop-shadow-[0_0_8px_rgba(0,230,202,0.5)]" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00E6CA] transition-colors duration-300 mb-1">{feature.title}</h3>
                    <p className="text-sm text-[#00E6CA] font-medium mb-3">{feature.subtext}</p>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                  
                  {/* Subtle glow effect on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E6CA]/0 via-[#00E6CA]/50 to-[#00E6CA]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
          className="text-center mt-12 text-sm text-gray-400 backdrop-blur-sm bg-black/30 py-3 px-6 rounded-full max-w-max mx-auto"
        >
          <p>* Terms and conditions apply. Contact us for full details.</p>
        </motion.div>
      </div>
    </section>
  );
} 