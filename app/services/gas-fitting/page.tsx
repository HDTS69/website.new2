'use client';

import { GasServicesGrid } from './components/GasServicesGrid';
import { ServicePageLayout } from '@/app/components/ServicePageLayout';

export default function GasFittingServices() {
  return (
    <ServicePageLayout
      title="Gas Fitting Services"
      description="Our licensed gas fitters provide expert installation, maintenance, and repair services for all your gas fitting needs."
    >
      <GasServicesGrid />
    </ServicePageLayout>
  );
} 