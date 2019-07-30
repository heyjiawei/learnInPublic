#Algorithms
[Top 10 Algorithms and Data Structures for Competitive Programming - GeeksforGeeks](https://www.geeksforgeeks.org/top-algorithms-and-data-structures-for-competitive-programming/#algo1) 
Graph Algorithms
     5     5
  s *-----*-----* t
     \              /
       ---------
         9		 
The shortest path is 9 while the MST is a 'different path' at 10

*a spanning tree means all vertices must be connected with the minimum possible number of edges. A spanning tree does not have cycles*
*In a weighted graph, a minimum spanning tree is a spanning tree that has minimum weight than all other spannning trees of the same graph*
*If a graph contains a "negative cycle" (i.e. a cycle whose edges sum to a negative value) that is reachable from the source, then there is no cheapest path: any path that has a point on the negative cycle can be made cheaper by one more walk around the negative cycle.*
*Articulation Point. A vertex in an undirected connected graph is an articulation point (or cut vertex) iff removing it (and edges through it) disconnects the graph. For a disconnected undirected graph, an articulation point is a vertex removing which increases number of connected components.*
BFS
- O(V+E)
DFS
- O(V+E)
Shortest Path from source node to all vertices - Dijkstra
- Greedy algorithm that always go for the next available lowest weighted path. Constructs a shortest path tree from the source node
- Does not work with negative weight edges
- Time Complexity of O(V^2). If the input graph is represented using adjacency list, it can be reduced to O(E log V) with binary heap
Shortest Path between every pair of vertices - Floyd Warshall Algorithm
- Compares all possible paths through the graph between each pair of vertices
- Can take negative weight edges but with no negative cycles
- O(V^3)
Prims Minimum Spanning Tree
- A greedy algorithm that constructs a minimum spanning tree by comparing whether the next edge it picks is of the smallest weight
- Works on undirected graphs only
- Works with negative weight edges
- Time Complexity of the above program is O(V^2). If the input graph is represented using adjacency list, then the time complexity of Prim’s algorithm can be reduced to O(E log V) with the help of binary heap.
Kruskal's Minimum Spanning Tree
- A greedy algorithm that constructs a minimum spanning tree by first sorting the edges in descending order of their weight. It then picks the smallest weighted edges to form the minimum spanning tree - that is, keep if a cycle is not formed, discard it otherwise
- O(ElogE) or O(ElogV). Sorting of edges takes O(ELogE) time. After sorting, we iterate through all edges and apply find-union algorithm. The find and union operations can take atmost O(LogV) time. So overall complexity is O(ELogE + ELogV) time. The value of E can be atmost O(V2), so O(LogV) are O(LogE) same. Therefore, overall time complexity is O(ElogE) or O(ElogV)
Topological Sorting (only for Directed Acyclic Graphs aka DAG)
- is a linear ordering of vertices such that for every directed edge uv, vertex u comes before v in the ordering.
- The first vertex in topological sorting is always a vertex with in-degree as 0 (a vertex with no incoming edges).
- O(V+E)
Articulation Points (Or cut vertices) in a graph
- O(V+E) to find all articulation points with DFS
- In DFS, we follow vertices in tree form called DFS tree. In DFS tree, a vertex u is parent of another vertex v, if v is discovered by u (obviously v is an adjacent of u in graph). In DFS tree, a vertex u is articulation point if one of the following two conditions is true.
1) u is root of DFS tree and it has at least two children.
2) u is not root of DFS tree and it has a child v such that no vertex in subtree rooted with v has a back edge to one of the ancestors (in DFS tree) of u.
Bridges in a graph
- An edge in an undirected connected graph is a bridge iff removing it disconnects the graph. For a disconnected undirected graph, definition is similar, a bridge is an edge removed which increases the number of disconnected components.
- We do DFS traversal of the given graph. In DFS tree an edge (u, v) (u is parent of v in DFS tree) is bridge if there does not exist any other alternative to reach u or an ancestor of u from subtree rooted with v.