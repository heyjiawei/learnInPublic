Spring Framwork key concepts
Firstly, the difference in Java programming language.
To develop a desktop application software, you use core java or Java SE (Java Standard Edition)
- acronym for core java is JSE-Java Standard Edition. It is base for any technology such as JEE, Spring, Spring MVC, Hibernate even Android.
To develop web application, you use J2EE or JEE, aka Java Enterprise Edition
- It is a request response model
1. Server should be able to accept the request from the client. And should be able to send back the response. This is solved with J2EE container as this container contains components like JSP/ Servlet. The J2EE container also contains infrastructure code - e.g. when client sends a request, then J2EE should invoke the corresponding servlet/jsp
2. Server should be able to do some transactions. This is solved with EJB
3. Server should be able to communicate with the database. This is solved with JDBC
To develop mobile application, you can use Java Platform, Micro Edition (Java ME), ANDROID

Spring framework targets to make J2EE development easier to use and promotes good programming practices by enabling a POJO (Plain Old Java Object) based programming model.  
- It refers to a Java Object that isn't bogged down by framework extensions by freeing your code from interfaces - your code isn't directly tied to any interface. Instead, the responsibility of connecting it to a JMS queue is moved into annotations, which are easier to update. Or not have any specific annotations.
- POJO always aims for ways to reduce coupling between your code and existing libraries. This is a principle concept of dependency injection, where the way your service is utilized should be part of wiring the application and not the service itself.

Some acrynoms:
JDBC = Java Database Connectivity
It is an API which defines how a client may access a database.
It provides methods to query and update data in a database and is oriented towards traditional databases

ORM = Object Relational Mapping
Is a technique that lets you query and manipulate data from a database using an object-oriented paradigm. When talking about ORM, most people are referring to a library that implements the Object-Relational Mapping technique

IoC = Inversion of Control
DI = Dependency Injection
When writing a complex Java application, application classes should be as independent as possible of other Java classes to increase the possibility to reuse these classes and to test them independently of other classes while unit testing. **Dependency Injection helps in gluing these classes together and at the same time keeping them independent.

AOP = Aspect Oriented Programming
In applications, there are functions that span multiple points in an application. Some examples of them are logging, declarative transactions, security, caching, etc. They are cross-cutting concerns and are usually, conceptually separate from the application's business logic. AOP helps you decouple cross-cutting concerns from the objects that they affect.

The AOP module of Spring Framework provides an aspect-oriented programming implementation allowing you to define method-interceptors and pointcuts to cleanly decouple code that implements functionality that should be separated.

Tools used together with Spring framework:
1. Hibernate ORM
Hibernate is an OOP mapping tool for Java. It provides a framework for mapping an object-oriented domain model to a relational database. Hibernate handles object-relational impedance mismatch problems by replacing direct, persistent database accesses with high-level object handling functions.

Hibernate's primary feature is mapping from Java classes to database tables, and mapping from Java data types to SQL data types. Hibernate also provides data query and retrieval facilities. It generates SQL calls and relieves the developer from the manual handling and object conversion of the result set.

AspectJ = a seamless aspect-oriented extension to the Javatm programming language

BeanFactory provides the configuration framework and basic functionality
ApplicationContext adds mroe enterprise-specific functionality. superset of the beanFactory.
A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container. Otherwise, a bean is simply one of many objects in your application. Beans, and the dependencies among them, are reflected in the configuration metadata used by a container.

ApplicationContext represents the Spring IoC container
responsible for instantiating, configuring, and assembling the aforementioned beans.
container gets its instructions on what objects to instantiate, configure, and assemble by reading configuration metadata
configuration metadata is represented in XML, Java annotations, or Java code. 


Spring BeanFactory Container
- The BeanFactory and related interfaces, such as BeanFactoryAware, InitializingBean, DisposableBean, are still present in Spring for the purpose of backward compatibility with a large number of third-party frameworks that integrate with Spring.

- The most commonly used BeanFactory implementation is the XmlBeanFactory class. This container reads the configuration metadata from an XML file and uses it to create a fully configured system or application.

- The BeanFactory is usually preferred where the resources are limited like mobile devices or applet-based applications (where data volume and speed is significant). Thus, use an ApplicationContext unless you have a good reason for not doing so.

