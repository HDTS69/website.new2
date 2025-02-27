'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SparklesCore } from '@/components/ui/sparkles';

const blogPosts = [
  {
    title: 'How to Fix a Leaking Tap: A Step-by-Step Guide',
    slug: 'how-to-fix-leaking-tap',
    excerpt: 'Learn how to identify and fix common tap leaks with our comprehensive guide. Save water and money with these DIY tips.',
    image: '/images/blog/leaking-tap.jpg',
    category: 'DIY Tips',
    date: '2024-02-15',
    readTime: '5 min read',
  },
  {
    title: 'The Benefits of Regular Plumbing Maintenance',
    slug: 'benefits-of-plumbing-maintenance',
    excerpt: 'Discover why regular plumbing maintenance is crucial for your home and how it can prevent costly repairs in the future.',
    image: '/images/blog/maintenance.jpg',
    category: 'Maintenance',
    date: '2024-02-10',
    readTime: '4 min read',
  },
  {
    title: 'Choosing the Right Hot Water System',
    slug: 'choosing-hot-water-system',
    excerpt: 'Compare different types of hot water systems and find the perfect one for your home and budget.',
    image: '/images/blog/hot-water.jpg',
    category: 'Buying Guide',
    date: '2024-02-05',
    readTime: '7 min read',
  },
  {
    title: 'Signs You Need to Replace Your Roof',
    slug: 'signs-to-replace-roof',
    excerpt: 'Learn the warning signs that indicate your roof needs replacement and how to avoid costly water damage.',
    image: '/images/blog/roof.jpg',
    category: 'Maintenance',
    date: '2024-02-01',
    readTime: '6 min read',
  },
  {
    title: 'Energy-Efficient Air Conditioning Tips',
    slug: 'energy-efficient-ac-tips',
    excerpt: 'Save on your energy bills with these practical tips for maintaining and operating your air conditioning system.',
    image: '/images/blog/ac.jpg',
    category: 'Energy Saving',
    date: '2024-01-25',
    readTime: '5 min read',
  },
  {
    title: 'Common Gas Fitting Issues and Solutions',
    slug: 'gas-fitting-issues',
    excerpt: 'Understand common gas fitting problems, safety measures, and when to call a professional.',
    image: '/images/blog/gas.jpg',
    category: 'Safety',
    date: '2024-01-20',
    readTime: '8 min read',
  },
];

const categories = [
  'All',
  'DIY Tips',
  'Maintenance',
  'Buying Guide',
  'Energy Saving',
  'Safety',
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
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

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1CD4A7] via-white to-[#1CD4A7]">
            Plumbing Tips & Advice
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Expert advice, maintenance tips, and guides to help you maintain your home's plumbing, gas, air conditioning, and roofing systems.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-1
                bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 hover:text-white
                hover:shadow-lg hover:shadow-[#1CD4A7]/20"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-[#1CD4A7]/20 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-[#1CD4A7] transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-300 text-sm mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-[#1CD4A7]">
                    <span className="text-sm mr-2">Read More</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <button className="px-8 py-3 rounded-full text-black font-medium bg-gradient-to-r from-[#1CD4A7] to-[#15b38d] hover:shadow-lg hover:shadow-[#1CD4A7]/20 transition-all duration-300 hover:-translate-y-1">
            Load More Articles
          </button>
        </motion.div>
      </div>
    </div>
  );
} 