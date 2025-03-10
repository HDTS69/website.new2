'use client';

import { useRef, useEffect, useState } from 'react';

interface LordIconProps {
  src: string;
  size?: number;
  trigger?: "hover" | "click" | "loop" | "loop-on-hover" | "morph" | "boomerang";
  colors?: { primary?: string; secondary?: string };
  delay?: number;
  className?: string;
  forceTrigger?: boolean;
}

export default function LordIcon({ 
  src, 
  size = 64, 
  trigger = "hover", 
  colors, 
  delay = 0,
  className = "",
  forceTrigger = false
}: LordIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const shouldAnimate = forceTrigger || isHovered;
  const actualTrigger = shouldAnimate ? "loop" : "hover";

  useEffect(() => {
    if (typeof window === 'undefined' || !iconRef.current) return;

    const loadLordIcon = async () => {
      try {
        if (!customElements.get('lord-icon')) {
          const module = await import('lord-icon-element') as any;
          if (module.defineElement) {
            module.defineElement();
          }
        }

        if (!iconRef.current) return;

        const lordIconElement = document.createElement('lord-icon');
        
        lordIconElement.setAttribute('src', src);
        lordIconElement.setAttribute('trigger', actualTrigger);
        lordIconElement.setAttribute('delay', delay.toString());
        lordIconElement.style.width = `${size}px`;
        lordIconElement.style.height = `${size}px`;
        
        // Only apply colors if explicitly provided
        if (colors?.primary) {
          lordIconElement.setAttribute('colors', `primary:${colors.primary}${colors.secondary ? `,secondary:${colors.secondary}` : ''}`);
        }
        
        iconRef.current.innerHTML = '';
        iconRef.current.appendChild(lordIconElement);
      } catch (error) {
        console.error('Error loading lord-icon:', error);
      }
    };

    loadLordIcon();

    return () => {
      if (iconRef.current) {
        iconRef.current.innerHTML = '';
      }
    };
  }, [src, actualTrigger, delay, size, colors]);

  const handleMouseEnter = () => {
    if (!forceTrigger) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!forceTrigger) {
      setIsHovered(false);
    }
  };

  return (
    <div 
      ref={iconRef} 
      className={`w-full h-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
} 