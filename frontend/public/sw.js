console.log("Service Worker Loaded...");

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
);

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "./logo512.png",
    image: "./logo512.png",
    actions: [
      {
        action: "open",
        title: "open",
        icon: "./logo512.png"
      },
      {
        action: "new",
        title: "new",
        icon: "./logo512.png"
      },
    ]
  });
});