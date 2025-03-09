'use client';

import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { ServiceSchema } from '@/components/ui/ServiceSchema';

export default function GasBBQInstallationPage() {
  const features = [
    {
      title: 'Built-in BBQ Installation',
      href: '/services/gas-fitting/gas-bbq-installation#built-in'
    },
    {
      title: 'Portable BBQ Setup',
      href: '/services/gas-fitting/gas-bbq-installation#portable'
    },
    {
      title: 'Outdoor Kitchen Gas Lines',
      href: '/services/gas-fitting/gas-bbq-installation#outdoor-kitchen'
    },
    {
      title: 'BBQ Gas Conversion',
      href: '/services/gas-fitting/gas-bbq-installation#conversion'
    },
    {
      title: 'BBQ Gas Repairs',
      href: '/services/gas-fitting/gas-bbq-installation#repairs'
    },
    {
      title: 'Gas Bayonet Installation',
      href: '/services/gas-fitting/gas-bbq-installation#bayonet'
    }
  ];

  const description = `Our licensed gas fitters provide professional gas BBQ installation services for residential and commercial properties. We ensure safe and efficient gas connections for all types of BBQs and outdoor cooking equipment. Whether you need a built-in BBQ installed, a portable BBQ connected, or gas lines extended to your outdoor kitchen, our team has the expertise to handle all your gas BBQ installation needs.`;

  const contentParagraphs = [
    `Gas BBQ installation requires specialized knowledge and skills to ensure safety and compliance with regulations. Our team of licensed gas fitters has extensive experience in installing, connecting, and maintaining gas BBQs and outdoor cooking equipment.`,
    `We use high-quality materials and follow strict safety protocols to ensure your gas BBQ is installed correctly and functions safely. All our installations include thorough testing and inspection to verify there are no leaks or other issues.`,
    `Our gas BBQ installation services cover built-in BBQs, portable BBQs, outdoor kitchens, and more. We can install gas bayonets, run new gas lines, and convert BBQs from one gas type to another.`,
    `Safety is our top priority. We ensure all gas BBQ installations meet or exceed local building codes and safety standards. Our licensed gas fitters are fully trained and qualified to handle all aspects of gas BBQ installation and maintenance.`
  ];

  return (
    <>
      <ServiceSchema 
        serviceName="Professional Gas BBQ Installation Services Brisbane" 
        description="Expert gas BBQ installation services in Brisbane. Our licensed gas fitters provide safe and reliable gas BBQ installation, connection, and maintenance for residential and commercial properties."
        serviceArea="Brisbane Gas Fitting Gas BBQ Installation Local Business Queensland"
        phoneNumber="1300 420 911"
      />

      <ServicePageLayout
        title="Gas BBQ Installation"
        description={description}
        features={features}
        callToAction="Book a Gas Fitter Now"
        rating="5.0/5.0"
        reviewCount="36+"
        contentHeading="Professional Gas BBQ Installation Services"
        contentParagraphs={contentParagraphs}
      />
    </>
  );
} 