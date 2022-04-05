# GroupBy

Function signature follows that of [MDN groupBy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/groupBy)

Assuming we can use reduce, the implementation would be as follows:

```js
Array.prototype.groupBy = function (cb, thisArg) {
  return this.reduce((acc, curr, index) => {
    const property = cb.call(thisArg, curr, index, this);
    if (!Array.isArray(acc[property])) {
      acc[property] = [];
    }
    acc[property].push(curr);
    return acc;
  }, {});
};

const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 5 },
  { name: "bananas", type: "fruit", quantity: 0 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 5 },
  { name: "fish", type: "meat", quantity: 22 },
];

let result = inventory.groupBy(({ type }) => type);
console.log("result", result);
/* Expect Result to be:
{ 
  vegetables: [
    { name: 'asparagus', type: 'vegetables', quantity: 5 }, 
  ],
  fruit: [
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "cherries", type: "fruit", quantity: 5 }
  ], 
  meat: [
    { name: "goat", type: "meat", quantity: 23 },
    { name: "fish", type: "meat", quantity: 22 }
  ] 
}
*/

let result2 = [6.1, 4.2, 6.3].groupBy(Math.floor);
console.log({ result2 });

// Test passing in thisArg parameter

class Item {
  constructor(name, type, quantity) {
    this.name = name;
    this.type = type;
    this.quantity = quantity;
  }
}

const mixin = {
  hasToRestock() {
    return this.quantity < 20;
  },
};

const itemList = [
  new Item("asparagus", "vegetable", 25),
  new Item("bananas", "fruit", 0),
];

let result3 = itemList.groupBy(function (element) {
  return this.hasToRestock.call(element) ? "Y" : "N";
}, mixin);

console.log("result", result3);
```
