'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { WaveInput } from './WaveInput';

// Define the Google Maps API key
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// Define the Google Autocomplete interface
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (input: HTMLInputElement, options?: any) => any;
        };
        event: {
          addListener: (instance: any, eventName: string, callback: Function) => void;
          removeListener: (listener: any) => void;
        };
      };
    };
    initGooglePlacesAutocomplete: () => void;
  }
}

interface AddressInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  error?: string;
  manualEntry: boolean;
  onManualEntryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showManualEntry: boolean;
}

export function AddressInput({
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  manualEntry,
  onManualEntryChange,
  showManualEntry,
}: AddressInputProps) {
  const addressRef = useRef<HTMLInputElement>(null);
  const manualEntryRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);
  const autocompleteRef = useRef<any>(null);
  const autocompleteListenerRef = useRef<any>(null);

  // Initialize Google Places Autocomplete
  const initializeAutocomplete = () => {
    if (!addressRef.current || manualEntry || !window.google || !window.google.maps || !window.google.maps.places) {
      return;
    }

    try {
      // Create the autocomplete instance
      autocompleteRef.current = new window.google.maps.places.Autocomplete(addressRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'au' }, // Restrict to Australia
        fields: ['address_components', 'formatted_address'],
      });

      // Add listener for place selection
      autocompleteListenerRef.current = window.google.maps.event.addListener(
        autocompleteRef.current,
        'place_changed',
        () => {
          const place = autocompleteRef.current.getPlace();
          if (place && place.formatted_address) {
            // Create a synthetic event to update the form
            const event = {
              target: {
                name: 'address',
                value: place.formatted_address
              }
            } as React.ChangeEvent<HTMLInputElement>;
            
            onChange(event);
            
            // Trigger validation
            const blurEvent = {
              target: {
                value: place.formatted_address
              }
            } as React.FocusEvent<HTMLInputElement>;
            
            onBlur(blurEvent);
          }
        }
      );

      setInitialized(true);
    } catch (error) {
      console.error('Error initializing Google Places Autocomplete:', error);
    }
  };

  // Cleanup function
  const cleanup = () => {
    if (autocompleteListenerRef.current && window.google && window.google.maps && window.google.maps.event) {
      window.google.maps.event.removeListener(autocompleteListenerRef.current);
      autocompleteRef.current = null;
      setInitialized(false);
    }
  };

  // Initialize Google Places Autocomplete when the component mounts
  useEffect(() => {
    // Define the global callback function for the Google Maps API
    window.initGooglePlacesAutocomplete = () => {
      if (!manualEntry) {
        initializeAutocomplete();
      }
    };

    // If Google Maps API is already loaded, initialize autocomplete
    if (window.google && window.google.maps && window.google.maps.places && !initialized && !manualEntry) {
      initializeAutocomplete();
    }

    return cleanup;
  }, []);

  // Re-initialize autocomplete when manual entry changes
  useEffect(() => {
    if (manualEntry) {
      cleanup();
    } else if (window.google && window.google.maps && window.google.maps.places && !initialized) {
      initializeAutocomplete();
    }
  }, [manualEntry]);

  return (
    <>
      {/* Load Google Maps API */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGooglePlacesAutocomplete`}
        strategy="lazyOnload"
      />

      {/* Custom styles for Google Places Autocomplete */}
      <style jsx global>{`
        .pac-container {
          background-color: #0C0C0C;
          border: 1px solid #333;
          border-radius: 0.375rem;
          margin-top: 4px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          z-index: 9999;
          font-family: inherit;
        }
        .pac-item {
          padding: 8px 12px;
          color: #e5e5e5;
          cursor: pointer;
          font-size: 0.875rem;
          border-top: 1px solid #333;
        }
        .pac-item:first-child {
          border-top: none;
        }
        .pac-item:hover, .pac-item-selected {
          background-color: #1a1a1a;
        }
        .pac-icon {
          display: none;
        }
        .pac-item-query {
          color: #00E6CA;
          font-size: 0.875rem;
        }
        .pac-matched {
          color: #00E6CA;
          font-weight: bold;
        }
        .pac-logo:after {
          display: none;
        }
      `}</style>

      <div className="relative">
        <WaveInput
          required
          type="text"
          id="address"
          name="address"
          ref={addressRef}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          label="Address"
          error={error}
          autoComplete={manualEntry ? "on" : "off"}
        />
        {showManualEntry && (
          <motion.div 
            ref={manualEntryRef}
            data-manual-entry
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 pt-2 pb-2"
          >
            <label className="flex items-center space-x-2 text-sm whitespace-nowrap cursor-pointer">
              <input
                type="checkbox"
                name="manualEntry"
                checked={manualEntry}
                onChange={onManualEntryChange}
                className="accent-[#00E6CA] rounded border-gray-700 cursor-pointer"
              />
              <span className="text-teal-500 transition-colors duration-200">Manual Entry</span>
            </label>
          </motion.div>
        )}
      </div>
    </>
  );
} 