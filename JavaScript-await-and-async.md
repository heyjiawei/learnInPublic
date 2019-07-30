JavaScript await and async

- Both async and await are keywords. 
- However, you need to put async at function declaration or function expression declaration. await can only work within an async function
- uses an implicit Promise to return its result
- A promise can be resolved with the value returned by the async function, or rejected with an uncaught exception thrown from within the async function.

An async function is an asynchronous function. 
E.g.
async function2()
function1()

When we invoke function2, it will continue to evaluate function1, regardless of what happens in function2.

What does await in async functions do?
async function can contain an await expression that pauses the execution of async function. It is placed where promises are so as to wait for a promise to resolve, and then, resume the async function execution.

You can call it via 2 ways, 
async function callByFunctionName()
or
const callByExpression = async function() {}

In the following code, the first await will cause the evaluator to 'hang' at const slow.
Only after resolveAfter2Seconds() promise is resolved then will it continue evaluating the code.
As it evaluates the code again, it 'hangs' at const fast again.
Only when the promise is resolved then will it print slow and fast on console.
```
var sequentialStart = async function() {
  console.log('==SEQUENTIAL START==');

  // If the value of the expression following the await operator is not a Promise, it's converted to a resolved Promise.
  const slow = await resolveAfter2Seconds();

  const fast = await resolveAfter1Second();
  console.log(slow);
  console.log(fast);
}
```

In the following code, 
it invokes resolveAfter2Seconds() and then invoke resolveAfter1Second() before waiting for resolveAfter2Seconds() promise to be resolved. You can see it as concurrent invocations.

It then 'hangs' at console.log(await slow) if the slow promise has not been resolved.
Only when the promise referenced by const slow is resolved, then will it continue evaluating.
It is unlikely to hand on await fast as waiting for slow promise to be resolved (2seconds) would have caused fast promise to have already been resolved.
```
var concurrentStart = async function() {
  console.log('==CONCURRENT START with await==');
  const slow = resolveAfter2Seconds(); // starts timer immediately
  const fast = resolveAfter1Second();

  console.log(await slow);
  console.log(await fast); // waits for slow to finish, even though fast is already done!
}
```

If you want promises to be concurrent and have the results after all the promises have been resolved, you can use Promise.all()

If you want parallel handling of each promise:
```
var parallel = function() {
  console.log('==PARALLEL with Promise.then==');
  resolveAfter2Seconds().then((message)=>console.log(message));
  resolveAfter1Second().then((message)=>console.log(message));
}
```
