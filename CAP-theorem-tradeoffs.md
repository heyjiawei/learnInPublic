High Level Tradeoffs

Performance vs Scalability
performance = when the system is slow for a single user
scalability = when increasing the load makes the system slow for all users

Scalability cannot be an afterthought. 
- it also needs to factor in softwares and hardwares that will be different from today. These software/hardware will be able to process things much faster and will make systems that rely on uniform algorithm break or underutilise these newer resources.

Latency vs Throughput
- Latency is the amount of time taken to finish a task. It is measured by units of time.
	- E.g. Man Days to complete a screen
- Throughput is the number of tasks being executed at the moment. It is a measurement of results per unit time
	- E.g. Projects running per man day

You should strive for maximum throughput (fully use all resources available) with acceptable latency

CAP Theorem
States that in distributed systems, there can only be 2 out of the 3:
- Consistent - Every request receives the most recent response
- Available - Every request receives a response. This information might not be the latest but it banks on eventual consistency to solve the information gap
- Partition Theorem - Your system will continue working even if there is a network partition. A network partition means that the nodes in your cluster cannot talk to each other. This can be due to node failure, or network partition.

As networks aren't reliable, Partition Theorem must be selected at all cost. This means that you must tolerate partitions in a distributed system

This leads to the following 2 choices:
Consistent + Partition Theorem
- When there is a down time, your request will continue to receive 404 or timeout error. 
- Use this if business needs require atomic read and write - updates must go through or they will be rolled-back

Available + Partition Theorem
- When there is a down time, your request will continue to return the last receive/ last available data
- Writes will be entered when the system is up again
- Use this if business needs allow for eventual consistency, or when the system needs to work dispite network errors.