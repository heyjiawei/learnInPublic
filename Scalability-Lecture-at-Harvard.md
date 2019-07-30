Scalability Lecture at Harvard
Web host vs Virtual Private Server (VPS)
- you get your own copy of OS. Your own VM for VPS
Eitherway, your data will still be expose to the hosting company. They can always access your account by rebooting the hardware

Vertical Scaling (direct solution of adding what you lack. "Throwing money" solution)
- Increase RAM
- increase processors
- increase more disk space
Not a full solution due to hardware limitation

quad core = 4 cores = your computer can do 4 different things (programs) at time.
They still use 1 chip though

Having a quad core server (compared to a single core server) means:
- You can handle 4 requests at a time (as compared to 1 for single core). You can handle requests in parallel

Horizontal Scaling (use cheap servers but scale your application in a way that won't hit the limit)
- multiple servers
- load balancer

load balancer: distribute request among the multiple servers
- has an IP address for clients to query
- figures out which server to pass request to
- Simple round robin IP address handling (e.g. acting as a DNS), there is the possibility of an unlucky server having a heavy load and crashing. Round robin handling would still cause requests to be sent to that crashed server

When you have multiple servers, you then face the challenge of *how* you should distribute your app.
- naive way: copy your app to all servers
- Partition each server to handle a specific resource. This will cause some servers to be more busy than others. Also if a server goes down, there's no backup

public vs private IP address
- private IP address are inaccessible by the world. They can be set with any IP address you want
- They also help reduce the number of IP address to use (world running out of 32bit IP address) so one can access the load balance which will have 1 IP address to go to either server, which will have private IP addresses

Cookies in HTTP, Session in PHP
Load balancer have trouble with sessions and cookies:
- sessions tend to be bind to 1 specific machine (saved to server's tmp directory)
	- native solution: bind this user's session to that particular server. Binding stops when session expires. This is called sticky session. Its not very good. Generally you do not want users data tied to a specific server
	- have a dedicated server (aka. centralised data store) to store these tmp files. This server will be connected to all the servers
- cookies are stored on users browsers. They typically are kB size. You can store the server's IPn the client's cookie
	- The backend IP can change
	- Principle of not disclosing internal details is violated (prevent cookie spoofing, unintended behaviour)
	- You can instead convert the IP address to a hash and send that back to the load balancer. The load balancer will then decipher it
- cookies can be disabled by user

Redundant array of independent disks (RAID)
- these RAIDs assume you have multiple harddrives in your computer

Caching dynamic pages
- saving it to a .html file instead of MySQL db etc. is much faster as web servers are good at spitting out static content quickly (file based caching)
	- space constraints
	- a full html file with no server side mechanism will make it difficult to change the html styling, or anything on the page. You will need to change it in many files at one go

MySQL Query Cache - caching complicated query structure so there is no more parsing
Memcache
- software on server
- store everything in RAM on server
- when your cache gets very big, you can have a garbage collector or an expiry policy

Single point of failures 
- any component that is a standalone is susceptable to this
- we can have master node replication for these components

Partitioning load balancer by names/ domains
- names starting from a - m goes to a 1 load balancer, n to z goes to another load balancer. However, this makes it difficult to interact between servers.

High availability:
- one server checking on another to make sure the other is not dead. If dead, the alive one will take on the other's responsibility. (Master replication/ promoting a slave node to master)

External components like an external database or an external cache
- external means that this data store does not reside on the application server. It resides on another server

Deploying to multiple servers:
- to ensure all application servers get the latest code change
- you can use tools like Capistrano
- You can also create an image file (container image file) that have the application server configurations set up. With this image file, we can copy this setup to new application servers.