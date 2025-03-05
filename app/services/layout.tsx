'use client';

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { MobileNavigation } from "@/components/mobile";
import { NavBar as DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { navigationItems, actionItems } from "@/lib/navigation";
import { BannerCTA } from "@/components/BannerCTA";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for smooth transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-black" style={{ touchAction: 'pan-x pan-y' }}>
      <Header />
      <DesktopNavigation items={navigationItems} actionItems={actionItems} />
      <MobileNavigation items={navigationItems} actionItems={actionItems} />
      
      {/* Page transition effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <main className="pb-[72px] md:pb-0" style={{ touchAction: 'pan-x pan-y' }}>
            {children}
          </main>
        </motion.div>
      </AnimatePresence>
      
      <Footer />
      <BannerCTA />
      <ScrollToTop />
    </div>
  );
} 