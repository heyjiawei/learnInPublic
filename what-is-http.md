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
HTTP request is the information (in the form of text) a user's browser sends to the web server. It contains details of what the browser wants and what it will accept back from the server - such as  the type, version and capabilities of the browser that is making the request so that server returns compatible data.

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




