Tree Traversal
Trees can be traversed in different orders
- inorder
	- (starts from the leave) leftmost first, then parent, then right sibling
	- the output of inorder traversal wll always produce keys in ascending order
	- the leftmost leave will always be smallest, followed by the root, followed by the rightmost leave
	- Used in binary search trees (BST)
- preorder
	- Start from the root, then traverse to the left leave. If there is a left subtree, go to the subtree's left leave. If there are no more left leave, go to the right sibling. (Essentially, always visit the left subtree first, followed by the right subtree)
	- used to get prefix expression
	- used to copy a tree
- postorder
	- (starts from the leave) Leftmost leave, then its right sibling, then the parent
	- used to delete a tree
	- used to get postfix expression