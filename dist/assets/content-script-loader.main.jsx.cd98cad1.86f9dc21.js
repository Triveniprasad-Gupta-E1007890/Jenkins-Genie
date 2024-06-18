(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/main.jsx.cd98cad1.js")
    );
  })().catch(console.error);

})();
