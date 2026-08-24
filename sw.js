
const APP_CACHE = 'sursand-connect-app-v103';
const DATA_CACHE = 'sursand-connect-data-v1';

const API_BASE =
  'https://script.google.com/macros/s/AKfycbzrDLNOj56LEjyLuf4PJiBsH5s36RgRi6y55NjjVJtxvRjFPUMdcXLsOK4ojNUssdNX/exec';

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './app-i18n.js',
  './app-i18n-extra.js',
  './offline-data.js',
  './app-notifications.js',
  './home-popup.js',
  './app-account.js',
  './p/businesses.html',
  './p/services.html',
  './p/healthcare.html',
  './p/education.html',
  './p/transport.html',
  './p/important-places.html',
  './p/government-offices.html',
  './p/events.html',
  './p/city-connect.html',
  './p/representatives.html',
  './p/emergency.html',
  './p/useful-websites.html',
  './p/change-makers.html',
  './p/business-registration.html',
  './p/charity.html',
  './p/complaints.html',
  './p/jobs.html',
  './p/weather.html',
  './p/notifications.html',
  './p/about.html',
  './p/contact.html',
  './p/settings.html',
  './p/account.html',
  './p/admin.html',
  './account-admin-i18n.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then(cache => cache.addAll(CORE_ASSETS))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key =>
            key.startsWith('sursand-connect-app-') &&
            key !== APP_CACHE
          )
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

function isAppsScriptRequest(request) {
  try {
    const url = new URL(request.url);
    return (
      url.hostname === 'script.google.com' ||
      url.hostname === 'script.googleusercontent.com'
    );
  } catch (_) {
    return false;
  }
}

async function notifyClients() {
  const clientsList = await self.clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
  });

  const payload = {
    type: 'SC_DATA_UPDATED',
    timestamp: new Date().toISOString()
  };

  clientsList.forEach(client => client.postMessage(payload));
}

async function dataStaleWhileRevalidate(request) {
  const cache = await caches.open(DATA_CACHE);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then(async response => {
      if (response && response.ok) {
        await cache.put(request, response.clone());
        notifyClients().catch(() => {});
      }
      return response;
    })
    .catch(() => null);

  // Fastest experience after first successful online load:
  // show locally stored data immediately, update it in background.
  if (cached) {
    networkPromise.catch(() => {});
    return cached;
  }

  // First-ever load has no local data yet, so wait for network.
  const network = await networkPromise;
  if (network) return network;

  // If the exact API URL was not previously cached, try the main
  // all-data snapshot as an offline fallback.
  const canonical = await cache.match(API_BASE + '?action=all');
  if (canonical) return canonical;

  return new Response(
    JSON.stringify({
      success: false,
      offline: true,
      error: 'No saved Sursand Connect data is available on this device yet.'
    }),
    {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

async function appCacheFirst(request) {
  const cache = await caches.open(APP_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    // Refresh static page silently in background.
    fetch(request)
      .then(response => {
        if (response && response.ok) {
          cache.put(request, response.clone());
        }
      })
      .catch(() => {});
    return cached;
  }

  try {
    const response = await fetch(request);
    if (
      response &&
      response.ok &&
      new URL(request.url).origin === self.location.origin
    ) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (_) {
    if (request.mode === 'navigate') {
      return (
        await cache.match(request) ||
        await cache.match('./index.html') ||
        await cache.match('./')
      );
    }
    throw _;
  }
}

async function refreshMainData() {
  const url = API_BASE + '?action=all';
  const cache = await caches.open(DATA_CACHE);

  try {
    const response = await fetch(url, {
      cache: 'no-store'
    });

    if (response && response.ok) {
      await cache.put(url, response.clone());
      await notifyClients();
    }
  } catch (_) {
    // Stay silent while offline.
  }
}

self.addEventListener('message', event => {
  const data = event.data || {};

  if (data.type === 'SC_REFRESH_DATA') {
    event.waitUntil(refreshMainData());
  }

  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  if (isAppsScriptRequest(request)) {
    event.respondWith(
      dataStaleWhileRevalidate(request)
    );
    return;
  }

  event.respondWith(
    appCacheFirst(request)
  );
});

self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const url=(event.notification.data&&event.notification.data.url)||'./p/events.html';
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const c of list){if('focus'in c){c.navigate(url);return c.focus()}}
    if(clients.openWindow)return clients.openWindow(url);
  }));
});
