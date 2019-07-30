CSS values and units

Pixels
Pixels (px) are referred to as absolute units because they will always be the same size regardless of any other related settings.

em
em: 1em is the same as the font-size of the current element (more specifically, the width of a capital letter M.) The default base font-size given to web pages by web browsers before CSS styling is applied is 16 pixels, which means the computed value of 1em is 16 pixels for an element by default. 

But beware — font sizes are inherited by elements from their parents, so if different font sizes have been set on parent elements, the pixel equivalent of an em can start to become complicated.

rem
The rem (root em) works in exactly the same way as the em, except that it will always equal the size of the default base font-size; inherited font sizes will have no effect, so this sounds like a much better option than em, although rems don't work in older versions of Internet Explorer 

vw, vh: 
Respectively these are 1/100th of the width of the viewport, and 1/100th of the height of the viewport. Again, these are not as widely supported as em.

