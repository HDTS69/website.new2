'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

interface Service {
  title: string;
  description: string;
  icon: string;
  href: string;
  lordIcon?: string;
}

interface LordIconProps {
  src: string;
  trigger?: "hover" | "click" | "loop" | "loop-on-hover" | "morph" | "boomerang";
  target?: string;
  colors?: { primary?: string; secondary?: string };
  delay?: number;
  size?: number;
}

function LordIcon({ src, trigger = "hover", target, delay = 0, size = 64, colors }: LordIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !iconRef.current) return;

    const loadLordIcon = async () => {
      try {
        if (!customElements.get('lord-icon')) {
          const module = await import('lord-icon-element') as any;
          if (module.defineElement) {
            module.defineElement();
          }
        }

        if (!iconRef.current) return;

        const lordIconElement = document.createElement('lord-icon');
        
        lordIconElement.setAttribute('src', src);
        lordIconElement.setAttribute('trigger', trigger);
        if (target) {
          lordIconElement.setAttribute('target', target);
        }
        lordIconElement.setAttribute('delay', delay.toString());
        lordIconElement.style.width = `${size}px`;
        lordIconElement.style.height = `${size}px`;
        
        if (colors?.primary) {
          lordIconElement.setAttribute('colors', `primary:${colors.primary}${colors.secondary ? `,secondary:${colors.secondary}` : ''}`);
        }
        
        iconRef.current.innerHTML = '';
        
        iconRef.current.appendChild(lordIconElement);
      } catch (error) {
        console.error('Error loading lord-icon:', error);
      }
    };

    loadLordIcon();

    return () => {
      if (iconRef.current) {
        iconRef.current.innerHTML = '';
      }
    };
  }, [src, trigger, target, delay, size, colors]);

  return <div ref={iconRef} className="w-full h-full" />;
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            href={service.href}
            className="group block h-full p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-[#00E6CA]/20 hover:border-[#00E6CA]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#00E6CA]/20"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 w-16 h-16 relative">
                {service.lordIcon ? (
                  <LordIcon
                    src={service.lordIcon}
                    trigger="hover"
                    target=".group"
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