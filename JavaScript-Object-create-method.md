JavaScript Object.create()
- The Object.create() method creates a new object, using an existing object as the prototype of the newly created object.
- This means that it creates a new object with the same prototype properties.

Object.create(proto, [optional propertiesObject])
- The prototype object is passed in as the first argument. i.e. Object.create(Shape.prototype);
- The second object (which is optional) needs to be an object property descriptor. This object's enumerable own properties (These properties correspond to the second argument of Object.defineProperties()), along with its property descriptors, will be added to the newly-created object.
```
var o;
o = {};
// is equivalent to:
o = Object.create(Object.prototype);
```
Example where we create an object with a couple of sample properties.
```
(Note that the second parameter
// maps keys to *property descriptors*.)
o = Object.create(Object.prototype, {
  // foo is a regular 'value property'
  foo: {
    writable: true,
    configurable: true,
    value: 'hello'
  },
  // bar is a getter-and-setter (accessor) property
  bar: {
    configurable: false,
    get: function() { return 10; },
    set: function(value) {
      console.log('Setting `o.bar` to', value);
    }
/* with ES2015 Accessors our code can look like this
    get() { return 10; },
    set(value) {
      console.log('Setting `o.bar` to', value);
    } */
  }
});
```
