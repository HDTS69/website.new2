'use client';

import { HotWaterServicesGrid } from './components/HotWaterServicesGrid';
import { ServicePageLayout } from '@/app/components/ServicePageLayout';

export default function HotWaterServices() {
  return (
    <ServicePageLayout
      title="Hot Water Services"
      description="Our expert plumbers provide professional installation, repair, and replacement services for all types of hot water systems including gas, electric, solar, and heat pump options."
    >
      <HotWaterServicesGrid />
    </ServicePageLayout>
  );
} 