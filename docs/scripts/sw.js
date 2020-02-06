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
    '/app-dev-cw2/docs/',
    '/app-dev-cw2/docs/index.html',
    '/app-dev-cw2/docs/scripts/main.js',
    '/app-dev-cw2/docs/scripts/vue.js',
    '/app-dev-cw2/docs/scripts/bootstrap.min.css',
    '/app-dev-cw2/docs/scripts/bulma.min.css',
    '/app-dev-cw2/docs/stylesheets/styles.css',
    '/app-dev-cw2/docs/images/mdx.png'
];



