#CSS, best practices
The objective is to make the styles easier to read and to edit
Organize code with comments
- keep it organized in logical groups
- Before each group, provide a comment noting what the following style pertains to
```
/* Primary header */
header { ... }

/* Featured article */
article { ... }

/* Buttons */
.btn { ... }
```
using proper class names
- Class names should be modular
- should be specific enough for its intended purpose. You should be able to glean its purpose from the class alone. If it is so vague that it could very easily be redefined accidentally by another dev, it spells trouble (Specific intent requires a specific selector.)
- they should pertain to content within an element, not appearance, as much as possible
- should be all lowercase and use hyphen delimiters
- it can be a lot longer but if its clearer, its a good trade-off
bad: .card
good: .credit-card-image
```
.alert-message { ... }
```

Build proficient selectors
- A high specificity selector is likely to break the CSS cascade and cause undesirable issues
- try to avoid using IDs within our selectors. They are overly specific and quickly raise the specificity of a selector, which would then, often break the cascade within our CSS file
- try and avoid any key selector that is a type selector (basically an element, like ul or span or whatever) or a base object (e.g. .nav or .media). Just because something is the only .media object in your content area it doesn’t mean it always will be.
- use short and primary direct selectors
- nest them only 2 to 3 levels deep and remove as many location-based qualifiying selectors as possible
	- when you need to use specific classes, use a class alone. E.g. a text-offset class
good:
```
.news a { ... }
.news .special { ... }
```

Use shorthand properties and values. Unless you are only setting one value
- Using the shorthand alternative allows us to quickly set and identify styles.
- When we’re only setting one value, though, shorthand alternatives should not be used. If a box only needs a bottom margin, use the margin-bottom property alone. Doing so ensures that other margin values will not be overwritten, and we can easily identify which side the margin is being applied to without much cognitive effort.
bad:
```
img {
  margin-top: 5px;
  margin-right: 10px;
  margin-bottom: 5px;
  margin-left: 10px;
}
button {
  padding: 0 0 0 20px;
}

.module {
  background: #DDDDDD;
  color: #FF6600;
}
```
good:
```
.module {
  background: #ddd;
  color: #f60;
}

img {
  margin: 5px 10px;
}
button {
  padding-left: 20px;
}
```

Drop units from zero values
- No matter which length unit is being used—pixels, percentages, em, and so forth—zero is always zero. Adding the unit is unnecessary and provides no additional value.
bad:
```
div {
  margin: 20px 0px;
  letter-spacing: 0%;
  padding: 0px 5px;
}
```
good:
```
div {
  margin: 20px 0;
  letter-spacing: 0;
  padding: 0 5px;
}
```

Group and align vendor prefixes
- When using vendor prefixes we need to **make sure to place an unprefixed version of our property and value last, after any prefixed versions. Doing so ensures that browsers that support the unprefixed version will render that style according to its placement within the cascade, reading styles from the top of the file to the bottom.**
good:
```
div {
background: -webkit-linear-gradient(#a1d3b0, #f6f1d3);
background:    -moz-linear-gradient(#a1d3b0, #f6f1d3);
background:         linear-gradient(#a1d3b0, #f6f1d3);
-webkit-box-sizing: border-box;
   -moz-box-sizing: border-box;
        	box-sizing: border-box;
}
```

Modularise styles for reuse
- styles assigned to a class should be modular and available to share across elements as necessary.
bad:
```
.news {
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.events {
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 6px;
}
```
good:
```
.feat-box {
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 6px;
}
```

Reduce location dependency
- having specific descendent selectors is a sign of location dependency

By having a selector like .sidebar .promo {} we are saying we want to target any promotional item that lives in an element with the class of .sidebar. This means that we are tied to always using that styling inside a certain element; we have a dependency on location.

By replacing .sidebar .promo {} with something like .secondary-promo {} we can now place the element in question anywhere we wish. In the sidebar—as before—but now also in the footer, or in the header, or after an article.

bad:
```
.sidebar .promo {}
```
good:
```
.secondary-promo {}
```

Try not to qualify selectors
A qualified selector is one like ul.nav {} or a.button {} or div.content {}.
- Qualified selectors are bad because they reduce efficiency (more checks than we really need) but—more importantly—because they tie us to specific elements. 
- We can’t now use that .button class on an <input> or a <button>, for example. We can’t apply .nav to an <ol> to make a breadcrumb.

*selectors should be element-agnostic. CSS shouldn't case what element you want to apply styling to*

Drop elements altogether
bad:
```
/* Base widget styling */
.widget {}

/* Style up widget titles */
.widget > h2 {}
```
good:
```
/* Base widget styling */
.widget {}

/* Style up widget titles */
.widget-title {}
```