Supplier and Consumer Java8
A Supplier is any method which takes no arguments and returns a value. Its job is literally to supply an instance of an expected class. For instance, every reference to a 'getter' method is a Supplier
```
public Integer getCount(){
    return this.count;
}
```
Its instance method reference myClass::getCount is an instance of `Supplier<Integer>`.
	
A Consumer is any method which takes arguments and returns nothing. It is invoked for its side-effects. In Java terms, a Consumer is an idiom for a void method. 'setter' methods are a good example:
```
public void setCount(int count){
    this.count = count;
}
```
Its instance method reference myClass::setCount is an instance of `Consumer<Integer>` and IntConsumer.

A Function<A,B> is any method which takes an argument of one type, and returns another. This can be referred to as a 'transformation'. The Function<A,B> takes an A and returns a B. Notable is that for a given value of A, the function should always return a specific value of B. A and B can in fact be the same type, such as the following:
```
public Integer addTwo(int i){
    return i+2;
}
```
A Class method reference to a getter is also a function.
```
public Integer getCount(){
    return this.count;
}
```
Its class method reference MyClass::getCount is an instance of Function<MyClass,Integer> and `ToIntFunction<MyClass>`.	