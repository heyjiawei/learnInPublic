Zombie Processes:
- when a process is created using fork() system call, the address space of the Parent process is replicated
- If the parent process calls wait() system call, the execution of the parent is suspended until the child is terminated
- When the child process is terminated, a signal is generated. This signal is delivered to the parent by the Kernal
- On receiving this signal, the parent process reaps the status of the child from the process table
- On collecting this status, the entery is deleted from the process table and all traces of the child process are removed from the system.

- A zombie process is formed when the parent decides not to wait for the child's termination and execute its subsequent task. 
- When the child process terminates, the exit status is not read and hence, there remains an entry in the process table even after the termination of the child
- The state of the child process is known as Zombie state

Why do we need to prevent the creation of Zombie process?
- There is one process table per system. The size of the process table is finite. 
- If too many zombie processes are generated, then the process table will be full. That is, the system will not be able to generate any new process, then the system will come to a standstill. 
