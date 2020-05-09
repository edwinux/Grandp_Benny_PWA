//Version 001

// 1. Save the files to the user's device
// The "install" event is called when the ServiceWorker starts up.
// All ServiceWorker code must be inside events.
self.addEventListener('install', function(e) {
  console.log('install');

  // Change here to describe a new book
  let BOOKNAME  = "north_pole";
  let BOOK_LANG = "en";

  // waitUntil tells the browser that the install event is not finished until we have
  // cached all of our files
  e.waitUntil(
    // Here we call our cache "myonsenuipwa", but you can name it anything unique
    caches.open('grandpa_benny_app').then(cache => {
      // If the request for any of these resources fails, _none_ of the resources will be
      // added to the cache.
      return cache.addAll([
        './',
        './index.html',
        `./manifests/manifest_${BOOKNAME}_${BOOK_LANG}.json`,
        './js/script.js',
        './css/style.css',
        './json/config.json',
        './json/stories.json'
      ]);
    })
  );
});
  

// Cache first, else network.
self.addEventListener('fetch', function(e) {
  e.respondWith(
    // check if this file exists in the cache
    caches.match(e.request)
      // Return the cached file, or else try to get it from the server
      .then(response => response || fetch(e.request))
  );
});