"use client";

import React, { useState, useEffect, ReactNode } from 'react';
import { 
  motion as framerMotion, 
  AnimatePresence as FramerAnimatePresence,
  useAnimation as useFramerAnimation,
  useMotionValue as useFramerMotionValue,
  useTransform as useFramerTransform
} from 'framer-motion';

// Type definitions
type MotionComponentProps = {
  children?: ReactNode;
  [key: string]: any;
};

// Main LazyMotion component - simplified to avoid errors
const LazyMotion = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

// Motion component wrappers - using direct imports instead of dynamic loading
const LazyMotionDiv = ({ children, ...props }: MotionComponentProps) => (
  <framerMotion.div {...props}>{children}</framerMotion.div>
);

const LazyMotionSection = ({ children, ...props }: MotionComponentProps) => (
  <framerMotion.section {...props}>{children}</framerMotion.section>
);

const LazyMotionSpan = ({ children, ...props }: MotionComponentProps) => (
  <framerMotion.span {...props}>{children}</framerMotion.span>
);

const LazyMotionButton = ({ children, ...props }: MotionComponentProps) => (
  <framerMotion.button {...props}>{children}</framerMotion.button>
);

const LazyAnimatePresence = ({ children, ...props }: MotionComponentProps) => (
  <FramerAnimatePresence {...props}>{children}</FramerAnimatePresence>
);

const LazyMotionSvg = ({ children, ...props }: MotionComponentProps) => (
  <framerMotion.svg {...props}>{children}</framerMotion.svg>
);

const LazyMotionPath = ({ children, ...props }: MotionComponentProps) => (
  <framerMotion.path {...props}>{children}</framerMotion.path>
);

const LazyMotionLinearGradient = ({ children, ...props }: MotionComponentProps) => (
  <framerMotion.linearGradient {...props}>{children}</framerMotion.linearGradient>
);

// Custom hook - simplified to use direct imports
const useMotion = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return {
    motion: framerMotion,
    AnimatePresence: FramerAnimatePresence,
    useAnimation: useFramerAnimation,
    useMotionValue: useFramerMotionValue,
    useTransform: useFramerTransform,
    isLoading,
  };
};

// Explicit exports
export {
  LazyMotion,
  LazyMotionDiv,
  LazyMotionSection,
  LazyMotionSpan,
  LazyMotionButton,
  LazyAnimatePresence,
  LazyMotionSvg,
  LazyMotionPath,
  LazyMotionLinearGradient,
  useMotion,
};