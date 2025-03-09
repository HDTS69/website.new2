'use client';

import { PlumbingServicesGrid } from './components/PlumbingServicesGrid';
import { ServicePageLayout } from '@/app/components/ServicePageLayout';

export default function PlumbingServices() {
  return (
    <ServicePageLayout
      title="Plumbing Services"
      description="Our team of licensed plumbers provide professional installation, maintenance, and repair services for all your plumbing needs."
    >
      <PlumbingServicesGrid />
    </ServicePageLayout>
  );
} 