"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Clock, Shield, Award, CreditCard, Zap, Wrench, 
  Recycle, Users, Gift, Truck, HeartHandshake 
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

// Combined all features into one array with consistent structure - matching desktop version
const allFeatures = [
  {
    icon: Clock,
    title: "24/7 Service",
    highlight: "Always Available",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    icon: Truck,
    title: "Same Day Service",
    highlight: "Fast Turnaround",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Award,
    title: "Satisfaction Guarantee",
    highlight: "Quality Assured",
    gradient: "from-amber-500 to-pink-500"
  },
  {
    icon: CreditCard,
    title: "Finance Options",
    highlight: "Interest-Free Available",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    highlight: "100% Certified",
    gradient: "from-blue-500 to-violet-500"
  },
  {
    icon: Zap,
    title: "Live Tracking",
    highlight: "Real-Time Updates",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Wrench,
    title: "Premium Equipment",
    highlight: "Top Quality",
    gradient: "from-rose-500 to-red-500"
  },
  {
    icon: HeartHandshake,
    title: "Reliability & Trust",
    highlight: "Trusted Service",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Award,
    title: "Fixed First Time",
    highlight: "Guaranteed results",
    gradient: "from-sky-500 to-blue-600"
  },
  {
    icon: Users,
    title: "Expert Team",
    highlight: "Licensed professionals",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    icon: Gift,
    title: "Member Benefits",
    highlight: "Join our VIP program",
    gradient: "from-orange-500 to-amber-600"
  },
  {
    icon: Recycle,
    title: "Eco-Friendly Solutions",
    highlight: "Environmental care",
    gradient: "from-lime-500 to-green-600"
  }
];

export function WhyChooseUsMobile() {
  return (
    <section className="relative py-10 px-4 bg-black overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage-mobile"
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
                className="flex flex-col items-center"
              >
                <div className="w-full aspect-square flex flex-col items-center justify-center p-2 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300 text-center relative overflow-hidden">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 hover:opacity-10 transition-opacity duration-500 rounded-lg`}></div>
                  
                  <div className={`w-8 h-8 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mb-2`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xs font-semibold text-white leading-tight line-clamp-2">{feature.title}</h3>
                  <p className="text-[#00E6CA] font-medium text-[10px] mt-0.5 line-clamp-1">{feature.highlight}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 