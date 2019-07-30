TCP/IP

- TCP/IP is an abbreviation for Transmission Control Protocol / Internet Protocol.
- It is a set of protocols that define how two or more computers can communicate with each other. 
- Within the TCP/IP networking protocol there are lots more protocols.

UDP (User Datagram Protocol)
- runs on top of the IP (Internet Protocol)

The difference between TCP and UDP is that TCP is connection based protocol whereas UDP is connectionless. In other words when TCP is being used there is a session setup between the hosts and the transfer is guaranteed.
- For UDP each data packet is sent but there is no checking that it has been received, or anyway of resending within the network layers. 
- An application can run on top of UDP and implement it's own checking that each packet is received, but that is not the same as leaving it to the networking stack to implement.
