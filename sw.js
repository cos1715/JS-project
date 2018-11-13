const cacheName = 'todo-app';
const cacheFiles = [
  '/Todo-app/',
  '/Todo-app/index.html',
  '/Todo-app/src/scss/components/index.css',
  '/Todo-app/src/date.js',
  '/Todo-app/src/list.js',
  '/Todo-app/src/image/browser-icon.png',
  'https://fonts.googleapis.com/css?family=Lato|Fredoka+One'
];


self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.keys())
      .then(keys => deleteCache(keys))
      .then(() => self.clients.claim())
  );
});

const deleteCache = names => {
  return Promise.all(
    names
      .filter(cacheName => cacheName !== cacheName)
      .map(cacheName => caches.delete(cacheName))
  );
};

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(cacheName).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request)
          .then(response => {
            const responseClone = response.clone();
            cache.put(event.request, responseClone);
          });
      });
    }
    )
  );
});
