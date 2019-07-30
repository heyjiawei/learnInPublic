#Combinatorial Game Theory
Combinatorial games
- Combinatorial games are two-person games with perfect information and no chance moves (no randomization like coin toss is involved that can effect the game). These games have a win-or-lose or tie outcome and determined by a set of positions, including an initial position, and the player whose turn it is to move.
- In order to prevent such looping situations in games, there is actually a “50-move rule” according to which the game is considered to be drawn if the last 50 moves by each player have been completed without the movement of any pawn and without any capture.

Game theory
- On the other hand, Game theory in general includes games of chance, games of imperfect knowledge, and games in which players can move simultaneously.

Combinatorial game theory includes both combinatorial game and game theory!

There are 2 parts to Combinatorial Game Theory (CGT)
Partisan Games - Partisan Games the moves for all the players are not the same. E.g. Chess
Impartial Games - all the possible moves from any position of game are the same for the players. E.g Game of Nim

XOR (aka Exclusive OR)
gives a true output when the *number of true inputs is odd*
This means that 1 (01) and 2 (10) will return true for XOR

Game of Nim
- Given a number of piles in which each pile contains some numbers of stones/coins. In each turn, a player can choose only one pile and remove any number of stones (at least one) from that pile. The player who cannot move is considered to lose the game (i.e., one who take the last stone is the winner). 
This game depends on two factors-
1. The player who starts first.
2. The initial configuration of the piles/heaps.

Nim-Sum : The cumulative XOR value of the number of coins/stones in each piles/heaps at any point of the game is called Nim-Sum at that point.
E.g. 3 XOR 4 XOR 5 = 2

If both A and B play optimally (i.e- they don’t make any mistakes), then the 
1. player starting first is guaranteed to win if the Nim-Sum at the beginning of the game is non-zero. Otherwise, if the Nim-Sum evaluates to zero, then player A will lose definitely.








