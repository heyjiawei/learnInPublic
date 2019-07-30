#Javascript modules (eloquent Javascript)
The obsolete way of declaring modules: (the revealing module pattern)
- This is a module for going between day names and numbers (as returned by Date’s getDay method). Its interface consists of weekDay.name and weekDay.number, and it hides its local binding names inside the scope of a function expression that is immediately invoked.
```
const weekDay = function() {
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
                 "Thursday", "Friday", "Saturday"];
  return {
    name(number) { return names[number]; },
    number(name) { return names.indexOf(name); }
  };
}(); 		// This is an IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.

console.log(weekDay.name(weekDay.number("Sunday")));
// → Sunday
```

Briefly, an IIFE:
- The first is the anonymous function with lexical scope enclosed within the Grouping Operator (). This prevents accessing variables within the IIFE idiom as well as polluting the global scope.
- The function becomes a function expression which is immediately executed.
- This means that assigning the IIFE to a variable does not store it but its result.
```
var result = (function () { 
    var name = "Barry"; 
    return name; 
})(); 
// Immediately creates the output: 
result; // "Barry"
``` 

What's wrong with declaring modules like the above? 
- If we want to make dependency relations part of the code, we’ll have to take control of loading dependencies. This means we have to handle dependencies manually
- There is no way to programmatically import modules except by being able to execute strings as code. This means using eval() or Function constructor
- Async loading of modules is not possible
- Circular dependencies can be troublesome
Using eval to execute a string in the current scope:
```
const x = 1;
function evalAndReturnX(code) {
  eval(code);
  return x;
}

console.log(evalAndReturnX("var x = 2"));
// → 2
console.log(x);
// → 1
```
Using Function constructor (preferred)
-  takes two arguments: a string containing a comma-separated list of argument names and a string containing the function body. 
-  wraps the code in a function value so that it gets its own scope and won’t do odd things with other scopes.
```
let plusOne = Function("n", "return n + 1;");
console.log(plusOne(4));
// → 5
```

CommonJS modules (Node.js uses this and so does most packages on NPM)
- The main concept in CommonJS modules is a function called require. 
- When you call this with the module name of a dependency, it makes sure the module is loaded and returns its interface.

You put your interface in the object bound to exports.
In format-date.js file
```
const ordinal = require("ordinal");
const {days, months} = require("date-names");

exports.formatDate = function(date, format) {
  return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
    if (tag == "YYYY") return date.getFullYear();
    if (tag == "M") return date.getMonth();
    if (tag == "MMMM") return months[date.getMonth()];
    if (tag == "D") return date.getDate();
    if (tag == "Do") return ordinal(date.getDate());
    if (tag == "dddd") return days[date.getDay()];
  });
};
```
Using format-date.js module:
```
const {formatDate} = require("./format-date");

console.log(formatDate(new Date(2017, 9, 13),
                       "dddd the Do"));
// → Friday the 13th
```
the 'require' function is likely defined as such:
```
require.cache = Object.create(null);

function require(name) {
  if (!(name in require.cache)) {
    let code = readFile(name);
    let module = {exports: {}}; 	// <- module.exports object
    require.cache[name] = module;
    let wrapper = Function("require, exports, module", code); 	// pass require, exports and module as arguments
    wrapper(require, module.exports, module); // passing global require object, module.exports object, and module object
  }
  return require.cache[name].exports;
}
```
- By defining require, exports, and module as parameters for the generated wrapper function (and passing the appropriate values when calling it), the loader makes sure that these bindings are available in the module’s scope.
- The interface of the ordinal package we saw before is not an object but a function. 
- Though the module system will create an empty interface object for you (bound to exports), you can replace that with any value by overwriting module.exports. 
- This is done by many modules to export a single value instead of an interface object.

CommonJS is not enough because:
- require is a normal function call taking any kind of argument, not just a string literal, it can be hard to determine the dependencies of a module without running its code.
- the API is synchronous. In other words, modules are loaded at the moment and in the order they are required inside a source file and this makes them not suitable for client-side use
- browsers require a loader library or transpiling

EMCAScript modules
- JavaScript standard from 2015 introduces its own, different module system
- called ES modules, where ES stands for ECMAScript
- All browsers support ES5. ES5 is the vanilla Javascript we all know. ES5 is EMCAScript 2015
- main concepts of dependencies and interfaces remain the same but with the notation now integrated into the language.
- Instead of calling a function to access a dependency, you use a special import keyword
- the export keyword is used to export things. It may appear in front of a function, class, or binding definition (let, const, or var).















