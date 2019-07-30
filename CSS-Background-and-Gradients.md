#CSS, Background and Gradients
- When using an RGBa or HSLa value as a transparent background color, it’s a good idea to provide a fallback color, too, because not all browsers recognize RGBa or HSLa values. 
	- Browser support is specifically a problem with Internet Explorer 8, where RGBa and HSLa values are not supported. 
	- And when a browser such as Internet Explorer 8 comes across a value it doesn’t recognize, it will ignore it.

To provide fallback background support:
```
div {
  background-color: #b2b2b2;
  background-color: rgba(0, 0, 0, .3); <---- if it doesn;t understand this, it will ignore it and use the previous colour
}
```

Background-image
- We can use the background property with a shorthand value, or we can use the background-image property outright.
- No matter which property we use, there must be an image source identified using a url() function.
```
div {
  background-image: url("alert.png"); <--- hyperlink path
}
```
By default the background image will repeat horizontally and vertically from the top left of the given element to fill up the element’s background. 
This can be controlled with background-repeat and background-position properties

Background-repeat
-  accepts four different values: repeat, repeat-x, repeat-y, and no-repeat. 
-  The repeat value is the default value and will repeat a background image both vertically and horizontally.

Background-position
-  requires two values: a horizontal offset (the first value) and a vertical offset (the second value). 
	-  If only one value is specified, that value is used for the horizontal offset and the vertical offset will default to 50%.
	- we’re moving the background image from the left top corner of the element, length values specifically will be in relation to that corner.
- we can use the top, right, bottom, left, and center keywords, pixels, percentages, or any length measurement
	- Keywords and percentages work very similarly. The keyword value left top is identical to the percentage value 0 0, which will keep an image positioned at the left top corner of the element.

Shorthand background image values
- The order of these properties as a shorthand background property value may vary
- however it commonly falls as background-color, background-image, background-position, and then background-repeat.
```
div {
  background: #b2b2b2 url("alert.png") 20px 10px no-repeat;
}
```

Gradient Backgrounds
- do not work in legacy browsers, requires vendor prefixes to ensure best support
- use the linear-gradient() function within the background or background-image property
- linear-gradient() function must include two color values, the first of which will be the beginning color value and the second of which will be the ending color value
```
background: linear-gradient(to right bottom, #648880, #293f50);
```
By default, the direction of linear backgrounds move from top to the bottom of an element.
This direction, however, may be changed with the use of keywords or a degree value.
- should we want a gradient to move from the left of an element to the right, we can use the keyword value *to right* to identify the direction in which the linear gradient should progress. 
- Keyword values may also be combined. If we want the gradient to move from the left top to the right bottom of an element, we can use the keyword value of *to right bottom*.
- If we want our gradient to move to the left top of an element, we can use the degree value of 315deg, or if we want our gradient to move to the right bottom of an element, we can use the degree value of 135deg. 


When we use a diagonal gradient on an element that isn’t exactly square, the background gradient will not proceed directly from one corner to the other. 

Instead, the gradient will identify the absolute center of the element, place anchors in the perpendicular corners from where it should progress, and then move to the general direction of the corner stated within the value. 
These corners the gradient moves towards are called “magic corners,” as they are not absolute.

Radial Gradient Background
- use the radial-gradient() function
-  the first color identified within the radial-gradient() function will sit in the absolute center of the element, and the second color will sit on the outside of an element
```
div {
  background: #466368;
  background: radial-gradient(#648880, #293f50);
}
```

Gradient Color Stops
- we may add multiple colors to a gradient and have the browser transition between all of them. 
- To do this we’ll add color stops to the given gradient function, with commas separating each color stop from the next.
	- By default, the browser will position every color stop an equal distance from the next and will transition between them accordingly.
```
div {
  background: #648880;
  background: linear-gradient(to right, #f6f1d3, #648880, #293f50);
}
```
- If more control over how colors are positioned is desired, a location along the gradient may be identified for each color stop. The location should be declared as a length value and should fall after the color value.
```
div {
  background: #648880;
  background: linear-gradient(to right, #f6f1d3, #648880 85%, #293f50);
}
```

Using multiple background images
- with CSS3, we can now use more than one background image on an element by comma-separating multiple background values within a background or background-image property.
- The background image value that comes first will be the foremost background image, and the background image that’s listed last will be the rearmost background image. Any value between the first and the last will reside within the middle ground accordingly. 
```
div {
  background:  url("foreground.png") 0 0 no-repeat, url("middle-ground.png") 0 0 no-repeat, url("background.png") 0 0 no-repeat;
}
```

Background-size
- allows us to specify a size for a background image
- property accepts a few different values, including length and keyword values

length
- When using length values, we can specify a width and a height value by using two space-separated values
- First value will set the width of the background image, while the second value will set the height of the background image. 
- **Note that percentage values are in relation to the element’s size, not the background image’s original size.**

Setting a background-size property with a 100% width will make the background image occupy the full width of the element. If a second value isn’t identified after the width, the height value will be automatically set to preserve the aspect ratio of the background image.
- The keyword value auto may be used as either the width or height value to preserve the aspect ratio of the background image.

- The cover keyword value specifies that the background image will be resized to completely cover an element’s width and height. 
- The background image’s original aspect ratio will be preserved, yet the image will stretch or shrink as necessary to cover the entire element. 
	- Often when using the cover keyword value, part of the background image is cut off in order for the image to occupy the full available space of the element.

- The contain keyword value, on the other hand, specifies that the background image will be resized to reside entirely contained within an element’s width and height. 
- 	In doing so the background image’s original aspect ratio will be preserved, but the image will stretch or shrink as necessary to remain within the width and height of the element. 

In contrast with the cover keyword value, the contain keyword value will always show the full background image; however, oftentimes it will not occupy the full available space of the element.

Background-clip and Background-origin uses the same values
Background-clip
- specifies the surface area a background image will cover
- accepts border-box (default), padding-box, and content-box
border-box:
- The border-box value extends the background into the border of an element
- allowing a background image to extend into the same area as any border

Background-origin
- specifies where the background-position should originate.
- accepts border-box, padding-box (default), and content-box
padding-box:
- The padding-box value extends the background into the padding of an element, but the background is contained within any border
- allowing the beginning of a background image to extend into the padding of an element.

content-box:
- The content-box value contains the background within the border and padding of an element