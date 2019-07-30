Process Synchronization

- is a technique used to coordinate the processes that use shared data. There are 2 types of processes in an Operating System:
Independent process
Cooperating process

Process Synchronization is mainly used for Cooperating Process that shares the resources.

Where is process synchronization used? During Race Condition

Race Condition
- It is the condition where several processes tries to access the resources and modify the shared data concurrently 
- As the order of execution is random, it leads to data inconsistency.
- This condition can be avoided using the technique called Synchronization or Process Synchronization, in which we allow only one process to enter and manipulates the shared data in Critical Section.

A synchronization process has the following set up such that code will flow through in the order of 
entry section -> critical section -> exit section -> remainder section

Entry section: It is part of the process which decide the entry of a particular process in the Critical Section, out of many other processes.
Critical section: It is the part in which only one process is allowed to enter and modify the shared variable.This part of the process ensures that only no other process can access the resource of shared data.
Exit section: It comes after the critical section.
Remaineder section: other parts of the code other the above mentioned sections.

How does it prevent race condition?
It ensures that the critical section must satisfy 3 requirements:

Mutual Exclusion –
It states that no other process is allowed to execute in the critical section if a process is executing in critical section.

Progress –
When no process is in the critical section, then any process from outside that request for execution can enter in the critical section without any delay. 

Bounded Waiting –
An upper bound must exist on the number of times a process enters so that other processes are allowed to enter their critical sections after a process.

Process synchronization are handled by:
Software approach (algorithm)
1. Peterson’s Solution 
It uses two variables in the Entry Section so as to maintain consistency, like Flag (boolean variable) and Turn variable(storing the process states). It satisfy all the three Critical Section requirements.

Hardware approach
The Hardware Approach of synchronization can be done through Lock & Unlock technique.Locking part is done in the Entry Section, so that only one process is allowed to enter into the Critical Section, after it complete its execution, the process is moved to the Exit Section, where Unlock Operation is done so that another process in the Lock Section can repeat this process of Execution.This process is designed in such a way that all the three conditions of the Critical Sections are satisfied.
