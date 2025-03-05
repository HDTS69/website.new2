'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

// Define the Google Maps API key
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

interface GoogleMapsScriptProps {
  onLoadSuccess?: () => void;
  onLoadError?: () => void;
}

export function GoogleMapsScript({ onLoadSuccess, onLoadError }: GoogleMapsScriptProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  
  // Check if we're in the browser
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  // Define the global callback function before loading the script
  useEffect(() => {
    // Skip if not in browser
    if (!isBrowser) return;
    
    // Define the global callback function that will be called by the Google Maps API
    window.initGooglePlacesAutocomplete = function() {
      console.log('Google Maps API loaded, waiting for autocomplete initialization');
      setScriptLoaded(true);
      onLoadSuccess?.();
    };
    
    // Check if the script is already loaded
    const isScriptLoaded = document.getElementById('google-maps-api');
    if (isScriptLoaded && window.google && window.google.maps && window.google.maps.places) {
      console.log('Google Maps API already loaded, initializing autocomplete');
      window.initGooglePlacesAutocomplete();
      setScriptLoaded(true);
      onLoadSuccess?.();
    }
    
    // Set up a timeout to check if the script loaded successfully
    const timeoutId = setTimeout(() => {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error('Google Maps API failed to load within timeout period');
        setScriptError(true);
        onLoadError?.();
      }
    }, 5000); // 5 second timeout
    
    return () => {
      clearTimeout(timeoutId);
      // Cleanup function to prevent memory leaks
      window.initGooglePlacesAutocomplete = () => {
        console.log('Callback called after component unmounted');
      };
    };
  }, [isBrowser, onLoadSuccess, onLoadError]);

  // Don't render anything on the server
  if (!isBrowser) return null;

  return (
    <Script
      id="google-maps-api"
      src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGooglePlacesAutocomplete`}
      strategy="afterInteractive"
      onLoad={() => {
        console.log('Google Maps API script loaded successfully');
        setScriptLoaded(true);
        onLoadSuccess?.();
      }}
      onError={() => {
        console.error('Error loading Google Maps API script');
        setScriptError(true);
        onLoadError?.();
      }}
    />
  );
} 