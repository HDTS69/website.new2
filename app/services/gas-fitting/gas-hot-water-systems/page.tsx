'use client';

import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { ServiceSchema } from '@/components/ui/ServiceSchema';

export default function GasHotWaterSystemsPage() {
  const features = [
    {
      title: 'Gas Hot Water System Installation',
      href: '/services/gas-fitting/gas-hot-water-systems#installation'
    },
    {
      title: 'Gas Hot Water System Repairs',
      href: '/services/gas-fitting/gas-hot-water-systems#repairs'
    },
    {
      title: 'Gas Hot Water System Replacement',
      href: '/services/gas-fitting/gas-hot-water-systems#replacement'
    },
    {
      title: 'Gas Hot Water System Maintenance',
      href: '/services/gas-fitting/gas-hot-water-systems#maintenance'
    },
    {
      title: 'Continuous Flow Hot Water Systems',
      href: '/services/gas-fitting/gas-hot-water-systems#continuous-flow'
    },
    {
      title: 'Storage Tank Hot Water Systems',
      href: '/services/gas-fitting/gas-hot-water-systems#storage-tank'
    }
  ];

  const description = `Our licensed gas fitters provide professional gas hot water system services for residential and commercial properties. We install, repair, and maintain all types of gas hot water systems, ensuring reliable and efficient hot water supply. Whether you need a new gas hot water system installed, an existing system repaired, or advice on the best system for your needs, our team has the expertise to help.`;

  const contentParagraphs = [
    `Gas hot water systems are a popular choice for many households and businesses due to their efficiency and cost-effectiveness. Our team of licensed gas fitters has extensive experience in installing, repairing, and maintaining all types of gas hot water systems.`,
    `We offer a range of gas hot water system services, including installation of new systems, repairs to existing systems, regular maintenance, and emergency repairs. Our team can help you choose the right gas hot water system for your needs, whether it's a continuous flow system or a storage tank system.`,
    `Continuous flow gas hot water systems heat water on demand, providing an endless supply of hot water while saving energy. Storage tank gas hot water systems heat and store water in a tank, providing a ready supply of hot water.`,
    `All our gas hot water system services are performed by licensed gas fitters who follow strict safety protocols and comply with all relevant regulations. We ensure your gas hot water system is installed correctly, functions efficiently, and meets all safety standards.`,
    `Regular maintenance of your gas hot water system can extend its lifespan, improve its efficiency, and prevent costly repairs. Our maintenance services include checking for gas leaks, inspecting components, cleaning filters, and testing pressure relief valves.`
  ];

  return (
    <>
      <ServiceSchema 
        serviceName="Professional Gas Hot Water System Services Brisbane" 
        description="Expert gas hot water system services in Brisbane. Our licensed gas fitters provide installation, repair, and maintenance for all types of gas hot water systems, ensuring reliable and efficient hot water supply."
        serviceArea="Brisbane Gas Fitting Gas Hot Water Systems Local Business Queensland"
        phoneNumber="1300 420 911"
      />

      <ServicePageLayout
        title="Gas Hot Water Systems"
        description={description}
        features={features}
        callToAction="Book a Gas Fitter Now"
        rating="5.0/5.0"
        reviewCount="36+"
        contentHeading="Professional Gas Hot Water System Services"
        contentParagraphs={contentParagraphs}
      />
    </>
  );
} 