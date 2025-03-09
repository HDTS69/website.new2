'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ScrollToTop = dynamic(() => import('@/components/ui/ScrollToTop').then(mod => ({ default: mod.ScrollToTop })), { ssr: false });
const Analytics = dynamic(() => import('@/components/Analytics').then(mod => ({ default: mod.Analytics })), { ssr: false });
const GoogleMapsScript = dynamic(() => import('@/components/ui/BookingForm/GoogleMapsScript').then(mod => ({ default: mod.GoogleMapsScript })), { ssr: false });

// Debugging component to check for particles
function ParticleDebugger() {
  useEffect(() => {
    console.log('Checking for particles');
    
    setTimeout(() => {
      const particles = document.getElementById('tsparticles-background');
      console.log(particles ? '✅ Particles found' : '❌ No particles found');
    }, 2000);
    
    return () => {};
  }, []);
  
  return null;
}

export function ClientComponents() {
  return (
    <>
      <ParticleDebugger />
      <ScrollToTop />
      <Analytics />
      <GoogleMapsScript />
    </>
  );
} 