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
            -ms-content-zooming: none;
            -ms-touch-action: pan-x pan-y;
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
            box-shadow: 0 0 0 30px rgb(0, 0, 0) inset !important;
            background-color: rgb(0, 0, 0) !important;
            caret-color: #f3f4f6 !important;
            transition: none !important;
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
        
        {/* Preload logo images to prevent warnings */}
        <link rel="preload" href="/images/text-logo.png" as="image" />
        <link rel="preload" href="/images/icon-logo.png" as="image" />
        <link rel="preload" href="/images/hayden-hero-1.webp" as="image" />
      </head>
      <body
        className="font-inter antialiased bg-black"
        suppressHydrationWarning
      >
        <div className="flex min-h-screen flex-col bg-black">
          {children}
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
