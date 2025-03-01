"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SparklesCore } from './SparklesCore';
import { motion } from 'framer-motion';
import { getImageLoadingProps, IMAGE_SIZES, ImagePriority } from '@/utils/imageLoading';

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
}

// Mock data for static builds or fallback
const MOCK_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'mock1',
    media_url: 'https://via.placeholder.com/1080x1080/1CD4A7/ffffff?text=Instagram+Post+1',
    permalink: 'https://www.instagram.com/hdtradeservices/',
  },
  {
    id: 'mock2',
    media_url: 'https://via.placeholder.com/1080x1080/1CD4A7/ffffff?text=Instagram+Post+2',
    permalink: 'https://www.instagram.com/hdtradeservices/',
  },
  {
    id: 'mock3',
    media_url: 'https://via.placeholder.com/1080x1080/1CD4A7/ffffff?text=Instagram+Post+3',
    permalink: 'https://www.instagram.com/hdtradeservices/',
  },
];

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch Instagram posts
    async function fetchInstagramPosts() {
      try {
        // First try to fetch from our API route
        const response = await fetch('/api/instagram')
          .catch(() => null);
        
        if (response && response.ok) {
          const data = await response.json();
          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            setPosts(data.data);
            setLoading(false);
            return;
          }
        }
        
        // If API route fails, try to load from static JSON file (for static builds)
        const staticDataResponse = await fetch('/data/instagram.json')
          .catch(() => null);
        
        if (staticDataResponse && staticDataResponse.ok) {
          const staticData = await staticDataResponse.json();
          if (staticData.data && Array.isArray(staticData.data) && staticData.data.length > 0) {
            setPosts(staticData.data.slice(0, 3));
            setLoading(false);
            return;
          }
        }
        
        // If all else fails, use mock data
        setPosts(MOCK_INSTAGRAM_POSTS);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
        // Fall back to mock data
        setPosts(MOCK_INSTAGRAM_POSTS);
        setLoading(false);
      }
    }

    fetchInstagramPosts();
  }, []);

  return (
    <section className="relative py-16 px-4 md:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Link 
            href="https://www.instagram.com/hd.tradeservices/" 
            target="_blank"
            className="inline-flex items-center gap-2 text-2xl font-bold text-[#00E6CA]"
          >
            <svg className="w-6 h-6 text-[#00E6CA]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
            </svg>
            hd.tradeservices
          </Link>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            {loading ? (
              // Loading state - show placeholder boxes
              Array.from({ length: 3 }).map((_, i) => (
                <div 
                  key={`loading-${i}`}
                  className="aspect-square bg-gray-800 animate-pulse rounded-xl"
                />
              ))
            ) : (
              // Instagram posts
              posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-square relative overflow-hidden rounded-xl"
                >
                  <Link href={post.permalink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    <div className="relative w-full h-full">
                      <Image 
                        src={post.media_url} 
                        alt={post.caption || "Instagram post"} 
                        fill
                        sizes={IMAGE_SIZES.CARD}
                        className="object-cover"
                        {...getImageLoadingProps(ImagePriority.LOW)}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 