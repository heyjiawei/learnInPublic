CSS combinators and selector rules

Selector list	
A, B	
Any element matching A and/or B 

Descendant combinator	
A B	
Any element matching B that is a descendant of an element matching A (that is, a child, or a child of a child, etc.). the combinator is one or more spaces or dual greater than signs.

Child combinator	
A > B	
Any element matching B that is a **direct child** of an element matching A.

Adjacent sibling combinator	
A + B	
Any element matching B that is the next sibling of an element matching A (that is, the next child of the same parent).

/* All <td>s preceded by another <td>,
   within a <tbody>, within a <table> */
table tbody td + td {
  text-align: center;
}

General sibling combinator	
A ~ B	
The general sibling combinator (~) separates two selectors and matches the second element only if it follows the first element (though not necessarily immediately), and both are children of the same parent element.

In the following example, all <span> after <p> will have color:red
(they have the same parent)

```
p ~ span {
	color: red;
}

<span>This is not red.</span>
<p>Here is a paragraph.</p>
<code>Here is some code.</code>
<span>And here is a red span!</span>
<code>More code...</code>
<span>And this is a red span!</span>
```
