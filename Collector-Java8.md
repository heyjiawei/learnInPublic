Collector Java 8
Collector is the interface class and Collectors is the implmentation class

A Collector is similar to a factory function. It allows you to create custom reduction functions.
You need to provide 4 functions:
1. creation of a new result container (supplier())
2. incorporating a new data element into a result container (accumulator())
3. combining two result containers into one (combiner())
4. performing an optional final transform on the container (finisher())

A sequential implementation of a reduction using a collector would create a single result container using the supplier function, and invoke the accumulator function once for each input element. A parallel implementation would partition the input, create a result container for each partition, accumulate the contents of each partition into a subresult for that partition, and then use the combiner function to merge the subresults into a combined result.

```
static <T,R> Collector<T,R,R> of(Supplier<R> supplier,
					 BiConsumer<R,T> accumulator,
					 BinaryOperator<R> combiner,
					 Collector.Characteristics... characteristics)
					 
 static <T,A,R> Collector<T,A,R> of(Supplier<A> supplier,
				   BiConsumer<A,T> accumulator,
				   BinaryOperator<A> combiner,
				   Function<A,R> finisher,
				   Collector.Characteristics... characteristics)
```
 Collector<T,A,R>
T denotes the generic type of the stream elements
A represents the type of the supplier or type of the accumulator where the partial results will be accumulated
R is the type of result to be returned at the end. If the IDENTITY_FINISH characteristic is given then both A and R will be of the same type.


Collector.Characteristics
Collectors also have a set of characteristics, such as Characteristics.CONCURRENT, that provide hints to the reduction process to provide better performance. Collector.Characteristics enum contains three characteristics as:

UNORDERED: Indicates that the collection operation does not commit to preserving the encounter order of input elements. This might be true if the result container has no intrinsic order, such as a Set.
CONCURRENT: Indicates that this collector is concurrent, meaning that the result container can support the accumulator function being called concurrently with the same result container from multiple threads. Remember marking CONCURRENT doesn’t always execute concurrently, if not marked as UNORDERED or applied to an unordered data source like Set etc.
IDENTITY_FINISH: Setting on this property returns the result container as the final result with out calling Collector.finish().


`Supplier<A> supplier()`
The supplier method will return an empty result container whenever invoked. Remember, this method will be called only once if reduction operation is requested for sequential execution and multiple times if parallel execution.
	
`BiConsumer<A, T> accumulator()`
Accumulator will define the behaviour of the accumulation process. You might be already noticed that, though it is BiConsumer it takes partial result container and a new element as inputs and performs the configured task.
	
`BinaryOperator<A> combiner()`
Combiner defines what to be done if two partial results are provided. As we know in the parallelization case, the complete dataset will be splitted to multiple chunks and performed separately, so combiner will merge the two partial results into one. The BinaryOperator's functional decsriptor is exactly matching with this task: (partial1, partial2) -> partial1.merge(partial2)
	
`Function<A, R> finisher()`
This defines the final transformation to be done to the result container after all the elements are processed.
	
`Set<Characteristics> characteristics()`
Returns the immutable set of Characteristics, defining the behavior of the collector.

```
public class Employee {
    public String name;
    public String empid;
    public String technology;
    public double salary;
}

public class ToXMLCollector implements Collector<Employee, StringBuffer, String> {

    final String xmlstr = ''\n   <employee eid='%s'>\n\t" + "<name>%s</name>\n\t"
                + "<tech>%s</tech>\n\t<salary>%s</salary>\n   </employee>";

    public Supplier<StringBuffer> supplier() {
        return StringBuffer::new;
    }

    public BiConsumer<StringBuffer, Employee> accumulator() {
        return (sb, e) -> sb.append(String.format(xmlstr, e.empid, e.name, e.technology, e.salary));
    }

    public BinaryOperator<StringBuffer> combiner() {
        return (sb1, sb2) -> sb1.append(sb2.toString());
    }

    public Function<StringBuffer, String> finisher() {
        return sb -> String.format("<employees> %s \n</employees>", sb.toString());
    }

    public Set<Characteristics> characteristics() {
        return EnumSet.of(CONCURRENT);
    }


    public static void main(String[] args) {
        Set<Employee> emps = Database.employees();
        String xmlstr = emps.parallelStream().collect(new ToXMLCollector());
        System.out.println(xmlstr);
    }
}
```

we can also create a Collector like this:
```
Collector.<Employee, StringBuffer, String>of(StringBuffer::new,
  (sb, e) -> sb.append(String.format(xmlstr, e.empid, e.name, e.technology)),
     (sb1, sb2) -> sb1.append(sb2.toString()),
        sb -> sb.insert(0, "<employees>").append("\n</employees>").toString(),
           Collections.emptySet());
```