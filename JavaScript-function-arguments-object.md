JavaScript function's arguments object

- The arguments object is a local variable available within all non-arrow functions. 
- You can refer to a function's arguments inside that function by using its arguments object. 
- It has entries for each argument the function was called with, with the first entry's index at 0.
- Each argument can also be set or reassigned
- It is an "Array-like" object as it has a length property and properties indexed from zero but it doesn't have Array's built in methods like forEach and map
- The arguments object is useful for functions called with more arguments than they are formally declared to accept. This technique is useful for functions that can be passed a variable number of arguments
- However, it can be converted to a real Array:

var args = Array.prototype.slice.call(arguments);
// Using an array literal is shorter than above but allocates an empty array
var args = [].slice.call(arguments);
var args = Array.from(arguments);
var args = [...arguments];

The typeof operator returns 'object' when used with arguments
console.log(typeof arguments); // 'object'

The type of individual arguments can be determined by indexing arguments:
console.log(typeof arguments[0]); // returns the type of the first argument

arguments properties:
arguments.callee
Reference to the currently executing function that the arguments belong to.

arguments.length
The number of arguments that were passed to the function

arguments[@@iterator]
Returns a new Array Iterator object that contains the values for each index in the arguments.
