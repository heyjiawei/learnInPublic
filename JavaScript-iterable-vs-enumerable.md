JavaScript iterable vs enumerable
- an iterable object implements the iterable protocol
- iterable objects can be looped over for..of
- iterable objects have @@iterator method or @@iterator property (available via Symbol.iterator), or one of the objects up its prototype chain must have this property
- Whenever an object needs to be iterated (such as at the beginning of a for..of loop), its @@iterator method is called with no arguments, and the returned iterator is used to obtain the values to be iterated.

What is the difference between for...of and for...in?
- for...of statement creates a loop iterating over iterable objects (objects that contain @@iterator)
- for...in statements iterates over non-Symbol, enumerable properties of an object, in an arbitarary order. The loop will iterate over all enumerable properties of the object itself and those the object inherits from its constructor's prototype

This difference can be explicitely shown in an array:
for...of would log the values in the array whereas for...in would log the properties of the array.
Array indexes are enumerable properties
```
Object.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // logs 0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}
```

- for...in is built for iterating object properties. It is not recommended for use with arrays
