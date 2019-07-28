The order when an instance of a React component is being created and inserted into the DOM:
1. constructor(). 
This is also the class constructor if you are using a class.
- it is used to initialize the state and bind methods

2. static getDerivedStateFromProps()
- It should return an object to update the state, or null to update nothing
- This method exists for rare use cases where the state depends on changes in props over time.
- this method is fired on every render, regardless of the cause. 

3. render()

4. componentDidMount()
- invoked immediately after a component is mounted (inserted into the tree).
- Initialization that requires DOM nodes (i.e. things that depends on its size or position) should go here. 
- you may call setState() in here. It will trigger an extra rendering but the browser will not see this flashing effect as the rendering is done before the browser updates the screen.

On update (caused by changes to props or state)
1. static getDerivedStateFromProps()

2. shouldComponentUpdate()

3. render()

4. getSnapshotBeforeUpdate()
- is invoked right before the most recently rendered output is committed to e.g. the DOM.
- It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed
- Any value returned by this lifecycle will be passed as a parameter to componentDidUpdate().

5. componentDidUpdate()


On unmounting (called when component is removed from the DOM)
1. componentWillUnmount()

When an error is thrown and not caught:
1. static getDerivedStateFromError()
- This lifecycle is invoked after an error has been thrown by a descendant component. 
- It receives the error that was thrown as a parameter and should return a value to update state.
- this function is called during the "render" phase so side-effects are not permitted.

2. componentDidCatch(error, info)
- This lifecycle is invoked after an error has been thrown by a descendant component. It receives two parameters:

error - The error that was thrown.
info - An object with a componentStack key containing information about which component threw the error.

- this function is called during the “commit” phase, so side-effects are permitted. It should be used for things like logging errors


Error boundaries:
- Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

- A class component becomes an error boundary if it defines either (or both) of the lifecycle methods static getDerivedStateFromError() or componentDidCatch(). 