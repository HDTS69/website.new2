// Service Worker for caching and offline support
const CACHE_NAME = 'website-cache-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/images/placeholder.webp',
  '/favicon.ico',
  // Add other critical assets here
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network-first strategy with fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and browser extensions
  if (
    event.request.method !== 'GET' ||
    event.request.url.startsWith('chrome-extension') ||
    event.request.url.includes('extension') ||
    // Skip analytics and tracking requests
    event.request.url.includes('google-analytics') ||
    event.request.url.includes('googletagmanager')
  ) {
    return;
  }

  // For HTML pages - network first, then cache
  if (event.request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((response) => {
            if (response) {
              return response;
            }
            // If no cache match, return the offline page
            return caches.match('/');
          });
        })
    );
    return;
  }

  // For images - cache first, then network
  if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return fetchResponse;
        }).catch(() => {
          // Return placeholder for images
          return caches.match('/images/placeholder.webp');
        });
      })
    );
    return;
  }

  // For other assets - stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response immediately
      if (response) {
        // Fetch new version in background
        fetch(event.request).then((fetchResponse) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
          });
        }).catch(() => {
          console.log('Failed to update cache for:', event.request.url);
        });
        return response;
      }

      // If not in cache, fetch from network
      return fetch(event.request).then((fetchResponse) => {
        const responseClone = fetchResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return fetchResponse;
      }).catch((error) => {
        console.error('Fetch failed:', error);
        // For JS/CSS files, return a fallback
        if (event.request.url.match(/\.(js|css)$/)) {
          return new Response('/* No data available */', {
            headers: { 'Content-Type': 'application/javascript' }
          });
        }
        return new Response('Network error occurred', {
          status: 408,
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
}); 