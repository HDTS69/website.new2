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
            
            {/* Social Media Links */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Link 
                href="https://www.facebook.com/hdtradeservices" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00E6CA] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </Link>
              <Link 
                href="https://www.instagram.com/hd.tradeservices/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00E6CA] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link 
                href="https://www.linkedin.com/company/hd-trade-services" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00E6CA] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
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
