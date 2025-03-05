"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Shield, Award, CreditCard, Zap, Wrench, Recycle, Users, Gift, Truck, HeartHandshake } from "lucide-react";
import { SparklesCore } from "./SparklesCore";

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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

// Combined all features into one array with consistent structure
const allFeatures = [
  {
    icon: Clock,
    title: "24/7 Service",
    description: "We're at your door ASAP when you need us most",
    highlight: "Always Available",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    icon: Truck,
    title: "Same Day Service",
    description: "Quick response for urgent repairs and installations",
    highlight: "Fast Turnaround",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Award,
    title: "Satisfaction Guarantee",
    description: "No band-aid fixes, just long-term solutions",
    highlight: "Quality Assured",
    gradient: "from-amber-500 to-pink-500"
  },
  {
    icon: CreditCard,
    title: "Finance Options",
    description: "Flexible payment plans to suit your budget",
    highlight: "Interest-Free Available",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully certified professionals you can trust",
    highlight: "100% Certified",
    gradient: "from-blue-500 to-violet-500"
  },
  {
    icon: Zap,
    title: "Live Tracking",
    description: "Know exactly when your technician will arrive",
    highlight: "Real-Time Updates",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Wrench,
    title: "Premium Equipment",
    description: "Using the best tools and materials for lasting results",
    highlight: "Top Quality",
    gradient: "from-rose-500 to-red-500"
  },
  {
    icon: HeartHandshake,
    title: "Reliability & Trust",
    description: "Building long-term relationships with our customers",
    highlight: "Trusted Service",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Award,
    title: "Fixed First Time",
    description: "Get it done right the first time, every time",
    highlight: "Guaranteed results",
    gradient: "from-sky-500 to-blue-600"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Highly trained technicians ready to tackle any job",
    highlight: "Licensed professionals",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    icon: Gift,
    title: "Member Benefits",
    description: "Exclusive discounts and priority service for members",
    highlight: "Join our VIP program",
    gradient: "from-orange-500 to-amber-600"
  },
  {
    icon: Recycle,
    title: "Eco-Friendly Solutions",
    description: "Sustainable options that reduce water & energy waste",
    highlight: "Environmental care",
    gradient: "from-lime-500 to-green-600"
  }
];

export function WhyChooseUs() {
  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={60}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.2}
        />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          variants={fadeInUpVariant}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-[#00E6CA] uppercase tracking-wider block text-center mb-2">OUR ADVANTAGES</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative">
            Why Choose Us
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#00E6CA] to-transparent"></div>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-6">
            Experience excellence with our comprehensive service offerings
          </p>
        </motion.div>

        {/* All Features in a Grid */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
        >
          {allFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="relative"
                variants={fadeInUpVariant}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="group relative p-6 rounded-2xl bg-gray-900/70 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 h-full shadow-xl overflow-hidden">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  <div className="flex flex-col items-center text-center gap-4 relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                      <p className="text-[#00E6CA] font-semibold text-sm mb-2">{feature.highlight}</p>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
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
          className="text-center mt-16 text-sm text-gray-400"
        >
          <p>* Terms and conditions apply. Contact us for full details.</p>
        </motion.div>
      </div>
    </section>
  );
} 