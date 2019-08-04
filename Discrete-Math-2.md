#Discrete Math 2
Permutation
The count of "ways" to select a particular number of elements from a set, where the **order** relative order of elements matter. This means if that if the english alphabet i appears twice, we define each i as a different element. Hence, being ordered behind i_1 and i_2 counts as 2

The ordered arrangement of R elements in a set is called an R permutation. It is represented in the following equation for 1 <= R <= N
P(N, R) = N! / (N - R)!

(N - R)! is the number of elements you don't have to arrange.
The equation takes into the account the number of elements you don't have to arrange so we can use just factorials to solve the question

Combination
The count of "ways" to select a particluar number of elements from a set, where the order does not matter. If the english alphabet i appears twice, we define i element as the same element and hence, being ordered behind i counts as 1, regardless if they are i_1 or i_2

Combination is just permutation without order. This means that in the equation, we intentionally remove the order (by dividing by the factorial) to get the combination count.

C(N, R) = P(N, R) / P (R, R)
			= N! / (N - R)! R!

So for i_1, i_2, i_3. It would have a permutation of 3! but a combination of 3!/3! = 1

