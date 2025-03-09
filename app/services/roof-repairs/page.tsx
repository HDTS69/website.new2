'use client';

import { RoofingServicesGrid } from './components/RoofingServicesGrid';
import { ServicePageLayout } from '@/app/components/ServicePageLayout';

export default function RoofingServices() {
  return (
    <ServicePageLayout
      title="Roofing Services"
      description="Expert roof repair and maintenance solutions for residential and commercial properties. Our skilled technicians ensure your roof stays in perfect condition."
    >
      <RoofingServicesGrid />
    </ServicePageLayout>
  );
} 