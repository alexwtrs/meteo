const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '/',
    'miami.html',
    '/styles/main.css',
    '/img/logo.png',
    '/img/pluie.png',
    '/img/soleil.png',
    '/weatherparis.json',
    '/weathermiami.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Si la réponse est en cache, on la retourne.
          if (response) {
            return response;
          }
  
          // Sinon, on envoie la requête vers le réseau.
          return fetch(event.request);
        })
    );
  });
  