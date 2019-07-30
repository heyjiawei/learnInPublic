JavaScript 'this'
- In most cases, the value of 'this' is determined by how a function is called
- it may be different each time the function is called
- .bind() method set the value of a function's 'this' regardless of how it's called
- arrow functions don't provide thier own 'this' binding. It retains the 'this' value of the enclosing lexical context
- In the global execution context (outside of any function), this refers to the global object whether in strict mode or not.
- in strict mode, if 'this' was not defined by the execution context, it remains undefined.
- To pass the value of this from one context to another, use call(), or apply():
```
// An object can be passed as the first argument to call or apply and this will be bound to it.
var obj = {a: 'Custom'};

// This property is set on the global object
var a = 'Global';

function whatsThis() {
  return this.a;  // The value of this is dependent on how the function is called
}

whatsThis();          // 'Global'
whatsThis.call(obj);  // 'Custom'
whatsThis.apply(obj); // 'Custom'
```

- for .call() and .apply(), if the value passed as 'this' is not an object, it would try to convert it to an object using the internal ToObject operation.
	- i.e. if a primitive like 7 or 'foo' is passed, it will be converted to an Object using the related constructor. primitive 7 will be converted to new Number(7)
```
function bar() {
  console.log(Object.prototype.toString.call(this));
}

bar.call(7);     // [object Number]
bar.call('foo'); // [object String]
```

- when used with .bind(), it creates a new function with the same body and scope as its binded function, but 'this' in the newly created bound function is permanently bounded to the first argument of bind.
- You can only bind once
```
function f() {
  return this.a;
}

var g = f.bind({a: 'azerty'});
console.log(g()); // azerty

var h = g.bind({a: 'yoo'}); // bind only works once!
console.log(h()); // azerty
```

Arrow functions
- In arrow functions, this retains the value of the enclosing lexical context's this
- if this arg is passed to .call(), .bind(), or .apply() on invocation of an arrow function it will be ignored. 
- You can still prepend arguments to the call, but the first argument (thisArg) should be set to null.

```
var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject); // true

// Call as a method of an object
var obj = {func: foo};
console.log(obj.func() === globalObject); // true

// Attempt to set this using call
console.log(foo.call(obj) === globalObject); // true

// Attempt to set this using bind
foo = foo.bind(obj);
console.log(foo() === globalObject); // true
```
Caution:
If you reference the method of an object without calling it, the calling arrow function's this is equals to window.

```
var obj = {
  bar: function() {
    var x = (() => this);
    return x;
  }
};

var fn2 = obj.bar;
// Then calling the arrow function this is equals to window because it follows the this from bar.
console.log(fn2()() == window); // true
```

'this' as an object:
- When a function is called as a method of an object, its this is set to the object the method is called on.

In the following example, when we invoke the function, we call it as a method g of the object o.b. 
This time during execution, this inside the function will refer to o.b. 
The fact that the object is itself a member of o has no consequence; the most immediate reference is all that matters.
**This is because the 'this' binding is only affected by the most immediate member reference.**
```
o.b = {g: independent, prop: 42};
console.log(o.b.g()); // 4
```

'this' on the object's prototype chain:
- If the method is on an object's prototype chain, 'this' refers to the object the method was called on, as if the method were on the object.

```
var o = {f: function() { return this.a + this.b; }};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```
In this example, the object assigned to the variable p doesn't have its own f property, it inherits it from its prototype. But it doesn't matter that the lookup for f eventually finds a member with that name on o; the lookup began as a reference to p.f, so this inside the function takes the value of the object referred to as p. That is, since f is called as a method of p, its this refers to p. 


'this' as a constructor:
- When a function is used as a constructor (with the new keyword), its this is bound to the new object being constructed.
- While the default for a constructor is to return the object referenced by this, it can instead return some other object (if the return value isn't an object, then the this object is returned).
	- if it returns a new object, the 'this' that was bound to the new object gets discarded

