Inter-process communication (IPC) methods:

Pipes (Same Process) –
This allows flow of data in one direction only. Analogous to simplex systems (Keyboard). Data from the output is usually buffered until input process receives it which must have a common origin.

Names Pipes (Different Processes) –
This is a pipe with a specific name it can be used in processes that don’t have a shared common process origin. E.g. is FIFO where the datails written to a pipe is first named.

Message Queuing –
This allows messages to be passed between processes using either a single queue or several message queue. This is managed by system kernel this messages are co-ordinated using an API.

Semaphores –
This is used in solving problems associated with synchronization and to avoid race condition. These are integer values which are greater than or equal to 0.

Shared memory –
This allows interchange of data through a defined area of a memory. Semaphore values has to be obtained before data can get access to a shared memory.

Sockets –
This method is mostly used to communicate over a network between a client and a server. It allows for a standard connection which is computer and OS independent.

Message based communication
- message is  recognized as any discrete data that is moved from one entity to another. 
- It includes any kind of data representation having restriction of size and time, whereas it invokes a remote procedure or a sequence of object instance or a common message.
- “message-based communication model” can be beneficial to refer various model for inter-process communication, which is based on the data streaming abstraction.

The following are some major distributed programming models that use message-based communication model:

Message Passing –
In this model, the concept of message as the major abstraction of model is introduced. The units which inter-change the data and information that is explicitly encode, in the form of message. According to then model, the schema and content of message changes or varies. Message Passing Interface and OpenMP are major example of this type of model.

Remote Procedure Call –
This model explores the keys of procedure call beyond the restrictions of a single process, thus pointing the execution of program in remote processes. 
uses client-server is implied. 
A remote process maintains a server component, thus enabling client processes to invoke the approaches and returns the output of the execution. 
Messages, created by the Remote Procedure Call (RPC) implementation, retrieve the information of the procedure itself and that procedure is to execute having necessary arguments and also returns the values. 
The use of messages regarding this referred as marshal-ling of the arguments and return values.

Distributed Objects -
an implementation of RPC but with Object-oriented model. The remote invocation of methods extended by objects.
This model is stateless by design.
E.gs Common Object Request Broker Architecture (CORBA), Component Object Model (COM, DCOM and COM+), Java Remote Method Invocation (RMI), and .NET Remoting are some major examples which falls under Distributed object infrastructure.

Web Services –
Web service technology delivers an approach of the RPC concept over the HTTP, thus enabling the communication of components that are evolved with numerous technologies. A web service is revealed as a remote object maintained on a Web server, and method invocations are transformed in HTTP requests wrapped with the help of specific protocol. It is necessary to observe that the concept of message is a basic abstraction of inter-process communication and it is utilized either implicitly or explicitly.
