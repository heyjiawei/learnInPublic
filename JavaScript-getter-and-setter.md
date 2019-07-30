JavaScript getter and setter
- You can define getters and setters on any predefined objects or user defined objects that supports the addition of new properties

```
    var o = {
      a: 7,
      get b() { 
        return this.a + 1;
      },
      set c(x) {
        this.a = x / 2;
      }
    };
    
    console.log(o.a); // 7
    console.log(o.b); // 8
    o.c = 50;
    console.log(o.a); // 25. This is because a is set to 50/2
```
To name a getter or setter in a function, explicitly define a named function programmatically using Object.defineProperty (or the legacy Object.prototype.__defineGetter__

The following define a getter and setter for the year property. It extends the Date prototype to add a 'year' property to all instances of predefined Date class. 
It uses Date class existing getFullYear() and setFullYear() methods.
```
var d = Date.prototype
Object.defineProperty(d, 'year', {
	get : function() { return this.getFullYear() },
	set : function(y) { this.setFullYear(y) }
})
```

When defining getters and setters in object initializers (declare with object creation), 
you need to prefix the method with get/set.
- get method must not expect a parameter
- set method expects exactly 1 parameter

```
    var o = {
      a: 7,
      get b() { return this.a + 1; },
      set c(x) { this.a = x / 2; }
    };
```

Adding getters and setters during runtime:
This method's first parameter is the object on which you want to define the getter or setter. The second parameter is an object whose property names are the getter or setter names, and whose property values are objects for defining the getter or setter functions
```
var o = { a: 0 }
Object.defineProperties(o, {
	'b' : { get: function() { return this.a + 1 }},
	'c' : { set: function(x) { this.a = x/2 }}
})
```

Deleting a property:
```
// Creates a new object, myobj, with two properties, a and b.
var myobj = new Object;
myobj.a = 5;
myobj.b = 12;

// Removes the a property, leaving myobj with only the b property.
delete myobj.a;
```
