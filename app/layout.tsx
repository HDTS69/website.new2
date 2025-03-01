import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Brisbane 24/7 Emergency Repairs",
  description: "Professional plumbing, gas, roofing & air conditioning services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            color-scheme: dark;
            touch-action: pan-x pan-y;
          }
          
          html {
            height: 100%;
            margin: 0;
            padding: 0;
            touch-action: pan-x pan-y;
          }

          body {
            background-color: rgb(0, 0, 0);
            min-height: 100%;
            margin: 0;
            padding: 0;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-x pan-y;
          }

          * {
            box-sizing: border-box;
          }

          input, textarea {
            background-color: rgb(0, 0, 0) !important;
            -webkit-text-fill-color: #f3f4f6 !important;
            color: #f3f4f6 !important;
            transition: none !important;
          }

          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active,
          textarea:-webkit-autofill {
            -webkit-text-fill-color: #f3f4f6 !important;
            -webkit-box-shadow: 0 0 0 30px rgb(0, 0, 0) inset !important;
            background-color: rgb(0, 0, 0) !important;
            caret-color: #f3f4f6 !important;
          }
          
          /* Fix for DevTools mobile scrolling */
          @media (max-width: 767px) {
            html, body {
              position: relative;
              height: 100%;
              overflow-y: auto;
              overflow-x: hidden;
              overscroll-behavior: none;
            }
          }
        `}</style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimum-scale=1.0, viewport-fit=cover" />
        
        {/* 
          Preload critical images used in the Hero components.
          These images are intentionally preloaded for better performance
          and are used immediately when the page loads.
        */}
        <link 
          rel="preload" 
          href="/images/text-logo.webp" 
          as="image" 
          type="image/webp" 
          fetchPriority="high" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/images/icon-logo.webp" 
          as="image" 
          type="image/webp" 
          fetchPriority="high" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/images/hayden-hero-1.webp" 
          as="image" 
          type="image/webp" 
          fetchPriority="high" 
          crossOrigin="anonymous" 
        />
        
        {/* DebugBear RUM Analytics - Reduced to 10% of users for better performance */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var dbpr = 10; // Reduced from 100 to 10% of users
            if (Math.random() * 100 > 100 - dbpr) {
              var d = "d bbRum";
              var w = window;
              var o = document;
              var a = addEventListener;
              var scr = o.createElement("script");
              scr.async = true;
              w[d] = w[d] || [];
              w[d].push(["presampling", dbpr]);
              ["error", "unhandledrejection"].forEach(function(t) {
                a(t, function(e) {
                  w[d].push([t, e]);
                });
              });
              scr.src = "https://cdn.debugbear.com/bhE8e4HnfxsA.js";
              o.head.appendChild(scr);
            }
          })();
        `}} />
      </head>
      <body
        className="font-inter antialiased bg-black"
        suppressHydrationWarning
      >
        <div className="flex min-h-screen flex-col">
          {children}
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
