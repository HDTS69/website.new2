import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://hdtradeservices.com.au"),
  title: {
    default: "HD Trade Services | Brisbane 24/7 Emergency Repairs & Installations",
    template: "%s | HD Trade Services",
  },
  description: "Professional plumbing, gas, roofing & air conditioning services in Brisbane. Fast response. Fair pricing. Guaranteed satisfaction.",
  keywords: ["plumbing", "gas", "roofing", "air conditioning", "Brisbane", "emergency repairs", "installations", "HD Trade Services"],
  authors: [{ name: "Hayden Drew" }],
  creator: "Hayden Drew",
  publisher: "HD Trade Services",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "HD Trade Services | Brisbane 24/7 Emergency Repairs & Installations",
    description: "Professional plumbing, gas, roofing & air conditioning services in Brisbane. Fast response. Fair pricing. Guaranteed satisfaction.",
    url: "https://hdtradeservices.com.au",
    siteName: "HD Trade Services",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://hdtradeservices.com.au/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HD Trade Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HD Trade Services | Brisbane 24/7 Emergency Repairs & Installations",
    description: "Professional plumbing, gas, roofing & air conditioning services in Brisbane. Fast response. Fair pricing. Guaranteed satisfaction.",
    images: ["https://hdtradeservices.com.au/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
  },
  alternates: {
    canonical: "https://hdtradeservices.com.au",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}; 