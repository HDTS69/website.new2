'use client';

import Script from 'next/script';

export default function ClientAnalytics() {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID"
            strategy="lazyOnload"
            id="gtag-script"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MEASUREMENT_ID', {
                send_page_view: false
              });
              // Only send page view after page has fully loaded
              window.addEventListener('load', () => {
                setTimeout(() => {
                  gtag('event', 'page_view');
                }, 1000);
              });
            `}
          </Script>
        </>
      )}
      
      {/* DebugBear RUM Analytics for web vitals monitoring */}
      <Script id="debugbear-analytics" strategy="afterInteractive">
        {`
          (function(){
            var dbpr=100;
            if(Math.random()*100>100-dbpr){
              var d="dbbRum",w=window,o=document,a=addEventListener,scr=o.createElement("script");
              scr.async=!0;
              w[d]=w[d]||[];
              w[d].push(["presampling",dbpr]);
              ["error","unhandledrejection"].forEach(function(t){
                a(t,function(e){w[d].push([t,e])});
              });
              scr.src="https://cdn.debugbear.com/bhE8e4HnfxsA.js";
              o.head.appendChild(scr);
            }
          })()
        `}
      </Script>
    </>
  );
} 