import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Brisbane 24/7 Emergency Repairs | HD Trade Services",
  description: "Professional plumbing, gas, roofing & air conditioning services in Brisbane. 24/7 emergency repairs by licensed technicians.",
  keywords: "plumbing, gas fitting, roof repairs, air conditioning, Brisbane, emergency repairs, 24/7 service",
  authors: [{ name: "HD Trade Services" }],
  creator: "HD Trade Services",
  publisher: "HD Trade Services",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  metadataBase: new URL("https://hdtradeservices.com.au"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://hdtradeservices.com.au",
    title: "Brisbane 24/7 Emergency Repairs | HD Trade Services",
    description: "Professional plumbing, gas, roofing & air conditioning services in Brisbane. 24/7 emergency repairs by licensed technicians.",
    siteName: "HD Trade Services",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HD Trade Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brisbane 24/7 Emergency Repairs | HD Trade Services",
    description: "Professional plumbing, gas, roofing & air conditioning services in Brisbane. 24/7 emergency repairs by licensed technicians.",
    images: ["/images/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data: *.cdninstagram.com via.placeholder.com *.google-analytics.com; font-src 'self' fonts.gstatic.com fonts.googleapis.com; connect-src 'self' *.google-analytics.com *.analytics.google.com *.googletagmanager.com; frame-src 'self'" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        <link rel="preload" href="/images/hayden-hero-1.webp" as="image" />
        
        <style dangerouslySetInnerHTML={{ __html: `
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
          
          @media (max-width: 767px) {
            html, body {
              position: relative;
              height: 100%;
              overflow-y: auto;
              overflow-x: hidden;
              overscroll-behavior: none;
            }
          }
          
          .content-visibility-auto {
            content-visibility: auto;
            contain-intrinsic-size: 1px 5000px;
          }
        ` }} />
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
