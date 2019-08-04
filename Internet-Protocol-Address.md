IP Address (Internet Protocol Address)
- provides the address for each end of the connection
- when we refer to IP we refer to version 4 unless otherwise specified
- most users would not actually need to use the IP address. Instead, they would refer to the computer's host name
- IP addresses are obtained from the host name using the "Domain Name System"
- the problem with IP is that trying to locate each one of those addresses over the Internet would be an enormous task. Instead, the address is split into a network and a host portion.
- This means that different organizations will be assigned a network which can span a range of addresses.
- They are 32 bits (4 x 8bits)
- IP addresses are composed of 2 parts, the network id and host id. The prefix specifies the network id, which remains the same for all the host connected to the same network. Only the host id changes for these hosts.

Each IP address must be unique on its own network. 
- Networks can be isolated from one another, and they can be bridged and translated to provide access between distinct networks. 
- A system called Network Address Translation, allows the addresses to be rewritten when packets traverse network borders to allow them to continue on to their correct destination. 
- This allows the same IP address to be used on multiple, isolated networks while still allowing these to communicate with each other if configured correctly.

IP address range are split into different network classes to accomodate different sized organizations. There are 5 different classes however only 3 are commonly used.

class A - For large organizations. The network portion is 8 bits long and begins with binary 0, followed by 3 bytes host id
- if the first bit of an IPV4 address is 0, it means that the address is part of class A.
- This means that any address from 0.0.0.0 to 127.255.255.255 is in class A.
- the addresses from 10.0.0.0 to 10.255.255.255 are reserved for private network assignment. 

0000 0000
0111 1111 = 127

class B - for medium sized organizations. The network portion is 16 bits long and starts with binary 10, followed by 2 bytes host id. This class has a larger IP address range than class A.
- if the addresses have a 1 for their first bit but don't have a 1 for their second bit, the address is part of class B
- Class B includes any address from 128.0.0.0 to 191.255.255.255.
- the addresses from 172.16.0.0 to 172.31.255.255 are reserved for private network assignment. 

1000 0000 = 128
1011 1111 = 191

Class C - for smaller organizations. The network portion is 24 bits long and begins with binary 110, followed by 1 byte host id. This class has a larger IP address range than class B.
- 110- : Class C is defined as the addresses ranging from 192.0.0.0 to 223.255.255.255. This represents all of the addresses with a "1" for their first two bits, but without a "1" for their third bit.
- the range of 192.168.0.0 to 192.168.255.255 is reserved for private usage.

class D 
- 1110 : This class includes addresses that have "111" as their first three bits, but a "0" for the next bit. This address range includes addresses from 224.0.0.0 to 239.255.255.255.
- class D addresses are reserved for multi-casting protocols. Multi-casting protocols allow a packet to be sent to a group of hosts in one movement.

Reserved Addresses: (MUST REMEMBER)
127.0.0.1 = localhost
0.0.0.0 = Refer to the network
1.1.1.1 = Broadcast address - send to all addresses.

Reserved Private Range (for IPV4)
- There are some portions of the IPv4 space that are reserved for specific uses
- One of this is the loopback range
	- the loopback range specified by addresses from 127.0.0.0 to 127.255.255.255.
- This range is used by each host to test networking to itself. Typically, this is expressed by the first address in this range: 127.0.0.1
- In each IP class, there is a private network address range. Any computer that is not hooked up to the internet directly (any computer that goes through a router or other NAT system) can use these addresses at will.

How is my organization using an IP address if there is insufficient IP address to go around?
- They are using private address range (using a fixed network id and a range of host id) via subnet masks

Private Address Ranges
- Each of the normal classes also have a range within them that is used to designate private network addresses. For instance, for class A addresses, the addresses from 10.0.0.0 to 10.255.255.255 are reserved for private network assignment.
- The private address ranges are use internally within an organization. They cannot be used on the Internet.
- To provide Internet access for a host with a private address range the communications have to go through NAT (Network Address Translation)
- Public IP addresses need to be registered with the InterNIC before they can be used.
