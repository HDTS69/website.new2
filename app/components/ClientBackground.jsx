'use client';

import { useEffect, useState, useCallback } from 'react';

// Dynamic interactive sparkles implementation
export default function ClientBackground() {
  const [sparkles, setSparkles] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  
  // Generate sparkle data with better performance
  const generateSparkle = useCallback((isClick = false, x = null, y = null) => {
    // Random position or use click position
    const left = x !== null ? x : Math.random() * 100;
    const top = y !== null ? y : Math.random() * 100;
    
    return {
      id: `${Date.now()}-${Math.random()}`,
      left,
      top,
      size: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.7 + 0.3,
      // Faster animations (2-7 seconds)
      duration: Math.random() * 5 + 2,
      delay: isClick ? 0 : Math.random() * 4,
      type: Math.random() < 0.6 ? 'twinkle' : 'float',
      isClickGenerated: isClick,
      // Increased movement range for faster apparent speed
      moveX: (Math.random() - 0.5) * 60,
      moveY: (Math.random() - 0.5) * 60,
    };
  }, []);
  
  // Handle click to generate one new sparkle
  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Create just one new sparkle at click position
    const newSparkle = generateSparkle(true, x, y);
    
    setSparkles(prevSparkles => [...prevSparkles, newSparkle]);
    setClickCount(prev => prev + 1);
    
    // Clean up old sparkles if we have too many
    if (clickCount > 100) {
      setSparkles(prevSparkles => prevSparkles.slice(-800));
      setClickCount(0);
    }
  }, [generateSparkle, clickCount]);
  
  // Initialize sparkles
  useEffect(() => {
    const initialSparkles = [];
    const totalSparkles = 800; // More initial sparkles
    
    for (let i = 0; i < totalSparkles; i++) {
      initialSparkles.push(generateSparkle());
    }
    
    setSparkles(initialSparkles);
    console.log("✨ Generated teal sparkles");
    
    return () => {
      console.log("Cleaning up sparkles");
    };
  }, [generateSparkle]);
  
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        minHeight: '200vh' // Ensure it extends beyond the viewport
      }}
      onClick={handleClick}
    >
      <div className="relative w-full h-full">
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className={`absolute rounded-full ${sparkle.type === 'twinkle' ? 'animate-twinkle' : 'animate-float'}`}
            style={{
              backgroundColor: '#1CD4A7', // All sparkles are teal
              boxShadow: sparkle.size > 1.5 ? `0 0 ${sparkle.size * 1.5}px #1CD4A7` : 'none',
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              opacity: sparkle.type === 'twinkle' ? 0.2 : 0,
              animationDuration: `${sparkle.duration}s`,
              animationDelay: `${sparkle.delay}s`,
              '--moveX': `${sparkle.moveX}px`,
              '--moveY': `${sparkle.moveY}px`,
              pointerEvents: 'auto'
            }}
          />
        ))}
      </div>
      
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.3); }
          50% { opacity: 0.8; transform: scale(1); }
        }
        
        @keyframes float {
          0% { opacity: 0; transform: translate(0, 0); }
          25% { opacity: 0.8; }
          75% { opacity: 0.8; }
          100% { opacity: 0; transform: translate(var(--moveX, 30px), var(--moveY, -30px)); }
        }
        
        .animate-twinkle {
          animation: twinkle infinite ease-in-out;
        }
        
        .animate-float {
          animation: float infinite ease-in-out;
        }
      `}</style>
    </div>
  );
} 