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

- if your Babel plugin option requires the usage of JavaScript, use a JavaScript configuration file (? ending with .js or .json)
- If you have a configuration that only applies to a single part of your project, use `.babelrc.json`. Otherwise, use `babel.config.json`.

```js
const presets = [ ... ];
const plugins = [ ... ];

if (process.env["ENV"] === "prod") {
  plugins.push(...);
}

module.exports = { presets, plugins };
```

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
