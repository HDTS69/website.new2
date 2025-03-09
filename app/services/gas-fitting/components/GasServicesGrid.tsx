'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Remove the type declaration since we're using a different approach
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'lord-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
//         src: string;
//         trigger?: string;
//         delay?: string;
//         colors?: string;
//         style?: React.CSSProperties;
//       };
//     }
//   }
// }

interface Service {
  title: string;
  description: string;
  icon: string;
  href: string;
  category: string;
  lordIcon?: string;
  emoji?: string; // Add emoji property for temporary icons
}

const serviceCategories = [
  "Emergency gas services",
  "Gas safety and compliance",
  "Gas installation services",
  "Gas appliance services",
  "Commercial gas services"
];

const services: Service[] = [
  // Services in the exact order as specified in the navigation bar
  {
    title: "Emergency Gas Repairs",
    description: "24/7 emergency gas repair service for urgent issues like gas leaks, faulty appliances, or system failures.",
    icon: "/icons/emergency-gas.svg",
    href: "/services/gas-fitting/emergency-gas-repairs",
    category: "Emergency gas services",
    lordIcon: "/icons/Siren Hover Pinch Icon.json"
  },
  {
    title: "Gas Leak Detection Service",
    description: "Advanced detection methods to locate and address gas leaks quickly, preventing dangerous situations.",
    icon: "/icons/gas-leak.svg",
    href: "/services/gas-fitting/gas-leak-detection",
    category: "Gas safety and compliance",
    lordIcon: "/icons/Man Search Avatar Icon.json"
  },
  {
    title: "Gas Line Inspections",
    description: "Comprehensive gas line inspections to identify potential issues, ensure code compliance, and maintain safety standards.",
    icon: "/icons/gas-inspection.svg",
    href: "/services/gas-fitting/gas-line-inspections",
    category: "Preventative maintenance",
    lordIcon: "/icons/Flat Magnifier Zoom Icon.json"
  },
  {
    title: "Gas Pipe Repair",
    description: "Professional repair of damaged or leaking gas pipes, ensuring safe and reliable gas delivery throughout your property.",
    icon: "/icons/gas-pipe-repair.svg",
    href: "/services/gas-fitting/gas-pipe-repair",
    category: "Gas line services",
    lordIcon: "/icons/Wired Flat 409 Tool Hover Oscillate.json"
  },
  {
    title: "Gas System Installation",
    description: "Complete gas system installation services for residential and commercial properties, ensuring safe and efficient gas delivery.",
    icon: "/icons/gas-system.svg",
    href: "/services/gas-fitting/gas-system-installation",
    category: "Gas installation services",
    lordIcon: "/icons/Lordicon Toolbox Hover Pinch.json"
  },
  {
    title: "Gas Appliance Installation & Repairs",
    description: "Professional installation and repair of all types of gas appliances, ensuring safe operation and optimal performance.",
    icon: "/icons/gas-appliance.svg",
    href: "/services/gas-fitting/gas-appliance-installation-repairs",
    category: "Gas appliance services",
    lordIcon: "/icons/Wired Flat Gas Stove Icon.json"
  },
  {
    title: "Gas Cooktop Installation",
    description: "Specialized installation of gas cooktops with precise fitting and connection to ensure optimal performance and safety.",
    icon: "/icons/gas-cooktop.svg",
    href: "/services/gas-fitting/cooktop-installation",
    category: "Gas appliance services",
    lordIcon: "/icons/Wired Flat Electric Stovetop Icon.json"
  },
  {
    title: "Gas BBQ Installation and Repair",
    description: "Professional installation and repair of gas BBQs, ensuring safe connections and optimal performance for outdoor cooking.",
    icon: "/icons/gas-bbq.svg",
    href: "/services/gas-fitting/gas-bbq-installation",
    category: "Residential gas services",
    lordIcon: "/icons/Wired Flat Backyard Hover Pinch.json"
  },
  {
    title: "Gas Hot Water System Installation and Maintenance",
    description: "Expert installation and maintenance of gas hot water systems for reliable, energy-efficient hot water supply.",
    icon: "/icons/gas-hot-water.svg",
    href: "/services/gas-fitting/gas-hot-water-systems",
    category: "Gas appliance services",
    lordIcon: "/icons/Burning Fuel Flame Icon.json"
  },
  {
    title: "Commercial Gas Appliance Installation",
    description: "Specialized installation of commercial gas appliances for restaurants, hotels, and other businesses, ensuring compliance with commercial regulations.",
    icon: "/icons/commercial-gas.svg",
    href: "/services/gas-fitting/commercial-installation",
    category: "Commercial gas services",
    lordIcon: "/icons/Wired Flat Bake Cooker Icon.json"
  },
  {
    title: "Gas Compliance Certificates",
    description: "Official certification of gas installations and appliances to ensure they meet safety standards and regulatory requirements.",
    icon: "/icons/gas-certificate.svg",
    href: "/services/gas-fitting/gas-compliance-certificates",
    category: "Gas safety and compliance",
    lordIcon: "/icons/Lordicon Privacy Policy.json"
  }
];

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
    // This will run only on the client side
    if (typeof window !== 'undefined' && iconRef.current) {
      // Create a new lord-icon element
      const lordIconElement = document.createElement('lord-icon');
      
      // Set attributes
      lordIconElement.setAttribute('src', src);
      lordIconElement.setAttribute('trigger', trigger);
      lordIconElement.setAttribute('delay', delay.toString());
      lordIconElement.style.width = `${size}px`;
      lordIconElement.style.height = `${size}px`;
      
      if (colors?.primary) {
        lordIconElement.setAttribute('colors', `primary:${colors.primary}${colors.secondary ? `,secondary:${colors.secondary}` : ''}`);
      }
      
      // Clear the container and append the lord-icon element
      if (iconRef.current.firstChild) {
        iconRef.current.innerHTML = '';
      }
      iconRef.current.appendChild(lordIconElement);
    }
  }, [src, trigger, delay, size, colors]);

  return (
    <div 
      ref={iconRef}
      className="lord-icon-container"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}

