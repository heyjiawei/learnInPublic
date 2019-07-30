JavaScript strict mode
- browsers which do not support strict mode will have different behaviours on strict mode. Hence, don't rely on strict mode without feature-testing it first
- strict-mode and non-strict mode code can co-exist
- strict mode makes several changes to normal JavaScript semantics.
	- it eliminates some silent JavaScript errors by throwing these errors
	- it can make code easy for JavaScript engines to perform optimization on, which can result in code running faster
	- prohibits usage of keywords that may be potential syntax keywords in future ECMAScript specification
- strict-mode applies to entire scripts or individual functions
- Strict mode changes semantics.


- To invoke strict mode for an entire script, put the exact statement "use strict"; (or 'use strict';) before any other statements.
	- Do note that in doing so, if you concatenate non-strict mode scrips with such strict mode scripts, the entire concatenated script is strict.
	- The inverse is also true: non-strict plus strict looks non-strict. 
	- If you are concatenating your scrips, enable strict on a function-by-function basis
- Another solution is to wrap the entire contents of the script in a function and have the outer function use strict mode.
	- However, you would have to explicitly export any shared variables out of the function scope
- To invoke strict mode for a function, put "use strict" in the function body before any other statements


How does strict mode convert silent mistakes to throw error?
1. It makes it impossible to accidently create global variables. Assignments, which would accidentally create global variables, instead throw an error in strict mode

2. strict mode throws exception when non-writable global variables are assigned
```
"use strict"
var undefined = 5; // throws a TypeError
var Infinity = 5; // throws a TypeError
```
Assignments to non-writable global, non-writable property, getter-only property and non-extensible property would throw error under strict mode

3. strict mode simplifies variable uses
- JavaScript sometimes makes this basic mapping of name to variable definition in the code impossible to perform until runtime. 
- Strict mode removes most cases where this happens, so the compiler can better optimize strict mode code.


How does strict mode make JavaScript secure?
1. browsers cannot reference the window object through 'this' in strict mode function. 
- this is because 'this' in strict mode is not auto-boxed. 
- Not only is automatic boxing a performance cost, but exposing the global object in browsers is a security hazard because the global object provides access to functionality that "secure" JavaScript environments must restrict. 
- Thus for a strict mode function, the specified 'this' is not boxed into an object, and if unspecified, 'this' will be undefined

How does strict mode make your code better?
- Strict mode recognises future ECMAScript versions and set restrictions to help make changing to newer ECMAScripts easier
- It identifies a list of reserved keywords. These keywords can't be used as variables or argument name

- strict mode also prohibits function statements that **are not placed at the top level of a script or function**
```
'use strict';
if (true) {
  function f() { } // !!! syntax error
  f();
}

for (var i = 0; i < 5; i++) {
  function f2() { } // !!! syntax error
  f2();
}

// This is okay
function baz() { // kosher
  function eit() { } // also kosher
}
```
