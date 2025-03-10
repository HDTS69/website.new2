import { SparklesCore } from "@/components/ui/SparklesCore";
import Link from "next/link";
import Image from "next/image";

export default function ACInstallation() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <SparklesCore
          background="transparent"
          minSize={1}
          maxSize={2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.4}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="standard-header">
            Air Conditioning Installation
          </h1>
          <p className="standard-subheader">
            Professional installation services for all types of air conditioning systems.
            Our expert technicians ensure proper setup for optimal performance and efficiency.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Professional AC Installation Services</h2>
              
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Expert installation of all air conditioning brands and models</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Proper sizing and placement for maximum efficiency</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Clean and professional installation with minimal disruption</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Full system testing and commissioning</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Warranty on all installation work</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <Link
                  href="#book"
                  className="inline-flex items-center px-6 py-3 rounded-xl text-black font-medium bg-gradient-to-r from-[#1CD4A7] via-[#15b38d] to-[#1CD4A7] hover:shadow-lg hover:shadow-[#1CD4A7]/20 transition-all duration-300"
                >
                  Book Installation
                  <svg
                    className="ml-2 w-5 h-5"
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
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Why Choose Our Installation Service</h2>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  Our licensed and experienced technicians provide top-quality air conditioning installation services for residential and commercial properties. We ensure your system is installed correctly the first time, maximizing efficiency and lifespan.
                </p>
                <p>
                  We handle all types of air conditioning systems including split systems, ducted systems, multi-head systems, and commercial units. Our team will help you select the right system for your space and ensure it's installed to manufacturer specifications.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Images with Book Now buttons */}
          <div className="space-y-8">
            <div className="relative rounded-2xl overflow-hidden group">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                {/* Replace with your actual image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-500">
                  <span>AC Installation Image</span>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                <Link
                  href="#book"
                  className="inline-flex items-center px-6 py-3 rounded-xl text-black font-medium bg-gradient-to-r from-[#1CD4A7] via-[#15b38d] to-[#1CD4A7] hover:shadow-lg hover:shadow-[#1CD4A7]/20 transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden group">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                {/* Replace with your actual image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-500">
                  <span>AC System Selection Image</span>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                <Link
                  href="#book"
                  className="inline-flex items-center px-6 py-3 rounded-xl text-black font-medium bg-gradient-to-r from-[#1CD4A7] via-[#15b38d] to-[#1CD4A7] hover:shadow-lg hover:shadow-[#1CD4A7]/20 transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden group">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                {/* Replace with your actual image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-500">
                  <span>Completed Installation Image</span>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                <Link
                  href="#book"
                  className="inline-flex items-center px-6 py-3 rounded-xl text-black font-medium bg-gradient-to-r from-[#1CD4A7] via-[#15b38d] to-[#1CD4A7] hover:shadow-lg hover:shadow-[#1CD4A7]/20 transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            href="#book"
            className="inline-flex items-center px-8 py-4 rounded-xl text-black font-medium bg-gradient-to-r from-[#1CD4A7] via-[#15b38d] to-[#1CD4A7] hover:shadow-lg hover:shadow-[#1CD4A7]/20 transition-all duration-300 [animation:glow_3s_ease-in-out_infinite]"
          >
            Schedule Your Installation
            <svg
              className="ml-2 w-5 h-5"
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
          </Link>
        </div>
      </div>
    </div>
  );
} 