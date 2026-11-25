"use strict";

const CACHE_NAME = "doaa-pharmacy-v5.0";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./contact.html",
  "./payment.html",
  "./style.css?v=5.0",
  "./settings.js?v=5.0",
  "./site-common.js?v=5.0",
  "./index.js?v=5.0",
  "./contact.js?v=5.0",
  "./payment.js?v=5.0",
  "./analytics.js?v=5.0",
  "./manifest.json",
  "./logo.webp",
  "./instapay_logo.webp",
  "./etisalat_logo.webp",
  "./vodafone_cash_logo.webp",
  "./vcard-photo.jpg",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./fonts/cairo-arabic-wght-normal.woff2",
  "./fonts/cairo-latin-wght-normal.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isDynamicAsset(request, url) {
  if (request.mode === "navigate") return true;
  return (
    url.pathname.endsWith(".html") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".json") ||
    url.pathname.endsWith("/")
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isDynamicAsset(request, url)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached =
            (await caches.match(request)) ||
            (await caches.match(request, { ignoreSearch: true }));
          if (cached) return cached;
          if (request.mode === "navigate") {
            return caches.match("./index.html");
          }
          return new Response("", { status: 504, statusText: "Offline" });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
