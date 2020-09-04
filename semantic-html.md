# Semantic HTML

- using the correct HTML elements for their intended purpose as much as possible

Semantic elements can be grouped into 4 categories

- Document structure (i.e. nav, footer)
- textual meaning (h1, strong, cite)
- media type tags (audio, video, picture)
- correlation tags (ol, ul, figure and figcaption)

Think of the page would be presented if there is no CSS. Does the layout make sense?
If yes, congrats, you have been writing semantic HTML in the basic sense.
If the classes/ids are creating a sensible layout, convert them into their almost equivalent HTML tags

- You can use <div> when none of the semantic HTML elements would make sense.
  - E.g. Using <div> for purely layout purpose
  - using <img> when image is part of the content of the web page and use background-image when the image is a part of the page presentation or visual design
- This is pretty common for flexbox. It requires lots of <div>'s to group flex items correctly

- when you use semantic HTML, sometimes they have very good defaults, like built-in keyboard accessibility
  - users can navigate between buttons using Tab and activate their selection with Enter
- Semantic html gives you some functionality for free.
- Less code
- Good SEO

- good HTML structure such that the layout markup no longer gets in the way and confuses the content read out.
- Try to use HTML5 semantic elements like `<nav>`, `<footer>`, and repeating content units `<article>`
  - these provide extra semantics for screen readers and other tools

## UI Controls

- they refer to the main parts of web documents that users interact with like buttons, links, form controls.
- one key aspect of accessibility of UI controls is that by default, browsers allow them to be manipulated by the keyboard.
- you can give fake-buttons the ability to be focused with attribute `tabindex="0"`

  - tabindex attribute allow tabbable elements to have a custom tab order instead of just being tabbed through in their default source order
  - this can be a bad idea so use it only if you really need to. E.g. if the layout shows things in a very different visual order to the source code and you want to make things work more logically
  - `tabindex="0"` — as indicated above, this value allows elements that are not normally tabbable to become tabbable. This is the most useful value of tabindex.
  - `tabindex="-1"` — this allows not normally tabbable elements to receive focus programmatically, e.g., via JavaScript, or as the target of links.

- adding tabindex allows us to tab to the buttons but it does not allow us to activate them with the Enter key. To do that we need to add JavaScript

```
document.onkeydown = function(e) {
  if(e.keyCode === 13) { // The Enter/Return key
    document.activeElement.click();
  }
};
```

- This is a lot of extra hassle to build the functionality back in. And there's bound to be other problems with it. Better to just use the right element for the right job in the first place.

- You should make sure that your button and link text labels are understandable and distinctive. Don't just use "Click here" for your labels, as **screen reader users sometimes get up a list of buttons and form controls**.

- Make sure your labels (like links, captions) make sense out of context, read on their own, as well as in the context of the paragraph they are in.

- Form labels are also important for giving you a clue about what you need to enter into each form input. You should use it like this:

```
<label for="name">Fill in your name:</label>
<input type="text" id="name" name="name">
```

- in some screen readers, `<input>` may only be given the description of "edit text" so disabled users may not associate the form label with the form input if only `<input>` was used

- an added bonus with labels is that you can click on the label to select or activate the form element. This gives the input area a bigger hit area, making it easier to select

- labels are not just limited to `<label>` element. They include the `alt` tag in images, the `aria-label` in empty text `<a>`

  - `aria-label` and `aria-labeledby` are the your escape hatch for elements that do contain text within them
  - Note that the contents of the alt attribute should always provide a direct representation of the image and what it conveys visually.
    - Any personal knowledge or extra description shouldn't be included here, as it is not useful for people who have not come across the image before.

- If your images have no meaning inside your content (visual decoration) then its better to write an empty text as a value for `alt` attribute or just include them in the page as CSS background images
  - Another alternative is to use the aria role attribute role="presentation" as this also stops screen readers from reading out alternative text.

## Using `aria-labeledby`

```
<img src="dinosaur.png" aria-labelledby="dino-label">

<p id="dino-label">The Mozilla red Tyrannosaurus ... </p>
```

- give it an id, and then used the aria-labelledby attribute to refer to that id, which causes screen readers to use that paragraph as the alt text/label for that image.
- This is especially useful if you want to use the same text as a label for multiple images — something that isn't possible with alt.

## onClick events

- Anchor tags are often abused with the onclick event to create pseudo-buttons by setting href to `#` or `javascript:void(0)` to prevent the page from refreshing.
- These values cause unexpected behavior when copying or dragging links, opening links in a new tab or window, bookmarking, and when JavaScript is still downloading, errors out, or is disabled.
- This also conveys incorrect semantics to assistive technologies
- In these cases, it is recommended to use a `<button>` instead. In general you should only use an anchor for navigation using a proper URL.

## Links that open a new tab or window

- these are Links that open in a new tab or window via the `target="_blank"` declaration
- People experiencing low vision conditions, who are navigating with the aid of screen reading technology, or who have cognitive concerns may become confused when the new tab, window, or application is opened unexpectedly.
- open new windows and tabs from a link only when necessary
- otherwise, give users advanced warning when opening a new window
