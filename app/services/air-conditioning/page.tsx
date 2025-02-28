import { LazySparklesCore } from '@/components/ui/LazySparklesCore';
import { LazyMotionDiv } from '@/components/ui/motion/LazyMotion';
import Link from "next/link";

const services = [
  {
    name: "Air Con Sizing Calculator",
    href: "/services/air-conditioning/air-con-sizing-calculator",
    description: "Calculate the perfect air conditioning size for your space",
  },
  {
    name: "Split System Installation",
    href: "/services/air-conditioning/split-system-installation",
    description: "Professional split system AC installation services",
  },
  {
    name: "AC Repairs",
    href: "/services/air-conditioning/ac-repairs",
    description: "Expert air conditioning repair and troubleshooting",
  },
  {
    name: "AC Diagnostics",
    href: "/services/air-conditioning/ac-diagnostics",
    description: "Comprehensive AC system diagnostics and testing",
  },
  {
    name: "Maintenance",
    href: "/services/air-conditioning/maintenance",
    description: "Regular maintenance and servicing for optimal performance",
  },
  {
    name: "Ducted Systems",
    href: "/services/air-conditioning/ducted-systems",
    description: "Ducted air conditioning solutions and services",
  },
  {
    name: "Emergency Services",
    href: "/services/air-conditioning/emergency-services",
    description: "24/7 emergency AC repair and support",
  },
  {
    name: "System Optimization",
    href: "/services/air-conditioning/system-optimization",
    description: "AC system performance optimization and efficiency",
  },
  {
    name: "System Upgrades",
    href: "/services/air-conditioning/system-upgrades",
    description: "Air conditioning system upgrades and modernization",
  }
];

export default function AirConditioningServices() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <LazySparklesCore
          background="transparent"
          minSize={1}
          maxSize={2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.3}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="standard-header">
            Air Conditioning Services
          </h1>
          <p className="standard-subheader">
            Complete climate control solutions for your home and business.
            Our expert technicians ensure optimal comfort year-round.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.name}
              href={service.href}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#1CD4A7]/20 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1CD4A7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">
                {service.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#1CD4A7] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </h3>
              
              <p className="text-gray-300 mb-4 relative z-10">
                {service.description}
              </p>
              
              <div className="flex items-center text-[#1CD4A7] relative z-10">
                <span className="mr-2">Learn More</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
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
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            href="#book"
            className="inline-flex items-center px-8 py-4 rounded-xl text-black font-medium bg-gradient-to-r from-[#1CD4A7] via-[#15b38d] to-[#1CD4A7] hover:shadow-lg hover:shadow-[#1CD4A7]/20 transition-all duration-300 [animation:glow_3s_ease-in-out_infinite]"
          >
            Book a Service
            <svg
              className="ml-2 w-5 h-5"
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
        </div>
      </div>
    </div>
  );
} 