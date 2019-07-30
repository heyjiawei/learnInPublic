JavaScript spread syntax
- allows an iterable (an array, string or object) to be **expanded** in places where zero or more arguments/ elements are expected.

For function calls:

myFunction(...iterableObj);
For array literals or strings:

[...iterableObj, '4', 'five', 6];
For object literals (new in ECMAScript 2018):

let objClone = { ...obj };

- spread syntax can replace apply.
	- It is common to use Function.prototype.apply in cases where you want to use the elements of an array as arguments to a function.

function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction(...args);

- When calling a constructor with new, it's not possible to directly use an array and apply (apply does a [[Call]] and not a [[Construct]]). 
i.e
Given constructor function Persion() {}, how do you use .apply to pass in arguments while creating a new Person?
Person.apply(this, listOfArguments) won't work because it would invoke the function.
new Person.apply(this, listOfArguments) won't work as well.
To create a new object with .apply, you would need a partial application. It cannot be done directly:
```
function applyAndNew(constructor, args) {
   function partial () {
      return constructor.apply(this, args);
   };
   if (typeof constructor.prototype === "object") {
      partial.prototype = Object.create(constructor.prototype);
   }
   return partial;
}


function myConstructor () {
   console.log("arguments.length: " + arguments.length);
   console.log(arguments);
   this.prop1="val1";
   this.prop2="val2";
};

var myArguments = ["hi", "how", "are", "you", "mr", null];
var myConstructorWithArguments = applyAndNew(myConstructor, myArguments);

console.log(new myConstructorWithArguments);
// (internal log of myConstructor):           arguments.length: 6
// (internal log of myConstructor):           ["hi", "how", "are", "you", "mr", null]
// (log of "new myConstructorWithArguments"): {prop1: "val1", prop2: "val2"}
```

- However, an array can be easily used with new thanks to spread syntax:
var dateFields = [1970, 0, 1];  // 1 Jan 1970
var d = new Date(...dateFields);

- Spread syntax effectively goes one level deep while copying an array. Therefore, it may be unsuitable for copying multidimensional arrays as the following example shows (it's the same with Object.assign() and spread syntax).

var a = [[1], [2], [3]];
var b = [...a];
b.shift().shift(); // 1
// Now array a is affected as well: [[], [2], [3]]

Concating arrays:
// instead of arr1 = arr1.concat(arr2);
// or Array.prototype.unshift.apply(arr2, arr1)
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1 = [...arr1, ...arr2];

- Note, however, that this creates a new arr1 array. Unlike Array.unshift, it does not modify the original arr1 array in-place
- Note that Object.assign() triggers setters whereas spread syntax doesn't.
- Note that you cannot replace nor mimic the Object.assign()

Spread syntax (other than in the case of spread properties) can be applied only to iterable objects:

When using spread syntax for function calls, be aware of the possibility of exceeding the JavaScript engine's argument length limit.

Rest syntax looks exactly like spread syntax, but is used for destructuring arrays and objects. In a way, rest syntax is the opposite of spread syntax: spread 'expands' an array into its elements, while rest collects multiple elements and 'condenses' them into a single element.
