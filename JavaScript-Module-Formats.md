#JavaScript Module Formats

Some of the most widely adapted and well known formats are:

1. Asynchronous Module Definition (AMD)
2. CommonJS
3. Universal Module Definition (UMD)
4. System.register
5. ES6 module format

The AMD format is used in browsers and uses a define function to define modules:
```
//Calling define with a dependency array and a factory function
define(['dep1', 'dep2'], function (dep1, dep2) {

    //Define the module value by returning a value.
    return function () {};
});
```

The CommonJS format is used in Node.js and uses require and module.exports to define dependencies and modules:
```
var dep1 = require('./dep1');  
var dep2 = require('./dep2');

module.exports = function(){  
  // ...
}
```
The UMD format can be used in both browser and node.js
```
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
      define(['b'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('b'));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.b);
  }
}(this, function (b) {
  //use b in some fashion.

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {};
}));
```

The System.register format was designed to support the ES6 module syntax in ES5:
```
import { p as q } from './dep';

var s = 'local';

export function func() {  
  return q;
}

export class C {  
}
```