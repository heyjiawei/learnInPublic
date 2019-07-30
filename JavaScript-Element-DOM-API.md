JavaScript Element DOM API
- Element is the most general base class from which all objects in a Document inherit. 
- It only has methods and properties common to all kinds of elements. 
- More specific classes inherit from Element. For example, the HTMLElement interface is the base interface for HTML elements,

Element.classList
- If the class attribute was not set or is empty elementClasses.length returns 0. 
- returns a live DOMTokenList collection of the class attributes of the element.
- it has a list of methods like add, remove, item, toggle, contains and replace

Element.className
- Is a DOMString representing the class of the element.
- Is a string variable representing the class or space-separated classes of the current element.
- gets and sets the value of the class attribute of the specified element.

Element.clientHeight
- The Element.clientHeight read-only property is zero for elements with no CSS or inline layout boxes; otherwise, it's the inner height of an element in pixels. 
- It includes padding but excludes borders, margins, and horizontal scrollbars (if present).
- clientHeight can be calculated as: CSS height + CSS padding - height of horizontal scrollbar (if present).
- Note: This property will round the value to an integer. If you need a fractional value, use element.getBoundingClientRect().

NonDocumentTypeChildNode.nextElementSibling
- var nextNode = elementNodeReference.nextElementSibling;
- read-only property 
- returns the Element immediately following the elementNodeReference
- or null if the specified element is the last one in the list.

NonDocumentTypeChildNode.previousElementSibling
- var prevNode = elementNodeReference.previousElementSiblin
- read-only property 
- returns the Element immediately prior to elementNodeReference
- or null if the specified element is the first one in the list.


Element.innerHTML
- const content = element.innerHTML; //get
- element.innerHTML = htmlString; //set
- gets or sets the HTML or XML markup contained within the element.
- If a node has a child text node that includes the characters (&), (<), or (>), innerHTML returns these characters as the HTML entities "&amp;", "&lt;" and "&gt;" respectively. 
- Use Node.textContent to get a raw copy of these text nodes' contents.

Element.outerHTML
- var content = element.outerHTML;
- element.outerHTML = htmlString;
- The outerHTML attribute of the Element DOM interface gets the serialized HTML fragment describing the element including its descendants. 
- Setting the value of outerHTML replaces the element and all of its descendants with a new DOM tree constructed by parsing the specified htmlString.
- To only obtain the HTML representation of the contents of an element, or to replace the contents of an element, use the property innerHTML instead.

```
// HTML:
// <div id="d"><p>Content</p><p>Further Elaborated</p></div>

d = document.getElementById("d");
console.log(d.outerHTML);

// the string '<div id="d"><p>Content</p><p>Further Elaborated</p></div>'
// is written to the console window
```

Element.scrollHeight
- read-only property 
- is a measurement of the height of an element's content, including content not visible on the screen due to overflow.
- is equal to the minimum height the element would require in order to fit all the content in the viewport without using a vertical scrollbar.
- The height is measured in the same way as clientHeight: it includes the element's padding, but not its border, margin or horizontal scrollbar (if present). 
- It can also include the height of pseudo-elements such as ::before or ::after. 
- If the element's content can fit without a need for vertical scrollbar, its scrollHeight is equal to clientHeight
- This property will round the value to an integer. If you need a fractional value, use Element.getBoundingClientRect().

Element.getElementsByClassName()
- Returns a live HTMLCollection that contains all **descendants of the current element** that possess the list of classes given in the parameter.
- The method getElementsByClassName() on the Document interface works essentially the same way, except it acts on the entire document, starting at the document root.

This example finds all elements that have a class of test, which are also a descendant of the element that has the id of main:
```
document.getElementById('main').getElementsByClassName('test');
```
To find elements whose class lists include both the red and test classes:
```
element.getElementsByClassName('red test');
```

insertAdjacentElement() 
- inserts a given element node at a given position relative to the element it is invoked upon.
- targetElement.insertAdjacentElement(position, element);
- position: A DOMString representing the position relative to the targetElement; must match (case-insensitively) one of the following strings:
	- 'beforebegin': Before the targetElement itself.
	- 'afterbegin': Just inside the targetElement, before its first child.
	- 'beforeend': Just inside the targetElement, after its last child.
	- 'afterend': After the targetElement itself.
- element: The element to be inserted into the tree.

Element.querySelector()
- returns the first element that is a **descendant of the element** on which it is invoked that matches the specified group of selectors.
- var element = baseElement.querySelector(selectors);
- selectors: A group of selectors to match the descendant elements of the Element baseElement against; this must be valid CSS syntax, or a SyntaxError exception will occur. The first element found which matches this group of selectors is returned.
- returns the first descendant element of baseElement which matches the specified group of selectors. 
- The entire hierarchy of elements is considered when matching, including those outside the set of elements including baseElement and its descendants; in other words, selectors is first applied to the whole document, not the baseElement, to generate an initial list of potential elements. The resulting elements are then examined to see if they are descendants of baseElement. The first match of those remaining elements is returned by the querySelector() method.
- If no matches are found, the returned value is null.

Element.querySelectorAll()
- var NodeList = parentNode.querySelectorAll(selectors)
- Multiple selectors may be specified by separating them using commas.
- returns a non-live NodeList containing one Element object for each descendent node that matches *at least one* of the specified selectors
- If the specified selectors include a CSS pseudo-element, the returned list is always empty.
