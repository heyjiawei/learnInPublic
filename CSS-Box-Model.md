#CSS, Box Model
- Width of an element = margin + border + padding + content width
- Every element has default width and height. That width and height may be 0 pixels but browsers by default will render every element with size.

Width
- The default width of an element depends on its display value. 
- Block-level elements have a default width of 100%, consuming the entire horizontal space available.
- Inline-level elements cannot have a fixed size, thus the width and height properties are only relevant to non-inline elements.
- Inline and inline-block elements expand and contract horizontally to accommodate their content. 

Height
- The default height of an element is determined by its content

*Keep in mind that inline-level elements will not accept the width and height properties or any values tied to them*

Block and inline-block elements will, however, accept the width and height properties and their corresponding values.

Margin
- Vertical margins, top and bottom, are not accepted by inline-level elements. Margins only work horizontally—left and right—on inline-level elements.
- These vertical margins are, however, accepted by block-level and inline-block elements.

Padding
- Padding works on all four sides of inline-level elements
- however, the vertical padding—the top and bottom—may bleed into the lines above and below an element.

Margins and padding work like normal for block and inline-block elements.

Margin collapsing:
When two boxes touch against one another, the distance between them is the value of the largest of the two touching margins, and not their sum.
Note that the margins of floating and absolutely positioned elements never collapse.

Margin collapsing occurs in 3 basic cases:
1. Adjacent siblings
The margins of adjacent siblings are collapsed (except when the latter sibling needs to be cleared past floats).

2. Parent and first or last child
The first or last child will be wrapped in the parent container. If there is no border, padding, inline part, block formatting context created, or clearance to separate the margin-top of the parent display: block from the margin-top of its first child display: block, then those margins collapse. 
The same goes for margin-bottom for the last child display: block.
The collapsed margin ends up outside the parent container.
How to solve it:
- adding something solid to the parent. In this case, adding 1px of padding allows both margins to be used.
- The same would be true if we added border-top to the parent. As long as something solid sits between the parent and child, both margins will be used.

3. Empty blocks
If there is no border, padding, inline content, height or min-height to separate a block's margin-top from its margin-bottom, then its top and bottom margins collapse

Some things to note:
- More complex margin collapsing (of more than two margins) occurs when the above cases are combined.
- These rules apply even to margins that are zero, so the margin of a first/last child ends up outside its parent (according to the rules above) whether or not the parent's margin is zero.
- When negative margins are involved, the size of the collapsed margin is the sum of the largest positive margin and the smallest (most negative) negative margin. In English, if one margin is negative, the negative margin is subtracted from the positive margin, reducing the total vertical margin.
- When all margins are negative, the size of the collapsed margin is the smallest (most negative) margin. This applies to both adjacent elements and nested elements. In English, the same rule holds as if both were positive. However, the margin that collapses is the bigger negative of the two rather than the one that is closest to being positive. For example, if one margin is -25px and the other is -50px, then -50px will be the margin.

CSS3 box-sizing property
- allows us to change exactly how the box model works and how an element's size is calculated
box-sizing: content-box
- this is the default box-sizing property, where the size of the element begins with width and height, and then any padding, border or margin properties are added from there

box-sizing: padding-box (depreciated)
- alters the box model by including any padding property values WITHIN the width and height of an element
- if an element has a width of 400 pixels and a padding of 20 pixels around every side, the actual width will remain 400 pixels. As any padding values increase, the content size within an element shrinks proportionately.
- If we add a border or margin, those values will be added to the width or height properties to calculate the full box size.

box-sizing: border-box
- alters the box model so that any border or padding property values are included within the width and height of an element. 
- if an element has a width of 400 pixels, a padding of 20 pixels around every side, and a border of 10 pixels around every side, the actual width will remain 400 pixels.

**No matter which box-sizing property value is used, any margin values will need to be added to calculate the full size of the element.**

Generally speaking, the best box-sizing value to use is border-box.
- Say we want our box to be 40% wide. Adding a padding of 20 pixels and a border of 10 pixels around every side of an element isn’t difficult, and we can still guarantee that the actual width of our box will remain 40% despite using pixel values elsewhere.

Types of CSS boxes (the display property)
display: block;
a box that's stacked upon other boxes (i.e. content before and after the box appears on a separate line), and 
can have width and height set on it. 
The whole box model as described above applies to block boxes.

display: inline;
it flows with the document's text (i.e. it will appear on the same line as surrounding text and other inline elements, and its content will break with the flow of the text, like lines of text in a paragraph.) 
Width and height settings have no effect on inline boxes; 
any padding, margin and border set on inline boxes will update the position of surrounding text, but *will not affect the position of surrounding display: block; boxes.*

display: inline-block;
An inline-block box is something in between the first two: 
It flows with surrounding text and other inline elements without creating line breaks before and after it unlike a block box, 
but it can be sized using width and height and maintains its block integrity like a block box. 
It won't be broken across paragraph lines like an inline box.

