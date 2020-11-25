- ES6 modules `import` does asynchronous loading. It has static code analysis and dependency resolution phase
- CommonJS `require` does synchronous loading. Its following statements must wait for `require` to execute before it can be executed.
- CommonJS module cannot load ES6 modules
  - `require()` cannot load ES6 modules because ES6 modules are loaded asynchronously.
  - ES6 module `import` can load CommonJS modules but the CJS module would be loaded together. It cannot load just a specific single exported object.
  - This is because ES6 modules need to support static code analysis. `module.exports` is an object and thus, cannot be statically analyzed, so it can only be loaded as a whole.

```js
// This works
import MainPackage from "commonjs-package";

// This doesn't
import { someMethod } from "commonjs-package";

// Get method this way
import packageMain from "commonjs-package";
const { method } = packageMain;
```

# Support both formats of module at the same time

For a module to support both CommonJS and ES6 formats,

1. You can specify the respective loading entry of the 2 format modules in the `exports` field of the `package.json` file. The loading module will automatically switch to a different entry file

```json
"exports"：{
    "require": "./index.js"，
    "import": "./esm/wrapper.js"
}
```

2. If the original module is in ES6 format, you need to give an overall output interface - `export default obj`. This will allow CommonJS to load the module.

3. If the original module is in CommonJS, a packaging layer can be added

```js
import cjsModule from "../index.js"; // index.js is CommonJS
export const foo = cjsModule.foo; // exports the named interface as needed
```
