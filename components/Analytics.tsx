'use client';

import Script from 'next/script';

export function Analytics() {
  return (
    <>
      {/* DebugBear RUM Analytics - Optimized with Next.js Script component */}
      <Script
        id="debugbear-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var dbpr = 10; // Reduced to 10% of users for better performance
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
          `
        }}
      />

      {/* Google Analytics - Placeholder for future implementation */}
      {/* Uncomment and configure when ready to implement Google Analytics
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
      */}
    </>
  );
} 