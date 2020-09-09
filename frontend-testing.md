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
