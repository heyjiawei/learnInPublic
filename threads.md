Threads:
- a thread is a stream within a process
- They have the same properties as process so they are called light weight processes
- Threads are executed one after another but gives the illusion that they are executing in parallel.

Each thread has:
1. a program counter
2. A register set
3. A stack space

There are 2 types of threads, User Level Thread and Kernal Level Thread

User Level Thread: implemented in the user library. They are not created with system calls. Hence, the Kernal doesn't know about user level thread and manages them as if they were single threaded processes. 
- This thread switching does not need to call OS and hence, will not interrupt the Kernal (thread switching is fast)

Kernal Level Thread:
The Kernal knows and manages these threads. The Kernal has a thread table that keeps track of all the threads in the system, in addition to the process table that keeps track of all the processes.
- This thread switching is called with system calls and hence, is slow and inefficient