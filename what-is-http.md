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
