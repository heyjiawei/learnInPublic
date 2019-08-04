JavaScript Promise
A Promise is an object that represents the eventual completion of an async operation.

- It has 3 states, pending, resolved and rejected
- functions passed to .then(), which are your onSuccess and onFailure callbacks, will never be called synchronously. This applies to already-resolved promises as well.

Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2

Instead of running immediately, the passed-in function is put on a microtask queue, which means it runs later when the queue is emptied at the end of the current run of the JavaScript event loop

Here are the common mistakes made with Promises:
```
// Bad example! Spot 3 mistakes!
doSomething().then(function(result) {
  doSomethingElse(result) // Forgot to return promise from inner chain + unnecessary nesting
  .then(newResult => doThirdThing(newResult));
}).then(() => doFourthThing());
// Forgot to terminate chain with a catch!
```
- The first mistake is to not chain things together properly. This happens when we create a new promise but forget to return it. As a consequence, the chain is broken, or rather, we have two independent chains racing. This means doFourthThing() won't wait for   doSomethingElse() or doThirdThing() to finish, and will run in parallel with them, likely unintended. Separate chains also have separate error handling, leading to uncaught errors.

here is the corrected version:
```
doSomething()
.then(function(result) {
  return doSomethingElse(result); // A promise is returned
})
.then(newResult => doThirdThing(newResult))
.then(() => doFourthThing())
.catch(error => console.log(error));
```

Creating a Promise
new Promise( /* executor */ function(resolve, reject) { ... } );

An executor function is passed to the Promise constructor. 
- The executor function is executed immediately by the Promise implementation
- The executor function passes the resolve and reject functions.
- The resolve and reject functions, when called, resolve or reject the promise, respectively. The executor normally initiates some asynchronous work, and then, once that completes, either calls the resolve function to resolve the promise or else rejects it if an error occurred. If an error is thrown in the executor function, the promise is rejected. 
- The return value of the executor is ignored.

```
let myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code. 
  // In reality, you will probably be using something like XHR or an HTML5 API.
  setTimeout(function(){
    resolve("Success!"); // Yay! Everything went well!
  }, 250);
});

myFirstPromise.then((successMessage) => {
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log("Yay! " + successMessage);
});
```

Promise.then()
- If one or both arguments are omitted or are provided non-functions, then then will be missing the handler(s), but will not generate any errors.

There are 3 things you can do in Promise.then():
1. return another promise
2. return a synchronous value (or choose not to, which would return undefined)
3. throw a synchronous error

On the callbacks passed to Promise.then(),
if the callback function:
- returns a value, the promise returned by then gets resolved with the returned value as its value;
- doesn't return anything, the promise returned by then gets resolved with an **undefined value;**
- throws an error, the promise returned by then gets rejected with the thrown error as its value;
- returns an already resolved promise, the promise returned by then gets resolved with that promise's value as its value;
- returns an already rejected promise, the promise returned by then gets rejected with that promise's value as its value;
- returns another pending promise object, the resolution/rejection of the promise returned by then will be subsequent to the resolution/rejection of the promise returned by the handler. Also, the value of the promise returned by then will be the same as the value of the promise returned by the handler.

The promise will always log pending as long as its results are not resolved yet. Regardless of the promise state (resolved or still pending) you must call .then on the promise to capture the results

1. The return of the .then function will be the resolve value of the promise.

function initPromise() {
  return new Promise(function(res,rej) {
    res("initResolve");
  })
}

initPromise().then(function(result) {
    console.log(result); // "initResolve"
    return "normalReturn";
})
.then(function(result) {
    console.log(result); // "normalReturn"
});
2. If the .then function returns a promise, then the resolve of its promise will be the resolve of its next .then basically.

function initPromise() {
  return new Promise(function(res,rej) {
    res("initResolve");
  })
}
initPromise().then(function(result) {
    console.log(result); // "initResolve"
    return new Promise(function(resolve, reject) {
       setTimeout(function() {
          resolve("secondPromise");
       }, 1000)
   })
})
.then(function(result) {
    console.log(result); // "secondPromise"
});

 What is the difference between these four promises?
1.
doSomething().then(function () {
  return doSomethingElse();
});
2.
doSomething().then(function () {
  doSomethingElse();
});
3.
doSomething().then(doSomethingElse());
4.
doSomething().then(doSomethingElse);

Puzzle #1
doSomething().then(function () {
  return doSomethingElse();
}).then(finalHandler);
Answer:

doSomething
|-----------------|
                  doSomethingElse(undefined)
                  |------------------|
                                     finalHandler(resultOfDoSomethingElse)
                                     |------------------|
Puzzle #2
doSomething().then(function () {
  doSomethingElse();
}).then(finalHandler);
Answer:

doSomething
|-----------------|
                  doSomethingElse(undefined)
                  |------------------|
                  finalHandler(undefined)
                  |------------------|
Puzzle #3
doSomething().then(doSomethingElse())
  .then(finalHandler);
Answer:

doSomething
|-----------------|
doSomethingElse(undefined)
|---------------------------------|
                  finalHandler(resultOfDoSomething)
                  |------------------|
Puzzle #4
doSomething().then(doSomethingElse)
  .then(finalHandler);
Answer:

doSomething
|-----------------|
                  doSomethingElse(resultOfDoSomething)
                  |------------------|
                                     finalHandler(resultOfDoSomethingElse)
                                     |------------------|
