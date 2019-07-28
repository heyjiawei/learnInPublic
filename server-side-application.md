- SSR is often referred to as "isomorphic" or "universal" application
- They allow us to generate HTML for pages whose content is not known at build time

How does it do this?
On client side, the framework you are using (React or Vue) renders to the DOM.
With SSR, on the server, it generates a HTML string (by using the framework's parsing library) and serves it when requested.

Hence the index.html for SSR will look like this:
```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="root">div data-reactroot="">Welcome to SSR powered React application!</div></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

as opposed to 
```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>

```

Here are the trade-offs / things you need to be mindful of in using SSR:
- server side application state will not be passed on to client application state.
	- Does this application state refer to the component state? Or the redux state? or both?
	- does that mean that api calls won't work?

- For react, componentDidMount is not called on the server. If you are fetching data there, those apis will not be called. 
	- So you put your apis calls in componentWillMount?

- **If you are using react router, you need to ensure proper URL is passed to the application when it is rendered on the server:**

On your client side you may be doing this:
```
import React from 'react'
import { Link, Route } from 'react-router-dom'

...

const MultipleRoutes = () => (
  <div>
    <ul>
      <li>
        <Link to="/with-react-router">Home</Link>
      </li>
      <li>
        <Link to="/with-react-router/about">About</Link>
      </li>
      <li>
        <Link to="/with-react-router/topics">Topics</Link>
      </li>
      <li>
        <a href="/">return to server</a>
      </li>
    </ul>

    <hr />

    <Route exact path="/with-react-router" component={Home} />
    <Route path="/with-react-router/about" component={About} />
    <Route path="/with-react-router/topics" component={Topics} />
  </div>
)

export default MultipleRoutes
```

and then using MultipleRoutes component:

```
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom' <-- take note! BrowserRouter is used here!
import MultipleRoutes from './components/MultipleRoutes'

const BasicExample = () => (
  <Router>
    <MultipleRoutes />
  </Router>
)

ReactDOM.hydrate(<BasicExample />, document.getElementById('root'))
```

but on the server side, we need to create a wildcard route /with-react-router\*, so every
request to /with-react-router will be handled here

( the ```context``` is used for tracking potential redirects while rendering the React DOM. This needs to be handled with a 3XX response from the server.)

```
import { StaticRouter as Router } from 'react-router-dom' <-- take note! Using StaticRouter here!
import MultipleRoutes from './public/components/MultipleRoutes'
// ...
app.get('/with-react-router*', (req, res) => {
  const context = {}

  const component = ReactDOMServer.renderToString(
    <Router location={req.url} context={context}> <- take note! You have to provide the location
      <MultipleRoutes />
    </Router>
  )

  const html = `
  <!doctype html>
    <html>
    <head>
      <title>document</title>
    </head>
    <body>
      <div id="root">${component}</div>
      <script src="/static/multipleRoutes.js"></script>
    </body>
    </html>
  `

  if (context.url) {
    res.writeHead(301, { Location: context.url })
    res.end()
  } else {
    res.send(html)
  }
})
```
