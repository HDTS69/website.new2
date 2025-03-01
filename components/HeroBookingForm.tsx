'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { WaveInput } from './ui/BookingForm/WaveInput';
import { Dropdown } from './ui/BookingForm/Dropdown';
import { DatePicker } from './ui/DatePicker';
import { AddressInput } from './ui/BookingForm/AddressInput';
import { SERVICE_CATEGORIES, PREFERRED_TIMES, URGENCY_OPTIONS } from './ui/BookingForm/constants';
import type { Service, ServiceCategory } from './ui/BookingForm/types';

export function HeroBookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    manualEntry: false,
    services: [] as Service[],
    preferredTime: '',
    urgency: '',
    preferredDate: '',
    preferredDateType: null as "specific" | "range" | null,
    preferredDateRange: null as string | null,
    message: '',
    files: [] as File[],
    newsletter: false,
    termsAccepted: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showUrgency, setShowUrgency] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showThankYou, setShowThankYou] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  const servicesRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const urgencyRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      
      if (name.startsWith('services.')) {
        const service = name.split('.')[1] as Service;
        setFormData(prev => ({
          ...prev,
          services: checked 
            ? [...prev.services, service]
            : prev.services.filter(s => s !== service)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validate form fields
  const validateField = (name: string, value: string): boolean => {
    if (!value.trim()) {
      setErrors(prev => ({
        ...prev,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      }));
      return false;
    }
    
    if (name === 'email' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      setErrors(prev => ({
        ...prev,
        [name]: 'Please enter a valid email address'
      }));
      return false;
    }
    
    if (name === 'phone' && !/^(?:\+61|0)[2-478](?:[ -]?\d{4}[ -]?\d{4}|\d{8})$/.test(value)) {
      setErrors(prev => ({
        ...prev,
        [name]: 'Please enter a valid Australian phone number'
      }));
      return false;
    }
    
    return true;
  };
  
  // Validate the entire form
  const validateForm = (): boolean => {
    const requiredFields = ['name', 'phone', 'email', 'address'];
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!validateField(field, formData[field as keyof typeof formData] as string)) {
        isValid = false;
      }
    });
    
    if (formData.services.length === 0) {
      setErrors(prev => ({
        ...prev,
        services: 'Please select at least one service'
      }));
      isValid = false;
    }
    
    if (!formData.termsAccepted) {
      setErrors(prev => ({
        ...prev,
        termsAccepted: 'You must accept the terms and conditions'
      }));
      isValid = false;
    }
    
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    
    if (!validateForm() || isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setShowThankYou(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        manualEntry: false,
        services: [],
        preferredTime: '',
        urgency: '',
        preferredDate: '',
        preferredDateType: null,
        preferredDateRange: null,
        message: '',
        files: [],
        newsletter: false,
        termsAccepted: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Close dropdowns when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      
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
  
  // Thank-you screen
  if (showThankYou) {
    return (
      <div id="book" className="w-full bg-black/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-xl">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-semibold text-white">Thank You!</h3>
          <p className="text-gray-300">
            We've received your booking request and will contact you shortly.
          </p>
          <button
            onClick={() => setShowThankYou(false)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all duration-300",
              "bg-[#00E6CA] hover:bg-[#00E6CA]/90 text-white",
              "shadow-lg hover:shadow-xl hover:shadow-[#00E6CA]/20"
            )}
          >
            Book Another Service
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div id="book" className="w-full bg-black/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-xl">
      <h3 className="text-2xl font-semibold text-white mb-4 text-center">Book Your Service</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        
        <div className="relative">
          <AddressInput
            value={formData.address}
            onChange={handleChange}
            onBlur={(e) => validateField('address', e.target.value)}
            onFocus={() => setShowManualEntry(true)}
            error={errors.address}
            manualEntry={formData.manualEntry}
            onManualEntryChange={handleChange}
            showManualEntry={showManualEntry}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="relative" ref={servicesRef}>
              <Dropdown
                value={
                  formData.services.length > 0 
                    ? `${formData.services.length} service${formData.services.length > 1 ? 's' : ''} selected`
                    : 'Services Required'
                }
                placeholder="Services Required"
                isOpen={showServices}
                onToggle={() => setShowServices(!showServices)}
              />
              
              <AnimatePresence>
                {showServices && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute z-50 w-full mt-1 rounded-md border border-gray-700 bg-[#0C0C0C]/95 py-1 shadow-lg backdrop-blur-sm dropdown-content max-h-48 overflow-y-auto"
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
              </AnimatePresence>
              {errors.services && hasAttemptedSubmit && (
                <div className="text-red-500 text-xs mt-1">{errors.services}</div>
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
        
        {/* Updated WaveInput for Message */}
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

          {/* File-upload button in top-right corner of WaveInput */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="
              absolute 
              top-2 
              right-2 
              text-gray-300 
              hover:text-teal-500 
              transition-colors 
              p-2
            "
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
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586
                   a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
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
        
        <div className="space-y-4 mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="accent-[#00E6CA] rounded border-gray-700 cursor-pointer"
            />
            <span className="text-gray-300 text-sm">Keep me updated with news and special offers</span>
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
              <span className="text-gray-300 text-sm">
                I accept the{' '}
                <Link href="/terms" className="text-teal-500 hover:underline">
                  terms and conditions
                </Link>
              </span>
            </label>
            {errors.termsAccepted && hasAttemptedSubmit && (
              <div className="text-red-500 text-xs mt-1">{errors.termsAccepted}</div>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300",
            "bg-[#00E6CA] hover:bg-[#00E6CA]/90 text-white",
            "shadow-lg hover:shadow-xl hover:shadow-[#00E6CA]/20",
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
        >
          {isSubmitting ? "Submitting..." : "Book Now"}
        </button>
        
        {submitStatus === 'error' && (
          <div className="text-red-400 text-center mt-2 text-sm">
            There was an error submitting your booking. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}
