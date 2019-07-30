JavaScript objects
- object name and property name are case sensitive
- Unassigned properties of an object are 'undefined' (NOT null)
- an object property name can be any valid JavaScript string, or anything that can be converted to a string (including an empty string), all keys in the square bracket notation are converted to String type
	- the following properties can only be accessed using the square bracket notation:
		- 'hello world'
		- 'hello-world'
		- '9bts'

- for...in is used to iterate all enumerable properties of an object. It traverses all enumerable properties of the object and its prototype chain
```
    function showProps(obj, objName) {
      var result = '';
      for (var i in obj) {
        // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
        if (obj.hasOwnProperty(i)) {
          result += objName + '.' + i + ' = ' + obj[i] + '\n';
        }
      }
      return result;
    }
```
- Object.keys(o)
This method returns an array with all of the object's own (no prototype chain properties) enumerable properties' names. 
- Object.getOwnPropertyNames(o)
This method returns an array containing all own properties' names (enumerable or not) of an object`o`.

Enumeration in objects:
If you want only the enumerable properties, use `Object.keys()` or use a `for...in` 
- The for...in statement will return enumerable properties not only found directly upon that object but also along the prototype chain for the object unless the latter is filtered with `hasOwnProperty()`

If you want only the non enumerable properties, you would have to filter out all enumerable keys
```
    var target = myObject;
    var enum_and_nonenum = Object.getOwnPropertyNames(target);
    var enum_only = Object.keys(target);
    var nonenum_only = enum_and_nonenum.filter(function(key) {
      var indexInEnum = enum_only.indexOf(key);
      if (indexInEnum == -1) {
        // Not found in enum_only keys,
        // meaning that the key is non-enumerable,
        // so return true so we keep this in the filter
        return true;
      } else {
        return false;
      }
    });
    
    console.log(nonenum_only);
```

Ways to create an object:
1. Use an Object initializer (create with literal notation)
2. Create a constructor function and then instantiate the object by invoking that function with 'new'

Object initializers are made from new Object(). So each object created via this way is a new object

Adding a property to an Object:
- Adding a property to an instantiated object will not affect any other objects
- To add the new property to all objects of the same type, you have to add it to the property definition of the Car object type. 
	- You can do so in the constructor or via the object's prototype

Inheritance
- all objects in JavaScript inherit from at least one other object. Even the new objects you create would have inherited from a native object. 
- The object being inherited from (the parent class) is known as the prototype.
- inherited properities can be found in the prototype object's constructor

Object index property
You can refer to a property of an object either by its property name or by its ordinal index. 
However, 
If you initially define a property by its name, you must always refer to it by its name, and if you initially define a property by an index, you must always refer to it by its index.

The exception to this rule is array-like object reflected from HTML (e.g. forms array-like object)

You can always refer to objects in these array-like objects by either their ordinal number (based on where they appear in the document) or their name (if defined). For example, if the second`<FORM>`tag in a document has a`NAME`attribute of "myForm", you can refer to the form as`document.forms[1]`or`document.forms["myForm"]`or`document.forms.myForm`.

Inheritance with prototype chain
- JavaScript objects have a link to a prototype object.
- With EMCAScript 2015, the object's prototype is accessed with Object.getPrototypeOf(), Object.setPrototypeOf()
	- This is eqivalent to JavaScript __proto__ which is non-standard but the de-facto implemented by many browsers

Do not confuse it with function.prototype, the property of functions. This function.prototype specifies that all properties will be assigned to all instances of objects created by the given function when used as a constructor.

The Object.prototype property represents the Object prototype object
```
    var o = {a: 1};
    
    // The newly created object o has Object.prototype as its [[Prototype]]
    // o has no own property named 'hasOwnProperty'
    // hasOwnProperty is an own property of Object.prototype. 
    // So o inherits hasOwnProperty from Object.prototype
    // Object.prototype has null as its prototype.
    // o ---> Object.prototype ---> null
    
    var b = ['yo', 'whadup', '?'];
    
    // Arrays inherit from Array.prototype 
    // (which has methods indexOf, forEach, etc.)
    // The prototype chain looks like:
    // b ---> Array.prototype ---> Object.prototype ---> null
    
    function f() {
      return 2;
    }
    
    // Functions inherit from Function.prototype 
    // (which has methods call, bind, etc.)
    // f ---> Function.prototype ---> Object.prototype ---> null
```
```
    let f = function () {
       this.a = 1;
       this.b = 2;
    }
    let o = new f(); // {a: 1, b: 2}
    
    // add properties in f function's prototype
    f.prototype.b = 3;
    f.prototype.c = 4;
    
    // do not set the prototype f.prototype = {b:3,c:4}; this will break the prototype chain
    // o.[[Prototype]] has properties b and c.
    // o.[[Prototype]].[[Prototype]] is Object.prototype.
    // Finally, o.[[Prototype]].[[Prototype]].[[Prototype]] is null.
    // This is the end of the prototype chain, as null,
    // by definition, has no [[Prototype]].
    // Thus, the full prototype chain looks like:
    // {a: 1, b: 2} ---> {b: 3, c: 4} ---> Object.prototype ---> null
	
	console.log(o.b); // 2
	// This is called Property Shadowing
```
**do not set the prototype f.prototype = {b:3,c:4}; this will break the prototype chain**
- o.[[Prototype]] has properties b and c.
- o.[[Prototype]].[[Prototype]] is Object.prototype.
- Finally, o.[[Prototype]].[[Prototype]].[[Prototype]] is null.
- This is the end of the prototype chain, as null, by definition, has no [[Prototype]].
- Thus, the full prototype chain looks like: {a: 1, b: 2} ---> {b: 3, c: 4} ---> Object.prototype ---> null
Property shadowing = a form of method overriding

- Setting a property to an object creates an 'own property'
- The only exception to the above rule is when an inherited property is set/get with a getter or setter

Performance impact of prototype chain
- The lookup time for properties high up on the prototype chain can impact performance
- Additionally, trying to access nonexistent properties will always traverse the full prototype chain
- When iterating over the properties of an object, **every enumerable property** that is on the prototype chain will be enumerated 
	- It is necessary to use hasOwnProperty method (this method is inherited from Object.prototype) to check whether an object property is defined on itself and not somewhere on its prototype chain
	- hasOwnProperty is the only thing in JavaScript which deals with properties and does not traverse the prototype chain

To check if an object's direct parent (the object's direct prototype) contains a property:
```
    console.log(g.hasOwnProperty('addVertex'));
    // false
    
    console.log(g.__proto__.hasOwnProperty('addVertex'));
    // true
```

native prototypes should**never**be extended unless it is for the sake of compatibility with newer JavaScript features.

