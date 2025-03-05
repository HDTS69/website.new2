'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OpenNowIndicatorProps {
  className?: string;
  showTime?: boolean;
}

export function OpenNowIndicator({ className, showTime = true }: OpenNowIndicatorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  
  useEffect(() => {
    // Check if business is open based on current time
    const checkBusinessHours = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const hour = now.getHours();
      
      // Format current time (12-hour format with AM/PM)
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
      
      // For this example, let's assume 24/7 service is available
      // In a real application, you would implement actual business hours logic here
      setIsOpen(true);
    };
    
    // Check immediately and then every minute
    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 15000); // Update every 15 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center justify-center">
        {/* Enhanced pulsing background effect */}
        <motion.div
          className="absolute rounded-full bg-green-500/30"
          initial={{ width: 12, height: 12 }}
          animate={{ 
            width: [12, 24, 12],
            height: [12, 24, 12],
            opacity: [0.7, 0.2, 0.7],
            boxShadow: [
              '0 0 0px 0px rgba(34, 197, 94, 0.7)',
              '0 0 10px 4px rgba(34, 197, 94, 0.5)',
              '0 0 0px 0px rgba(34, 197, 94, 0.7)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Solid green dot with enhanced glow */}
        <div className="relative w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/70" />
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium text-white">Open Now</span>
        {showTime && (
          <span className="text-sm font-medium text-gray-300 ml-2">• {currentTime}</span>
        )}
      </div>
    </div>
  );
} 