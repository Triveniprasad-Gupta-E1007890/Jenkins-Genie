(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/main.jsx.c5d1ba41.js")
    );
  })().catch(console.error);

})();
