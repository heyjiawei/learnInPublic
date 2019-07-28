The ReactDOMServer object enables you to render components to static markup. 

These 2 methods can be used on both server and browser:

ReactDOMServer.renderToStaticMarkup(element)
- Render a React element to its initial HTML. React will return an HTML string except this doesn’t create extra DOM attributes that React uses internally, such as data-reactroot
- If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use renderToString on the server and ReactDOM.hydrate() on the client.

ReactDOMServer.renderToString(element)
- Render a React element to its initial HTML. React will return an HTML string. 
- If you call ReactDOM.hydrate() (instead of client side render) on a node that has this server rendered markup, React will preserver it and only attach event handlers.

These 2 can only be used on server:

ReactDOMServer.renderToStaticNodeStream(element)
- does what ReactDOMServer.renderToStaticMarkup do

ReactDOMServer.renderToNodeStream(element)
- does what ReactDOMServer.renderToString do

stream API will improve our performance

The above methods are usually used in server code like so:
```
import express from 'express'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Hello from './public/components/Hello'

const app = express()

app.use('/static', express.static(path.resolve(__dirname, 'public')))

app.get('/', (req, res) => {
  const name = 'Marvelous Wololo'

  const component = ReactDOMServer.renderToString(<Hello name={name} />)

  const html = `
  <!doctype html>
    <html>
    <head>
      <script>window.__INITIAL__DATA__ = ${JSON.stringify({ name })}</script>
    </head>
    <body>
    <div id="root">${component}</div>
    <script src="/static/home.js"></script>
  </body>
  </html>`

  res.send(html)
})

app.listen(3000)
```