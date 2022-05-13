# googleExtension
google extension to identify ads on search results

## How To Run
1. Click the 3 dots in the top right of the Google Chrome browser.
2. Go to Settings > Extensions.
3. Turn on "Developer Mode".
4. Click "Load Unpacked".
5. Navigate to the top level directory that contains the extension.
6. Turn on the extension and submit any Google search query.

## Approach
### Ads coloring/ Popup for number of ads in the page
1. When foreground.js fires, it grabs span tags from DOM.
2. Iterate over the elements to find the tags containing "Ads" text.
3. Count the number of ads during the iteration.
4. Find the ancestor element that has a class name of "commercial-unit-desktop-rhs". This element wraps the entire area of the advertisement.
5. Some ads don't have the class name. Then find the 6th parent element using a while loop & updating area as area.parentNode.
6. Pass the parent element to walkPreOrder function.
7. This function uses DFS to change background color of every child to red from the parent element.
8. Save the number of the ads in the storage.

Limitations/ tradeoffs : 

If Google decides to use different tags other than span for ads, then this might not work. Also, if they change the wrapping elements to be more than the 6th parent node from the span, then it would not color the entire area of the ad. Additionally, Google labels ad areas with "Ad" or "Ads". "Ads" contains multiple ads in a carousel, but I counted these as only one ad.
