'use client';

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Navigation as MobileNavigation } from "@/components/navigation/MobileNavigation";
import { NavBar as DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { navigationItems, actionItems } from "@/lib/navigation";
import { BannerCTA } from "@/components/BannerCTA";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <DesktopNavigation items={navigationItems} actionItems={actionItems} />
      <MobileNavigation items={navigationItems} actionItems={actionItems} />
      <main className="pb-[72px] md:pb-0">{children}</main>
      <Footer />
      <BannerCTA />
    </div>
  );
} 