- A stream is a data source that can be created and manipulated incrementally, and provides an interface for reading or writing asynchronous chunks of data, only a subset of which might be available in memory at any given time.
- the browser can parse and render the HTML as it streams in without waiting for the entire content fetch to complete
  - this include the initial bit loaded quickly from cache
- the HTTP response body is a stream. Reading the body of the more than once (aka. multiple reads) will fail.
- this is to make it memory efficient - so large responses can be handled without buffering them into memory
- when you want to read it twice, the solution is to clone the stream. `.clone` is called on the response before the first read. By doing this, you opt into the memory overhead of retaining the original stream.

```js
fetch("/whatever").then(function (response) {
  return response
    .clone()
    .body.asJSON()
    .catch(function () {
      // parsing as JSON failed, let's get the text
      response.body.asText().then(function (text) {
        // ...
      });
    });
});
```

- why not have response stream automatically cloned in all body-reading methods to allow multiple reads?
  - This could be problematic as response stays in scope, meaning it can be read again after consuming the whole thing. The browser would have to store the original response in either memory or more likely disk. It's already on disk in the cache of course, but that may not be true in all cases (imagine streaming a video response to a video element).
