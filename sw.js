/* Corfu History Walk – service worker.
   Strategy: precache the app shell (cache-first, versioned per deploy),
   cache tour photos on first use, never touch Google Maps requests. */

const BUILD = "__BUILD_ID__"; // replaced with the commit SHA by the deploy workflow
const IS_DEV = BUILD.startsWith("__");
const SHELL_CACHE = `corfu-walk-shell-${BUILD}`;
const IMAGE_CACHE = "corfu-walk-images-v1";

const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./config.js",
  "./images.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      // Bypass the browser HTTP cache (GitHub Pages sends max-age=600) so a new build never precaches stale files.
      .then(cache => cache.addAll(SHELL.map(url => new Request(url, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith("corfu-walk-shell-") && k !== SHELL_CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Google Maps (script, tiles, fonts) must always go to the network.
  if (/(^|\.)(googleapis|gstatic|google)\.com$/.test(url.hostname)) return;

  if (url.origin === self.location.origin) {
    // Local development (placeholder build id): always prefer fresh files.
    event.respondWith(IS_DEV ? networkFirst(request, SHELL_CACHE) : cacheFirst(request, SHELL_CACHE));
    return;
  }

  if (url.hostname === "upload.wikimedia.org" || request.destination === "image") {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
  }
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: cacheName === SHELL_CACHE });
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok || response.type === "opaque") cache.put(request, response.clone());
    return response;
  } catch (error) {
    if (request.mode === "navigate") {
      const shell = await cache.match("./index.html");
      if (shell) return shell;
    }
    throw error;
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    throw error;
  }
}
