JavaScript expression and operators

Unary operator: requires a single operand, either before or after the operator.
e.g. x++, ++x
If used as a prefix operator (++x), returns the value of its operand after adding one; if used as a postfix operator (x++), returns the value of its operand before adding one.

binary operator: requires 2 operands, one before the operator and one after the operator
e.g. 3+4

ternary (Conditional) operator: takes 3 operands. The operator can have one of 2 values based on a condition
condition ? val1 : val2

Short-circuit evaluation:
- As logical expressions are evaluated left to right, they are tested for possible "short-circuit" 
false && anything is short-circuit evaluated to false.
true || anything is short-circuit evaluated to true


delete operator:
- deletes an object, an object's property, or an element at a specified index in an array
```
delete objectName;
delete objectName.property;
delete objectName[index];
delete property; // legal only within a with statement
```
- You can use the delete operator to delete variables declared implicitly but not those declared with the var statement. You also cannot delete predefined properties
- if delete operator succeeds, it sets the property to undefined and returns true. Otherwise, it would return false
- when you delete an array element, the array length is not affected. The deleted element becomes undefined, but is still addressable
```
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
delete trees[3];
if (3 in trees) {
  // this does not get executed
}
```
- If you want an array element to exist but have an undefined value, use the undefined keyword instead of the delete operator. 
```
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
trees[3] = undefined;
if (3 in trees) {
  // this gets executed
}
```

typeof operator:
typeof operand

- The typeof operator returns a string indicating the type of the unevaluated operand. 
The possible return values:
type => result
Undefined => "undefined"
Null => "object"
Boolean => "boolean"
Number => "number"
String => "string"
Symbol => "symbol"
function obj => "function"
any other object => "object"

in operator:
- returns true if the specified property is in the specified object
```
// Arrays
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
0 in trees;        // returns true
3 in trees;        // returns true
6 in trees;        // returns false
'bay' in trees;    // returns false (you must specify the index number,
                   // not the value at that index)
'length' in trees; // returns true (length is an Array property)

// built-in objects
'PI' in Math;          // returns true
var myString = new String('coral');
'length' in myString;  // returns true

// Custom objects
var mycar = { make: 'Honda', model: 'Accord', year: 1998 };
'make' in mycar;  // returns true
'model' in mycar; // returns true
```

instanceof operator:
objectName instanceof objectType
- returns true if the specified object is of the specified object type (e.g. a Date object, an array)
- use instanceof if you need to confirm the type of an object at runtime
- This is because it tests whether the prototype property of a constructor appears anywhere in the prototype chain of an object
	- Hence, the value of an instanceof test can change based on changes to the prototype property of constructors
	- It can also be changed via Object.setPrototypeOf
