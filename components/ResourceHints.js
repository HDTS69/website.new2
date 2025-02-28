'use client'

import React from 'react';

/**
 * ResourceHints component adds preconnect and dns-prefetch hints
 * to improve performance by establishing early connections to
 * important third-party domains that are actually used.
 */
export default function ResourceHints() {
  // List of domains to preconnect to - only include domains that are actually used
  const preconnectDomains = [
    // Empty array - no preconnect domains needed based on Debug Bear test results
  ];

  // List of domains to dns-prefetch - only include domains that are actually used
  const dnsPrefetchDomains = [
    // Keep only the domains that are actually used for analytics
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ];

  return (
    <>
      {/* Preconnect hints - establish early connections */}
      {preconnectDomains.length > 0 && preconnectDomains.map((domain) => (
        <link 
          key={`preconnect-${domain}`}
          rel="preconnect" 
          href={domain} 
          crossOrigin="anonymous" 
        />
      ))}

      {/* DNS prefetch hints - resolve DNS early */}
      {dnsPrefetchDomains.map((domain) => (
        <link 
          key={`dns-prefetch-${domain}`}
          rel="dns-prefetch" 
          href={domain} 
        />
      ))}
    </>
  );
} 