#CSS, Specificity Points
inline Style attribute > ID (e.g. #table) > Class, pseudo-class, attribute (e.g. .table) > Elements/type (e.g. div)
- The higher the specificity weight of a selector, the more superiority the selector is given when a styling conflict occurs.
	- For example, if a paragraph element is selected using a type selector in one place and an ID selector in another, **the ID selector will take precedence over the type selector regardless of where the ID selector appears in the cascade.**
Important Notes:
The Universal selector (*), combinators (+, >, ~, ' ') and negation pseudo-class (:not()) have no effect on specificity. (0,0,0,0)
Pseudo-elements (e.g. :first-line) get 0,0,0,1 unlike their psuedo-class brethren which get 0,0,1,0
The pseudo-class :not() adds no specificity by itself, only what's inside it's parentheses.
The !important value appended a CSS property value is an automatic win. It overrides even inline styles from the markup. The only way an !important value can be overridden is with another !important rule declared later in the CSS and with equal or great specificity value otherwise. You could think of it as adding 1,0,0,0,0 to the specificity value so, When two conflicting declarations with the !important rule are applied to the same element, the declaration with a greater specificity will be applied.

Combining selectors changes their specificity
- When selectors are combined they should be read from right to left. 
- The selector farthest to the right, directly before the opening curly bracket, is known as the key selector. The key selector identifies exactly which element the styles will be applied to. 
- Any selector to the left of the key selector will serve as a prequalifier.
For example:
.hotdog p {}
- The key selector is a type selector targeting paragraph elements.
- this type selector is prequalified with a class selector of hotdog and therefore, the full combined selector will only select paragraph elements that reside within an element with a class attribute value of hotdog.
.hotdog p.mustard {}
- the new class selector, mustard, falls all the way to the right of the combined selector, it is the key selector, and all of the individual selectors coming before it are now prequalifiers.

Spaces within selectors
.hotdog p.mustard, there is a space between the hotdog class selector and the paragraph type selector but not between the paragraph type selector and the mustard class selector.
	- Since there isn’t a space between the paragraph type selector and the mustard class selector that means the selector will only select paragraph elements with the class of mustard.
	- If the paragraph type selector was removed, and the mustard class selector had spaces on both sides of it, it would select any element with the class of mustard, not just paragraphs.

**The best practice is to not prefix a class selector with a type selector. Generally we want to select any element with a given class, not just one type of element.**

What is the difference between these 2 selectors?
```
.classA.classB {
  border: 1px solid;
}

.classA .classB {
  border: 1px solid;
}
```
.classA.classB refers to an element that has both classes A and B (class="classA classB"); whereas .classA .classB refers to an element with class="classB" descended from an element with class="classA".

Child selector vs Descendent selector
*My daughter is both my child and my descendant
My granddaughter is not my child, but she is my descendant.*

The child selector (div > p) will only match p elements that are only children to div.
The descendent selector (div p) will match all p elements inside of element div, regardless of the nesting level.

Layering styles with multiple classes
One way to keep the specificity weights of our selectors low is to be as modular as possible, sharing similar styles from element to element. 
And one way to be as modular as possible is to layer on different styles by using multiple classes.
e.g.
```
<a class="btn btn-danger">...</a>
<a class="btn btn-success">...</a>
```
can have the following css
```
.btn {
  font-size: 16px;
}
.btn-danger {
  background: red;
}
.btn-success {
  background: green;
}
```