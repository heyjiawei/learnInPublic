css display properties
6 value categories:
- display-outside
- display-inside
- display-listitem
- display-internal
- display-box
- display-legacy

display-outside
- applied directly on elemnt whose layout you want to change.
display: block;
display: inline;
- browsers that only detect this style on the outer element will set the inner value to flow. This means that if the parent element is block, the children will participate in the same display layout.

display-inside
- will be applied to the elements children. 

display-listitem
- The list-item keyword causes the element to generate a ::marker pseudo-element with the content specified by its list-style properties (for example a bullet point) together with a principal box of the specified type for its own contents.
- This can be used together with list-style-type and list-style-position.

display-internal
- Some layout models such as table and ruby have a complex internal structure, with several different roles that their children and descendants can fill. This page defines those "internal" display values, which only have meaning within that particular layout mode.

display-box
- define whether an element generates display boxes at all.
