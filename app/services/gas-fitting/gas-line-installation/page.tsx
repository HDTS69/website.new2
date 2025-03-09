'use client';

import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { ServiceSchema } from '@/components/ui/ServiceSchema';

export default function GasLineInstallationPage() {
  const features = [
    {
      title: 'Residential Gas Line Installation',
      href: '/services/gas-fitting/gas-line-installation#residential'
    },
    {
      title: 'Commercial Gas Line Installation',
      href: '/services/gas-fitting/gas-line-installation#commercial'
    },
    {
      title: 'Gas Line Repairs',
      href: '/services/gas-fitting/gas-line-installation#repairs'
    },
    {
      title: 'Gas Line Relocation',
      href: '/services/gas-fitting/gas-line-installation#relocation'
    },
    {
      title: 'Gas Line Extensions',
      href: '/services/gas-fitting/gas-line-installation#extensions'
    },
    {
      title: 'Gas Line Pressure Testing',
      href: '/services/gas-fitting/gas-line-installation#pressure-testing'
    }
  ];

  const description = `Our licensed gas fitters provide professional gas line installation services for residential and commercial properties. We ensure safe and efficient gas delivery with proper connections, testing, and compliance with all safety regulations. Whether you need a new gas line installed, an existing line repaired, or a gas line relocated, our team has the expertise to handle all your gas fitting needs.`;

  const contentParagraphs = [
    `Gas line installation requires specialized knowledge and skills to ensure safety and compliance with regulations. Our team of licensed gas fitters has extensive experience in installing, repairing, and maintaining gas lines for various applications.`,
    `We use high-quality materials and follow strict safety protocols to ensure your gas lines are installed correctly and function safely. All our installations include thorough testing and inspection to verify there are no leaks or other issues.`,
    `Our gas line installation services cover residential homes, commercial buildings, and industrial facilities. We can install gas lines for stoves, ovens, heaters, fireplaces, outdoor grills, pool heaters, and more.`,
    `Safety is our top priority. We ensure all gas line installations meet or exceed local building codes and safety standards. Our licensed gas fitters are fully trained and qualified to handle all aspects of gas line installation and maintenance.`
  ];

  return (
    <>
      <ServiceSchema 
        serviceName="Professional Gas Line Installation Services Brisbane" 
        description="Expert gas line installation services in Brisbane. Our licensed gas fitters provide safe and reliable gas line installation, repair, and maintenance for residential and commercial properties."
        serviceArea="Brisbane Gas Fitting Gas Line Installation Local Business Queensland"
        phoneNumber="1300 420 911"
      />

      <ServicePageLayout
        title="Gas Line Installation"
        description={description}
        features={features}
        callToAction="Book a Gas Fitter Now"
        rating="5.0/5.0"
        reviewCount="36+"
        contentHeading="Professional Gas Line Installation Services"
        contentParagraphs={contentParagraphs}
      />
    </>
  );
} 