- `@babel/cli` runs babel from the terminal
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
