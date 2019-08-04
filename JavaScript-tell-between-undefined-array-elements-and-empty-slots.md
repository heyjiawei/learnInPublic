JavaScript tell between undefined array elements and empty slots
Array [ null, undefined, <1 empty slot> ]

You can use the in operator to check if the array has a key. It will return false for empty slots, but true for slots with values, including the value undefined
```
var arr = new Array(3);
arr[0] = null;
arr[1] = undefined;

for(let i = 0; i < arr.length; i++) {
    console.log(i, i in arr)
}
// would return:
//0 true
//1 true
//2 false
```

Note that you can't distinguish between empty slots and slots past the end of the array using that, but if you know the length of the array, then you already know that 3 isn't part of it, so you don't need to test 3 in arr.

You can also filter out the empty slots like this:
```
arr = arr.filter( function ( _, i ) { return i in arr } );
```

You can also use Array.forEach(). This method omits sparse elements
```
var arr = new Array(3);
arr[0] = null;
arr[1] = undefined;

arr.forEach((val, index, a) => {
	console.log(index, index in a)
})
// returns
//0 true
//1 true
```

The iterator will translate sparse elements to undefined.
Hence, ES6 array methods values and keys, and spread syntax will translate holes into undefined

All in all,
1. A trailing comma in array syntax is simply ignored.
[ 1, 2, 3, ] // no hole at the end, just a regular trailing comma

2. Empty values between commas create holes and thus sparse arrays - these are known as: holes, empty or an elision (apparently)
[ 1, , 2 ] // hole at index(1) aka empty

3. Detecting a hole is done using array.hasOwnProperty(index)
[ 1, , 2 ].hasOwnProperty(1) // false: index(1) does not exist, thus a hole

4. Iterating methods, such as map, forEach, every, etc won't call your callback for the hole
5. map will return a new array including the holes
```
[ 1, , 2 ].map(x => x * x) // [ 1, <empty>, 4 ]
```

6. filter will return a new array excluding the holes
[ 1, , 2 ].filter(x => true) // [ 1, 2 ]

7. keys and values return iterator functions that do iterate over hole (ie. includes them in a for key of array.keys())

8. Array spread [...array] will transform holes into undefined (which will also increase memory and affect performance)
```
[...[ 'a', , 'b' ]] // ['a', undefined, 'b']
Large sparse array creation is fast - much faster than Array.from.

const length = 10000000; // 10 million
new Array(length); // quick
Array.from({ length }) // less quick
```
