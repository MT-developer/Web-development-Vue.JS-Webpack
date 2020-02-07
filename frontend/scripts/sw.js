self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(appShellFiles);
        })
    );
});

var cacheName = 'CW2';
var appShellFiles = [
    '/app-dev-cw2/frontend/',
    '/app-dev-cw2/frontend/index.html',
    '/app-dev-cw2/frontend/scripts/main.js',
    '/app-dev-cw2/frontend/scripts/vue.js',
    '/app-dev-cw2/frontend/stylesheets/bootstrap.min.css',
    '/app-dev-cw2/frontend/stylesheets/bulma.min.css',
    '/app-dev-cw2/frontend/stylesheets/styles.css',
    '/app-dev-cw2/frontend/images/mdx.png'
];


self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(appShellFiles);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
});