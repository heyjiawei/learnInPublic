JavaScript execution context
There are 3 types of execution context
1. Global execution context. The default execution context. JS code starts its execution here when the file first loads in the browser. 
	- if executing in strict mode, this is undefined. Otherwise, it is the window object. 

2. Function execution context. This is execution context created by functions. Each function has their own execution context. When executing in global execution context code, if JS engine finds a function call, it creates a new functional execution context for that function.

3. Eval. Execution context inside eval function.