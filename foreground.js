let color = '#e8453c'; // red
let countAds = 0;
  
// DFS to change background color of every child.
function walkPreOrder(parent) {
    if (!parent) {
        return;
    }

    if (parent.length) {
        for (let p of parent) {
            iterateChildren(p);
        }
    }
    else {
        iterateChildren(parent);
    }
}

// Helper function to iterate over each child.
const iterateChildren = (parent) => {
    for (let child of parent.children) {
        child.style.backgroundColor = color;
        walkPreOrder(child);
    }
}

function identifyAds() {
    // Get all the span tags to find "ads" in DOM
    let spans = document.getElementsByTagName("span");

    for (let i = 0; i < spans.length; i++) {

        let text = spans[i].innerText;
        
        if(text === "Ads"|| text === "Ads·"|| text === "Ad"|| text === "Ad·") {
            
            spans[i].style.backgroundColor = color;
            countAds++;

            // Find ancestor element that has the "commercial-unit-desktop-rhs" class name.
            // This wraps the entire ads area.
            let area = spans[i].closest('commercial-unit-desktop-rhs');
            // If not, then find the 6th parent.
            if (!area) {
                let j = 0;
                area = spans[i];
                while (j < 6) {
                    area = area.parentNode;
                    j++;
                }
            }

            // Use this function to change each child background color
            walkPreOrder(area)
        }
    }
    // Save the number of ads in the storage
    chrome.storage.sync.set({count: countAds});
}

identifyAds()