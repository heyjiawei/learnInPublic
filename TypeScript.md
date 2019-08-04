TypeScript

interface 
```
interface Person {
	firstName: string;
	lastName: string;
}
```
- they describes objects.
- with them, we can use Object type Person and pass in an object of the same structure as Person
E.g.
```
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter(user);
```
- it't alright if our object has more properties than properties in the interface. It MUST contain the properties specified in the interface
- This is the same as passing the following code:
```
function greeter(person: { firstName: string, lastName: string }) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
```

Optional properties in interface
- optional properties have ? before their colon
```
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100}
	
	// As we don't know if the property is entered, 
	// we have to check it before assigning it to newSquare.color;
    if (config.color) { 
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
```
- with optional properties, TypeScript uses excess property checking on Object literals. Hence, if an object literal has additional properties that the target type doesn't have, you will get an error.
```
// error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: "red", width: 100 });
```
- Getting around these checks is actually really simple. The easiest method is to just use a type assertion:
```
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```
- The better approach is to declare a string *index signature* if you are sure the object can have some extra properties. You can read more about it below at *Indexable type*
```
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
	// Here, we are saying SquareConfig can have any number of properties of type string, 
	// and as long as they aren’t color or width, their types don’t matter (i.e. we accept any type).
}
```
- One final way to get around these checks, which might be a bit surprising, is to assign the object to another variable: Since squareOptions won’t undergo excess property checks, the compiler won’t give you an error.
```
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

Describing function types with Interfaces
```
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```
- For function types to correctly type-check, the names of the parameters do not need to match.
- you can also use typeScript's contextual typing to infer the argument types
```
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

Indexable type
- allows us to extend the object properties. E.g an array
```
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```
- This index signature states that when a StringArray is indexed with a number, it will return a string.
- There are two types of supported index signatures: string and number
- It is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. 
- This is because when indexing with a number, JavaScript will actually convert that to a string before indexing into an object. That means that indexing with 100 (a number) is the same thing as indexing with "100" (a string), so the two need to be consistent.
```
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
    [x: number]: Animal; // Error
    [x: string]: Dog;
}
```
if you want NotOkay to work:
```
interface NotOkay {
    [x: number]: Dog;
    [x: string]: Animal;
}
```
- This is because type number will be converted to type string. When converted, if the type for [x: number] is Animal, there is no guarantee that it is of type Dog of Animal. (It could be type Cow of Animal too). So, it needs to be a subtype of the type returned by String indexer
- So while string index signatures are a powerful, they also enforce that all properties match their return types
```
interface NumberDictionary {
    [index: string]: number;
    length: number;    // ok, length is a number
    name: string;      // error, the type of 'name' is not a subtype of the indexer. 
	// It should return type number
}
```
- you can make index signatures read-only
```
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```

Classes implementing an interface
```
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date); // this is a  function
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```
- properties and methods implemented are public

Class implementing Interfaces (Constructor signature)
- When a class implements an interface, only the instance is checked if it adheres to the interface methods/properties.
- Hence, if you create an interface with a construct signature and try to have a class implement this interface, it won't work as constructors are static functions of the class.
```
interface ClockConstructor {
	new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
	currentTime: Date;
	
	// The following won't work
	constructor(h: number, m: number) {}
}
```

- if you need to work with the static side of the class directly, you will need to define 2 interfaces.
- In the following, we define ClockConstructor interface for the constructor and ClockInterface for the instance methods.
- We will have a "constructor" function createClock that creates instances of the type that is passed to it
- As ClockConstructor interface has a constructor signature, it will check if the passed in function has the correct constructor signature
```
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, 
	hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

Extending interfaces
- interfaces can extend each other. This allows you to copy the members of one interface to another, which will give you more flexibility in how you separate your interfacaes into reusable components
```
interface Square extends Shape {
    sideLength: number;
}
// Extending multiple interfaces:
interface Square extends Shape, PenStroke {
    sideLength: number;
}
```

Hybrid Types (an object that acts as both function and an object)
```
interface Counter {
	(start: number): string;
	interval: number;
	reset(): void;
}
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

Interface extending classes
- This is useful when you have a large inheritance hierarchy but want to specify that you code works with only subclasses that have certain properties
- The subclasses don't have to be related (aside from them inheriting from the base class)

- When an interface type extends a class, it inherits the members of the class (even the private and protected members of a base class), but not their class methods.
- This means that when you create an interface that extends a class, that interface can only be implemented by the parent class, or subclasses of this parent class.

```
// Parent, base class
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// Error: Property 'state' is missing in type 'Image' because Image is 
// not a subclass of Control
class Image implements SelectableControl {
    select() { }
}
```
- in the above example, only descendants of Control have state private member, and can implement SelectableControl
- Effectively, a SelectableControl acts like a Control that is known to have a select method.

