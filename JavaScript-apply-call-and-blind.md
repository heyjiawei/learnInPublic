JavaScript apply, call and blind
- They are all prototype methods of Function.prototype

Function.prototype.apply()
Calls a function and sets its *this* to the provided value. 
accepts a single array of arguments

Function.prototype.bind()
Creates a new function. The new function has its *this* set to the provided value with a given sequence of arguments provided when the new function was called

Function.prototype.call()
Executes a function and sets its *this* to the provided value. Unlike apply(), it accepts an argument list

function.apply(thisArgs, [argsArray])
```
var numbers = [5, 6, 2, 3, 7];

var max = Math.max.apply(null, numbers);

console.log(max);
// expected output: 7

var min = Math.min.apply(null, numbers);

console.log(min);
// expected output: 2
```

Function.bind(thisArgs[, arg1[, arg2[, ...]]])
```
var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42

```
More on .apply():
- But beware: in using apply this way, you run the risk of exceeding the JavaScript engine's argument length limit. The consequences of applying a function with too many arguments (think more than tens of thousands of arguments) vary across engines (JavaScriptCore has hard-coded argument limit of 65536)
- If your value array might grow into the tens of thousands, use a hybrid strategy: apply your function to chunks of the array at a time.
