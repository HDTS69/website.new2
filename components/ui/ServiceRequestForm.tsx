'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message: string;
  preferredTime: string;
  acceptTerms: boolean;
  stayUpdated: boolean;
}

export function ServiceRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    message: '',
    preferredTime: '',
    acceptTerms: false,
    stayUpdated: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.acceptTerms) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate form submission
    try {
      // In a real application, you would send the data to your backend here
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const services = [
    { value: '', label: 'Select a service' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'gas-fitting', label: 'Gas Fitting' },
    { value: 'roof-repairs', label: 'Roof Repairs' },
    { value: 'air-conditioning', label: 'Air Conditioning' }
  ];
  
  const timeSlots = [
    { value: '', label: 'Select preferred time' },
    { value: 'morning', label: 'Morning (8am - 12pm)' },
    { value: 'afternoon', label: 'Afternoon (12pm - 5pm)' },
    { value: 'evening', label: 'Evening (After 5pm)' },
    { value: 'weekend', label: 'Weekend' }
  ];
  
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-900/50 to-black border border-[#00E6CA]/20 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-[#00E6CA]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-[#00E6CA]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Request Submitted!</h3>
        <p className="text-gray-300 mb-6">
          Thank you for your service request. Our team will contact you shortly to confirm your appointment.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-3 bg-[#00E6CA]/10 text-[#00E6CA] rounded-full hover:bg-[#00E6CA]/20 transition-colors"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/50 to-black border border-[#00E6CA]/20 rounded-2xl p-8"
    >
      <h3 className="text-2xl font-bold text-white mb-6">Request a Service</h3>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
              Full Name <span className="text-[#00E6CA]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E6CA] transition-colors"
              placeholder="Your full name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">
              Email Address <span className="text-[#00E6CA]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E6CA] transition-colors"
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-gray-300 mb-2 text-sm">
              Phone Number <span className="text-[#00E6CA]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E6CA] transition-colors"
              placeholder="Your phone number"
              required
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block text-gray-300 mb-2 text-sm">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E6CA] transition-colors"
              placeholder="Your address"
            />
          </div>
          
          <div>
            <label htmlFor="service" className="block text-gray-300 mb-2 text-sm">
              Service Required <span className="text-[#00E6CA]">*</span>
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E6CA] transition-colors"
              required
            >
              {services.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="preferredTime" className="block text-gray-300 mb-2 text-sm">
              Preferred Time
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E6CA] transition-colors"
            >
              {timeSlots.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E6CA] transition-colors"
            placeholder="Please describe your issue or service needs"
          ></textarea>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleCheckboxChange}
              className="mt-1 mr-3"
              required
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-300">
              I accept the <Link href="/terms" className="text-[#00E6CA] hover:underline">Terms and Conditions</Link> <span className="text-[#00E6CA]">*</span>
            </label>
          </div>
          
          <div className="flex items-start">
            <input
              type="checkbox"
              id="stayUpdated"
              name="stayUpdated"
              checked={formData.stayUpdated}
              onChange={handleCheckboxChange}
              className="mt-1 mr-3"
            />
            <label htmlFor="stayUpdated" className="text-sm text-gray-300">
              I would like to receive updates about special offers and promotions
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#00E6CA] to-[#00C7AE] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00E6CA]/20 transition-all duration-300 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Book Appointment'
          )}
        </button>
      </form>
    </motion.div>
  );
} 