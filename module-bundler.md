- It usually starts with an entry file, and from there it bundles up all of the code needed for that entry file.

## There are two main stages of a bundler:

1. Dependency resolution
2. Packing

### Dependency Resolution

Starting from an entry point, the goal of dependency resolution is to look for all of the dependencies of your code (other pieces of code that it needs to function) and construct a graph (called a dependency graph).

- Think of how to represent a module

Module (or a node)
id: The name and an identifier of the file
filepath: Where the file came from (in the file system)
source: The code in the file
requires: What dependencies that file needs

```ts
type Module = {
  id: number;
  filepath: string;
  dependencies: Array<Dependency>;
  isEntryFile: boolean;
};

type Dependency = {
  module: Module;
  exports: Array<string>;
};
```

### Module Map

- a Map that ties id of the file to the absolute(?) filepath

### How to create a Module Map

Idea from [import maps proposal](https://github.com/WICG/import-maps):

- In the case of relative-URL-like addresses, they are resolved relative to the import map's base URL, i.e. the base URL of the page for inline import maps, and the URL of the import map resource for external import maps.
- We have 2 maps of the same namespace, one without `/` suffix and one with to allow importing main modules and non-main modules.

```js
{
  "imports": {
    "lodash": "/node_modules/lodash-es/lodash.js",
    "lodash/": "/node_modules/lodash-es/"
  }
}

// importing main modules
import _ from 'lodash';
// importing non-main modules
import fp from 'lodash/fp';
```

- for browsers to allow extension-less imports, module map would need to add extensions to module map because browsers do not have the luxury of trying multiple file extensions until it finds a good map. Each file fetch is a call, and every 404 try wastes bandwidth.

```js
{
   "imports": {
     "lodash": "/node_modules/lodash-es/lodash.js",
     "lodash/": "/node_modules/lodash-es/",
     "lodash/fp": "/node_modules/lodash-es/fp.js",
   }
 }

// importing files including extensions
import fp from 'lodash/fp.js';
```

### Resolving a file import

- Node has an algorithm to figure out where the file that you are requiring is
  - npm module named `resolve` which implements this algorithm
- Besides the default Node.js resolving behaviour, webpack provides a lot more customisation options, such as custom extensions, alias, modules folders, etc.

### Packing

// TODO:
