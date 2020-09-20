- `@babel/cli` runs babel from the terminal.
  - when passing options via `@babel/cli`, you need to kebab-case the names
  ```shell
  npx babel --root-mode upward file.js # equivalent of passing the rootMode config option
  ```
- `@babel/core` contains the core functionality of Babel
  preset = pre-determined set of plugins

- you can create your own presets too; your own combination of plugins
  - `@babel/preset-env` package
  - add in cli with `--presets=@babel/env`

config target property contains browsers and their versions

- will only load transform plugins not supported by these browser version; "polyfill" additional features that haven't arrived in these browsers.

- `core-js/stable` package and `regenerator-runtime/runtime` package (for generator functions) replace `@babel/polyfill`

  - `@babel/polyfill` includes core-js and custom regenerator runtime

- polyfills add to global scope and native prototypes
- add `@babel/plugin-transform-runtime` if you don't want to pollute the global space too much
- if you know what polyfills you need, you can require them directly from core-js
- `@babel/env` `useBuiltIns: usage` property will only include polyfills that you use.

- if your Babel plugin option requires the usage of JavaScript, use a JavaScript configuration file (.js extension) that returns the Babel JSON object.

  - the downside is that JS configs are less statically analyzable, and therefore have negative effects on cacheability, linting, IDE autocomplete, etc. Since babel.config.json and .babelrc.json are static JSON files, it allows other tools that use Babel such as bundlers to cache the results of Babel safely, which can be a huge build performance win.

- JavaScript configuration files can either export an object, or a function that when called will return the generated configuration. Function-returning configs are given a few special powers because they can access an API exposed by Babel itself.

- If you have a configuration that only applies to a single part of your project, use `.babelrc.json`. Otherwise, use `babel.config.json`.

  - `.babelrc.json` is a file-relative config

    - Babel will search up the directory structure starting from the filename being compiled.
      - The filename associated with the code currently being compiled, if there is one. The filename is optional, but not all of Babel's functionality is available when the filename is unknown, because a subset of options rely on the filename for their functionality.
    - File-relative configurations are also merged over top of project-wide config values, making them potentially useful for specific overrides, though that can also be accomplished through `overrides`.
    - Searching will stop once a directory containing a `package.json` is found, so a relative config only applies within a single package; **files only apply to files within their own package**
    - The "filename" being compiled must be inside of "babelrcRoots" packages, or else searching will be skipped entirely; **files in packages that aren't Babel's 'root' are ignored unless you opt in with "babelrcRoots".**

    This means that for this file structure, compiling the packages/mod/index.js file will not load packages/mod/.babelrc.json because this .babelrc.json is within a sub-package, not the root package.

    ```
    package.json
    babel.config.js
    packages/
      mod/
        package.json
        .babelrc.json
        index.js
    ```

    To enable processing of that .babelrc.json, you will want to use the "babelrcRoots" option from inside your babel.config.json file to do

    ```js
    // in .babelrc.json
    babelrcRoots: [
      ".",          // Keep the root as a root
      "packages/*", // Also consider monorepo packages "root" and load their .babelrc.json files.
    ],
    ```

    - if you are running your Babel compilation process from within a subpackage, you need to tell Babel where to look for the config. There are a few ways to do that, but the recommended way is the `rootMode` option with `upward`, which will make Babel search from the working directory upward looking for your babel.config.json file, and will use its location as the "root" value.

  - `babel.config.json` is project-wide config
    - Babel has a concept of a "root" directory, which defaults to the current working directory.
    - For project-wide configuration, Babel will automatically search for a babel.config.json file, or an equivalent one using the supported extensions, in this root directory.
    - Alternatively, users can use an explicit `configFile` value to override the default config file search behavior.
    - Project-wide configs can also be disabled by setting `configFile` to false.

# Customizing Babel based on environment

```js
const presets = [ ... ];
const plugins = [ ... ];

if (process.env["ENV"] === "prod") {
  plugins.push(...);
}

module.exports = { presets, plugins };
```

Or in your configuration file:

