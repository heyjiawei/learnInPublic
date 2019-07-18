Race conditions in Javascript

Problem:
When we send multiple search request, sometimes, the response of the first request takes a longer time than the last request and in returning, can overwrite the first response.

This is known as a race condition.

There are a few solutions about it:

1. Only take the last response.
You can store an id that tracks the last response. If the response id matches, return that response.
However, doing so would mean there's no response as I type.

2. Do 1. and discard the response that arrives out of order


Optimistic Updates problems with race conditions

Problem: 
When we set something in a CRUD app, we may optimistically update the UI to show that the task has been saved, and then, send the async promise to the backend. This can cause the UI state and backend state to be out of sync when there is network issues and whatnot.

Solution:
Create a separate data model to show a predicted optimistic update. On receiving response from backend, then, can you finalise the UI state.

This is because updating the UI state without confirmation from the backend is moving away from the ground truth.

Problem with solution:
What if we have synchronous tasks all using API calls? E.g. User creates a task, followed immediately with assigning the task? 

Solution:
Use an operation task queue
- this can solve synchronous tasks
- allow retries
- achieve eventual consistency
- prevent data loss

Problem with solution:
What if the user closes the browser while the queue is still running?

Solution:
Persist the queue to client storage
Or stop the user from closing the browser (alert box)

Problem with solution:
If you persist it to client storage, what if user opens up multiple tabs?
Each queue will be stored to local storage (shared mutable state)

There can only be 1 tab running the queue to prevent the above problem.
- We can use shared web workers, service workers instead of tabs to manage the queue.

However, IE11 users don't have access to shared web workers and service workers...

Solution:
Any tab can work on the queue if no tabs are currently working on it. We can implement a deligation model. The available tabs would request local storage for jobs. local storage will decide who should do the job. On assigning the job, the tab that's doing the job will periodically send a heartbeat to local storage. When no heartbeat is sent, local storage will know that the tab has been closed (or crashed) and would assign it to the next available tab.

Tools that can help:
Rx, js-csp, redux-saga, Firebase, PouchDB