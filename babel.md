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
