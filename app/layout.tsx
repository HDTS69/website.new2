import { CriticalCSS } from '../components/CriticalCSS';
import criticalCssData from '../lib/criticalCssData';
import FontPreload from '../components/FontPreload';
import ResourceHints from '../components/ResourceHints';
import ServiceWorkerRegistration from '../components/ServiceWorkerRegistration';
import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import Script from 'next/script';
import StyledComponentsRegistry from '../components/StyledComponentsRegistry';
import ClientAnalytics from '../components/ClientAnalytics';

// Optimize font loading with display swap and preload
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Critical CSS for faster rendering */}
        <CriticalCSS css={criticalCssData["/"]} isMobile={false} />
        
        {/* Font preloading */}
        <FontPreload />
        
        {/* Resource hints for third-party domains */}
        <ResourceHints />
        
        {/* HTTP/2 Server Push hints - using correct Next.js font path */}
        <link rel="preload" href="/_next/static/media/a34f9d1faa5f3315-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Preload hero images with correct attributes */}
        <link 
          rel="preload" 
          href="/images/hayden-hero-1.webp" 
          as="image" 
          type="image/webp" 
          media="(min-width: 769px)" 
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          href="/images/hayden-hero-mobile.webp" 
          as="image" 
          type="image/webp" 
          media="(max-width: 768px)" 
          fetchPriority="high"
        />
        
        {/* Favicon links */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Performance optimization meta tags */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta httpEquiv="Cache-Control" content="max-age=31536000" />
      </head>
      <body className="bg-black text-white">
        <StyledComponentsRegistry>
          {children}
          <ScrollToTop />
          
          {/* Service Worker Registration */}
          <ServiceWorkerRegistration />
          
          {/* Client-side analytics */}
          <ClientAnalytics />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
