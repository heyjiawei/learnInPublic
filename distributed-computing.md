What is distributed computing?
A distributed system is a model in which components located on networked computers (A computer network, or data network, is a digital telecommunications network which allows nodes to share resources) communicate and coordinate their actions by passing messages.

The terms concurrent computing, parallel computing and distributed computing have a lot of overlap. There is no clear distinction between them.

Parallel computing and distributed computing can be roughly classified into using the following criteria:
1. In parallel computing, all processors may have access to a shared memory to exchange information between processors
2. In distributed computing, each processor have its own private memory. Information is exchanged by passing messages between processors.

3 significant characteristics of distributed systems are
1. concurrency of components
2. lack of a global clock
3. independent failure of components

Nowadays, distributed programming has no single definition. It can refer to the following
- refers to autonomous processes that run on the same physical computer (or nodes), with each having its own local memory and interact with each other by message passing

Properties typically referred to with this terminology:
- The system has to tolerate failures in individual computers
- The structure of the system (be it the network topology, network latency, number of computers) is not known in advance. The system may consist of different kinds of computers. The system may also change during the execution of a distributed program
- Each computer only has a limited, incomplete view of the system. Each computer may know only 1 part of the input