JavaScript Document API
- represents any web page loaded in the browser
- interface describes the common properties and methods for any kind of document. 
- Depending on the document's type (e.g. HTML, XML, SVG, …), a larger API is available: HTML documents, served with the "text/html" content type, also implement the HTMLDocument interface, whereas XML and SVG documents implement the XMLDocument interface.

Document.load
- This event fires when a resource and its dependent resources have finished loading

Document.readyState
- describes the loading state of the document
readyState of a document can be one of the following:
1. loading: the document still loading
2. interactive: the document has finished loading and the document has been parsed but sub-resources (frames, stylesheets and images) are still loading
3. complete: the document and sub-resources have finished loading. The state indicates that load event is about to fire

GlobalEventHandlers.onload
- The GlobalEventHandlers mixin describes the event handlers common to several interfaces like HTMLElement, Document, or Window.
- GlobalEventHandlers is a mixin and not an interface; you can't actually create an object of type GlobalEventHandlers.
- this property is a mixin. It is an event handler that processes load events on a window, XMLHttpRequest and DOM elements

DOMContentLoaded
- event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
- load events, on the other hand, only detect a fully-loaded page

Accessing the root element (the <html> element) with document.documentElemetn

















