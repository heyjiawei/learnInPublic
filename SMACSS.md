#SMACSS
[Home - Scalable and Modular Architecture for CSS](https://smacss.com/)
There are five types of categories:
1. Base
2. Layout
3. Module
4. State
5. Theme

Base rules are the defaults. They are almost exclusively single element selectors but it could include attribute selectors, pseudo-class selectors, child selectors or sibling selectors. Essentially, a base style says that wherever this element is on the page, it should look like this.
```
html, body, form { margin: 0; padding: 0; }
input[type=text] { border: 1px solid #999; }
a { color: #039; }
a:hover { color: #03C; }
```
Layout rules divide the page into sections. Layouts hold one or more modules together.
- prefixed with "l-" or "layout-" or "grid-"
- They are major components such as a header or footer.
- From a layout perspective, all we care about is how each item relates to each other. We don’t care, necessarily, about the design of the modules themselves nor do we want to have to worry about the context that this layout sits within.

Modules are the reusable, modular parts of our design. They are the callouts, the sidebar sections, the product lists and so on.
- They are going to be the bulk of any project so just use the name of the module itself
```
/* Example Module */
.example { }

/* Callout Module */
.callout { }

/* Callout Module with State */
.callout.is-collapsed { }

/* Form field module */
.field { }
```
- Related elements within a module usethe base name as a prefix
```
/*Callout module legend element*/
.callout-legend {}
```
- Modules sit inside Layout components. 
- Modules can sometimes sit within other Modules, too. 
- Each Module should be designed to exist as a standalone component.
- When defining the rule set for a module, avoid using IDs and element selectors, sticking only to class names
	- If you do wish to use an element selector, it should be within one level of a class selector. In other words, you should be in a situation to use child selectors. 
- Only include a selector that includes semantics. A span or div holds none. A heading has some. A class defined on an element has plenty.

Subclassing Modules
- When we have same modules appearing in different sections
- Are applied to an element at render time and then are never changed again
- Give it another class and style it accordingly
- Apply both the base module and sub-module class names to the HTML element
```
.pod { 
    width: 100%; 
} 
.pod input[type=text] { 
    width: 50%; 
}
.pod-constrained input[type=text] { 
    width: 100%; 
}

.pod-callout { 
    width: 200px; 
}
.pod-callout input[type=text] { 
    width: 180px; 
}

 <div class="pod pod-constrained">...</div>
<div class="pod pod-callout">...</div> 
```

State rules are ways to describe how our modules or layouts will look when in a particular state. 
- There is plenty of similarity between a sub-module style and a state style. They both modify the existing look of an element. However, they differ in two key ways:
	- State styles can apply to layout and/or module styles; and
	- State styles indicate a JavaScript dependency.
- prefixed with "is-" e.g. is-hidden, is-collapsed, is-active
- Is it hidden or expanded? Is it active or inactive? 
- They are about describing how a module or layout looks on screens that are smaller or bigger. 
- They are also about describing how a module might look in different views like the home page or the inside page.
- A state is something that augments and overrides all other styles.
- "is-collapsed" represents a collapsed state. One might presume that without this state rule, the default is an expanded state.
- States should be made to stand alone and are usually built of a single class selector.
- State will likely need to override the style of a more complex rule set, the use of !important is allowed 
	- You won’t normally have two states applied to the same module or two states that tend to affect the same set of styles, so specificity conflicts from using !important should be few and far between.
- a state rule will not be able to rely on inheritance to apply its style in the right place. Sometimes a state is very specific to a particular module where styling is very unique.
- In a case where a state rule is made for a specific module, the state class name should include the module name in it. The state rule should also reside with the module rules and not with the rest of the global state rules.

State Change
- can be one of the 3 ways:
	1. Class name - an element gets a new class applied and then the visual appearance changes
	2. Pseudo-class - we don't reply on JavaScript to describe the state change
	3. Media query - describe how things should be styled under defined criteria, such as different viewport sizes

Styling dynamically added Class 
- use a sibling selector (not the best option if you need to reselect this element in JS to modify its state again)
```
.btn.is-active { color: #000; }
.btn.is-active + .menu { display: block; }
```
- Add another class/apply a state to each button

Styling via pseudo-class
- As modules are sub-classed, it can potentially get complicated as you may need to design pseudo-class states for the sub-modules, as well.
The following CSS is normal. But few modules are going to need this huge array of state management
```
.btn { ... }
.btn:hover { ... }
.btn:focus { ... }

.btn-default { ... }
.btn-default:hover { ... }

.btn.is-pressed { ... }
.btn.is-pressed:hover { ... }

.btn-default.is-pressed { ... }
.btn-default.is-pressed:hover { ... }
```
Styling via media-query
- For SMACSS, place media queries around the module states.
- This approach will cause media query to be declared multiple times. But it also allows for all information about a modoule to be kept together - allowing it to be tested in isolation
```
/* default state for nav items */
.nav > li {
   float: left;
}

/* alternate state for nav items on small screens */
@media screen and (max-width: 400px) {
    .nav > li { float: none; }
}

/*In the next module/layout */

/* default layout */ 
.content { 
    float: left;
    width: 75%;
}

.sidebar {
    float: right;
    width: 25%;
}

/* alternate state for layout on small screens */
@media screen and (max-width: 400px) {
    .content, .sidebar { 
        float: none;
        width: auto; 
    }
}
```
Theme rules are similar to state rules in that they describe how modules or layouts might look. Most sites don’t require a layer of theming but it is good to be aware of it.