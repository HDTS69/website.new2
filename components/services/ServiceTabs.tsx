"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SparklesCore } from "@/components/ui/SparklesCore";
import Link from "next/link";

type ServiceId = "plumbing" | "gasFitting" | "roofRepairs" | "airConditioning";

interface Tab {
  id: ServiceId;
  label: string;
}

interface Service {
  name: string;
  href: string;
  isGuide?: boolean;
  isCalculator?: boolean;
}

interface ServiceContent {
  title: string;
  subheading: string;
  description: string;
  imagePath: string;
  videoUrl?: string;
  services: Service[];
}

interface ServiceTabButtonProps {
  tab: Tab;
  activeTab: ServiceId;
  onClick: (id: ServiceId) => void;
}

interface ServiceLinkProps {
  service: Service;
}

const Header = () => (
  <h3 className="text-lg font-semibold text-white relative inline-block">
    HD Trade Services
    <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-[#00E6CA] to-transparent"></span>
  </h3>
);

const ServiceTabButton = ({ tab, activeTab, onClick }: ServiceTabButtonProps) => (
  <motion.button
    key={tab.id}
    onClick={() => onClick(tab.id)}
    className={cn(
      "relative px-8 py-4 rounded-2xl text-sm font-medium transition-all duration-300",
      "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/5 before:to-white/10 before:backdrop-blur-xl",
      "after:absolute after:inset-0.5 after:rounded-[14px] after:transition-all after:duration-300",
      activeTab === tab.id
        ? "bg-gradient-to-r from-[#00E6CA] via-[#00C7AE] to-[#00E6CA] text-black shadow-lg shadow-[#00E6CA]/20 after:bg-[#00E6CA] [animation:glow_3s_ease-in-out_infinite]"
        : "bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 after:bg-gradient-to-r after:from-gray-900 after:to-gray-800"
    )}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="relative z-10">{tab.label}</span>
  </motion.button>
);

const ServiceLink = ({ service }: ServiceLinkProps) => (
  <div className="flex items-center gap-6 group">
    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-[#1C1C1C]">
      {service.isCalculator ? (
        <svg 
          className="w-5 h-5 text-[#00E6CA]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
          />
        </svg>
      ) : service.isGuide ? (
        <svg 
          className="w-5 h-5 text-[#00E6CA]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
          />
        </svg>
      ) : (
        <svg 
          className="w-5 h-5 text-[#00E6CA]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M13 10V3L4 14h7v7l9-11h-7z" 
          />
        </svg>
      )}
    </div>
    <Link
      href={service.href}
      className="relative flex-grow py-2"
    >
      <span className="text-white text-base font-medium hover:text-[#00E6CA] transition-colors duration-300">
        {service.name}
      </span>
      <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#00E6CA] to-transparent w-8 group-hover:w-full transition-all duration-300"></span>
    </Link>
    <svg
      className="w-5 h-5 text-[#00E6CA] transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </div>
);

const serviceData: Record<ServiceId, ServiceContent> = {
  plumbing: {
    title: "Expert Plumbing Services",
    subheading: "Professional Solutions for All Your Plumbing Needs",
    description: "From emergency repairs to complete bathroom renovations, our licensed plumbers deliver reliable solutions with guaranteed workmanship.",
    imagePath: "/images/placeholder-service.jpg",
    services: [
      { name: "Hot Water Systems", href: "/services/plumbing/hot-water-systems" },
      { name: "Fixtures & Taps", href: "/services/plumbing/fixtures-taps" },
      { name: "Pipe Repairs", href: "/services/plumbing/pipe-repairs" },
      { name: "Bathroom Renovations", href: "/services/plumbing/bathroom-renovations" },
      { name: "Drain Cleaning", href: "/services/plumbing/drain-cleaning" },
      { name: "Toilet Repairs", href: "/services/plumbing/toilet-repairs" },
      { name: "Sewer & Stormwater Services", href: "/services/plumbing/sewer-stormwater" },
      { name: "Water Pressure Adjustments", href: "/services/plumbing/water-pressure" },
      { name: "Hot Water System Buyers Guide", href: "/services/plumbing/hot-water-system-buyers-guide", isGuide: true }
    ]
  },
  gasFitting: {
    title: "Gas Fitting Services",
    subheading: "Safe & Certified Gas Installation",
    description: "Trust our licensed gas fitters for all your gas appliance installations, maintenance, and safety inspections.",
    imagePath: "/images/placeholder-service.jpg",
    services: [
      { name: "Gas Line Installation", href: "/services/gas-fitting/gas-line-installation" },
      { name: "Gas Heater Services", href: "/services/gas-fitting/gas-heater-services" },
      { name: "Gas Leak Detection", href: "/services/gas-fitting/gas-leak-detection" },
      { name: "Gas Compliance Certificates", href: "/services/gas-fitting/gas-compliance-certificates" },
      { name: "Gas Appliance Installation", href: "/services/gas-fitting/gas-appliance-installation" },
      { name: "Gas Cooktop Installation", href: "/services/gas-fitting/gas-cooktop-installation" },
      { name: "Gas Safety Inspections", href: "/services/gas-fitting/gas-safety-inspections" },
      { name: "Emergency Gas Repairs", href: "/services/gas-fitting/emergency-gas-repairs" }
    ]
  },
  roofRepairs: {
    title: "Roof Repair Solutions",
    subheading: "Protect Your Home from Top to Bottom",
    description: "Expert roof repairs and maintenance to keep your home safe and dry, with comprehensive inspection services.",
    imagePath: "/images/placeholder-service.jpg",
    services: [
      { name: "Leak Investigation", href: "/services/roof-repairs/leak-investigation" },
      { name: "Roof Reports", href: "/services/roof-repairs/roof-report" },
      { name: "Gutter & Downpipes", href: "/services/roof-repairs/gutter-downpipes" },
      { name: "Roof Tile Repair", href: "/services/roof-repairs/roof-tile-repair" },
      { name: "Leak Detection", href: "/services/roof-repairs/leak-detection" },
      { name: "Roof Maintenance", href: "/services/roof-repairs/roof-maintenance" },
      { name: "Metal Roofing", href: "/services/roof-repairs/metal-roofing" },
      { name: "Roof Ventilation", href: "/services/roof-repairs/roof-ventilation" },
      { name: "Gutter Guard", href: "/services/roof-repairs/gutter-guard" },
      { name: "Roof Sizing Calculator", href: "/services/roof-repairs/roof-sizing-calculator", isCalculator: true }
    ]
  },
  airConditioning: {
    title: "Air Conditioning Services",
    subheading: "Complete Climate Control Solutions",
    description: "From installation to maintenance, we ensure your comfort with expert air conditioning services.",
    imagePath: "/images/placeholder-service.jpg",
    services: [
      { name: "Split System Installation", href: "/services/air-conditioning/split-system-installation" },
      { name: "AC Repairs", href: "/services/air-conditioning/ac-repairs" },
      { name: "AC Diagnostics", href: "/services/air-conditioning/ac-diagnostics" },
      { name: "Maintenance", href: "/services/air-conditioning/maintenance" },
      { name: "Ducted Systems", href: "/services/air-conditioning/ducted-systems" },
      { name: "Emergency Services", href: "/services/air-conditioning/emergency-services" },
      { name: "System Optimization", href: "/services/air-conditioning/system-optimization" },
      { name: "System Upgrades", href: "/services/air-conditioning/system-upgrades" },
      { name: "Air Con Sizing Calculator", href: "/services/air-conditioning/air-con-sizing-calculator", isCalculator: true }
    ]
  }
};

const tabs: readonly Tab[] = [
  { id: "plumbing", label: "Plumbing" },
  { id: "gasFitting", label: "Gas Fitting" },
  { id: "roofRepairs", label: "Roof Repairs" },
  { id: "airConditioning", label: "Air Conditioning" }
] as const;

interface MotionVariants {
  [key: string]: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration?: number;
      staggerChildren?: number;
      delay?: number;
    };
  };
}

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState<ServiceId>(tabs[0].id);
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants: MotionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-8 px-4 md:px-6 lg:px-8 bg-black min-h-[600px] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#00E6CA"
          speed={0.2}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <ServiceTabButton
              key={tab.id}
              tab={tab}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Media Section */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-900 group">
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

            {/* Content Section */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {serviceData[activeTab].title}
                </h2>
                <p className="text-xl text-[#00E6CA] animate-pulse">
                  {serviceData[activeTab].subheading}
                </p>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {serviceData[activeTab].description}
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Our Services Include:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceData[activeTab].services.map((service, index) => (
                    <motion.li
                      key={service.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ServiceLink service={service} />
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* View All Services Link */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4"
              >
                <Link
                  href={`/services/${activeTab.toLowerCase()}`}
                  className="group inline-flex items-center gap-2 text-gray-400 hover:text-[#00E6CA] transition-colors duration-300"
                >
                  <span className="text-sm">View All {serviceData[activeTab].title}</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>

              <div>
                <AnimatedButton 
                  href="#book"
                  variant="primary"
                  className="shadow-lg hover:shadow-xl hover:shadow-[#00E6CA]/20"
                >
                  Book Now
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 