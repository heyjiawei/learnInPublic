Operating System - difference between multitasking, multithreading and multiprocessing

CPU - Central Processing Unit (or processor) is the main chip in a computer responsible for carrying out all tasks. It’s responsible for telling all the other components in a computer what to do, according to the instructions it is given by the programs (software) running on that computer.

Multi-programming:
- The main idea of multi programming is to maximize the CPU time.
- Multi programming: A computer running more than one program at a time on a single CPU (processor)
- In a computer system, there are multiple processes waiting to be executed
- These processes are also known as jobs
- Now the main memory is too small to accommodate all of these processes or jobs into it. Thus, these processes are initially kept in an area called job pool.
- This job pool consists of all those processes awaiting allocation of main memory and CPU.
- The CPU selects one job from the job pool and brings it to main memory. There, the processor executes one job until it is inerrupted by some external factor, or goes for an I/O task

- In a multi-programmed system, as soon as one job goes for an I/O task, the Operating System interrupts that job, chooses another job from the job pool (waiting queue), gives CPU to this new job and starts its execution. The previous job keeps doing its I/O operation while this new job does CPU bound tasks. Now say the second job also goes for an I/O task, the CPU chooses a third job and starts executing it. As soon as a job completes its I/O operation and comes back for CPU tasks, the CPU is allocated to it.

- There are 2 types of multiprogramming
	- Pre-emption: the process is forcefully moved from CPU. This is also called time sharing or multitasking
	- Non pre-emption: Processes are not removed until they complete the execution

- Degree of multiprogramming
	- The number of process that can reside in the ready state at maximum decides the degree of multiprogramming, e.g., if degree of programming = 100 means 100 processes can reside in the ready state at maximum.

Multiprocessing:
- Multiprocessing refers to the hardware (i.e., the number of CPU units) rather than the software (i.e., the number of running processes). 
- If the underlying hardware provides more than one processor then that is multiprocessing. It is the ability of the system to leverage multiple processors’ computing power.
- Multiprocessing is the use of two or more CPUs (processors) within a single Computer system.
- The term also refers to the ability of a system to support more than one processor within a single computer system. 
- Now since there are multiple processors available, multiple processes can be executed at a time. 
- These multi processors share the computer bus, sometimes the clock, memory and peripheral devices also.

e.g. 4 processes - P1 P2 P3 P4
If its a dual-core processor (2 processors), two processes can be executed simultaneously and thus will be two times faster.
P1 and P3
P2 and P4
similarly a quad core processor will be four times as fast as a single processor.

- With multiprocessors, if one processor fails, the work does not halt. It only slows down.

Difference between Multi programming and Multi processing:
The difference between multiprocessing and multi programming is that Multiprocessing is basically executing multiple processes at the same time on multiple processors, whereas multi programming is keeping several programs in main memory and executing them concurrently using a single CPU only.
- Multiprocessing occurs by means of parallel processing whereas 
- Multi programming occurs by switching from one process to other (phenomenon called as context switching).

Multitasking:
- multi tasking refers to execution of multiple tasks (say processes, programs, threads etc.) at a time.
- Multitasking is a logical extension of multi programming. 
	- The major way in which multitasking differs from multi programming is that multi programming works solely on the concept of context switching whereas multitasking is based on time sharing alongside the concept of context switching.

- Multitasking works by CPU allocating each task a unit of time to execute. 
- The CPU makes the processes to share time slices between them and execute accordingly. As soon as time quantum of one process expires, another process begins its execution.
- a context switch is occurring but it is occurring so fast that the user is able to interact with each program separately while it is running. This way, the user is given the illusion that multiple processes/ tasks are executing simultaneously. But actually only one process/ task is executing at a particular instant of time. 

- At any time the CPU is executing only one task while other tasks are waiting for their turn. The illusion of parallelism is achieved when the CPU is reassigned to another task. i.e all the three tasks A, B and C are appearing to occur simultaneously because of time sharing.
- So for multitasking to take place, firstly there should be multiprogramming i.e. presence of multiple programs ready for execution. And secondly the concept of time sharing.

Multi threading:
- the ability of a process to manage multiple requests at a time without having multiple copies of the program opened.
- It is an execution model that allows a single process to have multiple code segments run concurrently within the context of that process.

threads:
- we can think of them as child processes that share the parent process resources, but execute independently
- in a single process, we can use mutiple threads for multiple functionality
- advantage of multi threading is that it is less costly. Creating brand new processes and allocating resources is a time consuming task, but since threads share resources of the parent process, creating threads and switching between them is comparatively easy. Hence multi threading is the need of modern Operating Systems.
