let elemDiv = document.createElement("div")
elemDiv.innerText = 'the number of ads in current page : ' 
document.body.appendChild(elemDiv)

function renderCounts() {
  chrome.storage.sync.get('count', function(result) {
    elemDiv.innerText =  'the number of ads in current page : ' + result.count
  });
}

renderCounts() 
