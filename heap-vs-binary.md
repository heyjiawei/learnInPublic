Heap vs Binary Tree (BST)
BST:
For each node having a value ‘x’, left subtree must have a values ‘less than or equal to x’, and the right subtrees must have values ‘greater than x’.

It can be either complete, partially complete or completely skew. There are no restrictions on the shape.

Heap:
Heap on the other hand follows just one property, For Min-heap, all the elements in the child (both left and right) should be greater than the root value.

And for Max-heap, all the elements in the child (both left and right) should be less than the root value.

A heap is a complete tree ( only last level may not be complete ). An example of min heap.

Time complexity difference:
Operation 			BST   														Min Heap
Insert					O(n)  (The tree can be skewed)					O(log n)
Delete				   O(n)  (The tree can be skewed)			  	   O(log n)
Find Min 			 O(n) 															O(1)
Create				  O(n^2) (when inserting an sorted array)  	  O(n)

Heap code in JS:
root element = index 0

from parent to left child = i * 2 + 1 => (i << 1) + 1
from parent to right child = i * 2 + 2 
= 2 * (i + 1)
= (i+ 1) << 1
for finding parent, we use i+1 to ensure the number of bits of left and right leaves are equal.
e.g. 7 => 111
7 + 1 = 8 => 1000
This will have the same number of bits as its partner leave 8 (8 + 1 = 9 => 1001)
when the number of bits are equal, >>> will result in an equal number of bits and -1 will give the same results.

Why use >>> instead of >> ? 
- The indexes will always be positive. Hence, we should use >>>
```
const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}
```