Read-only properties
```
interface Point {
    readonly x: number;
    readonly y: number;
}
```
- these properties cannot be overwritten
- There are also `ReadonlyArray<T>` type that is the same as `Array<T>` with all mutating methods removed, so you can make sure you don’t change your arrays after creation:
- `ReadonlyArray<T>` are a different type from type[]. 
- You cannot reassign a ReadonlyArray to type[] array. HOWEVER, you can override it with type assertion
```
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!

a = ro as number[]; // This works
```

readonly vs const
The easiest way to remember whether to use readonly or const is to ask whether you’re using it on a variable or a property. 
**Variables use const whereas properties use readonly**

Read-only modifier in Class
- readonly properties must be initialized at their declaration or in the constructor
```
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // error! name is readonly.
```
Parameter properties (shortcut to setting read-only properties in a class)
- Parameter properties let you create and initialize a member in one place
- Parameter properties are declared by prefixing a constructor parameter with an accessibility modifier or readonly, or both.
- Using private for a parameter property declares and initializes a private member; likewise, the same is done for public, protected, and readonly
- The following immediately set theName to the name variable in the class
```
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}
```

public on constructor arguments is a shorthand that allows us to automatically create properties with that name
```
class Student {
	fullName: string;
	
	constructor(public firstName: string, public middleName: string, public lastName: string) {
		this.fullName = `${firstName} ${middleName} ${lastName}`;
	}
}
```

Typed Array 
```
let list: number[] = [1, 2, 3];
```

Generic Typed Array
```
let list: Array<number> = [1, 2, 3];
```

Tuple: an array with a fixed number of elements is known
```
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

Enum
```
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```
- By default, enums begin numbering their members starting at 0. 
- You can change this by manually setting the value of one of its members. For example, we can start the previous example at 1 instead of 0:
```
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```
- A handy feature of enums is that you can also go from a numeric value to the name of that value in the enum. For example, if we had the value 2 but weren’t sure what that mapped to in the Color enum above, we could look up the corresponding name
```
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName); // Displays 'Green' as its value is 2 above
```

Any
- This is used when we do not know what's the type when we are writing the application. It could be passed in from third party libraries, come from dynamic content, etc.
- Any allows us to opt-out of type checking and pass through compile-time checks
```
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

let list: any[] = [1, true, "free"];
list[1] = 100;
```

Void
- the absence of having any type at all
```
function warnUser(): void {
    console.log("This is my warning message");
}
```
- void variables can only be assigned null or undefined. Hence, they are not useful

null and undefined are subtypes of other types
- subtypes means that you can assign null or undefined to other types. E.g. number

Never
- represents types of values that never occur.
- never can be the return type of functions that always throw an exception or never returns
- never is a subtype and thus, can be assigned to other types. 
- it does not have its own subtype so type never cannot be assigned to any other type except itsefl
```
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
    }
}
```

Object
- represents non-primitive types (i.e. anything not string, number, boolean, symbol, null or undefined)

To use more than a single type, use |
```
declare function create(o: object | null): void;
create({ prop: 0 }); // OK
create(null); // OK
```
- destructure objects
```
let { a, b }: { a: string, b: number } = o;
```
- default values let you specify a default value in case a property is undefined
```
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}

type C = { a: string, b?: number }
function f({ a, b }: C): void {
    // ...
}
```
Specifying defaults with type inference
```
function f({ a, b = 0 } = { a: "" }): void {
    // ...
}
f({ a: "yes" }); // ok, default b = 0
f(); // ok, default to { a: "" }, which then defaults b = 0
f({}); // error, 'a' is required if you supply an argument
```
- b is optional
- you need to remember to give a default for optional properties on the destructured property instead of the main initializer.
- keep destructuring to small and simple. They can get really hard to understand

Type assertions
- type casting
- lets the compiler know not to perform special checking or restructuring of data
- There are 2 forms. The angle-bracket syntax and as syntax
```
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
- when using typeScript with jsx, only as-style assertions are allowed

Abstract Classes
- They are base classes which other classes will extend from. E.g. common methods implemented by other classes.
- They cannot be instantiated directly. You need other classes to extend from them, and then instantiate the class that extended from Abstract classes. This class object can then be of type Abstract, or its own class type.
- The abstract keyword is used to define abstract classes and abstract methods within an abstract class
```
abstract class Animal {
    abstract makeSound(): void; // subclass needs to implement this method
    move(): void { // subclass will inherit this method
        console.log("roaming the earth...");
    }
}
```
Abstract classes vs interface:
- Abstract class may contain implementation details for its members, unlike interface, which only contains type signatures.





