'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import LordIcon from '@/app/components/LordIcon';

interface Service {
  title: string;
  description: string;
  icon: string;
  href: string;
  lordIcon?: string;
}

const services: Service[] = [
  {
    title: "Roof Inspections",
    description: "Comprehensive roof inspections to identify potential issues and maintenance needs.",
    icon: "/icons/placeholder.svg",
    href: "/services/roof-repairs/inspections",
    lordIcon: "/icons/Man Search Avatar Icon.json"
  },
  {
    title: "Roof Reports",
    description: "Detailed reports documenting roof condition, issues, and recommended solutions.",
    icon: "/icons/placeholder.svg",
    href: "/services/roof-repairs/reports",
    lordIcon: "/icons/Lordicon Privacy Policy.json"
  },
  {
    title: "Roof Leak Detection",
    description: "Advanced leak detection services to identify and locate roof leaks with precision.",
    icon: "/icons/placeholder.svg",
    href: "/services/roof-repairs/leak-detection",
    lordIcon: "/icons/Wired Flat Storm Hover Pinch (1).json"
  },
  {
    title: "Roof Repairs",
    description: "Expert repair services for all types of roof damage and wear.",
    icon: "/icons/placeholder.svg",
    href: "/services/roof-repairs/repairs",
    lordIcon: "/icons/Lordicon Toolbox Hover Pinch.json"
  },
  {
    title: "Roof Tile Repairs",
    description: "Specialized repair and replacement services for damaged roof tiles.",
    icon: "/icons/placeholder.svg",
    href: "/services/roof-repairs/tile-repairs",
    lordIcon: "/icons/Flat Roof Rain Icon.json"
  },
  {
    title: "Metal Roofing",
    description: "Professional metal roofing installation, repairs, and maintenance services.",
    icon: "/icons/placeholder.svg",
    href: "/services/roof-repairs/metal-roofing",
    lordIcon: "/icons/Wired Flat Nails Icon.json"
  },
  {
    title: "Roof Cleaning",
    description: "Professional roof cleaning services to maintain appearance and prevent damage.",
    icon: "/icons/placeholder.svg",
    href: "/services/roof-repairs/cleaning",
    lordIcon: "/icons/Broom Hover Pinch Icon.json"
  },
  {
    title: "Roof Ventilation",
    description: "Expert installation and maintenance of roof ventilation systems.",
    icon: "/icons/placeholder.svg",
    href: "/services/roof-repairs/ventilation",
    lordIcon: "/icons/Wired Flat Wind Hover Pinch.json"
  },
  {
    title: "Gutter Cleaning",
    description: "Thorough cleaning of gutters and downpipes to prevent blockages and water damage.",
    icon: "/icons/placeholder.svg",
    href: "/services/roof-repairs/gutter-cleaning",
    lordIcon: "/icons/Eco Hover Spin Leaves Icon.json"
  },
  {
    title: "Gutter & Downpipes",
    description: "Installation and repair services for gutters and downpipes.",
    icon: "/icons/placeholder.svg",
    href: "/services/roof-repairs/gutter-downpipes",
    lordIcon: "/icons/Flat Home Icon 3D Roll.json"
  },
  {
    title: "Gutter Guard Installation",
    description: "Professional installation of gutter guards to prevent debris buildup.",
    icon: "/icons/placeholder.svg",
    href: "/services/roof-repairs/gutter-guard",
    lordIcon: "/icons/Shield Security Icon.json"
  }
];

export function RoofingServicesGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                {service.lordIcon ? (
                  <LordIcon
                    src={service.lordIcon}
                    forceTrigger={hoveredCard === service.title}
                    size={64}
                  />
                ) : (
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={64}
                    height={64}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
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
  );
} 