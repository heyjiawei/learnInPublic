# SSR Rehydration

## Rehydration concept

- Server renders HTML string (Rendered UI) and adds it into HTML
- Server serializes data for UI and adds it into HTML `<script>` tag
- only after bundle.js finished loading and executing then UI will be interactive
- one of the most common SSR Rehydration pitfalls, where a server-rendered DOM tree gets destroyed and then immediately rebuilt - most often because the initial synchronous client-side render required data that wasn’t quite ready, perhaps awaiting Promise resolution.

## Break down ways to rehydrate

rehydration here is defined as passing data to the app at runtime

1. From API
2. pass data via windows object

- you can assign the data to window object and then read it in React application.

3. pass data via attribute on parent node

- change the HTML like so:

```
<div id="react" data-react='{"user":{"name":"BTM","email":"example@example.com"}}'></div>
<script src="react-application.js"></script>
```

and then rehydrate like so:

```
const node = document.getElementById('root');
const userData = node.dataset.react ? JSON.parse(node.dataset.react) : {};
ReactDOM.hydrate(<App user={userData.user} />, node);
```

4. expose render function

```
function runApplication(data, node) {
  ReactDOM.render(<App data={data} />, node);
}
window.runReactApplication = runApplication;
```

```
<div id="MyApp"></div>
<script src="react-application.js"></script>
<script>
  window.runReactApplication({
    user: { name: 'BTM', email: 'example@example.com' }
  }, document.querySelector('#MyApp'));
</script>
```

## Incremental rehydrating or ways to speed up rehydrating

- Streaming server rendering

  - render multiple requests at once
  - send content in chunks so that the browser can progressively render as it's received.
    - aim for browser to begin rendering page before response is complete
    - improves TTFB
  - Using `renderToNodeStream()`
  - you can cache streamed HTML
    - buffer all the HTML chunks of a single request in memory as they come along, then concatenate them together once we’re all done, and store the entire HTML document in the cache using Node.js stream Transform
  - refer to google's [stream your way to immediate responses](https://developers.google.com/web/updates/2016/06/sw-readablestreams) for more explanation

  Limits

  - streaming provides a mechanism for handling back pressure
  - high watermark in Node.js for streams is 16kb

