Collection<? extends E> c means in Java?
PECS (short for "Producer extends and Consumer super") can be explained by : Get and Put Principle

"PECS" is from the collection's point of view. 
1. If you are only pulling items from a generic collection, it is a producer and you should use extends; 
2. if you are only stuffing items in, it is a consumer and you should use super. 
3. If you do both with the same collection, you shouldn't use either extends or super.

Suppose you have a method that takes as its parameter a collection of things, but you want it to be more flexible than just accepting a Collection<Thing>.

Case 1: You want to go through the collection and do things with each item.
Then the list is a producer, so you should use a Collection<? extends Thing>.

The reasoning is that a Collection<? extends Thing> could hold any subtype of Thing, and thus each element will behave as a Thing when you perform your operation. (You actually cannot add anything to a Collection<? extends Thing>, because you cannot know at runtime which specific subtype of Thing the collection holds.)

Case 2: You want to add things to the collection.
Then the list is a consumer, so you should use a Collection<? super Thing>.

The reasoning here is that unlike Collection<? extends Thing>, Collection<? super Thing> can always hold a Thing no matter what the actual parameterized type is. Here you don't care what is already in the list as long as it will allow a Thing to be added; this is what ? super Thing guarantees.