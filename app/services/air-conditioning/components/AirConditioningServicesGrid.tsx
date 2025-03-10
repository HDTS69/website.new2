'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LordIcon from '@/app/components/LordIcon';

interface Service {
  title: string;
  description: string;
  icon: string;
  href: string;
  lordIcon?: string;
  customIcon?: string;
}

const services: Service[] = [
  {
    title: "AC Installation",
    description: "Professional installation services for all types of air conditioning systems with expert setup and configuration.",
    icon: "/icons/placeholder.svg",
    href: "/services/air-conditioning/installation",
    customIcon: "/icons/Flat 1030 Service Alt Hover Pinch.json"
  },
  {
    title: "AC Repairs",
    description: "Expert repair services for all air conditioning issues, from minor fixes to major system repairs.",
    icon: "/icons/placeholder.svg",
    href: "/services/air-conditioning/repairs",
    customIcon: "/icons/Lordicon Toolbox Hover Pinch.json"
  },
  {
    title: "AC Servicing",
    description: "Regular maintenance and servicing to keep your air conditioning system running efficiently and extend its lifespan.",
    icon: "/icons/placeholder.svg",
    href: "/services/air-conditioning/servicing",
    customIcon: "/icons/Wired Flat 1029 Service Hover Pinch.json"
  },
  {
    title: "AC Cleaning",
    description: "Thorough cleaning of air conditioning systems for better air quality, improved efficiency, and system longevity.",
    icon: "/icons/placeholder.svg",
    href: "/services/air-conditioning/cleaning",
    customIcon: "/icons/Wired Flat Cleaning Surface Hover Pinch.json"
  },
  {
    title: "AC Diagnostics",
    description: "Comprehensive diagnostic services to identify and troubleshoot air conditioning issues with precision.",
    icon: "/icons/placeholder.svg",
    href: "/services/air-conditioning/diagnostics",
    customIcon: "/icons/Lordicon Interface Settings Hover Pinch.json"
  },
  {
    title: "Split System AC",
    description: "Complete solutions for split system air conditioning, including installation, repairs, and maintenance.",
    icon: "/icons/placeholder.svg",
    href: "/services/air-conditioning/split-system",
    customIcon: "/icons/Wired Flat Air Conditioner Icon.json"
  },
  {
    title: "Ducted AC",
    description: "Expert services for ducted air conditioning systems, providing whole-home comfort solutions.",
    icon: "/icons/placeholder.svg",
    href: "/services/air-conditioning/ducted",
    customIcon: "/icons/Wired Flat Wind Hover Pinch.json"
  },
  {
    title: "Air Con Sizing Calculator",
    description: "Professional sizing services to determine the perfect air conditioning capacity for your space.",
    icon: "/icons/placeholder.svg",
    href: "/services/air-conditioning/air-con-sizing-calculator",
    customIcon: "/icons/Flat Calculator Icon.json"
  }
];

export function AirConditioningServicesGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="py-8">
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredCard(service.title)}
            onMouseLeave={() => setHoveredCard(null)}
            className="group"
          >
            <Link
              href={service.href}
              className="block h-full p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-[#00E6CA]/20 hover:border-[#00E6CA]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#00E6CA]/20"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 w-16 h-16 relative">
                  {service.customIcon ? (
                    <LordIcon
                      src={service.customIcon}
                      forceTrigger={hoveredCard === service.title}
                      size={64}
                    />
                  ) : service.lordIcon ? (
                    <LordIcon
                      src={service.lordIcon}
                      forceTrigger={hoveredCard === service.title}
                      size={64}
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-[#00E6CA]/10 rounded-full">
                      <svg
                        className="w-8 h-8 text-[#00E6CA]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 text-sm">
                  {service.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 