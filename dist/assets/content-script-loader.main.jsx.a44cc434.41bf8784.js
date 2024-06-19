(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/main.jsx.a44cc434.js")
    );
  })().catch(console.error);

})();
