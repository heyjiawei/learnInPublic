- In practice, these definitions of time are subject to both clock skew and adjustment of the system clock. The value of time may not always be monotonically increasing and subsequent values may either decrease or remain the same.

- For example, the following script may record a positive number, negative number, or zero for computed duration:

```js
var mark_start = Date.now();
doTask(); // Some task
var duration = Date.now() - mark_start;
```

- The DOMHighResTimeStamp type, performance.now method, and performance.timeOrigin attributes of the Performance interface resolve the above issues by providing monotonically increasing time values with sub-millisecond resolution.

# Terminology

## Time Origin

The time origin is the time value from which time is measured depending on the context:

1. If the global object is a Window object, the time origin MUST be equal to:

- the time when the browsing context is first created if there is no previous document; E.g. a newly open tab and navigating straight to the website
- otherwise, the time of the user confirming the navigation during the previous document's prompt to unload algorithm, if a previous document exists and if the confirmation dialog was displayed;
- otherwise, the time of starting the navigation responsible for loading the Window object's newest Document object.

2. If the global object is a WorkerGlobalScope object, the time origin MUST be equal to the official moment of creation of the worker.

3. Otherwise, the time origin is undefined.

- The time origin timestamp is the high resolution time value at which time origin is zero.

  > The time origin timestamp and the value returned by Date.now() executed at "zero time" can differ because the former is recorded with respect to a global monotonic clock that is not subject to system and user clock adjustments, clock skew, and so on

- The DOMHighResTimeStamp type is used to store a time value in milliseconds, measured relative from the time origin, global monotonic clock, or a time value that represents a duration between two DOMHighResTimeStamps.

- monotonic clock is monotonically increasing and not subject to system clock adjustments or system clock skew
  - In certain scenarios (e.g. when a tab is background-ed), the user agent may choose to throttle timers and periodic callbacks run in that context or even freeze them entirely. Any such throttling should not affect the resolution or accuracy of the time returned by the monotonic clock.
- global monotonic clock is monotonically increasing and not subject to system clock adjustments or system clock skew, and whose reference point is the ECMA-262 time definition
  - The user agent can reset its global monotonic clock across browser restarts, or whenever starting an isolated browsing session—e.g. incognito or similar browsing mode.
  - **developers should not use global timestamps as absolute time** that holds its monotonic properties across all past, present, and future contexts

# Construct a timeline of the entire application, including events from worker or shared worker

- worker and shared worker will have different time origins
- to display these events on the same timeline, we need to translate the DOMHighResTimeStamps as follows:

```js
onconnect = function (e) {
  var port = e.ports[0];
  port.onmessage = function (e) {
    // Time execution in worker
    var task_start = performance.now();
    result = runSomeWorkerTask();
    var task_end = performance.now();
  };

  // Send results and epoch-relative timestamps to another context
  port.postMessage({
    task: "Some worker task",
    start_time: task_start + performance.timeOrigin,
    end_time: task_end + performance.timeOrigin,
    result: result,
  });
};

// Translating worker timestamps into document's time origin
var worker = new SharedWorker("worker.js");
worker.port.onmessage = function (event) {
  var msg = event.data;

  // translate epoch-relative timestamps into document's time origin
  msg.start_time = msg.start_time - performance.timeOrigin;
  msg.end_time = msg.end_time - performance.timeOrigin;

  reportEventToAnalytics(msg);
};
```
