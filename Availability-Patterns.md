#Availability Patterns
There are 2 main patterns, Fail-over and Replication
- Fail-over means switching to a redundant or standby server/ system when hardware component fails or network failure causes the termination of the previously active application. 
- it is usually automatic
- Replication is keeping a copy of the same data in multiple places.
- the copy doesn't need to be the whole database. It can be some tables

Active - passive 
They can use a "Heartbeat" system that connects 2 servers. When working normally, there will be regular "pulse" between the main server and second server. When no "pulse" is detected, the second server will assume that the first has died and take over the first's duties.
- Ensures only the active server handles traffic
- Referred to as master-slave failover

Active - active
Both servers manage traffic and spread the load betweent them. The DNS will need to know both server's public IP if the servers are public facing. And if the servers are internal-facing, the application logic would need to know about both servers.
- if either server fails, the other server will take on more load
- This means that servers are not running on full capacity all the time
- Referred to as master-master failover

- Failover adds more hardware and additional complexity
- There is also a potential loss of data if the active system fails before newly written data can be copied to the passive