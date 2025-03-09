'use client';

import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { ServiceSchema } from '@/components/ui/ServiceSchema';

export default function EmergencyGasRepairsPage() {
  const features = [
    '24/7 Emergency Response',
    'Gas Leak Repairs',
    'Gas Line Repairs',
    'Gas Appliance Emergency Repairs',
    'Gas System Safety Inspections',
    'Commercial Gas Emergency Service'
  ];

  const benefits = [
    'Licensed & Certified Gas Fitters',
    'Fast Response Times',
    'State-of-the-Art Detection Equipment',
    'Transparent Pricing',
    'Satisfaction Guaranteed',
    '24/7 Availability'
  ];

  const images = [
    '/images/services/gas-fitting/emergency-repairs-1.jpg',
    '/images/services/gas-fitting/emergency-repairs-2.jpg',
    '/images/services/gas-fitting/emergency-repairs-3.jpg'
  ];

  const description = `Our 24/7 emergency gas repair service provides immediate assistance for gas leaks, gas line damages, and other gas-related emergencies. Our licensed gas fitters arrive quickly with specialized equipment to secure your property and make necessary repairs, ensuring the safety of your home or business.`;

  return (
    <>
      <ServiceSchema 
        serviceName="24/7 Emergency Gas Repair Services Brisbane" 
        description="Immediate emergency gas repair services in Brisbane. Our licensed gas fitters respond 24/7 to gas leaks and emergency situations to keep your property safe."
        serviceArea="Brisbane, Queensland, Australia"
      />

      <ServicePageLayout
        title="Emergency Gas Repairs"
        description={description}
        features={features}
        benefits={benefits}
        images={images}
        callToAction="Book Emergency Gas Service"
      />
    </>
  );
} 