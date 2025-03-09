'use client';

import { useEffect, useRef } from 'react';

interface LordIconProps {
  src: string;
  trigger?: 'hover' | 'click' | 'loop' | 'loop-on-hover' | 'morph' | 'boomerang';
  colors?: {
    primary?: string;
    secondary?: string;
  };
  delay?: number;
  size?: number;
  className?: string;
}

export function LordIcon({ 
  src, 
  trigger = 'hover', 
  colors = {
    primary: '#1CD4A7',
    secondary: '#1CD4A7'
  }, 
  size = 64,
  className = ''
}: LordIconProps) {
  return (
    <lord-icon
      src={src}
      trigger={trigger}
      colors={`primary:${colors.primary},secondary:${colors.secondary}`}
      style={{
        width: size,
        height: size
      }}
      class={className}
    />
  );
} 