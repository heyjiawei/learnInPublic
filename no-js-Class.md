no-js Class
- this class is added to allow you to add custom styling based on whether JavaScript is disabled (.no-js) or enabled (.js)
- also helps to avoid the Flash Of Unstyled Content (FOUC)

add lang attribute at <html>
<html class="no-js" lang="en">

The order of the <title> and <meta> tags
- The charset declaration (<meta charset="utf-8">) must be included completely within the first 1024 bytes of the document
- should be specified before <title> element to avoid potential utf-7 (an encoding related attack on IE)

Meta discription
<meta name="description" content="This is a description">
- The description meta tag provides a short description of the page. In some situations this description is used as a part of the snippet shown in the search results.

Mobile viewport meta tag
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
- Narrow screen devices (e.g. mobiles) render pages in a virtual window or viewport, which is usually wider than the screen, and then shrink the rendered result down so it can all be seen at once.
	- For example, if a mobile screen has a width of 640px, pages might be rendered with a virtual viewport of 980px, and then it will be shrunk down to fit into the 640px space.
- This virtual viewport is a way to make non-mobile-optimized sites in general look better on narrow screen devices.
- With Virtual Viewport, pages that are optimized for narrow screens using media queries — if the virtual viewport is 980px for example, media queries that kick in at 640px or 480px or less will never be used, limiting the effectiveness of such responsive design techniques.
- To mitigate this problem, Apple introduced the "viewport meta tag" in Safari iOS to let web developers control the viewport's size and scale. Many other mobile browsers now support this tag, although it is not part of any web standard.

What the content properties mean:
width: width property controls the width of the layout viewport. It can be set to a specific number of pixels like width=600 or to the special value device-width, which is the width of the screen in CSS pixels at a scale of 100%. (screen.width in device pixels)
(There are corresponding height and device-height values, which may be useful for pages with elements that change size or position based on the viewport height.)

initial-scale: controls the zoom level when the page is first loaded. 
The maximum-scale, minimum-scale, and user-scalable properties control how users are allowed to zoom the page in or out.

Should I always use width=device-width?

- your site uses fluid desktop design, using it is better when viewing the site on mobile devices
- if your site is mobile specific design, USE IT
- if our site is a fixed layout desktop design, it's up to you. It doesn't matter

<meta name="viewport" content="target-densitydpi=device-dpi">
How is pixel and density related?
- On the same monitor if you adjust resolution, 
your desktop icon look smaller when you use higher resolution,
and bigger when you use low resolution

When you set target-densitydpi = device-dpi, on the phone, images/text will look smaller on a high resolution device and bigger on a low resolution device

So what's the problem with target-densitydpi = device-dpi ? We can adjust our monitor to overcome this...
The problem is that a high resolution device can be twice as high as a low resolution one with the same physical device size. Such big difference can make your web page shrink into half the size.

In CSS media queries, is max/min-width the same as max/min-device-width when you set width =device-width?
Yes. However, this only applies to portrait mode. It is different in landscape mode. max/min-width will update when you rotate the screen

