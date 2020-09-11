CORS (Cross Origin Resource Sharing)

Same Origin Policy is a web security model.

- web pages only allow scripts of the same origin (same protocol, hostname (exact match required) and port number) to access data in a second web page.
- This prevents a malicious script from one page from obtaining sensitive data on another page through the page's DOM
- This is to ensure there is a strict separation between content provided by unrelated sites are maintained, so as to prevent loss of data confidentiality or integrity
- applies to data access from scripts, embedded resources across origins (such as img, CSS)

- By definition, two URLs with different domains have different origins.
  - But if windows share the same second-level domain, for instance john.site.com, peter.site.com and site.com (so that their common second-level domain is site.com), we can make the browser ignore that difference, so that they can be treated as coming from the “same origin” for the purposes of cross-window communication.
    - each such window should run the code: `document.domain = 'site.com';`

## `window.postMessage()`

- The `window.postMessage()` method safely enables cross-origin communication between Window objects

`targetWindow.postMessage(message, targetOrigin, [transfer]);`

- targetWindow is a handle to the window to which you want to send the message.
- message can be quite a few complex objects. However, functions cannot be sent as part of the message as the message data is serialized using the structured clone algorithm. The structured clone algorithm does not allow for functions.
- targetOrigin is a very important piece. It is the URI of the recipient page. **targetOrigin must match the domain of the targetWindow listener.** At the moment of dispatch (postMessage), if the targetOrigin, does match the host name of targetWindow’s page, it will fail to send.
  - It is possible to use `*` as the targetorigin, but beware! If `*` is used as targetOrigin, the message could be from anyone.
  - in production, on the receiving end, you should validate the receivers domain against the targetOrigin. If they do not match, do not accept the message.

> we may want to send a message from https://abcd.com to https://defg.com. So targetOrigin would be https://defg.com. and the recipient’s domain would be https://defg.com as well.

### Between windows communication

On page 1, the page that will be sending a message to page 2, you add:

```
function sendMessage(){
  let msg={pName : "Bob", pAge: "35"};
  // In production, DO NOT use '*', use toe target domain
  childwin.postMessage(msg,'*')// childwin is the targetWindow
  childwin.focus();
}
```

On page 2, the page that will be receiving the message, you add:

```
// Allow window to listen for a postMessage
window.addEventListener("message", (event)=>{
  // Normally you would check event.origin
  // To verify the targetOrigin matches
  // this window's domain
  let txt=document.querySelector('#txtMsg');
  // event.data contains the message sent
  txt.value=`Name is ${event.data.pName} Age is  ${event.data.pAge}` ;
});
```

- The callback function, an Arrow function in our case, processes the message.
  - The message is contained in event.data.
  - The targetOrigin is contained in event.origin.

### Between window and iframe communication

- An `<iframe>` tag hosts a separate embedded window, with its own separate document and window objects.
- `iframe.contentWindow` to get the window inside the `<iframe>`.
- `iframe.contentDocument` to get the document inside the `<iframe>`, shorthand for `iframe.contentWindow.document`.

- When we access something inside the embedded window, the browser checks if the iframe has the same origin. If they are **not of the same origin**, then the access is denied (writing to location is an exception, it’s still permitted)

- When you are reading/writing to an iframe of another origin,

  - we can get the reference to the inner window
    `let iframeWindow = iframe.contentWindow; // OK`
    - however, we can't get the document inside it
      `let doc = iframe.contentDocument; // ERROR`
    - we can't read the URL of the page in iframe
      `let href = iframe.contentWindow.location.href; // ERROR`
    - but we can WRITE into location (and thus load something else into the iframe)
      `iframe.contentWindow.location = '/'; // OK`

- if the `<iframe>` has the same origin, we can do anything with it

### sandbox iframe attribute

- The sandbox attribute allows for the exclusion of certain actions inside an `<iframe>` in order to prevent it executing untrusted code
- It “sandboxes” the iframe by treating it as coming from another origin and/or applying other limitations.
- There’s a “default set” of restrictions applied for `<iframe sandbox src="...">`.
  - an empty "sandbox" attribute puts the strictest limitations possible
  - but we can put a space-delimited list of those that we want to lift, like this: `<iframe sandbox="allow-forms allow-popups">`
