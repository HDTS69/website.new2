'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavBar } from '@/components/navigation/DesktopNavigation';
import { Navigation as MobileNavigation } from '@/components/mobile/MobileNavigation';
import { Building2, Home, MapPin, Wrench, Calendar, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { NavItem, BaseNavigationProps } from '@/types/navigation/types';

// Default navigation items if none are provided
const defaultNavigationItems: NavItem[] = [
  {
    name: 'Home',
    url: '/',
    icon: Home,
  },
  {
    name: 'Services',
    url: '/services',
    icon: Wrench,
    dropdownItems: [
      {
        name: 'Plumbing',
        url: '/services/plumbing',
        subItems: [
          { name: 'Leaking Taps', url: '/services/plumbing/leaking-taps' },
          { name: 'Cistern Plumbing', url: '/services/plumbing/cistern-plumbing' },
          { name: 'Burst Pipes', url: '/services/plumbing/burst-pipes' },
          { name: 'Blocked Drains', url: '/services/plumbing/blocked-drains' },
          { name: 'Blocked Toilets', url: '/services/plumbing/blocked-toilets' },
          { name: 'Water Filters', url: '/services/plumbing/water-filters' },
          { name: 'Toilet Installation', url: '/services/plumbing/toilet-installation' },
          { name: 'Bathroom Renovations', url: '/services/plumbing/bathroom-renovations' },
          { name: 'Kitchen Plumbing', url: '/services/plumbing/kitchen-plumbing' },
          { name: 'Emergency Plumbing', url: '/services/plumbing/emergency' },
        ],
      },
      {
        name: 'Gas Fitting',
        url: '/services/gas-fitting',
        subItems: [
          { name: 'Gas BBQ Installation', url: '/services/gas-fitting/gas-bbq-installation' },
          { name: 'Gas Hot Water Systems', url: '/services/gas-fitting/gas-hot-water-systems' },
          { name: 'Gas Leak Repairs', url: '/services/gas-fitting/gas-leak-repairs' },
          { name: 'Gas Cooktop Installation', url: '/services/gas-fitting/gas-cooktop-installation' },
          { name: 'Gas Heater Installation', url: '/services/gas-fitting/gas-heater-installation' },
          { name: 'Gas Safety Inspections', url: '/services/gas-fitting/gas-safety-inspections' },
          { name: 'Gas Line Installation', url: '/services/gas-fitting/gas-line-installation' },
          { name: 'Emergency Gas Services', url: '/services/gas-fitting/emergency' },
        ],
      },
      {
        name: 'Hot Water Systems',
        url: '/services/hot-water-systems',
        subItems: [
          { name: 'Heat Pump Hot Water', url: '/services/hot-water-systems/heat-pump' },
          { name: 'Gas Hot Water Systems', url: '/services/hot-water-systems/gas' },
          { name: 'Solar Hot Water Systems', url: '/services/hot-water-systems/solar' },
          { name: 'Electric Hot Water Systems', url: '/services/hot-water-systems/electric' },
          { name: 'Hot Water Repairs', url: '/services/hot-water-systems/repairs' },
          { name: 'Hot Water Installation', url: '/services/hot-water-systems/installation' },
          { name: 'Emergency Hot Water', url: '/services/hot-water-systems/emergency' },
          { name: 'System Replacement', url: '/services/hot-water-systems/replacement' },
        ],
      },
      {
        name: 'Roof Repairs',
        url: '/services/roof-repairs',
        subItems: [
          { name: 'Leak Investigation', url: '/services/roof-repairs/leak-investigation' },
          { name: 'Roof Report', url: '/services/roof-repairs/roof-report' },
          { name: 'Roof Tile Repair', url: '/services/roof-repairs/tile-repair' },
          { name: 'Metal Roof Repairs', url: '/services/roof-repairs/metal-roof-repairs' },
          { name: 'Gutter Replacement', url: '/services/roof-repairs/gutter-replacement' },
          { name: 'Downpipe Installation', url: '/services/roof-repairs/downpipe-installation' },
          { name: 'Storm Damage Repair', url: '/services/roof-repairs/storm-damage' },
          { name: 'Emergency Roof Repairs', url: '/services/roof-repairs/emergency' },
        ],
      },
      {
        name: 'Air Conditioning',
        url: '/services/air-conditioning',
        subItems: [
          { name: 'Split System Installation', url: '/services/air-conditioning/split-system-installation' },
          { name: 'AC Repairs', url: '/services/air-conditioning/repairs' },
          { name: 'AC Diagnostics', url: '/services/air-conditioning/diagnostics' },
          { name: 'AC Maintenance', url: '/services/air-conditioning/maintenance' },
          { name: 'Ducted Air Installation', url: '/services/air-conditioning/ducted-installation' },
          { name: 'Commercial AC Services', url: '/services/air-conditioning/commercial' },
          { name: 'AC Replacement', url: '/services/air-conditioning/replacement' },
          { name: 'Emergency AC Repairs', url: '/services/air-conditioning/emergency' },
        ],
      },
    ],
  },
  {
    name: 'Brands',
    url: '/brands',
    icon: Building2,
    dropdownItems: [
      { name: 'Aquamax', url: '/brands/aquamax' },
      { name: 'Bosch', url: '/brands/bosch' },
      { name: 'Chromagen', url: '/brands/chromagen' },
      { name: 'Dux', url: '/brands/dux' },
      { name: 'Everhot', url: '/brands/everhot' },
      { name: 'Rheem', url: '/brands/rheem' },
      { name: 'Rinnai', url: '/brands/rinnai' },
      { name: 'Stiebel Eltron', url: '/brands/stiebel-eltron' },
      { name: 'Saxon', url: '/brands/saxon' },
      { name: 'Thermann', url: '/brands/thermann' },
      { name: 'Vulcan', url: '/brands/vulcan' },
      { name: 'Mitsubishi', url: '/brands/mitsubishi' },
      { name: 'Caroma', url: '/brands/caroma' },
    ],
  },
  {
    name: 'Locations',
    url: '/locations',
    icon: MapPin,
    dropdownItems: [
      {
        name: 'Brisbane',
        url: '/locations/brisbane',
        subItems: [
          { name: 'Brisbane CBD', url: '/locations/brisbane/cbd' },
          { name: 'South Brisbane', url: '/locations/brisbane/south' },
          { name: 'North Brisbane', url: '/locations/brisbane/north' },
          { name: 'East Brisbane', url: '/locations/brisbane/east' },
          { name: 'West Brisbane', url: '/locations/brisbane/west' },
        ],
      },
      {
        name: 'Moreton Bay',
        url: '/locations/moreton-bay',
        subItems: [
          { name: 'North Lakes', url: '/locations/moreton-bay/north-lakes' },
          { name: 'Redcliffe', url: '/locations/moreton-bay/redcliffe' },
          { name: 'Caboolture', url: '/locations/moreton-bay/caboolture' },
          { name: 'Strathpine', url: '/locations/moreton-bay/strathpine' },
          { name: 'Deception Bay', url: '/locations/moreton-bay/deception-bay' },
        ],
      },
      {
        name: 'Ipswich',
        url: '/locations/ipswich',
        subItems: [
          { name: 'Ipswich CBD', url: '/locations/ipswich/cbd' },
          { name: 'Springfield', url: '/locations/ipswich/springfield' },
          { name: 'Goodna', url: '/locations/ipswich/goodna' },
          { name: 'Booval', url: '/locations/ipswich/booval' },
          { name: 'Ripley', url: '/locations/ipswich/ripley' },
        ],
      },
      {
        name: 'Logan',
        url: '/locations/logan',
        subItems: [
          { name: 'Logan Central', url: '/locations/logan/central' },
          { name: 'Springwood', url: '/locations/logan/springwood' },
          { name: 'Beenleigh', url: '/locations/logan/beenleigh' },
          { name: 'Shailer Park', url: '/locations/logan/shailer-park' },
          { name: 'Daisy Hill', url: '/locations/logan/daisy-hill' },
        ],
      },
    ],
  },
  {
    name: 'About Us',
    url: '/about',
    icon: Building2,
    dropdownItems: [
      {
        name: 'Our Story',
        url: '/about/our-story',
      },
      {
        name: 'Our Team',
        url: '/about/our-team',
      },
      {
        name: 'Careers',
        url: '/about/careers',
      },
      {
        name: 'Contact Us',
        url: '/about/contact',
      },
    ],
  },
  {
    name: 'Call Now',
    url: 'tel:1300420911',
    icon: Phone,
  },
  {
    name: 'Book Online',
    url: '#book',
    icon: Calendar,
    isHighlighted: true,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      const bookingForm = document.getElementById('book');
      if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
];

// Default action items if none are provided
const defaultActionItems: NavItem[] = [
  {
    name: 'Call Now',
    url: 'tel:1300420911',
    icon: Phone,
  },
  {
    name: 'Book Online',
    url: '#book',
    icon: Calendar,
    isHighlighted: true,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      const bookingForm = document.getElementById('book');
      if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
];

export function Navigation({ items = defaultNavigationItems, actionItems = defaultActionItems }: BaseNavigationProps) {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Delayed animation for the navigation to appear last in the sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Delay navigation appearance by 3 seconds to be the last element
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  // Separate navigation items from action items
  const mainNavItems = items.filter(item => 
    item.name !== 'Call Now' && item.name !== 'Book Online' && (pathname === '/' ? item.name !== 'Home' : true)
  );
  
  const actionButtons = actionItems;
  
  // For mobile, we now want to show all navigation items, same as desktop
  const mobileNavItems = items.filter(item => 
    item.name !== 'Call Now' && item.name !== 'Book Online'
  );
  
  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        className="hidden md:flex items-center justify-between py-4 px-6 bg-black/80 backdrop-blur-sm fixed bottom-0 left-0 right-0 z-40 border-t border-white/10"
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 100,
          transition: {
            type: "spring",
            stiffness: 40, // Lower stiffness for a slower, more dramatic entrance
            damping: 25,
            duration: 1.5, // Longer duration for a slower animation
            ease: [0.22, 1, 0.36, 1]
          }
        }}
      >
        <div className="flex items-center space-x-8" ref={dropdownRef}>
          {items.map((item) => (
            <div key={item.name} className="relative">
              {item.dropdownItems ? (
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className={cn(
                    "flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors",
                    activeDropdown === item.name ? "text-white" : ""
                  )}
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      "ml-1 h-4 w-4 transition-transform",
                      activeDropdown === item.name ? "rotate-180" : ""
                    )}
                  />
                </button>
              ) : (
                <Link
                  href={item.url}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              )}

              <AnimatePresence>
                {item.dropdownItems && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full mb-2 left-0 w-48 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl p-2 z-50"
                  >
                    <div className="grid gap-1">
                      {item.dropdownItems.map((child) => (
                        <Link
                          key={child.name}
                          href={child.url}
                          className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {actionItems.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              onClick={item.onClick}
              className={cn(
                "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                item.isHighlighted ? "bg-white text-black" : ""
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.nav>
      
      {/* Mobile Navigation */}
      <motion.div 
        className="md:hidden"
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 100,
          transition: {
            type: "spring",
            stiffness: 40, // Lower stiffness for a slower, more dramatic entrance
            damping: 25,
            duration: 1.5, // Longer duration for a slower animation
            ease: [0.22, 1, 0.36, 1]
          }
        }}
      >
        <MobileNavigation items={mobileNavItems} actionItems={actionButtons} />
      </motion.div>
    </>
  );
} 