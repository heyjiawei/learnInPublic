#Determining Time and Space complexity of a tree
[artificial intelligence - Determining time and space complexity - Stack Overflow](https://stackoverflow.com/questions/2080050/determining-time-and-space-complexity)
Time
All the nodes in the tree have to be generated once at some point, and the assumption is that it costs a constant time c to generate a node (constant times can vary, you can just pick c to be the highest constant time to generate any node). The order is determined by the algorithm and ensures that nodes don't have to be repeatedly expanded.

nodes          b=2                        b=3
b^0             *                          *
              /   \               /        |        \
b^1          *     *             *         *         *
            / \   / \         /  |  \   /  |  \   /  |  \
b^2        *   * *   *       *   *   * *   *   * *   *   * 
               ...                        ...
As you can see in the figure it costs c*b^0 cost to calculate the first level - exactly c. The next level in the tree will contain a b^1 nodes and it costs c*b^1 = c*b to generate the second level. For the third level there will be b nodes again for every node in the second level, this means b*b^1 = b^2$ nodes and a cost of c*b^2.

At the deepest level of the tree at depth d there will be b^dnodes, the work at that level therefor is c*b^d. The total amount of work done to this point is c*b^0 + c*b^1 + ... + c*b^d. For the complexity we only look at the fastest rising term and drop the constant so we get:

O(c + c*b + ... + c*b^d) = O(c*b^d) = O(b^d).

In essence: The time is a function f(d) = SUM(i=1..d){c*b^i}, and O(f(d)) = O(b^d).

Space
The figure shows the algorithm at different stages for b=3. * indicates currently expanded nodes, ? indicates unknown nodes and + indicates nodes who's score has been fully calculated.

                    branching factor b = 3                     space
         *             *             *             *             b
       / | \         / | \         / | \         / | \         
      *  ?  ?       *  ?  ?       +  *  ?       +  +  *          b
    / | \         / | \            / | \            / | \      
   *  ?  ?       +  +  *          +  *  ?          +  +  *       b
 / | \               / | \         / | \               / | \   
*  ?  ?             +  *  ?       +  *  ?             +  +  *    b
In order to calculate the score of a node, you expand the node, pick a child and recursively expand until you reach a leaf node at depth d. Once a child node is fully calculated you move on to the next child node. Once all b child nodes are calculated the parents score is calculated based on the children and at that point the child nodes can be removed from storage. This is illustrated in the figure above, where the algorithm is shown at 4 different stages.

At any time you have one path expanded and you need c*b storage to store all the child nodes at every level. Here again the assumption is that you need a constant amount of space per node. The key is that any subtree can summarised by its root. Since the maximal length of a path is d, you will maximally need c*b*d of space. As above we can drop constant terms and we get O(c*b*d) = O(b*d).