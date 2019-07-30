Operating System
- is an interface to use the computer hardware.
- is concerned with resource allocation. The operating system correspondingly includes programs to manage these resources, such as a traffic controller, a scheduler, memory management module, I/O programs, and a file system.

The goals of an operating system:
1. make the computer more convenient to use
2. Make computer system resources be used in an efficient manner
3. Ability to evolve. An OS should be constructed in such a way as to permit the effective development, testing and introduction of new system functions without at the same time interfering with service.

Levels (Top to bottom)
(Top) 
- Users (could be more than 1)
- System and application programs (.e.g. business programs, database programs)
- Operating System (e.g. compilers, loaders, editors, OS)
- Computer hardware (e.g. CPU, ALU and I/O devices, peripheral device and storage device)

The OS must support the following tasks:
1. Provide an editor to allow creating, modification of programs and data files.
2. Access compiler so as to translate users program that is running from a high level language to machine language
3. Provide a loader program to move compiled code to the computer's memory for execution
4. Provide routines that handle the details of I/O programming

I/O System management
- keeps track of the status of devices
- alled the I/O traffic controller
The I/O subsystem consists of
- A memory Management component that includes buffering caching and spooling.
- A general device driver interface.

buffering: the process of a set amount of data going to be stored in order to preload the required data right before it gets used by the CPU.
caching: a process of storing data in a temporary storage area, with the goal of faster retrivals
spooling: a process where data is temporarily held to be used. It is an acronym for simultaneous peripheral operations online

Loader:
- In general, the loader must load, relocate and link the object program. 
- Loader is a program that places programs into memory and prepares them for execution. 

Types of operating systems:
1. Batch operating systems
2. Time-Sharing Operating Systems
	- Each task has given some time to execute, so that all the tasks work smoothly. Each user gets time of CPU as they use single system. These systems are also known as Multitasking Systems. The task can be from single user or from different users also. The time that each task gets to execute is called quantum. After this time interval is over OS switches over to next task.
3. Distributed Operating Systems
	- The major benefit of working with these types of operating system is that it is always possible that one user can access the files or software which are not actually present on his system but on some other system connected within this network i.e., remote access is enabled within the devices connected in that network.
4. Network Operating System
	- These type of operating systems allows shared access of files, printers, security, applications, and other networking functions over a small private network. One more important aspect of Network Operating Systems is that all the users are well aware of the underlying configuration, of all other users within the network, their individual connections etc. and that’s why these computers are popularly known as tightly coupled systems.
5. Real-Time Operating System 
	- Real-time systems are used when there are time requirements are very strict like missile systems, air traffic control systems
	- 2 types of  real-time operating systems. Hard real-time systems and soft real-time systems


Hard real-time systems:
- These OSs are meant for the applications where time constraints are very strict and even the shortest possible delay is not acceptable. 
- These systems are built for saving life like automatic parachutes or air bags which are required to be readily available in case of any accident. 
- Virtual memory is almost never found in these systems.

Soft real-time systems:
- These OSs are for applications where for time-constraint is less strict.
- This type of system can miss its deadline occasionally with some acceptably low probability. Missing the deadline have no disastrous consequences. 

Types of computer memory:
- 2 basic types: Primary Memory (Volatile memory/ main memory) i.e. Random Access Memory (RAM) and Secondary memory (Non volatile memory) i.e. Read Only Memory (ROM)

Random Access Memory (RAM)
- it is a volatile memory as the data is lost when the power is turned off
- The programs and data that the CPU requires during execution of a program are stored in this memory
- RAM is further classified into 2 types, Static Random Access Memory (SRAM) and Dynamic Random Access Memory (DRAM)

Read Only Memory (ROM)
- is not volatile so it always retains its data.
- stores crucial information essential to operate the system
- ROM is further classified into 4 types- ROM, PROM, EPROM, and EEPROM.

Difference between 32 bit and 64 bit operating systems
- there exist two type processor i.e., 32-bit and 64-bit.
- These processor tells us how much memory a processor can have access from a CPU register.
- A 32-bit system can access 2^32 memory addresses
	- This is 4GB of RAM or physical memory
- A 64-bit system can access 264 memory addresses
	- In short, any amount of memory greater than 4 GB can be easily handled by it.

- The CPU register stores memory addresses. This is how the processor accesses data from RAM
- One bit in the register can reference an individual byte in memory. So a 32 bit system will have 2^32 bit permutations, and hence, has an address of 4 GB maximum.
- The actual limit is often less around 3.5 GB, since part of the register is used to store other temporary values besides memory addresses. 
- What’s important is that a 64-bit computer (which means it has a 64-bit processor) can access more than 4 GB of RAM. If a computer has 8 GB of RAM, it better have a 64-bit processor. Otherwise (if it is a 32-bit processor), at least 4 GB of the memory will be inaccessible by the CPU 
- A computer with a 64-bit processor can have a 64-bit or 32-bit version of an operating system installed. However, with a 32-bit operating system, the 64-bit processor would not run at its full capability.


- A major difference between 32-bit processors and 64-bit processors is the number of calculations per second they can perform, which affects the speed at which they can complete tasks.
- 64-bit processors can come in dual core, quad core, six core, and eight core versions for home computing. 
- Multiple cores allow for an increased number of calculations per second that can be performed, which can increase the processing power and help make a computer run faster. 
- Software programs that require many calculations to function smoothly can operate faster and more efficiently on the multi-core 64-bit processors, for the most part.
