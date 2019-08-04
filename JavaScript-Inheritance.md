JavaScript Inheritance
To specify the next object higher in the inheritance chain, 
1. You set the prototype property of the constructor to the prototype instance you want to clone from
2. Override the prototype constructor with the constructor function.

You can do so any time after you define the constructor
```
function Manager() {
	Employee.call(this)
	this.reports = []
}
Manager.prototype = Object.create(Employee.prototype)
//Do not use this: Manager.prototype = new Employee
Manager.prototype.constructor = Manager
```

Why we shouldn't use Kangaroo.prototype  =  new  Animal();
```
function  Animal()  {  // Abstract  
	this.legs  =  [];  // Child class must populate  
}

function  Kangaroo()  {  
	this.legs.push("L",  "R");  
	this.pouch  =  {  };  
}  

Kangaroo.prototype  =  new  Animal();
```
1. Every instance of the derived class will share the same Employee instance. After creating two more`Kangaroo`instances, they will appear to have 6 legs each.  
	- More generall, since the base constructor is only executed once, any mutable state that it creates will be shared by every derived instance.
2. `Kangaroo.prototype.constructor`will be`Animal`, not`Kangaroo`.
3. Had the base`Animal`constructor taken parameters, this technique wouldn’t pass be able to those parameters on a per-instance basis

To solve the second problem:
Adding Kangaroo.prototype.constructor  =  Kangaroo;
- This will create an *enumerable* property, meaning that `for in` loops over instance of the derived class (Kangaroo) will include the `constructor` property. 
- A better approach would be to configure the property using Object.defineProperty() as follows
```
Object.defineProperty(
	Kangaroo.prototype,
	'constructor', 
	{
		configurable: true,
		enumerable: false,
		writable: true,
		value: Kangaroo
	}
)
```
To solve the 3rd problem:
Explicitly call the base constructor in Kangaroo
```
function Kangaroo(name) {
	Animal.call(this, name + 'the Kangaroo')
}
```
To solve the first problem:
Use Object.create()

- The term instance has a specific techical meaning in class-based languages but not in JavaScript because JavaScript does not have this difference between classes and instances. 
- In JavaScript, instance is used informally to mean an object created using a particular constructor function.
- Similarly, parent, child ancestor and descendent do not have formal meanings in JavaScript. You can informally use them to refer to objects higher or lower in the prototype chain

Parenthesis can be ommitted if the constructor takes no arguments
```
var jim = new Employee
```
When JavaScript sees the new operator,
1.  The`new`operator creates a generic object and sets its`__proto__`property to`Employee.prototype`.
2.  The`new`operator passes the new object to the`Employee`constructor as the value of the`this`keyword.
The internal [[Prototype]] property determines the prototype chain used

This process does not explicitly put inherited properties from the prototype chain into local properties in the mark object. 
Rather, JavaScript first checks if the values exist in that object. If it doesn't, JavaScript proceeds to check the prototype chain for the property

Calling another constructor inside a constructor Does Not set up inheritance appropriately.
If you later add properties to the inner constructor prototypes, these properties are not inherited by the outer Object.
E.g.
```
    function Engineer(name, projs, mach) {
	  WorkerBee.call(this, name, 'engineering', projs);
      this.machine = mach || '';
    }
    var jane = new Engineer('Doe, Jane', ['navigator', 'javascript'], 'belau');
    Employee.prototype.specialty = 'none';
	// The`jane`object does not inherit the`specialty`property
```
You need to explicitely set up the prototype to ensure dynamic inheritance:
```
    function Engineer(name, projs, mach) {
	  WorkerBee.call(this, name, 'engineering', projs);
      this.machine = mach || '';
    }
    Engineer.prototype = Object.create(WorkerBee.prototype) // This sentence sets up dynamic inheritance
    var jane = new Engineer('Doe, Jane', ['navigator', 'javascript'], 'belau');
    Employee.prototype.specialty = 'none';
	// Now the value of the `jane` object's` specialty property is "none"
```

Object instance local value
For the following code, the new name value does not propagate down to all instances of Employee
```
    function Employee() {
      this.name = '';
      this.dept = 'general';
    }
    
    function WorkerBee() {
      this.projects = [];
    }
    WorkerBee.prototype = new Employee;
	var amy = new WorkerBee
	Employee.prototype.name = 'Unknown';
	console.log(amy.name) // returns ''
```

- When you create any instance of the Employee object, that instance gets a *local value* for the name property
- This means that when you set the WorkerBee prototype by creating a new Employee object, the WorkerBee.prototype has a local value for the name property
- Therefore, when JavaScript looks up the name property of amy object, it finds the local value for the property in WorkerBee.prototype and does not look further up the chain to Employee.prototype

If you want to change the value of an object property at runtime and have the new value be inherited by all descendents of the object, you cannot define the property in the object's constructor function
- You should add it to the constructor's associated prototype
```
    function Employee() {
      this.dept = 'general';    // Note that this.name (a local variable) does not appear here
    }
    Employee.prototype.name = '';    // A single copy
    
    function WorkerBee() {
      this.projects = [];
    }
    WorkerBee.prototype = new Employee;
    
    var amy = new WorkerBee;
    
    Employee.prototype.name = 'Unknown';
	console.log(amy.name) // returns 'Unknown'
```
If you want to have default values for object properties and you want to be able to **change the default values at run time**, you should set the properties in the constructor's prototype, not in the constructor function itself.

__proto__ special property:
- Every object has a __proto__ object property (Except Object). 
- __proto__ is set when an object is constructed. It is set to the value of the constructor's prototype property
E.g. new Foo() creates an object with __proto__ == Foo.prototype
- As this is object reference, changes to the properties of Foo.prototype alters the property lookup for all objects that were created by new Foo()

Objects are related by 'prototype inheritance'. This means that you can test for inheritance by comparing an object's __proto__ to a function's prototype object
```
var f = new Foo()
var isTypeF = (f instanceof Foo)
```
So the following statements are all true:
```
    chris.__proto__ == Engineer.prototype;
    chris.__proto__.__proto__ == WorkerBee.prototype;
    chris.__proto__.__proto__.__proto__ == Employee.prototype;
    chris.__proto__.__proto__.__proto__.__proto__ == Object.prototype;
    chris.__proto__.__proto__.__proto__.__proto__.__proto__ == null;
```

No multiple inheritance
- An object has a single associated prototype, therefore, JavaScript cannot dynamically inherit from more than one prototype chain.
```
Engineer.prototype = Object.create(WorkerBee.prototype) // This sentence sets up dynamic inheritance
```

You can 'use' other object types in your object. But this is not inheritance/ multiple inheritance
```
    function Hobbyist(hobby) {
       this.hobby = hobby || 'scuba';
    }
    
    function Engineer(name, projs, mach, hobby) {
       this.base1 = WorkerBee;
       this.base1(name, 'engineering', projs);
       this.base2 = Hobbyist;
       this.base2(hobby);
       this.machine = mach || '';
    }
    Engineer.prototype = new WorkerBee;
    
    var dennis = new Engineer('Doe, Dennis', ['collabra'], 'hugo');
```
dennis does get the hobby property from the Hobbyist constructor but if you add a property to the Hobbyist constructor's prototype, dennis object will not inherit this new prototype
