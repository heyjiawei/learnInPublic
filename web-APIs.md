# XMLHttpRequest (XHR)

- objects are used to interact with servers
- you can retrieve data from a URL without having to do a full page refresh
- XMLHttpRequest is used heavily in AJAX (Asynchronous JavaScript And XML) programming.

  - AJAX is a programming practice of building complex, dynamic webpages using XMLHttpRequest
    - it allows you to update parts of the DOM and HTML page without the need for a full page refresh
    - Allows you to work asynchronously so your code continues to run while a part of your page is trying to reload
    - AJAX is gradually being replaced by functions within JavaScript frameworks and the official Fetch API standard
    - but "Ajax" is still often used to describe the technique.

- When using XHR, we need to set
  1. HTTP request method
  2. url
  3. request response type (the type of data contained in the response); text by default
  4. onload event handler to run when the load event fires (when the response has returned)
     when this has occurred, the response data will be available in the response property of the XHR request object

# Fetch API

- The Fetch API provides an interface for fetching resources (including across the network)
- the new API provides a more powerful and flexible feature set.
- is basically a modern replacement for XHR

- Returns a promise which resolves to the response sent back from the server. This is equivalent of the onload event handler in the XHR version
  - the response returned from FEtch API is a Response object

## Which should you use? XHR or Fetch?

XHR has been around for a long time and hence has very good cross-browser support. Fetch and Promises are more recent additions but they still have to be polyfilled in older browsers

## Blob (Binary Large Object)

- can basically be used to represent large file-like objects, such as images or video files

## Response Object

- represents the response to a request
- You can create a new Response object using the `Response.Response()` constructor, but you are more likely to encounter a Response object being returned as the result of another API operation—for example, a service worker `Fetchevent.respondWith`, or a simple `WindowOrWorkerGlobalScope.fetch()`.
- response implements `Body` Interface

## Headers

- The Headers interface of the Fetch API allows you to perform various actions on HTTP request and response headers
- A Headers object has an associated header list, which is initially empty and consists of zero or more **name and value pairs**.
- header names are matched by case-insensitive byte sequence.

- For security reasons, some headers can only be controlled by the user agent. These headers include the **forbidden header names** and **forbidden response header names**.

// TODO

## Body

// TODO

# URL API

// TODO
