const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route resources defined in the '__WB_MANIFEST' array
precacheAndRoute(self.__WB_MANIFEST);

// Create a CacheFirst caching strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache', 
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200], 
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, 
    }),
  ],
});


warmStrategyCache({
  urls: ['/index.html', '/'], 
  strategy: pageCache, 
});

// Register a route for navigation requests (navigate) using the pageCache strategy
registerRoute(
  ({ request }) => request.mode === 'navigate', 
  pageCache 
);

// Register a route for specific file types using the CacheFirst strategy
registerRoute(
  /\.(txt|docx|pdf|html|png|jpe?g|gif|json)$/, // Match specified file extensions
  new CacheFirst({
    cacheName: 'asset-cache', 
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200], 
      }),
      new ExpirationPlugin({
        maxEntries: 50, 
        maxAgeSeconds: 7 * 24 * 60 * 60, // Cache assets for 7 days
      }),
    ],
  })
);
