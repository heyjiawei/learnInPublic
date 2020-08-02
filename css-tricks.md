CSS tricks from Red Stapler

- use `background-repeat: round;` to have background images repeat and stretch until there is no room for another one to be added. When a new next image is added, all the current ones will compress to allow room.

- `box-shadow` is powerful

- Use `padding-top` to maintain CSS aspect-ratio

```
.box {
  width: 55%;
  height: 0;
  padding-bottom: calc(55% * 9/16); // For 16:9 ratio
  background: red;
}
```

- use `prefers-color-scheme` to detect if the user has requested the system to use a light or dark color theme. https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme

### Difference between masking and clipping

https://css-tricks.com/masking-vs-clipping-use/

- use `mask` to hide an element (or image). The `mask` property accepts a `linear-gradient()` property. `clip` property is deprecated; Use `clip-path` instead.
- Think about `<clipPath>` in SVG (or clip-path in CSS) as a way to cut a shape out of another shape. There’s no concept of opacity, or alpha channel, to gray area here. Parts of the element with a clipping path applied are literally visible or not visible. Clipping just uses the geometry of the shape. Because of this, certain visual elements won’t be applied. This includes, but is not limited to: stroke and stroke styles, gradients, and fill colors.
- masking is a way to apply complex, detailed, and shapes with varying opacity over another element. Unlike clipping, masking does respect stroke and stroke effects, but keep in mind that in a mask, it will treat white as an area that will be shown and black as an area to be masked, with the greyscale exposing each along that scale.

### Creating a reflection effect:

1. Using pseudo element `::after`, set background to image, move it down and rotate image to make image look vertically flipped.

```
.reflection {
  width: 500px;
  height: 300px;
  position: relative;
  background: url("img.png);
}

.reflection::after {
  content: "";
  background-image: inherit; // so it uses the same image
  width: inherit;
  height: inherit;
  position: absolute;
  bottom: -100%;
  transform: scaleY(-1);
}
```

2. reduce the height of `::after` image. You should also leave a small gap between the reflection and the image. Reduce the opacity of this image.

```
.reflection::after {
  content: "";
  background-image: inherit; // so it uses the same image
  width: inherit;
  height: 40%;
  position: absolute;
  bottom: -41%;
  transform: scaleY(-1);
  background-position: bottom;
  background-size: cover;
  opacity: 0.5;
}
```

3. Use pseudo element `::before` to create the white gradient background. You also need to set the z-index to but it place it on top.

```
.reflection::before {
  content: "";
  width: inherit;
  height: 42%;
  position: absolute;
  bottom: -42%;
  background: liner-gradient(to bottom, rgba(255, 255, 255, 0.3), white);
  z-index: 1;
}
```

4. Add `box-shadow` to the original image to create depth.

```
.reflection {
  width: 500px;
  height: 300px;
  position: relative;
  background: url("img.png);
  box-shadow: 0 50px 70px rgba(0,0,0,0.3), 0 10px 10px rgba(0,0,0,0.1);
}
```

### Water effect with CSS

- use SVG filter `<feTurbulence>` https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence
- the background image need not be .svg, it can be .png or .jpg
