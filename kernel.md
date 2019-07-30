What is a kernel?
The kernel is a computer program that is the core of a computer's operating system. It has complete control over everything in the system. 

- On most systems, it is one of the first programs loaded on start-up.
- It handles the rest of start-up as well as input/output requests from software, translating them into data-processing instructions for the central processing unit (CPU)
- It handles memory and peripherals like keyboard, monitors, printers and speakers.
- The critical code of the kernel is usually loaded into a seprate area of memory. 

The kernel runs processes, manage hardware devices such as hard disk, and handle interrupts in this protected kernel space. 
In contrast, everything a user does is in the user space - programs running on a GUI
This separation prevents user data and kernel data from interfering with each other and causing instability and slowness, as well as preventing malfunctioning application programs from crashing the entire operating system.

The kernel's interface is a low level abstration layer. Thus, when a process makes requests to the kernel, it is called a system call.

Kernel designs differ in how they manages these system calls and resources. 
- a monolithic kernel runs all the operating system instructions in the same address space for speed
- a microkernel runs most processes in user space for modularity

The kernel's primary job is to mediate access to the computer's resources, such as the following:
1. The CPU
The CPU is responsible for running or executing programs. 
The kernel takes responsibility for deciding at any time which of the many running programs should be allocated to the processor(s)

2. The RAM (Random-access memory)
RAM is used to store both program instructions and data. Typically, both program instruction and data need to be present in memory in order for a program to execute. 
- Often, multiple programs will want access to memory, frequently demanding more memory than the computer has available. 
The kernel is responsible for deciding which memory each process can use, and determining what to do when there is insufficient memory

3. Input/Output (I/O) devices
I/O devices such as keyboards, mice. The kernel allocates requests from applications to perform I/O to an appropriate device provides convenient methods for using the device. 
The kernel allocates requests from applications to perform I/O to an appropriate device and provides methods for using the device - usually by abstration, to the point where the application does not need to know the implementation details of the device

Memory management in depth:
- To allow processes to safely access memory as they require it, the kernel does virtual addressing.
- Virtual addressing is usually achieved by paging and/or segmentation. It allows the kernel to make a given physical address appear to be another address - the virtual address.
- Virtual address spaces may be different for different processes. This allows every program to behave as if it is the only one running and thus, prevents applications from crashing with each other
On many systems, a program's virtual address may refer to data which is not currently in memory. The indirection provided by virtual addressing allows the operating system to use other data stores, like a hard drive, to store what would otherwise remain in RAM - this is how operating systems allow programs to use more memory than the system has physically available.

When a program requires data that is not currently in RAM, the CPU signals the kernel and the kernel responds by writing the contents of an inactive memory block to disk before replacing it with data requested by the program.
The program can then be resumed from the point where it was stopped. This scheme is known as demand paging.

System calls indepth:
A system call is how a process requests a service from an operating system's kernel. This is normally done when the process does not have permission to run.
- System calls provide the interface between a process and the operating system.
- Most operations interacting with the system require permissions not available to a user level process.
- Generally, the operating system provides a library that sits between the operating system and normal programs. This library handles low-level details of passing information to the kernel and switching to supervisor mode. 
- System calls include close, open, read, wait and write.