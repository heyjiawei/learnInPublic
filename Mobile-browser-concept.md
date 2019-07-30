Mobile browser concept

Device pixels and CSS pixels
- Device pixels are the pixels the web browser user sees.
- (in general) be read out from screen.width/height.

- If your element has width 128 px and your monitor is 1024px wide. The element would fit roughly 8 times in your monitor.
- if the user zooms, zooming will cause the actual pixels to double in size. Formally, the element would still have a width of 128 CSS px but it would take the space of 256 device px

The point here is that you should only be interested in CSS pixels. It’s those pixels that dictate how your style sheet is rendered.
If the user zooms, the browser will automatically make sure that your CSS layout is stretched up or squeezed in. It should not matter to you.

100% zoom
At zoom level 100% one CSS pixel is exactly equal to one device pixel.

What happens to window.innerWidth/Height when users zoom?
- So if the user zooms in you get less available space in the window, and window.innerWidth/Height reflect that by decreasing.
- The exception here is Opera, where window.innerWidth/Height do not decrease when the user zooms in

The viewport:
The function of the viewport is to constrain the <html> element
- the width of the html element is restricted by the width of the viewport. The HTML element takes 100% of the width of that viewport
- The viewport is exactly equal to the browser window. It has the width and height of the browser window on desktop.

document.documentElement is in fact the <html> element: the root element of any HTML document. However, the viewport is one level higher, so to speak; it’s the element that contains the <html> element. That might matter if you give the <html> element a width. 

document.documentElement.clientWidth and -Height still gives the dimensions of the viewport, and not of the <html> element. 
document.documentElement.clientWidth and -Height always gives the viewport dimensions, regardless of the dimensions of the <html> element.

what is window.innerWidth/Height relation to viewport?
- document.documentElement.clientWidth and -Height doesn’t include the scrollbar, while window.innerWidth/Height does. 

How do you find the dimensions of <html> element?
document.documentElement.offsetWidth and -Height.

Event coordinates:
pageX/Y gives the coordinates relative to the <html> element in CSS pixels.
clientX/Y gives the coordinates relative to the viewport in CSS pixels.
screenX/Y gives the coordinates relative to the screen in device pixels. (this is rarely used)

Media Queries widths:
There are two relevant media queries: width/height and device-width/device-height.
1. width/height uses the same values as documentElement .clientWidth/Height (the viewport, in other words). It works with CSS pixels.
2. device-width/device-height uses the same values as screen.width/height (the screen, in other words). It works with device pixels.

max-width and min-width are updated when you rotate the screen. 
Your max width in portrait mode will become max-height in landscape mode

Use width and forget device-width — on desktop.

Mobile viewports
2 viewports - The visual viewport and the layout viewport

What's the difference between visual viewport and layout viewport?

Imagine the layout viewport as being a large image which does not change size or shape. Now image you have a smaller frame through which you look at the large image. The small frame is surrounded by opaque material which obscures your view of all but a portion of the large image. The portion of the large image that you can see through the frame is the visual viewport. You can back away from the large image while holding your frame (zoom out) to see the entire image at once, or you can move closer (zoom in) to see only a portion. You can also change the orientation of the frame, but the size and shape of the large image (layout viewport) never changes.

- The visual viewport is the part of the page that’s currently shown on-screen. The user may scroll to change the part of the page he sees, or zoom to change the size of the visual viewport.
- the CSS layout, especially percentual widths, are calculated relative to the layout viewport, which is considerably wider than the visual viewport.

The <html> element takes the width of the layout viewport initially. 
Your CSS is interpreted as if the screen were significantly wider than the phone screen. This ensures that your site's layout behaves as it does on desktop browser.

When layout viewport === visual viewport, when the user zooms in these dimensions stay the same.

In mobile, 
document.documentElement.clientWidth and -Height contain the layout viewport’s dimensions.
window.innerWidth/Height contains the visual viewport dimensions
screen.width/height give the screen size, in device pixels

Mobile scrolling offset:
just as on desktop, it’s stored in window.pageX/YOffset.
