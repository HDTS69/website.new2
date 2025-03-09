'use client';

import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { ServiceSchema } from '@/components/ui/ServiceSchema';

export default function GasLeakDetectionPage() {
  const features = [
    {
      title: 'Emergency Gas Leak Detection',
      href: '/services/gas-fitting/gas-leak-detection#emergency'
    },
    {
      title: 'Gas Leak Inspection',
      href: '/services/gas-fitting/gas-leak-detection#inspection'
    },
    {
      title: 'Gas Leak Repairs',
      href: '/services/gas-fitting/gas-leak-detection#repairs'
    },
    {
      title: 'Gas Pressure Testing',
      href: '/services/gas-fitting/gas-leak-detection#pressure-testing'
    },
    {
      title: 'Gas Pipe Inspection',
      href: '/services/gas-fitting/gas-leak-detection#pipe-inspection'
    },
    {
      title: 'Gas Appliance Safety Checks',
      href: '/services/gas-fitting/gas-leak-detection#appliance-checks'
    }
  ];

  const description = `Our professional gas leak detection service uses advanced equipment to quickly locate and address gas leaks in your home or business. Gas leaks can be dangerous and require immediate attention. Our licensed gas fitters are available 24/7 for emergency gas leak detection and repairs, ensuring your property remains safe and secure.`;

  const contentParagraphs = [
    `Gas leaks pose serious safety risks including fire, explosion, and carbon monoxide poisoning. If you suspect a gas leak, it's crucial to act quickly and contact professional gas fitters to detect and repair the leak.`,
    `Our team uses specialized equipment including electronic gas detectors, ultrasonic leak detectors, and pressure testing equipment to accurately locate gas leaks, even in hard-to-reach areas.`,
    `We provide comprehensive gas leak detection services for residential and commercial properties. Our licensed gas fitters can detect leaks in gas pipes, connections, appliances, and meters.`,
    `After detecting a gas leak, we provide immediate repairs to ensure your gas system is safe and functioning properly. All repairs are performed to the highest standards and in compliance with safety regulations.`,
    `Prevention is key to gas safety. We offer regular gas system inspections to identify potential issues before they become dangerous. Our preventative maintenance services can help avoid gas leaks and ensure your gas system operates efficiently.`
  ];

  return (
    <>
      <ServiceSchema 
        serviceName="Professional Gas Leak Detection Services Brisbane" 
        description="Expert gas leak detection services in Brisbane. Our licensed gas fitters use advanced equipment to quickly locate and repair gas leaks, ensuring your property remains safe."
        serviceArea="Brisbane Gas Fitting Gas Leak Detection Local Business Queensland"
        phoneNumber="1300 420 911"
      />

      <ServicePageLayout
        title="Gas Leak Detection"
        description={description}
        features={features}
        callToAction="Book Emergency Gas Leak Detection"
        rating="5.0/5.0"
        reviewCount="36+"
        contentHeading="Professional Gas Leak Detection Services"
        contentParagraphs={contentParagraphs}
      />
    </>
  );
} 