Application context container
- Similar to BeanFactory, it can load bean definitions, wire beans together, and dispense beans upon request. Additionally, it adds more enterprise-specific functionality such as the ability to resolve textual messages from a properties file and the ability to publish application events to interested event listeners.

What is a bean, really?
A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container. These beans are created with the configuration metadata that you supply to the container. For example, in the form of XML <bean/> definitions 

Bean definition contains the information called configuration metadata, which is needed for the container to know the following −
- How to create a bean
- Bean's lifecycle details
- Bean's dependencies

Spring Configuration Metadata can be provided to the Spring Container in these ways:
- XML based configuration file
- Annotation based configuration
- Java based configuration

Bean scopes
prototype = force Spring to produce a new bean instance each time one is needed

singleton (default) = want Spring to return the same bean instance each time one is needed. This single instance is stored in a cache of such singleton beans, and all subsequent requests and references for that named bean return the cached object.

request = This scopes a bean definition to an HTTP request. Only valid in the context of a web-aware Spring ApplicationContext.

session = This scopes a bean definition to an HTTP session. Only valid in the context of a web-aware Spring ApplicationContext.

global-session = This scopes a bean definition to a global HTTP session. Only valid in the context of a web-aware Spring ApplicationContext.


Bean Lifecycle methods
The org.springframework.beans.factory.InitializingBean interface specifies a single method −
```
void afterPropertiesSet() throws Exception;
```
Thus, you can simply implement the above interface and initialization work can be done inside afterPropertiesSet() method as follows −
```
public class ExampleBean implements InitializingBean {
   public void afterPropertiesSet() {
      // do some initialization work
   }
}
```
In the case of XML-based configuration metadata, you can use the init-method attribute to specify the name of the method that has a void no-argument signature. For example −
```
<bean id = "exampleBean" class = "examples.ExampleBean" init-method = "init"/>
```
Following is the class definition −
```
public class ExampleBean {
   public void init() {
      // do some initialization work
   }
}
```
For Destruction callback, use the DisposableBean interface for Java callbacks
For xml config metadata, use
```
<bean id = "exampleBean" class = "examples.ExampleBean" destroy-method = "destroy"/>
```
Following is the class definition −
```
public class ExampleBean {
   public void destroy() {
      // do some destruction work
   }
}
```
It is recommended that you do not use the InitializingBean or DisposableBean callbacks, because XML configuration gives much flexibility in terms of naming your method.

If you have too many beans having initialization and/or destroy methods with the same name, you don't need to declare init-method and destroy-method on each individual bean. Instead, the framework provides the flexibility to configure such situation using default-init-method and default-destroy-method attributes on the <beans> element as follows −

```
<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd"
   default-init-method = "init" 
   default-destroy-method = "destroy">

   <bean id = "..." class = "...">
      <!-- collaborators and configuration for this bean go here -->
   </bean>
   
</beans>
```
Bean definition Inheritance
A bean definition can contain a lot of configuration information, including constructor arguments, property values, and container-specific information such as initialization method, static factory method name, and so on.

A child bean definition inherits configuration data from a parent definition. The child definition can override some values, or add others, as needed.
```
<?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

   <bean id = "helloWorld" class = "com.tutorialspoint.HelloWorld">
      <property name = "message1" value = "Hello World!"/>
      <property name = "message2" value = "Hello Second World!"/>
   </bean>

   <bean id =" helloIndia" class = "com.tutorialspoint.HelloIndia" parent = "helloWorld">
      <property name = "message1" value = "Hello India!"/>
      <property name = "message3" value = "Namaste India!"/>
   </bean>
</beans>

```

Bean Definition Template
- You can create a Bean definition template, which can be used by other child bean definitions without putting much effort. 
- While defining a Bean Definition Template, you should not specify the class attribute and should specify **abstract attribute** and should specify the abstract attribute with a value of true 

```
<?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

   <bean id = "beanTeamplate" abstract = "true">
      <property name = "message1" value = "Hello World!"/>
      <property name = "message2" value = "Hello Second World!"/>
      <property name = "message3" value = "Namaste India!"/>
   </bean>

   <bean id = "helloIndia" class = "com.tutorialspoint.HelloIndia" parent = "beanTeamplate">
      <property name = "message1" value = "Hello India!"/>
      <property name = "message3" value = "Namaste India!"/>
   </bean>
   
</beans>
```