```json
{
    "presets": ["es2015"],
    "plugins": [],
    "env": {
      "development": {
        "plugins": [...]
      },
      "production": {
        "plugins": [...]
      }
    }
  }
```

- The current environment will use `process.env.BABEL_ENV`. When `BABEL_ENV` is not available, it will fallback to `NODE_ENV`, and if that is not available it will default to "development".

- You can also specify Babel config on `package.json` using `babel` key:
- **Plugins run before Presets**

```js
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": { // <---
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}
```

- Babel can be configured using any file extension natively supported by Node.js
  - you can use .json, .js, .cjs and .mjs, both for babel.config.json and .babelrc.json files.
  - babel.config.cjs and .babelrc.cjs allow you to define your configuration as CommonJS, using `module.exports`.
  - babel.config.mjs and .babelrc.mjs use native ECMAScript modules. They are supported by Node.js 13.2+ (or older versions via the `--experimental-modules` flag). Please remember that native ECMAScript modules are asynchronous (that's why import() always returns a promise!): for this reason, .mjs config files will throw when calling Babel synchronously.
  - babel.config.js and .babelrc.js behave like the .mjs equivalents when your package.json file contains the "type": "module" option, otherwise they are exactly the same as the .cjs files.

> One helpful way to test if your config is being detected is to place a `console.log()` call inside of it if it is a babel.config.json JavaScript file: the log will execute the first time Babel loads it.

# Config properties

```json
{
  "presets": [...],
  "plugins": [...]
}
```

## Advance usage

- you can tell Babel to print effective configs on a given input path by using the constant `BABEL_SHOW_CONFIG_FOR`. `BABEL_SHOW_CONFIG_FOR` accepts both absolute and relative file paths. If it is a relative path, it will be resolved from `cwd`
  - Once Babel processes the input file specified by BABEL_SHOW_CONFIG_FOR, Babel will print effective configs to the console
  - Babel will print effective config sources ordered by ascending priority. That means the the printed configs at the bottom have the highest priority and will override the configs of those above it.

```shell
BABEL_SHOW_CONFIG_FOR=<path-to-file>.<file-extension> npm start
```

### Merging Babel config

- Babel applies `Object.assign` on options except for `plugins` and `presets`
- `plugins` and `presets` properties are merged with `Array.concat`

# Plugin category

- Transform plugins apply transformations to your code. It also enables the corresponding syntax plugin so you don't have to specify both
- Syntax plugins only allow Babel to parse specific types of syntax. No transformation will be done.
- Plugin runs before presets
- Plugins run in the order of first to last (from left to right of the provided array)
- **Preset is ran from last to first (from right to left)**

## Using plugins

- by plugin name. Name refers to package name. Note that your plugin must be installed first.

```json
{
  "plugins": ["babel-plugin-myPlugin"]
}
```

- by absolute/relative path to your plugin

```json
{
  "plugins": ["./node_modules/asdf/plugin"]
}
```

- if the package name is prefixed with `babel-plugin-` then you can eliminate the prefix.

```json
{
  "plugins": [
    "myPlugin",
    "babel-plugin-myPlugin", // equivalent
    "@org/babel-plugin-name",
    "@org/name" // equivalent
  ]
}
```

## Passing options to plugins and presets

- you pass options by wrapping the name and an options object in an array. To specify an option, pass an object with the keys as the option names. The same goes for scoped packages.

```js
{
  "presets": [
    "myPreset",
    "babel-preset-myPreset", // equivalent
    "@org/babel-preset-name",
    "@org/name" // equivalent
  ]
}
```

```json
{
  "plugins": ["pluginA", ["pluginA", { "optionName": "optionValue" }]]
}
```

# Presets

- like plugins, you have to install the preset before you use them.
- If the package name is prefixed with `babel-plugin-` then you can eliminate the prefix.

- Stage-X presets are changes to the language that haven't been approved to be part of a release of JavaScript
- The TC39 categorizes proposals into the following stages:

- Stage 0 - Strawman: just an idea, possible Babel plugin.
- Stage 1 - Proposal: this is worth working on.
- Stage 2 - Draft: initial spec.
- Stage 3 - Candidate: complete spec and initial browser implementations.
- Stage 4 - Finished: will be added to the next yearly release.

- These proposals are subject to change so use with extreme caution, especially those in pre-stage-3

- Your presets can contain other presets, as well as plugins with options

```js
module.exports = () => ({
  presets: [require("@babel/preset-env")],
  plugins: [
    [require("@babel/plugin-proposal-class-properties"), { loose: true }],
    require("@babel/plugin-proposal-object-rest-spread"),
  ],
});
```

# Options

- options are primarily used by tools that wrap around Babel, or people calling `babel.transform` directly
- users of Babel's integrations like `babel-loader` or `@babel/register` are unlikely to use them -`cwd`: node `process.cwd()`; the working directory that all paths in options will resolve relative to.
- if you need to create a persistent representation of a plugin or preset, you should use `babel.createConfigItem()`
- `false` indicates that an entry is entirely disabled. This can be useful in contexts where ordering is important, but a separate condition is needed to decide if something is enabled.

```js
plugins: [
  'apple',
  ['orange', false],
  'watermelon',
],
overrides: [{ // would enable the orange plugin for files in src
              // and orange plugin would still execute between apple and watermelon
  test: "./src",
  plugins: [
    'orange',
  ]
}]
```

# Merging config options

- `extends` Configs may "extend" other configuration files. Config fields in the current config will be merged on top (overwrite) the extended file's configuration.
- Not allowed inside of presets
- `env` Allows for entire nested configuration options that will only be enabled if the envKey matches the envName option.
- `env[envKey]` options will be merged on top (overwrite) of the options specified in the root object.
- May not be nested inside of another `env` block.
- `overrides` allows users to provide an array of options that will be merged into the current configuration one at a time.
- `ignore` If any of the patterns match, Babel will immediately stop all processing of the current build / disable Babel compilation of files
  - Not allowed inside of presets
  - While that has its uses, it is also worth considering the "exclude" option as a less aggressive alternative.
- `exclude` will pattern match with files. The matched file(s) current configuration object will be considered inactive and ignored during config processing.

## When merging Plugin/Preset

- The `overrides` item will be merged on top of the options declared on top-level `plugins` property.

```js
plugins: [
  './other',
  ['./plug', { thing: true, field1: true }] // <-- top-level "plugins" property
],
overrides: [{
  plugins: [
    ['./plug', { thing: false, field2: true }],
  ]
}]
// will result in the following config:
plugins: [
  './other',
  ['./plug', { thing: false, field2: true }],
],
```

- Merging is based on plugin name so using the same plugin name twice is considered an error

```js
plugins: ["./plug", "./plug"];
// is identical to
plugins: ["./plug"];
```

```js
plugins: [
  ["./plug", { one: true }],
  ["./plug", { two: true }],
];
// is identical to
plugins: [["./plug", { two: true }]];
```

- To instantiate 2 separate instances of a plugin, assign each one a unique name

```js
plugins: [
  ["./plug", { one: true }, "first-instance-name"],
  ["./plug", { two: true }, "second-instance-name"],
];
```

## Source Map options

- `inputSourceMap` will attempt to load an input source map from the file itself, if it contains a `//# sourceMappingURL=...` comment.
  - If no map is found, or the map fails to load and parse, it will be silently discarded.
  - defaults to true
  - If an object is provided, it will be treated as the source map object itself.
- `sourceMaps` generates a source map for the code and include it in the result object when set to `true`. will write the map to a .map file on disk
  - `inline` will generate a source map and append it as a data URL to the end of the code, but not include it in the result object. will write the file directly, so it will have a data: containing the map
  - `both` is the same as `inline`, but will include the map in the result object. will write the file with a data: URL and also a .map.

## Miscellaneous options

- `sourceType` hints to Babel which grammar the file should be parsed in.
  - "module" - Parse the file using the ECMAScript Module grammar. Files are automatically - strict, and import/export statements are allowed. This is the default
  - "script" - Parse the file using the ECMAScript Script grammar. No import/export - statements allowed, and files are not in strict mode.
  - "unambiguous" - Consider the file a "module" if import/export statements are present, or else consider it a "script".
- This option is important because the type of the current file affects both parsing of input files. Also, certain transforms that may wish to add import/require usage to the current file. (They rely on the type of the current document to decide whether to insert an import declaration, or a `require()` call.)
  - Setting the correct sourceType can be important because having the wrong type can lead to cases where Babel would insert import statements into files that are meant to be CommonJS files.
  - This can be particularly important in projects where compilation of node_modules dependencies is being performed, because inserting an import statements can cause Webpack and other tooling to see a file as an ES module, breaking what would otherwise be a functional CommonJS file.
- Babel defaults to treating files are ES modules so generally these plugins/presets will insert import statements

# @babel/plugin-transform-runtime

- Basically, you can use built-ins such as Promise, Set, Symbol, etc.- , as well use all the Babel features that require a polyfill seamlessly, without global pollution, - making it extremely suitable for libraries.
- A secondary feature of this plugin is reduce code duplication. Babel uses very small helpers for common functions such as `_extend`. By default this will be added to every file that requires it. The plugin will have all helpers reference `@babel/runtime` module to avoid duplication across your compiled output. The runtime will be compiled into your build

- Make sure you include @babel/runtime as a dependency. `$ npm install --save babel-runtime`

The transform-runtime transformer plugin does three things:

- Automatically requires `@babel/runtime/regenerator` when you use generators/async functions (toggleable with the regenerator option).
- Can use core-js for helpers if necessary instead of assuming it will be polyfilled by the user - (toggleable with the corejs option)
- Automatically removes the inline Babel helpers and uses the module `@babel/runtime/helpers` instead - (toggleable with the helpers option).

# @babel/register

- you can use @babel/cli watch mode to compile a file every time you changed it
- another way is to hook Babel onto `require`. This way of using Babel is called the require hook

> Note that this is not meant for production use. It's considered bad practice to deploy code that gets compiled this way. It is far better to compile ahead of time before deploying. However this works quite well for build scripts or other things that you run locally.

- require hook will bind itself to node's `require` and automatically compile files on the fly.

First install babel-register.

```shell
$ npm install --save-dev babel-register
```

Next, create a register.js file in the project and write the following code:

```js
require("babel-register");
require("./index.js");
```

What this does is registers Babel in Node's module system and begins compiling every file that is require'd.

Now, instead of running node index.js we can use register.js instead.

```js
$ node register.js
```

> Note: You can't register Babel in the same file that you want to compile. As node is executing the file before Babel has a chance to compile it.

```js
require("babel-register");
// not compiled:
console.log("Hello world!");
```

- it ignores `node_modules` by default.
  - You can override this by passing an ignore regex via:
  ```js
  require("@babel/register")({
    // This will override `node_modules` ignoring - you can alternatively pass
    // an array of strings to be explicitly matched or a regex / glob
    ignore: [],
  });
  ```
- By default `@babel/node cli` and `@babel/register` will save to a json cache in your temporary directory.
  - to specify a different cache location, set `BABEL_CACHE_PATH`
  - to disable the cache, set `BABEL_DISABLE_CACHE=1`
- this module explicitly disallows re-entrant compilation, e.g. Babel's own compilation logic explicitly cannot trigger further compilation of any other files on the fly.
- `@babel/register` does not support compiling native Node.js ES modules on the fly, since currently there is no stable API for intercepting ES modules loading.

# Loose mode

Many plugins in Babel have two modes:

- A normal mode follows the semantics of ECMAScript 6 as closely as possible.
- A loose mode produces simpler ES5 code.

Normally, it is recommended to not use loose mode. The pros and cons are:

- Pros: The generated code is potentially faster and more compatible with older engines. It also tends to be cleaner, more “ES5-style”.
- Con: You risk getting problems later on, when you switch from transpiled ES6 to native ES6. That is rarely a risk worth taking.
