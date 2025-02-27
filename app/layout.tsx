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
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

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
          }
          
          html {
            height: 100%;
            margin: 0;
            padding: 0;
          }

          body {
            background-color: rgb(0, 0, 0);
            min-height: 100%;
            margin: 0;
            padding: 0;
            -webkit-overflow-scrolling: touch;
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
        `}</style>
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
