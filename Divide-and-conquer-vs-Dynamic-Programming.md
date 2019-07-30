Divide and conquer vs Dynamic Programming

Dynamic programming is similar to the divide-and-conquer approach in that the solution of a large problem depends on previously obtained solutionsto easier subproblems. The significant difference, however, is that dynamic programming permits subproblems to overlap. 

By overlap, we mean that the subproblem can be used in the solution of two different subproblems. 

In contrast, the divide-and-conquer approach creates subproblems that are completely separate and can be solved independently

- this results in the primary difference that divide and conquer approach solves the problems in a top down manner (recursive), whereas dynamic programming solves it in a bottom up manner

For example, Fibonacci calculation. 
If we store the results of the subproblem, and these results will inturn help solve more sophiscated subproblems.

This can be conceptualized as a DAG where the nodes are the subproblems and the edges are references between the subproblems. The complexity of the algorithm can be determined by counting the number of edges.

