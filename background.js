
let color = '#e8453c';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({color});
    console.log('Default background color set to %cyello', `color: ${color}`)
})