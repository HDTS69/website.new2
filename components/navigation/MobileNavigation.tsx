'use client';

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronDown, ChevronRight, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavItem, BaseNavigationProps } from "@/types/navigation/types"

/**
 * Simplified Navigation component that provides a mobile-friendly navigation experience.
 * This component is hidden on desktop as NavBar.tsx handles that view.
 */
export function Navigation({ items, actionItems = [], className }: BaseNavigationProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null)
  const [showFullMenu, setShowFullMenu] = useState(false)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.nav-item')) {
        setOpenDropdown(null)
        setOpenSubDropdown(null)
      }
      
      if (!(event.target as Element).closest('.mobile-menu') && 
          !(event.target as Element).closest('.menu-button')) {
        setShowFullMenu(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleItemClick = (item: NavItem, isDropdownToggle: boolean = false) => {
    if (isDropdownToggle) {
      setOpenDropdown(openDropdown === item.name ? null : item.name)
      setOpenSubDropdown(null)
    } else {
      setActiveTab(item.name)
      setOpenDropdown(null)
      setOpenSubDropdown(null)
      setShowFullMenu(false)
    }
  }

  const handleSubItemClick = (e: React.MouseEvent, itemName: string) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenSubDropdown(openSubDropdown === itemName ? null : itemName)
  }

  // Determine which items to show in the bottom bar vs full menu
  const primaryItems = items.slice(0, 3) // Show first 3 items in bottom bar
  const secondaryItems = items.slice(3) // Rest go in the full menu

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[60] w-full px-4 pb-4 pt-2",
        "md:hidden", // Hide on desktop since we're using NavBar.tsx
        className,
      )}
    >
      <div className="mx-auto max-w-md border border-[#00E6CA]/20 bg-black/90 backdrop-blur-lg rounded-2xl shadow-lg shadow-[#00E6CA]/10">
        <div className="flex items-center justify-between gap-1 py-2 px-2">
          {/* Navigation Items - Bottom Bar */}
          <div className="flex items-center justify-around gap-1 w-full">
            {/* Primary Navigation Items */}
            {primaryItems.map((item) => (
              <NavigationItem
                key={item.name}
                item={item}
                isActive={activeTab === item.name}
                openDropdown={openDropdown}
                openSubDropdown={openSubDropdown}
                onItemClick={handleItemClick}
                onSubItemClick={handleSubItemClick}
              />
            ))}
            
            {/* Menu Button */}
            <button 
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 menu-button",
                "text-gray-400 hover:text-[#00E6CA] transition-all duration-300",
                showFullMenu && "text-[#00E6CA]"
              )}
              onClick={() => setShowFullMenu(!showFullMenu)}
            >
              <Menu size={20} strokeWidth={2} className="flex-shrink-0" />
              <span className="text-[10px] leading-tight text-center">Menu</span>
            </button>
          
            {/* Action Buttons */}
            {actionItems.length > 0 && (
              <>
                {actionItems.map((item) => (
                  <ActionButton key={item.name} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Full Menu Dropdown */}
      <AnimatePresence>
        {showFullMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md py-4 bg-black/90 backdrop-blur-lg border border-[#00E6CA]/20 rounded-xl shadow-xl z-50 mobile-menu"
          >
            <div className="px-4 py-2 border-b border-[#00E6CA]/10 mb-2">
              <h3 className="text-sm font-semibold text-[#00E6CA]">Navigation</h3>
            </div>
            
            <div className="max-h-[50vh] overflow-y-auto">
              {/* Secondary Navigation Items */}
              {secondaryItems.map((item) => (
                <div key={item.name} className="px-4 py-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.url}
                      onClick={() => {
                        setActiveTab(item.name)
                        setShowFullMenu(false)
                      }}
                      className="text-sm font-medium text-gray-400 hover:text-[#00E6CA]"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon size={16} strokeWidth={2} />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                    
                    {item.dropdownItems && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handleItemClick(item, true)
                        }}
                        className={cn(
                          "p-1 text-gray-400 hover:text-[#00E6CA] transition-colors",
                          openDropdown === item.name && "text-[#00E6CA]"
                        )}
                      >
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform duration-200",
                            openDropdown === item.name && "rotate-180"
                          )}
                        />
                      </button>
                    )}
                  </div>
                  
                  {/* Dropdown Items */}
                  <AnimatePresence>
                    {item.dropdownItems && openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pl-6 overflow-hidden"
                      >
                        {item.dropdownItems.map((dropdownItem) => (
                          <div key={dropdownItem.url} className="py-2">
                            <div className="flex items-center justify-between">
                              <Link
                                href={dropdownItem.url}
                                onClick={() => {
                                  setActiveTab(item.name)
                                  setShowFullMenu(false)
                                }}
                                className="text-sm text-gray-400 hover:text-[#00E6CA]"
                              >
                                {dropdownItem.name}
                              </Link>
                              
                              {dropdownItem.subItems && (
                                <button
                                  onClick={(e) => handleSubItemClick(e, dropdownItem.name)}
                                  className={cn(
                                    "p-1 text-gray-400 hover:text-[#00E6CA] transition-colors",
                                    openSubDropdown === dropdownItem.name && "text-[#00E6CA]"
                                  )}
                                >
                                  <ChevronRight
                                    size={14}
                                    className={cn(
                                      "transition-transform duration-200",
                                      openSubDropdown === dropdownItem.name && "rotate-90"
                                    )}
                                  />
                                </button>
                              )}
                            </div>
                            
                            {/* Sub Items */}
                            <AnimatePresence>
                              {dropdownItem.subItems && openSubDropdown === dropdownItem.name && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-1 pl-4 overflow-hidden"
                                >
                                  {dropdownItem.subItems.map((subItem) => (
                                    <Link
                                      key={subItem.url}
                                      href={subItem.url}
                                      onClick={() => {
                                        setActiveTab(item.name)
                                        setShowFullMenu(false)
                                      }}
                                      className="block py-2 text-xs text-gray-400 hover:text-[#00E6CA]"
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

interface NavigationItemProps {
  item: NavItem
  isActive: boolean
  openDropdown: string | null
  openSubDropdown: string | null
  onItemClick: (item: NavItem, isDropdownToggle?: boolean) => void
  onSubItemClick: (e: React.MouseEvent, itemName: string) => void
}

function NavigationItem({
  item,
  isActive,
  openDropdown,
  openSubDropdown,
  onItemClick,
  onSubItemClick,
}: NavigationItemProps) {
  const Icon = item.icon
  const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0

  return (
    <div className="relative nav-item">
      <div className="flex items-center">
        <button
          onClick={() => onItemClick(item)}
          className={cn(
            "flex flex-col items-center gap-0.5 px-2 py-1",
            "text-gray-400 hover:text-[#00E6CA] transition-all duration-300",
            isActive && "text-[#00E6CA]"
          )}
        >
          <Icon size={20} strokeWidth={2} className="flex-shrink-0" />
          <span className="text-[10px] leading-tight text-center">{item.name}</span>
        </button>
        {hasDropdown && (
          <button
            onClick={(e) => {
              e.preventDefault()
              onItemClick(item, true)
            }}
            className={cn(
              "flex items-center text-gray-400 hover:text-[#00E6CA] transition-colors",
              openDropdown === item.name && "text-[#00E6CA]"
            )}
          >
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform duration-200",
                openDropdown === item.name && "rotate-180"
              )}
            />
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {hasDropdown && openDropdown === item.name && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md py-2 bg-black/90 backdrop-blur-lg border border-[#00E6CA]/20 rounded-xl shadow-xl z-50"
          >
            <DropdownContent
              item={item}
              openSubDropdown={openSubDropdown}
              onItemClick={onItemClick}
              onSubItemClick={onSubItemClick}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Indicator */}
      {isActive && !item.isHighlighted && (
        <motion.div
          layoutId="lamp"
          className="absolute inset-0 w-full bg-[#00E6CA]/5 rounded-full -z-10"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
      )}
    </div>
  )
}

interface DropdownContentProps {
  item: NavItem
  openSubDropdown: string | null
  onItemClick: (item: NavItem) => void
  onSubItemClick: (e: React.MouseEvent, itemName: string) => void
}

function DropdownContent({
  item,
  openSubDropdown,
  onItemClick,
  onSubItemClick,
}: DropdownContentProps) {
  return (
    <>
      <div className="px-4 py-2 border-b border-[#00E6CA]/10 mb-1">
        <Link
          href={item.url}
          onClick={() => onItemClick(item)}
          className="text-sm font-semibold text-[#00E6CA] hover:text-[#00E6CA] hover:[text-shadow:0_0_10px_rgba(0,230,202,0.5)]"
        >
          {item.name}
        </Link>
      </div>
      {item.dropdownItems?.map((dropdownItem) => (
        <div key={dropdownItem.url} className="relative">
          <div className="flex items-center justify-between px-4 py-2">
            <Link
              href={dropdownItem.url}
              onClick={() => onItemClick(item)}
              className="flex-1 text-sm text-gray-400 hover:text-[#00E6CA] transition-colors"
            >
              {dropdownItem.name}
            </Link>
            {dropdownItem.subItems && (
              <button
                onClick={(e) => onSubItemClick(e, dropdownItem.name)}
                className={cn(
                  "p-1 text-gray-400 hover:text-[#00E6CA] transition-colors",
                  openSubDropdown === dropdownItem.name && "text-[#00E6CA]"
                )}
              >
                <ChevronRight
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    openSubDropdown === dropdownItem.name && "rotate-90"
                  )}
                />
              </button>
            )}
          </div>

          {/* Sub Dropdown */}
          <AnimatePresence>
            {dropdownItem.subItems && openSubDropdown === dropdownItem.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white/5 mx-2 rounded-lg overflow-hidden"
              >
                {dropdownItem.subItems.map((subItem) => (
                  <Link
                    key={subItem.url}
                    href={subItem.url}
                    onClick={() => onItemClick(item)}
                    className="block px-4 py-2 text-sm text-gray-400 hover:text-[#00E6CA] hover:bg-white/5 transition-colors"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </>
  )
}

function ActionButton({ item }: { item: NavItem }) {
  const Icon = item.icon
  
  return (
    <Link
      href={item.url}
      onClick={item.onClick}
      className={cn(
        "flex flex-col items-center gap-0.5 px-2 py-1",
        "text-gray-400 hover:text-[#00E6CA] transition-all duration-300",
        item.isHighlighted ? "text-[#00E6CA] [text-shadow:0_0_10px_rgba(0,230,202,0.5)] hover:[text-shadow:0_0_20px_rgba(0,230,202,0.8)]" : ""
      )}
    >
      <Icon size={20} strokeWidth={2} className="flex-shrink-0" />
      <span className="text-[10px] leading-tight text-center">{item.name}</span>
    </Link>
  )
} 