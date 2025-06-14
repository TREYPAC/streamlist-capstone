// public/service-worker.js
self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
});

self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetch', event.request.url);
});
