'use client';

import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { ServiceSchema } from '@/components/ui/ServiceSchema';

export default function HotWaterSystemPage() {
  const features = [
    'Hot Water System Installation',
    'Hot Water System Repairs',
    'Hot Water System Replacement',
    'Emergency Hot Water Services',
    'Tankless Water Heater Installation',
    'Storage Tank Installations',
    'Gas, Electric & Solar Hot Water Systems',
    'Heat Pump Hot Water Solutions'
  ];

  const benefits = [
    'Available 24/7 for Emergencies',
    'Licensed & Certified Plumbers',
    'Upfront Fixed Pricing',
    'Same Day Service Available',
    'All Work Guaranteed',
    'Energy-Efficient Solutions',
    'All Major Brands Serviced'
  ];

  const images = [
    '/images/services/plumbing/hot-water-1.jpg',
    '/images/services/plumbing/hot-water-2.jpg',
    '/images/services/plumbing/hot-water-3.jpg'
  ];

  const description = `Our professional hot water system services provide fast, reliable solutions for all your hot water needs. Whether you need a new installation, emergency repairs, or system upgrades, our licensed plumbers can help. We work with all major brands and system types including gas, electric, solar, and heat pump systems to ensure you have consistent hot water.`;

  return (
    <>
      <ServiceSchema 
        serviceName="Professional Hot Water System Services Brisbane" 
        description="Expert hot water system installation, repair and replacement services in Brisbane. Our licensed plumbers service all major brands of gas, electric, solar and heat pump systems."
        serviceArea="Brisbane, Queensland, Australia"
      />

      <ServicePageLayout
        title="Hot Water Systems"
        description={description}
        features={features}
        benefits={benefits}
        images={images}
        callToAction="Book Hot Water Service"
      />
    </>
  );
} 