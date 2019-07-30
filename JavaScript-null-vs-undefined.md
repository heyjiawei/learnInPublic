JavaScript null vs undefined
- null represents the intentional absence of any object value
- null expresses a lack of indification. That the variable points to no object.
- is a primitive type
- In APIs, null is often retrieved in a place where an object can be expected but no object is relevant
	- a variable that is known to exist, but has no type or value

```
typeof null          // "object" (not "null" for legacy reasons)
typeof undefined     // "undefined"
null === undefined   // false
null  == undefined   // true
null === null        // true
null == null         // true
!null                // true
isNaN(1 + null)      // false
isNaN(1 + undefined) // true
```
undefined
- The global undefined property represents the primitive value undefined
- is a primitive type
- is a property of the global object (i.e. a variable in the global scope)
- a variable that has not been assigned a value is of type undefined
- a method or statment also returns undefined if the variable being evaluated does not have an assigned value
- a function also returns undefined if no value is returned
- you can use typeof to check if an operand is undefined. typeof does not throw an error if the variable has not been declared.
