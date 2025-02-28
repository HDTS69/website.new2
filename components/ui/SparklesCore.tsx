"use client";
import React, { useId, useMemo, useRef, memo } from "react";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { LazyMotionDiv, useMotion } from '@/components/ui/motion/LazyMotion';

// Initialize particles engine once for the entire app
let engineInitialized = false;
let initializationPromise: Promise<void> | null = null;
let initializationAttempts = 0;
const MAX_INIT_ATTEMPTS = 3;

// Use requestIdleCallback for non-critical initialization
const scheduleInit = (callback: () => void) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: 1500 }); // Increased timeout
  } else {
    // Fallback to setTimeout with a small delay
    setTimeout(callback, 300); // Increased from 200ms to 300ms
  }
};

const initializeParticlesEngine = async (): Promise<void> => {
  if (engineInitialized) return;
  
  // Limit initialization attempts to prevent excessive retries
  if (initializationAttempts >= MAX_INIT_ATTEMPTS) {
    console.warn("Max particle initialization attempts reached, giving up");
    return Promise.resolve();
  }
  
  if (!initializationPromise) {
    initializationPromise = new Promise((resolve) => {
      // Schedule initialization during idle time
      scheduleInit(async () => {
        try {
          initializationAttempts++;
          await initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
          });
          engineInitialized = true;
          resolve();
        } catch (error) {
          console.error("Failed to initialize particles:", error);
          // Reset so we can try again
          initializationPromise = null;
          resolve(); // Resolve anyway to prevent hanging promises
        }
      });
    });
  }
  
  return initializationPromise;
};

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = memo((props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  
  const [init, setInit] = useState(false);
  const generatedId = useId();
  const containerRef = useRef<Container | null>(null);
  const mountedRef = useRef(true);
  
  const { useAnimation, isLoading: isMotionLoading } = useMotion();
  const controls = useAnimation ? useAnimation() : { start: () => Promise.resolve() };
  
  useEffect(() => {
    mountedRef.current = true;
    let timeoutId: NodeJS.Timeout;
    
    const initialize = async () => {
      try {
        // Set a timeout to prevent hanging if initialization takes too long
        const initTimeout = new Promise<void>((resolve) => {
          timeoutId = setTimeout(() => {
            console.warn("Particles initialization timed out, continuing anyway");
            resolve();
          }, 4000); // Increased from 3s to 4s timeout
        });
        
        // Race between actual initialization and timeout
        await Promise.race([initializeParticlesEngine(), initTimeout]);
        
        if (mountedRef.current) {
          clearTimeout(timeoutId);
          
          // Use requestAnimationFrame for smoother visual updates
          requestAnimationFrame(() => {
            if (mountedRef.current) {
              setInit(true);
              controls.start({ opacity: 1 });
            }
          });
        }
      } catch (error) {
        console.error("Failed to initialize particles:", error);
        // Still show the component even if particles fail
        if (mountedRef.current) {
          setInit(true);
        }
      }
    };

    initialize();
    
    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutId);
      // Clean up particles when component unmounts
      if (containerRef.current) {
        try {
          containerRef.current.destroy();
        } catch (e) {
          console.error("Error destroying particles container:", e);
        }
        containerRef.current = null;
      }
    };
  }, [controls]);

  const particlesLoaded = async (container?: Container) => {
    if (container && mountedRef.current) {
      containerRef.current = container;
      await controls.start({
        opacity: 1,
        transition: {
          duration: 0.2,
        },
      });
    }
  };

  // Memoize options to prevent unnecessary re-renders
  const options = useMemo(() => ({
    background: {
      color: {
        value: background || "transparent",
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    fpsLimit: 15, // Further reduced from 20 to 15 for better performance
    interactivity: {
      events: {
        onClick: {
          enable: false, // Disabled for better performance
          mode: "push",
        },
        onHover: {
          enable: false, // Disabled hover for better performance
        },
        resize: {
          enable: true,
          delay: 2, // Increased delay for resize events
        },
      },
      modes: {
        push: {
          quantity: 1, // Reduced from 2 to 1
        },
      },
    },
    particles: {
      color: {
        value: particleColor || "#ffffff",
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "out" as const,
        },
        random: false,
        speed: speed || 1, // Reduced from 1.5 to 1
        straight: false,
        warp: false,
        trail: {
          enable: false, // Disable trails for better performance
        },
      },
      number: {
        value: particleDensity || 15, // Further reduced from 20 to 15
        density: {
          enable: true,
          area: 1200 // Increased area to reduce particle density
        }
      },
      opacity: {
        value: 0.3, // Reduced from 0.4 to 0.3
        animation: {
          enable: true,
          speed: 0.2, // Reduced from 0.3 to 0.2
          minimumValue: 0.1
        }
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: minSize || 0.8, max: maxSize || 2 }, // Reduced max size from 2.5 to 2
      },
      // Reduce complexity for better performance
      reduceDuplicates: true,
      life: {
        count: 1,
      },
    },
    detectRetina: false, // Disabled for better performance
    smooth: false, // Disable smooth animations for better performance
  }), [background, minSize, maxSize, speed, particleColor, particleDensity]);
  
  // Don't render anything if not initialized
  if (!init) {
    return null;
  }
  
  return (
    <LazyMotionDiv 
      initial={{ opacity: 0 }}
      animate={controls}
      className={cn("opacity-0 transform-gpu", className)}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        isolation: 'isolate'
      }}
    >
      <Particles
        id={id || generatedId}
        className={cn("h-full w-full")}
        particlesLoaded={particlesLoaded}
        options={options}
      />
    </LazyMotionDiv>
  );
});

// Add display name for better debugging
SparklesCore.displayName = "SparklesCore";

export default SparklesCore; 