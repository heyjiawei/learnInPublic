JavaScript hoisting
- is a way of thinking about how execution context works
- Because variable declarations (and declarations in general) are processed before any code is executed, declaring a variable anywhere in the code is equivalent to declaring it at the top. 
- This also means that a variable can appear to be used before it's declared. 
- This behavior is called "hoisting", as it appears that the variable declaration is moved to the top of the function or global code.
- For that reason, it is recommended to always declare variables at the top of their scope (the top of global code and the top of function code) so it's clear which variables are function scoped (local) and which are resolved on the scope chain.


JavaScript only hoists declarations, not initializations. If a variable is declared and initialized after using it, the value will be undefined.

The following returns undefined as it is used before the variable is declared and initialized
```
console.log(num); // Returns undefined. Used
var num; // declared
num = 6; // initialized
```

The following returns 6 as the variable is used after initializing
```
num = 6;
console.log(num); // returns 6
var num;
```

```
var x = 1; // Declare and Initialize x
console.log(x + " " + y); // '1 undefined' because y is not initialized yet
var y = 2; // Declare and Initialize y

// The above example is implicitly understood as this: 
var x; // Declare x
var y; // Declare y
// End of the hoisting.

x = 1; // Initialize x
console.log(x + " " + y); // '1 undefined' because y is not initialized yet
y = 2; // Initialize y
```

This applies to functions and class too
```
foo(); // Works because foo was created before this code runs
function foo() {}

```
assigining an unnamed anonymous function to the variable foo
```
foo; // undefined
foo(); // Raises an error because foo is not initialized yet
var foo = function() {};
```
assignment of named functions.
The following reference error happends because bar is not available in the outer scope since the function only gets assigned to foo
```
var foo = function bar() {
	bar(); // works
}
bar(); // reference error
```
