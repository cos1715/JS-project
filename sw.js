const CACHE_VERSION = 'v1';
const RESOURCES = [
  '/Todo-app/',
  '/Todo-app/index.html',
  '/Todo-app/src/scss/components/index.css',
  '/Todo-app/src/date.js',
  '/Todo-app/src/list.js',
  '/Todo-app/src/image/browser-icon.png',
  'https://fonts.googleapis.com/css?family=Lato|Fredoka+One'
];

const logger = {
  success (...args) {
    console.log(`%c${args.join(' ')}`, 'color: green');
  }
};

const sw = {
  initialize () {
    logger.success('initialize');
    self.addEventListener('install', sw.onInstall);
    self.addEventListener('activate', sw.onActivate);
    self.addEventListener('fetch', sw.onFetch);
  },
  onInstall (event) {
    logger.success('install');

    event.waitUntil(
      caches.open(CACHE_VERSION).then(cache => cache.addAll(RESOURCES))
    );
  },
  onActivate (event) {
    logger.success('activate');

    event.waitUntil(
      caches.open(CACHE_VERSION)
        .then(cache => cache.keys())
        .then(keys => sw.deleteCache(keys))
        .then(() => self.clients.claim())
    );
  },
  deleteCache (names) {
    return Promise.all(
      names
        .filter(cacheName => cacheName !== CACHE_VERSION)
        .map(cacheName => caches.delete(cacheName))
    );
  },
  onFetch (event) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request)
            .then(response => {
              const responseClone = response.clone();
              cache.put(event.request, responseClone);
            });
        });
      }
      ));
  }
};

sw.initialize();
