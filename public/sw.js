importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);
<<<<<<< HEAD

console.log("[SW] Service Worker dimulai...");

const CACHE_NAME = "ceritakan-pengalamanmu-cache-v1";
const API_URL = "https://story-api.dicoding.dev/v1/";

// ✅ Ganti deprecated skipWaiting
self.skipWaiting();
workbox.core.clientsClaim();

=======
const CACHE_NAME = "ceritakan-pengalamanmu-cache-v1";
const API_URL = "https://story-api.dicoding.dev/v1/";
workbox.core.skipWaiting();
workbox.core.clientsClaim();
>>>>>>> e81882fc8e4c9cd67c1372c0c492ddaea05be552
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
<<<<<<< HEAD

// ✅ Runtime caching untuk script & style
=======
// ???? Runtime caching untuk script & style
>>>>>>> e81882fc8e4c9cd67c1372c0c492ddaea05be552
workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "assets-cache",
  })
);
<<<<<<< HEAD

// ✅ Google Fonts dan Font Awesome
=======
// ✅ Cache Font Google Fonts dan Font Awesome
>>>>>>> e81882fc8e4c9cd67c1372c0c492ddaea05be552
workbox.routing.registerRoute(
  ({ url }) =>
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com" ||
    url.href.includes("font-awesome"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "external-fonts",
  })
);
<<<<<<< HEAD

// ✅ Cache gambar (local + dari API)
=======
// ✅ Cache gambar (image) termasuk gambar dari API
>>>>>>> e81882fc8e4c9cd67c1372c0c492ddaea05be552
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
<<<<<<< HEAD

// ✅ Cache data dari Story API
=======
// ✅ Cache untuk data dari Story API
>>>>>>> e81882fc8e4c9cd67c1372c0c492ddaea05be552
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
<<<<<<< HEAD

// ✅ Fallback jika offline
=======
// ✅ Fallback offline untuk navigasi halaman HTML
>>>>>>> e81882fc8e4c9cd67c1372c0c492ddaea05be552
workbox.routing.setCatchHandler(async ({ event }) => {
  if (event.request.destination === "document") {
    return caches.match("/offline.html");
  }
  return Response.error();
});
<<<<<<< HEAD

// ✅ PUSH Notification Handler
self.addEventListener("push", (event) => {
  console.log("[SW] Push event diterima:", event);

=======
// ✅ Push Notification
self.addEventListener("push", (event) => {
>>>>>>> e81882fc8e4c9cd67c1372c0c492ddaea05be552
  const data = event.data?.json() || {};
  const title = data.title || "Notifikasi Baru";
  const options = {
    body: data.body || "Kamu menerima notifikasi push.",
    icon: "/images/icons/icon-x144.png",
    badge: "/images/icons/maskable-icon-x48.png",
<<<<<<< HEAD
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ✅ Klik pada notifikasi
self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notifikasi diklik");
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/";

=======
    data: { url: data.url || "/" },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
// ✅ Aksi saat notifikasi diklik
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";
>>>>>>> e81882fc8e4c9cd67c1372c0c492ddaea05be552
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsList) => {
        for (const client of clientsList) {
<<<<<<< HEAD
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
=======
          if (client.url === targetUrl && "focus" in client)
            return client.focus();
>>>>>>> e81882fc8e4c9cd67c1372c0c492ddaea05be552
        }
        return clients.openWindow(targetUrl);
      })
  );
});
