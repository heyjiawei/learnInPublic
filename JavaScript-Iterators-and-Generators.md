JavaScript Iterators and Generators
Iterator:
any object which implements the Iterator protocol by having a next() method which returns an object with 2 properties:
	- value, the next value in the sequence
	- done, returns true if the last value in the sequence has already been consumed

After a terminating value has been yielded additional calls to next() should simply return {done : true}
- next() must be a zero argument function
```
    var myIterator = {
        next: function() {
            // ...
        },
        [Symbol.iterator]: function() { return this }
    };
```

Generator functions
- a single function whose execution is not continuous
- When called initially, they do not execute any of their code. Instead, it returns a type of iterator called a Generator
- when a value is consumed by calling the generator's next() method, the Generator function executes until it encouters the yield keyword
- Each Generator may only be iterated once. The Generator function (the function that produce these Generators) can be called multiple times

```
    function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
        let iterationCount = 0;
        for (let i = start; i < end; i += step) {
            iterationCount++;
            yield i;
        }
        return iterationCount;
    }
```
is the same as:
```
    function makeRangeIterator(start = 0, end = Infinity, step = 1) {
        let nextIndex = start;
        let iterationCount = 0;
    
        const rangeIterator = {
           next: function() {
               let result;
               if (nextIndex <= end) {
                   result = { value: nextIndex, done: false }
                   nextIndex += step;
                   iterationCount++;
                   return result;
               }
               return { value: iterationCount, done: true }
           }
        };
        return rangeIterator;
    }
```

Iterables:
An object is iterable if it defined its iteration behaviour - what values are looped over in a for...of construct.
- String, Array, TypedArray, Map and Set have built-in iterables because their prototype objects all have a Symbol.iterator method, 
- Object does not

To be iterable, an object must implement the @@iterator method. (this is the iterable protocol)
-	The object, or one of the objects up in its prototype chain, must have a property with a Symbol.iterator key

Here are some user-defined iterables:
```
    var myIterable = {
        *[Symbol.iterator]() {
            yield 1;
            yield 2;
            yield 3;
        }
    }
    
    for (let value of myIterable) { 
        console.log(value); 
    }
    // 1
    // 2
    // 3
    
    or
    
    [...myIterable]; // [1, 2, 3]
```

- for-of loops, spread syntax, yield* and destructuring assignment all expect iterables

The next() method also accepts a value which can be used to modify the internal state of the generator
- A value passed to next() will be treated as though the result of the last yield expression paused the generator

```
    function* fibonacci() {
      var fn1 = 0;
      var fn2 = 1;
      while (true) {  
        var current = fn1;
        fn1 = fn2;
        fn2 = current + fn1;
        var reset = yield current;
        if (reset) {
            fn1 = 0;
            fn2 = 1;
        }
      }
    }
    
    var sequence = fibonacci();
    console.log(sequence.next().value);     // 0
    console.log(sequence.next().value);     // 1
    console.log(sequence.next().value);     // 1
    console.log(sequence.next().value);     // 2
    console.log(sequence.next().value);     // 3
    console.log(sequence.next().value);     // 5
    console.log(sequence.next().value);     // 8
    console.log(sequence.next(true).value); // 0
    console.log(sequence.next().value);     // 1
    console.log(sequence.next().value);     // 1
    console.log(sequence.next().value);     // 2
```

Redefine iteration behaviour by supplying our own @@iterator
```
    var someString = new String('hi');           // need to construct a String object explicitly to avoid auto-boxing
    
    someString[Symbol.iterator] = function() {
      return { // this is the iterator object, returning a single element, the string "bye"
        next: function() {
          if (this._first) {
            this._first = false;
            return { value: 'bye', done: false };
          } else {
            return { done: true };
          }
        },
        _first: true
      };
    };
```

A Generator object is both an iterator and iterable
```
    var aGeneratorObject = function* () {
        yield 1;
        yield 2;
        yield 3;
    }();
    typeof aGeneratorObject.next;
    // "function", because it has a next method, so it's an iterator
    typeof aGeneratorObject[Symbol.iterator];
    // "function", because it has an @@iterator method, so it's an iterable
    aGeneratorObject[Symbol.iterator]() === aGeneratorObject;
    // true, because its @@iterator method returns itself (an iterator), so it's an well-formed iterable
    [...aGeneratorObject];
    // [1, 2, 3]
```

```
function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

var g = gen(); // returns an Object of type Generator
```

Generator Function constructor

- Is not a global object. It could be obtained by evaluating:
```
    Object.getPrototypeOf(function*(){}).constructor
```
- Every generator function is actually a GeneratorFunction object. Using a GeneratorFunction constructor creates a new generator function object
- Objects created via the constructor is less efficient than declaring a generator function with a function* expression and calling it within your code.





