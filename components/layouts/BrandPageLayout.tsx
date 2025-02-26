'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { AnimatedButton } from '../ui/AnimatedButton';
import { SparklesCore } from '../ui/sparkles';
import { BookingForm } from '../ui/BookingForm';
import { NavBar } from '@/components/navigation/DesktopNavigation';
import { Calendar, Phone, Home, Wrench, Info, Building2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigationItems, actionItems } from '@/lib/navigation';

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface Testimonial {
  content: string;
  author: string;
  location: string;
  rating: number;
}

interface BrandPageProps {
  brandName: string;
  brandLogo: string;
  vanImage: string;
  expertImage: string;
  description: string;
  features: Feature[];
  serviceList: string[];
  products: Array<{
    name: string;
    description: string;
    image: string;
    bulletPoints?: string[];
  }>;
  testimonials: Testimonial[];
  financeOptions?: {
    title: string;
    description: string;
    points: string[];
  };
  brandPartners: Array<{
    name: string;
    logo: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

export function BrandPageLayout({
  brandName,
  brandLogo,
  vanImage,
  expertImage,
  description,
  features,
  serviceList,
  products,
  testimonials,
  financeOptions,
  brandPartners,
  benefits,
}: BrandPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div className="relative z-10">
        <main ref={containerRef} className="relative">
          <div className="w-full max-w-[800px] mx-auto z-[60] fixed left-0 right-0 transition-none" style={{ top: 0 }}>
            <div className="border border-[#00E6CA]/20 bg-black/90 backdrop-blur-md pointer-events-auto rounded-full transition-none">
              <NavBar items={navigationItems} actionItems={actionItems} />
            </div>
          </div>

          {/* Hero Section */}
          <section className="relative min-h-[500px] bg-black/95 pt-20">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent" />
            
            {/* Star Border Animation */}
            <div
              className={cn(
                "absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 overflow-hidden",
                "opacity-20 dark:opacity-70"
              )}
              style={{
                background: "radial-gradient(circle, #00E6CA, transparent 10%)",
                animationDuration: "6s",
              }}
            />
            <div
              className={cn(
                "absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 overflow-hidden",
                "opacity-20 dark:opacity-70"
              )}
              style={{
                background: "radial-gradient(circle, #00E6CA, transparent 10%)",
                animationDuration: "6s",
              }}
            />
            
            <div className="container mx-auto px-4 py-20">
              <div className="relative z-10 max-w-4xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-bold mb-6 text-white"
                >
                  {brandName} Hot Water System
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl text-gray-100 mb-6"
                >
                  Professional Installation & Repairs
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-200 max-w-2xl"
                >
                  Trust HD Trade Services for all your {brandName} hot water needs. We're your local experts with over 15 years of experience, providing fast, reliable service at competitive prices. Available 24/7 for emergency repairs and installations.
                </motion.p>
              </div>
            </div>
          </section>

          {/* Experts Section */}
          <section className="py-16 bg-black">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00E6CA]/5 to-transparent rounded-lg border border-[#00E6CA]/10" />
                </div>
                <div>
                  <div className="w-48 h-24 relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00E6CA]/5 to-transparent rounded-lg border border-[#00E6CA]/10" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00E6CA] via-white to-[#00E6CA]">
                    {brandName} Experts
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-16 bg-black/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="grid gap-12">
                {products.map((product, index) => (
                  <div key={product.name} className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <h2 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-[#00E6CA] via-white to-[#00E6CA]">
                        {product.name}
                      </h2>
                      <p className="text-gray-300 text-lg">{product.description}</p>
                      {product.bulletPoints && (
                        <ul className="space-y-3">
                          {product.bulletPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <svg className="w-6 h-6 text-[#00E6CA] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className={`relative h-[300px] ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00E6CA]/5 to-transparent rounded-lg border border-[#00E6CA]/10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Service List */}
          <section className="py-16 bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#00E6CA] via-white to-[#00E6CA]">
                We Service, Install and Repair:
              </h2>
              <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceList.map((service, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#00E6CA] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-8">
                Why Choose {brandName}?
              </h2>
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4 p-6 bg-black/80 backdrop-blur-sm rounded-lg border border-[#00E6CA]/10 hover:border-[#00E6CA]/20 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00E6CA]/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Booking Form Section */}
          <section 
            id="booking-form" 
            className="py-16 bg-black/50 backdrop-blur-sm scroll-mt-32"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-[#00E6CA]/10 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Book Your {brandName} Service
                  </h2>
                  <BookingForm brandName={brandName} />
                </div>
              </div>
            </div>
          </section>

          {/* Finance Options */}
          {financeOptions && (
            <section className="py-16 bg-black">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00E6CA] via-white to-[#00E6CA]">
                    {financeOptions.title}
                  </h2>
                  <p className="text-gray-300 mb-8">{financeOptions.description}</p>
                  <ul className="space-y-4">
                    {financeOptions.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-[#00E6CA] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Benefits */}
          <section className="py-16 bg-black/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center p-6 bg-black/80 backdrop-blur-sm rounded-lg border border-[#00E6CA]/10 hover:border-[#00E6CA]/20 transition-colors">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#00E6CA]/5 to-transparent rounded-full border border-[#00E6CA]/10" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#00E6CA] via-white to-[#00E6CA]">
                What Our Happy Customers Have to Say
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.slice(0, 3).map((testimonial, index) => (
                  <div key={index} className="bg-black/80 backdrop-blur-sm p-6 rounded-lg border border-[#00E6CA]/10 hover:border-[#00E6CA]/20 transition-colors">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? 'text-[#00E6CA]' : 'text-gray-600'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
} 