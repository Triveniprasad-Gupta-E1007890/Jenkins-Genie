chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "getActiveTabUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        sendResponse({ url: tabs[0].url });
      } else {
        sendResponse({ url: null });
      }
    });
    return true;  // Indicates that the response will be sent asynchronously
  }
});
