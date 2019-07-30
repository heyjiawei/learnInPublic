JavaScript object property type/ property descriptors
- A property in JavaScript consists of either a string-valued name or a Symbol and a property descriptor. 
- Further information about property descriptor types and their attributes can be found in Object.defineProperty().

A property descriptor is a record with some of the following attributes:

value
- The value associated with the property (data descriptors only).
writable
- true if and only if the value associated with the property may be changed (data descriptors only).
get
- A function which serves as a getter for the property, or undefined if there is no getter (accessor descriptors only).
set
- A function which serves as a setter for the property, or undefined if there is no setter (accessor descriptors only).
configurable
- true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
enumerable
- true if and only if this property shows up during enumeration of the properties on the corresponding object.

There are two types of object properties which have certain attributes: The data property and the accessor property.
- Javascript attributes are represented as [[attribute]]

What are attributes?
Attribute(s) is usually used by JavaScript engine. You can't directly access it. Hence, they are placed in double square brackets instead of single

Data property
- data property associates a key with a value
- It has the following attributes (here, we define attributes [[something here]])

[[value]] can be of any JavaScript type. 
- this is the value retrieved by a get access

[[Writable]] is a boolean. default false
- whether the property's [[value]] can be changed
- For instance, when an object is frozen, you cannot do the following
```
let obj = {
	sayHi : 'hi'
}
Object.freeze(obj)
obj.sayHi = 'Hello' 	// This would throw an error
```

[[Enumerable]] is a boolean. default false
- if true, the property will be enumerated in for..in loops
- also defines whether the property is picked by Object.assign() or spread operator

[[Configurable]] is boolean. default false
- if false, the property cannot be deleted.
- if false, the property also can't be changed to an accessor property.
- attributes [[Enumerable]] and [[Configurable]] can't be changed whilst attributes [[value]] and [[writable]] can

Accessor property
- associates a key with 1 or 2 accessor functions (get and set) to retrieve or store a value

[[Get]] a function object, or undefined
- if it is a function, the function is called with an empty argument list and retrieves the property value whenever a get access to the value is performed

[[Set]] a function object, or undefined
- the function is called with an argument and is executed whenever a specified property is attempted to be changed

[[Enumerable]] - same as data attribute
[[Configurable]] - same as data attribute

How is this related to Object.defineproperty(obj, prop, descriptor) ?
- This method allows a precise addition/ modification of a property on an object
- The shorthand property addition through assignment creates properties which show up during their property enumeration (for..in loop or Object.keys() method)
	- These values can be changed and deleted
```
obj.a = 'sth'
```

- By default, values added using Object.defineProperty() are immutable
- Property descriptors present in objects come in either data descriptors (data property) or accessor descriptors (accessor property). They cannot be both
- A data descriptor is a property that has a value, which may or may not be writable. 
- An accessor descriptor is a property described by a getter-setter pair of functions.
- If a descriptor has neither of`value`,`writable`,`get`and`set`keys, it is treated as a data descriptor. 
- If a descriptor has both`value`or`writable`and`get`or`set`keys, an exception is thrown.
- These attributes are not necessarily the descriptor's own properties. Inherited properties will be considered as well
- In order to ensure these defaults are preserved, you might
	- freeze the Object.prototype upfront
	- specify all options explicitly
	- or point to null with Object.create(null)
```
    // being explicit
    Object.defineProperty(obj, 'key', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: 'static'
    });
	
    var descriptor = Object.create(null); // no inherited properties
    // not enumerable, not configurable, not writable as defaults
```
```
    // Example of an object property added
    // with defineProperty with an accessor property descriptor
    var bValue = 38;
    Object.defineProperty(o, 'b', {
      // Using shorthand method names (ES2015 feature).
      // This is equivalent to:
      // get: function() { return bValue; },
      // set: function(newValue) { bValue = newValue; },
      get() { return bValue; },
      set(newValue) { bValue = newValue; },
      enumerable: true,
      configurable: true
    });
    o.b; // 38
```

- When the property already exists, Object.defineProperty() will attempt to modify the property according to the values in the descriptor and the object's current configuration.
	- if the old descriptor had its [[configurable]] attribute set to false, it will not be possible to change any attribute of the property, or change between data and accessor property types
	- For [[writable]] attribute, it is possible to change from true to false

Enumerable attribute example:
```
var obj = {}
Object.defineProperty(obj, 'a', {
	value : 1,
	enumerable : true
})

Object.defineProperty(obj, 'b', {
	value : 2,
	enumerable : false
})

Object.defineProperty(obj, 'c', {
	value : 3			// enumerable defaults to false
})

o.d = 4 			// Using this assignment, enumerable defaults to true

// Using symbol property
Object.defineProperty(obj, Symbol.for('e'), {
    value: 5,
  	enumerable: true
})

Object.defineProperty(obj, Symbol.for('f'), {
    value: 6,
  	enumerable: false
})

// In for..in loop
for (var i in obj) {
  console.log(i) 			    // logs 'a' and 'd'
}

Object.keys(obj);  		// ['a', 'd']

// However, you can still get property b and c
obj.b 			// returns 2
obj.c 			// returns 3
obj[Symbol.for('e')] // returns 5
obj[Symbol.for('f')] // returns 6


obj.propertyIsEnumerable('a'); // true
obj.propertyIsEnumerable('b'); // false
obj.propertyIsEnumerable('c'); // false
obj.propertyIsEnumerable('d'); // true
obj.propertyIsEnumerable(Symbol.for('e')); // true
obj.propertyIsEnumerable(Symbol.for('f')); // false

// if you create another object and copy via 
// object spread operator though... the new object will not have the 
// non enumerable properties
var p = { ...obj }
p.a // 1
p.b // undefined
p.c // undefined
p.d // 4
p[Symbol.for('e')] // 5
p[Symbol.for('f')] // undefined
```

Dot notation to assign value vs Object.defineProperty()
```
var o = {};
    
o.a = 1;
// is equivalent to:
Object.defineProperty(o, 'a', {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true
});

// On the other hand,
Object.defineProperty(o, 'a', { value: 1 });

// is equivalent to:
Object.defineProperty(o, 'a', {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false
});
```

Inheritance property quirks
Say we were to place the class's prototype as the object to be defined.
For Accessor property, 
**if we use a variable to store the value, this value will be shared by all objects**
```
function myclass() {
}

var value;
Object.defineProperty(myclass.prototype, "x", {
  get() {
	return value;
  },
  set(x) {
	value = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // 1
```

If we set 'this' in get and set methods, 'this' would point to the object which calls it.
e.g. a.x = 1  	// 'this' would refer to object a
```
function myclass() {
}

Object.defineProperty(myclass.prototype, "x", {
  get() {
	return this.stored_x;
  },
  set(x) {
	this.stored_x = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // undefined
```

Unlike Accessor properties, **Data properties are always set on the object's property, not on a prototype**

- The following shows that all objects of type myclass() have property y
- And property y of object a (a.y) is not writable and and have a value of 1
- Other properties of the class are not affected by this [[non-writable]] rule
