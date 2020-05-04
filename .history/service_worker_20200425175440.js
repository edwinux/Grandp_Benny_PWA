//Version 001

// 1. Save the files to the user's device
// The "install" event is called when the ServiceWorker starts up.
// All ServiceWorker code must be inside events.
self.addEventListener('install', function(e) {
  console.log('install');

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
        './manifest.json',                          
        './script.js',
        './style.css',
        './Json/config.json',
        './Json/story_en.json',
        './Json/story_heb.json',
        './Images/Intro_with_play_btn.jpg',
        './Audio/Intro.mp3'
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

// //Network first, else cache.
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request).catch(function() {
//       return caches.match(event.request);
//     })
//   );
// });