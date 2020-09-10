# Cross browser testing

- work out a list of browsers you will need to test on to start with.
- you should try to make sure your site works on the most important target browsers and devices, and then code defensively to give your site the widest support reach it can be expected to have.
  - By coding defensively, we mean trying to build in intelligent fallbacks so that if a feature or style doesn't work in a browser, the site will be able to downgrade to something less exciting that still provides an acceptable user experience — the core information is still accessible, for example, even if it doesn't look quite as nice.

## Working out a list of browsers to test on

- The aim is to build up a chart of browsers/devices you can refer to as you test.
- a common approach is to have multiple grades of support level, something like
  1. A grade: Common/modern browsers — Known to be capable. Test thoroughly and provide full support.
  2. B grade: Older/less capable browsers — known not to be capable. Test, and provide a more basic experience that gives full access to core information and services.
  3. C grade: Rare/unknown browsers — don't test, but assume they are capable. Serve the full site, which should work, at least with the fallbacks provided by our defensive coding.

### Guessing which browsers people use

- For example, if you live in Western Europe or North America, you will know that a lot of people use Windows and Mac desktops/laptops, where the main browsers are Chrome, Firefox, Safari, IE, and Edge. You probably want to just test the latest versions of the first three, as these browsers receive regular updates. For Edge and IE, you probably want to test the last couple of versions; these should all go in the A grade tier.
  - You might also know that a number of people still use IE 9. This is old and less capable, so let's put it in the B grade tier.

### Using Browser support stats

