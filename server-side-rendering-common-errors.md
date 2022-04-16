# What is the link between isomorphic apps and server side rendering?

Isomorphic apps aims to have your application and view logic be executed on both the server and the client. 

**This means JavaScript written will be ran on both browser and server.**

This opens up all sorts of doors — performance optimizations, better maintainability, SEO-by-default, and more stateful web apps.

# Common errors faced by Isomorphic apps

If you are not using a framework or your framework doesn't explicitly segregate what gets ran on server and what gets ran on browser, 
you may face these problems if you come from browser land:

1. using `window` APIs can throw errors on Node.js environment

Vice versa if you are coming from Node.js:

1. using built-in globals in Node.js (aside from global)

Solution:
- You need to be aware whenever you use "global objects" (or standard built-in objects). 
Here, "global objects" refer to [objects in the global scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
Instead of using `window`, `global` and `self` (to be accurate, `window.self`. Used in web workers), you can start using [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis). 

- take note of when `globalThis` is supported though. You may need to polyfill it yourself if you are supporting older browsers.

2. rendering time-based components

When rendering in a server environment, often time the server isn't located in the same area as the user. 
Even if it does, the server might not use the same timezone as the users. 
If your rendered content is time-based and your code uses the current environment's time, you can get the "wrong" time if that code renders on server.

Possible solution:
- don't render time-based components on server. Only render them on browsers
