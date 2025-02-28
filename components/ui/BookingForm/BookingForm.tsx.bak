'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

import { WaveInput } from './WaveInput';
import { Dropdown } from './Dropdown';
import { DatePicker } from '../DatePicker';
import { useFormState } from './useFormState';
import { useFormValidation } from './useFormValidation';
import { useFormSubmission } from './useFormSubmission';
import { SERVICE_CATEGORIES, PREFERRED_TIMES, URGENCY_OPTIONS } from './constants';
import type { BookingFormProps, Service, ServiceCategory } from './types';

// Google Maps Places Autocomplete
declare global {
  interface Window {
    initAutocomplete: () => void;
    google: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            options?: google.maps.places.AutocompleteOptions
          ) => google.maps.places.Autocomplete;
        };
        event: {
          clearInstanceListeners: (instance: any) => void;
        };
      };
    };
  }
}

// Define Google Maps types
namespace google.maps.places {
  export interface Autocomplete {
    addListener: (event: string, callback: () => void) => void;
    getPlace: () => {
      formatted_address?: string;
      address_components?: any[];
      geometry?: any;
    };
  }
  
  export interface AutocompleteOptions {
    componentRestrictions?: { country: string };
    fields?: string[];
    types?: string[];
  }
}

export function BookingForm({ brandName, onStateChange }: BookingFormProps) {
  const {
    formData,
    setFormData,
    isSubmitting,
    setIsSubmitting,
    submitStatus,
    setSubmitStatus,
    showThankYou,
    setShowThankYou,
    hasAttemptedSubmit,
    setHasAttemptedSubmit,
    handleChange,
    resetForm,
  } = useFormState();

  const { errors, validateField, validateForm } = useFormValidation(hasAttemptedSubmit);
  const { submitForm } = useFormSubmission({
    formData,
    setIsSubmitting,
    setSubmitStatus,
    setShowThankYou,
    resetForm,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const manualEntryRef = useRef<HTMLDivElement>(null);
  const [showManualEntry, setShowManualEntry] = React.useState(false);
  const [showServices, setShowServices] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);
  const [showUrgency, setShowUrgency] = React.useState(false);
  const [showDate, setShowDate] = React.useState(false);
  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({});
  const [autocomplete, setAutocomplete] = React.useState<google.maps.places.Autocomplete | null>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const urgencyRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Initialize Google Maps Places Autocomplete
  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;
    let isScriptLoaded = false;
    
    // Check if script is already loaded
    isScriptLoaded = typeof window.google !== 'undefined' && 
                     typeof window.google.maps !== 'undefined' && 
                     typeof window.google.maps.places !== 'undefined';

    // Add the styles for Google Places autocomplete once
    const addAutocompleteStyles = () => {
      if (!document.getElementById('pac-styles')) {
        const style = document.createElement('style');
        style.id = 'pac-styles';
        style.textContent = `
          .pac-container {
            border: 1px solid #374151;
            background-color: #0C0C0C;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border-radius: 0.375rem;
            z-index: 1000;
            margin-top: 4px;
          }
          .pac-item {
            padding: 8px 12px;
            color: #D1D5DB;
            background-color: #0C0C0C;
            border-top: 1px solid #374151;
            font-family: inherit;
            font-size: 0.875rem;
            cursor: pointer;
          }
          .pac-item:hover {
            background-color: #1F2937;
          }
          .pac-item-query {
            color: #F9FAFB;
            font-size: 0.875rem;
          }
          .pac-matched {
            color: #00E6CA;
          }
          .pac-icon {
            display: none;
          }
          /* Style the Google attribution to match our theme but keep logo visible */
          .pac-logo:after {
            background-color: #0C0C0C !important;
            color: #6B7280 !important;
            font-size: 0.7rem !important;
            padding: 4px 8px !important;
            height: 18px !important;
            line-height: 18px !important;
            margin: 0 !important;
            border-top: 1px solid #374151 !important;
            background-position: right center !important;
            background-size: 50px !important;
          }
        `;
        document.head.appendChild(style);
      }
    };

    // Add styles immediately
    addAutocompleteStyles();

    // Load Google Maps API script
    const loadGoogleMapsScript = () => {
      const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!googleMapsApiKey) {
        console.error('Google Maps API key is missing');
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
      if (existingScript) {
        return;
      }

      scriptElement = document.createElement('script');
      scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&callback=initAutocomplete&loading=async`;
      scriptElement.async = true;
      scriptElement.defer = true;
      document.head.appendChild(scriptElement);
    };

    // Initialize autocomplete
    window.initAutocomplete = () => {
      if (!addressRef.current || formData.manualEntry) return;

      // Check if autocomplete is already initialized on this input
      if (addressRef.current.getAttribute('data-autocomplete-initialized') === 'true') {
        return;
      }

      const options = {
        componentRestrictions: { country: 'au' }, // Restrict to Australia
        fields: ['address_components', 'formatted_address', 'geometry'],
        types: ['address'],
      };

      try {
        const autocompleteInstance = new window.google.maps.places.Autocomplete(
          addressRef.current,
          options
        );

        // Mark input as initialized
        addressRef.current.setAttribute('data-autocomplete-initialized', 'true');

        // Handle place selection
        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace();
          if (place.formatted_address) {
            setFormData((prev) => ({
              ...prev,
              address: place.formatted_address || ''
            }));
          }
        });

        setAutocomplete(autocompleteInstance);
      } catch (error) {
        console.error('Error initializing Google Maps Autocomplete:', error);
      }
    };

    // Initialize or load script based on conditions
    if (!formData.manualEntry) {
      if (isScriptLoaded) {
        // If script is already loaded, initialize autocomplete directly
        window.initAutocomplete();
      } else {
        // Load the script
        loadGoogleMapsScript();
      }
    }

    // Cleanup
    return () => {
      if (autocomplete) {
        // Clean up listeners if needed
        if (window.google && window.google.maps && window.google.maps.event) {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        }
      }
      
      // We don't remove the script or styles as they might be used by other components
    };
  }, [formData.manualEntry]); // Only re-run when manual entry changes

  // Handle manual entry checkbox change - simplified to avoid unnecessary re-renders
  useEffect(() => {
    if (formData.manualEntry && addressRef.current) {
      // When manual entry is enabled, remove the initialized flag
      addressRef.current.removeAttribute('data-autocomplete-initialized');
      
      if (autocomplete && window.google && window.google.maps && window.google.maps.event) {
        // Clean up the existing autocomplete
        window.google.maps.event.clearInstanceListeners(autocomplete);
        setAutocomplete(null);
      }
      
      // Remove the pac-container if it exists
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer && pacContainer.parentNode) {
        pacContainer.parentNode.removeChild(pacContainer);
      }
    }
  }, [formData.manualEntry, autocomplete]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      
      // Don't hide manual entry if clicking the address field or manual entry section
      if (!addressRef.current?.contains(target) && !manualEntryRef.current?.contains(target)) {
        setShowManualEntry(false);
      }

      // Handle other dropdowns
      if (servicesRef.current && !servicesRef.current.contains(target)) {
        setShowServices(false);
      }
      if (timeRef.current && !timeRef.current.contains(target)) {
        setShowTime(false);
      }
      if (urgencyRef.current && !urgencyRef.current.contains(target)) {
        setShowUrgency(false);
      }
      if (dateRef.current && !dateRef.current.contains(target)) {
        setShowDate(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    // Call the onStateChange callback when showThankYou changes
    if (onStateChange) {
      console.log('BookingForm: calling onStateChange with', showThankYou);
      onStateChange(showThankYou);
    }
  }, [showThankYou, onStateChange]);

  // Reset the form when the component unmounts
  React.useEffect(() => {
    return () => {
      if (showThankYou) {
        // Don't reset if we're showing the thank you message
        return;
      }
      resetForm();
    };
  }, [resetForm, showThankYou]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    
    if (!validateForm(formData) || isSubmitting) {
      return;
    }
    
    await submitForm();
  };

  // Modify the address input field to handle the manual entry toggle
  const handleAddressFocus = () => {
    if (!formData.manualEntry) {
      setShowManualEntry(true);
    }
  };

  const handleManualEntryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    
    // Update the form data
    handleChange(e);
    
    // If switching to manual entry, clear any existing autocomplete
    if (isChecked && addressRef.current) {
      // Remove the initialized flag
      addressRef.current.removeAttribute('data-autocomplete-initialized');
      
      if (autocomplete && window.google && window.google.maps && window.google.maps.event) {
        // Clean up the existing autocomplete
        window.google.maps.event.clearInstanceListeners(autocomplete);
        setAutocomplete(null);
      }
      
      // Remove the pac-container if it exists
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer && pacContainer.parentNode) {
        pacContainer.parentNode.removeChild(pacContainer);
      }
    } else if (!isChecked && addressRef.current && window.google && window.google.maps) {
      // Re-initialize autocomplete when switching back
      window.initAutocomplete();
    }
  };

  if (showThankYou) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center space-y-6 py-12">
        <h2 className="text-3xl font-semibold text-white mb-4">Thank You for Your Booking Request!</h2>
        <p className="text-gray-300 text-lg mb-8">
          We've received your request and will contact you shortly to confirm your appointment.
        </p>
        <button
          onClick={() => {
            setShowThankYou(false);
            resetForm();
          }}
          className={cn(
            "px-6 py-3 rounded-lg font-semibold transition-all duration-300",
            "bg-[#00E6CA] hover:bg-[#00E6CA]/90 text-white",
            "shadow-lg hover:shadow-xl hover:shadow-[#00E6CA]/20"
          )}
        >
          Return to Booking Form
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <WaveInput
              required
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={(e) => validateField('name', e.target.value)}
              label="Name"
              error={errors.name}
            />

            <WaveInput
              required
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={(e) => validateField('phone', e.target.value)}
              label="Phone"
              error={errors.phone}
              pattern="^(?:\+61|0)[2-478](?:[ -]?\d{4}[ -]?\d{4}|\d{8})$"
            />
          </div>
          <div className="space-y-6">
            <WaveInput
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={(e) => validateField('email', e.target.value)}
              label="Email"
              error={errors.email}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />

            <div className="relative">
              <WaveInput
                required
                type="text"
                id="address"
                name="address"
                ref={addressRef}
                value={formData.address}
                onChange={handleChange}
                onBlur={(e) => validateField('address', e.target.value)}
                onFocus={handleAddressFocus}
                label="Address"
                error={errors.address}
                autoComplete={formData.manualEntry ? "on" : "off"}
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
                      checked={formData.manualEntry}
                      onChange={handleManualEntryChange}
                      className="accent-[#00E6CA] rounded border-gray-700 cursor-pointer"
                    />
                    <span className="text-teal-500 transition-colors duration-200">Manual Entry</span>
                  </label>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="relative" ref={servicesRef}>
              <Dropdown
                value={formData.services.length > 0 
                  ? `${formData.services.length} service${formData.services.length > 1 ? 's' : ''} selected`
                  : 'Services Required'}
                placeholder="Services Required"
                isOpen={showServices}
                onToggle={() => setShowServices(!showServices)}
              />
              
              {showServices && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute z-50 w-full mt-1 rounded-md border border-gray-700 bg-[#0C0C0C]/95 py-1 shadow-lg backdrop-blur-sm dropdown-content"
                >
                  {Object.entries(SERVICE_CATEGORIES).map(([category, services]) => (
                    <div key={category} className="border-b border-gray-700/50 last:border-0">
                      <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-800/50 cursor-pointer">
                        <label className="flex items-center w-full text-sm font-medium text-gray-200 cursor-pointer">
                          <input
                            type="checkbox"
                            name={`services.${category}`}
                            checked={formData.services.includes(category as Service)}
                            onChange={handleChange}
                            className="accent-[#00E6CA] mr-2 rounded border-gray-700 cursor-pointer"
                          />
                          {category}
                        </label>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleCategory(category);
                          }}
                          className="text-gray-400 hover:text-white p-1 focus:outline-none"
                          aria-label={expandedCategories[category] ? "Collapse" : "Expand"}
                        >
                          <svg 
                            className={`w-4 h-4 transition-transform duration-200 ${expandedCategories[category] ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M19 9l-7 7-7-7" 
                            />
                          </svg>
                        </button>
                      </div>
                      
                      {expandedCategories[category] && (
                        <div className="pl-4 pb-1 pt-1 bg-gray-900/30">
                          {services.map((service) => (
                            <label
                              key={service}
                              className="flex items-center px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800/50 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                name={`services.${service}`}
                                checked={formData.services.includes(service as Service)}
                                onChange={handleChange}
                                className="accent-[#00E6CA] mr-2 rounded border-gray-700 cursor-pointer"
                              />
                              {service}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
          <div>
            <div className="relative" ref={timeRef}>
              <Dropdown
                value={formData.preferredTime}
                placeholder="Preferred Time"
                isOpen={showTime}
                onToggle={() => setShowTime(!showTime)}
              />
              
              {showTime && (
                <div className="absolute z-50 w-full mt-1 rounded-md border border-gray-700 bg-gray-900/95 py-1 shadow-lg dropdown-content dropdown-backdrop">
                  {PREFERRED_TIMES.map((time) => (
                    <label
                      key={time}
                      className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="preferredTime"
                        value={time}
                        checked={formData.preferredTime === time}
                        onChange={handleChange}
                        className="accent-[#00E6CA] mr-2 rounded-full border-gray-700"
                      />
                      {time}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div>
            <div className="relative" ref={urgencyRef}>
              <Dropdown
                value={formData.urgency}
                placeholder="How Urgent Is This?"
                isOpen={showUrgency}
                onToggle={() => setShowUrgency(!showUrgency)}
              />
              
              {showUrgency && (
                <div className="absolute z-50 w-full mt-1 rounded-md border border-gray-700 bg-gray-900/95 py-1 shadow-lg dropdown-content dropdown-backdrop">
                  {URGENCY_OPTIONS.map((urgency) => (
                    <label
                      key={urgency}
                      className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={urgency}
                        checked={formData.urgency === urgency}
                        onChange={handleChange}
                        className="accent-[#00E6CA] mr-2 rounded-full border-gray-700"
                      />
                      {urgency}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="relative" ref={dateRef}>
              <DatePicker
                name="preferredDate"
                value={formData.preferredDate}
                isOpen={showDate}
                onToggle={() => setShowDate(!showDate)}
                onDateSelect={(value) => {
                  setFormData(prev => ({
                    ...prev,
                    preferredDateType: 'specific',
                    preferredDateRange: null,
                    preferredDate: value
                  }));
                }}
                min={new Date().toISOString().split('T')[0]}
                placeholder="Preferred Date"
              />
            </div>
          </div>
        </div>

        <div className="relative mt-3">
          <WaveInput
            required
            id="message"
            name="message"
            value={formData.message}
            onChange={(e) => {
              handleChange(e);
              e.target.style.height = 'inherit';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            label="Message"
            isTextArea
          />
          
          <div className="absolute right-0 top-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-300 hover:text-teal-500 transition-colors"
              aria-label="Upload files"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" 
                />
              </svg>
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setFormData(prev => ({
                ...prev,
                files: Array.from(e.target.files || [])
              }));
            }
          }}
          className="hidden"
        />
        {formData.files.length > 0 && (
          <div className="mt-2 text-sm text-gray-300">
            {formData.files.length} file(s) selected
          </div>
        )}

        <div className="space-y-4 mt-8">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="accent-[#00E6CA] rounded border-gray-700 cursor-pointer"
            />
            <span className="text-gray-300">Keep me updated with news and special offers</span>
          </label>

          <div className="relative">
            <label className="flex items-center space-x-2">
              <input
                id="terms"
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className={cn(
                  "accent-[#00E6CA] rounded border-gray-700 cursor-pointer",
                  !formData.termsAccepted && hasAttemptedSubmit && "ring-2 ring-red-500/50"
                )}
                required
              />
              <span className="text-gray-300">
                I have read and accept the <Link href="/terms" className="text-teal-500 hover:underline">terms and conditions</Link>
              </span>
            </label>
            {!formData.termsAccepted && hasAttemptedSubmit && (
              <div className="validation-message text-red-500 text-xs absolute -bottom-5 left-0">
                Please accept the terms and conditions to proceed
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300",
              "bg-[#00E6CA] hover:bg-[#00E6CA]/90 text-white",
              "shadow-lg hover:shadow-xl hover:shadow-[#00E6CA]/20",
              isSubmitting && "opacity-50 cursor-not-allowed"
            )}
          >
            {isSubmitting ? "Submitting..." : "Submit Booking Request"}
          </button>
        </div>

        {submitStatus === 'error' && (
          <div className="text-red-400 text-center mt-4">
            There was an error submitting your booking. Please try again or call us directly.
          </div>
        )}
      </form>
    </div>
  );
} 