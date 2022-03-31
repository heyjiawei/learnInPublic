Debounce = wait until this function stops getting called after x amount of time, then call it.
Implement debounce:

```js
function debounceWithArrowReturnFn(fn, time) {
  let timerId;
  return () => {
    // used arrow function. This results in args [Arguments] { '0': [Function: hey], '1': 500 }
    clearTimeout(timerId);
    console.log("call", arguments);
    timerId = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  };
}

function debounce(fn, time) {
  let timerId;
  return function () {
    // with anonymous function, it uses its own this context. This results in args [Arguments] { '0': 987 }
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, arguments); // Do not forget to apply arguments to passed in fn!
    }, time);
  };
}

function hey() {
  console.log("hey called with args: ", arguments);
}
const callApi = debounce(hey, 500);

/* test cases */
for (let i = 0; i < 1000; i++) {
  callApi(987); // should fire once
}

```
