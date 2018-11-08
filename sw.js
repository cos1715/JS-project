// const cacheName = 'todo-app';

// const cacheFiles = [
//   './',
//   './index.html',
//   './src/scss/components/aside/aside.css',
//   './src/scss/components/checkbox/checkbox.css',
//   './src/scss/components/header/header.css',
//   './src/scss/components/main/main.css',
//   './src/date.js',
//   './src/list.js',
//   './src/image/browser-icon.png',
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



const APP_PREFIX = 'ApplicationName_';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;
const URLS = [
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

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url);
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url);
        return fetch(e.request);
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  );
});

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME);
      return cache.addAll(URLS);
    })
  );
});

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      const cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME);

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i]);
          return caches.delete(keyList[i]);
        }
      }));
    })
  );
});