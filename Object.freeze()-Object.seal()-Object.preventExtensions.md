Object.freeze(), Object.seal(), Object.preventExtensions()

freezes an object. Frozen object 
- cannot have new properties added to it
- cannot remove its existing properties
- cannot change enumerability, configurability, or writability of existing properties, and prevents the values of existing properties from being changed (writable and configurable attributes are set to false)
- cannot change its prototype 
- returns the same object that was passed in
- getters and setters work the same and give the illusion that you are changing the value
- **values that are objects can still be modified, unless they are also frozen**

To check if an object is frozen:
Object.isFrozen(object)

in strict mode, adding/deleting properties will throw TypeErrors.
in non-strict mode, it will silently fail

 **values that are objects can still be modified, unless they are also frozen**
 This means that the frozen object is immutable but , at the same time, not necessairly a constant. 
 freeze is shallow (only applies to the immediate properties of the object itself). Therefore, the following can occur:
 ```
 let obj = {
 	internal: {}
 }
 
 Object.freeze(obj)
 obj.internal.a = 'aValue'
 console.log(obj.internal.a) // returns 'aValue'
 ```
 
 Constant object vs Frozen object
 To be a constant object, all of the object's direct and indirect references to other objects must reference only immutable frozen objects. This is because a constant object must always have the same value.
 A frozen object is immutable because the entire object state (its values and references to other objects) within the whole object is fixed
 
 To make an object immutable, you will need to recursively freeze each property which is of type object (use deep freeze). This is because strings, numbers and booleans are already immutable. 
 **Only use deep freeze when you know your object does not contain any cycles. Otherwise, an endless loop will be triggered**
 
 E.g. of deep freeze:
 ```
     function deepFreeze(object) {
    
      // Retrieve the property names defined on object
      var propNames = Object.getOwnPropertyNames(object);
    
      // Freeze properties before freezing self
      
      for (let name of propNames) {
        let value = object[name];
    
        object[name] = value && typeof value === "object" ? 
          deepFreeze(value) : value;
      }
    
      return Object.freeze(object);
    }
 ```
 
 Frozen object vs sealed object
 Sealed objects can have their existing properties changed, whereas existing properties in frozen objects are immutable

 Object.seal()
 - Prevent new properties from being added to object. Prevent object properties from being deleted.
 - Also marks all existing properties as non-configurable. This prevents conversion of data property to accessor, or vice versa
This has the effect of fixing the object's current set of properties.
Making all properties non-configurable also prevents them from being converted from data properties to accessor properties and vice versa BUT
it does not prevent the values of data properties from being changed
 - values of present properties can still be changed as long as they are writable
 - check if an object is sealed with Object.isSealed()
 - The __proto__ property is sealed as well
 - returns a reference to the passed object
 ```
     var o = Object.seal(obj);
    o === obj; // true
 ```
 
 E.g. of being unable to convert data properties to accessors, or vice versa
 ```
 var obj = {
 	prop: function() {}
	foo: 'bar'
 }
 Object.seal(obj)
 
 // This will throw TypeError
 Object.defineProperty(obj, 'foo', {
 	get : function() { return 'g' }
 })
 ```
 
 
Object.preventExtensions()
- prevents new properties from being added to an object. This would inturn prevent future extensions to the object. 
- only prevents addition of own properties. Properties can still be added to the object prototype.
- properties of the object may still be deleted
- this method makes the [[prototype] of the target immutable
- There is no way to make an object extensible again once it has been made non-extensible.
