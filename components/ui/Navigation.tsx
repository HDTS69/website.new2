'use client';

import React from 'react';
import { NavBar } from '@/components/navigation/DesktopNavigation';
import { Navigation as MobileNavigation } from '@/components/navigation/MobileNavigation';
import { Building2, Home, MapPin, Wrench, Calendar, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const navigationItems = [
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
    url: 'tel:1300000000',
    icon: Phone,
  },
  {
    name: 'Book Online',
    url: '#booking-form',
    icon: Calendar,
    isHighlighted: true,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      const bookingForm = document.getElementById('booking-form');
      if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
];

export function Navigation() {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Separate navigation items from action items
  const mainNavItems = navigationItems.filter(item => 
    item.name !== 'Call Now' && item.name !== 'Book Online' && (pathname === '/' ? item.name !== 'Home' : true)
  );
  
  const actionButtons = navigationItems.filter(item => 
    item.name === 'Call Now' || item.name === 'Book Online'
  );
  
  // For mobile, we want to show a simplified set of navigation items
  const mobileNavItems = isMobile ? 
    navigationItems.filter(item => 
      item.name !== 'Home' && 
      item.name !== 'About Us' && 
      item.name !== 'Brands'
    ) : 
    mainNavItems;
  
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <NavBar items={mainNavItems} actionItems={actionButtons} />
      </div>
      
      {/* Mobile Navigation */}
      <div className="block md:hidden">
        <MobileNavigation items={mobileNavItems} actionItems={actionButtons} />
      </div>
    </>
  );
} 