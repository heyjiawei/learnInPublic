# Promise.all 

- Is a static method on Promise Class
- takes an iterable of promises as an input
- returns a single promise
- returned promise resolves to an arry (need not be a new array or the same array that was passed as input) of the results of the input promise 
- Immediately rejects if any of the input promises rejects, or if a non-promise throws an error. It rejects with the first rejection message/error

# Implement Promise.all()

## Initial implementation:

- focused on resolving "main" function returned promise when all promises in array are resolved
- focused on tracking resolved promises
- unsure of Promise.resolve

```js
Promise.all = function (iterable) {
  const tracker = Array(iterable.length).fill(false);
  if (!iterable.length) return Promise.resolve(iterable);

  const promiseResolve = (overallResolve) => (i) => {
    tracker[i] = true;
    if (tracker.every((p) => p === true)) overallResolve(iterable);
  };

  return new Promise((resolve, reject) => {
    const promiseResolveEnhanced = promiseResolve(resolve);

    for (let i = 0; i < iterable.length; i++) {
      const p = iterable[i];

      if (!(p instanceof Promise)) {
        promiseResolveEnhanced(i);
      } else {
        p.then(
          (onFulfilled) => {
            promiseResolveEnhanced(i);
            iterable[i] = onFulfilled;
          },
          (onRejected) => {
            reject(onRejected);
          }
        );
      }
    }
  });
};
```

## Improved implementation

After viewing [this](https://medium.com/@copperwall/implementing-promise-all-575a07db509a) solution, I think this way is cleaner, more explicit and elegant.

The article provided 3 solutions - recursive, iterative and using reduce.
The recursive solution and the solution using reduce produce incorrect results because they do not return the resolved promise in order. Notice how every promise in the array is resolved asynchronously and pieced back once their result is returned. This behaviour is incorrect.

Example of incorrect behaviour:
```js
const resolveAfter5sec = new Promise((resolve, _reject) =>
  setTimeout(() => resolve(5000), 5000)
);
const resolveAfter1sec = new Promise((resolve, _reject) =>
  setTimeout(() => resolve(1000), 1000)
);

Promise.all([resolveAfter5sec, resolveAfter1sec]);
// expect [5000, 1000]
```

Correct (and improved) implementation:
```js
Promise.all = function (iterable) {
  return new Promise((resolve, reject) => {
    let complete = 0;

    iterable.forEach((p, i) => {
      Promise.resolve(p)
        .then((onFulfilled) => {
          iterable[i] = onFulfilled;
          complete += 1;

          if (complete === iterable.length) resolve(iterable);
        })
        .catch((error) => reject(error));
    });
  });
};
```

## Test cases

1. Ensure non promises are returned
2. Ensure Resolved promises are returned
3. Ensure promises are returned after 1000ms

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "foo");
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```

1. Ensure rejected promises returns rejected value

```js
var mixedPromisesArray = [Promise.resolve(33), Promise.reject(44)];
var p = Promise.all(mixedPromisesArray);
console.log(p);
setTimeout(function () {
  console.log("the stack is now empty");
  console.log(p);
});

// Promise { <state>: "pending" }
// the stack is now empty
// Promise { <state>: "rejected", <reason>: 44 }
```

1. Ensure rejected promise are thrown immediately

```js
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("one"), 1000);
});
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("two"), 2000);
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("three"), 3000);
});
var p4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("four"), 4000);
});
var p5 = new Promise((resolve, reject) => {
  reject(new Error("reject"));
});

// Using .catch:
Promise.all([p1, p2, p3, p4, p5])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.error(error.message);
  });

//From console:
//"reject"
```
