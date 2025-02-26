import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leaking Tap Repair Services | Expert Plumbers',
  description: 'Professional leaking tap repair services. Fast, reliable solutions for all types of tap repairs and replacements.',
};

const features = [
  'Same Day Tap Repair Service',
  'All Types of Taps Repaired',
  'Tap Replacement Services',
  'Washer Replacements',
  'Ceramic Disc Cartridge Repairs',
  'Mixer Tap Repairs',
  'Kitchen Tap Repairs',
  'Bathroom Tap Repairs',
  'Outdoor Tap Repairs',
  'Water Pressure Adjustment',
];

const benefits = [
  'Fixed Price Quotes',
  'All Work Guaranteed',
  'Licensed & Insured Plumbers',
  'Same Day Service Available',
  'Quality Parts & Materials',
  'Clean & Professional Service',
];

const images = [
  '/images/services/plumbing/leaking-taps/repair-1.jpg',
  '/images/services/plumbing/leaking-taps/repair-2.jpg',
  '/images/services/plumbing/leaking-taps/repair-3.jpg',
];

export default function LeakingTapsPage() {
  return (
    <ServicePageLayout
      title="Leaking Tap Repair Services"
      description="Don't let a leaking tap waste water and money. Our expert plumbers provide fast, reliable repairs for all types of taps. We use quality parts and offer same-day service to fix your leaking taps quickly and effectively."
      features={features}
      benefits={benefits}
      images={images}
    />
  );
} 