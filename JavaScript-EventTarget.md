JavaScript EventTarget
- is a DOM interface implemented by objects that can receive events and want to receieve events (have event listeners)

Adding a listener during event dispatchSection
- If an EventListener is added to an EventTarget while it is processing an event, that event does not trigger the listener. 
- However, that same listener may be triggered during a later stage of event flow, such as the bubbling phase.

Multiple identical event listenersSection
- If multiple identical EventListeners are registered on the same EventTarget with the same parameters, the duplicate instances are discarded. 
- They do not cause the EventListener to be called twice, and they do not need to be removed manually with the removeEventListener() method.  
- Note however that when using an anonymous function as the handler, such listeners will NOT be identical since anonymous functions are not identical even if defined using the SAME unchanging source-code simply called repeatedly, even if in a loop. 
- However, repeatedly defining the same named function in such cases can be more problematic.

The value of this within the handler
- If attaching a handler function to an element using addEventListener(), the value of this inside the handler is a reference to the element. 
- It is the same as the value of the currentTarget property of the event argument that is passed to the handler.
```
my_element.addEventListener('click', function (e) {
  console.log(this.className)           // logs the className of my_element
  console.log(e.currentTarget === this) // logs `true`
})
```
As a reminder, arrow functions do not have their own this context.
```
my_element.addEventListener('click', (e) => {
  console.log(this.className)           // WARNING: `this` is not `my_element`
  console.log(e.currentTarget === this) // logs `false`
})
```

If you wish to pass 'this' into the handler, you can use
1. .bind()
2. create a special function called handleEvent() on 'this' and pass 'this'

Comparison of EventTargets
1. event.target
It is the DOM element on the lefthand side of the call that triggered this event, eg:
element.dispatchEvent(event)

2. event.currentTarget
The EventTarget whose EventListeners are currently being processed. 
As the event capturing and bubbling occurs this value changes.

3. event.relatedTarget
The relatedTarget property for the mouseover event holds the node that the mouse was previously over.
Identifies a secondary target for the event.

4. event.explicitOriginalTarget
If the event was retargeted for some reason other than an anonymous boundary crossing, this will be set to the target before the retargeting occurs.
Unlike .originalTarget, .explicitOriginalTarget will never contain anonymous content.

5. event.originalTarget
The original target of the event, before any retargetings

EventTarget and its functions are intended for DOM Elements. It makes use of event features such as bubbling and propagation. If you want an event system on pure JavaScript objects, you are looking for a custom event system.