Dependency Injection (DI)
- When writing a complex Java application, application classes should be as independent as possible of other Java classes to increase the possibility to reuse these classes and to test them independently of other classes while unit testing.
- Dependency Injection (or sometime called wiring) helps in gluing these classes together and at the same time keeping them independent.

Class Constructor DI
- in case you are passing a reference to an object, you need to use ref attribute of <constructor-arg> tag and if you are passing a value directly then you should use value attribute

```
<bean id = "bar" class = "x.y.Bar"/>
<constructor-arg ref = "bar"/>

<constructor-arg type = "int" value = "2001"/>

<constructor-arg index = "0" value = "2001"/>
```
- Constructor-based DI is accomplished when the container invokes a class constructor with a number of arguments, each representing a dependency on the other class.

Setter Method DI
- Setter-based DI is accomplished by the container calling setter methods on your beans after invoking a **no-argument constructor or no-argument static factory method to instantiate your bean.**
- The only difference is inside the <bean> element where we have used <constructor-arg> tags for constructor-based injection and <property> tags for setter-based injection
- you need to use ref attribute of <property> tag and if you are passing a value directly then you should use value attribute.

The setter & getter method for SpellChecker is in TextEditor.java
```
package com.tutorialspoint;

public class TextEditor {
   private SpellChecker spellChecker;

   // a setter method to inject the dependency.
   public void setSpellChecker(SpellChecker spellChecker) {
      System.out.println("Inside setSpellChecker." );
      this.spellChecker = spellChecker;
   }
   // a getter method to return spellChecker
   public SpellChecker getSpellChecker() {
      return spellChecker;
   }
   public void spellCheck() {
      spellChecker.checkSpelling();
   }
}
```
- Here you need to check the naming convention of the setter methods. To set a variable spellChecker we are using setSpellChecker() method which is very similar to Java POJO classes.
```
package com.tutorialspoint;

public class SpellChecker {
   public SpellChecker(){
      System.out.println("Inside SpellChecker constructor." );
   }
   public void checkSpelling() {
      System.out.println("Inside checkSpelling." );
   }
}
```
In Beans.xml
```
<?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

   <!-- Definition for textEditor bean -->
   <bean id = "textEditor" class = "com.tutorialspoint.TextEditor">
      <property name = "spellChecker" ref = "spellChecker"/>
   </bean>

   <!-- Definition for spellChecker bean -->
   <bean id = "spellChecker" class = "com.tutorialspoint.SpellChecker"></bean>

</beans>
```
XML shortforms:
- replacing property with p-namespace
```
<?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

   <bean id = "john-classic" class = "com.example.Person">
      <property name = "name" value = "John Doe"/>
      <property name = "spouse" ref = "jane"/>
   </bean>

   <bean name = "jane" class = "com.example.Person">
      <property name = "name" value = "John Doe"/>
   </bean>

</beans>
```
Is the same as 
```
<?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xmlns:p = "http://www.springframework.org/schema/p"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

   <bean id = "john-classic" class = "com.example.Person"
      p:name = "John Doe"
      p:spouse-ref = "jane"/>
   </bean>

   <bean name =" jane" class = "com.example.Person"
      p:name = "John Doe"/>
   </bean>

</beans>
```
- note the difference in specifying primitive values and object references with p-namespace.
- The -ref part indicates that this is not a straight value but rather a reference to another bean.

 A good rule of thumb to use constructor arguments for mandatory dependencies and setters for optional dependencies.
 
 The object does not look up its dependencies and does not know the location or class of the dependencies
 
The code is cleaner with the DI principle and decoupling is more effective when objects are provided with their dependencies.
 
 Inner Beans and DI into them
 - You should use this pattern when they shouldn't be accessible from anywhere else but the class that defines them
 - inner beans are beans that are defined within the scope of another bean. Thus, a <bean/> element inside the <property/> or <constructor-arg/> elements is called inner bean
```
<?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

   <!-- Definition for textEditor bean using inner bean -->
   <bean id = "textEditor" class = "com.tutorialspoint.TextEditor">
      <property name = "spellChecker">
         <bean id = "spellChecker" class = "com.tutorialspoint.SpellChecker"/>
      </property>
   </bean>

</beans>
```
 
 Injecting a Collection (plural values like Java Collection types such as List, Set, Map, and Properties)
 <list> = Helps in wiring and injecting a list of values, allowes duplicates
