What is in import ReactDOM from 'react-dom' ?

ReactDOM.render(element, container[, callback])
- Renders a react element into the DOM. It renders it into the DOM container (inserted as children of the container) and returns a reference to this React Component.
- If the react element was previously rendered into this container, it will perform an update on this DOM
- If the optional callback is provided, it will be executed after the component is rendered or updated.


ReactDOM.hydrate()
- like render, but this is used to hydrate a container that's rendered by ReactDOMServer. React will try to attach event listeners to the existing markup

- the rendered content should be identical between client and server
- you can silence warnings with suppressHydrationWarning={true}
- if you intentionally want the server and client to render different things, you can do a two-pass rendering

two-pass rendering:
Components that render differently on client can read a state variable this.state.isClient, which you can set to true in componentDidMount()
- the initial render pass will first render the same content as the server, then, an additional pass will happen synchronously right after hydration
- this approach will make your components slower (as they have to render twice)

You use ```hydrate``` instead of ```render``` when you are using SSR
E.g.
```
import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './components/Hello'

ReactDOM.hydrate(
  <Hello name={window.__INITIAL__DATA__.name} />,
  document.getElementById('root')
)
```