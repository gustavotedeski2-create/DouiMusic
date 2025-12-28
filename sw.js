const CACHE = "pato-player-v1";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([
        "./",
        "./index.html"
      ])
    )
  );
});

self.addEventListener("fetch", e => {
  if (e.request.url.endsWith(".mp3") || e.request.url.endsWith(".m4a") || e.request.url.endsWith(".mp4")) {
    e.respondWith(
      caches.open(CACHE).then(async cache => {
        const cached = await cache.match(e.request);
        if (cached) return cached;
        const res = await fetch(e.request);
        cache.put(e.request, res.clone());
        return res;
      })
    );
  }
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
