"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Copy, ChevronDown } from "lucide-react";
import { AnimatedButton } from './AnimatedButton';

interface CopyButtonProps {
  text: string;
  type: 'email' | 'phone';
}

function CopyButton({ text, type }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "h-6 w-6 border-0 bg-transparent disabled:opacity-100",
        copied ? "text-emerald-500" : "text-gray-400 hover:text-[#1CD4A7]"
      )}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      disabled={copied}
    >
      <div
        className={cn(
          "transition-all",
          copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      >
        <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
      </div>
      <div
        className={cn(
          "absolute transition-all",
          copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Copy className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
      </div>
    </Button>
  );
}

function OpeningHours() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors w-full py-1"
      >
        <svg className="w-4 h-4 flex-shrink-0 text-[#1CD4A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="flex-1 text-left inline-flex items-center">Opening Hours <span className="text-[#1CD4A7] text-sm ml-1">24/7</span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-200 ml-0.5",
            isOpen ? "transform rotate-180" : ""
          )} 
        /></span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-2 pb-1 space-y-2 text-sm">
            {[
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday'
            ].map((day) => (
              <div 
                key={day}
                className="flex items-center justify-between py-1"
              >
                <span className="text-gray-400">{day}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">24 Hours</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const footerLinks = [
  {
    title: 'Services',
    links: [
      { name: 'Plumbing', href: '/services/plumbing' },
      { name: 'Gas Fitting', href: '/services/gas-fitting' },
      { name: 'Hot Water Systems', href: '/services/hot-water-systems' },
      { name: 'Roof Repairs', href: '/services/roof-repairs' },
      { name: 'Air Conditioning', href: '/services/air-conditioning' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Reviews', href: '/reviews' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: '24/7 Emergency', href: '/emergency' },
      { name: 'Insurance', href: '/insurance' },
      { name: 'Special Offers', href: '/special-offers' },
      { name: 'Payment Options', href: '/payment-options' },
      { name: 'FAQs', href: '/faqs' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Warranty', href: '/warranty' },
      { name: 'Sitemap', href: '/sitemap' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-black">
      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-16 text-black/90" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z" fill="currentColor" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-8">
          {/* HD Trade Services Section */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white relative inline-block">
                HD Trade Services
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-[#00E6CA] to-transparent"></span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400">
                  <svg className="w-4 h-4 flex-shrink-0 text-[#00E6CA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <button 
                    onClick={() => window.location.href = 'tel:1300420911'} 
                    className="hover:text-white transition-colors"
                  >
                    1300 420 911
                  </button>
                  <CopyButton text="1300420911" type="phone" />
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <svg className="w-4 h-4 flex-shrink-0 text-[#00E6CA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <Link href="mailto:admin@hdtradeservices.com.au" className="hover:text-white transition-colors truncate block">
                      admin@hdtradeservices.com.au
                    </Link>
                  </div>
                  <CopyButton text="admin@hdtradeservices.com.au" type="email" />
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <svg className="w-4 h-4 flex-shrink-0 text-[#00E6CA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Brisbane, QLD</span>
                </li>
                <li>
                  <OpeningHours />
                </li>
                <li className="text-sm text-gray-400 mt-6 space-y-1.5">
                  <p className="text-[#00E6CA] mb-3">Licensed & Certified</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">QBCC:</span>
                    <span>15371385</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">ARC:</span>
                    <span>L176115</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">ABN:</span>
                    <span>14 665 456 182</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="text-lg font-semibold text-white relative inline-block">
                {section.title}
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-[#00E6CA] to-transparent"></span>
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#00E6CA] transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-[60px] h-[60px] opacity-20 hover:opacity-30 transition-opacity duration-500">
              <Image
                src="/images/icon-logo.png"
                alt="Footer Logo"
                fill
                sizes="(max-width: 768px) 48px, 64px"
                className="object-contain"
                priority
              />
            </div>
            <p className="text-gray-500 text-sm mt-4">
              © {new Date().getFullYear()} HD Trade Services. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden transform rotate-180">
        <svg className="absolute bottom-0 w-full h-16 text-black/90" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z" fill="currentColor" />
        </svg>
      </div>
    </footer>
  );
}
