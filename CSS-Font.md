#CSS, Font
Text on a page can be categorized into 2 groups, font-based properties and text-based properties. 
Most of these properties will be prefaced with either font-* or text-*.

(The following are css properties)
Font Family
- The font-family property is used to declare which font—as well as which fallback or substitute fonts—should be used to display text. 
- The value of the font-family property contains multiple font names, all comma separated.
- The first declared font, starting from the left, is the primary font choice. 
	- Should the first font be unavailable, alternative fonts are declared after it in order of preference from left to right.
- Font names consisting of two or more words need to be wrapped in quotation marks. 
- the last font should be a keyword value, which will use the system default font for the specified type, most commonly either sans-serif or serif.
E.g.
```
- body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
```

Font-style
- accepts four keyword values: normal, italic, oblique, and inherit.
- normal (returns text to its normal style).

Font-variant
- accepts three values: normal, small-caps, and inherit. 
- the font-variant property looks for an alternate variant of a typeface
```
.firm {
  font-variant: small-caps;
}
```

Font-Weight
- The font-weight property accepts either keyword or numeric values.
- Rather than using the keyword values bolder or lighter, it’s better to use a numeric value for more specific control.
- The numeric values 100, 200, 300, 400, 500, 600, 700, 800, and 900 pertain specifically to typefaces that have multiple weights. 
	- The order of these weights starts with the thinnest weight, 100, and scales up to the thickest weight, 900. 
	-  For reference, the keyword value of normal maps to 400 and the keyword bold maps to 700; thus, any numeric value below 400 will be fairly thin, and any value above 700 will be fairly thick.

*Before using a numeric value, we need to check and see whether the typeface we are using comes in the weight we’d like to use. Attempting to use a weight that’s not available for a given typeface will cause those styles to default to the closest value.*

Line-Height
distance between two lines of text (often referred to as leading) is declared using the line-height property
- best practice for legibility is to set the line-height to around one and a half times our font-size property value. 
	- line-height to 150%, or just 1.5. 
- Line height may also be used to **vertically center a single line of text within an element. **
	- Using the same property value for the line-height and height properties will vertically center the text
```
.btn {
  height: 22px;
  line-height: 22px;
}
```

Shorthand Font Properties
The order of these property values should be as follows, from left to right: 
*font-style, font-variant, font-weight, font-size, line-height, and font-family.*

- these property values are listed from left to right without the use of commas (except for font names, as the font-family property value uses commas). 
- A forward slash, /, separator is needed between the font-size and line-height property values.

When using this shorthand value, every property value is optional except the font-size and font-family property values.

Text Properties
Text-align
- property has five values: left, right, center, justify, and inherit. 

Text-decoration
- It accepts the keyword values of none, underline, overline, line-through, and inherit.
- Multiple text-decoration values may be applied to an element at once by space-separating each keyword within the value.

Text-indent
- used to indent the first line of text within an element
- All common length values are available for this property, including pixels, points, percentages, and so on. 
- Positive values will indent text inward, while negative values will indent text outward.

Text-shadow
- property allows us to add a shadow or multiple shadows to text.
- takes values, first three values are lengths, and the last value is a color.
	- the first value determines the shadow’s horizontal offset, the second value determines the shadow’s vertical offset, and the third value determines the shadow’s blur radius.
	- The fourth, and last, value is the shadow’s color, which can be any of the color values used within the color property.
```
p {
  text-shadow: 3px 6px 2px rgba(0, 0, 0, .3);
}
```
You can also chain multiple text shadows with commas:
```
text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;
```

Box-shadow
If we’d like to place a shadow on the element as a whole, we can use the box-shadow property.
- The box-shadow property works just like the text-shadow property, accepting values for horizontal and vertical offsets, a blur, and a color.
- Also accepts an optional fourth length value, before the color value, for the spread of a shadow. 
	- As a positive length value, the spread will expand the shadow larger than the size of the element it’s applied to, and 
	- as a negative length value the spread will shrink the shadow to be smaller than the size of the element it’s applied to.
- property may include an optional inset value at the beginning of the value to place the shadow inside an element as opposed to outside the element.
```
box-shadow: inset 5em 1em gold;
```

Text-transform
- While the font-variant property looks for an alternate variant of a typeface, 
- the text-transform property will change the text inline **without the need for an alternate typeface. **
- The text-transform property accepts five values: none, capitalize, uppercase, lowercase, and inherit.

Letter spacing
- adjust the space (or tracking) between the letters on a page. 
- A positive length value will push letters farther apart from one another, while a negative length value will pull letters closer together. 
- The keyword value none will return the space between letters back to its normal size.
- Using a relative length value with the letter-spacing property will help ensure that we maintain the correct spacing between letters as the font-size of the text is changed

Word spacing
- Instead of spacing letters apart, though, the word-spacing property applies those values between words.
- accepts the same length values and keywords as the letter-spacing property. 

Safe web fonts
They’ve been installed on every device, we can use these fonts freely within our websites, knowing that no matter what device is browsing our site, the font will render properly.

Arial
Courier New, Courier
Garamond
Georgia
Lucida Sans, Lucida Grande, Lucida
Palatino Linotype
Tahoma
Times New Roman, Times
Trebuchet
Verdana

Embedding web fonts
upload fonts to a server and include them on a website via the CSS @font-face at-rule

First, we use the @font-face at-rule to set our font’s name, via the font-family property
Then, set the source of our font (the path to the font file containing our chosen font), via the src property. 

From there we are able to use this font by including its name within any font-family property value.
```
@font-face {
  font-family: "Lobster";
  src: local("Lobster"), url("lobster.woff") format("woff");
}

body {
  font-family: "Lobster", "Comic Sans", cursive;
}
```
Citations and Quotes
<cite>: Used to reference a creative work, author, or resource
<q>: Used for short, inline quotations
<blockquote>: Used for longer external quotations

- By default, content wrapped within the <cite> element will appear in italics within the browser.

- Quite often, dialogue or prose is quoted inline, within other text. For this purpose, the <q> (or quote) inline element should be applied.

- To quote a large block of text that comes from an external source and spans several lines, we’ll use the <blockquote> element. 
	- The <blockquote> is a block-level element that may have other block-level elements nested inside it, including headings and paragraphs.