- Progressive rehydration

  - individual pieces of a server-rendered application are “booted up” over time (??), rather than the current common approach of initializing the entire application at once.
  - the hydration step begins at the root of the tree, but the process gets arrested for various branches to resume later when they enter the viewport. Importantly, the loading of resources required to perform each hydration is also deferred. You can see the code of their basic demo [here](https://github.com/GoogleChromeLabs/progressive-rendering-frameworks-samples/blob/master/react-progressive-hydration/app/components/hydrator.js).

  ### USNews

  - Code [here](https://github.com/usnews/blog-samples/tree/master/deferHydration)
  - "deferHydration" function which wraps an import statement and returns a React component class. This function has two separate JavaScript files: one which defines it for the server and another which defines it for the client.
    - Webpack is then used to supply the right version in the right environment
  - The server-side implementation of the deferHydration function performs the import synchronously and returns a higher-order component that simply wraps the desired React component
  - The client-side implementation utilizes the fact that React's dangerouslySetInnerHTML prop is ignored during the hydration step and returns an otherwise empty component that uses that prop(what prop??) to prevent React from wiping its server-rendered contents
  - This component registers a listener upon instantiation and never updates during additional renders, so the React tree continues to ignore it
  - When the listener is triggered, the JavaScript for the deferred component is downloaded and a new React tree is instantiated and hydrated at that DOM node.

  To make hydration progressive, they tune hydration with the observation that

  > many parts of the page may not require interactivity until certain user interactions (such as scrolling to that section or clicking on a button) or may not require interactivity at all (like a footer of plain links). Hydrating these sections at initial page load is costly and unnecessary

  #### Hydration triggers

  If a section of a page has its hydration deferred, the circumstances which trigger the eventual hydration can vary based on the content.

  Here are common triggers:

  1. view (hydration is triggered when the component scrolls into the viewport)
  2. never (plain un-hydrated HTML has full functionality and no code is loaded or executed)
  3. click/hover/focus (hydrate when the user interacts with the component, then repeat the event so React can also respond to it)
  4. interaction (hydrate the component when the user interacts with the page in any way)
  5. an arbitrary Promise (custom hydration trigger behavior)

  #### Integration with imports

  - deferred hydration uses import to return a HOC react component.
  - its easy to use the react component as is

  #### Hydration zone

  - we started dividing up our pages into various groups of components that should have their hydration triggered together
    - Each of these sections, called a "hydration zone", is split out into its own file and imported with a deferHydration call.
    - In addition to facilitating deferred hydration, this also helps to organize our pages into logical chunks.

#### Drawbacks

1. context issue

their implementation relies on instantiating separate React trees (??) for each instance of a deferred component. For the most part, this is transparent to the developer, but React Context is a glaring exception and does not get passed along from the parent tree to the child tree, interrupting functionality like Redux. We are currently working on strategies to preserve Context in the subtrees, but we have not yet fully restored that functionality.

2. React does not play well with other third party scripts that inject content within its tree, such as Google's ad script. Progressive hydration exacerbates this further, because React is very aggressive about removing content it does not recognize during hydration, which is now performed later after the third party content has probably already been injected. Extra care must be taken to prevent such deletion.

### Shopify

- not a full strategy but more of a hack that could help in your progressive hydration strategy. Specifically solves the passing server data/rendered HTML to client
- in quilt project, package [react-hydrate](https://www.npmjs.com/package/@shopify/react-hydrate)
- Typically, doing different work on the server and client would result in the server markup being thrown out by React’s initial reconciliation.
- This library avoids that issue by

  1.  rendering a wrapping div around the content on the server
  2.  adding an ID to that element, and setting the dangerouslySetInnerHTML prop on the client to the resulting server markup in order to avoid mismatches

- Once you have done whatever work on the client to load the necessary components, this hardcoded markup is removed, allowing the React tree to take over.

- Partial rehydration
  - built on top of progressive rehydration
  - individual pieces (components / views / trees) to be progressively rehydrated are analyzed and those with little interactivity or no reactivity are identified. For each of these mostly-static parts, the corresponding JavaScript code is then transformed into inert references and decorative functionality, reducing their client-side footprint to near-zero.

## Google I/O 19 hydrator

Steps:

1. prevent a root in our DOM from re-rendering; prevent renders from cascading through our hydrator boundary
2. use dangerouslySetInnerHTML and set it to an empty value.

- dangerouslySetInnerHTML is ignored during hydration. Allows us to bypass diffing for the server-rendered dom that exist inside of out component root

3. when the hydrator component is mounted, we listen for an indication that it should be hydrated

4. When the hydrator component is in view, the hydrator will import and hydrate the component in place against the server-rendered DOM that we captured by bypassing diffing

```
<Hydrator load={() => import('./suggested')}>
```

## ReactDom.hydrate API

- hydrates a container whose HTML contents were rendered by ReactDOMServer. React will attempt to attach event listeners to the existing markup.
- React expects that the rendered content is identical between the server and the client.
  - This means it assumes the server sent HTML (rendered with ReactDOMServer.renderToString) will be identical to the client side rendered output.
    - ReactDOMServer.renderToString creates extra DOM attributes that React uses internally, such as `data-reactroot`
- If a single element’s attribute or text content is unavoidably different between the server and the client, you may silence the warning by adding `suppressHydrationWarning={true}` to the element.
  - It only works one level deep, and is intended to be an escape hatch
- If you intentionally need to render something different on the server and the client, you can do a two-pass rendering.
  - a two-pass rendering is where you set a state variable like `this.state.isClient` in componentDidMount() and cause the initial render pass to render the same content as the server, avoiding mismatches; the next pass will happen synchronously right after hydration
  - Note that this approach will make your components slower because they have to render twice

## Vue lazy hydration

[Vue lazy hydration package](https://github.com/maoberlehner/vue-lazy-hydration)

4 hydration modes:

1. when-idle
2. ssr-only (only loaded in SSR mode. For static content / components that will never be interactive. It never gets hydrated in the browser)
3. when-visible (delay hydration until component becomes visible)
4. on-interaction (listens to a focus event by default) you can also set it to listen to a specific event or a list of events

- on-interaction(??) So do we render the content but not hydrate the event listeners?
- when-visible uses intersection observer. We might want to expose the configuration of intersection observer

Resource for this concept:

- https://markus.oberlehner.net/blog/abomination-a-concept-for-a-static-html-dynamic-javascript-hybrid-application/
- https://markus.oberlehner.net/blog/how-to-drastically-reduce-estimated-input-latency-and-time-to-interactive-of-ssr-vue-applications/

### abomination

The idea of abomination is to build static websites with JavaScript but remove all JavaScript once the page is prerendered at build time.
At the same time it should be possible to have certain components on the page remain as fully functional dynamic components

You would need a dynamic component wrapper such that at build time, the code for initializing all dynamic component is extracted from the page.
Your JavaScript bundle would then contain only the code for they dynamic components.

The downsides for such approach:

- developer experience is bad because you would have to think about which component should be dynamic and which is not
- you also lose the dynamic routing capabilities you get with frontend frameworks

abomination is more suited for static site generators

## React concepts to understand before proceeding forward

- what is concurrent mode
- why is the connection between the store and hydration
- React.lazy
  - is used with suspense; The lazy component should then be rendered inside a Suspense component
  - React.lazy takes a function that must call a dynamic import(). This must return a Promise which resolves to a module with a default export containing a React component.

## Other resources

- vue-lazy-hydration?
  - wraps and use specific events to determine when to hydrate
- why is the connection between the redux/flux store and hydration
- [idea to render on idle with code examples](https://medium.com/@kumarswapnil/optimizing-react-performance-part-i-81d62c90cce0)

## Findings

- when you use dangerouslySetHTML as an empty string in a `<div>`(or dom element), it stops react from walking down the tree. So on server side, if we return the rendered DOM components. We can use dangerouslySetHTML to signal to react no to do anything more in this subtree. That will be how we retain the Server returned HTML.
- There are some [issues with context](https://codesandbox.io/s/compassionate-silence-d3iph?file=/src/App.js) and here is [how shopfiy may have resolved context issue](https://codesandbox.io/s/jovial-resonance-0s6nn?file=/src/App.js)
- by the way, [Preact has a different hydration behaviour](https://codesandbox.io/s/dazzling-roentgen-x6gt4?file=/public/index.html)
- [you can pass click to hydrated components](https://codesandbox.io/s/aged-sea-su13d?file=/src/App.js) and forking from that, [state can be updated](https://codesandbox.io/s/nifty-jackson-vsh9r?file=/src/App.js)
