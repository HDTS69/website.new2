'use client';

import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { ServiceSchema } from '@/components/ui/ServiceSchema';

export default function BlockedDrainsPage() {
  const features = [
    'Emergency Blocked Drain Service',
    'CCTV Drain Camera Inspections',
    'High-Pressure Water Jetting',
    'Electric Eel Drain Cleaning',
    'Drain Excavation & Repair',
    'Root Removal from Drains'
  ];

  const benefits = [
    'Available 24/7 for Emergencies',
    'Licensed & Certified Plumbers',
    'Latest Drain Clearing Equipment',
    'Upfront Fixed Pricing',
    'Same Day Service Available',
    'All Work Guaranteed'
  ];

  const images = [
    '/images/services/plumbing/blocked-drains-1.jpg',
    '/images/services/plumbing/blocked-drains-2.jpg',
    '/images/services/plumbing/blocked-drains-3.jpg'
  ];

  const description = `Our professional blocked drain service provides fast, effective solutions for all types of drain blockages. Using the latest equipment including CCTV cameras and high-pressure water jetters, our licensed plumbers quickly identify and clear any blockage, restoring your drains to full working order.`;

  return (
    <>
      <ServiceSchema 
        serviceName="Professional Blocked Drain Services Brisbane" 
        description="Expert blocked drain clearing services in Brisbane. Our licensed plumbers use advanced equipment to quickly identify and clear any blockage, ensuring your drains flow freely."
        serviceArea="Brisbane, Queensland, Australia"
      />

      <ServicePageLayout
        title="Blocked Drains"
        description={description}
        features={features}
        benefits={benefits}
        images={images}
        callToAction="Book Drain Service"
      />
    </>
  );
} 