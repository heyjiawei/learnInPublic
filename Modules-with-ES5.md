#Modules with ES5
ES5 doesn’t support modules. So, developers have come up with a lot of workarounds to support modularity and below are some of them.

Singleton Pattern
-  takes advantage of what we called immediately invoked function expressions, commonly known as an IIFE
-  Javascript has function level scope and variables and functions declared within the function expression are not available in the global scope
-  At the global scope, we can choose to give the function expression a name, or leave it as an anonymous function
```
var scoreboard = function() {
    var message = 'Welcome to the game!';
    function printMessage() {
         console.log(message);
    }
    function updateMessage(newMessage) {
        message = newMessage;
    }
    //return an object that represents our new module
    return {
         showMessage: printMessage,
         updateMessage: updateMessage
    }
}(); //← This is called a immediately invoked function definition,   
     // or IIFE

scoreboard.printMessage();
scoreboard.updateMessage(“Let the game begin!”);
```
Revealing module pattern (similar to IIFE)
```
var singleton = function(){

  // Inner logic
  function sayHello(){
    console.log('Hello');
  }

  // Expose API
  return {
    sayHello: sayHello
  }
}()
```
We can now access the module's API through the variable:
```
// Access module functionality
singleton.sayHello();  
// => Hello
```

Constructor pattern
- this function expression is no longer immediately invoked and instead must be explicitly invoked when you wish to use the variable or module in our case.
```
var Scoreboard = function() {
    console.log('Creating a new scoreboard...');
    var message = 'Welcome to the game!';
    function printMessage() {
        console.log(message);
    }
    return {
        printMessage: printMessage
    }
}; 

var myScoreboard = new Scoreboard();
myScoreboard.printMessage();
```

In the examples above, 
- Functions with names adds one value to the global scope (anonymous functions, thus, do not add a value to the global scope)
- there is no system for dependency management. This means we cannot specify that a module called 'game' will depend on the scopeboard module
