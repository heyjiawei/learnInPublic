Throttling vs Debouncing
- Throttling will delay executing a function. It will reduce the notifications of an event that fires multiple times.
- Debouncing will bunch a series of sequential calls to a function into a single call to that function. It ensures that one notification is made for an event that fires multiple times.

If you have a function that gets called a lot - for example when a resize or mouse move event occurs, it can be called a lot of times. If you don't want this behaviour, you can Throttle it so that the function is called at regular intervals. Debouncing will mean it is called at the end (or start) of a bunch of events.

The code is very similar but notice that for debounce, the task gets cancelled if a new task is entered within 500ms. Hence, it only sends the last task.
For trottle, the event listener is only 'initialized' after 500ms. When it is not initialized, the actions will not be caught (they will go into an underlaying buffer, more accurately). On initialization, the event listener will accept the latest action and process that action.

Throttle:
```
import { throttle } from 'redux-saga/effects'

function* handleInput(input) {
  // ...
}

function* watchInput() {
  yield throttle(500, 'INPUT_CHANGED', handleInput)
}
```

Debounce:
```
import { call, cancel, fork, take, delay } from 'redux-saga/effects'

function* handleInput(input) {
  // debounce by 500ms
  yield delay(500)
  ...
}

function* watchInput() {
  let task
  while (true) {
    const { input } = yield take('INPUT_CHANGED')
    if (task) {
      yield cancel(task)
    }
    task = yield fork(handleInput, input)
  }
}
```