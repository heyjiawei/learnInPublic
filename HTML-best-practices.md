#HTML, best practices
- use of the <!DOCTYPE html> doctype or ```<html>, <head>, and <body>``` elements. Without a doctype and these structural elements, pages will not render properly in every browser.
- Use lowercase letters within element names, attributes, and values
- Indent nested elements
- Strictly use double quotes, not single or completely omitted quotes
- Remove the forward slash at the end of self-closing elements
bad: 
```
<img src=chicago.jpg alt="Chicago, the third most populous city in the United States" />
```
good:
```
<img src="chicago.jpg" alt="Chicago, the third most populous city in the United States">
```
- Omit the values on Boolean attributes
bad:
```
<H5 HIDDEN='HIDDEN'>City in Illinois</H5>
```
good:
```
<h5 hidden>City in Illinois</h5>
```
- id and class names should relate to the content itself, not the style of the content
e.g. insetad of using red, name it alert

Use the alt attribute on images
```
<img src="puppy.jpg" alt="A beautiful, two-year-old hound mix puppy">
```
- Images should always include the alt attribute. Screen readers and other accessibility software rely on the alt attribute to provide context for images. (a person who is listening to the content of a webpage (for instance, a person who is blind) can interact with this element.)
- The alt attribute value should be very descriptive of what the image contains. 
- If the image doesn’t contain anything of relevance, the alt attribute should still be included; however, the value should be left blank so that screen readers will ignore it rather than read the name of the image file.

*if an image doesn’t have a meaningful value—perhaps it is part of the user interface, for example—it should be included as a CSS background image if at all possible, not as an <img> element.*

Separate content from style.
- try to avoid inline css

Avoid too many divs
While this works, it can add quite a bit of bloat to a page, and before too long we’re not sure what each <div> element does.

- reduce markup, tie multiple styles to a single element where possible.
- Additionally, we should use the HTML5 structural elements where suitable.
bad:
```
<div class="container">
  <div class="article">
    <div class="headline">Headlines Across the World</div>
  </div>
</div>
```
good:
```
<div class="container">
  <article>
    <h1>Headlines Across the World</h1>
  </article>
</div>
```