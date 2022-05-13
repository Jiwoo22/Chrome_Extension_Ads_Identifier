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
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["./foreground.js"],
      })
      .then(() => {
        console.log("INJECTED THE FOREGROUND SCRIPT.");
      })
      .catch((err) => console.log(err));
  }
});
