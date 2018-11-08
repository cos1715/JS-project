const cacheName = 'todo-app';

const cacheFiles = [
  './',
  './index.html',
  './src/scss/components/aside/aside.css',
  './src/scss/components/checkbox/checkbox.css',
  './src/scss/components/header/header.css',
  './src/scss/components/main/main.css',
  './src/date.js',
  './src/list.js',
  './src/image/browser-icon.png',
  'https://fonts.googleapis.com/css?family=Lato|Roboto'
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