<set> = Helps in wiring a set of values but without any duplicates
<map> = inject a collection of name-value pairs where name and value can be of any type
<prop>	 = injecting a collection of name-value pairs where the name and value are both Strings
 
 You can use either <list> or <set> to wire any implementation of java.util.Collection or an array.
 
 Injecting Bean references
 ```
 <?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

   <!-- Bean Definition to handle references and values -->
   <bean id = "..." class = "...">

      <!-- Passing bean reference  for java.util.List -->
      <property name = "addressList">
         <list>
            <ref bean = "address1"/>
            <ref bean = "address2"/>
            <value>Pakistan</value>
         </list>
      </property>
      
      <!-- Passing bean reference  for java.util.Set -->
      <property name = "addressSet">
         <set>
            <ref bean = "address1"/>
            <ref bean = "address2"/>
            <value>Pakistan</value>
         </set>
      </property>
      
      <!-- Passing bean reference  for java.util.Map -->
      <property name = "addressMap">
         <map>
            <entry key = "one" value = "INDIA"/>
            <entry key = "two" value-ref = "address1"/>
            <entry key = "three" value-ref = "address2"/>
         </map>
      </property>
   </bean>

</beans>
 ```
 Injecting Null and Empty Strings
 
 ```
 <bean id = "..." class = "exampleBean">
   <property name = "email" value = ""/>
</bean>
 ```
 
 Autowiring Beans in XML
 Here are the autowiring modes:
 no = default setting. No autowiring
 
 byName = Autowiring by property name. Spring container looks at the properties of the beans on which autowire attribute is set to byName in the XML configuration file. It then tries to match and wire its properties with the beans defined by the same names in the configuration file.
 ```
 <?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

   <!-- Definition for textEditor bean -->
   <bean id = "textEditor" class = "com.tutorialspoint.TextEditor" autowire = "byName">
      <property name = "name" value = "Generic Text Editor" />
   </bean>

   <!-- Definition for spellChecker bean -->
   <bean id = "spellChecker" class = "com.tutorialspoint.SpellChecker"></bean>

</beans>
 ```
 byType = Autowiring by property datatype. Spring container looks at the properties of the beans on which autowire attribute is set to byType in the XML configuration file. It then tries to match and wire a property if its type matches with exactly one of the beans name in configuration file. If more than one such beans exists, a fatal exception is thrown.
 ```
 <?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

   <!-- Definition for textEditor bean -->
   <bean id = "textEditor" class = "com.tutorialspoint.TextEditor" autowire = "byType">
      <property name = "name" value = "Generic Text Editor" />
   </bean>

   <!-- Definition for spellChecker bean -->
   <bean id = "SpellChecker" class = "com.tutorialspoint.SpellChecker"></bean>

</beans>
 ```
 constructor = Similar to byType, but type applies to constructor arguments. If there is not exactly one bean of the constructor argument type in the container, a fatal error is raised.
 ```
 <?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

   <!-- Definition for textEditor bean -->
   <bean id = "textEditor" class = "com.tutorialspoint.TextEditor" 
      autowire = "constructor">
      <constructor-arg value = "Generic Text Editor"/>
   </bean>

   <!-- Definition for spellChecker bean -->
   <bean id = "SpellChecker" class = "com.tutorialspoint.SpellChecker"></bean>

</beans>
 ```
 autodetect = Spring first tries to wire using autowire by constructor, if it does not work, Spring tries to autowire by byType.
 
 Limits of autowiring:
 1. Overriding possibility. 
 You can still specify dependencies using <constructor-arg> and <property> settings which will always override autowiring.
 
 2. Primitive data types
You cannot autowire so-called simple properties such as primitives, Strings, and Classes.

 3. Confusing nature
 Autowiring is less exact than explicit wiring, so if possible prefer using explict wiring.
 
 Annotation based configuration
 - anotation injection is performed before XML injection. Thus, XML injection will override annotation injection if both approaches are used
 - You need to turn it 'on'
```
<?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xmlns:context = "http://www.springframework.org/schema/context"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
   http://www.springframework.org/schema/context
   http://www.springframework.org/schema/context/spring-context-3.0.xsd">

   <context:annotation-config/>
   <!-- bean definitions go here -->

</beans>
```
 
 @Required = applies to bean property setter methods. Indicates that the affected bean property must be populated in XML configuration file at configuration time.
 
 @Autowired = can be used to autowire bean on the setter method just like @Required annotation, constructor, a property or methods with arbitrary names and/or multiple arguments.
 
