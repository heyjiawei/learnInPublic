Subnet Mask
- subnetting allows large chunks of addresses to be further split into a further network and host component. This new network component is called the subnet
- by default, each network has only one subnet, which contains all of the host addresses defined within.
- A netmask is a specification of the amount of address bits that are used for the network portion.
- A subnet mask is another netmask wihtin used to further divide the network.

Netmask:
- each bit of the address that is considered significant for describing the network should be represented as 1 in the netmask
For address 192.168.0.15
in binary:

1100 0000 - 1010 1000 - 0000 0000 - 0000 1111

As we described above, the network portion for class C addresses is the first 3 octets, or the first 24 bits. Since these are the significant bits that we want to preserve, the netmask would be:

1111 1111 - 1111 1111 - 1111 1111 - 0000 0000

-This can be written in the normal IPv4 format as 255.255.255.0. 
Any bit that is a "0" in the binary representation of the netmask is considered part of the host portion of the address and can be variable. 

- We determine the network portion of the address by applying a bitwise AND operation to between the address and the netmask
- This would save the networking portion of the address and discard the host portion, resulting in the following network binary:
1100 0000 - 1010 1000 - 0000 0000 - 0000 0000

The host specification is then the difference between these original value and the host portion. In our case, the host is "0000 1111" or 15.


The idea of subnetting is to take a portion of the host space of an address and use it as an additional networking specification to divide the address space again.


So, continuing with our example, the networking portion is:

1100 0000 - 1010 1000 - 0000 0000

*a netmask of 255.255.255.0 as we saw above leaves us with 254 hosts in the network (you cannot end in 0 or 255 because these are reserved).*

The host portion is:

0000 1111

We can use the first bit of our host to designate a subnetwork. We can do this by adjusting the subnet mask from this:

1111 1111 - 1111 1111 - 1111 1111 - 0000 0000
To this:

1111 1111 - 1111 1111 - 1111 1111 - 1000 0000
(255.255.255.128)

- What we have done here is to designate the first bit of the last octet as significant in addressing the network.
- This effectively produces two subnetworks. The first subnetwork is from 192.168.0.1 to 192.168.0.127. 
- The second subnetwork contains the hosts 192.168.0.129 to 192.168.0.255.
- Traditionally, the subnet itself must not be used as an address.
- If we use more bits of the host space, we can get more subnetworks

You have been allocated a class A network address of 29.0.0.0. You need to create at least 20 networks and each network will support a maximum of 160 hosts. Would the following two subnet masks Work?

255.255.0.0 and or 255.255.255.0

Yes both would work.

Mask 255.255.0.0 has 8 bits for the subnet and 16 bits for the host

8 bits would accommodate 28=256 subnets

16 bits would accommodate 216= over 64000 hosts

Mask 255.255.255.0 has 16 bits for the subnet and 8 bits of the host.

Have possible 28 -2 hosts =254 which is enough.
