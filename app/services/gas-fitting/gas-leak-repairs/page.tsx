'use client';

import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { ServiceSchema } from '@/components/ui/ServiceSchema';

export default function GasLeakRepairsPage() {
  const features = [
    {
      title: 'Emergency Gas Leak Repairs',
      href: '/services/gas-fitting/gas-leak-repairs#emergency'
    },
    {
      title: 'Gas Pipe Repairs',
      href: '/services/gas-fitting/gas-leak-repairs#pipe-repairs'
    },
    {
      title: 'Gas Fitting Repairs',
      href: '/services/gas-fitting/gas-leak-repairs#fitting-repairs'
    },
    {
      title: 'Gas Valve Repairs',
      href: '/services/gas-fitting/gas-leak-repairs#valve-repairs'
    },
    {
      title: 'Gas Appliance Connection Repairs',
      href: '/services/gas-fitting/gas-leak-repairs#connection-repairs'
    },
    {
      title: 'Post-Repair Safety Testing',
      href: '/services/gas-fitting/gas-leak-repairs#safety-testing'
    }
  ];

  const description = `Our licensed gas fitters provide professional gas leak repair services for residential and commercial properties. Gas leaks can be dangerous and require immediate attention. We quickly identify and repair gas leaks in pipes, fittings, valves, and appliance connections, ensuring your property remains safe and secure.`;

  const contentParagraphs = [
    `Gas leaks pose serious safety risks including fire, explosion, and carbon monoxide poisoning. Our emergency gas leak repair service is available 24/7 to address these potentially dangerous situations quickly and effectively.`,
    `Our team of licensed gas fitters has extensive experience in repairing all types of gas leaks, from minor fitting issues to major pipe ruptures. We use specialized equipment to accurately locate leaks and advanced techniques to repair them safely.`,
    `Common causes of gas leaks include corroded pipes, loose connections, faulty valves, and damaged appliance fittings. Our comprehensive repair service addresses all these issues, ensuring your gas system is safe and functioning properly.`,
    `After completing repairs, we conduct thorough safety testing to verify there are no remaining leaks or other issues. This includes pressure testing, leak detection, and appliance connection checks.`,
    `Prevention is key to gas safety. In addition to repairs, we offer advice on maintaining your gas system and recognizing the signs of potential gas leaks, such as the smell of gas, hissing sounds, or dead vegetation near gas lines.`
  ];

  return (
    <>
      <ServiceSchema 
        serviceName="Professional Gas Leak Repair Services Brisbane" 
        description="Expert gas leak repair services in Brisbane. Our licensed gas fitters quickly identify and repair gas leaks in pipes, fittings, valves, and appliance connections, ensuring your property remains safe."
        serviceArea="Brisbane Gas Fitting Gas Leak Repairs Local Business Queensland"
        phoneNumber="1300 420 911"
      />

      <ServicePageLayout
        title="Gas Leak Repairs"
        description={description}
        features={features}
        callToAction="Book Emergency Gas Leak Repairs"
        rating="5.0/5.0"
        reviewCount="36+"
        contentHeading="Professional Gas Leak Repair Services"
        contentParagraphs={contentParagraphs}
      />
    </>
  );
} 