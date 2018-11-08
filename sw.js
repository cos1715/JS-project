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


self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(cacheFiles);
    })
  );
});


self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {
        if (thisCacheName !== cacheName) {
          return caches.delete(thisCacheName);
        }
      }));
    })
  );

});


self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        const requestClone = e.request.clone();

        fetch(requestClone)
          .then(function (response) {

            if (!response) {
              return response;
            }
            const responseClone = response.clone();

            caches.open(cacheName).then(function (cache) {
              cache.put(e.request, responseClone);
              return response;
            });
          });
      })
  );
});
