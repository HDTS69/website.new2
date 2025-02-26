'use client';

import { BookingForm } from '@/components/ui/BookingForm';
import { FAQ } from '@/components/ui/FAQ';
import { useState, useEffect, useCallback } from 'react';

export default function BookingPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  
  // Handle state change from BookingForm
  const handleStateChange = useCallback((newShowThankYou: boolean) => {
    console.log('BookingPage: handleStateChange called with', newShowThankYou);
    setShowThankYou(newShowThankYou);
  }, []);
  
  // Add a debug log to track state changes
  useEffect(() => {
    console.log('BookingPage state updated:', { showThankYou });
  }, [showThankYou]);

  return (
    <main className="flex-1 bg-black pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Only render one of these sections based on the state */}
        {showThankYou ? (
          /* This empty div ensures the thank you message from BookingForm is displayed without the header */
          <div></div>
        ) : (
          /* Only show the header when not showing the thank you message */
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your Service
            </h1>
            <p className="text-lg text-gray-300">
              Fill out the form below to schedule your service. We'll get back to you promptly to confirm your appointment.
            </p>
          </div>
        )}
        
        <BookingForm onStateChange={handleStateChange} />
        
        <div className="mt-16">
          <FAQ />
        </div>
      </div>
    </main>
  );
} 