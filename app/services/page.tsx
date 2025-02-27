'use client';

import { motion } from 'framer-motion';
import { SparklesCore } from '@/components/ui/SparklesCore';
import Link from 'next/link';
import { Wrench, Flame, Home, Wind } from 'lucide-react';

const services = [
  {
    name: 'Plumbing Services',
    description: 'Professional plumbing solutions for all your needs. From emergency repairs to complete installations, our licensed plumbers deliver reliable solutions with guaranteed workmanship.',
    icon: Wrench,
    href: '/services/plumbing',
    features: [
      'Emergency Repairs',
      'Hot Water Systems',
      'Drain Cleaning',
      'Leak Detection',
      'Bathroom Renovations',
      'Water Filters'
    ]
  },
  {
    name: 'Gas Fitting',
    description: 'Licensed gas fitters providing expert installation, maintenance, and safety services. We ensure your gas appliances are installed correctly and operating safely.',
    icon: Flame,
    href: '/services/gas-fitting',
    features: [
      'Gas Installation',
      'Safety Inspections',
      'Leak Detection',
      'Appliance Setup',
      'Compliance Certificates',
      'Emergency Repairs'
    ]
  },
  {
    name: 'Roof Repairs',
    description: 'Comprehensive roofing solutions to protect your home. Our experienced team handles everything from minor repairs to major restorations.',
    icon: Home,
    href: '/services/roof-repairs',
    features: [
      'Leak Repairs',
      'Tile Replacement',
      'Gutter Services',
      'Storm Damage',
      'Roof Inspections',
      'Preventive Maintenance'
    ]
  },
  {
    name: 'Air Conditioning',
    description: 'Complete climate control solutions for your comfort. Expert installation, maintenance, and repair services for all air conditioning systems.',
    icon: Wind,
    href: '/services/air-conditioning',
    features: [
      'System Installation',
      'Repairs & Service',
      'Ducted Systems',
      'Split Systems',
      'Commercial Solutions',
      'Regular Maintenance'
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.3}
        />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00E6CA] via-white to-[#00E6CA]">
            Our Professional Services
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            HD Trade Services offers comprehensive solutions for all your plumbing, gas fitting, roofing, and air conditioning needs. Our licensed technicians bring over 25 years of experience to every job, ensuring quality workmanship and customer satisfaction.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                variants={itemVariants}
                className="group relative"
              >
                <Link href={service.href}>
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black border border-[#00E6CA]/10 hover:border-[#00E6CA]/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#00E6CA]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#00E6CA]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00E6CA] transition-colors">
                          {service.name}
                        </h2>
                        <p className="text-gray-400 mb-6">
                          {service.description}
                        </p>
                        <ul className="grid grid-cols-2 gap-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                              <svg
                                className="w-4 h-4 text-[#00E6CA]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="#book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00E6CA] to-[#00C7AE] text-black font-semibold hover:shadow-lg hover:shadow-[#00E6CA]/20 transition-all duration-300"
          >
            Book a Service
            <svg
              className="w-5 h-5"
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
        </motion.div>
      </div>
    </div>
  );
} 