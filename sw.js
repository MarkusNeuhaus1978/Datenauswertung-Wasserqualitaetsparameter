// Service Worker – Datenauswertung Wasserqualitätsparameter v5
const CACHE = 'wasserqualitaet-v8';
const DATA_CACHE = 'wasserqualitaet-data-v8';

const CDN = [
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/2.0.1/chartjs-plugin-zoom.min.js',
  'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js',
];

// Install: nur CDN-Libraries cachen – index.html kommt IMMER frisch vom Netz
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async c => {
      await Promise.allSettled(CDN.map(url =>
        fetch(url, {mode:'cors'}).then(r => r.ok ? c.put(url, r) : null).catch(()=>null)
      ));
      console.log('[SW] v5 installed');
    })
  );
  self.skipWaiting();
});

// Activate: ALLE alten Caches löschen
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE && k !== DATA_CACHE)
        .map(k => { console.log('[SW] Lösche alten Cache:', k); return caches.delete(k); }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // index.html: IMMER vom Netz (niemals aus Cache)
  if (url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Messdaten: network-first
  if (url.pathname.includes('/data/')) {
    e.respondWith(networkFirst(e.request, DATA_CACHE)); return;
  }

  // CDN-Scripts: cache-first (versioniert, unveränderlich)
  if (url.hostname.includes('cdnjs.') || url.hostname.includes('cdn.jsdelivr.') ||
      url.hostname.includes('fonts.')) {
    e.respondWith(cacheFirst(e.request, CACHE)); return;
  }

  // Alles andere: network-first
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
