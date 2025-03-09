'use client';

import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ClientParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initializeParticles = async () => {
      try {
        await initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        });
        setInit(true);
        console.log("✅ Particles initialized successfully");
      } catch (error) {
        console.error("❌ Failed to initialize particles:", error);
      }
    };

    initializeParticles();
  }, []);

  if (!init) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Particles
        id="tsparticles-background"
        className="w-full h-full"
        options={{
          fullScreen: { enable: false },
          background: {
            color: { value: 'transparent' }
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: '#1CD4A7',
            },
            links: {
              enable: false,
            },
            number: {
              value: 150,
              density: {
                enable: true,
                value_area: 800
              }
            },
            opacity: {
              value: 0.5
            },
            size: {
              value: { min: 1, max: 3 }
            },
            move: {
              enable: true,
              direction: 'none',
              outModes: {
                default: 'bounce'
              },
              random: true,
              speed: 1,
              straight: false
            }
          },
          detectRetina: true
        }}
      />
    </div>
  );
} 