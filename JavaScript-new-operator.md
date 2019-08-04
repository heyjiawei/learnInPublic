JavaScript new operator
does the following 4 things:
1. It creates a brand new object inheriting everything from Object.prototype, (.__proto__.)
2. It links the properties of this object to  properties attached to the constructor's .prototype object (secondary when lookup), which will override the 1. if in conflict; it then links the properties of this object to the properties attached to this. from the constructor function(primary when lookup)
3. the newly created object from Step 1 gets passed as the this context
4. if the function doesn't return an object, the created object (i.e. this) is returned

If you didn't write the new operator, the Constructor Function would be invoked like any Regular Function, without creating an Object. In this case, the value of this is also different.