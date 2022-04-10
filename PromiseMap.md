# What is the behaviour of Promise.map?

We shall follow Bluebird's [Promise.map](http://bluebirdjs.com/docs/api/promise.map.html) behaviour, with a few differences:

1. The input iterable only accepts an array, not a promise that returns an iterable
2. The mapper function last parameter takes in the the iterable array itself

The new Promise.map function signature will look like such:
```
Promise.map(
    Iterable<any>,
    function(any item, int index, Iterable<any>) mapper,
    [Object {concurrency: int=Infinity} options]
) -> Promise
```

According to their documentation, Promise.map should have the following behaviour:

1. Accepts an array, a mapper function and an optional concurrency option object
2. The mapper function returns promises
3. Promise.map returned promise doesn't fulfill until all mapped promises have fulfilled 
4. If any promise in the input array is rejected, or any promise returned by the mapper function is rejected, the returned promise is rejected as well.
5. The mapper function for a given item is called as soon as possible, that is, when the promise for that item's index in the input array is fulfilled. This doesn't mean that the result array has items in random order, it means that .map can be used for concurrency coordination unlike .all.

# Behaviour analysis

**A problem I notice people missed out in their implementation is the expectation of "concurrency".**

The last behaviour point means that its concurrency behaviour should look as follows:

Suppose we have 
- array = [10000, 500, 1000] (each element is denoting the milliseconds it will take to fulfill the promise) 
- concurrency = 2 

If we chunk and use `promise.all`, we will not be fully using concurrency = 2. 

Instead, the first 2 arguments will take 10000ms, and only after 10000ms then will the 3rd promise start.
**Overall, it will take 10000ms + 1000ms to complete.**

With concurrency, the first 2 arguments will run first, but when the promise for 500ms has been fulfilled, the promis for 1000s should start.
**Overall, it will take 10000ms to complete.**

# Implementation

My initial implementation thoughts are as follows:

I plan to recreate Promise.map by entending the behaviour of Promise.all and adding concurrency as an after thought.

Brief Algorithm:
1. keep track of concurrency with promiseArgs pointer
2. when attempting to resolve promise, increment right pointer if pointer diff is < concurrency.

When promise has resolved
1. increment left pointer
2. run recursion 

## First try

The returned order is correct but iterable's last element will still be pending due to promise callback scoping

```js
Promise.map = function (iterable, mapper, options) {
  const concurrency = options?.concurrency ?? Infinity;
  return new Promise((resolve, reject) => {
    let left = 0,
      right = 0;
    hasEnded = false;

    function execute() {
      while (right - left < concurrency && right < iterable.length) {
        iterable[right] = Promise.resolve(
          mapper.call(undefined, iterable[right], right, iterable)
        )
          .then((result) => {
            left += 1;
            if (!hasEnded) execute();
            return result;
          })
          .catch((error) => {
            hasEnded = true;
            reject(error);
          })
          .finally(() => {
            if (left === iterable.length) resolve(iterable);
          });

        right += 1;
      }
    }

    execute();
  });
};
```
The reason why this implementation failed is because `.finally()` in the promise chain will run before the result returned from the promise chain is assigned to `iterable[right]`.
That means, we will need to set the result of iterable in `.then()` and find a way to call the main promise's `resolve` when all promises in iterable have been resolved.

## Second try

This implementation returns all results but results are not in the right order

```js
Promise.map = function (iterable, mapper, options) {
  const concurrency = options?.concurrency ?? Infinity;
  return new Promise((resolve, reject) => {
    let left = 0,
      right = 0,
      hasEnded = false,
      resultArr = [];

    function execute() {
      while (right - left < concurrency && right < iterable.length) {
        Promise.resolve(
          mapper.call(undefined, iterable[right], right, iterable)
        )
          .then((result) => {
            resultArr[left] = result; // order of results would be wrong but should still work
            left += 1;

            if (!hasEnded) execute();
            return result;
          })
          .catch((error) => {

            hasEnded = true;
            reject(error);
          })
          .finally(() => {
            if (left === iterable.length) resolve(resultArr)
          });

        right += 1;
      }
    }

    execute();
  });
};
```

This didn't return us results in the order we anticipate because we were not able to track the index of the returned promise.

## Third try

After the above 2 implementations, I was stuck. However, a couple of things were pretty clear from this point:
1. Recursion is needed / useful to run the next promise
2. Promises ran concurrently means a few promises has to run asynchronously together.
3. Promise needs to set result instead of return it via a thenable. This means we have to put result array in another scope.
4. The setting of an ordered result array requires an index. We thus have to somehow track / store the index of the promise.

I am unable to solve this and this [article](https://betterprogramming.pub/implement-your-own-bluebird-style-promise-map-in-js-7c081b7ad02c) gave me insight on how.

TLDR; Use threads to implement concurrency.

- number of threads === concurrency
- each thread will execute a promise ASYNC-ly
- they will pick up the next job in queue to run mapper with

```js
Promise.map = function (iterable, mapper, options) {
  let concurrency = options?.concurrency ?? Infinity;
  let iterableIndex = 0,
    resultArr = [],
    threads = [],
    caughtError = undefined;

  function execute() {
    let i = iterableIndex++;

    if (i >= iterable.length || caughtError) return null;

    return Promise.resolve(mapper.call(undefined, iterable[i], i, iterable))
      .then((result) => {
        resultArr[i] = result;
        return execute();
      })
      .catch((error) => {
        caughtError = error;
        return error;
      });
  }

  while (concurrency-- > 0 && threads.length < iterable.length) {
    const thread = execute();
    if (thread) threads.push(thread);
  }

  return Promise.all(threads).then(() =>
    caughtError ? Promise.reject(caughtError) : resultArr
  );
};
```

I had to add `.catch` block so Promise.map could handle reject promises. 

Initially, I thought that we have the developers handle these rejected promises so they should add a `.catch` block 
but the test case on rejected promises has showed that with concurrency, even if developers add a `.catch` block, they wouldn't get the same
results like `Promise.all`. In fact, the "thread" that did not face a rejected promise will continue to take up the remaining promises, which should not
be the case.

# Test cases

- Ensure that concurrency works as expected
- You can also set concurrency = 1 to see each promise run synchronously, or remove it and see it behave like `Promise.all` 

```js
Promise.map(
  [5000, 1000, 1000, 3000, 5000, 9000],
  (data, i) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, data);
    });
  },
  { concurrency: 2 }
).then((result) => console.log("Promise.map results:", result));
Expect: [5000, 1000, 1000, 3000, 5000, 9000]
```

- Ensure that rejected promise stops promise array from continuing
- The rejected promise should return in the `.catch` block rather than the `.then` block

```js
Promise.map(
  [5000, 1000, 2000],
  (data, i) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (i === 1) {
          reject("WTF");
        } else {
          console.log({ data });
          resolve(data);
        }
      }, data);
    });
  },
  { concurrency: 2 }
)
  .then((result) => console.log("Promise.map results:", result))
  .catch((error) => {
    console.log("Promise.map catch", error);
  });
  
// Expect after 5000ms: Promise.map catch WTF 
```
