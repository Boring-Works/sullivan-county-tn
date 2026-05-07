/**
 * Sullivan County TN — Service Worker
 *
 * Adapted from where-tennessee-began. Strategy:
 *   - Pre-cache emergency-critical pages on install (so storm scenarios work
 *     offline: home, property-taxes, contact, calendar, EMA, sheriff, weather).
 *   - Cache-first for fonts (Google Fonts).
 *   - Network-first with Navigation Preload for HTML routes; falls back to
 *     /offline.html when truly offline.
 *   - Cache-first for images with eviction cap.
 *   - Stale-while-revalidate for everything else.
 *
 * Bump SW_VERSION on each deploy that changes the precache list.
 */
const SW_VERSION = "scn-v1";
const CACHE_NAME = `scn-shell-${SW_VERSION}`;
const FONT_CACHE = "scn-fonts-v1";
const IMAGE_CACHE = "scn-images-v1";
const IMAGE_MAX_ENTRIES = 200;

// Pre-cache the emergency-critical pages so they work without a connection.
// Citizens losing signal during a storm need EMA + Sheriff + Property Taxes
// + Calendar + Weather still rendering.
const STATIC_ASSETS = [
  "/",
  "/property-taxes",
  "/contact",
  "/calendar",
  "/weather",
  "/departments/emergency-management",
  "/departments/sheriff",
  "/offline.html",
  "/manifest.webmanifest",
  "/images/seal/sullivan-seal.svg",
];

// Install: pre-cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch(() => {
        // Some assets may 404 in dev — don't block install on partial failure.
      }),
  );
  self.skipWaiting();
});

// Activate: clean old caches + enable Navigation Preload
self.addEventListener("activate", (event) => {
  const keep = new Set([CACHE_NAME, FONT_CACHE, IMAGE_CACHE]);
  event.waitUntil(
    Promise.all([
      caches
        .keys()
        .then((keys) => Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k)))),
      self.registration.navigationPreload
        ? self.registration.navigationPreload.enable()
        : Promise.resolve(),
    ]),
  );
  self.clients.claim();
});

async function trimImageCache() {
  const cache = await caches.open(IMAGE_CACHE);
  const keys = await cache.keys();
  if (keys.length <= IMAGE_MAX_ENTRIES) return;
  const toDelete = keys.length - IMAGE_MAX_ENTRIES;
  for (let i = 0; i < toDelete; i++) {
    await cache.delete(keys[i]);
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = request.url;

  if (request.method !== "GET") return;

  // Google Fonts: cache-first with dedicated font cache
  if (
    url.startsWith("https://fonts.googleapis.com/") ||
    url.startsWith("https://fonts.gstatic.com/")
  ) {
    event.respondWith(
      caches.match(request, { cacheName: FONT_CACHE }).then(
        (cached) =>
          cached ||
          fetch(request)
            .then((response) => {
              if (response.ok) {
                const clone = response.clone();
                caches.open(FONT_CACHE).then((cache) => cache.put(request, clone));
              }
              return response;
            })
            .catch(() => new Response("", { status: 408 })),
      ),
    );
    return;
  }

  // Navigation requests: network-first w/ Navigation Preload, /offline.html fallback
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) return preloadResponse;
          return await fetch(request);
        } catch {
          const cached = await caches.match(request);
          return (
            cached ||
            (await caches.match("/offline.html")) ||
            new Response("Offline", { status: 503 })
          );
        }
      })(),
    );
    return;
  }

  // Images: cache-first with size cap
  if (request.destination === "image") {
    event.respondWith(
      caches.match(request, { cacheName: IMAGE_CACHE }).then(
        (cached) =>
          cached ||
          fetch(request)
            .then((response) => {
              if (response.ok) {
                const clone = response.clone();
                caches.open(IMAGE_CACHE).then((cache) => {
                  cache.put(request, clone);
                  trimImageCache();
                });
              }
              return response;
            })
            .catch(() => new Response("", { status: 408 })),
      ),
    );
    return;
  }

  // Everything else: stale-while-revalidate
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached || new Response("", { status: 408 }));
      return cached || fetchPromise;
    }),
  );
});
