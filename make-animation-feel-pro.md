- animation can help create a connection between states

  - don't let the user feel the different states. Let them experience it as a single state

- straight js
- studies show that loaders make people perceive a shorter wait time

  - [eli fetch perceived performance](https://www.youtube.com/watch?v=USH4iPQ44LQ)

- to make it feel more realistic, have multiple things occurring at once.

  - actions happen on top of each other
  - This mimic reality

- make sure you are guiding the user. Don't abuse it to show off

- how to use chrome dev tools to check if you are repainting things or using hardware accelerating

  - Chrome dev tools rendering tab, check paint flashing
  - refresh and view animation. If there is a green box, it's repainting. That's not good.

- any one of these 3 CSS properties: transform, perspective, backface-visibility will cause browser to use hardware acceleration

- ease out for entrance, ease in for exit
- [cubic-bezier.com](cubic-bezier.com)
- [greensock.com/ease-visualizer](greensock.com/ease-visualizer)

Two types of animation that can't mix

- interruptive and movable animation
- time based animation

- use gsap timeline to debug your animation movement speed
