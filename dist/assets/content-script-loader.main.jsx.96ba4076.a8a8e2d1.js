(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/main.jsx.96ba4076.js")
    );
  })().catch(console.error);

})();
