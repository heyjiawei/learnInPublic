JavaScript prototype

The prototype object acts as a template object. Objects will follow this prototype object, and inherit the methods and properties from it.

The properties and methods are defined on the **prototype property** on the **Object's constructor function**. 
The prototype properties are not on the object instances themselves.

The link between object instance and its prototype is the __proto__ property. This __proto__ property is derived from the constructor's prototype property

This means that there is a distinction between an object's prototype property and the constructor function's prototype property.

The object instance prototype property can be accessed via Object.getPrototypeOf(obj) and this property is on each instance.
The constructor's prototype property is a constructor property. 

However both refer to the same object:
**Object.getPrototypeOf(new Foobar()) or (new Foobar()).__proto__ === Foobar.prototype**

**Methods and properties are not copied from one object to another in the prototype chain. They are accessed by walking up the chain**

There is no official way to access the object's prototype object directly from an instance. __proto__ is not the official way to do it.

However, you can use Object static method, Object.getPrototypeOf(obj) to access an object's prototype indirectly

How does the inheritance work?
E.g. Person class exist and a new Person (person1) is created
person1 inherits from prototype of Person. 
Person inherits from prototype of Object.

Where are the inherited properties and method defined?
- the inherited ones are the ones defined on the prototype property.
- This means methods and properties that begin with Object.prototype. and not the ones that begin with Object.

How is Object.create() related to prototype?
- create() actually creates a new object from a specified prototype object. This means the passed in object is the prototype template.
```
var person2 = Object.create(person1)
person2.__proto__ // return person1
```

The constructor property
- every constructor function has a prototype property called constructor.
	- i.e. Person.prototype.constructor
- This constructor property points to the original constructor function
- The constructor property is also available to all Person instance
	- person1.constructor // returns the Person() constructor
- because of this, any object instance would be able to create another object with the following syntax:

var person2 = new person1.constructor('Karen')

The __proto__ property
- This property of Object.prototype.__proto__ is depreciated. Use Object.getPrototypeOf() instead.
- __proto__ is an accessor property (a getter function and a setter function) that exposes the internal [[prototype]] (which is either an object or null) of the object when it is accessed

