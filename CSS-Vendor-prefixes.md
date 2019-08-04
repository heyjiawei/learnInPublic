#CSS, Vendor prefixes
The most common vendor prefixes are outlined here:
Mozilla Firefox: -moz-
Microsoft Internet Explorer: -ms-
Webkit (Google Chrome and Apple Safari): -webkit-

```
div {
  -webkit-box-sizing: content-box;
     -moz-box-sizing: content-box;
          box-sizing: content-box;
}
```

At the early stage when CSS3 was introduced, browsers gradually began to support different properties and values, including the box-sizing property, by way of vendor prefixes.

As parts of the CSS3 specification are finalized and new browser versions are released, these vendor prefixes become less and less relevant.

As time goes on, vendor prefixes are unlikely to be a problem; however, they still provide support for some of the older browsers that leveraged them.

Vendor prefixes may be seen on both properties and values, all depending on the CSS specification.
properties are like -webkit-box-sizing where box-sizing is the property.
values are like content-box