unit-focused testing strategy

- clear connection from a test to the system under test. It's easy for new contributors to guess correctly about where to add a test for a new contribution, and it's easy to figure out where to go digging in the code when a test breaks.
- pure functions
- less self-documenting than a behavior-focused testing strategy, since it relies on the unit organization of the system itself to be somewhat intuitive

behaviour-focused testing strategy

- If your module being tested is essentially one "thing", then splitting your unit tests could result in something like this:

```shell
index.js
test/array-buffers.js
test/auto-end-deferred-when-paused.js
test/basic.js
test/collect-with-error-end.js
test/collect.js
test/dest-write-returns-nonboolean.js
test/destroy.js
test/emit-during-end-event.js
test/empty-buffer-end-with-encoding.js
test/empty-stream-emits-end-without-read.js
test/end-missed.js
test/end-returns-this.js
test/end-twice.js
test/is-stream.js
test/iteration-unsupported.js
test/iteration.js
test/pipe-ended-stream.js
test/readable-only-when-buffering.js
```

- This is a strategy that more easily fits into a TDD or BDD workflow. A failing test file is added with a name that describes the intended behavior or bug (red). Then the code is modified to implement that behavior or fix that bug, without breaking any other tests (green). Lastly, the code is edited for performance, elegance, and clarity, without breaking any tests (refactor).
