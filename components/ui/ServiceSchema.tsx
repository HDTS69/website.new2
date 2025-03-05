'use client';

import React from 'react';
import Script from 'next/script';

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  imageUrl?: string;
  serviceArea?: string;
  priceRange?: string;
}

export function ServiceSchema({
  serviceName,
  description,
  imageUrl = 'https://hdtradeservices.com.au/images/logo.png',
  serviceArea = 'Sydney, Australia',
  priceRange = '$$$'
}: ServiceSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'HD Trade Services',
      image: imageUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sydney',
        addressRegion: 'NSW',
        addressCountry: 'AU'
      },
      priceRange: priceRange,
      telephone: '+61-1300-123-456',
      areaServed: serviceArea
    },
    serviceType: serviceName
  };

  return (
    <Script id={`schema-${serviceName.replace(/\s+/g, '-').toLowerCase()}`} type="application/ld+json">
      {JSON.stringify(schemaData)}
    </Script>
  );
} 