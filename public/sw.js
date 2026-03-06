const CACHE_NAME = 'fitness-planner-v1';
const ASSETS = ['/fitness-planner/', '/fitness-planner/index.html'];

// ── Install & cache shell ──────────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: network first, fallback to cache ────────────────────────────────
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// ── Push notifications ─────────────────────────────────────────────────────
self.addEventListener('push', e => {
  if (!e.data) return;
  let data;
  try { data = e.data.json(); } catch { data = { title: 'Fitness Planner', body: e.data.text() }; }

  const options = {
    body: data.body || '',
    icon: '/fitness-planner/icon-192.png',
    badge: '/fitness-planner/icon-192.png',
    tag: data.tag || 'fitness-planner',
    renotify: true,
    data: { url: data.url || '/fitness-planner/' },
    actions: data.actions || [],
  };

  e.waitUntil(self.registration.showNotification(data.title, options));
});

// ── Notification click ─────────────────────────────────────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url || '/fitness-planner/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cls => {
      const existing = cls.find(c => c.url.includes('fitness-planner'));
      if (existing) return existing.focus();
      return clients.openWindow(url);
    })
  );
});
