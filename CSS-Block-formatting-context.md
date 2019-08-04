CSS Block formatting context
- It is the region in which the layout of block boxes occurs and in which floats interact with other elements. It is a mini layout in your layout (if you use it)
- applying it would help contain the things inside it and stop elements inside from escaping and poking out of the box
- you can see it as making the contents within a box to be block level boxes

Block formatting contexts are important for the positioning (see float) and clearing (see clear) of floats. 

The rules for positioning and clearing of floats apply only to things within the same block formatting context. 
- Floats do not affect the layout of the content inside other block formatting contexts, and clear only clears past floats in the same block formatting context. 
- Margin collapsing also occurs only between blocks that belong to the same block formatting context.

When we have a float content that is inside a div and the content of the float is taller than the content of its sibling element, the float content will be taken out of the flow. The sibling element height would be different from the float content height.

To make both sibling element's height the same, you can create a new Block Formatting context that would contain the float. You can create a new Block Formatting context in 2 ways:
1. setting overflow: auto in the parent element
2. setting display: flow-root in the parent element (preferred. display: flow-root is a new value)

The problem with using overflow to create a new BFC is that the overflow property is meant for telling the browser how you wish to deal with overflowing content. There are some occasions in which you will find you get unwanted scrollbars or clipped shadows when you use this property purely to create a BFC. In addition, it is potentially not very readable for a future developer, as it may not be obvious why you used overflow for this purpose. If you do this, it would be a good idea to comment the code to explain.

