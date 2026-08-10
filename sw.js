/**
 * SyKaşif Service Worker v3.3.0
 */

const CACHE_NAME = 'sykasif-3.3.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './sykasif-core.js',
  './sykasif-sonar.js',
  './sykasif-ar.js',
  './sykasif-voice.js',
  './sykasif-map.js',
  './sykasif-fishdb.js',
  './sykasif-ai.js',
  './sykasif-ui.js',
  './manifest.json',
  './site.webmanifest',
  './icons/android-chrome-192x192.png',
  './icons/android-chrome-512x512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32x32.png',
  './icons/favicon-16x16.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-maskable.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  e.respondWith(
    fetch(request).then((response) => {
      if (response && response.status === 200 && response.type === 'basic') {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
      }
      return response;
    }).catch(() => {
      return caches.match(request).then((cached) => {
        if (cached) return cached;
        if (request.destination === 'document') return caches.match('./index.html');
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

self.addEventListener('sync', (e) => {
  if (e.tag === 'sync-logs') e.waitUntil(syncLogs());
});

async function syncLogs() {
  const clients = await self.clients.matchAll();
  clients.forEach(client => client.postMessage({ type: 'SYNC_LOGS' }));
}