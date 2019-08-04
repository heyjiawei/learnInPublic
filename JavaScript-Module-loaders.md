#JavaScript Module loaders
A module loader interprets and loads a module written in a certain module format.

A module loader runs at runtime:
- you load the module loader in the browser
- you tell the module loader which main app file to load
- the module loader downloads and interprets the main app file
- the module loader downloads files as needed

A few examples of popular module loaders are:
- RequireJS: loader for modules in AMD format
- SystemJS: loader for modules in AMD, CommonJS, UMD or System.register format

Module Bundlers
A module bundler replaces a module loader.
But, in contrast to a module loader, a module bundler runs at build time:
- you run the module bundler to generate a bundle file at build time (e.g. bundle.js)
- you load the bundle in the browser

If you open the network tab in your browser's developer console, you will see that only 1 file is loaded. No module loader is needed in the browser. All code is included in the bundle.

Examples of popular module bundlers are:
- Browserify: bundler for CommonJS modules
- Webpack: bundler for AMD, CommonJS, ES6 modules

