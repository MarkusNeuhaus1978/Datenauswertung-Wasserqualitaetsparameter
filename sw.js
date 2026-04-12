// Service Worker – Datenauswertung Wasserqualitätsparameter v2
const CACHE = 'wasserqualitaet-v2';
const DATA_CACHE = 'wasserqualitaet-data-v2';

const STATIC = ['./', './index.html', './manifest.json', './favicon.ico',
  './icons/icon-192x192.png', './icons/icon-512x512.png'];

const CDN = [
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/2.0.1/chartjs-plugin-zoom.min.js',
  'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(async c => {
    await c.addAll(STATIC);
    await Promise.allSettled(CDN.map(url =>
      fetch(url, {mode:'cors'}).then(r => r.ok ? c.put(url, r) : null).catch(()=>null)
    ));
    console.log('[SW] Installed v2');
  }));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE && k !== DATA_CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.pathname.includes('/data/')) {
    e.respondWith(networkFirst(e.request, DATA_CACHE)); return;
  }
  if (url.hostname.includes('cdnjs.') || url.hostname.includes('cdn.jsdelivr.') ||
      url.hostname.includes('fonts.')) {
    e.respondWith(cacheFirst(e.request, CACHE)); return;
  }
  if (url.origin === self.location.origin) {
    e.respondWith(cacheFirst(e.request, CACHE)); return;
  }
  e.respondWith(networkFirst(e.request, CACHE));
});

async function cacheFirst(req, name) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) (await caches.open(name)).put(req, res.clone());
    return res;
  } catch { return new Response('Offline', {status:503}); }
}

async function networkFirst(req, name) {
  try {
    const res = await fetch(req);
    if (res.ok) (await caches.open(name)).put(req, res.clone());
    return res;
  } catch {
    const cached = await caches.match(req);
    return cached || new Response('Offline', {status:503});
  }
}
