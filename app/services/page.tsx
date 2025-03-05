'use client';

import { motion, useInView } from 'framer-motion';
import { SparklesCore } from '@/components/ui/SparklesCore';
import Link from 'next/link';
import { Wrench, Flame, Home, Wind, Award, Clock, Shield, Phone, Star, Users, CheckCircle, ArrowRight } from 'lucide-react';
import ServiceTabs from '@/components/services/ServiceTabs';
import { WhyChooseUs } from '@/components/ui/WhyChooseUs';
import { Testimonials } from '@/components/ui/Testimonials';
import { BrandCarousel } from '@/components/ui/BrandCarousel';
import { FAQ } from '@/components/ui/FAQ';
import { ServiceSchema } from '@/components/ui/ServiceSchema';
import { ServiceRequestForm } from '@/components/ui/ServiceRequestForm';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Dynamically import the BookingForm component with SSR disabled
const BookingForm = dynamic(
  () => import('@/components/ui/BookingForm/BookingForm').then(mod => mod.BookingForm),
  { ssr: false }
);

const services = [
  {
    name: 'Plumbing Services',
    description: 'Professional plumbing solutions for all your needs. From emergency repairs to complete installations, our licensed plumbers deliver reliable solutions with guaranteed workmanship.',
    icon: Wrench,
    href: '/services/plumbing',
    features: [
      'Emergency Repairs',
      'Hot Water Systems',
      'Drain Cleaning',
      'Leak Detection',
      'Bathroom Renovations',
      'Water Filters'
    ]
  },
  {
    name: 'Gas Fitting',
    description: 'Licensed gas fitters providing expert installation, maintenance, and safety services. We ensure your gas appliances are installed correctly and operating safely.',
    icon: Flame,
    href: '/services/gas-fitting',
    features: [
      'Gas Installation',
      'Safety Inspections',
      'Leak Detection',
      'Appliance Setup',
      'Compliance Certificates',
      'Emergency Repairs'
    ]
  },
  {
    name: 'Roof Repairs',
    description: 'Comprehensive roofing solutions to protect your home. Our experienced team handles everything from minor repairs to major restorations.',
    icon: Home,
    href: '/services/roof-repairs',
    features: [
      'Leak Repairs',
      'Tile Replacement',
      'Gutter Services',
      'Storm Damage',
      'Roof Inspections',
      'Preventive Maintenance'
    ]
  },
  {
    name: 'Air Conditioning',
    description: 'Complete climate control solutions for your comfort. Expert installation, maintenance, and repair services for all air conditioning systems.',
    icon: Wind,
    href: '/services/air-conditioning',
    features: [
      'System Installation',
      'Repairs & Service',
      'Ducted Systems',
      'Split Systems',
      'Commercial Solutions',
      'Regular Maintenance'
    ]
  }
];

const stats = [
  { value: '14+', label: 'Years Experience', icon: Clock, numericValue: 14, animate: true },
  { value: '2,000+', label: 'Happy Customers', icon: Users, numericValue: 2000, animate: true, duration: 3000 },
  { value: '100%', label: 'Satisfaction Guarantee', icon: CheckCircle, numericValue: 100, animate: true },
  { value: '24/7', label: 'Emergency Service', icon: Phone, animate: false },
];

