# Chunk

- A chunk is a single piece of data that is written to or read from a stream.
- It can be of any type
- streams can even contain chunks of different types.
- A chunk will often not be the most atomic unit of data for a given stream
  - a byte stream might contain chunks consisting of 16 KiB Uint8Arrays, instead of single bytes.

# Streams are

- start and end aware
- buffer values that haven't been read
- can be chained with pipe to form an async sequence
- has built-in handling. Errors will be propagated down the pipe
- has cancellation support. That is, cancellation message is passed back up the pipe
- Streams can be infinite
- events that happen during streaming, before listeners are attached, are lost
- flow control. You can react to the speed of the reader
  - This means we can control the flow of download if the reader is viewing it slower than the speed the buffer is purging bytes. If this flow control isn't built in, we could end up with a huge backlog of bytes and run out of memory
  - Because of the tight relationship between steam and reader, a stream can only have 1 reader
  - a read stream can be _teed_. This means that unread stream can be split into 2 streams that receive the same data. This is useful for allowing two readers to read a stream simultaneously, perhaps at different speeds.
    - You might do this for example in a ServiceWorker if you want to fetch a response from the server and stream it to the browser, but also stream it to the ServiceWorker cache. Since a response body cannot be consumed more than once, you’d need two copies to do this.
    - This _tee_ manages the buffer across both readers
  - This is known has having "backpressure support", meaning your stream reacts to the read-rate of the reader

# The browser and streams

- the browser streams loads of things by default. Whenever you see the browser displaying parts of a page/image/video as it is downloading, it is due to streaming
- When the browser reads a response body it expects to get chunks of Uint8Array
- `fetch` API streams are always a Uint8Array of binary data. The whole response is each Uint8Array joined together
- If you want the response as text, you can use TextDecoder
  - `{ stream: true}` means the decoder will keep a buffer if the stream ends mid-way through a UTF-8 code point.
  - TextDecoder is a transform stream.
    - A transform stream is an object with a writeable stream on `.writable` and a readable stream on `.readable`
    - it takes chunks into the writable, processes them, and pass something out through the readable.
- If you're wanting to improve the performance of a content-heavy site and provide an offline-first experience without rearchitecting, constructing streams within a service worker will become the easiest way to do it.

## Searching within a stream

- https://jsbin.com/gameboy/edit?js,console

## Cancelling a stream

- A stream can be cancelled using `stream.cancel()` (so `response.body.cancel()` in the case of `fetch`) or `reader.cancel()`. Fetch reacts to this by stopping the download.

# Stream use cases

- piping a readable video stream through a transform stream that applies affects in real time
- decompression: piping a file stream through a transform stream that selectively decompresses files from a .tgz acrhieve to img elements as the user scrolls through an image gallery
- image decoding: piping an HTTP response stream through a transform stream that decodes bytes into bitmap data, then through another transform that translates bitmaps into PNGs.
  - If installed inside the fetch hook of a service worker, this would allow developers to transparently polyfill new image formats.
- Using service worker + streams means you can get an almost-instant first render, then beat a regular server render by piping a smaller amount of content from the network. Content goes through the regular HTML parser, so you get streaming, and none of the behavioural differences you get with adding content to the DOM manually.

# Readable streams

- A readable stream represents a source of data
  - data comes out of a readable stream.
- a readable stream is an instance of the ReadableStream class.
- Although a readable stream can be created with arbitrary behavior, most readable streams wrap a lower-level I/O source, called the underlying source.

There are 2 types of underlying source

- push sources

  - push data at you, whether or not you are listening for it.
  - They may also provide a mechanism for pausing and resuming the flow of data
  - An example push source is a TCP socket, where data is constantly being pushed from the OS level, at a rate that can be controlled by changing the TCP window size.

- pull sources

  - require you to request data from them
  - The data may be available synchronously, e.g. if it is held by the operating system’s in-memory buffers, or asynchronously, e.g. if it has to be read from disk.

- Readable streams are designed to wrap both types of sources behind a single, unified interface.
  - Chunks are enqueued into the stream by the stream’s underlying source
  - They can then be read one at a time via the stream’s public interface, in particular by using a readable stream reader acquired using the stream’s `getReader()` method
- Code that reads from a readable stream using its public interface is known as a _consumer_.
- when a readable stream is cancelled (with `cancel()`), it will immediately close the stream and throw away any enqueued chunks and execute any cancellation mechanism of the underlying source
- consumers can also _tee_ a readable stream using `tee()`. This **locks** the stream making it no longer directly usable.
  - this will create 2 streams (called _branches_) which can be consumed independently
  - When teeing a readable stream, the backpressure signals from its two branches will aggregate, such that if neither branch is read from, a backpressure signal will be sent to the underlying source of the original stream.
