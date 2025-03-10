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
}

const serviceCategories = [
  "Emergency plumbing",
  "General plumbing",
  "Hot water services",
  "Bathroom plumbing",
  "Drainage solutions"
];

const services: Service[] = [
  {
    title: "Emergency Plumbing",
    description: "24/7 emergency plumbing services for urgent issues like burst pipes, severe leaks, and blocked drains.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/emergency-plumbing",
    category: "Emergency plumbing",
    lordIcon: "/icons/Siren Hover Pinch Icon.json"
  },
  {
    title: "Blocked Drains",
    description: "Professional drain unblocking using the latest equipment including CCTV cameras and high-pressure water jetters.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/blocked-drains",
    category: "Drainage solutions",
    lordIcon: "/icons/Flat Road Close Icon (1).json"
  },
  {
    title: "Blocked Toilet",
    description: "Quick and effective toilet unblocking services with guaranteed results and minimal disruption.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/blocked-toilet",
    category: "Bathroom plumbing",
    lordIcon: "/icons/Toilet Paper Icon.json"
  },
  {
    title: "CCTV Camera Inspection",
    description: "State-of-the-art CCTV drain cameras for accurate diagnosis of pipe and drain issues.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/cctv-inspection",
    category: "Drainage solutions",
    lordIcon: "/icons/Flat Camera Hover Flash.json"
  },
  {
    title: "Drain Excavation",
    description: "Professional drain excavation services when repairs require direct access to underground pipes.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/drain-excavation",
    category: "Drainage solutions",
    lordIcon: "/icons/Digger Hover Icon (1).json"
  },
  {
    title: "Hydro Jet Drain Cleaning",
    description: "High-pressure water jetting for the most stubborn blockages and thorough drain cleaning.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/hydro-jet-cleaning",
    category: "Drainage solutions",
    lordIcon: "/icons/Wired Flat Hose Icon.json"
  },
  {
    title: "Blocked Stormwater Drains",
    description: "Expert clearing of stormwater systems to prevent flooding and water damage to your property.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/blocked-stormwater",
    category: "Drainage solutions",
    lordIcon: "/icons/Heavy Rain Icon.json"
  },
  {
    title: "Sewer and Stormwater Services",
    description: "Comprehensive sewer and stormwater solutions including repairs, maintenance, and new installations.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/sewer-stormwater",
    category: "Drainage solutions",
    lordIcon: "/icons/Wired Flat Saw Pinch Icon.json"
  },
  {
    title: "Pipe Relining",
    description: "No-dig pipe repair technology that creates a new pipe within the damaged one, saving time and money.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/pipe-relining",
    category: "General plumbing",
    lordIcon: "/icons/Flat Shovel Icon.json"
  },
  {
    title: "Electric Eel Drain Clearing",
    description: "Mechanical drain cleaning for tough blockages and tree root intrusions in pipes.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/electric-eel",
    category: "Drainage solutions",
    lordIcon: "/icons/Snake Hover Crawl Icon.json"
  },
  {
    title: "Leak Detection",
    description: "Advanced leak detection technology to find hidden water leaks without damaging your property.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/leak-detection",
    category: "General plumbing",
    lordIcon: "/icons/Man Search Avatar Icon.json"
  },
  {
    title: "Leaking Taps",
    description: "Expert tap repairs and replacements to stop water waste and reduce your water bills.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/leaking-taps",
    category: "General plumbing",
    lordIcon: "/icons/Wired Flat Sink Hover Pinch.json"
  },
  {
    title: "Water Pressure Solutions",
    description: "Comprehensive water pressure testing and solutions for low or high water pressure issues.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/water-pressure",
    category: "General plumbing",
    lordIcon: "/icons/Wired Flat Shower Icon.json"
  },
  {
    title: "Hot Water Systems",
    description: "Installation, repair, and maintenance of all types of hot water systems including gas, electric, and solar.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/hot-water",
    category: "Hot water services",
    lordIcon: "/icons/Flat Thermometer Icon.json"
  },
  {
    title: "Dishwasher Installations",
    description: "Professional dishwasher installations with proper plumbing connections and leak prevention.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/dishwasher-installation",
    category: "General plumbing",
    lordIcon: "/icons/Wired Flat Dishwasher Icon (1).json"
  },
  {
    title: "Fridge Plumbing",
    description: "Expert installation of water lines for fridges with ice makers and water dispensers.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/fridge-plumbing",
    category: "General plumbing",
    lordIcon: "/icons/Flat Fridge Icon.json"
  },
  {
    title: "Pipe Installations & Repairs",
    description: "Complete pipe services including new installations, repairs, and replacements for all types of plumbing.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/pipe-installations",
    category: "General plumbing",
    lordIcon: "/icons/Wired Flat Water Pipe Icon.json"
  },
  {
    title: "Toilet Installations & Repairs",
    description: "Professional toilet installation and repair services with guaranteed workmanship.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/toilet-installations",
    category: "Bathroom plumbing",
    lordIcon: "/icons/Toilet Bowl Icon.json"
  },
  {
    title: "Bathroom Renovations",
    description: "Complete bathroom renovation services from design to final installation.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/bathroom-renovations",
    category: "Bathroom plumbing",
    lordIcon: "/icons/Toilet Room Icon.json"
  },
  {
    title: "Shower Repair and Installations",
    description: "Expert shower repairs and installations including leak fixes and complete shower replacements.",
    icon: "/icons/placeholder.svg",
    href: "/services/plumbing/shower-installations",
    category: "Bathroom plumbing",
    lordIcon: "/icons/Wired Flat Bathroom Shower Icon.json"
  }
];

export function PlumbingServicesGrid() {
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
                      <img 
                        src={service.icon} 
                        alt={service.title}
                        className="w-full h-full object-contain"
                      />
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