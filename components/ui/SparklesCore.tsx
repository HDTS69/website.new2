"use client";
import React, { useId, useMemo, useRef } from "react";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, SingleOrMultiple, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

// Initialize particles engine once for the entire app
let engineInitialized = false;
let initializationPromise: Promise<void> | null = null;

const initializeParticlesEngine = async (): Promise<void> => {
  if (engineInitialized) return;
  
  if (!initializationPromise) {
    // Add a small delay before initializing to improve initial page load
    await new Promise(resolve => setTimeout(resolve, 300));
    
    initializationPromise = initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      engineInitialized = true;
    }).catch((error) => {
      console.error("Failed to initialize particles:", error);
      // Reset so we can try again
      initializationPromise = null;
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

export const SparklesCore = (props: ParticlesProps) => {
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
  const controls = useAnimation();
  const generatedId = useId();
  const containerRef = useRef<Container | null>(null);
  
  useEffect(() => {
    let mounted = true;
    
    const initialize = async () => {
      try {
        await initializeParticlesEngine();
        if (mounted) {
          setInit(true);
          controls.start({ opacity: 1 });
        }
      } catch (error) {
        console.error("Failed to initialize particles:", error);
      }
    };

    initialize();
    
    return () => {
      mounted = false;
      // Clean up particles when component unmounts
      if (containerRef.current) {
        containerRef.current.destroy();
        containerRef.current = null;
      }
    };
  }, [controls]);

  const particlesLoaded = async (container?: Container) => {
    if (container) {
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
    fpsLimit: 30, // Reduced from 60 to 30 for better performance
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
          delay: 0.5,
        },
      },
      modes: {
        push: {
          quantity: 4,
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
        speed: speed || 2,
        straight: false,
        warp: false,
      },
      number: {
        value: particleDensity || 30, // Reduced from 40 to 30
        density: {
          enable: true,
          area: 800
        }
      },
      opacity: {
        value: 0.5,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1
        }
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: minSize || 1, max: maxSize || 3 },
      },
      // Reduce complexity for better performance
      reduceDuplicates: true,
      life: {
        count: 1,
      },
    },
    detectRetina: false, // Disabled for better performance
  }), [background, minSize, maxSize, speed, particleColor, particleDensity]);
  
  // Don't render anything if not initialized
  if (!init) {
    return null;
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={controls}
      className={cn("opacity-0 transform-gpu", className)}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden'
      }}
    >
      <Particles
        id={id || generatedId}
        className={cn("h-full w-full")}
        particlesLoaded={particlesLoaded}
        options={options}
      />
    </motion.div>
  );
};

export default { SparklesCore }; 