// const cacheName = 'todo-app';
// const cacheFiles = [
//   '/Todo-app/',
//   '/Todo-app/index.html',
//   '/Todo-app/src/scss/components/aside/aside.css',
//   '/Todo-app/src/scss/components/checkbox/checkbox.css',
//   '/Todo-app/src/scss/components/header/header.css',
//   '/Todo-app/src/scss/components/main/main.css',
//   '/Todo-app/src/date.js',
//   '/Todo-app/src/list.js',
//   '/Todo-app/src/image/browser-icon.png',
//   'https://fonts.googleapis.com/css?family=Lato|Roboto',
//   'https://use.fontawesome.com/releases/v5.4.2/css/all.css'
// ];


// self.addEventListener('install', e => {
//   e.waitUntil(
//     caches.open(cacheName).then(cache => {
//       return cache.addAll(cacheFiles);
//     })
//   );
// });

// self.addEventListener('activate', e => {
//   e.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(cacheNames.map(thisCacheName => {
//         if (thisCacheName !== cacheName) {
//           return caches.delete(thisCacheName);
//         }
//       }));
//     })
//   );

// });

// self.addEventListener('fetch', e => {
//   e.respondWith(
//     caches.match(e.request)
//       .then(response => {
//         const requestClone = e.request.clone();

//         if (response) {
//           return response;
//         }

//         fetch(requestClone)
//           .then(response => {
//             const responseClone = response.clone();

//             if (!response) {
//               return response;
//             }
//             caches.open(cacheName).then(cache => {
//               cache.put(e.request, responseClone);
//               return response;
//             });
//           });
//       })
//   );
// });


const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
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
  'https://use.fontawesome.com/releases/v5.4.2/css/all.css'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});