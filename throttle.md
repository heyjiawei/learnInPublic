# What is throttle?

Limits a callback to executing once for each window of *delay* milliseconds.

# How is it different from debounce?

Debounce only cares about the final state. Throttle allows us to handle all intermediate state, but at a controlled rate.

# Keypoints to note for throttle function
1. throttle operations should execute immediately and then only execute after the delay for each additional call. 
2. callback function should be able to receive arguments
3. The arguments passed to the callback function should be the latest data
4. throttle fn should call in a fixed delay


An example of point 4 _not_ achieved:
```js
// This is a mix of debounce and throttle. It does not call in fixed intervals!
// The issue in this code is that it does not schedule the next call!
// It only allows the callback to pass through if the callback was called outside the time window
// This means the first call to the function will execute and sets the limit period.
// If we call this function during this period it will not fire until the throttle period has passed.
// Once it has passed, the next invocation will fire and the process repeats.
function throttleNoTimer(fn, time) {
  let lastCalled = 0;
  return function () {
    let now = Date.now();
    if (now - lastCalled < time) return; // If current call is within time window ignore
    lastCalled = now;
    fn.apply(this, arguments);
  };
}

// Use example t=0, t=2, t=8
// Expect callback to be executed at t=0, t=5, t=10
// Instead it will be called at t=0, t=8
```

# Implementation
```js

function throttle(fn, time) {
  let lastCalled, timerId, latestArgs;
  return function () {
    // Ensures you are not dealing with the latest data passed to your throttled event, but dealing with expired data.
    latestArgs = arguments; // setInterval will use the arguments at the time setInterval is invoked.
    if (!timerId) {
      fn.apply(this, latestArgs);

      // setInterval will always be called during time interval
      timerId = setInterval(() => {
        if (lastCalled < Date.now() - time) {
          // When callback is invoked by setInterval, check if there was any calls within the time window
          // If there wasn't any call, we don't have to invoke the callback and 
          // we can terminate the throttle
          
          clearTimeout(timerId);
          timerId = undefined;
          lastCalled = undefined;
        } else {
          fn.apply(this, latestArgs);
        }
      }, time);
    }

    lastCalled = Date.now();
  };
}

function throttle2(fn, delay) {
  let timerId, calledArgs;

  function run() {
    calledArgs = arguments; // Use arguments object or (...args) => {} instead of passing parameter if you are checking calledArgs for null

    if (!timerId) {
      fn.apply(this, calledArgs);
      calledArgs = null; // Instead of checking for lastCalled(date), we use arguments object

      timerId = setTimeout(() => {
        // with setTimeout, the callback loop will have to be triggered by recursion
        timerId = null;

        if (calledArgs) run(calledArgs);
      }, delay);
    }
  }

  return run;
}

function api() {
  console.log("api args:", arguments, new Date().getSeconds());
}
const limitApiCalled = throttle(api, 5000);

// time = 0
for (let i = 0; i < 10; i++) {
  limitApiCalled(undefined);
}

// wait 2 seconds (time = 2)
setTimeout(() => limitApiCalled("says hiii"), 2000);
// wait 2 seconds (time = 4)
setTimeout(() => limitApiCalled("says h"), 4000);
// wait 2 seconds (time = 8)
setTimeout(() => limitApiCalled("says hi"), 8000);

/*
expect callback to be executed at 
t=0 
api args: [Arguments] { '0': undefined } 19
t=5 
api args: [Arguments] { '0': 'says h' } 24
t=10
api args: [Arguments] { '0': 'says hi' } 29
*/
```
