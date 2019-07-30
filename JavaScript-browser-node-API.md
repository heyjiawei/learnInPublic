JavaScript Node API
- Node is an interface from which a number of DOM API object types inherit.
- It inherits from EventTarget addEventListener, etc.
- The following interfaces all inherit from Node’s methods and properties: Document, Element, Attr, CharacterData (which Text, Comment, and CDATASection inherit), ProcessingInstruction, DocumentFragment, DocumentType, Notation, Entity, EntityReference
- These interfaces may return null in certain cases where the methods and properties are not relevant. 
- They may throw an exception — for example when adding children to a node type for which no children can exist.

Node.childNodes()
- returns a live NodeList containing all children of this node. A live NodeList means changes to the children of this Node will be updated in the NodeList

Node.isConnected()
- Returns a boolean indicating whether or not the Node is connected (directly or indirectly) to the context object, e.g. the Document object in the case of the normal DOM, or the ShadowRoot in the case of a shadow DOM.

Node.appendChild()
- Adds the specified childNode argument as the last child to the current node.
- If the argument referenced an existing node on the DOM tree, the node will be detached from its current position and attached at the new position.

Node.cloneNode()
- Clone a Node, and optionally, all of its contents. By default, it clones the content of the node.

Node.compareDocumentPosition()
- var compareMask = node.compareDocumentPosition(otherNode)
- compares the position of the given node against another node in any document.
- The return value is a bitmask with the following values:
DOCUMENT_POSITION_DISCONNECTED	1
DOCUMENT_POSITION_PRECEDING	2
DOCUMENT_POSITION_FOLLOWING	4
DOCUMENT_POSITION_CONTAINS	8
DOCUMENT_POSITION_CONTAINED_BY	16
DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC	32
- More than one of the bits may be set, if multiple scenarios apply. If otherNode is located earlier in the document and also contains the Node on which compareDocumentPosition() was called, then the DOCUMENT_POSITION_CONTAINS and DOCUMENT_POSITION_PRECEDING bits would be set, resulting in a value of 0x0A or decimal 10.

Node.getRootNode()
- The getRootNode() method of the Node interface returns the context object's root, which optionally includes the shadow root if it is available.
- The context object's root is the document node for normal cases. Shadow root if specified

Node.insertBefore()
- var insertedNode = parentNode.insertBefore(newNode, referenceNode);
- This inserts newNode before referenceNode. You must declare parentNode, newNode and referenceNode
- insertedNode: The node being inserted, that is newNode
- parentNode: The parent of the newly inserted node.
- newNode: The node to be inserted.
- referenceNode: The node before which newNode is inserted.
- If referenceNode is null, the newNode is inserted at the end of the list of child nodes.
- The returned value is the added child except when newNode is a DocumentFragment, in which case the empty DocumentFragment is returned.

Node.isEqualNode()
- var isEqualNode = node.isEqualNode(otherNode);
- tests whether two nodes are equal. 
- Two nodes are equal when they have the same type, defining characteristics (for elements, this would be their ID, number of children, and so forth), its attributes match, and so on. 
- The specific set of data points that must match varies depending on the types of the nodes.
```
// In this example, we create three <div> blocks. 
// The first and third have the same contents and attributes, while the second is different.

<div>This is the first element.</div>
<div>This is the second element.</div>
<div>This is the first element.</div>
```
div 0 equals div 0: true
div 0 equals div 1: false
div 0 equals div 2: true

Node.isSameNode()
- They must reference the same object

Node.normalize()
- Concatenate all child text nodes into 1 text node
```
let wrapper = document.createElement("div");

wrapper.appendChild( document.createTextNode("Part 1 ") );
wrapper.appendChild( document.createTextNode("Part 2 ") );

// At this point, wrapper.childNodes.length === 2
// wrapper.childNodes[0].textContent === "Part 1 "
// wrapper.childNodes[1].textContent === "Part 2 "

wrapper.normalize();

// Now, wrapper.childNodes.length === 1
// wrapper.childNodes[0].textContent === "Part 1 Part 2 "
```

Node.replaceChild()
- var replacedNode = parentNode.replaceChild(newChild, oldChild);
- newChild: is the new node to replace oldChild. If it already exists in the DOM, it is first removed.
- oldChild: is the existing child to be replaced.
- replacedNode: is the replaced node. This is the same node as oldChild.

