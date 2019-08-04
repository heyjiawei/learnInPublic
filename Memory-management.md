Memory management

Memory Units:
- computer memory are made up of registers. We can think of registers as index of a table.
- Each register in memory is one storage location. Storage location are also called memory location. They are identified using Address. 
	- You can think of a row as the memory location
- The total number of bits a memory location can store is its capacity.
- A storage element (a column of the row) is called a Cell.

- a memory unit consist of data lines, address selection lines and control lines (specify the direction of transfer. In would mean writing to memory and Out would mean reading from memory)

Requirements of Memory Management System:
Memory management keeps track of the status of each memory location (whether it is allocated or free).
It allocates memory dynamically to the programs at their request and free it for use when it is no longer needed

Relocation:
- as available memory is shared amoung a number of processes in a multiprogramming system, it is not possible to know in advance which other programs will reside in main memory at the time of exection of a program.
- hence, there is a swapping of active processes in and out of the main memory to allow the operating system to have a larger pool of ready to execute process.
- WHen a program gets swapped out to disk, it may not occupy the same memory location when it is swapped back into main memory. This is called relocation
- Within a program, there are memory references in various instructions and these are called logical addresses.
- After loading of the program into main memory, the processor and the operating system must be able to translate logical addresses into physical addresses. 

Protection:
- when we have multiple programs at the same time, one program may write to the address space of another program.
- So every process must be protected against unwanted interference when other process tries to write in a process whether accidental or incidental
- Between relocation and protection requirement a trade-off occurs as the satisfaction of relocation requirement increases the difficulty of satisfying the protection requirement.
- As we cannot predict the location of a program in main memory, there is dynamic calculation of the address at runtime.
- The dynamic calculation is done by the processor rather than the operating system because the operating system can hardly control a process when it occupies the processor.
- hence checking the validity of memory reference is dynamic

Sharing:
- must have allow several processes to access the same portion of main memor instead of allowing each processes access to have their own separate copy

Memory management techniques:
Single contiguous allocation:  Simplest allocation method used by MS-DOS.  
                All memory (except some reserved for OS) is available to 
                a process.

Partitioned allocation: Memory is divided in different blocks

Paged memory management: Memory is divided in fixed sized units called 
                page frames, used in virtual memory environment.

Segmented memory management: Memory is divided in different segments (a 
                segment is logical grouping of process' data or code)
                In this management, allocated memory does'nt  have to 
                be contiguous.
Segmentation with Paging. A process is divided in segments and individual segments have pages.

