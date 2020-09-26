What is HTTP?
HyperText Transfer Protocol
this protocol defines how messages are formatted and transmitted, and what actions Web servers and browsers should take in response to various commands.

when you enter a URL in your browser, this actually sends an HTTP command to the Web server directing it to fetch and transmit the requested Web page.

HTTP is called a stateless protocol because each command is executed independently, without any knowledge of the commands that came before it. The server does not know the order of HTTP request. Stateless means having no information about what happened previously. This translates to not knowing what you were doing the last time you ran the application.

This shortcoming of HTTP is being addressed in a number of new technologies, including ActiveX, Java, JavaScript and cookies.

HTTP Status Codes (aka Response Codes or Status Response Codes)
are error messages. HTTP status codes are response codes given by Web servers and help identify the cause of the problem. All HTTP response status codes are separated into five classes (or categories). The way the user agent handles the response primarily depends on the code and secondarily on the response headers.
1xx (Informational): The request was received, continuing process
2xx (Successful): The request was successfully received, understood, and accepted
3xx (Redirection): Further action needs to be taken by the client in order to complete the request
4xx (Client Error): The request contains bad syntax or cannot be fulfilled
5xx (Server Error): The server failed to fulfill an apparently valid request

User agent:
A software that is acting on behalf of a user. It is commonly used to refer to a web browser

HTTP request header
HTTP request is the information (in the form of text) a user's browser sends to the web server. It contains details of what the browser wants and what it will accept back from the server - such as the type, version and capabilities of the browser that is making the request so that server returns compatible data.

Upon receipt of the request header, the server will return the HTTP request header, followed by the HTTP response header to the client and the attached files that the client requests

HTTP response header
The information, in the form of a text record, that a Web server sends back to a client's browser in response to receiving an HTTP request. The response header contains the date, size and type of file that the server is sending back to the client and also data about the server itself. The header is attached to the files being sent back to the client.

What are the HTTP verbs?
ET and POST. But there are far more HTTP verbs available. The most important ones for building Restful API are GET, POST, PUT and DELETE. HTTP verbs tell the server what to do with the data identified by the URL. The request can optionally contain additional information in its body, which might be required to perform the operation

What is a HTTP Session?
It is a sequence of network transactions.

1. The client initiates a HTTP request to the web server
2. Simultaneously, the web server will be listening to a particular port (80)
3. The web server receives the client request and a Transmission Control Protocol (TCP) connection is established between the client and the web server (typically port 80)
4. The server listening on the port waits for a client request message. Upon receiving the request, the server sends back a status line, such as "HTTP/1.1 200 OK", and a message of its own, the body of which is perhaps the requested resource, an error message, or some other information.

What is HTTP/1.1, HTTP/1.0 ?
HTTP standards

# HTTP/1.0 vs HTTP/1.1

- The first response that a client receives on an HTTP GET request is often not the fully rendered page. Instead, it contains links to additional resources needed by the requested page.
  - That is, after downloading the page, the client then discovers that a full rendering of the page will require additional resources from the server
- Because of this, the client will have to make additional requests to retrieve these resources. In HTTP/1.0 the client have to **break and remake the TCP connection with every new request**. This is costly in terms of time and resources
- HTTP/1.1 resolves this issue by introducing persistent connections and pipelining.
- Persistent connection means that HTTP/1.1 assumes a TCP connection should be kept open until directly told to close.
  - this will then **allow client to send multiple requests along the same connection without waiting for a response to each**
- However, multiple data packets cannot pass each other when traveling to the same destination so when there are situations in which a request at the head of the head of the queue cannot retrieve its required resource will block all requests behind it.
  - this is known as Head-of-line (HOL) blocking
  - adding separate parallel TCP connections could alleviate this issue but there are limits to the number of concurrent TCP connections possible between a client and a server.
    - Additionally, each new connection requires significant resources

# HTTP/1.1 vs HTTP/2

- As opposed to HTTP/1.1, which keeps all requests and responses in plain text format, HTTP/2 uses the binary framing layer to encapsulate all messages in binary format, while still maintaining HTTP semantics, such as verbs, methods, and headers.
- An application level API would still create messages in the conventional HTTP formats, but the underlying layer would then convert these messages into binary. This ensures that web applications created before HTTP/2 can continue functioning as normal when interacting with the new protocol.
- the binary framing layer encodes requests/responses and cuts them into smaller packets of information
  - cutting them up increases flexibility of data transfer
- oppose to HTTP/1.1 which must make use of multiple TCP connections to lessen the effect of head-of-line blocking, HTTP/2 establishes a single connection object between two machines. This connection has multiple streams of data
  - each stream consists of multiple messages in the familiar request/response format
    - each message split into smaller units called frames
      - These frames are binary encoded and tagged to a particular stream. These tags allow the connection to interleave these frames during transfer and reassemble them at the end
      - This interleaving allow requests and responses to run in parallel without blocking the messages behind them. This is called Multiplexing
- Multiplexing resolves the head-of-line blocking issue in HTTP/1.1 by ensuring that no message has to wait for another to finish.
  - It uses multiple parallel streams
