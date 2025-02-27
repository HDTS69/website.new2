"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "../ui/SparklesCore";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Interfaces for type safety
interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

// Import reviews from the main testimonials component
const reviews: Review[] = [
  {
    id: "review-0",
    name: "Taryn Berg",
    rating: 5,
    text: "I recently had a challenging experience with another company that almost jeopardized my business, leaving me with just two weeks to set up my new dog grooming salon. In my search for reliable help, I obtained quotes from at least eight different contractors, and that's when I found Hayden from HD Plumbing Services. From the moment he arrived, Hayden's service was exceptional. He was punctual, incredibly helpful, and his quote was thousands less than the other estimates. It's clear that he is not only efficient but also communicates effectively throughout the entire process.",
    date: ""
  },
  {
    id: "review-1",
    name: "Andrew Kennedy",
    rating: 5,
    text: "Hayden has done various jobs for us - taps, plumbing check and certification, hot water system replacement, roof leak, etc. He is always prompt, efficient, professional and well priced. Best of all, Hayden is just a great guy who can be relied on to get the job done. We highly recommend him to anyone needing plumbing/roofing repairs or installations.",
    date: ""
  },
  {
    id: "review-2",
    name: "Michael Xu",
    rating: 5,
    text: "An excellent bloke, he diagnosed the problem quickly and was able to come up with an easy solution for the problem. Keeps you updated on the progress and is just an upstanding guy overall. The prices he quotes are also very fair. Would highly recommend HD Trade Services.",
    date: ""
  },
  {
    id: "review-3",
    name: "Morgan Duncan",
    rating: 5,
    text: "HD Trade Services did an outstanding job on my kitchen renovation. Professional, efficient, and knowledgeable. Completed on time, within budget, and with minimal disruption. Highly recommend for plumbing needs. Top-notch expertise and customer service!",
    date: ""
  },
  {
    id: "review-4",
    name: "Craig Wilson",
    rating: 5,
    text: "Hayden was professional, friendly and prompt. The cost of repairs were considerably cheaper than all other quotes given. I would recommend Hayden anytime",
    date: ""
  },
  // Add more reviews as needed
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex justify-start gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 576 512"
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 filter drop-shadow-glow' : 'fill-gray-600'}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ review }: { review: Review }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-900 to-gray-800/90 p-6 rounded-xl shadow-lg border border-gray-800 h-full flex flex-col"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <div className="flex-1">
          <h3 className="text-white font-medium text-lg mb-1">{review.name}</h3>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed flex-grow">{review.text}</p>
      
      {/* Subtle glow effect at the bottom */}
      <div className="h-1 w-full mt-4 bg-gradient-to-r from-transparent via-[#00E6CA]/30 to-transparent rounded-full" />
    </motion.div>
  );
};

const MobileTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Required minimum swipe distance
  const minSwipeDistance = 50;
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsAutoPlaying(false);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    
    // Reset after a delay
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };
  
  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);
  
  // Pagination dots
  const renderPaginationDots = () => {
    return (
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#00E6CA] w-6' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    );
  };
  
  return (
    <section className="py-16 bg-black relative overflow-hidden md:hidden" aria-label="Customer testimonials section">
      <div className="absolute inset-0 z-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.3}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-1"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header with animation */}
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-[#00E6CA] text-base">
            Read what our satisfied customers have to say
          </p>
        </motion.header>

        {/* Testimonials carousel */}
        <div 
          className="relative px-4 py-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative h-[400px] overflow-hidden rounded-xl backdrop-blur-sm bg-black/20">
            <AnimatePresence mode="wait">
              <TestimonialCard key={reviews[currentIndex].id} review={reviews[currentIndex]} />
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <button 
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white z-20"
              onClick={() => {
                handlePrev();
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white z-20"
              onClick={() => {
                handleNext();
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          
          {/* Pagination */}
          {renderPaginationDots()}
        </div>

        {/* Interactive CTA */}
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <a 
            href="#book" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#00E6CA] to-[#00E6CA]/80 text-black font-medium rounded-lg shadow-lg shadow-[#00E6CA]/20 hover:shadow-[#00E6CA]/30 transition-all duration-300 transform hover:scale-105"
          >
            Book Your Service Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileTestimonials; 