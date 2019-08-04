JavaScript Symbol
- Symbol() returns a value of type symbol. It is a primitive data type
- it does not use new Symbol. Instead, it has static methods and static properties
- Every symbol value returned from Symbol() is unique. It can be used as an ID (identifier) for object properties
- In addition to your own symbols, JavaScript has some built-in symbols which represent internal language behaviors which were not exposed to developers in ECMAScript 5 and before.
	- Symbol.iterator : A method returning the default iterator for an object. Used by for...of. @@Iterator'
	- Symbol.search: for string objects
- Symbols are not enumerable in for...in iterations
- Symbol key properties are ignored when using JSON.stringify()

What are Symbols used for?
- Symbols are values that programs can create and use as property keys without risking name collisions.
- can make object properties anonymous (i.e. private functions or private property) and non-enumerable
	- Because the property is non-enumerable, it will not show up as a member in the loop construct "for( ... in ...)", and 
	- because the property is anonymous, it will not show up in the result array of "Object.getOwnPropertyNames()".
	- The symbol can only be examined for identity. No other operators (e.g. +Symbol, " " + Symbol) can be applied to it (i.e. it can;t be compared or combine with other types)
- The property can be accessed by using the original symbol value that created it, or by iterating on the result array of "Object.getOwnPropertySymbols()".
- Symbol values provide a way by which custom classes can create private members, and maintain a symbol registry that pertains just to that class. A custom class can use symbol values to create "own" properties that are shielded from unwanted, casual discovery. 

To create new Symbol:
```
// 3 symbols are created
var p1 = Symbol();
var p2 = Symbol('foo');
var p3 = Symbol('foo');

p2 === p3 // returns false
Symbol('foo') === Symbol('foo'); // false
```
To use symbol as an object property:
```
var myPrivateMethod = Symbol()
this[myPrivateMethod] = function() {}
```

If you really want to create a Symbol wrapper object, you can use the Object() function:
```
var sym = Symbol('foo');
typeof sym;     // "symbol" 
var symObj = Object(sym);
typeof symObj;  // "object"
```

Sharing symbols in the global symbol registry:
- To create symbols available across files and even across realms (each of which has its own global scope), use the methods Symbol.for() to retrieve and Symbol.keyFor() to set symbols from the global symbol registry.

You can get symbol properties on objects with Object.getOwnPropertySymbols() but note that every object is initialized with no own symbol properties.

Symbol.for(key)
- checks if a symbol with the given key is already present in the registry. If it is, that symbol is returned, otherwise, a new global symbol will be created.
```
console.log(Symbol.for('bar') === Symbol.for('bar'));
// expected output: true

console.log(Symbol('bar') === Symbol('bar'));
// expected output: false
```

Symbol.keyFor(symbolObj)
- retrieves the shared symbol key from the global symbol registry for the given symbol
- returns undefined otherwise
```
const globalSym = Symbol.for('foo'); // global symbol

console.log(Symbol.keyFor(globalSym));
// expected output: "foo"
```
