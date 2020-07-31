Semantic elements can be grouped into 4 categories
- Document structure (i.e. nav, footer)
- textual meaning (h1, strong, cite)
- media type tags (audio, video, picture)
- correlation tags (ol, ul, figure and figcaption)

Think of the page would be presented if there is no CSS. Does the layout make sense?
If yes, congrats, you have been writing semantic HTML in the basic sense. 
If the classes/ids are creating a sensable layout, convert them into their almost equivalent HTML tags

- You can use <div> when none of the semantic HTML elements would make sense. 
	- E.g. Using <div> for purely layout purpose
	- using <img> when image is part of the content of the web page and use background-image when the image is a part of the page presentation or visual design
- This is pretty common for flexbox. It requires lots of <div>'s to group flex items correctly