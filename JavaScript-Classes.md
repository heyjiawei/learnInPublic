JavaScript Classes
- class declarations are not hoisted. You need to declare your class before accessing it
```
const p = new Rect() 	// throws reference error
class Rect {}
```
- classes can be named or unnamed
```
let Rectangle = class {}
console.log(Rectangle.name) 	// output: 'Rectangle'

let Rectangle = class Rectangle2 {}
console.log(Rectangle.name)		// output: 'Rectangle2'
```

- the body of a class is executed in strict mode
- There can only be 1 constructor method in the class. The constructor method creates and initialize an object created with a class
- A constructor can use the 'super' keyword to call the constructor of the super class

You can set the object's getter and setter this way:
(recall that getters and setters do not require invocation. They are self invoking properties)
```
class Rectangle {
  constructor(height, width) {
	this.height = height;
	this.width = width;
  }
  // Getter
  get area() {
	return this.calcArea();
  }
  // Method
  calcArea() {
	return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
```

static methods
Object.assign() is a static method.
- The 'static' keyword defines a static method for a class. Static methods are called without instantiating their class. 
	- Notice that we use Point.distance() instead of p1.distance()
- Static methods cannot be called through a class instance.
```
class Point {
  constructor(x, y) {
	this.x = x;
	this.y = y;
  }

  static distance(a, b) {
	const dx = a.x - b.x;
	const dy = a.y - b.y;

	return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2)); // 7.0710678118654755
```

- Instance properties are defined inside of class constructors
- static class properties and prototype data properties must be defined outside of the class body declaration
```
class Rectangle {
	constructor(height, width) {
		this.height = height
		this.width = width
	}
}

Rectangle.staticWidth = 20
Rectangle.prototype.prototypeWidth = 25
```

Field declarations
- public and private field declarations are still under experimentation

Ways to inherit a class:
1. using extends keyword on another class. We need to call 'super()' if we want to use a parent object property in the parent class constructor.
- If you do not specify a constructor method, a default constructor is used. 
	- For base classes, the default constructor is 
	```
	class Animal {
		constructor() {}
	}
	```
	- For derived classes, the default constructor is
	```
	class Animal {
		constructor() {}
	}
	
	class Dog extends Animal {
		constructor(...args) {
			super(...args)
		}
	}
	```
```
class Animal { 
  constructor(name) {
	this.name = name;
  }

  speak() {
	console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  constructor(name) {
	super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
	console.log(this.name + ' barks.');
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
```
2. Using extends on function based classes
```
function Animal (name) {
  this.name = name;  
}

Animal.prototype.speak = function () {
  console.log(this.name + ' makes a noise.');
}

class Dog extends Animal {
  speak() {
	console.log(this.name + ' barks.');
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
```

super keyword
- used to access and call functions on a parent object
super(\[arguments\]); // calls the parent constructor.
super.functionOnParent(\[arguments\]);
- when used in a constructor, the super keyword appears must be used before any 'this' keyword is used.
```
class Square extends Rectangle {
  constructor(length) {
	this.height; // ReferenceError, super needs to be called first!

	// Here, it calls the parent class' constructor with lengths
	// provided for the Rectangle's width and height
	super(length, length);

	// Note: In derived classes, super() must be called before you
	// can use 'this'. Leaving this out will cause a reference error.
	this.name = 'Square';
  }
}
```
- calling super on static methods:
```
class Rectangle {
  constructor() {}
  static logNbSides() {
	return 'I have 4 sides';
  }
}

class Square extends Rectangle {
  constructor() {}
  static logDescription() {
	return super.logNbSides() + ' which are all equal';
  }
}
Square.logDescription(); // 'I have 4 sides which are all equal'
```
- You cannot delete super properties though
- super cannot overwrite the value of non-writable properties.
```
class X {
  constructor() {
	Object.defineProperty(this, 'prop', {
	  configurable: true,
	  writable: false, 
	  value: 1
	});
  }
}

class Y extends X {
  constructor() {
	super();
  }
  foo() {
	super.prop = 2;   // Cannot overwrite the value.
  }
}

var y = new Y();
y.foo(); // TypeError: "prop" is read-only
console.log(y.prop); // 1
```
- we can use super with object literal notion, with the help of Object.setPrototypeOf()
```
var obj1 = {
  method1() {
	console.log('method 1');
  }
}

var obj2 = {
  method2() {
	super.method1();
  }
}

Object.setPrototypeOf(obj2, obj1);
obj2.method2(); // logs "method 1"
```

Abstract subclasses or Mix-ins
- these are templates for classes
- These allow classes to extend from multiple classes, e.g. tooling classes
- They can be of the form of a function with a superclass as input (or argument) and a subclass extending that superclass as output.
```
let calculatorMixin = Base => class extends Base {
  calc() { }
};

let randomizerMixin = Base => class extends Base {
  randomize() { }
};

class Foo { }
calculatorMixin(randomizerMixin(Foo))
```

class Constructors and prototype
- class constructors are instance functions. Prototype are objects in Contructor functions. They function on different scope
- In the following, the prototype of Square class is changed but the constructor of the previous base class Polygon is still called when a new instance of a square is being created:
```
class Polygon {
	constructor() {
		this.name = "Polygon";
	}
}

class Square extends Polygon {
	constructor() {
		super();
	}
}

class Rectangle {}

Object.setPrototypeOf(Square.prototype, Rectangle.prototype);

console.log(Object.getPrototypeOf(Square.prototype) === Polygon.prototype); //false
console.log(Object.getPrototypeOf(Square.prototype) === Rectangle.prototype); //true

let newInstance = new Square();
console.log(newInstance.name); //Polygon
```

Creating new objects via Factories:
You can use a factor to construct new objects.
```
function CarFactory() {
    var car = {};
    car.owner = 'nobody';

    var milesPerGallon = 2;

    car.setOwner = function(newOwner) {
        this.owner = newOwner;
    }

    car.getMPG = function() {
        return milesPerGallon;
    }

    return car;
}
```
Downsides to using a Factory to create objects:
1. It uses more memory since the created objects constantly needs to create new objects. They do not share the methods on a prototype object
2. In order to inherit, the factory needs to copy all the methods from another object OR, put the parent object on the prototype of the new object in the factory method

Why are classes bad?
- people can and will inherit from them in all sorts of ways that make zero sense to you. With this, comes a set of troubles.
	- If you extend the class, you may break their classes with conflicting method names etc.
	- They might read your private state and put their own state into your instances
	- They might override your methods without calling super
- They allow deep inheritance
	- deep inheritance will allow descendants to have too much access to the implementation details of every base class in their hierarch. When the requirements change, refactoring a class hierarchy is going to be difficult
	- Instead of creating a class hierarchy, consider creating several factory functions. They may call each other in chain, tweaking the behaviour of each other.
	- You may also teach the “base” factory function to accept a “strategy” object modulating the behavior, and have the other factory functions provide it.

When should you use classes then?
1. Exposing a base class can be a valid API choice. However, you have to make sure to hide your own classes behind this expose class

2. When you are not inheriting more than ONCE


How should you write your classes then?
1. Resist making classes your public API. 
2. Even if you choose to provide your classes as a public API, prefer duck typing when accepting inputs. Instead of instanceof checks, assert the existence of the methods you plan to use, and trust the user to do the right thing.
3. Don’t inherit more than once. 
4. Don’t make super calls from methods. turn your classes into the factory functions and keep the relationships between them very explicit. When your only tools are parameters and return values, it’s easier to discover the right balance of responsibilities. 

