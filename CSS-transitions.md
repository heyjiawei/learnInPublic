CSS transitions

- animations involving 2 states (initial and final state) are called implicit transitions
- transitions only visualize a property change from start to finish. If you need visualizations that loop, look into the CSS animation property

In css transition, we must set:
- transition property
- animation starting time (delay)
- how long the transition will last (duration)

timing function is optional. It determine how intermediate values of the transition timing are calculated. 

The auto value is often a very complex case. The specification recommends not animating from and to auto. Some user agents, like those based on Gecko, implement this requirement and others, like those based on WebKit, are less strict. Using animations with auto may lead to unpredictable results, depending on the browser and its version, and should be avoided.
```
div {
    transition: <property> <duration> <timing-function> <delay>;
}
```
