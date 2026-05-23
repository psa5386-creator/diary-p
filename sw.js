// v4 - 캐시 완전 비활성화
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});
// 캐시 없이 항상 네트워크에서 가져옴
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
