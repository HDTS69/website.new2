import { SparklesCore } from "@/components/ui/SparklesCore";
import Link from "next/link";
import Image from "next/image";

export default function DuctedAC() {
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
            Ducted Air Conditioning
          </h1>
          <p className="standard-subheader">
            Complete ducted air conditioning solutions for whole-home comfort.
            Installation, repairs, and maintenance for efficient climate control throughout your property.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Ducted AC Services</h2>
              
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Professional ducted system installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ducted system repairs and troubleshooting</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ductwork design, installation and repair</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Zone control system installation and configuration</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Regular maintenance and servicing</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <Link
                  href="#book"
                  className="inline-flex items-center px-6 py-3 rounded-xl text-black font-medium bg-gradient-to-r from-[#1CD4A7] via-[#15b38d] to-[#1CD4A7] hover:shadow-lg hover:shadow-[#1CD4A7]/20 transition-all duration-300"
                >
                  Book Ducted AC Service
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
              <h2 className="text-2xl font-bold text-white mb-4">Benefits of Ducted Air Conditioning</h2>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  Ducted air conditioning systems offer numerous advantages for homes and businesses:
                </p>
                <ul className="space-y-2 pl-5 list-disc">
                  <li>Whole-home or building cooling and heating</li>
                  <li>Discreet installation with only vents visible in rooms</li>
                  <li>Zone control for energy efficiency</li>
                  <li>Consistent temperature throughout your property</li>
                  <li>Quieter operation than multiple individual units</li>
                  <li>Central control system for easy management</li>
                  <li>Better air filtration for improved indoor air quality</li>
                  <li>Increased property value</li>
                </ul>
                <p className="mt-4">
                  Our expert team can design and install the perfect ducted system for your property, ensuring optimal comfort and efficiency.
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
                  <span>Ducted AC Vent Image</span>
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
                  <span>Ducted System Installation Image</span>
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
                  <span>Zone Control System Image</span>
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
            Get Ducted AC Quote
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