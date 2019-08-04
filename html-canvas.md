HTML Canvas performance tips
1. Pre-render similar/repeating objects on an **offscreen** canvas
- you can then render the offscreen image to your primary canvas as often as needed without repeating the steps needed to generate it
2. Avoid floating-point coordinates and use Integers instead
- subpixel rendering occurs when you use floating values and this will force the browser to do extra calculations (to create the anti-aliasing effect).
3. Cache various sizes of your image on offscreen canvas rather than constantly scaling them in drawImage(). The best case is not to scale the canvas. But if you have to do scaling, scaling up a small canvas will be faster than scaling down a big canvas
4. Use multiple canvases and layer them when doing complex scenes
- some objects need to move or change frequently, while others remain relatively static. WIth multiple canvases, you can reduce redundant recalculation on objects that do not move
5. Use plan CSS for background images/color
- if you have a static background image, you can draw it onto a plain ```<div>``` element and position it under the canvas.  This will negate the need to render the background to the canvas on every tick.
6. If your application uses canvas and doesn’t need a transparent backdrop, set the alpha option to false when creating a drawing context with HTMLCanvasElement.getContext(). This information can be used internally by the browser to optimize rendering.
7. Batch canvas calls together. For example, draw a polyline instead of multiple separate lines.
8. Render screen differences only, not the whole new state.
9. Avoid text rendering whenever possible.