const certifications = [
  { name: 'Licensed & Insured', description: 'All our technicians are fully licensed and insured for your peace of mind.' },
  { name: 'Master Plumbers', description: 'Our team includes certified master plumbers with advanced training and expertise.' },
  { name: 'Energy Efficiency Certified', description: 'Specialized in energy-efficient installations and upgrades.' },
  { name: 'Safety Compliance', description: 'All work complies with Australian safety standards and building codes.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Add this component for the animated counter
const AnimatedCounter = ({ value, suffix = '', duration = 2000 }: { value: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.toString().replace(/[^0-9]/g, ""));
      const incrementTime = duration / end;
      
      // Don't run if end is zero or very small
      if (end <= 0 || incrementTime < 0) return;
      
      // Remove existing timer
      let timer: NodeJS.Timeout | null = null;
      
      // Start the animation
      const animate = () => {
        start += 1;
        setCount(start);
        
        // Stop the animation when we reach the target value
        if (start >= end) {
          if (timer) clearTimeout(timer);
          setCount(end);
          return;
        }
        
        // Schedule the next animation frame
        timer = setTimeout(animate, incrementTime);
      };
      
      // Start the animation
      animate();
      
      // Clean up on unmount
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [isInView, value, duration]);
  
  return <span ref={ref}>{count}{suffix}</span>;
};

export default function ServicesPage() {
  return (
    <>
      {/* SEO Schema */}
      <ServiceSchema 
        serviceName="HD Trade Services" 
        description="Professional plumbing, gas fitting, roofing, and air conditioning services with over 14 years of experience. Licensed technicians providing quality workmanship and customer satisfaction."
      />
      
      <div className="min-h-screen bg-black">
        {/* Background Effects */}
        <div className="fixed inset-0 -z-10">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#00E6CA"
            speed={0.2}
          />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Hero Section with Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              {/* Google Review Section - Enhanced */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center mb-2 mt-1"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 filter drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-white font-semibold text-lg">5.0/5.0</span>
                <span className="ml-3 text-[#00E6CA]/80 font-medium text-sm">36+ Google Reviews</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00E6CA] via-white to-[#00E6CA] relative"
              >
                Professional Trade Services
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-[#00E6CA]/0 via-[#00E6CA] to-[#00E6CA]/0"
                ></motion.div>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-gray-300 text-lg mb-8"
              >
                HD Trade Services offers comprehensive solutions for all your plumbing, gas fitting, roofing, and air conditioning needs. Our licensed technicians bring over 14 years of experience to every job, ensuring quality workmanship and customer satisfaction.
              </motion.p>
            </motion.div>
            
            <div className="bg-gradient-to-br from-gray-900/50 to-black border border-[#00E6CA]/20 rounded-2xl p-6 transition-all duration-300 hover:border-[#00E6CA]/40 hover:shadow-[0_0_15px_rgba(0,230,202,0.3)]">
              <div className="mb-4 text-center">
                <span className="text-sm font-semibold text-[#00E6CA] uppercase tracking-wider">Quick Booking</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-2">Request a Service</h3>
                <p className="text-gray-400 text-sm mb-4">Fill out the form below and we'll get back to you shortly</p>
              </div>
              <BookingForm brandName="HD Trade Services" />
            </div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const suffix = stat.value.replace(/[0-9]/g, "");
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  className="group bg-gradient-to-br from-gray-900/50 to-black border border-[#00E6CA]/10 rounded-xl p-6 text-center hover:border-[#00E6CA]/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,230,202,0.2)]"
                >
                  <div className="w-16 h-16 rounded-full bg-[#00E6CA]/10 flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:bg-[#00E6CA]/20 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-[#00E6CA] transition-all duration-300 group-hover:text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2 transition-all duration-300 group-hover:scale-110">
                    {stat.animate ? (
                      <AnimatedCounter 
                        value={stat.numericValue || 0}
                        suffix={suffix} 
                        duration={stat.duration || 2000} 
                      />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-gray-400 text-sm transition-all duration-300 group-hover:text-gray-300">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Service Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <span className="text-sm font-semibold text-[#00E6CA] uppercase tracking-wider block text-center mb-2">Comprehensive Solutions</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative text-center">
                Explore Our Services
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#00E6CA] to-transparent"></div>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-center">
                Discover our full range of professional services designed to meet all your home maintenance and improvement needs.
              </p>
            </motion.div>
            <ServiceTabs />
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <span className="text-sm font-semibold text-[#00E6CA] uppercase tracking-wider block text-center mb-2">Quality Assurance</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative text-center">
                Our Certifications
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#00E6CA] to-transparent"></div>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-center">
                We maintain the highest industry standards with our professional certifications and qualifications.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group bg-gradient-to-br from-gray-900/50 to-black border border-[#00E6CA]/10 rounded-xl p-6 hover:border-[#00E6CA]/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,230,202,0.2)]"
                >
                  <div className="w-16 h-16 rounded-full bg-[#00E6CA]/10 flex items-center justify-center mb-6 mx-auto transform transition-all duration-300 group-hover:bg-[#00E6CA]/20 group-hover:scale-110">
                    <Award className="w-8 h-8 text-[#00E6CA] transition-all duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center transition-all duration-300 group-hover:text-[#00E6CA]">{cert.name}</h3>
                  <div className="h-1 w-12 bg-gradient-to-r from-transparent via-[#00E6CA]/50 to-transparent mx-auto mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <p className="text-gray-400 text-sm text-center transition-all duration-300 group-hover:text-gray-300">{cert.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mb-20"
          >
            <WhyChooseUs />
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
            </motion.div>
            <Testimonials />
          </motion.div>

          {/* Trusted Brands Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mb-20"
          >
            <BrandCarousel />
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <span className="text-sm font-semibold text-[#00E6CA] uppercase tracking-wider block text-center mb-2">Common Questions</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative text-center">
                Frequently Asked Questions
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#00E6CA] to-transparent"></div>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-center">
                Find answers to the most common questions about our services, pricing, and processes.
              </p>
            </motion.div>
            <FAQ />
          </motion.div>

          {/* CTA Section with Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="py-16 px-6 rounded-3xl bg-gradient-to-br from-gray-900/80 to-black border border-[#00E6CA]/20"
            id="book"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Our team of licensed professionals is ready to help with all your trade service needs. Book online or call us today for prompt, reliable service.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#00E6CA]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-[#00E6CA]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Licensed Professionals</h3>
                      <p className="text-gray-400">All our technicians are fully licensed and insured.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#00E6CA]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-[#00E6CA]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Satisfaction Guaranteed</h3>
                      <p className="text-gray-400">We stand behind our work with comprehensive warranties.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#00E6CA]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-[#00E6CA]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Transparent Pricing</h3>
                      <p className="text-gray-400">No hidden fees or surprises. We provide upfront quotes.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <Link
                    href="tel:1300123456"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#00E6CA] text-[#00E6CA] font-semibold hover:bg-[#00E6CA]/10 transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now: 1300 123 456
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900/50 to-black border border-[#00E6CA]/20 rounded-2xl p-6 transition-all duration-300 hover:border-[#00E6CA]/40 hover:shadow-[0_0_15px_rgba(0,230,202,0.3)]">
                <div className="mb-4 text-center">
                  <span className="text-sm font-semibold text-[#00E6CA] uppercase tracking-wider">Quick Booking</span>
                  <h3 className="text-2xl font-bold text-white mt-1 mb-2">Request a Service</h3>
                  <p className="text-gray-400 text-sm mb-4">Fill out the form below and we'll get back to you shortly</p>
                </div>
                <BookingForm brandName="HD Trade Services" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 