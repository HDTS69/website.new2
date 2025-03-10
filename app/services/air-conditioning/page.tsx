'use client';

import { AirConditioningServicesGrid } from './components/AirConditioningServicesGrid';
import { ServicePageLayout } from '@/app/components/ServicePageLayout';

export default function AirConditioningServices() {
  return (
    <ServicePageLayout
      title="Air Conditioning Services"
      description="Our expert technicians provide professional installation, maintenance, and repair services for all your air conditioning needs."
    >
      <AirConditioningServicesGrid />
    </ServicePageLayout>
  );
} 