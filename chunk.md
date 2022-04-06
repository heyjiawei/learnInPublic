Implement [chunk](https://docs-lodash.com/v4/chunk/)

```js
function chunk(arr, chunkSize) {
  let result = [],
    chunk = [];
  arr.forEach((element) => {
    chunk.push(element);
    if (chunk.length === chunkSize) {
      result.push(chunk);
      chunk = [];
    }
  });

  if (chunk.length) result.push(chunk);

  return result;
}

let r = chunk(["a", "b", "c", "d"], 2);
console.log(r);
// => [['a', 'b'], ['c', 'd']]

let r2 = chunk(["a", "b", "c", "d"], 3);
console.log(r2);
// => [['a', 'b', 'c'], ['d']]

let r3 = chunk(["a", "b", "c", "d"], 1);
console.log(r3);

let r4 = chunk(["a", "b", "c", "d"], 4);
console.log(r4);

```
