'use client'

import { useEffect } from 'react';

/**
 * ServiceWorkerRegistration component
 * 
 * Registers the service worker for offline support and caching
 * Only runs on the client side and in production mode
 * Uses requestIdleCallback to avoid impacting page load performance
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register in production and if service workers are supported
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.location.hostname !== 'localhost' &&
      process.env.NODE_ENV === 'production'
    ) {
      // Use requestIdleCallback to register service worker during browser idle time
      const registerServiceWorker = () => {
        // Register the service worker
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });

        // Handle updates
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('New Service Worker activated, reloading for fresh content');
          window.location.reload();
        });
      };

      // Use requestIdleCallback if available, otherwise use setTimeout
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(registerServiceWorker, { timeout: 5000 });
      } else {
        // Fallback to setTimeout with a delay to not block main thread
        setTimeout(registerServiceWorker, 3000);
      }
    }
  }, []);

  // This component doesn't render anything
  return null;
} 