Types of Number Patterns
- Arithmetic Sequence
	- sum = n (a1 + a2)/2
	- sum = n/2 [2(a1) + (n-1)d]
	- where a1 is the first term the common difference is d
- Geometric Sequence
- Triangular Numbers
	- n(n+1) / 2
	- The terms of a triangular sequence are related to the number of dots needed to create a triangle. You would begin forming a triangle with three dots; one on top and two on bottom. The next row would have three dots, making a total of six dots. The next row in the triangle would have four dots, making a total of 10 dots. The following row would have five dots, for a total of 15 dots. Therefore, a triangular sequence begins: “1, 3, 6, 10, 15…”)
- Square Numbers
	- the terms are the squares of their position in the sequence. A square sequence would begin with “1, 4, 9, 16, 25…”
- Cube Numbers
	- Same concept as squares, but this time, each term in the sequence is to the power of 3
- Fibonacci Numbers (Very important!)
	- The terms are found by adding the 2 previous terms
	- there is a geometric representation of this sequence. We start with two squares of size 1. Along one edge, we add a new square of size 2, and then another square of size 3. We keep adding squares to the longest edge of the rectangle as shown below. Since the edge of every new square is the sum of the edges of the two previous squares, we get the Fibonacci numbers. If we trace a curve along the corners of these squares, we can make a spiral. This spiral approximates the **Golden Spiral** 
		- While adding more squares, the geometric proportions of the rectangle becomes closer to a Golden rectangle.
		- The ratio of the sides of the golden rectangle is called the **Golden Ratio**
	- The Golden Ratio is the limit of the ratio of consecutive Fibonacci Numbers
		- Take n/(n-1) where n is a term in the Fibonacci Sequence
		- The ratio gets closer to 1.61803..
- Pascal's Triangle
	- infinite symmetric number pyramid
	- start with a single 1 at the top, and every number in one of the following rows is the sum of the two numbers above
	- numbers along the edges are always 1’s
	- Has many sequences within it
- Prime Numbers
	- the numbers that have no smaller factors other than 1
	- Related to Perfect number
		- A divisor of a number n is another number which divides n without remainder. 
		- E.g. n = 6, divisors of 6 are 1, 2, 3. Dividing 6 by any of these divisors will return another divisor and no remainder.
- Abundant Number
	- When the sum of the divisors is bigger than the number itself
	- the divisor of a number, n, is another number which divides n without leaving a remainder. A divisor need not be a prime number. 
		- E.g. divisors of 20 are 1, 2, 4, 5, 10
- Deficient Number
	- When the sum of the divisors is smaller than the number itself
- Perfect Number
	- When the sum of the divisors is equal to the number itself
	- All perfect numbers are even
	- They are VERY RARE
- Factorials
	- These are the numbers you get by multiplying 1, then 1 times 2, then 1 times 2 times 3, then 1x2x3x4, and so on. 
	- The ratio of one factorial to the previous one is always one more than the previous ratio.
		- E.g. 
		- 4! = 24, 3! = 6, 2! = 2
		- 24/6 = 4, 6/2 = 3

Circle Cutting Problem (maximum number of pieces that a pizza can be cut into by 7 knife cuts)
- Determining the maximum number of pieces in which it is possible to divide a circle for a given number of cuts is called the circle cutting or pancake cutting problem.
- The first cut creates 2 regions, and the nth cut creates n new regions
``
f(1)	=	2	
f(2)	=	2+f(1)	
f(n)	=	n+f(n-1).
Therefore, f(n) = 1/2 * (n^2 + n + 2)
or f(n) = 2 + 1/2 (n+2)(n-1)
``
Catalan number
- a sequence that occurs in various counting problems
catalan number N = (2N)! / (N+1)! * N!