What are child processes?
It is a process created by another process (the parent process).
This techique pertains to multitasking operating systems, sometimes called a subprocess or a subtask

Unix like systems call the creation of a child process the fork system (POSIX standard)
Windows system call it spawn

Children created by fork/spawn:
- inherits most of its attributes such as file descriptors from its parent
- typically created as a copy of the parent, then overlay itself with different program
- There can be many child processes but they will have at most 1 parent process
- If a process does not have a parent, it usually indicates that it was created directly by the kernel

When a child process terminates, some information is returned to the parent process.

When a child process terminates before the parent has called wait, the kernal retains some information about the process, such as its exit status, to enable its parent to call wait later.

A child that is still consuming system resources but is not executing is known as a zombie process