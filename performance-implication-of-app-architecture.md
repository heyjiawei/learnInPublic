Google I/O [here](https://www.youtube.com/watch?v=k-A2VfuUROg)

Application architecture:

- component model
- rendering and loading
- routing and transitions
- data/state management

## Is client side rendering a problem?

- after users get the page, they see partial content provided by HTML shell
  - this marks your first paint
- only after JS bundle renders, then users see real content
  - the larger the bundle, the longer the user will have to wait before they can see anything meaningful or begin to use the page

## How do we render on the server then hydrate on the client?

- meta-frameworks like Next.js and Nox.js have this built-in
- SSR with hydration solves first paint, but there's the issue of a longer time to first byte because we have to account for additional and unavoidable sever think time

## Prerendering

- render the app static HTML at build time
- when client requests for it, that HTML page that has already been generated at build time will be sent back immediately.

  - compared to server rendering, that renders the page at runtime

- only works for static content. Cannot generate pages on server if contnet is expected to change
- requires a list of URLs before it can begin
