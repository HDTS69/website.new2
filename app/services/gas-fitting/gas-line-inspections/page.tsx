'use client';

import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { ServiceSchema } from '@/components/ui/ServiceSchema';

export default function GasLineInspectionsPage() {
  const features = [
    'Comprehensive Gas Line Inspections',
    'Pressure Testing',
    'Leak Detection',
    'Gas Pipe Condition Assessment',
    'Safety Compliance Checks',
    'Written Inspection Reports'
  ];

  const benefits = [
    'Licensed & Certified Gas Fitters',
    'State-of-the-Art Inspection Equipment',
    'Detailed Written Reports',
    'Preventative Maintenance Recommendations',
    'Peace of Mind for Property Owners',
    'Full Compliance with Safety Standards'
  ];

  const images = [
    '/images/services/gas-fitting/gas-line-inspection-1.jpg',
    '/images/services/gas-fitting/gas-line-inspection-2.jpg',
    '/images/services/gas-fitting/gas-line-inspection-3.jpg'
  ];

  const description = `Our professional gas line inspection service ensures your gas system is safe, efficient, and compliant with all regulations. Our licensed gas fitters conduct thorough inspections of your gas lines, connections, and appliances, identifying potential issues before they become dangerous or costly problems.`;

  return (
    <>
      <ServiceSchema 
        serviceName="Professional Gas Line Inspection Services Brisbane" 
        description="Comprehensive gas line inspection services in Brisbane. Our licensed gas fitters thoroughly inspect your gas system for safety, efficiency, and compliance with regulations."
        serviceArea="Brisbane, Queensland, Australia"
      />

      <ServicePageLayout
        title="Gas Line Inspections"
        description={description}
        features={features}
        benefits={benefits}
        images={images}
        callToAction="Book Gas Line Inspection"
      />
    </>
  );
} 