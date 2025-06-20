import App from "./pages/app";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });

  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });

  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("SW terdaftar:", registration);
    } catch (err) {
      console.error("SW gagal daftar:", err);
    }
  }

  if ("Notification" in window && Notification.permission !== "granted") {
    const allow = confirm("Izinkan notifikasi dari aplikasi ini?");
    if (allow) Notification.requestPermission();
  }
});
