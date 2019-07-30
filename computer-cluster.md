What is a computer cluster?
A computer cluster is a set of loosely or tightly connected computers that work together. These computers can be viewed as a single system - each of them are called a node and they are set to perform the different tasks, controlled and scheduled by software.

- A cluster is usually connected to each other through fast local area networks (LAN). 
- LAN is a computer network that interconnects computers within a limited area such as a residence, school, office building. Ethernet and Wifi are the 2 most common technologies used for LAN.
- Each node (a node is a computer used as a server) running its own instance of an operating system. Most of time, all nodes use the same hardware and the same operating system
- It is, however, possible to use different operating systems on each computer, or different hardware

Clusters are usually deployed to improve performance and availability over a single computer, and are typically more cost-effective than single computers of comparable speed or availability.

The desire to get more computing power and better reliability by orchestrating a number of low-cost commercial off-the-shelf computers gave rise to today's variety of architectures and configurations.

Single system image concept:
- The activities of computing nodes are orchestrated by 'clustering middleware', which is a software layer that sits atop the nodes and allow users to treat the cluster as 1 large cohesive comuting unit

Computer clustering relies on a centralized management approach which makes the nodes available as orchestrated shared servers. It is different from other approaches such as peer to peer or grid computing

Attributes of clusters:
Note that attributes described below are not exclusive (the can overlap)
1. Load-balancing
These clusters are configured to share computational workload to provide better overall performance.
For example, a web server cluster may assign different queries to different nodes so that the overall response time will be optimized.
- However, approaches to load-balancing may differ among applications. A high-performance cluster used for scientific computations would balance load with different algorithms as compared to a web-server cluster, which may opt to use a simple round-robin method assignment

Computer clusters are used for computation-intensive purposes rather than handling IO-oriented operations (such as web services or databases)

2. High-availability clusters (aka failover clusters or HA clusters)
The operate by having redundant nodes, which are used to provide service when system components fail. 
- HA cluster implementations attempt to use redundancy to eliminate single points of failure.

Clusters have the ability to add nodes horizontally. More computers can be added to the cluster to improve performance, redundancy and fault tolerance. 

One of the issues in designing a cluster is how tightly coupled the individual nodes should be. 
- For instance, a single computer job may require frequent communication among nodes: this implies that the cluster shares a dedicated network, is densely located, and probably has homogeneous nodes. The other extreme is where a computer job uses one or few nodes, and needs little or no inter-node communication, approaching grid computing.

Communication between cluster nodes:
Two widely used approaches for communication between cluster nodes are Message Passing Interface (MPI) and Parallel Virtual Machine(PVM)
- PVM must be directly installed on every cluster node and provides a set of software libraries that paint the node as a "parallel virtual machine". PVM provides a run-time environment for message-passing, task and resource management, and fault notification. PVM can be used by user programs written in C, C++, or Fortran, etc.
-  MPI implementations typically use TCP/IP and socket connections. MPI is now a widely available communications model that enables parallel programs to be written in languages such as C, Fortran, Python, etc. Thus, unlike PVM which provides a concrete implementation, MPI is a specification which has been implemented in systems such as MPICH and Open MPI

Challenges in cluster management - The cost of administrating N independent machines.
The also made virtual machines popular
1. Task scheduling
When a large multi-user cluster needs to access very large amounts of data, task scheduling becomes a challenge. In a heterogeneous CPU-GPU cluster with a complex application environment, the performance of each job depends on the characteristics of the underlying cluster. Therefore, mapping tasks onto CPU cores and GPU devices provides significant challenges. This is an area of ongoing research; algorithms that combine and extend MapReduce and Hadoop have been proposed and studied.

2. Node failure management
and studied.[21]

Node failure management
When a node in a cluster fails, strategies such as "fencing" may be employed to keep the rest of the system operational.
- Fencing is the process of isolating a node or protecting shared resources when a node appears to be malfunctioning. 
There are two classes of fencing methods; one disables a node itself, and the other disallows access to resources such as shared disks.