CSS Selectors


Attribute selectors
A special kind of selector that will match elements based on their attributes and attribute values. 
Their generic syntax consists of square brackets ([]) containing an attribute name followed by an optional condition to match against the value of the attribute.
They can be divided into 2 categories:
Presence and value
Substring value

Presence and value attribute selectors:
These attribute selectors try to match an exact attribute value:

[attr] : This selector will select all elements with the attribute attr, whatever its value.
[attr=val] : This selector will select all elements with the attribute attr, but only if its value is val.
[attr~=val]: This selector will select all elements with the attribute attr, but only if  val is one of a space-separated list of words **contained** in attr's value. 

```
/* All elements with the attribute "data-vegetable"
   are given green text */
[data-vegetable] {
  color: green;
}

/* All elements with the attribute "data-vegetable"
   with the exact value "liquid" are given a golden
   background color */
[data-vegetable="liquid"] {
  background-color: goldenrod;
}

/* All elements with the attribute "data-vegetable",
   containing the value "spicy", even among others,
   are given a red text color */
[data-vegetable~="spicy"] {
  color: red;
}
Ingredients for my recipe: <i lang="fr-FR">Poulet basquaise</i>
<ul>
  <li data-quantity="1kg" data-vegetable>Tomatoes</li> => color Green
  <li data-quantity="3" data-vegetable>Onions</li> => color Green
  <li data-quantity="3" data-vegetable>Garlic</li> => color Green
  <li data-quantity="700g" data-vegetable="not spicy like chili">Red pepper</li> => color: red
  <li data-quantity="2kg" data-meat>Chicken</li>
  <li data-quantity="optional 150g" data-meat>Bacon bits</li>
  <li data-quantity="optional 10ml" data-vegetable="liquid">Olive oil</li>
  <li data-quantity="25cl" data-vegetable="liquid">White wine</li> => color Green, background goldenrod
</ul>
```

Substring value attribute selectors:

[attr^=val] : This selector will select all elements with the attribute attr for which the value starts with val.
[attr$=val] : This selector will select all elements with the attribute attr for which the value ends with val.
[attr*=val] : This selector will select all elements with the attribute attr for which the value contains the substring val. (A substring is simply part of a string, e.g. "cat" is a substring in the string "caterpillar".) 
[attr|=val].  This selector selects all elements with the attribute attr for which the value is exactly val or starts with val- (the dash here isn't a mistake). This was implemented specifically to match language codes, e.g. lang="en" or lang="en-US"

Pseudo-classes selectors
A CSS pseudo-class is a keyword added to the end of a selector, **preceded by a colon (:)**, which is used to specify that you want to style the selected element **but only when it is in a certain state.** 
For example, you might want to style a link element only when it is being hovered over by the mouse pointer, or a checkbox when it is disabled or checked, or an element that is the first child of its parent in the DOM tree.

Pseudo-elements selectors
 They are keywords, this time **preceded by two colons (::)**, that can be added to the end of selectors to select a certain part of an element. 
 
 /* All elements with an attribute "href" with values
   starting with "http" will have an arrow added after their
   content (to indicate they are external links) */
[href^=http]::after {
  content: '⤴';
}
