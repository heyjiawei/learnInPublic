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
- It is implemented in multiple interfaces, specifically Window and WorkerGlobalScope. This makes it available in pretty much any context you might want to fetch resources in.
- The fetch() method takes one mandatory argument, the path to the resource you want to fetch.
- It returns a Promise that resolves to the Response to that request, whether it is successful or not.
- Returns a promise which resolves to the response sent back from the server. This is equivalent of the onload event handler in the XHR version
- the response returned from Fetch API is a Response object

- The fetch specification differs from `jQuery.ajax()` in these:

1. Promise returned from `fetch()` won't reject on HTTP error status even if the response is an HTTP 404 or 500.

- It will resolve normally (with `ok` status set to `false`) and will only reject on network failure or when there is something preventing the request from completing

2. fetch() can receive cross-site cookies. You can establish a cross site session using fetch
3. fetch() won't send cookies unless you set `credentials: 'same-origin'`. In August 2017 the spec has changed the default credentials policy to `same-origin`

## Which should you use? XHR or Fetch?

XHR has been around for a long time and hence has very good cross-browser support. Fetch and Promises are more recent additions but they still have to be polyfilled in older browsers

## Blob (Binary Large Object)

- can basically be used to represent large file-like objects, such as images or video files
- To construct a Blob from other non-blob objects and data, use the Blob() constructor.
- To create a blob that contains a subset of another blob's data, use the slice() method.

## Response Object

- represents the response to a request
- You can create a new Response object using the `Response.Response()` constructor, but you are more likely to encounter a Response object being returned as the result of another API operation—for example, a service worker `Fetchevent.respondWith`, or a simple `WindowOrWorkerGlobalScope.fetch()`.
- response implements `Body` Interface

## Headers

- The Headers interface of the Fetch API allows you to perform various actions on HTTP request and response headers
- A Headers object has an associated header list, which is initially empty and consists of zero or more **name and value pairs**.
- header names are matched by case-insensitive byte sequence.

- For security reasons, some headers can only be controlled by the user agent. These headers include the **forbidden header names** and **forbidden response header names**.
- Headers object also has an associated guard
  - Guard is a feature of Headers objects
  - it has the following possible settings of `immutable`, `request`, `request-no-cors`, `response`, or `none` (the default), depending on where the header is used.
  - When a new Headers object is created using the Headers() constructor, its guard is set to `none` (the default)
  - a header's guard affects the set(), delete(), and append() methods which change the header's contents
    - A `TypeError` is thrown if you try to modify a Headers object whose guard is immutable
    - the modification operation will work if the guard is `request` and the header name isn't a forbidden header name
    - the modification operation will work if the guard is `request-no-cors` and the header name/value is a simple header
    - the modification operation will work if the guard is `response` and the header name isn't a forbidden response header name
- You can retrieve a Headers object via the Request.headers and Response.headers properties
- create a new Headers object using the Headers.Headers() constructor.

## Body

mixin: a class or interface in which some or all of its methods and/or properties are unimplemented

- requires another class or interface to provide the missing implementations
- the new class/interface includes the properties and methods from the mixin as well as those it defines itself
- the advantage of mixins is that they can simplify the design of APIs when multiple interfaces need to include the same method and properties

- The body of Fetch API represents the body of the response/request
  - you can declare its content type and how it should be handled
- Body is implemented by both Request and Response
  - it provides these objects with an associated body (`Body.body`, that is a stream), a used flag (`Body.bodyUsed`initially unset), and a MIME type (initially an empty byte sequence)

# URL API

- The URL interface is used to parse, construct, normalize, and encode URLs.
- It works by providing properties which allow you to easily read and modify the components of a URL.
- create a new URL object by specifying the URL as a string when calling its constructor, or by providing a relative URL and a base URL.

# FormData

- an object. It is an interface to easily construct a set of key-value pairs representing form fields and their values
- to help forms be easily sent with XML
- It uses the same format a form would use if the encoding type were set to `multipart/form-data`
- you can also pass it to URLSearchParams constructor to generate query parameters like a GET submission
