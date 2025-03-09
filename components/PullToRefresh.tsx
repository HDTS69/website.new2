'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';

export function PullToRefresh() {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Threshold in pixels to trigger refresh
  const REFRESH_THRESHOLD = 80;
  
  // Function to trigger haptic feedback
  const triggerHapticFeedback = () => {
    if (navigator && navigator.vibrate) {
      // Vibration pattern: vibrate 15ms, pause 10ms, vibrate 15ms
      navigator.vibrate([15, 10, 15]);
    }
  };
  
  // Function for subtle feedback during pull
  const triggerSubtleHapticFeedback = () => {
    if (navigator && navigator.vibrate) {
      navigator.vibrate(5); // Very short vibration
    }
  };
  
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    let isAtTop = false;
    let lastFeedbackThreshold = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      // Only enable pull-to-refresh when at the top of the page
      isAtTop = window.scrollY <= 0;
      if (!isAtTop) return;
      
      startY = e.touches[0].clientY;
      setIsPulling(true);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isAtTop || isRefreshing) return;
      
      currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startY);
      
      // Apply resistance to the pull (gets harder to pull the further you go)
      const resistedDistance = Math.min(REFRESH_THRESHOLD * 1.5, distance * 0.4);
      
      setPullDistance(resistedDistance);
      
      // Provide subtle haptic feedback during pull at 25%, 50%, 75% and 100% of threshold
      const progressPercentage = Math.floor((resistedDistance / REFRESH_THRESHOLD) * 100);
      const feedbackThreshold = Math.floor(progressPercentage / 25) * 25;
      
      if (feedbackThreshold > lastFeedbackThreshold && feedbackThreshold > 0) {
        lastFeedbackThreshold = feedbackThreshold;
        triggerSubtleHapticFeedback();
      }
      
      // Prevent default scrolling behavior when pulling
      if (distance > 10) {
        e.preventDefault();
      }
    };
    
    const handleTouchEnd = () => {
      if (!isAtTop || isRefreshing) {
        setIsPulling(false);
        setPullDistance(0);
        return;
      }
      
      if (pullDistance >= REFRESH_THRESHOLD) {
        // Trigger refresh
        setIsRefreshing(true);
        
        // Strong haptic feedback when refresh is triggered
        triggerHapticFeedback();
        
        // Reload the page
        setTimeout(() => {
          window.location.reload();
        }, 800); // Slightly longer delay to show the refreshing animation
      } else {
        // Reset if not pulled far enough
        setIsPulling(false);
        setPullDistance(0);
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isRefreshing, pullDistance]);
  
  if (!isPulling && !isRefreshing && pullDistance === 0) {
    return null;
  }
  
  // Calculate progress percentage
  const progress = Math.min(100, (pullDistance / REFRESH_THRESHOLD) * 100);
  
  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center overflow-hidden">
      <motion.div 
        className="flex flex-col items-center justify-center pt-4"
        style={{ 
          y: pullDistance,
          opacity: Math.min(1, pullDistance / (REFRESH_THRESHOLD * 0.7))
        }}
      >
        <motion.div 
          className="relative mb-2"
          animate={{ 
            rotate: isRefreshing ? 360 : 0,
          }}
          transition={{ 
            repeat: isRefreshing ? Infinity : 0,
            duration: 1,
            ease: "linear"
          }}
        >
          {/* Progress circle */}
          <svg width="40" height="40" viewBox="0 0 40 40">
            {/* Background circle */}
            <circle 
              cx="20" 
              cy="20" 
              r="18" 
              fill="none" 
              stroke="#333" 
              strokeWidth="2" 
            />
            
            {/* Progress circle */}
            <circle 
              cx="20" 
              cy="20" 
              r="18" 
              fill="none" 
              stroke="#00E6CA" 
              strokeWidth="2" 
              strokeDasharray={`${2 * Math.PI * 18}`} 
              strokeDashoffset={`${2 * Math.PI * 18 * (1 - progress / 100)}`} 
              transform="rotate(-90 20 20)" 
              strokeLinecap="round"
            />
            
            {/* Icon in the center */}
            <foreignObject x="8" y="8" width="24" height="24">
              <div className="text-[#00E6CA] flex items-center justify-center h-full">
                <FiRefreshCw size={20} />
              </div>
            </foreignObject>
          </svg>
        </motion.div>
        
        <div className="text-sm text-white font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
          {isRefreshing ? "Refreshing..." : pullDistance >= REFRESH_THRESHOLD ? "Release to refresh" : "Pull to refresh"}
        </div>
      </motion.div>
    </div>
  );
} 