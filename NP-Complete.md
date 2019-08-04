NP Complete
NP = Non-deterministic Polynomial time.
- NP is the set of decision problems (yes or no answers) for which yes answers can be verified in Polynomial time O(N^k) where N is the problem size and k is a constant, by a deterministic Turing machine.

What is a turing machine (TM)?
- There is an abstract computational model, an imaginary computer called a Turing machine (TM). This machine has a finite number of states, and an infinite tape, which has discrete cells into which a finite set of symbols can be written and read. 
- At any given time, the TM is in one of its states, and it is looking at a particular cell on the tape. Depending on what it reads from that cell, it can write a new symbol into that cell, move the tape one cell forward or backward, and go into a different state. 
- This is called a state transition. Amazingly enough, by carefully constructing states and transitions, you can design a TM, which is equivalent to any computer program that can be written. This is why it is used as a theoretical model for proving things about what computers can and cannot do.

There are two kinds of TM's that concern us here: deterministic and non-deterministic.
- Deterministic TM only has one transition from each state for each symbol that it is reading off the tap.
- Non-deterministic TM may have several such transitions - it is able to check several prossibilites simultaneously (like spawning multiple threads). The difference is that a non-deterministic TM can spawn as many threads as it wants, while real computer have a finite number of threads.

It has been proven that any problem that can be solved by a non-deterministic TM can be solved by a deterministic TM. However, it is not clear how much time it will take.

What does the statement P=NP means? 
- P=NP means that if a problem takes **polynomial time** on a non-deterministic TM, then one can build a deterministic TM which would solve the same problem also in **polynomial time**.
- However, so far, nobody have been able to show that it can be done. Yet at the same time, nobody have been able to prove that it cannot be done either.

What is NP Complete?
- NP Complete problems is a definition of sorts.
- The definition: Given a NP problem X, any NP problem Y can be reduced to X by a **polynomial reduction**

How is P = NP related to NP complete?
- The definition of NP-Complete means that if anyone ever comes up with a polynomial time solution to an NP-complete problem, they would be able to give a polynomial-time solution to any NP problem, which would prove P=NP
- Conversely, if anyone were to prove P != NP, then there is no way to solve an NP problem in polynomial time on a conventional computer
