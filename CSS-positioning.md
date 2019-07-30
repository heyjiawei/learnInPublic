#CSS, positioning
This is an add on to notes on Google docs

float
- the float property allows us to take an element, remove it from the normal flow of a page, and position it to the left or right of its parent element. 
	- All other elements on the page will then flow around the floated element.
	- causes the width of that (float) element to default to the width of the content within it
	- However, this can be corrected by adding a fixed width property value to each float container
	- May also change the float element's display value. **The float property relies on an element having a display value of block**, and may alter an element’s default display value if it is not already displayed as a block-level element.
		- For example, an element with a display value of inline, such as the span inline-level element, ignores any height or width property values. However, should that inline-level element be floated, its display value will be changed to block, and it may then accept height or width property values.

*As we float elements we must keep an eye on how their display property values are affected.*

- The float property accepts a few values; the two most popular values are left and right, which allow elements to be floated to the left or right **of their parent element.**
- when an element is floated, it will float all the way to the edge of its parent element. If there isn’t a parent element, the floated element will then float all the way to the edge of the page.
- to prevent floated elements from touching one another, causing the content of one to sit directly next to the content of the other, we can use the margin property to create space between elements.

When there are more than 2 columns, we **can't** float one column to the left and another to the right. we’ll need to float all three <section> elements to the left

float bugs
- One of those pitfalls is that occasionally the proper styles will not render on an element that it is sitting next to or is a parent element of a floated element
- Often margin and padding property values aren’t interpreted correctly, causing them to blend into the floated element; other properties can be affected, too.

Clearing float
- Clearing floats is accomplished using the clear property
- The left value will clear left floats, while the right value will clear right floats. The both value, however, will clear both left and right floats and is often the most ideal value.
- **this clear be applied to an element appearing after the floated elements, not before, to return the page to its normal flow.**

Alternatively, you can contain float
To contain floats, the floated elements must reside within a parent element. The parent element will act as a container, leaving the flow of the document completely normal outside of it.

Position with Inline Block
Another way to position content is by using the display property in conjunction with the inline-block value

Positioning with Inline-block
inline-block value for the display property will display elements within a line while allowing them to accept all box model properties, including height, width, padding, border, and margin.

inline-block elements are displayed on the same line as one another, they include a single space between them.: (there is a single space between section html elements below)
```
<header>...</header>
<section>...</section>
<section>...</section>
<section>...</section>
<footer>...</footer>
```
When the size of each single space is added to the width and horizontal margin values of all the elements in the row, the total width becomes too great, pushing the last <section> element to a new row. In order to display all of the <section> elements on the same row, the white space between each <section> element must be removed.
	
Solution 1:
put each new ```<section>``` element’s opening tag on the same line as the previous ```<section>``` element’s closing tag.
```
<header>...</header>
<section>
  ...
</section><section> <---------
  ...
</section><section>
  ...
</section>
<footer>...</footer>
```
Solution 2
Another way to remove the white space between inline-block elements is to open an HTML comment directly after an inline-block element’s closing tag. Then, close the HTML com- ment immediately before the next inline-block element’s opening tag. Doing this allows inline-block elements to begin and end on separate lines of HTML and “comments out” any potential spaces between the elements. The resulting code would look like this:
```
<header>...</header>
<section>
  ...
</section><!--
--><section>
  ...
</section><!--
--><section>
  ...
 </section>
 <footer>...</footer>
```

Uniquely Positioning Elements
The position property identifies 
1. how an element is positioned on a page and 
2. whether or not it will appear within the normal flow of a document.
This is used in conjunction with the box offset properties—top, right, bottom, and left—which identify exactly where an element will be positioned by moving elements in a number of different directions.

position: static (default)
It exists in the normal flow of a document and it doesn’t accept any box offset properties

Relative Positioning
- elements to appear within the normal flow a page, leaving space for the element as intended/ element takes up the space it originally takes up
- when repositioned with css properties (top, left etc) other elements will not flow around / other elements are not allowed to move into this space
	-  the element overlaps the element below it rather than moving that element down as the margin or padding properties would.
- the box offset properties reposition the element, pushing it 20 pixels from the left and 20 pixels from the top **of its original location.**

Absolute Positioning
- Does not appear within the normal flow of a document. This means that the original space and position of the absolutely positioned element will not be preserved.
	- will overlap any surrounding elements
	- the original position of the ```<div>``` is not preserved, and other elements are able to occupy that space
- Absolutely positioned elements are moved in relation to their closest relatively positioned parent element. Should a relatively positioned parent element not exist, the absolutely positioned element will be positioned in relation to the <body> element.

With relatively positioned elements, the box offset properties identify in which direction an element would be moved in relation to itself. With absolutely positioned elements, the box offset properties identify in which direction an element will be moved in relation to its closest relatively positioned parent element.