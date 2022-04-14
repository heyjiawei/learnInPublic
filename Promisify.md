# What is Promisify

“Promisification” is the conversion of a function that accepts a callback into a function that returns a promise.

```js
function loadScript(src, callback) {
  console.log("src: ", src);
  callback(undefined, src);
}
// callback usage
loadScript('path/script.js', (err, script) => {...})

// promisify
const loadScriptPromiseResolve = promisify(loadScript);
loadScriptPromiseResolve("path/script.js").then((result) =>
  console.log("loadScriptPromise result: ", result)
);
```

# Implementation

- promisify needs to take in the argument provided to the function that it will promisify
- instead of passing in a callback as a parameter, the `.then()` would function as the callback. This means the promisify function also implement the callback and return us the results via a thenable

```js
function promisify(promisifyFn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      function passedInCallback(error, result) {
        error ? reject(error) : resolve(result);
      }

      promisifyFn.call(this, args, passedInCallback);
    });
  };
}
```

# test cases

- callback expects function signature to be `(error, result) => { ... }`
- allow callback with more arguments `callback(err, res1, res2, ...)`

```js
function passMany(args, callback) {
  console.log("passMany: ", args);
  callback(undefined, ...args);
}

const passManyPromiseResolve = promisify(passMany);
passManyPromiseResolve("a", 1, 2, 3, 4)
  .then((result) => console.log("passManyPromiseResolve result: ", result))
  .catch((error) => console.log("passManyPromiseReject error", error));
```

- catch rejected promises

```js
function loadScriptError(src, callback) {
  console.log("src: ", src);
  callback(new Error("Bad bad!"));
}
const loadScriptPromiseReject = promisify(loadScriptError);
loadScriptPromiseReject("path/script.js")
  .then((result) => console.log("loadScriptPromiseReject result: ", result))
  .catch((error) => console.log("loadScriptPromiseReject result:", error));
```
