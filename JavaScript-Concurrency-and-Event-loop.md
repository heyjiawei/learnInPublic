JavaScript Concurrency and Event loop
- The message queue keeps track of functions to execute.
- At any one time, there will only be 1 message/function executing. 
- The message will be ran to completion
- Hence, if the function is executing for a long time, it would block the messages at the back.
- The browser mitigates this with the "a script is taking too long to run" dialog. 
- A good practice to follow is to make message processing short and if possible cut down one message into several messages.
- setTimer functions merely delay when the message is added to the queue. The delay time stated is merely the min-time the message will be executed. If there are many messages before it, the deleyed function will be impacted as it can only be executed after all messages before it are executed. *The execution depends on the number of waiting tasks in the queue.*

callStack:
- is a mechanism for an interpreter to keep track of its place in a script when it calls multiple functions
	- to know what function is currently being ran and what functions are called from within that function
- when a script calls a function, the interpreter adds it to the call stack and starts carrying out the function
- Any functions that are called by that function are added to the call stack further up, and run where their calls are reached.
- When the current function is finished, the interpreter takes it off the stack and resumes execution where it left off in the last code listing.
- If the stack takes up more space than it had assigned to it, it results in a "stack overflow" error.

