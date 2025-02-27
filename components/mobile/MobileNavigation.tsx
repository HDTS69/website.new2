'use client';

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, Phone, Calendar, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavItem, BaseNavigationProps } from "@/types/navigation/types"

/**
 * Redesigned Mobile Navigation component with 3 main options:
 * Menu, Call Now, and Book Online
 */
export function Navigation({ items, actionItems = [], className }: BaseNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  
  // Get only main navigation items for the menu overlay
  const mainNavItems = items.filter(item => 
    item.name !== 'Call Now' && 
    item.name !== 'Book Online'
  )

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Toggle expanded state for an item
  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName) 
        : [...prev, itemName]
    )
  }

  // Check if an item has dropdown items
  const hasDropdown = (item: NavItem) => {
    return item.dropdownItems && item.dropdownItems.length > 0
  }

  // Check if an item is expanded
  const isExpanded = (itemName: string) => {
    return expandedItems.includes(itemName)
  }

  return (
    <>
      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-[#005E53]/90 backdrop-blur-md overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20 relative">
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 p-2 text-black"
              >
                <X size={24} />
              </button>
              
              {/* Menu Content - Centered Headings */}
              <div className="flex flex-col items-center justify-center space-y-6 w-full">
                {mainNavItems.map((item) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: mainNavItems.indexOf(item) * 0.1,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                      }
                    }}
                    className="flex flex-col items-center"
                  >
                    {hasDropdown(item) ? (
                      <>
                        <button 
                          onClick={() => toggleExpanded(item.name)}
                          className="text-2xl font-medium text-black hover:opacity-80 transition-opacity"
                        >
                          {item.name}
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded(item.name) && item.dropdownItems && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ 
                                opacity: 1, 
                                height: 'auto',
                                transition: { duration: 0.3 }
                              }}
                              exit={{ 
                                opacity: 0, 
                                height: 0,
                                transition: { duration: 0.2 }
                              }}
                              className="flex flex-col items-center mt-4 space-y-3"
                            >
                              {item.dropdownItems.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.url}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-lg text-black/80 hover:text-black transition-colors"
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link 
                        href={item.url}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-medium text-black hover:opacity-80 transition-opacity"
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bottom Navigation Bar */}
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[60] w-full px-4 pb-4 pt-2",
          "md:hidden", // Hide on desktop since we're using NavBar.tsx
          className,
        )}
      >
        <div className="mx-auto max-w-md border border-[#00E6CA]/20 bg-black/90 backdrop-blur-lg rounded-2xl shadow-lg shadow-[#00E6CA]/10">
          <div className="grid grid-cols-3 gap-1 py-2 px-2">
            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col items-center justify-center gap-1 py-2"
            >
              <Menu size={24} className="text-[#00E6CA]" />
              <span className="text-xs text-white">Menu</span>
            </button>
            
            {/* Call Now Button */}
            <Link
              href="tel:1300420911"
              className="flex flex-col items-center justify-center gap-1 py-2"
            >
              <Phone size={24} className="text-[#00E6CA]" />
              <span className="text-xs text-white">Call Now</span>
            </Link>
            
            {/* Book Online Button */}
            <Link
              href="#booking-form"
              onClick={(e) => {
                e.preventDefault();
                const bookingForm = document.getElementById('booking-form');
                if (bookingForm) {
                  bookingForm.scrollIntoView({ behavior: 'smooth' });
                }
                setIsMenuOpen(false);
              }}
              className="flex flex-col items-center justify-center gap-1 py-2"
            >
              <Calendar size={24} className="text-[#00E6CA]" />
              <span className="text-xs text-white">Book Online</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
} 