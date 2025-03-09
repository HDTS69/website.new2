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
  colors?: { primary?: string; secondary?: string };
  delay?: number;
  size?: number;
}

function LordIcon({ src, trigger = "hover", delay = 0, size = 64, colors }: LordIconProps) {
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
  }, [src, trigger, delay, size, colors]);

  return <div ref={iconRef} className="w-full h-full" />;
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
                    colors={{
                      primary: "#00E6CA",
                      secondary: "#00E6CA",
                    }}
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
  lordIcon: "/icons/your-lord-icon.json" // Optional: for animated icons
}
*/ 