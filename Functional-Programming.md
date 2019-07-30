Functional Programming
Declarative vs Imperative programming
Imperative tells you what to do at each step
They are details, command like functions
Usually has a lot of for loops and can easily cause the pyramid of doom
When the logic structure changes, a lot of code needs to be rewritten
Declarative tells you what they are going to do
uses a lot of intermediate functions
less rewriting when logic changes since the the functions are many and small

Rule 1 of functional program, use functions over for loops. 
Go for declarative programming
use map, filter, reduce instead of for loops

Rule 2 of functional programming, the same input always returns the same result
This is where pure and impure functions are introduced
Impure functions
Uses a lot of blackbox functions (which is a bad idea) and makes it difficult to debug
e.g.
<code>
  let myfavouriteThing - 'whisky'
  clarifyFav()
  describeFav()
  // do something here
  makeFamilyHappy()
  // do more things here
  describeFav()
</code>

Pure functions
explicitly pass arguments 
makes debugging easy when the description gets weird
When your functions always return the same output for the same input entered, you get referential transparency
Your unit testing is going to be more easy as you now have gurantee that anything that calls this function will pass
Enables easier composition, which is plugging of multiple functions to make super functions
compose function runs from right to left (the rightmost functions gets called first). If you split them into multiple lines, the functions look like they run from bottom to top

Rule 3 of functional programming, each function does only one thing
The use of currying (its named after a mathematician) is to allow functions to be called in stages