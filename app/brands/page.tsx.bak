'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SparklesCore } from '@/components/ui/sparkles';

const brands = [
  {
    name: 'Aquamax',
    logo: '/images/brands/aquamax.png',
    path: '/brands/aquamax',
    description: 'Leading manufacturer of hot water systems',
  },
  {
    name: 'Bosch',
    logo: '/images/brands/bosch.png',
    path: '/brands/bosch',
    description: 'Premium appliances and hot water systems',
  },
  {
    name: 'Chromagen',
    logo: '/images/brands/chromagen.png',
    path: '/brands/chromagen',
    description: 'Solar hot water specialists',
  },
  {
    name: 'Dux',
    logo: '/images/brands/dux.png',
    path: '/brands/dux',
    description: 'Australian hot water experts',
  },
  {
    name: 'Everhot',
    logo: '/images/brands/everhot.png',
    path: '/brands/everhot',
    description: 'Quality hot water solutions',
  },
  {
    name: 'Rheem',
    logo: '/images/brands/rheem.png',
    path: '/brands/rheem',
    description: "Australia's favorite hot water brand",
  },
  {
    name: 'Rinnai',
    logo: '/images/brands/rinnai.png',
    path: '/brands/rinnai',
    description: 'Innovative heating solutions',
  },
  {
    name: 'Stiebel Eltron',
    logo: '/images/brands/stiebel.png',
    path: '/brands/stiebel-eltron',
    description: 'German engineered water heating',
  },
  {
    name: 'Saxon',
    logo: '/images/brands/saxon.png',
    path: '/brands/saxon',
    description: 'Reliable plumbing products',
  },
  {
    name: 'Thermann',
    logo: '/images/brands/thermann.png',
    path: '/brands/thermann',
    description: 'Advanced water heating technology',
  },
  {
    name: 'Vulcan',
    logo: '/images/brands/vulcan.png',
    path: '/brands/vulcan',
    description: 'Trusted plumbing solutions',
  },
  {
    name: 'Mitsubishi',
    logo: '/images/brands/mitsubishi.png',
    path: '/brands/mitsubishi',
    description: 'Leading air conditioning systems',
  },
  {
    name: 'Caroma',
    logo: '/images/brands/caroma.png',
    path: '/brands/caroma',
    description: 'Premium bathroom fixtures',
  },
];

export default function BrandsPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
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

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1CD4A7] via-white to-[#1CD4A7]">
            Trusted Brands We Work With
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            We partner with industry-leading manufacturers to ensure you receive the highest quality products and solutions for your home or business.
          </p>
        </motion.div>

        {/* Brands Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={brand.path}
                className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#1CD4A7]/20 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1CD4A7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="h-24 mb-4 relative">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {brand.name}
                  </h3>
                  
                  <p className="text-gray-300 mb-4">
                    {brand.description}
                  </p>
                  
                  <div className="flex items-center text-[#1CD4A7]">
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
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 