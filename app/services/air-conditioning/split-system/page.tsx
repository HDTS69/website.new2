import { SparklesCore } from "@/components/ui/SparklesCore";
import Link from "next/link";
import Image from "next/image";

export default function SplitSystemAC() {
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
            Split System Air Conditioning
          </h1>
          <p className="standard-subheader">
            Complete split system air conditioning solutions for your home or business.
            Installation, repairs, and maintenance for efficient and reliable cooling.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Split System AC Services</h2>
              
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Professional split system installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Split system repairs and troubleshooting</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Regular maintenance and servicing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>System upgrades and replacements</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#1CD4A7] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Multi-head split system solutions</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <Link
                  href="#book"
                  className="inline-flex items-center px-6 py-3 rounded-xl text-black font-medium bg-gradient-to-r from-[#1CD4A7] via-[#15b38d] to-[#1CD4A7] hover:shadow-lg hover:shadow-[#1CD4A7]/20 transition-all duration-300"
                >
                  Book Split System Service
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
              <h2 className="text-2xl font-bold text-white mb-4">Benefits of Split System Air Conditioning</h2>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  Split system air conditioners offer numerous advantages for residential and commercial spaces:
                </p>
                <ul className="space-y-2 pl-5 list-disc">
                  <li>Energy efficient cooling and heating</li>
                  <li>Quiet operation compared to window units</li>
                  <li>Flexible installation options</li>
                  <li>Individual room temperature control</li>
                  <li>No ductwork required, minimizing installation disruption</li>
                  <li>Modern designs that complement your interior</li>
                  <li>Advanced features like WiFi control and air purification</li>
                  <li>Cost-effective for cooling specific zones</li>
                </ul>
                <p className="mt-4">
                  Our team can help you select the perfect split system for your space, ensuring optimal performance and efficiency.
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
                  <span>Split System Indoor Unit Image</span>
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
                  <span>Split System Installation Image</span>
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
                  <span>Multi-Head Split System Image</span>
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
            Get Split System Quote
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