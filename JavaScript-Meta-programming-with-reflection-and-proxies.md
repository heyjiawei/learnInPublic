JavaScript Meta programming with reflection and proxy/proxies
-  Proxy objects allow you to 
	-  intercept certain operations and to 
	-  implement custom behaviors or fundamental operations (e.g. property lookup, assignment, enumeration, function invocation, etc).


The following terms are used when talking about the functionality of proxies:
-  handler: a placeholder object which contains traps
-  traps: the methods that provide property access. 
-  invariants: semantics that remain unchanged when implementing custom operations are called invariants
-  target: the object which the proxy virtualizes. It is often used as a storage backend for the proxy. invariants regarding object non-extensibility or non-configurable properties are verified against the target.

Creating a proxy object: 
var p = new Proxy(target, handler);
target
- A target object to wrap with Proxy. It can be any sort of object, including a native array, a function or even another proxy.
handler
- An object whose properties are functions which define the behavior of the proxy when an operation is performed on it.
- the handler object is a placeholder object which contains traps for Proxy
- All traps are optional.
- If a trap has not been defined, it will forward the default behaviour to the target

Setting a default value for properties not in the object:
```
var handler = {
    get: function(obj, prop) {
        return prop in obj ?
            obj[prop] :
            37;
    }
};

var p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined
console.log('c' in p, p.c); // false, 37
```

Forwarding all operations applied on one object to another:
Note that while this "no-op" works for JavaScript objects it does not work for native browser objects like DOM Elements.
```
var target = {};
var p = new Proxy(target, {});
p.a = 37;
console.log(target.a) // 37. The operation has been forwarded
```

Validating value passed into an object using the set handler:
```
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // The default behavior to store the value
    obj[prop] = value;

    // Indicate success
    return true;
  }
};

let person = new Proxy({}, validator);

person.age = 100;
console.log(person.age); // 100
person.age = 'young'; // Throws an exception
person.age = 300; // Throws an exception
```

Revocable proxy:
- The Proxy.revocable() method is used to create a revocable Proxy object. 
- This means that the proxy can be revoked via the function revoke and calling this function would switch the proxy off. 
- Afterwards, any operation on the proxy leads to a TypeError.

Reflection:
- Reflect is a built-in object that provides methods for interceptable JavaScript operations. 
- The methods are the same as those of the proxy handlers. 
- Reflect is not a function object.
- Reflect helps with forwarding default operations from the handler to the target.

What's the difference between Proxy and Reflection?
- Proxy comfigures the object's properties such that it will 'automatically' do sth, or react in the programmed way.
- Reflect is similar to a master command that helps you do things.

Why is the Reflect object useful?
Here are a few ways Reflect is useful:
1. More useful return values (more ways to do one thing which helps make code nicer)

This allows you to refactor this code:
```
try {
  Object.defineProperty(obj, name, desc);
  // property defined successfully
} catch (e) {
  // possible failure (and might accidentally catch the wrong exception)
}
```
To this:
```
if (Reflect.defineProperty(obj, name, desc)) {
  // success
} else {
  // failure
}
```
Other methods that return such a boolean success status are Reflect.set (to update a property), Reflect.deleteProperty (to delete a property), Reflect.preventExtensions (to make an object non-extensible) and Reflect.setPrototypeOf (to update an object's prototype link).

2. First-class operations
- In ES5, the way to detect whether an object obj defines or inherits a certain property name is to write (name in obj). Similarly, to delete a property, one uses delete obj[name]. 
- While dedicated syntax is nice and short, it also means you must explicitly wrap these operations in functions when you want to pass the operation around as a first-class value.

With Reflect, these operations are readily defined as first-class functions:
- Reflect.has(obj, name) is the functional equivalent of (name in obj) and - 
- Reflect.deleteProperty(obj, name) is a function that does the same as delete obj[name].

3. More reliable function application
In ES5, when one wants to call a function f with a variable number of arguments packed as an array args and binding the this value to obj, one can write:

f.apply(obj, args)

However, f could be an object that intentionally or unintentionally defines its own apply method. When you really want to make sure that the built-in apply function is called, one typically writes:

Function.prototype.apply.call(f, obj, args)

Not only is this verbose, it quickly becomes hard to understand. With Reflect, you can now make a reliable function call in a shorter and easier to understand way:

Reflect.apply(f, obj, args)

4. Variable-argument constructors
Imagine you want to call a constructor function with a variable number of arguments. In ES6, thanks to the new spread syntax, it will be possible to write code like:

var obj = new F(...args)
In ES5, this is harder to write, because one can only use F.apply or F.call to call a function with a variable number of arguments, but there is no F.construct function to new the function with a variable number of arguments. With Reflect, one can now write, in ES5:

var obj = Reflect.construct(F, args)

5. Default forwarding behavior for Proxy traps
When using Proxy objects to wrap existing objects, it is very common to intercept an operation, do something, and then to "do the default thing", which is typically to apply the intercepted operation to the wrapped object. For example, say I want to simply log all property accesses to an object obj:
```
var loggedObj = new Proxy(obj, {
  get: function(target, name) {
    console.log("get", target, name);
    // now do the default thing
  }
});
```
The Reflect and Proxy APIs were designed in tandem, such that for each Proxy trap, there exists a corresponding method on Reflect that "does the default thing". 
Hence, whenever you find yourself wanting to "do the default" thing inside a Proxy handler, the correct thing to do is to always call the corresponding method in the Reflect object:
```
var loggedObj = new Proxy(obj, {
  get: function(target, name) {
    console.log("get", target, name);
    return Reflect.get(target, name);
  }
});
```
The return type of the Reflect methods is guaranteed to be compatible with the return type of the Proxy traps.

6. Control the this-binding of accessors
In ES5 it's fairly easy to do a generic property access or property update. For instance:
```
var name = ... // get property name as a string
obj[name] // generic property lookup
obj[name] = value // generic property update
```
The Reflect.get and Reflect.set methods allow you to do the same thing, but additionally accept as a last optional argument a receiver parameter that allows you to explicitly set the this-binding when the property that you get/set is an accessor:
```
var name = ... // get property name as a string
Reflect.get(obj, name, wrapper) // if obj[name] is an accessor, it gets run with `this === wrapper`
Reflect.set(obj, name, value, wrapper)
```
This is occasionally useful when you're wrapping obj and you want any self-sends within the accessor to get re-routed to your wrapper, e.g. if obj is defined as:
```
var obj = {
  get foo() { return this.bar(); },
  bar: function() { ... }
}
```
Calling Reflect.get(obj, "foo", wrapper) will cause the this.bar() call to get rerouted to wrapper.

7. Avoid legacy __proto__

On some browsers, __proto__ is defined as a special property that gives access to an object's prototype. ES5 standardized a new method Object.getPrototypeOf(obj) to query the prototype. Reflect.getPrototypeOf(obj) does exactly the same, except that Reflect also defines a corresponding Reflect.setPrototypeOf(obj, newProto) to set the object's prototype. This is the new ES6-compliant way of updating an object's prototype.
