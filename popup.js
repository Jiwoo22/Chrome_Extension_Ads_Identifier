// Initialize button with user's preferred color
let changeColor = document.getElementById("changeAdsColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  console.log("clicked")

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: {tabId : tab.id},
    function: setAdsPageBackgroundColor,
  })
})

// The body of this function will be executed as a content script inside the
// current page

function setAdsPageBackgroundColor() {
  chrome.storage.sync.get("color", ({color}) => {

    let ads = document.getElementById('tvcap')
    let ads2 = document.getElementsByClassName('commercial-unit-desktop-rhs')

    console.log("ads", ads)
    console.log("ads2", ads2)

    
    ads.style.backgroundColor = color

    // for (let i = 0; i < ads2.children.length; i++) {
    //   console.log(ads2.children[i].tagName);
    //   ads2.children[i].style.backgroundColor = color
    // }

    function walkPreOrder(parent){
      if(!parent) return
      console.log(parent);

      for(let child of parent.children){
        child.style.backgroundColor = color
        walkPreOrder(child)
      }
    }
    walkPreOrder(ads)
    walkPreOrder(ads2)
  })
}

