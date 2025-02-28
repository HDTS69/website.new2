"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceCategories = [
  {
    name: 'Plumbing',
    path: '/services/plumbing',
    services: [
      { name: 'Leaking Taps', path: '/services/plumbing/leaking-taps' },
      { name: 'Cistern Plumbing', path: '/services/plumbing/cistern-plumbing' },
      { name: 'Burst Pipes', path: '/services/plumbing/burst-pipes' },
      { name: 'Blocked Drains', path: '/services/plumbing/blocked-drains' },
      { name: 'Blocked Toilets', path: '/services/plumbing/blocked-toilets' },
      // Add more services as needed
    ],
  },
  {
    name: 'Gas Fitting',
    path: '/services/gas-fitting',
    services: [
      { name: 'Gas BBQ Installation', path: '/services/gas-fitting/gas-bbq-installation' },
      { name: 'Gas Hot Water Systems', path: '/services/gas-fitting/gas-hot-water-systems' },
      { name: 'Gas Leak Repairs', path: '/services/gas-fitting/gas-leak-repairs' },
      // Add more services as needed
    ],
  },
  {
    name: 'Hot Water Systems',
    path: '/services/hot-water-systems',
    services: [
      { name: 'Heat Pump Hot Water', path: '/services/hot-water-systems/heat-pump' },
      { name: 'Gas Hot Water Systems', path: '/services/hot-water-systems/gas' },
      { name: 'Solar Hot Water Systems', path: '/services/hot-water-systems/solar' },
      // Add more services as needed
    ],
  },
  {
    name: 'Roof Repairs',
    path: '/services/roof-repairs',
    services: [
      { name: 'Leak Investigation', path: '/services/roof-repairs/leak-investigation' },
      { name: 'Roof Report', path: '/services/roof-repairs/roof-report' },
      { name: 'Roof Tile Repair', path: '/services/roof-repairs/tile-repair' },
      // Add more services as needed
    ],
  },
  {
    name: 'Air Conditioning',
    path: '/services/air-conditioning',
    services: [
      { name: 'Split System Installation', path: '/services/air-conditioning/split-system-installation' },
      { name: 'AC Repairs', path: '/services/air-conditioning/repairs' },
      { name: 'AC Diagnostics', path: '/services/air-conditioning/diagnostics' },
      // Add more services as needed
    ],
  },
];

const otherLinks = [
  { name: 'Brands', path: '/brands' },
  { name: 'Locations', path: '/locations' },
  { name: 'About Us', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Careers', path: '/careers' },
  { name: 'Insurance', path: '/insurance' },
  { name: 'Special Offers', path: '/special-offers' },
  { name: 'Reviews', path: '/reviews' },
  { name: '24/7 Emergency', path: '/emergency' },
  { name: 'Payment Options', path: '/payment-options' },
];

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 overflow-y-auto"
        >
          <div className="min-h-screen px-6 py-20">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Services Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
              {serviceCategories.map((category) => (
                <div key={category.name} className="border-b border-gray-800">
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className="flex items-center justify-between w-full py-3 text-left text-gray-300 hover:text-white"
                  >
                    <span>{category.name}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedCategory === category.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedCategory === category.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 space-y-2">
                          {category.services.map((service) => (
                            <Link
                              key={service.name}
                              href={service.path}
                              onClick={onClose}
                              className="flex items-center pl-4 py-2 text-sm text-gray-400 hover:text-[#00E6CA]"
                            >
                              <ChevronRight className="w-4 h-4 mr-2" />
                              {service.name}
                            </Link>
                          ))}
                          <Link
                            href={category.path}
                            onClick={onClose}
                            className="flex items-center pl-4 py-2 text-sm text-[#00E6CA] hover:text-white"
                          >
                            View All {category.name} Services →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Other Links */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              {otherLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={onClose}
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Book Now Button */}
            <div className="mt-8">
              <Link
                href="/book"
                onClick={onClose}
                className="block w-full py-3 px-4 bg-gradient-to-r from-[#00E6CA] to-[#00C7AE] text-black font-semibold text-center rounded-full hover:opacity-90 transition-opacity"
              >
                Book Now
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative flex items-center h-10">
      {/* Hamburger Button */}
      <label className="relative block cursor-pointer select-none h-10 w-10 flex items-center justify-center">
        <input 
          type="checkbox" 
          className="absolute opacity-0 cursor-pointer h-0 w-0"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="relative h-5 w-7 flex flex-col justify-center">
          <span className={`absolute w-7 h-[3px] bg-[#00E6CA] transition-all duration-300 ease-in-out
            ${isOpen ? 'top-[9px] -translate-y-1/2 rotate-45' : 'top-0'}`} />
          <span className={`absolute w-7 h-[3px] bg-[#00E6CA] transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-0' : 'top-[9px] -translate-y-1/2'}`} />
          <span className={`absolute w-7 h-[3px] bg-[#00E6CA] transition-all duration-300 ease-in-out
            ${isOpen ? 'top-[9px] -translate-y-1/2 -rotate-45' : 'top-[18px]'}`} />
        </div>
      </label>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default HamburgerMenu 