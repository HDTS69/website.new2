'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import LordIcon from '@/app/components/LordIcon';

interface Service {
  title: string;
  description: string;
  icon: string;
  href: string;
  lordIcon?: string;
  customIcon?: string;
}

// Example services array - replace with actual services
const services: Service[] = [
  {
    title: "Service Name 1",
    description: "Detailed description of the service that explains what's included and its benefits.",
    icon: "/icons/placeholder.svg",
    href: "/services/service-category/service-1",
    lordIcon: "/icons/placeholder.json" // Add this for animated icons
  },
  {
    title: "Service Name 2",
    description: "Detailed description of the service that explains what's included and its benefits.",
    icon: "/icons/placeholder.svg",
    href: "/services/service-category/service-2",
  },
  // Add more services as needed
];

export function ServiceGridTemplate() {
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

/*
Example usage in a service page:

import { ServiceGridTemplate } from '@/components/templates/ServiceGridTemplate';

export default function ServicePage() {
  return (
    <ServicePageLayout
      title="Service Category"
      description="Service category description"
    >
      <ServiceGridTemplate />
    </ServicePageLayout>
  );
}

Service object template:
{
  title: "Service Name",
  description: "Service description",
  icon: "/icons/your-icon.svg",
  href: "/services/category/service-name",
  lordIcon: "/icons/your-lord-icon.json", // Optional: for animated icons
  customIcon: "/icons/your-custom-icon.json" // Optional: for custom JSON icons
}
*/ 