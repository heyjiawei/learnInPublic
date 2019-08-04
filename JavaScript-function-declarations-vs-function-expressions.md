JavaScript function declarations vs function expressions

Function expressions:
var isValid = function() {}
var isValid = function checkIfValid() {}

Function declarations:
function isValid() {}

Function expressions:
- The variable the function expression is assigned to will have a`name`property. The name doesn't change if it's assigned to a different variable. If function name is omitted, it will be the variable name (implicit name). If function name is present, it will be the function name (explicit name). This also applies to[arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) (arrows don't have a name so you can only give the variable an implicit name).
````
    var foo = function() {}
    foo.name // "foo"
    
    var foo2 = foo
    foo2.name // "foo"
    
    var bar = function baz() {}
    bar.name // "baz"
    
    console.log(foo === foo2); // true
    console.log(typeof baz); // undefined
    console.log(bar === baz); // false (errors because baz == undefined)
````
- can't be hoisted
````
    console.log(notHoisted) // undefined 
    //even though the variable name is hoisted, the definition isn't. so it's undefined.
    notHoisted(); // TypeError: notHoisted is not a function
    
    var notHoisted = function() {
       console.log('bar');
    };
````


