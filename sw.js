const cacheName = 'todo-app';
const cacheFiles = [
  '/Todo-app/',
  '/Todo-app/index.html',
  '/Todo-app/src/scss/components/aside/aside.css',
  '/Todo-app/src/scss/components/checkbox/checkbox.css',
  '/Todo-app/src/scss/components/header/header.css',
  '/Todo-app/src/scss/components/main/main.css',
  '/Todo-app/src/date.js',
  '/Todo-app/src/list.js',
  '/Todo-app/src/image/browser-icon.png',
  'https://fonts.googleapis.com/css?family=Lato|Roboto',
  'https://use.fontawesome.com/releases/v5.4.2/css/all.css',
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
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(thisCacheName => {
        if (thisCacheName !== cacheName) {
          return caches.delete(thisCacheName);
        }
      }));
    })
  );

});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => {
        const requestClone = e.request.clone();

        if (response) {
          return response;
        }

        fetch(requestClone)
          .then(response => {
            const responseClone = response.clone();

            if (!response) {
              return response;
            }
            caches.open(cacheName).then(cache => {
              cache.put(e.request, responseClone);
              return response;
            });
          });
      })
  );
});