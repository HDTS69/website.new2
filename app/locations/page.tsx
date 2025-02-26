'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SparklesCore } from '@/components/ui/sparkles';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

const locations = [
  {
    name: 'Brisbane',
    path: '/locations/brisbane',
    suburbs: ['Brisbane CBD', 'South Brisbane', 'West End', 'Fortitude Valley', 'New Farm'],
    description: 'Servicing all Brisbane metropolitan areas with 24/7 emergency support.',
  },
  {
    name: 'Moreton Bay',
    path: '/locations/moreton-bay',
    suburbs: ['North Lakes', 'Redcliffe', 'Caboolture', 'Strathpine', 'Deception Bay'],
    description: 'Complete plumbing solutions for the Moreton Bay region.',
  },
  {
    name: 'Ipswich',
    path: '/locations/ipswich',
    suburbs: ['Ipswich CBD', 'Springfield', 'Goodna', 'Booval', 'Ripley'],
    description: 'Trusted local plumbers serving the Ipswich community.',
  },
  {
    name: 'Logan',
    path: '/locations/logan',
    suburbs: ['Logan Central', 'Springwood', 'Beenleigh', 'Shailer Park', 'Daisy Hill'],
    description: 'Expert plumbing services throughout Logan City.',
  },
];

const specialtyLocations = [
  {
    name: 'Plumber Near Me',
    path: '/locations/plumber-near-me',
    description: 'Find your closest local plumber for immediate assistance.',
  },
  {
    name: 'Gas Fitter Near Me',
    path: '/locations/gas-fitter-near-me',
    description: 'Licensed gas fitters in your area for all gas fitting needs.',
  },
  {
    name: 'Aircon Near Me',
    path: '/locations/aircon-near-me',
    description: 'Local air conditioning specialists for installation and repairs.',
  },
  {
    name: 'Roofer Near Me',
    path: '/locations/roofer-near-me',
    description: 'Expert roof repairs and maintenance in your local area.',
  },
];

export default function LocationsPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.2}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1CD4A7] via-white to-[#1CD4A7]">
            Service Locations
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            We provide comprehensive plumbing, gas fitting, air conditioning, and roofing services across South East Queensland. Find your local service area below.
          </p>
        </motion.div>

        {/* Main Service Areas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={location.path}
                className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#1CD4A7]/20 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1CD4A7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {location.name}
                  </h3>
                  
                  <p className="text-gray-300 mb-4">
                    {location.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-[#1CD4A7] mb-2">Popular Suburbs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {location.suburbs.map((suburb) => (
                        <span
                          key={suburb}
                          className="text-sm text-gray-400 bg-gray-800/50 px-2 py-1 rounded"
                        >
                          {suburb}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-[#1CD4A7]">
                    <span className="mr-2">View Service Area</span>
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
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Specialty Service Areas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Find Services Near You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialtyLocations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <Link
                  href={location.path}
                  className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#1CD4A7]/20 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1CD4A7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {location.name}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4">
                      {location.description}
                    </p>
                    
                    <div className="flex items-center text-[#1CD4A7]">
                      <span className="mr-2">Find Now</span>
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
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-gray-300 mb-8">
            Our team is available 24/7 for emergency services across all locations.
          </p>
          <div className="flex justify-center gap-4">
            <AnimatedButton href="tel:1300000000" variant="secondary">
              Call Now
            </AnimatedButton>
            <AnimatedButton href="#book" variant="primary">
              Book Online
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 