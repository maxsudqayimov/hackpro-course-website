const CACHE_NAME = 'hackpro-app-v2';
const APP_SHELL = [
  '/',
  '/platform',
  '/platform.html',
  '/admin',
  '/admin.html',
  '/offline.html',
  '/site.webmanifest',
  '/favicon.ico',
  '/favicon-48x48.png',
  '/favicon.png',
  '/hackpro-academy-apple-touch.png',
  '/static/css/style.css',
  '/static/css/lms.css',
  '/static/js/main.js',
  '/static/js/platform.js',
  '/static/js/admin.js',
  '/static/js/pwa.js',
  '/static/img/hackpro-logo-transparent.png',
  '/static/img/hackpro-academy-icon.png',
  '/static/img/hero_bg.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/offline.html'))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    }),
  );
});