- These are North America-centric but they can give you an idea of broad trends
  - [Netmarketshare](https://www.netmarketshare.com/browser-market-share.aspx?qprid=2&qpcustomd=0)
  - [Statcounter](http://gs.statcounter.com/)

### Google analytics

- you can get accurate stats on exactly what browsers people are using to browse your site
- open source alternatives (They expect you to self-host the analytics platform):
  1. [Open web analytics](http://www.openwebanalytics.com/)
  2. [Matomo](https://matomo.org/)

# What are you going to test

- you should write out a list of testing requirements that need to pass to be accepted. These requirements can be visual or functional — both combine to make a usable web site feature.

Test criteria can be written like so:

A and B grade:

- Button should be activatable by the user's primary control mechanism, whatever it is — this should include mouse, keyboard, and touch.
- Toggling the button should make the information box appear/disappear.
- The text should be readable.
- Visually impaired users using screenreaders should be able to access the text.

A grade:

- The information box should animate smoothly as it appears/disappears.
- The gradient and text shadow should appear to enhance the look of the box.

When you test them on the different browsers, you may notice that some browsers do not support certain features; your features aren't accessible.

These test criteria help by:

- giving you a set of steps to follow when you are performing tests
- They can be easily turned into sets of instructions for user groups to follow when carrying out tests
- provide a basis for writing automated tests. It is easier to write such tests if you know exactly what you want to test, and what the success conditions are

## Hardware and emulators

- Some efforts have been made to create publicly accessible device labs — see [Open Device Labs](https://opendevicelab.com/). Doesn't have good support

More often than not though, you'll have to install some kind of emulator. The most common devices/browsers you'll want to test are as follows:

- Heavy official [Android Studio IDE](https://developer.android.com/studio/) for Andriod apps. It comes with an [emulator](https://developer.android.com/studio/run/emulator.html)
- If you want something a bit more lightweight, [Andy](http://www.andyroid.net/) is a reasonable option that runs on both Windows and Mac.
- Apple provides an app called Simulator that runs on top of the XCode development environment, and emulates iPad/iPhone/Apple Watch/Apple TV. This includes the native iOS Safari browser. This unfortunately only runs on a Mac.

Many emulators actually require the use of a virtual machine. Virtual Box is free

# User testing

When running tests, it can also be a good idea to:

- Set up a separate browser profile where possible, with browser extensions and other such things disabled, and run your tests in that profile (see Use the Profile Manager to create and remove Firefox profiles and Share Chrome with others or add personas, for example).
- Use browser's private mode functionality when running tests, where available (e.g. Private Browsing in Firefox, Incognito Mode in Chrome) so things like cookies and temp files are not saved.

## HTML Fallback

- Unrecognised HTML elements are treated by the browser as anonymous inline elements (effectively inline elements with no semantic value, similar to `<span>` elements).
- More complex elements like HTML `<video>`, `<audio>`, and `<canvas>` (and other features besides) have natural mechanisms for fallbacks to be added
  - You can add fallback content in between the opening and closing tags, and non-supporting browsers will effectively ignore the outer element and run the nested content.
  ```
  <video id="video" controls preload="metadata" poster="img/poster.jpg">
    <!-- Fallback by offering download -->
    <p>Your browser does not support HTML5 video; here is a link to
    <a href="video/tears-of-steel-battle-clip-medium.mp4">view the video</a> directly.</p>
  </video>
  ```

### IE conditional comments

- IE conditional comments are a modified proprietary HTML comment syntax, which can be used to selectively apply HTML code to different versions of IE

```
<!--[if lte IE 8]>
  <script src="ie-fix.js"></script>
  <link href="ie-fix.css" rel="stylesheet" type="text/css">
<![endif]-->
```

- This block will apply the IE-specific CSS and JavaScript only if the browser viewing the page is IE 8 or older
- [HTML5Shiv](https://github.com/aFarkas/html5shiv) enables use of HTML5 sectioning elements in legacy Internet Explorer and provides basic HTML5 styling for older browsers

## CSS Fallback

- If a browser encounters a declaration or rule it doesn't understand, it just skips it completely without applying it or throwing an error

## CSS prefixes

- CSS prefixes were originally used to allow browser vendors to implement their own version of a CSS (or JavaScript) feature while the technology is in an experimental state, so they can play with it and get it right without conflicting with other browser's implementations, or the final unprefixed implementations.

- Mozilla uses `-moz-`
- Chrome/Opera/Safari use `-webkit-`
- Microsoft uses `-ms-`

- If you insist on using prefixed features, make sure you use the right ones. You can look up what browsers require prefixes on MDN reference pages, and sites like caniuse.com. If you are unsure, you can also find out by doing some testing directly in browsers.
- Once you've found out which prefixes you need to support, you should write them all out in your CSS
- This ensures that all browsers that support any of the above forms of the property can make the feature work.
  - It is worth **putting the non-prefixed version last**, because **that will be the most up-to-date version**, which you'll want browsers to use if possible

## Layout issues

- Lack of (or differences in) support for modern layout features.
  - There is a fairly new feature in CSS called `@supports`, which allows you to implement native feature detection tests.
- Layouts not looking good in mobile browsers (i.e. responsive design problems).
  - Responsive design is the practice of creating web layouts that change to suit different device form factors — for example, different screen widths, orientations (portrait or landscape), or resolutions.
    - so you need to provide a suitable mobile layout using media queries, and make sure it is applied correctly using viewport or use percentages
    - you may try mobile first media queries
      - If you are serving different styling and layout information for different viewport sizes, etc., it makes more sense to include the narrow screen/mobile styling as the default styling before any media queries are encountered, rather than having desktop/wider screen styling first. This way, mobile devices don't have to load assets and other information twice.
      - If you are using mechanisms like feature detection and `window.matchMedia` to conditionally load scripting functionality depending on viewport size, feature support, etc., you should just load the very basics that pretty much all browsers will need first, then progressively enhance browsers higher up the food chain.
  - Resolution is a big issue too — for example, mobile devices are less likely to need big heavy images than desktop computers, and are more likely to have slower internet connections and possibly even expensive data plans that make wasted bandwidth more of a problem.
  - In addition, different devices can have a range of different resolutions, meaning that smaller images could appear pixillated.
    - we can solve resolution switching - that is to display identical image content, just larger or smaller depending on the device using two new attributes — `srcset` and `sizes` — to provide several additional source images along with hints to help the browser pick the right one.
    ```
    <img srcset="elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 600px) 480px,
            800px"
     src="elva-fairy-800w.jpg"
     alt="Elva dressed as a fairy">
    ```
- Historically web developers used to use CSS files called resets, which removed all the default browser styling applied to HTML, and then applied their own styles for everything over the top — this was done to make styling on a project more consistent, and reduce possible cross browser issues, especially for things like layout.
  - However, it has more recently been seen as overkill
  - The best equivalent we have in modern times is [normalize.css](https://necolas.github.io/normalize.css/), a neat bit of CSS that builds slightly on the default browser styling to make things more consistent and fix some layout issues. You are advised to apply normalize.css to all your HTML pages.
