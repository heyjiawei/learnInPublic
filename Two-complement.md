Two's complement

It is an operation on binary numbers for Signed number representation

The two's complement of an N-bit number is defined as its complement with respect to 2N. For instance, for N = 3, number 010, the two's complement is 110, because 010 + 110 = 1000. (2 ^ 3 = 8, which is 1000)

To reverse the sign of any integer in this scheme, you can take the two's complement of its binary representation.
010 = 2, 110 = -2

Two's complement can  undergo addition, subtration, multiplication - all these identital to unsigned binary numbers. Any overflow beyond those bits are discarded from the result.

Distinguishing between positive and negative numbers:
Doing this, the first bit gets the role of the "sign" bit, as it can be used to distinguish between positive and negative decimal values. If the most significant bit is 1, then the binary can be said to be negative, where as if the most significant bit (the leftmost) is 0, you can say discern the decimal value is positive.

Let's try it with a mini-byte of 4 bits (we'll call it a nibble - 1/2 a byte).

0000 - zero
0001 - one
0010 - two
0011 - three
0100 to 0111 - four to seven
That's as far as we can go in positives. 23-1 = 7.

For negatives:

1111 - negative one
1110 - negative two
1101 - negative three
1100 to 1000 - negative four to negative eight

Note that you get one extra value for negatives (1000 = -8) that you don't for positives. This is because 0000 is used for zero. This can be consider as Number Line of computers.

The confusion:
The mechanism used in signed ints is called two's complement and essentially means taking 2^n, where n is the number of bits, and subtracting the absolute value of the integer to get its negative value.

-2 is therefore 1111 1110   
and not 1000 0010

One's complement
- is simply the value obtained by inverting all of the bits in a binary number (swapping 1’s and 0’s).
When you perform the NOT (~) operator on each bit, NOT will yield the inverted value (aka one's complement)

E.g. 
a => 0	~a => 1
a => 1 	~a => 0

Bitwise NOTing any number`x`yields`-(x + 1)`. For example,`~-5`yields`4`.

*Note that due to using 32-bit representation for numbers both`~-1`and`~4294967295`((2^32)-1) results in`0`
This means that the main disadvantage of ones’ complement, is that there are two valid representations for 0: all 0’s, and all 1’s.

How are 1 complement and 2 complement related?
2 complement of a number = 1 complement of a number + 1 (unsigned)
So 2 complement of 1 (00000001, hexa: 0x01) would be -1 (11111111, hexa: 0xFF)

When adding two 1 complement numbers, 
**If a carry results then it must be added back in (known as an end around carry).**
This happens for example in the following example where a negative number is added to a positive one (subtraction):

example: 33 - 7:

1.    00100001  or  0x21  (33)
2.    11111000  or  0xF9  (two’s complement of 7)
3.    ========
4.  1  00011001
5.    1 add end-around carry
6.    ========
7.    00011010  or  0x1A  (26)

However, with 2s, this is preadded in (1s complement + **1**)

Even though it takes an extra step to form the two’s complement of a number, two’s complement is pretty much universally used in today’s computer systems. It makes addition of a positive and negative number (i.e. subtraction) simpler: just add them as if they were both unsigned:

example: 33 - 7:

1.    00100001  or  0x21  (33)
2.    11111001  or  0xFA  (two’s complement of 7)
3.    ========
4.    00011010  or  0x1A  (26)




