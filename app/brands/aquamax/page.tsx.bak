'use client';

import { BrandPageLayout } from '@/components/layouts/BrandPageLayout';
import { Clock, Shield, Wrench } from 'lucide-react';
import { SparklesCore } from '@/components/ui/sparkles';
import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Australian Made',
    description: 'Proudly manufactured in Australia to meet local conditions and standards.',
    icon: <Shield className="w-6 h-6 text-[#00E6CA]" />,
  },
  {
    title: 'Energy Efficient',
    description: 'High energy rating systems that help reduce your power bills.',
    icon: <Wrench className="w-6 h-6 text-[#00E6CA]" />,
  },
  {
    title: 'Long Warranty',
    description: 'Up to 10-year warranty on tanks and components for peace of mind.',
    icon: <Clock className="w-6 h-6 text-[#00E6CA]" />,
  },
  {
    title: 'Expert Installation',
    description: 'Professional installation by licensed and experienced technicians.',
    icon: <Wrench className="w-6 h-6 text-[#00E6CA]" />,
  },
  {
    title: 'Same Day Service',
    description: 'Quick response for emergency repairs and replacements.',
    icon: <Clock className="w-6 h-6 text-[#00E6CA]" />,
  },
  {
    title: 'Quality Components',
    description: 'Premium materials and parts for lasting performance.',
    icon: <Shield className="w-6 h-6 text-[#00E6CA]" />,
  },
];

const testimonials = [
  {
    content: 'Exceptional service! The team was professional, punctual, and solved our hot water issues quickly.',
    author: 'John Smith',
    location: 'Brisbane',
    rating: 5,
  },
  {
    content: 'Best plumbing service I\'ve ever used. Fair pricing and excellent workmanship.',
    author: 'Sarah Johnson',
    location: 'Gold Coast',
    rating: 5,
  },
  {
    content: 'Highly recommend! They went above and beyond to help us with our emergency repair.',
    author: 'Michael Brown',
    location: 'Sunshine Coast',
    rating: 5,
  },
];

const products = [
  {
    name: 'AquaMAX Electric Hot Water Systems',
    description: 'Energy-efficient electric storage systems available in various sizes.',
    image: '/images/brands/aquamax/electric.jpg',
    bulletPoints: [
      'Available in various sizes from 25L to 400L',
      'High energy efficiency rating',
      'Smart timer controls',
      'Durable construction',
      'Easy maintenance access',
    ],
  },
  {
    name: 'AquaMAX Gas Hot Water Systems',
    description: 'Continuous flow and storage gas systems for instant hot water.',
    image: '/images/brands/aquamax/gas.jpg',
    bulletPoints: [
      'Instant hot water on demand',
      'Energy efficient operation',
      'Compact design',
      'Temperature control',
      'Low maintenance requirements',
    ],
  },
  {
    name: 'AquaMAX Heat Pump Systems',
    description: 'Environmentally friendly heat pump technology for maximum efficiency.',
    image: '/images/brands/aquamax/heat-pump.jpg',
    bulletPoints: [
      'Up to 65% energy savings',
      'Environmentally friendly',
      'Government rebate eligible',
      'Quiet operation',
      'All-weather performance',
    ],
  },
];

const financeOptions = {
  title: 'Flexible Payment Options',
  description: 'Make your AquaMAX hot water system more affordable with our range of payment plans.',
  points: [
    'Interest-free terms available',
    'Buy now, pay later options',
    'No deposit required',
    'Weekly, fortnightly, or monthly payments',
    'Quick approval process',
  ],
};

const serviceList = [
  'Electric Hot Water Systems',
  'Gas Hot Water Systems',
  'Heat Pump Systems',
  'Solar Hot Water',
  'Hot Water Repairs',
  'System Replacements',
  'Emergency Repairs',
  'Maintenance Services',
  'System Upgrades',
];

const brandPartners = [
  { name: 'Wilson', logo: '/images/brands/wilson.png' },
  { name: 'Vulcan', logo: '/images/brands/vulcan.png' },
  { name: 'Thermann', logo: '/images/brands/thermann.png' },
  { name: 'Stiebel Eltron', logo: '/images/brands/stiebel.png' },
];

const benefits = [
  {
    title: 'Same Price After Hours',
    description: 'No extra charges for after-hours service',
    icon: <Clock className="w-6 h-6 text-[#00E6CA]" />,
  },
  {
    title: '1 Hour* Emergency Service',
    description: 'Fast response when you need it most',
    icon: <Wrench className="w-6 h-6 text-[#00E6CA]" />,
  },
  {
    title: 'Finance Options** Available',
    description: 'Flexible payment plans to suit your budget',
    icon: <Shield className="w-6 h-6 text-[#00E6CA]" />,
  },
];

export default function AquamaxPage() {
  return (
    <div className="relative pt-32">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <SparklesCore
          background="transparent"
          minSize={0.8}
          maxSize={2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.3}
        />
      </div>

      {/* Brand Page Content */}
      <div className="relative z-10">
        <BrandPageLayout
          brandName="AquaMAX"
          brandLogo="/images/brands/aquamax/logo.png"
          vanImage="/images/van.png"
          expertImage="/images/expert.jpg"
          description="AquaMAX is a leading Australian manufacturer of high-quality hot water systems. With over 30 years of experience, AquaMAX delivers reliable, energy-efficient solutions for homes and businesses."
          features={features}
          serviceList={serviceList}
          products={products}
          testimonials={testimonials}
          financeOptions={financeOptions}
          brandPartners={brandPartners}
          benefits={benefits}
        />
      </div>
    </div>
  );
} 