JavaScript rest parameters

- The rest parameter syntax allows us to represent an indefinite number of arguments as an array.

function f(a, b, ...theArgs) {
  // ...
}

- Only the last parameter can be a "rest parameter".

Difference between rest parameters and the arguments object
There are three main differences between rest parameters and the arguments object:

1. rest parameters are only the ones that haven't been given a separate name (i.e. formally defined in function expression), while the arguments object contains all arguments passed to the function;
2. the arguments object is not a real array, while **rest parameters are Array instances**, meaning methods like sort, map, forEach or pop can be applied on it directly;
3. the arguments object has additional functionality specific to itself (like the callee property).

Destructuring rest parameters
- Rest parameters can be destructured (arrays only), that means that their data can be unpacked into distinct variables.

In the following, a, b and c are mapped to 1, 2 and 3
```
function f(...[a, b, c]) {
  return a + b + c;
}

f(1)          // NaN (b and c are undefined)
f(1, 2, 3)    // 6
f(1, 2, 3, 4) // 6 (the fourth parameter is not destructured)
```