- On setter methods to get rid of the <property> element in XML configuration file.
- When Spring finds an @Autowired annotation used with setter methods, it tries to perform **byType** autowiring on the method.

```
package com.tutorialspoint;

import org.springframework.beans.factory.annotation.Autowired;

public class TextEditor {
   private SpellChecker spellChecker;

   @Autowired
   public void setSpellChecker( SpellChecker spellChecker ){
      this.spellChecker = spellChecker;
   }
   public SpellChecker getSpellChecker( ) {
      return spellChecker;
   }
   public void spellCheck() {
      spellChecker.checkSpelling();
   }
}
```
On .xml
```
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xmlns:context="http://www.springframework.org/schema/context"
   xsi:schemaLocation="http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans.xsd
   http://www.springframework.org/schema/context
   http://www.springframework.org/schema/context/spring-context.xsd">

   <context:annotation-config/>

   <!-- Definition for textEditor bean without constructor-arg  -->
   <bean id="textEditor" class="com.tutorialspoint.TextEditor"></bean>

   <!-- Definition for spellChecker bean -->
   <bean id="spellChecker" class="com.tutorialspoint.SpellChecker"></bean>

</beans>
```
 
 @Autowired on properties (get rid of the setter methods)
 ```
 package com.tutorialspoint;

import org.springframework.beans.factory.annotation.Autowired;

public class TextEditor {
   @Autowired
   private SpellChecker spellChecker;

   public TextEditor() {
      System.out.println("Inside TextEditor constructor." );
   }
   
   public SpellChecker getSpellChecker( ){
      return spellChecker;
   }
   
   public void spellCheck(){
      spellChecker.checkSpelling();
   }
}
 ```
 On xml
 ```
 <?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xmlns:context="http://www.springframework.org/schema/context"
   xsi:schemaLocation="http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans.xsd
   http://www.springframework.org/schema/context
   http://www.springframework.org/schema/context/spring-context.xsd">

   <context:annotation-config/>

   <!-- Definition for textEditor bean -->
   <bean id="textEditor" class="com.tutorialspoint.TextEditor"></bean>

   <!-- Definition for spellChecker bean -->
   <bean id="spellChecker" class="com.tutorialspoint.SpellChecker"></bean>

</beans>
 ```
 
 You can also do Autowiring on Constructors
 ```
 @Autowired
   public TextEditor(SpellChecker spellChecker){
      System.out.println("Inside TextEditor constructor." );
      this.spellChecker = spellChecker;
   }
 ```
@Autowired with (required=false) option
By default, the @Autowired annotation implies the dependency is required similar to @Required annotation, however, you can turn off the default behavior by using (required=false) option with @Autowired.
 
 
 
 There may be a situation when you create more than one bean of the same type and want to wire only one of them with a property. In such cases, you can use the @Qualifier annotation along with @Autowired to remove the confusion by specifying which exact bean will be wired.
 
 ```
 package com.tutorialspoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public class Profile {
   @Autowired
   @Qualifier("student1")
   private Student student;

   public Profile(){
      System.out.println("Inside Profile constructor." );
   }
   public void printAge() {
      System.out.println("Age : " + student.getAge() );
   }
   public void printName() {
      System.out.println("Name : " + student.getName() );
   }
}
 ```
 ```
 <?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xmlns:context = "http://www.springframework.org/schema/context"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
   http://www.springframework.org/schema/context
   http://www.springframework.org/schema/context/spring-context-3.0.xsd">

   <context:annotation-config/>

   <!-- Definition for profile bean -->
   <bean id = "profile" class = "com.tutorialspoint.Profile"></bean>

   <!-- Definition for student1 bean -->
   <bean id = "student1" class = "com.tutorialspoint.Student">
      <property name = "name" value = "Zara" />
      <property name = "age" value = "11"/>
   </bean>

   <!-- Definition for student2 bean -->
   <bean id = "student2" class = "com.tutorialspoint.Student">
      <property name = "name" value = "Nuha" />
      <property name = "age" value = "2"/>
   </bean>

</beans>
 ```
 
 You can switch XML configuration to Java Based Configuration. They are able to achieve the same result

