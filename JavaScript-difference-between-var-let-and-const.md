JavaScript difference between var, let and const
- var declarations, wherever they occur, are processed before any code is executed. It follows a hoisting behaviour
- When you declare a var, that scope becomes its current execution context.
- You can re-declare a var. It will not lose its value

How is let different from var?
1.  let allows you to declare variables that are limited in scope to the block, statement, or expression on which it is used.
	- This is unlike the var keyword, which defines a variable globally, or locally to an entire function regardless of block scope.
- The scoping rules of let is different from var as well.
	- let scope is attached to the block in which they are defined, as well as any contained sub-blocks
	- the var scope is the entire enclosing function.

In the following example, var x is updated in the if block. This causes the value of x to change to 2 outside the if block.
let x = 2 is another variable of the same name. The value of x does not change outside the block. To change it, you would use x = 2 instead
```
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // same variable!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // different variable
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```

2. At the top level of programs and functions, let does not create a property on the global object. var does
```
var x = 'global';
let y = 'global';
console.log(this.x); // "global"
console.log(this.y); // undefined
```
because of this, the following behaviour throws an error of x not defined
```
function a() {
 	x = 1 // Error: x is not defined
  	console.log(x)
  	let x;
}
a();
```
3. Redeclaring the same variable in the same function or block scope raises a Syntax error for let.
```
if (x) {
  let foo;
  let foo; // SyntaxError thrown.
}
```

what about const?
- similar to let, const are blocked-scope
- the value of const cannot be changed through reassignment
- it cannot be redeclared

