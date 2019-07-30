#DNS system
DNS = Domain Name System
- The DNS is a database that works like a phone book for computers: it converts a domain name, such as “www.example.com,” to a machine-readable IP address, such as “22.231.113.64.” 
- The DNS is maintained by several organizations, including IANA (Internet Assigned Numbers Authority) and ICANN (Internet Corporation for Assigned Names and Numbers).

Note that you can purchase multiple domain names separately from web servers. Domain names and web servers are separate issues, hence the existance of name servers. This is to allow you to enter 1 or more domain name to point to their respective web servers. (You can have multiple domain names point to the same web server)

NS Record
- NS = Name Server. It is an actual server. Most likely ran by the web host companies.
- Name servers are provided by web hosts
- Most nameservers provided by hosts look something like ns1.yourhostdomain.com
- In a nutshell, a nameserver is any server that has DNS software installed on it
- But usually, “nameserver” refers to a server owned by a web host. It is specifically used to manage the domain names associated with their web hosting customers.
- Your domain's nameserver would direct traffic (those that type your domain name) to the web server that your web host is using to host your website

1. You type “www.example.com” into your browser.
2. Your browser uses DNS to look up the nameservers for www.example.com.
3. The nameservers ns1.yourhostdomain.com and ns2.yourhostdomain.com are retrieved.
4. Your browser uses the nameservers to look up the IP address for www.example.com.
5. Your browser gets the response: “22.231.113.64”
6. Your browser sends a request to 22.231.113.64, including the specific page you’re trying to reach.
7. The web server hosting your website sends the requested page to your browser.

MX record (Mail Exchange record)
Specifies the mail servers for accepting messages.

A record (address)
- Points a domain/subdomain to an IP address
- A Records are only able to take 1 IP address as their value. You can point the same domain/subdomain to multiple IP addresses by adding another A Record with the same name but with a different IP address for the value.

CNAME Record
- Canonical Name
- For instance, you can have the canonical name store to point to thor.openhostingservice.com, which then points to an IP address. You can also have it point to another canonical name.
- CNAME are for custormers. They allow customers to change the IP address of a server without having to make their own DNS adjustment