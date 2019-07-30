Viewport vs Window vs Document

- viewport dimensions are referred using document.documentElement.clientWidth and document.documentElement.clientHeight
- window dimensions are referred using window.innerWidth and window.innerHeight.

Viewport: It is your device screen.
Window: It is your browser window. The window can be as big as viewport or smaller.
Document: It is the webpage. It can be bigger than viewport or even bigger than window.

Whats the difference betweeen viewport and document?
Things are different when your page is bigger than your screen.
Viewport is the rectangle area where things are visible to you. The document can be larger than that and you'll see scrollbars if so.

How is window and viewport linked?
window.innerHeight is the height of the browser window's viewport. It includes the scroll bar if there is one.

window.innerWidth vs document.documentElement.clientWidth
According to the W3C specification (17 March 2016):

The innerWidth attribute must return the viewport width including the size of a rendered scroll bar (if any), or zero if there is no viewport.

The clientWidth attribute must run these steps:
- If the element has no associated CSS layout box or if the CSS layout box is inline, return zero.
- If the element is the root element and the element's document is not in quirks mode, or if the element is the HTML body element and the element's document is in quirks mode, return the viewport width excluding the size of a rendered scroll bar (if any).
- Return the width of the padding edge excluding the width of any rendered scrollbar between the padding edge and the border edge, ignoring any transforms that apply to the element and its ancestors.

