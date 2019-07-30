Enumerable properties JavaScript
- Enumerable properties are those properties whose internal enumerable flag is set to true
	- which is the default for properties created via simple assignment or via a property initializer 
	- properties defined via Object.defineProperty and such by default have enumerable set to false

- Enumerable properties show up in 'for...in' loops unless the property's key is a Symbol

Ownership of an object property:
- Ownership of properties is determined by whether the property belongs to the object directly and not to its prototype chain