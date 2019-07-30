Operating System Mutiple Processor Scheduling
- In this scheduling, multiple CPUs are available. 
- This scheduling is more complex as compared to single processor scheduling.

Approaches to implementing multiple processor scheduling:
- Asymmetric Multiprocessing: 
	- all the scheduling decisions and I/O processing are handled by a single processor which is called the Master Server and the other processors executes only the user code. 
- Symmetric Multiprocessing:
	- each processor is self scheduling.
	- All processes may be in a common ready queue or each processor may have its own private queue for ready processes.

Processor Affinity
- When a process runs on a specific processor there are certain effects on the cache memory. 
- The data most recently accessed by the process populate the cache for the processor and as a result successive memory access by the process are often satisfied in the cache memory. 
- Now if the process migrates to another processor, the contents of the cache memory must be invalidated for the first processor and the cache for the second processor must be repopulated.
- The cost of invalidating and repopulating caches is high. Hence most systems try to avoid migration of processes from one processor to another and try to keep a process running on the same processor. This is known as processor affinity.

Multicore Processors:
- multiple processor cores are places on the same physical chip.
- Each core has its register and has to maintain its architectural state. This thus makes it appear to the operating system as a separate processor. 
- They may complicate scheduling when the processor accesses memory then it spends a significant amount of time waiting for the data to become available. (This situation is called Memory Stall)
	- It occurs for various reasons such as cache miss, which is accessing the data that is not in the cache memory. This can cost processor to spend a significant time waiting for data to become available from memory.
- To solve this problem, hardware designs have implemented multithreaded processor cores in which two or more hardware threads are assigned to each core. 
	- This means that if one thread stalls while waiting for memory, the core can switch to another thread.
