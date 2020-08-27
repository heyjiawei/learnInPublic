# React core

- only includes top-level react APIs necessary to define components
- does not include reconciliation algorithm

# Renderers

- managers how React tree turns into the underlying platform calls

# Reconcilers

- different renderers share some code between them. We call this part of React a “reconciler”.
- When an update such as setState() is scheduled, the reconciler calls render() on components in the tree and mounts, updates, or unmounts them.
- Reconcilers are not packaged separately because they currently have no public API. Instead, they are exclusively used by renderers such as React DOM and React Native.

## General algorithm

- Just to be clear, rerender in this context means calling render for all components, it doesn’t mean React will unmount and remount them.
- When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements.
- Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch.

  - Any components below the root will also get unmounted and have their state destroyed.

- When tearing down a tree, old DOM nodes are destroyed
- Component instances receive componentWillUnmount()
- When building up a new tree, new DOM nodes are inserted into the DOM.
- Component instances receive componentWillMount() and then componentDidMount()

- When comparing two React DOM elements of the same type, React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes.

- When updating component element of the same type

  - React updates the props of the underlying component instance to match the new element
  - calls componentWillReceiveProps() and componentWillUpdate() on the underlying instance.

- By default, when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and generates a mutation whenever there’s a difference.
- React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree.

### Assumptions for reconcillation

Different component types are assumed to generate substantially different trees. React will not attempt to diff them, but rather replace the old tree completely.

## Fiber Reconciler

Its main goals are:

- Ability to split interruptible work in chunks.
- Ability to prioritize, rebase and reuse work in progress.
- Ability to yield back and forth between parents and children to support layout in React.
- Ability to return multiple elements from render().
- Better support for error boundaries.

# Event System

- React implements a layer over native events to smooth out cross-browser differences. Its source code is located in `packages/react-dom/src/events`

# React components, Elements and instances

- you may declare a Button component by creating a class
- When the app is running, you may have several instances of this component on screen, each with its own properties and local state
- An element is a plain object describing a component instance or DOM node and its desired properties.
  - It contains only information about the component type (for example, a Button), its properties (for example, its color), and any child elements inside it.
  - An element is not an actual instance. Rather, it is a way to tell React what you want to see on the screen.
  - You can’t call any methods on the element. It’s just an **immutable description object** with the following fields, `type: (string | ReactClass)` , `props: Object` and `$$typeof: Symbol.for('react.element')`.
    - `$$typeof: Symbol.for('react.element')` is a to circumvent a security bug (??)
  - Element is the solution the React team came up with to solve the problem of how each component instance has to keep references to its DOM node and to the instances of the children components, and create, update, and destroy them when the time is right. (that is, handle too many things at once)

## More about Elements

- looks like so `<App />`
- When an element’s type is a string, it represents a DOM node with _that_ (the string) tag name
- props correspond to its DOM attributes
- because they are just plain objects, React elements are easy to traverse, don’t need to be parsed, and of course they are much lighter than the actual DOM elements

- The type of an element can also be a function or a class corresponding to a React component

So element type can be:

- string (i.e DOM element)
- React component
- function

- Element (or rather, object nesting) is how React uses to track React components and their mapped DOM
  elements
  - this is done recursively by searching the nested object

## Declaring a React Component

These three ways to declare a component are mostly equivalent.

- mostly because when a component is defined as a class, it is a little bit more powerful than a function component. It can store some local state and perform custom logic when the corresponding DOM node is created or destroyed.

```
// 1) As a function of props
const Button = ({ children, color }) => ({
  type: 'button',
  props: {
    className: 'button button-' + color,
    children: {
      type: 'b',
      props: {
        children: children
      }
    }
  }
});

// 2) Using the React.createClass() factory
const Button = React.createClass({
  render() {
    const { children, color } = this.props;
    return {
      type: 'button',
      props: {
        className: 'button button-' + color,
        children: {
          type: 'b',
          props: {
            children: children
          }
        }
      }
    };
  }
});

// 3) As an ES6 class descending from React.Component
class Button extends React.Component {
  render() {
    const { children, color } = this.props;
    return {
      type: 'button',
      props: {
        className: 'button button-' + color,
        children: {
          type: 'b',
          props: {
            children: children
          }
        }
      }
    };
  }
}
```

## Component and component instances

- Only components declared as classes have instances, and you never create them directly (React does that for you)
- `useRef` is how parent component instance access a child component instance
- if you extend from React.Component, it's subclasses would have `isReactComponent` prototype flag

# Mounting Host components

- “Mounting” is a recursive process that creates a DOM or Native tree given the top-level React element
- some terminology here

  - user-defined (“composite”) components `<Button />`
  - platform-specific (“host”) components `<button />`
  - host element: element’s type property is a string

```
function mount(element) {
  var type = element.type;
  if (typeof type === 'function') {
    // User-defined components
    return mountComposite(element);
  } else if (typeof type === 'string') {
    // Platform-specific components
    return mountHost(element);
  }
}
```

- When the reconciler encounters a host element, it lets the renderer take care of mounting it. For example, React DOM would create a DOM node.

# Design principles

- components describe any composable behavior, and this includes rendering, lifecycle, and state
- scheduling
  - Every component returns a description of what needs to be rendered. It is up to React to “unroll” the component at some point in the future and actually apply changes to the UI tree according to the render results of the components recursively.
  - you don’t call that component function but let React call it
  - it means React has the power to delay calling it if necessary. (Pull approach, where computations can be delayed until necessary.)
  - In its current implementation React walks the tree recursively and calls render functions of the whole updated tree during a single tick.
  - However in the future it might start delaying some updates to avoid dropping frames.
