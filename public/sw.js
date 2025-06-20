importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);
const CACHE_NAME = "ceritakan-pengalamanmu-cache-v1";
const API_URL = "https://story-api.dicoding.dev/v1/";
workbox.core.skipWaiting();
workbox.core.clientsClaim();
// ✅ Precache Aset Statis
workbox.precaching.precacheAndRoute([
  { url: "/", revision: null },
  { url: "/index.html", revision: null },
  { url: "/offline.html", revision: null },
  { url: "/favicon.png", revision: null },
  { url: "/manifest.json", revision: null },
  { url: "/styles/styles.css", revision: null },
  { url: "/scripts/index.js", revision: null },
  { url: "/scripts/pages/home/app.js", revision: null },
  { url: "/scripts/components/navbar.js", revision: null },
]);
// ???? Runtime caching untuk script & style
workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "assets-cache",
  })
);
// ✅ Cache Font Google Fonts dan Font Awesome
workbox.routing.registerRoute(
  ({ url }) =>
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com" ||
    url.href.includes("font-awesome"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "external-fonts",
  })
);
// ✅ Cache gambar (image) termasuk gambar dari API
workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 hari
      }),
    ],
  })
);
// ✅ Cache untuk data dari Story API
workbox.routing.registerRoute(
  ({ url }) => url.href.startsWith(API_URL),
  new workbox.strategies.NetworkFirst({
    cacheName: "api-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 5 * 60, // 5 menit
      }),
    ],
  })
);
// ✅ Fallback offline untuk navigasi halaman HTML
workbox.routing.setCatchHandler(async ({ event }) => {
  if (event.request.destination === "document") {
    return caches.match("/offline.html");
  }
  return Response.error();
});
// ✅ Push Notification
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "Notifikasi Baru";
  const options = {
    body: data.body || "Kamu menerima notifikasi push.",
    icon: "/images/icons/icon-x144.png",
    badge: "/images/icons/maskable-icon-x48.png",
    data: { url: data.url || "/" },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
// ✅ Aksi saat notifikasi diklik
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsList) => {
        for (const client of clientsList) {
          if (client.url === targetUrl && "focus" in client)
            return client.focus();
        }
        return clients.openWindow(targetUrl);
      })
  );
});
