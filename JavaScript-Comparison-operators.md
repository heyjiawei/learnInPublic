JavaScript Comparison operators
- JavaScript has both strict type (===) and type-converting (==) comparisons.
- Strict type is only true if the operands are of the same type and contents match
- abstract comparison or type-converting comparison (==) converts the operands to the same type before making the comparison
- For relational abstract comparisons (<=), operands are first converted to primitive, then to the same type, then compared
- Strings are compared based on standard lexicographical ordering using unicode values.
-  NaN is not equal to anything, including NaN. 
-  Positive and negative zeros are equal to one another.
-  Two Boolean operands are strictly equal if both are true or both are false.
- Two distinct objects are never equal for either strict or abstract comparisons. An expression comparing Objects is only true if the operands reference the same Object.
- Null and Undefined Types are strictly equal to themselves and abstractly equal to each other.
	- null === null
	- null == undefined
- The === operator (and the == operator as well) treats the number values -0 and +0 as equal and treats Number.NaN as not equal to NaN.

Equality (==)
- The equality operator converts the operands if they are not of the same type, then applies strict comparison.
- If both operands are objects, it compares internal references. 
	- Both objects are said to be equal when operands refer to the same object in memory
```
var object1 = {'key': 'value'}, object2 = {'key': 'value'};
object1 == object2 //false
```
String comparison can be forced by: "" + a == "" + b.
Numeric comparison can be forced by: +a == +b.
Boolean comparison can be forced by: !a == !b.

The equality operator is not always transitive. 
For example, there might be two distinct String objects, each representing the same String value; each String object would be considered equal to the String value by the == operator, but the two String objects would not be equal to each other. For Example:

new String("a") == "a" and "a" == new String("a")are both true.
new String("a") == new String("a") is false.

 Note: String objects are Type Object, not String! String objects are rarely used.
 ```
 // true as both operands are type String (i.e. string primitives):
'foo' === 'foo'

var a = new String('foo');
var b = new String('foo');

// false as a and b are type Object and reference different objects
a == b 

// false as a and b are type Object and reference different objects
a === b 

// true as a and 'foo' are of different type and, the Object (a) 
// is converted to String 'foo' before comparison
a == 'foo'
```

Order of conversion:
- when comparing number and string, the string is converted to a Number type value 
- when comparing with a boolean, the boolean operand is converted to 1 if true, +0 if false
- If an object is compared with a number or string, JavaScript attempts to return the default value for the object. Operators attempt to convert the object to a primitive value, a String or Number value, using the valueOf and toString methods of the objects. If this attempt to convert the object fails, a runtime error is generated.

Note that an object is converted into a primitive if, and only if, its comparand is a primitive. If both operands are objects, they're compared as objects, and the equality test is true only if both refer the same object.

Identity/strict equality (===)
- The identity operator returns true if the operands are strictly equal (see above) with no type conversion.
- if both values are numbers, they're considered equal if they're both not NaN and are the same value
- If both operands are objects, it compares internal references. 
	- Both objects are said to be equal when operands refer to the same object in memory
```
var object1 = {'key': 'value'}, object2 = {'key': 'value'};
object1 === object2 //false
```

Use strict equality operators if the operands must be of a specific type as well as value or if the exact type of the operands is important. 
Otherwise, use the standard equality operators, which allow you to compare the identity of two operands even if they are not of the same type.

Relational operators (>, >=, <, <=)
- Each of these operators will call the valueOf() function on each operand before a comparison is made.

Object.is()
- determines whether 2 values have the same value.

Two values are the same if one of the following holds:
both undefined
both null
both true or both false
both strings of the same length with the same characters in the same order
both the same object
both numbers and
- both +0
- both -0
- both NaN
- or both non-zero and both not NaN and both have the same value

This is also not the same as being equal according to the === operator. The === operator (and the == operator as well) treats the number values -0 and +0 as equal and treats Number.NaN as not equal to NaN.

Which to use?
The choice of which operation to use depends on what sort of comparison you are looking to perform. Briefly:

- double equals (==) will perform a type conversion when comparing two things, and will handle NaN, -0, and +0 specially to conform to IEEE 754 (so NaN != NaN, and -0 == +0);
- triple equals (===) will do the same comparison (including the special handling for NaN, -0, and +0) but without type conversion, by simply always returning false if the types differ;
- Object.is does no type conversion and no special handling for NaN, -0, and +0 (giving it the same behavior as === except on those special numeric values).

Do note that the distinction between these all have to do with their handling of primitives; none of them compares whether the parameters are conceptually similar in structure. For any non-primitive objects x and y which have the same structure but are distinct objects themselves, all of the above forms will evaluate to false.

