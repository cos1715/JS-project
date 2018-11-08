this.addEventListener('install', e => {
  e.waitUntil(
    caches.open('todo-app').then(cache => {
      return cache.addAll([
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
      ]);
    })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(() => {
    return fetch(event.request);
  }).then(response => {
    caches.open('todo-app').then(cache => {
      cache.put(event.request, response);
    });
    return response.clone();
  }));
});

this.addEventListener('install', e => {
  e.waitUntil(
    caches.open('todo-app1').then(cache => {
      return cache.addAll([
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
      ]);
    })
  );
});

this.addEventListener('activate', event => {
  const cacheWhitelist = ['todo-app1'];

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});