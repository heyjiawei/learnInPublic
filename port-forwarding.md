Port Forwarding (or port mapping)
- is an application of network address translation (NAT)
- It redirects request from one address and port number to another. This redirection is done while the packets are traversing the network gateway

This technique is mostly used to make services on a host residing on a protected internal network available to hosts on the opposite side of the gateway (external network)

How is it done:
- The network administrator will set aside one port number on the gateway to be exclusively used for comminicating with a service in the private network, located on a specific host.
- External hosts must know this port number and address of the gateway in order to communicate with the network's internal service.
- Often, the port numbers of well-known internet services (like port 80 for HTTP) are used in port forwarding so that common internet services may be implemented on hosts within private network.
- Administrators onfigure port forwarding in the gateway's operating system via packet filter rules in iptables or netfilter or Ipfirewall (ipfw) module or Packet Filter (pf) module.
- When used on gateway devices, a port forward may be implemented with a single rule, that is to simply translate the destination address and port (the source address and port will be left unchanged)
- When used on machines that are not the default gateway of the network, the source address must be changed to be the address of the translating machine


Types of port forwarding
1. Local Port Forwarding
2. Remote Port Forwarding
3. Dynamic Port Forwarding

Local port forwarding
- It lets a user connect from their local computer to another server
- By using local port forwarding, firewalls that block certain web pages are able to be bypassed
- Connections from an SSH client are forwarded, via the SSH server, to the intended destination server.
- The SSH server is configured to redirect data from a specified port to some specified destination host and port.
- The local port is on the same computer as the SSH client. It is also the forwarded port

Remote port forwarding
- This port forwarding enables applications on the server side of SSH connection to access services residing on the SSH's client side
- In other words, remote port forwarding lets users connect from the server side of a tunnel, SSH or another, to a remote network service located at the tunnel's client side
- Remote port forwarding allows other computers to access applications hosted on remote servers

Dynamic port forwarding (DPF)
- Dynamic port forwarding is an on-demand method of traversing a firewall or NAT (network address translation) through the use of firewall pinholes.
- The goal is to enable clients to connect securely to a trusted server that acts as an intermediary for sending/receiving data to one or many destination servers.
- Once the connection is established, DPF can be used to provide additional security for a user connected to an untrusted network. 
	- This is because data must pass through the secure tunnel to another server before being forwarded to its original destination. Thus, the user is protected from packet sniffing that may occur on the LAN














