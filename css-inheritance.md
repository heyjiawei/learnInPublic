CSS Inheritance/Cascade

What selectors win out in the cascade depends on three factors (these are listed in order of weight — earlier ones will overrule later ones):
1. Importance
2. Specificity
3. Source order

Conflicting declarations will be applied in the following order, with later ones overriding earlier ones:

1. Declarations in user agent style sheets (e.g. the browser's default styles, used when no other styling is set).
2. Normal declarations in user style sheets (custom styles set by a user).
3. Normal declarations in author style sheets (these are the styles set by us, the web developers).
4. Important declarations in author style sheets
5. Important declarations in user style sheets

It makes sense for web developers' stylesheets to override user stylesheets, so the design can be kept as intended, but sometimes users have good reasons to override web developer styles, as mentioned above — this can be achieved by using !important in their rules.

The amount of specificity a selector has is measured using four different values (or components), which can be thought of as thousands, hundreds, tens and ones — four single digits in four columns:

Thousands: Score one in this column if the declaration is inside a style attribute, aka inline styles. Such declarations don't have selectors, so their specificity is always simply 1000.

Hundreds: Score one in this column for each ID selector contained inside the overall selector.

Tens: Score one in this column for each 
class selector, 
attribute selector,  [href*="en-US"]
or pseudo-class contained inside the overall selector.  :nth-child(2)

Ones: Score one in this column for each 
element selector  div
or pseudo-element contained inside the overall selector.  ::after
Note: Universal selector (*), combinators (+, >, ~, ' ') and negation pseudo-class (:not) have no effect on specificity.

One thing you should bear in mind when considering all this cascade theory, and what styles get applied over other styles, is that all this happens at the property level — properties override other properties, but you don't get entire rules overriding other rules.

When several CSS rules match the same element, they are all applied to that element. Only after that are any conflicting properties evaluated to see which individual styles will win over others.


Inheritance
The idea is that some property values applied to an element will be inherited by that element's children, and some won't. Which properties are inherited by default and which aren't is largely down to common sense. 

Controlling inheritance

In general, there are three source origins for CSS declarations, in descending order of priority (first one takes precedence):

the author style sheet, which is written by the developer of the website
the user style sheet, which is written by the user of the browser used to view the website
the user-agent style sheet, which is written by the browser vendor

User style sheets may not be all that common, but it is possible to get a browser to use a custom style sheet you defined on your local machine. This allows you to modify the display of a website, particularly useful for people with low vision disabilities who’d like to have different font sizes, contrast and so on to read comfortably.

inherit
Sets the property value applied to a selected element to be the same as that of its parent element.

initial
Sets the property value applied to a selected element to be the same as the value set for that element in the browser's default style sheet. 
If no value is set by the browser's default style sheet and the property is naturally inherited, then the property value is set to inherit instead.

unset
Resets the property to its natural value, which means that if the property is naturally inherited it acts like inherit, otherwise it acts like initial.

revert
rolls back the cascade, meaning the property behaves as if there were no styles in the current style origin.


**So when we use the revert keyword in our author style sheet, the property will take on the declared value from the user style sheet. If none exist, then it will take on the declared value from the user-agent style sheet.**

How do you rest all styles?
the CSS all property
- The all CSS shorthand property sets all of an element's properties (other than unicode-bidi and direction) to their initial or inherited values, or to the values specified in another stylesheet origin.

.class {
/* Global values */
all: initial;
all: inherit;
all: unset;

/* CSS Cascading and Inheritance Level 4 */
all: revert;
}
