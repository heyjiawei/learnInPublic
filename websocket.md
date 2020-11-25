# What is a websocket

1. It is a communication protocol that provides full-duplex communication channels over a single TCP (Transmission Control Protocol) connection
2. It is an API in Web IDL (Interface Description Language) standardized by W3C

A full-duplex system (or double duplex system) allows communication in both directions **simultaneously**. They allow the speaker to listen and be heard at the same time. You may think of it as a 2-lane road, with one lane for each direction. One lane for receiving packets and the other for sending packets.

The WebSocket protocol enables interaction between a web browser and a web server by providing a standardized way for the server to send content to the client without being first requested by the client.

# How does a websocket work

WebSocket is designed to work over HTTP ports 443 and 80. It should should support HTTP proxies and intermediaries, making it compatible with HTTP protocol.
To achieve compatibility, WebSocket handshake uses HTTP Upgrade header to change from HTTP protocol to WebSocket protocol

The WebSocket protocol defines `ws` (WebSocket) and `wss` (WebSocket Secure) for unencrypted and encrypted connections. Browser developer tolls allow developers to inspect WebSocket handshake as well as WebSocket frames.

The handshake starts with an HTTP request/response, allowing servers to handle HTTP connections as well as WebSocket connections on the same port. Once the connection is established, communication switches to a bidirectional binary protocol which does not conform to the HTTP protocol.

The client sends a Sec-WebSocket-Key header containing base64-encoded random bytes, and the server replies with a hash of the key in the Sec-WebSocket-Accept header. This has is solely intended to prevent a caching proxy from re-sending a previous WebSocket conversation.

Once the connection is established, the client and server can send WebSocket data or text frames back and forth in full-duplex mode. The data is minimally framed, with a small header followed by payload. a|A single message can optionally be split across several data frames. This can allow for sending of messages where initial data is available but the complete length of the message is unknown (it sends one data frame after another until the end is reached and marked with the FIN bit).

Unlike regular cross-domain HTTP requests, WebSocket requests are not restricted by the Same-origin policy. Therefore WebSocket servers must validate the "Origin" header against the expected origins during connection establishment, to avoid Cross-Site WebSocket Hijacking attacks.

Text received over a WebSocket connection is in UTF-8 format.

It may be helpful to examine the socket's bufferedAmount attribute before attempting to close the connection to determine if any data has yet to be transmitted on the network. If this value isn't 0, there's pending data still, so you may wish to wait before closing the connection.

## What is port 443 and port 80? Why these ports?

Firstly, network ports are virtual addresses. They are numbered addresses. Computers use them to direct the right kind of network traffic to the right place.
When you enter a website, your computer reaches to the server hosting it and it looks for a connection on either the HTTP or HTTPS port (because they are the ports associated with web traffic). The server will make the connection to either ports and return the website information - which your computer will receive, on the same port.

HTTP and HTTPS are 2 different protocols and they use 2 different ports. HTTP is available on port 80 and HTTPS is available on port 443. So when you connect to a website over either protocol, you are connecting to that web server over their port.

Port 443 enables websites to be available over both HTTP and HTTPS. If it isn't available for some reason, the website will still be served over HTTPS on port 80.

## How to use Port 443

As a browser user you can manually enter `https://` before the URLs.
As a server administrator, you may need to configure your webserver applications (such as Nginx) to serve your website on port 443. You will also need an encryption certificate for the encryption to work. This encryption can be purchased with your web host or generated with LetsEncrypt.

## Upgrade header

The Upgrade header field is an HTTP header field introduced in HTTP/1.1. In the exchange, the client begins by making a cleartext (or plaintexts) request, which is later upgraded to a newer HTTP protocol version or switched to a different protocol.

A connection upgrade must be requested by the client.
If the server wants to enforce an upgrade it may send a 426 Upgrade Required response. The client would then have to send a new request with the appropriate upgrade headers while keeping the connection open.

Establishing a WebSocket relies on the HTTP Upgrade mechanism so the request for the protocol upgrade is implicit when we address the web server as `ws://` or `wss://`

## Subprotocols

Subprotocols structure the WebSocket payload and never modify anything. You can think of them as custom XML schema, whereby you are restricted by a structure you agreed on. Both client and server must agree on the subprotocol (structure). The subprotocol is implemented on the server and cannot be externally refered to by the client.

A client has to ask for a specific subprotocol. To do so, it will send something like this as part of the original handshake

```txt
GET /chat HTTP/1.1
...
Sec-WebSocket-Protocol: soap, wamp
```

Now the server must pick one of the protocols that the client suggested and it supports

```txt
Sec-WebSocket-Protocol: soap
```

The server can't send more than one Sec-Websocket-Protocol header.
If the server doesn't want to use any subprotocol, it shouldn't send any Sec-WebSocket-Protocol header. Sending a blank header is incorrect.

Let's imagine we're using a subprotocol json. In this subprotocol, all data is passed as JSON. If the client solicits this protocol and the server wants to use it, the server needs to have a JSON parser. Practically speaking, this will be part of a library, but the server needs to pass the data around.
