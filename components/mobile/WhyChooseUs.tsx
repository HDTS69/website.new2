"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Shield, Award, CreditCard, Zap, Wrench, Recycle, Users, Gift, Truck, HeartHandshake } from "lucide-react";

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Combined features from both top and bottom rows
const allFeatures = [
  {
    icon: Clock,
    title: "24/7 Service",
    highlight: "Always Available"
  },
  {
    icon: Truck,
    title: "Same Day Service",
    highlight: "Fast Turnaround"
  },
  {
    icon: Award,
    title: "Satisfaction Guarantee",
    highlight: "Quality Assured"
  },
  {
    icon: CreditCard,
    title: "Finance Options",
    highlight: "Interest-Free Available"
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    highlight: "100% Certified"
  },
  {
    icon: Zap,
    title: "Live Tracking",
    highlight: "Real-Time Updates"
  },
  {
    icon: Wrench,
    title: "Premium Equipment",
    highlight: "Top Quality"
  },
  {
    icon: HeartHandshake,
    title: "Reliability & Trust",
    highlight: "Trusted Service"
  },
  {
    icon: Award,
    title: "Fixed First Time",
    highlight: "Guaranteed results"
  },
  {
    icon: Users,
    title: "Expert Team",
    highlight: "Licensed professionals"
  },
  {
    icon: Gift,
    title: "Member Benefits",
    highlight: "Join our VIP program"
  },
  {
    icon: Recycle,
    title: "Eco-Friendly Solutions",
    highlight: "Environmental care"
  }
];

export function WhyChooseUs() {
  return (
    <section className="relative py-10 px-4 bg-black overflow-hidden md:hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px"
        }} />
      </div>

      <div className="relative container mx-auto px-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUpVariant}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Why Choose Us
          </h2>
          <p className="text-sm text-gray-300">
            Excellence in every service
          </p>
        </motion.div>

        {/* Condensed Grid of Features */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-2"
        >
          {allFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="relative"
                variants={fadeInUpVariant}
                custom={index}
              >
                <div className="group relative p-3 rounded-xl bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-[#00E6CA]/10 rounded-full flex items-center justify-center group-hover:bg-[#00E6CA]/20 transition-colors duration-300 flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#00E6CA]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-white line-clamp-1">{feature.title}</h3>
                    </div>
                  </div>
                  <p className="text-[#00E6CA] font-medium text-xs line-clamp-1">{feature.highlight}</p>
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
          transition={{ duration: 0.5, delay: 0.5 }}
          variants={fadeInUpVariant}
          className="text-center mt-4 text-xs text-gray-400"
        >
          <p>* Terms and conditions apply.</p>
        </motion.div>
      </div>
    </section>
  );
} 