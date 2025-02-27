"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Clock, Shield, Award, CreditCard, Zap, Wrench, 
  Recycle, Users, Gift, Truck, HeartHandshake, ThumbsUp 
} from "lucide-react";
import { SparklesCore } from "@/components/ui/SparklesCore";

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

// Combined all features into one array with 12 items
const allFeatures = [
  {
    icon: Clock,
    title: "24/7 Service",
    subheader: "Always Available"
  },
  {
    icon: Truck,
    title: "Same Day Service",
    subheader: "Fast Turnaround"
  },
  {
    icon: Award,
    title: "Satisfaction Guarantee",
    subheader: "Quality Assured"
  },
  {
    icon: CreditCard,
    title: "Finance Options",
    subheader: "Interest-Free"
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    subheader: "100% Certified"
  },
  {
    icon: Zap,
    title: "Live Tracking",
    subheader: "Real-Time Updates"
  },
  {
    icon: Wrench,
    title: "Premium Equipment",
    subheader: "Top Quality"
  },
  {
    icon: HeartHandshake,
    title: "Reliability & Trust",
    subheader: "Trusted Service"
  },
  {
    icon: ThumbsUp,
    title: "Fixed First Time",
    subheader: "Guaranteed Results"
  },
  {
    icon: Users,
    title: "Expert Team",
    subheader: "Licensed Pros"
  },
  {
    icon: Gift,
    title: "Member Benefits",
    subheader: "VIP Program"
  },
  {
    icon: Recycle,
    title: "Eco-Friendly",
    subheader: "Sustainable Options"
  }
];

export function WhyChooseUsMobile() {
  return (
    <section className="relative py-10 px-4 bg-black overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#00E6CA"
          speed={0.5}
        />
      </div>

      <div className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUpVariant}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-1">
            Why Choose Us
          </h2>
          <p className="text-sm text-[#00E6CA]">
            Excellence in every service
          </p>
        </motion.div>

        {/* Grid of 12 cards */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-2"
        >
          {allFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUpVariant}
                custom={index}
                className="flex flex-col items-center"
              >
                <div className="w-full aspect-square flex flex-col items-center justify-center p-2 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300 text-center">
                  <div className="w-8 h-8 bg-[#00E6CA]/10 rounded-full flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4 text-[#00E6CA]" />
                  </div>
                  <h3 className="text-xs font-semibold text-white leading-tight line-clamp-2">{feature.title}</h3>
                  <p className="text-[#00E6CA] font-medium text-[10px] mt-0.5 line-clamp-1">{feature.subheader}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 