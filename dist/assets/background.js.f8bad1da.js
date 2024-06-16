chrome.runtime.onMessage.addListener((t,u,e)=>{if(t.action==="getActiveTabUrl")return chrome.tabs.query({active:!0,currentWindow:!0},r=>{r.length>0?e({url:r[0].url}):e({url:null})}),!0});
