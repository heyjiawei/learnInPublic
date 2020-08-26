# SSR Rehydration

## Rehydration concept

- Server renders HTML string (Rendered UI) and adds it into HTML
- Server serialises data for UI and adds it into HTML `<script>` tag
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
ReactDOM.render(<App user={userData.user} />, node);
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

- Streaming server rendering (??)

  - send HTML in chunks that the browser can progressively render as it's received.
  - Using `renderToNodeStream()`
  - you can cache streamed HTML
    - buffer all the HTML chunks of a single request in memory as they come along, then concatenate them together once we’re all done, and store the entire HTML document in the cache using Node.js stream Transform

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

  To make hydration progressive, they tune hydration with the observation that"

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

- Partial rehydration
  - built on top of progressive rehydration
  - individual pieces (components / views / trees) to be progressively rehydrated are analyzed and those with little interactivity or no reactivity are identified. For each of these mostly-static parts, the corresponding JavaScript code is then transformed into inert references and decorative functionality, reducing their client-side footprint to near-zero.