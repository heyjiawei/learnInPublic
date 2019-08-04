4 programming paradigms
Focus on abstraction, not syntax
Different languages are good for different things
Coin change problem with Object Oriented (OO) paradigm
In OO, all things are objects
An object is a way of encapsulating state and behaviour
State are things like fields, attributes, instances, variables
Behaviour is what you do with that state, like methods
The object is responsible for modifying its own state. It is called self
Objects can interact with each other
OO is good in modeling what we do in real life
It is reusable, ease of testing

Functional Programming
Racket, general purpose programming language from Lisp family
Lisp is the second oldest multipurpose high level programming language
Lisp stands for List Processor
Fortran is the oldest programming language
Pure functions don't ever store state or mutate the incoming data
output only depends on input
data and procedures (or state and behaviour in OO) are separated (not completely though)
Follows prefix notation
(+ (*3 5)
    (- 10 6))
gives 19
#move from left to right and 
uses a lot of recursion
No need to worry about concurrency and threading as there is no modification of state
easy to test as data in returns data out. No need to set the state like an object
reusable as no context is required
functional programs tend to be really short

Formal Logic
Language called Prolog
Ands, Or, Implications, Not etc.
Instead of describing HOW to solve a problem, it describes WHAT of the situation
You code these FACTS in the system. This language than tries to come up with a world where all of those are true
RULE specifies relationship between facts
It will then go through all the rules and pattern match variables that can fill in these rules and return those variables that matches as the result
It is essentially a Pattern Matching language
You can run the program forward and backward as long as you set the constrains correctly
You can run the program backward to generate the code for factorial
There is no concept of a return
Everything is encoded in the message signature so you can run it backwards

Procedural
Language used: Assembly
They are straightforward and written like as how we think - in procedures
Very easy but very tedious
They are no benefits of writing them this way except to get things done quickly