@Configuration and @Bean
- Annotating a class with the @Configuration indicates that the class can be used by the Spring IoC container as a source of bean definitions. 
- The @Bean annotation tells Spring that a method annotated with @Bean will return an object that should be registered as a bean in the Spring application context. 
 
 ```
package com.tutorialspoint;
import org.springframework.context.annotation.*;

@Configuration
public class HelloWorldConfig {
   @Bean 
   public HelloWorld helloWorld(){
      return new HelloWorld();
   }
}
 ```
 The above code will be equivalent to the following XML configuration
```
<beans>
   <bean id = "helloWorld" class = "com.tutorialspoint.HelloWorld" />
</beans>
 ```
 Getting the class to work:
 ```
package com.tutorialspoint;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.*;

public class MainApp {
   public static void main(String[] args) {
      ApplicationContext ctx = 
         new AnnotationConfigApplicationContext(HelloWorldConfig.class);
   
      HelloWorld helloWorld = ctx.getBean(HelloWorld.class);
      helloWorld.setMessage("Hello World!");
      helloWorld.getMessage();
   }
}
 ```
The @Import Annotation
The @Import annotation allows for loading @Bean definitions from another configuration class. Consider a ConfigA class as follows −
```
@Configuration
public class ConfigA {
   @Bean
   public A a() {
      return new A(); 
   }
}
```
You can import above Bean declaration in another Bean Declaration as follows −
```
@Configuration
@Import(ConfigA.class)
public class ConfigB {
   @Bean
   public B a() {
      return new A(); 
   }
}
```
Now, rather than needing to specify both ConfigA.class and ConfigB.class when instantiating the context, only ConfigB needs to be supplied as follows −
```
public static void main(String[] args) {
   ApplicationContext ctx = new AnnotationConfigApplicationContext(ConfigB.class);
   
   // now both beans A and B will be available...
   A a = ctx.getBean(A.class);
   B b = ctx.getBean(B.class)
 ```
 
Event handling in Spring
The core of Spring is the ApplicationContext, which manages the complete life cycle of the beans. 
 
 The ApplicationContext publishes certain types of events when loading the beans. For example, a ContextStartedEvent is published when the context is started and ContextStoppedEvent is published when the context is stopped.
 
Here are the built in events that Context Listeners can listen to:
- ContextRefreshedEvent 
- ContextStartedEvent
- ContextStoppedEvent
- ContextClosedEVent
- RequestHandledEvent
 
 **Spring's event handling is single-threaded so if an event is published, until and unless all the receivers get the message, the processes are blocked and the flow will not continue.**
 
 Aspect Oriented Programming (AOP) terminologies
 Aspect = This is a module which has a set of APIs providing cross-cutting requirements. For example, a logging module would be called AOP aspect for logging. An application can have any number of aspects depending on the requirement.
 
 Join point = This represents a point in your application where you can plug-in the AOP aspect. You can also say, it is the actual place in the application where an action will be taken using Spring AOP framework.
 
 Advice = the actual action to be taken either before or after the method execution. This is an actual piece of code that is invoked during the program execution by Spring AOP framework.
 
Pointcut =  a set of one or more join points where an advice should be executed. You can specify pointcuts using expressions or patterns
 
 Introduction = An introduction allows you to add new methods or attributes to the existing classes.
 
Target object =  The object being advised by one or more aspects. This object will always be a proxied object, also referred to as the advised object.
 
 Weaving = Weaving is the process of linking aspects with other application types or objects to create an advised object. This can be done at compile time, load time, or at runtime.
 
There is plain old JDBC and Spring JDBC Framework
The most popular one is JdbcTemplate class of Spring framework
 
 - JDBC Template class executes SQL queries, updates statements, stores procedure calls, performs iteration over ResultSets, and extracts returned parameter values.
 
 - Instances of the JdbcTemplate class are threadsafe once configured. So you can configure a single instance of a JdbcTemplate and then safely inject this shared reference into multiple DAOs.
 
A common practice when using the JDBC Template class is to configure a DataSource in your Spring configuration file, and then dependency-inject that shared DataSource bean into your DAO classes, and the JdbcTemplate is created in the setter for the DataSource. 
 
 Data Access Object (DAO)
 - provide a means to read and write data to the database and they should expose this functionality through an interface by which the rest of the application will access them.
 
Database Transaction Management
Database transaction is a sequence of actions that are treated as a single unit of work. This means these actions are completed entirely or take no effect at all. This is to ensure data integrity and consistency
 
 Spring Transaction abstraction is defined by PlatformTransactionManager interface
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 