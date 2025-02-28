"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LazySparklesCore } from './LazySparklesCore';
import { LazyMotionDiv } from '@/components/ui/motion/LazyMotion';
import { ClientOnly } from '@/components/ui/ClientOnly';

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
}

// Mock data for static builds or fallback
const MOCK_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'mock1',
    media_url: '/images/placeholder-service.jpg',
    permalink: 'https://www.instagram.com/hdtradeservices/',
  },
  {
    id: 'mock2',
    media_url: '/images/placeholder-service.jpg',
    permalink: 'https://www.instagram.com/hdtradeservices/',
  },
  {
    id: 'mock3',
    media_url: '/images/placeholder-service.jpg',
    permalink: 'https://www.instagram.com/hdtradeservices/',
  },
];

// Create a placeholder component with the same structure
function InstagramFeedPlaceholder() {
  return (
    <section className="relative py-16 px-4 md:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="absolute inset-0">
        {/* Empty div with same structure */}
        <div className="w-full h-full" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-2xl font-bold text-[#00E6CA]">
            <div className="w-6 h-6" />
            hd.tradeservices
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={`loading-${i}`}
                className="aspect-square bg-gray-800 animate-pulse rounded-xl"
                aria-hidden="true"
                style={{ minHeight: '200px', opacity: 0.99 }} // Use 0.99 opacity to ensure visibility for LCP
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch Instagram posts
    async function fetchInstagramPosts() {
      try {
        // Try to fetch from our API route first
        const response = await fetch('/api/instagram', {
          next: { revalidate: 3600 } // Revalidate every hour instead of every request
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch Instagram posts: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          // Only take the first 3 posts
          setPosts(data.data.slice(0, 3));
          setLoading(false);
          return;
        } else {
          throw new Error('No Instagram posts found in API response');
        }
      } catch (err) {
        // Try to load from static JSON file as fallback
        try {
          const staticDataResponse = await fetch('/data/instagram.json', {
            next: { revalidate: 86400 } // Revalidate static data once per day
          });
          
          if (staticDataResponse.ok) {
            const staticData = await staticDataResponse.json();
            if (staticData.data && Array.isArray(staticData.data) && staticData.data.length > 0) {
              setPosts(staticData.data.slice(0, 3));
              setError('Using cached Instagram data');
            } else {
              setPosts(MOCK_INSTAGRAM_POSTS);
              setError('Using fallback Instagram posts');
            }
          } else {
            setPosts(MOCK_INSTAGRAM_POSTS);
            setError('Using fallback Instagram posts');
          }
        } catch (staticErr) {
          setPosts(MOCK_INSTAGRAM_POSTS);
          setError('Using fallback Instagram posts');
        }
      } finally {
        setLoading(false);
      }
    }

    // Use a shorter timeout to ensure content loads quickly for LCP measurement
    const timer = setTimeout(() => {
      fetchInstagramPosts();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => (
    <section className="relative py-16 px-4 md:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <LazySparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.3}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Link 
            href="https://www.instagram.com/hd.tradeservices/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-2xl font-bold text-[#00E6CA]"
            aria-label="Follow us on Instagram"
          >
            <svg className="w-6 h-6 text-[#00E6CA]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
            </svg>
            hd.tradeservices
          </Link>
          {error && (
            <p className="text-sm text-gray-400 mt-2">
              {error}
            </p>
          )}
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            {loading ? (
              // Loading state - show placeholder boxes with minimum height for LCP detection
              Array.from({ length: 3 }).map((_, i) => (
                <div 
                  key={`loading-${i}`}
                  className="aspect-square bg-gray-800 animate-pulse rounded-xl"
                  style={{ minHeight: '200px', opacity: 0.99 }} // Use 0.99 opacity to ensure visibility for LCP
                  aria-hidden="true"
                />
              ))
            ) : (
              // Instagram posts
              posts.map((post, i) => (
                <LazyMotionDiv
                  key={post.id}
                  initial={{ opacity: 0.01, y: 20 }} // Use 0.01 instead of 0 to avoid Lighthouse LCP detection issues
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-square relative overflow-hidden rounded-xl"
                  style={{ minHeight: '200px' }} // Ensure minimum height for LCP detection
                >
                  <Link 
                    href={post.permalink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full h-full"
                    aria-label={`View Instagram post ${i + 1}`}
                  >
                    <div className="relative w-full h-full">
                      <Image 
                        src={post.media_url} 
                        alt={`Instagram post ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover"
                        priority={i === 0} // First image gets priority loading
                        loading={i === 0 ? "eager" : "lazy"} // Lazy load all images except the first one
                        onError={(e) => {
                          // Replace with placeholder if image fails to load
                          const imgElement = e.currentTarget as HTMLImageElement;
                          imgElement.src = "/images/placeholder-service.jpg";
                        }}
                      />
                    </div>
                  </Link>
                </LazyMotionDiv>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );

  // Use our reusable ClientOnly component with the placeholder
  return (
    <ClientOnly fallback={<InstagramFeedPlaceholder />}>
      {renderContent()}
    </ClientOnly>
  );
} 