- For streams representing bytes, an extended version of the readable stream is provided to handle bytes efficiently, in particular by minimizing copies.

## Some terminology for readable streams

- For streams representing bytes, the underlying source for such a readable stream is called an underlying byte source
- readable stream whose underlying source is an underlying byte source is sometimes called a readable byte stream.
- Consumers of a readable byte stream can acquire a BYOB reader using the stream’s `getReader()` method.

# Writable streams

- represents a destination for data
- data goes in to a writable stream
- Concretely, a writable stream is an instance of the WritableStream class.
- most writable streams wrap a lower-level I/O sink, called the underlying sink.
- Writable streams work to abstract away some of the complexity of the underlying sink, by queuing subsequent writes and only delivering them to the underlying sink one by one.
- Code that writes into a writable stream using its public interface is known as a _producer_.
- aborting a writable stream (`abort()`) puts the stream in an errored state. It does not require a signal from the underlying sink and discards all writes in the stream's internal queue

# Transform streams

- consists of a pair of streams, a writable stream (known as its writable side) and a readable stream (known as its readable side).
- when you write to the writable side, it results in new data being made available for reading from the readable side.
- Concretely, any object with a writable property and a readable property can serve as a transform stream.
- The TransformStream class just makes it much easier to create such a pair that is properly entangled.
  - It wraps a transformer, which defines algorithms for the specific transformation to be performed
- An **identity transform stream** is a type of transform stream which forwards all chunks written to its writable side to its readable side, **without any changes**.

# Pipe chains

- Streams are primarily used by piping them to each other
- A readable stream can be piped directly to a writable stream, using its `pipeTo()` method
- The readable stream can be piped through one or more transform streams first, using its `pipeThrough()` method.
- A set of streams piped together in this way is referred to as a _pipe chain_.
- In a pipe chain, the _original source_ is the underlying source of the first readable stream in the chain; the _ultimate sink is_ the underlying sink of the final writable stream in the chain.
- Once a pipe chain is constructed, it will propagate signals regarding how fast chunks should flow through it.
- If any step in the chain cannot yet accept chunks, it propagates a signal backwards through the pipe chain, until eventually the original source is told to stop producing chunks so fast.
- **Backpressure**: This process of normalizing flow from the original source according to how fast the chain can process chunks.
- Piping locks the readable and writable streams, preventing them from being manipulated for the duration of the pipe operation.
  - This allows the implementation to perform important optimizations, such as directly shuttling data from the underlying source to the underlying sink while bypassing many of the intermediate queues.

# Queuing strategy

- A queuing strategy is an object that determines how a stream should signal backpressure based on the state of its internal queue.
- The queuing strategy assigns a size to each chunk, and compares the total size of all chunks in the queue to a specified number, known as the high water mark.
- The difference between the total chunks in queue and high water mark is use to determine the desired size to fill the stream's queue.
- the desired size = high water mark - total chunks in queue
  - For readable streams, an underlying source can use this desired size as a backpressure signal
    - it can slow down chunk generation so as to try to keep the desired size above or at zero
  - For writable streams, a producer can behave similarly, avoiding writes that would cause the desired size to go negative. (i.e. when total chunks in queue is more than high water mark)
- Concretely, the default created streams has a highWaterMark property. For byte streams the highWaterMark always has units of bytes. For other streams the default unit is chunks, but a size() function can be included in the strategy object which returns the size for a given chunk. This permits the highWaterMark to be specified in arbitrary floating-point units.

# Locking

- A readable stream reader, or simply reader, is an object that allows direct reading of chunks from a readable stream. (i.e. to read the stream. Without a reader, a consumer can only perform high-level operations on the readable stream: canceling the stream, or piping the readable stream to a writable stream)
- A reader is acquired via the stream’s `getReader()` method.
- A non-byte readable stream can only vend default readers.
- A readable **byte stream** has the ability to vend two types of readers: default readers and BYOB readers
  - BYOB ("bring your own buffer")
  - BYOB readers allow reading into a developer-supplied buffer, thus minimizing copies
  - Default readers are instances of the `ReadableStreamDefaultReader class`, while BYOB readers are instances of `ReadableStreamBYOBReader`.
- Similarly, a writable stream writer, or simply writer, is an object that allows direct writing of chunks to a writable stream.
  - Writers are represented by the `WritableStreamDefaultWriter` class.
- A given readable or writable stream only has **at most one reader or writer at a time**. We say in this case the stream is locked, and that the reader or writer is active.
  - locking can be determined using the readableStream.locked or writableStream.locked properties.
  - A reader or writer also has the capability to release its lock, which makes it no longer active, and allows further readers or writers to be acquired
