"use client";

import React from "react";
import Image from "next/image";
import { LazySparklesCore } from '@/components/ui/LazySparklesCore';
import Marquee from 'react-fast-marquee';

interface BrandLogo {
  src: string;
  alt: string;
}

// Combined logos array
const allLogos: BrandLogo[] = [
  // Manufacturers
  { src: "/images/brand-images/Daikin Logo Transparent_result_result.webp", alt: "Daikin Logo" },
  { src: "/images/brand-images/Fujitsu Logo_result_result.webp", alt: "Fujitsu Logo" },
  { src: "/images/brand-images/Mitsubishi Heavy Industries Logo_result_result.webp", alt: "Mitsubishi Logo" },
  { src: "/images/brand-images/Rheem Image Remove Background_result_result.webp", alt: "Rheem Logo" },
  { src: "/images/brand-images/Bosch logo_result_result.webp", alt: "Bosch Logo" },
  { src: "/images/brand-images/Samsung logo._result_result.webp", alt: "Samsung Logo" },
  { src: "/images/brand-images/Chromagen Logo_result_result.webp", alt: "Chromagen Logo" },
  { src: "/images/brand-images/Dux Logo Remove Background_result_result.webp", alt: "Dux Logo" },
  { src: "/images/brand-images/Everhot Logo_result_result.webp", alt: "Everhot Logo" },
  { src: "/images/brand-images/Gree Logo_result_result.webp", alt: "Gree Logo" },
  { src: "/images/brand-images/Stiebel Eltron Logo_result_result.webp", alt: "Stiebel Logo" },
  { src: "/images/brand-images/Thermann Logo_result_result.webp", alt: "Thermann Logo" },
  // Suppliers and Certifications
  { src: "/images/brand-images/Master Plumbers Queensland Logo_result_result.webp", alt: "Master Plumbers Logo" },
  { src: "/images/brand-images/QBCC Logo_result_result.webp", alt: "QBCC Logo" },
  { src: "/images/brand-images/Reece Logo (1)_result_result.webp", alt: "Reece Logo" },
  { src: "/images/brand-images/Tradelink Logo_result_result.webp", alt: "Tradelink Logo" },
  { src: "/images/brand-images/AquaMax Logo_result_result_result.webp", alt: "Aquamax Logo" },
  { src: "/images/brand-images/Arctic Refrigeration Logo_result_result.webp", alt: "Arctic Refrigeration Logo" },
  { src: "/images/brand-images/Plastec Logo_result_result.webp", alt: "Plastec Logo" },
  { src: "/images/brand-images/Puretec Logo_result_result.webp", alt: "Puretec Logo" },
  { src: "/images/brand-images/Saxon Logo_result_result.webp", alt: "Saxon Logo" },
  { src: "/images/brand-images/Specialized Plumbing Center Logo_result_result.webp", alt: "Specialized Plumbing Logo" },
];

// Split logos into two groups
const manufacturerLogos = allLogos.slice(0, 12); // First 12 logos (Manufacturers)
const supplierLogos = allLogos.slice(12); // Remaining logos (Suppliers and Certifications)

const BrandLogoSlide: React.FC<BrandLogo & { isMobile: boolean }> = ({ src, alt, isMobile }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const preventInteraction = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div 
      className={`
        relative mx-4 flex items-center justify-center select-none
        ${isMobile ? 'w-[120px] h-[80px]' : 'w-[200px] h-[120px]'}
      `}
      onContextMenu={preventInteraction}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          relative w-full h-full rounded-lg p-6 transition-all duration-300
          ${isHovered ? 'bg-black/30 scale-105' : 'bg-black/20 scale-100'}
        `}
      >
        <Image
          src={imageError ? `https://via.placeholder.com/200x120?text=${alt.replace(/\s+/g, '+')}` : src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 200px"
          quality={90}
          priority={false}
          loading="lazy"
          className={`
            object-contain
            transition-[filter,opacity] duration-300
            ${isLoaded ? '' : 'opacity-0'}
            ${isHovered 
              ? 'opacity-100 [filter:none] saturate-100' 
              : 'opacity-45 grayscale brightness-100'
            }
            pointer-events-none
          `}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            console.error(`Failed to load ${src}`);
            setImageError(true);
            // Try to load anyway to show the placeholder
            setIsLoaded(true);
          }}
          draggable={false}
          style={{ 
            userSelect: 'none', 
            WebkitUserSelect: 'none',
          }}
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export function BrandCarousel() {
  const [isMobile, setIsMobile] = React.useState(false);
  
  // Check if mobile on client side
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Common marquee settings
  const marqueeSettings = {
    speed: isMobile ? 80 : 40,
    gradient: false,
    pauseOnHover: true,
    className: "overflow-hidden"
  };

  return (
    <section className="relative py-12 md:py-16 lg:py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <LazySparklesCore
          background="transparent"
          minSize={1}
          maxSize={2}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.3}
        />
      </div>

      <div className="text-center mb-12 relative z-20">
        <h2 className="standard-header">Trusted by Leading Brands</h2>
        <p className="standard-subheader">
          We partner with industry-leading manufacturers and suppliers to deliver excellence
        </p>
      </div>

      <div className="relative z-20 w-full space-y-16">
        {/* First marquee - Left to Right */}
        <div className="w-full">
          <Marquee {...marqueeSettings}>
            {manufacturerLogos.map((brand, index) => (
              <BrandLogoSlide key={`brand-1-${index}`} {...brand} isMobile={isMobile} />
            ))}
          </Marquee>
        </div>

        {/* Second marquee - Right to Left */}
        <div className="w-full">
          <Marquee {...marqueeSettings} direction="right">
            {supplierLogos.map((brand, index) => (
              <BrandLogoSlide key={`brand-2-${index}`} {...brand} isMobile={isMobile} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}