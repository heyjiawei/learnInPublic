Inter-Process communication:

There are 2 types of processes: 
- Independent
- Cooperating

Independent processes
- are not affected by the exection of other processes.

Coorperating processes
- afftected by other executing processes

Inter-process communication (IPC) 
is a mechanism which allows processes to communicate with each other and synchronize their actions
- processes can communicate with each other through 2 ways
	- Shared Memory
	- Message Parsing

Shared Memory Method
- Let’s say there are two processes: the Producer and the Consumer. 
- The producer produces some item and the Consumer consumes that item. 
- The two processes shares a common space or memory location known as the “buffer,” where the item produced by the Producer is stored and from where the Consumer consumes the item if needed.

Problem: 
1. unbound buffer problem. The producer can keep producing items as there is no set size for the buffer.
In the bounded buffer problem, the Producer and the Consumer will share some common memory. Then the Producer will start producing items. If the total number of produced items is equal to the size of buffer, the Producer will wait until they’re consumed by the Consumer.
2. bound buffer problem. The producer can produce up to a certain number of items. And then start waiting for the consumer to consume them.
the Consumer first checks for the availability of the item, and if no item is available, the Consumer will wait for the Producer to produce it. If there are items available, the Consumer will consume them.

Message Parsing Method
If two processes p1 and p2 want to communicate with each other, they proceed as follows:
1. Establish a communication link (if a link already exists, no need to establish it again.)
2. Start exchanging messages using basic primitives. We need at least two primitives: send(message, destination) or send(message) and receive(message, host) or receive(message)

The message size can be fixed or variable. If it is a fixed size, it is easy for the OS designer but complicated for the programmer. If it is a variable size, then it is easy for the programmer but complicated for the OS designer. A standard message has two parts: a header and a body.

The header is used for storing the Message type, destination id, source id, message length, and control information. The control information contains information like what to do if it runs out of buffer space, the sequence number, and its priority. Generally, the message is sent using the FIFO style.

