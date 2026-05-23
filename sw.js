const CACHE = 'kirok-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('firebase') || e.request.url.includes('firebaseio')) return;
  // 항상 네트워크 우선 — 캐시 안 함
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
