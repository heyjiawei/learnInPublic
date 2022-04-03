# What is deep cloning?

To explain deep cloning, we first have to understand _shallow clone_.
In JavaScript, a copy of an object will still have its copied references pointing to the same memory space.
```js
const obj = { a: 1 };
const clone = obj;
console.log(obj === clone); // True

const obj2 = { b: 1 };
const clone2 = { b: 1};
console.log(obj2 === clone2); // False
```

A deep clone will attempt to create a copy of the original object, but use new memory space. 
When this happens, any mutations to the original object will not affect the (deep) cloned object.

# Key points of deepClone

A typical quick way to do so is to use `JSON.stringify`. However `JSON.stringify` has a few edge cases:
1. Recursive data structure. `JSON.stringify` will throw when you give it a recursive data structure (a.k.a circular reference)
2. Built-in types. `JSON.stringify` will throw if the value contains other JS built-in types like Map, Set, Date, RegExp or ArrayBuffer.
3. Functions. `JSON.stringify` will quietly discard functions.
4. Prototype chain. `JSON.stringify` will remove the prototype chain for the serializer only pays attention to properties that directly appear on objects being processed.

Therefore, people have to build libraries like _lodash_ or create their own deepClone functions. 
However, creating a generic deepClone function is probably impossible.

Why so?
You will also need to include copying the original object Prototype chain. This is non-trival.
- You can't gurantee that an object's constructor property references the original object's prototype. 
- And you can't gurantee that the constructor's prototype hasn't changed to a different object.

So you can really only clone an object within a restricted context, you can't do it generally.

Reference: 
- https://stackoverflow.com/questions/10151216/javascript-cloned-object-loses-its-prototype-functions#
- https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object/728694#728694

## What about creating a copy by prototypically inheriting from the object?

This uses `Object.create` and it messes up the prototype chain.

# Implementation

When implementing this in an interview setting, you will need to clarify:
- what object types are on the object to be cloned
- if we have to take care of the prototype chain, we will assume that the original object's prototype chain is untouched (will not fall into the edge cases mentioned above)

## Simplified `deepClone`

Clones an object containing arrays, nested objects, circular references

```js
function cloneDeep(obj, cache = new Map()) {
  if (typeof obj !== "object") {
    return obj;
  }
  // Resolve circular references
  else if (cache.has(obj)) {
    return cache.get(obj);
  }

  const clone = Array.isArray(obj) ? [] : {};
  cache.set(obj, clone);

  for (let property in obj) {
    // Resolve nested objects
    clone[property] = cloneDeep(obj[property], cache);
  }

  return clone;
}

/* test cases */
// Check that nested objects are copied
const original = {
  a: { b: { c: 2, e: [1, 2, 3] } },
  f: [{ a: 1 }],
  g: new Map([
    ["foo", 1],
    ["bar", 2],
  ]),
};
const clone = cloneDeep(original);
clone.a.b["d"] = 1;
clone.f.push(2);
console.log(original, clone);

// Check that circular references are copied
const original2 = { a: 1 };
original2.obj = original2;
const clone2 = cloneDeep(original2);
clone2.a = 2;
console.log(original2, clone2);
```

## deepCloning with refined types

If we are going to deep clone an object with all its refined types, then we need to 
- refine typeof Object types into their different categories and assume Object.prototype.toString() is not overwritten
- assume that the object's constructor will provide the object's prototype
- typeof can only be used to distinguish between basic types. It treats special value Null as "object" type and All constructor functions, with the exception of the Function constructor, will always be typeof 'object'
  - typeof is very useful, but it's not as versatile as might be required. For example, `typeof([])` , is 'object', as well as `typeof(new Date())`, `typeof(/abc/)`, etc.

In the following code we use `String.prototype.toString` to get the types.
We make use of `toString` type conversion to get the object type but this assumes that `Symbol.toStringTag` is not used.

This is pointed out in toString MDN article:
> Using toString() in this way is unreliable; objects can change the behavior of Object.prototype.toString() by defining a Symbol.toStringTag property, leading to unexpected results.

Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString

```js
const MAP_TAG = "[object Map]";
const SET_TAG = "[object Set]";
const OBJECT_TAG = "[object Object]";
const ARRAY_TAG = "[object Array]";
const NUMBER_TAG = "[object Number]";
const BOOLEAN_TAG = "[object Boolean]";
const STRING_TAG = "[object String]";
const SYMBOL_TAG = "[object Symbol]";
const FUNCTION_TAG = "[object Function]";
const BIGINT_TAG = "[object BigInt]";
const ERROR_TAG = "[object Error]";
const REG_EXP_TAG = "[object RegExp]";
const DATE_TAG = "[object Date]";
const NULL_TAG = "[object Null]";
const UNDEFINED_TAG = "[object Undefined]";
// You can continue to traverse the types of clones
// const deepCloneableTags = [MAP_TAG, SET_TAG, OBJECT_TAG, ARRAY_TAG];

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function isObject(target) {
  const type = typeof target;
  return target !== null && type === "object";
}

function cloneDeep2(obj, cache = new Map()) {
  if (!isObject(obj)) {
    return obj;
  }
  // Resolve circular references
  else if (cache.has(obj)) {
    return cache.get(obj);
  }

  let clone;
  const typeTag = getType(obj);
  switch (typeTag) {
    case DATE_TAG:
      return new Date(obj);

    case SET_TAG:
      clone = new Set();
      cache.set(obj, clone);

      obj.forEach((value) => {
        clone.add(cloneDeep2(value, cache));
      });
      return clone;

    case MAP_TAG:
      clone = new Map();
      cache.set(obj, clone);

      obj.forEach((value, key) => {
        // Assume that the original map's key is a primitive value
        clone.set(key, cloneDeep2(value, cache));
      });
      return clone;

    case ARRAY_TAG:
      clone = [];
      cache.set(obj, clone);

      for (let property in obj) {
        clone[property] = cloneDeep2(obj[property], cache);
      }
      return clone;

    case OBJECT_TAG:
      clone = getInit(obj);
      cache.set(obj, clone);

      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          clone[attr] = cloneDeep2(obj[attr], cache);
        }
      }
      return clone;

    default:
      throw new Error("type not supported");
      break;
  }
}

/* test cases */
class Base {
  _type = "animal";
  _name = "none";
}

class Cat extends Base {
  constructor(name) {
    super();
    this._name = name;
  }

  meow() {
    console.log("mew");
  }
}

const original3 = new Cat();
const clone3 = cloneDeep2(original3);
// console.log(original3);
// console.log(clone3);
// console.log(original3 === clone3); // False

const original4 = {
  animal: new Cat(),
  m: new Map([["kitty", new Cat("kitty")]]),
  a: [new Cat("diamond")],
};
const clone4 = cloneDeep2(original4);
// console.log(original4);
// console.log(clone4);
// console.log(original4.m.get("kitty") === clone4.m.get("kitty")); // False

const original5 = new Date();
const clone5 = cloneDeep2(original5);
console.log(original5);
console.log(clone5);
console.log(original5 === clone5); // False because of getInit, which creates a new Date object

function hey() {
  console.log("hey");
}
const original6 = {
  a: hey,
};
const clone6 = cloneDeep2(original6);
console.log(original6.a === clone6.a); // True
```

References: 
- https://qdmana.com/2021/09/20210923193624934q.html
