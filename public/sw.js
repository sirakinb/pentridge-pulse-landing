const CACHE_NAME = 'pentridge-media-v3';
const urlsToCache = [
  // Do not cache HTML pages to avoid serving stale index.html
  '/logo.png',
  '/logonew.png',
  '/logop.png',
  '/favicon.ico',
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Always network-first for navigation (HTML) to avoid blank page from stale cache
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        return cache.match('/index.html');
      })
    );
    return;
  }

  // For assets, try cache first then network
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
}); 