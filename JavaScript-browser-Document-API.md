JavaScript Document API

For the sake of simplicity, syntax examples in this API reference typically refer to nodes as elements, to arrays of nodes as nodeLists (or simply elements), and to attribute nodes simply as attributes.

Document
- When a member returns an object of type document (e.g., the ownerDocument property of an element returns the document to which it belongs), this object is the root document object itself. 

Element
- element refers to an element or a node of type element returned by a member of the DOM API. Rather than saying, for example, that the document.createElement() method returns an object reference to a node, we just say that this method returns the element that has just been created in the DOM. element objects implement the DOM Element interface and also the more basic Node interface, both of which are included together in this reference.

NodeList
- A nodeList is an array of elements, like the kind that is returned by the method document.getElementsByTagName(). Items in a nodeList are accessed by index in either of two ways:
list.item(1)
list[1]
- These two are equivalent. In the first, item() is the single method on the nodeList object. The latter uses the typical array syntax to fetch the second item in the list.

Interface used by DOM objects.
- many objects borrow from several different interfaces. e.g. the table object implements a specialized HTMLTableElement interface. But since it's an HTML element, table also implements the Element interface and the Node interface (since its a node in the tree of nodes that make up the object model for an HTML or XML page)
- Hence when you get a reference to a table object, you routinely use all three of these interfaces interchangablely on the object.

In simple terms, the window object represents something like the browser, and the document object is the root of the document itself. 
Element inherits from the generic Node interface, and together these two interfaces provide many of the methods and properties you use on individual elements. 
These elements may also have specific interfaces for dealing with the kind of data those elements hold, as in the table object example in the previous section.

Content tree
- Any HTML document (or for that matter any SGML document or XML document) is a tree structure. The HTML document and content tree structure are similar, although not identical 
- When Mozilla parses a document, it builds a content tree and then uses it to display the document.

Whitespace (\n) in the DOM
- The presence of whitespace in the DOM can make manipulation of the content tree difficult in unforeseen ways. 
- In Mozilla, all whitespace in the text content of the original document is represented in the DOM (this does not include whitespace within tags).