- Having a single persistent connection per origin improves performance by reducing memory and processing footprint (multiple connections) throughout the network, resulting in better network bandwidth utilization

- A single TCP connection also improves the performance of the HTTPS protocol, since the client and server can reuse the same secured session for multiple requests/responses.
  - In HTTPS, during the TLS or SSL handshake, both parties agree on the use of a single key throughout the session.
  - If the connection breaks, a new session starts, requiring a newly generated key for further communication.
  - Thus, maintaining a single connection can greatly reduce the resources required for HTTPS performance.

> Note that **HTTP/2 specifications do not make it mandatory to use the TLS layer but many major browsers only support HTTP/2 with HTTPS.**

- But HTTP/2 multiplexing can still cause performance issues - when multiple streams await for the same resource, it can cause performance issues.
  - hence stream prioritization

## Stream prioritization

- allows developers to customize the relative weight of requests.
  - when a client sends concurrent requests to a server, (the client) it can prioritise the responses it is requesting by assigning a weight between 1 and 256 to each stream
    - higher number indicates higher priority
  - the client also states each stream's dependency on another stream by specifying the ID of the stream on which it depends.
    - This ID is known as the parent ID. If the parent ID is omitted, the stream is associated as the root node, and considered to be dependent on the root stream
- This weight assignment mechanism provided in HTTP/2 allows client to change dependencies and reallocate weights at runtime in response to user interaction.
- However, a server may change assigned priorities on its own if a certain stream is blocked from accessing a specific resource

- HTTP/1.1.and HTTP/2 uses different buffer mechanism to deal with flow control
- In HTTP/1.1, flow control relies on the underlying TCP connection. When this connection initiates, both client and server establish their buffer sizes using their system default settings.
  - If the receiver’s buffer is partially filled with data, it will tell the sender its receive window is filled or contains available space via an ACK packet.
    - this ACK packet (acknowledgement packet) will tell the sender that its receive window is open (non zero). If the receive window size is 0, the sender will not send any data until the client clears its internal buffer and then requests to resume data transmission.
  - using receive window based on the underlying TCP connection can only implement flow control on one end (either end) of the connection
  - HTTP/1.1 relies on the transport layer to avoid buffer overflow so each new TCP connection requires a separate flow control mechanism.
- HTTP/2 multiplexes streams within a single TCP connection, and will have to implement flow control in a different manner.

  - receive windows on the level of the TCP connection are not sufficient to regulate the delivery of individual streams.
  - HTTP/2 solves this problem by allowing the client and server to implement their own flow controls, rather than relying on the transport layer. The application layer communicates the available buffer space, allowing the client and server to set the receive window on the level of the multiplexed streams.
    - This fine-scale flow control can be modified or maintained after the initial connection via a WINDOW_UPDATE frame.

- HTTP/2 introduces another method unique to the protocol - predicting resource requests with server push; HTTP/1.1 uses resource inlining
- In HTTP/1.1, if the developer knows in advance which additional resources the client machine will need to render the page, they can use a technique called resource inlining to include the required resource directly within the HTML document that the server sends in response to the initial GET request.
  - For example, if a client needs a specific CSS file to render a page, inlining that CSS file will provide the client with the needed resource before it asks for it, reducing the total number of requests that the client must send.
  - the issue with this is that including the resource in the HTML document is a viable solution for smaller, text-based resources, but larger files in non-text formats can greatly increase the size of the HTML document, which can ultimately decrease the connection speed and nullify the original advantage gained from using this technique.
  - Also, since the inlined resources are no longer separate from the HTML document, there is no mechanism for the client to decline resources that it already has, or to place a resource in its cache.
    - If multiple pages require the resource, each new HTML document will have the same resource inlined in its code, leading to larger HTML documents and longer load times than if the resource were simply cached in the beginning.
- In HTTP/2, this server push process begins when the server sends a PUSH_PROMISE frame to inform the client that it is going to push a resource.
  - This frame includes only the header of the message, and allows the client to know ahead of time which resource the server will push.
  - If it already has the resource cached, the client can decline the push by sending a RST_STREAM frame in response.
  - The PUSH_PROMISE frame also saves the client from sending a duplicate request to the server, since it knows which resources the server is going to push.
- Server push is client controlled. If a client needed to adjust the priority of server push, or even disable it, it could at any time send a SETTINGS frame to modify this HTTP/2 feature.
- drawbacks of server push is that some web browsers cannot always cancel pushed requests, even if the client already has the resource cached.
  - If the client mistakenly allows the server to send a duplicate resource, the server push can use up the connection unnecessarily.

## Compression

- HTTP/1.1 header component of a message is always sent as plain text. Although each header is quite small, the burden of this uncompressed data weighs heavier and heavier on the connection as more requests are made, particularly penalizing complicated.
  - API-heavy web applications that require many different resources and thus many different resource requests.
  - Additionally, the use of cookies can sometimes make headers much larger, increasing the need for some kind of compression.
- HTTP/2 uses HPACK compression to shrink the size of headers
  - HTTP/2 can split headers from their data, resulting in a header frame and a data frame. The HTTP/2-specific compression program HPACK can then compress this header frame.
