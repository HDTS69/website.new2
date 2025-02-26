import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Plumbing Services | Your Local Plumber',
  description: 'Expert plumbing services for all your residential and commercial needs. Available 24/7 for emergency plumbing repairs.',
};

const features = [
  'Emergency Plumbing Services',
  'Leak Detection & Repair',
  'Blocked Drains & Toilets',
  'Hot Water Systems',
  'Pipe Repairs & Replacement',
  'Bathroom Renovations',
  'Gas Fitting & Installation',
  'Water Pressure Issues',
  'Tap & Toilet Repairs',
  'CCTV Drain Inspection',
];

const benefits = [
  'Available 24/7 for Emergency Services',
  'Licensed & Fully Insured Plumbers',
  'Same Day Service Available',
  'Upfront Fixed Pricing',
  'Lifetime Workmanship Guarantee',
  'Clean & Professional Service',
];

const images = [
  '/images/services/plumbing/plumbing-1.jpg',
  '/images/services/plumbing/plumbing-2.jpg',
  '/images/services/plumbing/plumbing-3.jpg',
];

export default function PlumbingPage() {
  return (
    <ServicePageLayout
      title="Professional Plumbing Services"
      description="Our expert plumbers are available 24/7 to handle all your plumbing needs, from emergency repairs to complete bathroom renovations. With years of experience and a commitment to quality, we ensure your plumbing issues are resolved quickly and efficiently."
      features={features}
      benefits={benefits}
      images={images}
    />
  );
} 