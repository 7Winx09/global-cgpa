const CACHE_NAME = 'globalcgpa-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.svg',
  '/og-image.png'
];

const CACHE_STRATEGIES = {
  // Cache first for static assets
  static: new Set(['.js', '.css', '.png', '.svg', '.ico', '.woff2', '.woff']),
  // Network first for HTML pages (always fresh)
  html: new Set(['.html', '/'])
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests
  if (url.origin !== location.origin) return;

  // Skip API routes
  if (url.pathname.startsWith('/api/')) return;

  // Determine strategy based on file extension
  const pathname = url.pathname;
  const isStatic = [...CACHE_STRATEGIES.static].some(ext => pathname.endsWith(ext));
  const isHtml = pathname === '/' || pathname.endsWith('.html') || pathname.endsWith('/');

  if (isStatic) {
    // Cache first for static assets
    event.respondWith(cacheFirst(request));
  } else if (isHtml) {
    // Network first for HTML (with cache fallback)
    event.respondWith(networkFirst(request));
  } else {
    // Default: network first
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    // Serve from cache, update in background
    fetch(request).then(response => {
      if (response.ok) cache.put(request, response.clone());
    }).catch(() => {});
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Return offline fallback for HTML
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/');
    }
    throw new Error('Offline');
  }
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    
    // Offline fallback for HTML
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/');
    }
    throw new Error('Offline');
  }
}

// Background sync for lead capture (if needed later)
self.addEventListener('sync', (event) => {
  if (event.tag === 'lead-capture') {
    event.waitUntil(syncLeads());
  }
});

async function syncLeads() {
  // Implement if you add offline lead queue
  console.log('Background sync: lead-capture');
}

// Push notifications (future)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Open' },
      { action: 'close', title: 'Dismiss' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'close') return;
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(event.notification.data.url);
    })
  );
});