// Placeholder icon component with emoji support
function PlaceholderIcon({ size = 64, service }: { 
  size?: number;
  service: Service;
}) {
  // Use the emoji if available, otherwise use a default wrench
  const emoji = service.emoji || "🔧";
  
  // Special styling for emergency service
  const isEmergency = service.title === "Emergency Gas Repairs";
  const bgColorClass = isEmergency ? "bg-red-500/20" : "bg-[#00E6CA]/10";
  
  return (
    <div 
      className={`h-16 w-16 rounded-full ${bgColorClass} flex items-center justify-center`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <span className="text-2xl">{emoji}</span>
    </div>
  );
}

export function GasServicesGrid() {
  const [activeAnimations, setActiveAnimations] = useState<Record<string, boolean>>({});
  const animationTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  const handleMouseEnter = (title: string) => {
    if (animationTimeouts.current[title]) {
      clearTimeout(animationTimeouts.current[title]);
    }
    setActiveAnimations(prev => ({ ...prev, [title]: true }));
  };

  const handleMouseLeave = (title: string) => {
    animationTimeouts.current[title] = setTimeout(() => {
      setActiveAnimations(prev => ({ ...prev, [title]: false }));
    }, 2000); // Adjust based on animation duration
  };

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
              onMouseEnter={() => handleMouseEnter(service.title)}
              onMouseLeave={() => handleMouseLeave(service.title)}
            >
              <Link 
                href={service.href}
                className="block p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-black border border-[#00E6CA]/20 transition-all duration-300 hover:border-[#00E6CA]/40 hover:shadow-[0_0_15px_rgba(0,230,202,0.3)] h-[280px] flex flex-col"
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 mb-3 flex-shrink-0">
                    {service.lordIcon ? (
                      <LordIcon
                        src={service.lordIcon}
                        trigger={activeAnimations[service.title] ? "loop" : "hover"}
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
                    <p className="text-sm text-gray-400 line-clamp-4">{service.description}</p>
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