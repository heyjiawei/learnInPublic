Java diamond operator

The diamond operator in java 7 allows code like the following:
```
List<String> list = new LinkedList<>();
```
However in Java 5/6, I can simply write:
This uses the raw type LinkedList. Raw types in Java effectively only exist for compatibility with pre-generics code and should never be used in new code unless you absolutely have to.
```
List<String> list = new LinkedList();
```
The diamond operator, however, allows the right hand side of the assignment to be defined as a true generic instance with the same type parameters as the left side... without having to type those parameters again. It allows you to keep the safety of generics with almost the same effort as using the raw type.