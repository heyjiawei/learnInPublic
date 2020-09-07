- you don't need to be 100% accessible.
  - Be logical. A web visual gallery it a visual stimulation and hence, understandably unaccessible for the visually impaired
- implementing accessibility into your project can be hard if
  - you are trying to retrofit accessibility into an existing website that has significant accessibility issues
  - you have only started to consider accessibility and uncover these issues in the late stages of a project
- It is advice to consider accessibility from the start of a project. The cost of making most content accessibility should be fairly minimal

- here is a (guide on how to how to make your website more accessible)[https://www.w3.org/WAI/standards-guidelines/wcag/glance/]

## CSS and accessibility

- It is possible to use CSS to make any HTML element look like anything, but this doesn't mean that you should; you should use the appropriate semantic element for the job
  - e.g. a screen reader user can't navigate a page via heading elements if the developer hasn't appropriately used heading elements to markup the content. By the same token, a heading loses its visual purpose if you style it so it doesn't look like a heading.
- **The rule of thumb is that you can update the styling of a page feature to fit in your design, but don't change it so much that it no longer looks or behaves as expected.**

- for links, you should keep giving users feedback when they interact with the links.

  - Something should definitely happen when states change
  - you shouldn't get rid of the pointer cursor or the outline — both are very important accessibility aids for those using keyboard controls.

- form elements shouldn't however deviate too much from the expected visual feedback form elements receive when they are focused.
  - You could style form focus/hover states to make this behaviour more consistent across browsers or fit in better with your page design, but don't get rid of it altogether — again, people rely on these clues to help them know what is going on.

### Colour and contrast

- When choosing a color scheme for your website, make sure that the text (foreground) color contrasts well with the background color.
- There are a number of contrast checking tools online that you can enter your foreground and background colors into, to check them. For example WebAIM's [Color Contrast Checker](http://webaim.org/resources/contrastchecker/) is simple to use, and provides an explanation of what you need to conform to the WCAG criteria around color contrast.
- Another tip is to **not rely on color alone for signposts/information**, as this will be no good for those who can't see the color. Instead of marking required form fields in red, for example, **mark them with an asterisk and in red**.

### Hiding things

- Absolute positioning is generally seen as one of the best mechanisms of hiding content for visual effect, because it doesn't stop screen readers from getting to it.
- On the other hand, you shouldn't use `visibility:hidden` or `display:none`, because they do hide content from screen readers. Unless of course, there is a good reason why you want this content to be hidden from screen readers.

### Accept that users can override styles

- It is possible for users to override your styles with their own custom styles
  - e.g. [How to use a custom style sheet (CSS) with Firefox](https://www.itsupportguides.com/knowledge-base/computer-accessibility/how-to-use-a-custom-style-sheet-css-with-firefox/) for a useful guide covering how to do this manually in Firefox
  - you can also do so with a browser extension. For example the Stylish extension is available for Firefox, Safari, Opera, and Chrome.
- Whatever the need, you should be comfortable with this, and make your designs flexible enough so that such changes will work in your design
- Hence, you might want to make sure your main content area can handle bigger text (maybe it will start to scroll to allow it all to be seen), and won't just hide it, or break completely.

## JavaScript and accessibility

- a way to improve accessibility for non-semantic JavaScript-powered widgets is to use WAI-ARIA to provide extra semantics for screen reader users.

- Complex functionality like 3D games are not so easy to make accessible — a complex 3D game created using WebGL will be rendered on a `<canvas>` element, which has no facility at this time to provide text alternatives or other information for severely visually impaired users to make use of.

  - It is arguable that such a game doesn't really have this group of people as a part of its main target audience, and it would be unreasonable to expect you to make it 100% accessible to blind people
  - however you could implement keyboard controls so it is usable by non-mouse users, and make the color scheme contrasting enough to be usable by those with color deficiencies.

- Your JavaScript should be used wherever possible to enhance functionality, not build it in entirely — basic functions should ideally work without JavaScript, although it is appreciated that this is not always an option. A large part of it is using built-in browser functionality where possible.

  - e.g. Providing client-side form validation, which alerts users to problems with their form entries quickly, without having to wait for the server to check the data. If it isn't available, the form will still work, but validation might be slower.

### mouse-specific events accessibility issues

- Some events can have accessibility issues. The main example you'll come across is mouse-specific events like mouseover, mouseout, dblclick, etc. Functionality that runs in response to these events will not be accessible using other mechanisms, like keyboard controls.
- To mitigate such problems, you should double up these events with similar events that can be activated by other means (so-called device-independent event handlers) — focus and blur would provide accessibility for keyboard users.

```
imgThumb.onmouseover = showImg;
imgThumb.onmouseout = hideImg;

imgThumb.onfocus = showImg;
imgThumb.onblur = hideImg;
// The image should also have tabindex="0" included on it.
```

# Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)

- is a specification written by the W3C
- is a set of additional HTML attributes that can be applied to elements to provide additional semantics and improve accessibility wherever it is lacking.
- these attributes don't affect anything about the web page, except for the information exposed by the browser's accessibility APIs (where screen readers get their information from). WAI-ARIA doesn't affect webpage structure, the DOM, etc., although the attributes can be useful for selecting elements by CSS.

There are 3 main features defined in the specs:

1. Roles

- These define what an element is or does.
- Many of these are so-called landmark roles, which largely duplicate the semantic value of HTML5 structural elements
  e.g. role="navigation" (`<nav>`) or role="complementary" (`<aside>`), but there are also others that describe different pages structures, such as role="banner", role="search", role="tabgroup", role="tab", etc., which are commonly found in UIs.

2. Properties

- These define properties of elements, which can be used to give them extra meaning or semantics.
- e.g. aria-required="true" specifies that a form input needs to be filled in to be valid, whereas aria-labelledby="label" allows you to put an ID on an element, then reference it as being the label for anything else on the page, including multiple elements, which is not possible using `<label for="input">`.

3. States

- Special properties that define the current conditions of elements, such as aria-disabled="true", which specifies to a screen reader that a form input is currently disabled.
- **Properties don't change throughout the lifecycle of an app**, whereas **states can change**, generally programmatically via JavaScript.

There are 4 main areas WAI-ARIA is useful in:

1. Signposts or landmarks

Your Logos or hamburger icons. ARIA's role attribute values can act as landmarks that either replicate the semantics of HTML5 elements (e.g. `<nav>`), or go beyond HTML5 semantics to provide signposts to different functional areas. e.g search, tabgroup, tab, listbox, etc.

2. Dynamic content updates

- Screenreaders tend to have difficulty with reporting constantly changing content
- with ARIA we can use `aria-live` to inform screenreader users when an area of content is updated, e.g. via XMLHttpRequest, or DOM APIs.

3. Enhancing keyboard accessibility

- There are built-in HTML elements that have native keyboard accessibility; when other elements are used along with JavaScript to simulate similar interactions, keyboard accessibility and screenreader reporting suffers as a result.
- Where this is unavoidable, WAI-ARIA provides a means to allow other elements to receive focus (using tabindex).

4. Accessibility of non-semantic controls

- When a series of nested `<div>`s along with CSS/JavaScript is used to create a complex UI-feature, or a native control is greatly enhanced/changed via JavaScript, accessibility can suffer
  - screenreader users will find it difficult to work out what the feature does if there are no semantics or other clues.
- In these situations, ARIA can help to provide what's missing with a combination of roles like button, listbox, or tabgroup, and properties like aria-required or aria-posinset to provide further clues as to functionality.

**You should only use WAI-ARIA when you need to**. Ideally, you should always use native HTML features to provide the semantics required by screenreaders to tell their users what is going on

## Where is WAI-ARIA supported?

- like browser support, WAI-ARIA faces the same issue. There are a lot of features in the WAI-ARIA spec and there are many combinations of operating system, browser, and screenreader to consider.
- To use a screenreader in the first place, your operating system needs to run browsers that have the necessary accessibility APIs in place to expose the information screenreaders need to do their job
  - Most popular OSes have one or two browsers in place that screenreaders can work with
- [WAI-ARIA Screen reader compatibility](http://www.powermapper.com/tests/screen-readers/aria/)

### aria-live property

Applying this to an element causes screenreaders to read out the content that is updated. How urgently the content is read out depends on the attribute value:

- off: The default. Updates should not be announced.
- polite: Updates should be announced only if the user is idle.
- assertive: Updates should be announced to the user as soon as possible.

But only the bit of text that updates is read out. It might be nice if we always read out the heading too, so the user can remember what is being read out. To do this, we can add the `aria-atomic` property. The `aria-atomic="true"` attribute tells screenreaders to read out the entire element contents as one atomic unit, not just the bits that were updated.

The aria-relevant property is also quite useful for controlling what gets read out when a live region is updated. You can for example only get content additions or removals read out.
