Process-based multitasking and Thread-based multitasking:

Process Based Multitasking Programming:
- In process based multitasking two or more processes and programs can be run concurrently.
- In process based multitasking a process or a program is the smallest unit.
- Program is a bigger unit.
- Process based multitasking requires more overhead.
- Process requires its own address space.
- Process to Process communication is expensive.
- Here, it is unable to gain access over idle time of CPU.
- It is comparatively heavy weight.
- It has slower data rate multi-tasking.
e.g. Listening to music and browse the internet at the same time

Thread Based Multitasking Programming:
- In thread based multitasking two or more threads can be run concurrently.
- In thread based multitasking a thread is the smallest unit.
- Thread is a smaller unit.
- Thread based multitasking requires less overhead.
- Threads share same address space.
- Thread to Thread communication is not expensive.
- It allows taking gain access over idle time taken by CPU.
- It is comparatively light weight.
- It has faster data rate multi-tasking.

e.g. In a word-processing application like MS Word, we can type text in one thread and spell checker checks for mistakes in another thread.

Multi threading models:
User threads can be connected to Kernel threads in the following ways:
1. Many to Many Model
- Multiple user threads are mapped to multiple Kernal level threads.
- Number of kernel level threads are specific to the machine
- advantage of this model is if a user thread is blocked we can schedule others user thread to other kernel thread. Thus, System doesn’t block if a particular thread is blocked.

2. Many to One Model:
- multiple user threads mapped to one kernel thread.
- when a user thread makes a blocking system call entire process blocks. As we have only one kernel thread and only one user thread can access kernel at a time, so multiple threads are not able access multiprocessor at the same time.

3. One to One Model:
- one to one relationship between kernel and user thread
- multiple thread can run on multiple processor. Problem with this model is that creating a user thread requires the corresponding kernel thread.
