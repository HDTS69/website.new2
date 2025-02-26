import { SparklesCore } from "@/components/ui/SparklesCore";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    name: "Leak Investigation",
    href: "/services/roof-repairs/leak-investigation",
    description: "Professional roof leak detection and investigation services",
  },
  {
    name: "Roof Reports",
    href: "/services/roof-repairs/roof-report",
    description: "Comprehensive roof condition assessment and reporting",
  },
  {
    name: "Gutter & Downpipes",
    href: "/services/roof-repairs/gutter-downpipes",
    description: "Expert gutter and downpipe installation and repairs",
  },
  {
    name: "Roof Tile Repair",
    href: "/services/roof-repairs/roof-tile-repair",
    description: "Professional roof tile repair and replacement services",
  },
  {
    name: "Leak Detection",
    href: "/services/roof-repairs/leak-detection",
    description: "Advanced leak detection technology and solutions",
  },
  {
    name: "Roof Maintenance",
    href: "/services/roof-repairs/roof-maintenance",
    description: "Regular roof maintenance and preventative care",
  },
  {
    name: "Metal Roofing",
    href: "/services/roof-repairs/metal-roofing",
    description: "Expert metal roofing installation and repairs",
  },
  {
    name: "Roof Ventilation",
    href: "/services/roof-repairs/roof-ventilation",
    description: "Professional roof ventilation solutions",
  },
  {
    name: "Gutter Guard",
    href: "/services/roof-repairs/gutter-guard",
    description: "Gutter guard installation and maintenance",
  },
  {
    name: "Roof Sizing Calculator",
    href: "/services/roof-repairs/roof-sizing-calculator",
    description: "Accurate roof measurements and cost estimation",
  }
];

export default function RoofRepairServices() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <SparklesCore
          background="transparent"
          minSize={1}
          maxSize={2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.4}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="standard-header">
            Roof Repair Services
          </h1>
          <p className="standard-subheader">
            Expert roof repair and maintenance solutions for residential and commercial properties.
            Our skilled technicians ensure your roof stays in perfect condition.
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