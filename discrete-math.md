#Discrete Math
Pigeon Hole principle
- Suppose that a flock of 20 pigeons flies into a set of 19 pigeonholes to roost. Because there are 20 pigeons but only 19 pigeonholes, a least one of these 19 pigeonholes must have at least two pigeons in it. To see why this is true, note that if each pigeonhole had at most one pigeon in it, at most 19 pigeons, one per hole, could be accommodated. This illustrates a general principle called the pigeonhole principle, which states that if there are more pigeons than pigeonholes, then there must be at least one pigeonhole with at least two pigeons in it.
- If “A” is the average number of pigeons per hole, where A is not an integer then
	- At least one pigeon hole contains ceil[A] (smallest integer greater than or equal to A) pigeons
	- Remaining pigeon holes contains at most floor[A] (largest integer less than or equal to A) pigeons

Example – 1: 
In a computer science department, 
a student club can be formed with either 10 members from first year 
or 8 members from second year 
or 6 from third year or 4 from final year. 
What is the minimum no. of students we have to choose randomly from department to ensure that a student club is formed?
Solution: we can directly apply from the above formula where,
q1 =10, q2 =8, q3 =6, q4 =4 and n=4
Therefore the minimum number of students required to ensure department club to be formed is
10 + 8 + 6 + 4 – 4 + 1 = 25





Combinatorics
There are two basic counting principles, sum rule and product rule.

Sum Rule – If a task can be done in one of n1 ways or one of n2 ways, where none of the set of n1 ways is the same as any of the set of n2 ways, then there are n1 + n2 ways to do the task.

Product Rule – If a task can be broken down into a sequence of k subtasks, where each subtask can be performed in n1, n2,.. nk respectively, then the total number of ways the task can be performed is n1 * n2 * ... * nk.

SO...
When to add or multiple probabilities?
- add probabilities when the events you are thinking about are alternatives.
	- 0 goals OR 1 goal OR 2 goals. The or keyword
	- You are looking for things that could not happen at the same time. In this case, in the same match

- multiple probabilites when you want 2 or more different things to happen consecutively (a.k.a at the same time). 
	- score 1 AND Leeds score 1 AND Arsenal score 2. The AND keyword
	- The events are independent. This means that they do not affect each other





Example 3 – How many distinct license plates are possible in the given format- 
Two alphabets in uppercase, followed by two digits then a hyphen and finally four digits. 
Sample- AB12-3456.

Solution – 
There are 26 possibilities for the each of the two letters and 10 possiblities for each of the digits. 
Therefore the total number of possibilities is – 26 * 26 * 10 * 10 * 10 * 10 * 10 * 10 = 676000000.


Example 4 – 
How many variable names of length upto 3 exist if the variable names are alphanumeric
and case sensitive with the restriction that the first character has to be an alphabet?

Solution – 
Let N_1, N_2, and N_3 denote the **number of possible variable names of length 1, 2, and 3.** 
Therefore, total number of variable names is  N_1 + N_2 + N_3.

For N_1 there are only 52 possibilities since the first character has to be an alphabet.
For N_2, there are 52 * 62 = 3224 possibilities
For N_3, there are 52 * 62 * 62 = 199888 possibilities
Therefore, total number of variable names = 52 + 3224 + 199888 = 203164




Principle of Inclusion-Exclusion principle
The principle of inclusion-exclusion says that 
in order to count only unique ways of doing a task, 
1. we must add the number of ways to do it in one way and the number of ways to do it in another and then 
2. subtract the number of ways to do the task that are common to both sets of ways.

- The principle of inclusion-exclusion is also known as the subtraction principle. 
For two sets of ways A_1 and A_2, the enumeration would like-
|A_1 union A_2| = |A_1| + |A_2| - |A_1 intercept A_2|

Example 1 – 
How many binary strings of length 8 either start with a ‘1’ bit or end with two bits ’00’?

Solution – 
If the string starts with one, there are 7 characters left which can be filled in 2^7 = 128 ways.
If the string ends with ’00’ then 6 characters can be filled in 2^6 = 64 ways.
Now if we add the above sets of ways and conclude that it is the final answer, then it would be wrong. 
This is because there are strings with start with ‘1’ and end with ’00’ both, and since they satisfy both criteria they are counted twice.
So we need to subtract such strings to get a correct count.
Strings that start with ‘1’ and end with ’00’ have five characters that can be filled in 2^5 = 32 ways.
So by the inclusion-exclusion principle we get-
Total strings = 128 + 64 – 32 = 160

