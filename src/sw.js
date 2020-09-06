// install service worker
self.addEventListener('install', evt => {
    console.log('service has been installed');
})

// activate service worker 
self.addEventListener('activate', evt => {
    console.log('servive worker has been activated');
});


self.addEventListener('fetch', evt => {
    console.log('fetch events', evt);
});