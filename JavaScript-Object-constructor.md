JavaScript Object constructor
- All objects (with the exception of objects created with Object.create(null)) will have a constructor property.
- Objects created without the explicit use of a constructor function (i.e. the object and array literals {} and [] respectively) will have a constructor property that points to the Fundamental Object constructor type for that object.
- The constructor property returns a reference to the Object constructor function. It is the Object constructor functinot hat created the instance object.
- The value of this property is a reference, not a string

It is not always safe to rely on the constructor property of an object. 
It can be modified. 
- Only primitives like boolean, number and string will not be affected as they have read-only native constructors

You would usually change the constructor of a function when...
you want it to be a function constructor that has prototype-inherit chain
```
function Parent() {}
Parent.prototype.parentMethod = function parentMethod() {};

function Child() {}
// re-define child prototype to Parent prototype
Child.prototype = Object.create(Parent.prototype); 

Child.prototype.constructor = Child; // return original constructor to Child
```
But when do we need to perform last line here? Unfortunately the answer is - it depends.
1. When the object has copied a template from parent with Object.assign() and uses the constructor function, without the last line, the constructor would be that of the copied template.
```
function Parent() {};
function CreatedConstructor() {}

CreatedConstructor.prototype = Object.create(Parent.prototype);

CreatedConstructor.prototype.create = function create() {
  return new this.constructor();
}

// TypeError undefined is not a function since constructor === Parent
new CreatedConstructor().create().create(); 
```
To avoid this, you should return the constructor to CreatedConstructor
```
function Parent() {}; 
function CreatedConstructor() {} 

CreatedConstructor.prototype = Object.create(Parent.prototype); 
CreatedConstructor.prototype.constructor = CreatedConstructor; // set right constructor for further using

CreatedConstructor.prototype.create = function create() { 
  return new this.constructor();
} 

new CreatedConstructor().create().create(); // it's pretty fine
```
2. When the you wish to use the properties tied to the parent constructor object (which is rare), you cannot access it with this.constructor if you return the constructor to the child

```
function ParentWithStatic() {}

ParentWithStatic.startPosition = { x: 0, y:0 };
ParentWithStatic.getStartPosition = function getStartPosition() {
  return this.startPosition;
} 

function Child(x, y) {
  this.position = {
    x: x,
    y: y
  };
}

Child.prototype = Object.create(ParentWithStatic.prototype); 
Child.prototype.constructor = Child;

Child.prototype.getOffsetByInitialPosition = function getOffsetByInitialPosition() {
  var position = this.position;
  var startPosition = this.constructor.getStartPosition(); // error undefined is not a function, since the constructor is Child

  return {
    offsetX: startPosition.x - position.x,
    offsetY: startPosition.y - position.y
  }
};
```
