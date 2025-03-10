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
  category: string;
  lordIcon?: string;
  emoji?: string; // Add emoji property for temporary icons
}

const services: Service[] = [
  {
    title: "Gas Hot Water",
    description: "Expert installation and servicing of continuous flow and storage gas hot water systems for efficient hot water.",
    icon: "/icons/placeholder.svg",
    href: "/services/hot-water/gas",
    category: "Gas systems",
    lordIcon: "/icons/Burning Fuel Flame Icon.json",
    emoji: "🔥"
  },
  {
    title: "Electric Hot Water",
    description: "Professional installation and repairs for all electric hot water systems, including storage and instantaneous units.",
    icon: "/icons/placeholder.svg",
    href: "/services/hot-water/electric",
    category: "Electric systems",
    lordIcon: "/icons/Wired Flat Electric Power Hover Pinch.json",
    emoji: "⚡"
  },
  {
    title: "Heat Pump",
    description: "Energy-efficient heat pump hot water system solutions that provide significant energy savings compared to conventional systems.",
    icon: "/icons/placeholder.svg",
    href: "/services/hot-water/heat-pump",
    category: "Energy efficient",
    lordIcon: "/icons/Wired Flat Heating Radiator Icon.json",
    emoji: "♨️"
  },
  {
    title: "Solar Hot Water",
    description: "Eco-friendly solar hot water system installation and repairs to reduce your energy bills and carbon footprint.",
    icon: "/icons/placeholder.svg",
    href: "/services/hot-water/solar",
    category: "Renewable energy",
    lordIcon: "/icons/Wired Flat Sun Hover Rays.json",
    emoji: "☀️"
  },
  {
    title: "Hot Water Repairs",
    description: "Fast, reliable repairs for all hot water system types, brands, and issues to restore your hot water quickly.",
    icon: "/icons/placeholder.svg",
    href: "/services/hot-water/repairs",
    category: "Repairs",
    lordIcon: "/icons/Lordicon Toolbox Hover Pinch.json",
    emoji: "🔧"
  },
  {
    title: "Hot Water Installation",
    description: "Expert installation of new hot water systems with professional guidance on selecting the right system.",
    icon: "/icons/placeholder.svg",
    href: "/services/hot-water/installation",
    category: "Installation",
    lordIcon: "/icons/Flat 1030 Service Alt Hover Pinch.json",
    emoji: "🔧"
  },
  {
    title: "Hot Water System Replacement",
    description: "Professional removal and installation of new hot water systems with guidance on the best options for your needs.",
    icon: "/icons/placeholder.svg",
    href: "/services/hot-water/replacement",
    category: "Installation",
    lordIcon: "/icons/Flat People Exchange Arrows Icon.json",
    emoji: "🔄"
  },
  {
    title: "Buyers Guide",
    description: "Expert advice on selecting the right hot water system for your home, considering efficiency, size, and cost factors.",
    icon: "/icons/placeholder.svg",
    href: "/services/hot-water/buyers-guide",
    category: "Information",
    lordIcon: "/icons/Flat 1020 Rules Book Guideline.json",
    emoji: "📊"
  }
];

// Placeholder icon component with emoji support
function PlaceholderIcon({ size = 64, service }: { 
  size?: number;
  service: Service;
}) {
  // Use the emoji if available, otherwise use a default wrench
  const emoji = service.emoji || "🔧";
  
  return (
    <div 
      className="h-16 w-16 rounded-full bg-[#00E6CA]/10 flex items-center justify-center"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <span className="text-2xl">{emoji}</span>
    </div>
  );
}

export function HotWaterServicesGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-0"
    >
      <div className="container mx-auto px-4">
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
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 mb-3 flex-shrink-0">
                    {service.lordIcon ? (
                      <LordIcon
                        src={service.lordIcon}
                        forceTrigger={hoveredCard === service.title}
                        size={64}
                      />
                    ) : (
                      <PlaceholderIcon service={service} />
                    )}
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-400 text-sm mb-auto">{service.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 