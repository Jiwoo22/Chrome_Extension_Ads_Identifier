// Keeps track of reloads to avoid an infinite reload loop.
var reloaded = false;

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

  if (changeInfo.status != "complete") {
    return;
  }

  let [tab1] = await chrome.tabs.query({ active: true, currentWindow: true });    
  let url = tab1.url;

  if (url.length < 1 || url === null || url === undefined) {
    return;
  }

  // Check if user is on Google website.
  if (url.search("google.com/search?") > -1) {

    // Check if 2021 is in url. Typically this means its a query parameter.
    // TODO: Do a regex check for a more robust solution.
    if (url.search("2021") > -1) {
      chrome.storage.sync.get("reloadedVal", function(result){
        reloaded = result.reloadedVal;
        if (reloaded == false) {
          reloaded = true;
          chrome.storage.sync.set({"reloadedVal": true});
          chrome.tabs.reload(tabId, {bypassCache: true});
        }
      });
      chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["./foreground.js"],
      })
      .then(() => {
        console.log("INJECTED THE FOREGROUND SCRIPT.");
      })
      .catch((err) => console.log(err));
    } else {
      reloaded = false;
      chrome.storage.sync.set({"reloadedVal": false});
      url += "&q=in\+2021"
      chrome.tabs.update(tabId, {url: url});
    }
  }
});
