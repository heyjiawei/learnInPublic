Operating System Process Management

- A process is a program in execution.
- A process is an ‘active’ entity, as opposed to a program, which is considered to be a ‘passive’ entity. A single program can create many processes when run multiple times; for example, when we open a .exe or binary file multiple times, multiple instances begin (multiple processes are created).

What does a process look like in memory:
- it consist of the following sections:
	- stack: the stack contains temporary data, such as function parameters, returns addresses, and local variables
	- data section: contains the global variable
	- heap section: dynamically allocates memory to the process during its runtime
	- text section: the process. It also includes the current activity represented by the value of the Program Counter.

A process has the following attributes: (this attributes are also known as the context of the process)
1. Process Id
2. Process state (ready, running, etc)
3. CPU registers (CPU registers must be saved and restored when a process is swapped in and out of CPU)
4. (User) Accounts information
5. I/O status information (e.g. devices allocated to the process. The number of open files etc.)
6. CPU scheduling information (different processes may have different priorities. A short process may be assigned a low priority in the shortest job first scheduling)

- every process has its own Program Control Block (PCB) (each process PCB is thus unique)

States of a process:
1. New (newly created process or being-created process)
2. Ready (a process that is ready for execution)
3. Run (currently running process in CPU)
4. Wait (or Block) When a process requests I/O access
5. Complete (or Terminated) The process has completed its execution
6. Suspended Ready (When the Ready queue is full, some processes are offload to the suspend ready state)
7. Suspended Block (When Wait or Block queue is full)

Context Switching:
- us the process of saving the context of one process and loading the context of another process.
- i.e. The loading and unloading of a process as it changes from running state to ready state
- Only the kernel can cause a context switch.

When does context switching happen?
1. When a high-priority process comes to ready state (i.e. with higher priority than the running process)
2. An Interrupt occurs
3. User and kernel mode switch (It is not necessary though)
4. Preemptive CPU scheduling used.

Mode Switch
- A mode switch occurs when CPU privilege level is changed, for example when a system call is made or a fault occurs. 
- The kernel works in more a privileged mode than a standard user task. If a user process wants to access things which are only accessible to the kernel, a mode switch must occur.
- The currently executing process need not be changed during a mode switch.

Types of process schedulers:
Long term or job scheduler
- Makes decision about how many processes should be made to stay in the ready state and this decides the *Degree of multiprogramming* (i.e., number of process present in ready state at any point of time). Once decision is taken it lasts for long time hence called long term scheduler.

Short term or CPU scheduler
- It is responsible for selecting one process from ready state for scheduling it on the running state.
- Short-term scheduler only selects the process to schedule it doesn’t load the process on running.
- Dispatcher is a software that moves process from ready to run and vice versa. (It is responsible for loading the process selected by Short-term scheduler on the CPU)

A dispatcher does following:
1) Switching context.
2) Switching to user mode.
3) Jumping to the proper location in the newly loaded program.

Medium term - swapping time
- It is responsible for suspending and resuming the process. It mainly does swapping (moving processes from main memory to disk and vice versa).

CPU Scheduling:
Why do we need CPU scheduling? 
- In multiprogramming systems, one process can use CPU while another is waiting for I/O. This is possible only with process scheduling.

Time terminology:
Arrival Time:       Time at which the process arrives in the ready queue.
Completion Time:    Time at which process completes its execution.
Burst Time:         Time required by a process for CPU execution.
Turn Around Time:   Time Difference between completion time and arrival time.          
     Turn Around Time = Completion Time - Arrival Time

Waiting Time(W.T): Time Difference between turn around time and burst time.
     Waiting Time = Turn Around Time - Burst Time

Scheduling Algorithms:
First Come First Server (FCFS)
- schedules according to arrival time of processes

Shortest Job First (SJF)
- Process which have the shortest burst time are scheduled first.

Longest Job First (LJF)
- we give priority to the process having the longest burst time. 
- This is non-preemptive in nature i.e., when any process starts executing, can’t be interrupted before complete execution.

Shortest Remaining Time First (SRTF)
- It is preemptive mode of SJF algorithm in which jobs are schedule according to shortest remaining time.

Longest Remaining Time First(LRTF): 
- It is preemptive mode of LJF algorithm in which we give priority to the process having largest burst time remaining.

Round Robin Scheduling: 
- Each process is assigned a fixed time in cyclic way.

Priority Based scheduling (Non Preemptive): 
- In this scheduling, processes are scheduled according to their priorities, i.e., highest priority process is schedule first. If priorities of two processes match, then schedule according to arrival time.

Highest Response Ratio Next (HRRN): 
- In this scheduling, processes with highest response ratio is scheduled. This algorithm avoids starvation.
Response Ratio = (Waiting Time + Burst time) / Burst time

Multilevel Queue Scheduling: 
- According to the priority of process, processes are placed in the different queues. 
- Generally high priority process are placed in the top level queue. 
- Only after completion of processes from top level queue, lower level queued processes are scheduled.

Multi level Feedback Queue Scheduling: 
- It allows the process to move in between queues. 
- The idea is to separate processes according to the characteristics of their CPU bursts. 
- If a process uses too much CPU time, it is moved to a lower-priority queue.

Non-preemptive scheduling:
- used when a process terminates,
- or when a process switches from running to waiting state.
- Once resources are allocated to a process, the process holds the CPU (or resource) until it gets terminated or it reaches the waiting state (basically, holds on to resources until the process completes its CPU burst time)
- Algorithms based on this scheduling are:
	- SRTF
	- Priority (pre-emptive version)

Preemptive scheduling:
- When a process switches from running state to ready state or
- From waiting state to ready state.
- The resources are alloceted to the process for the limited amount of time. Then it is taken away and the process is placed back in the ready queue if the process still has CPU burst time remaining. That process stays in ready queue until it gets the next chance to execute
- Algorithms based on this scheduling are:
	- Round Robin (RR)
	- SJF
	- Priority (pre-emptive)

Starving and Aging in OS
One of the most common scheduling algorithms in batch system is priority scheduling. Process with the highest priority is executed first. Hence a major problem from this scheduling is:

Starvation:
- the indefinite blocking of a process
- In heavily loaded computer system, a steady stream of higher-priority processes can prevent a low-priority process from ever getting the CPU.

Deadlock vs starvation:
- Deadlock occurs when none of the processes in the set is able to move ahead due to occupancy of the required resources by some other process. 
- On the other hand Starvation occurs when a process waits for an indefinite period of time to get the resource it requires.
- Other name of deadlock is Circular Waiting. Other name of starvation is Lived lock.
- When deadlock occurs no process can make progress, while in starvation apart from the victim process other processes can progress or proceed.

Solution to starvation: Aging
- Aging is a technique of gradually increasing the priority of processes that wait in the system for a long time.

