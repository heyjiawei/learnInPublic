## ReactDOM.hydrate source code

- Exported from packages/react-dom/src/client/ReactDOM.js
- hydrate function is in packages/react-dom/src/client/ReactDOMLegacy.js
- calls legacyRenderSubtreeIntoContainer

  ```
  ReactDOM.hydrate(<App />, container, callback);

  legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    true,
    callback,
  );

  legacyRenderSubtreeIntoContainer(
    parentComponent: ?React\$Component<any, any>,
    children: ReactNodeList,
    container: Container,
    forceHydrate: boolean,
    callback: ?Function,
  )

  ```

  - if `container` is not root DOM container, legacyCreateRootFromDOMContainer, createLegacyRoot in packages/react-dom/src/client/ReactDOMRoot.js

    ```
    createLegacyRoot(
      container: Container,
      options?: RootOptions,
    ): RootType

    createLegacyRoot(
      container,
      shouldHydrate
      ? {
        hydrate: true,
      }
      : undefined,
    )

    // LegacyRoot is from packages/react-reconciler/src/ReactRootTags.js
    // export type RootTag = 0 | 1 | 2;
    // export const LegacyRoot = 0;

    new ReactDOMBlockingRoot(container, LegacyRoot, options);
    createRootImpl(container, tag, options)
    ```

    - createContainer from packages/react-reconciler/src/ReactFiberReconciler.js
    - `createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks)` from packages/react-reconciler/src/ReactFiberRoot.js
    - `const uninitializedFiber = createHostRootFiber(tag);`
    - `createFiber(HostRoot, null, null, NoMode); `
      - HostRoot: Root of a host tree. Could be nested inside another node.
    - `initializeUpdateQueue(uninitializedFiber);` from packages/react-reconciler/src/ReactUpdateQueue.js

    - markContainerAsRoot and then return root
    - set callback on instance (?)
    - unbatchedUpdates(), `updateContainer(children, fiberRoot, parentComponent, callback);`
    - return `getPublicRootInstance(fiberRoot)`

  - if container is root container, set callback on instance (?)
    - `updateContainer(children, fiberRoot, parentComponent, callback);`
    - return `getPublicRootInstance(fiberRoot)`

In `unbatchedUpdates` at packages/react-dom/src/client/ReactDOMLegacy.js

- Function is actually in packages/react-reconciler/src/ReactFiberWorkLoop.js
- runs a round in work loop. When done, `flushSyncCallbackQueue()`

In `updateContainer` at packages/react-dom/src/client/ReactDOMLegacy.js

- function is actually in packages/react-reconciler/src/ReactFiberReconciler.js
- does some time computation, assumably for scheduling.
- `getContextForSubtree(parentComponent)`
- `createUpdate(expirationTime, suspenseConfig)`
  - sets it as the next update. returns an Update object.
  - sets the update object payload property to the React element
- `scheduleWork(current, expirationTime)`

## ReactDOMServer

packages/react-dom/src/server/ReactDOMServerNode.js
