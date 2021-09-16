importScripts("/vue3-covid19-tracker/precache-manifest.adf81d58c964d9eec068b3832b8cbe87.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

workbox.core.setCacheNameDetails({ prefix: 'vue3-covid-tracker' });

registerRoute(
  new RegExp('https://api.covid19api.com/'),
  new NetworkFirst({
    cacheName: 'api',
  }),
);

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {

        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {

          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();

          caches.open('api')
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      }),
  );
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

