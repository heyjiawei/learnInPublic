Process code like so:

1. Parse. Take raw code and turn it into a more abstract representation of the code
2. Transform. Take this abstract representation and manipulate it to whatever the complier wants
3. Code generation. Takes the transformed representation of the code and turns it into new code.

## Parsing

2 phases

1.  Lexical analysis - takes raw code and splits it apart into "tokens". The splitter function is called a tokenizer (or lexer)

- tokens are an array of tiny objects that describe an isolated piece of the syntax. Tokens can be numbers, labels, punctuation, operators, whatever.

2. Syntatic Analysis - takes tokens and reformats them into a representation that describes each part of the syntax and their relation to one another. An example of this is an Abstract Syntax Tree (AST)

After we have our AST, we want to be able to visit different nodes with a visitor. We may have a traverser function which accepts an AST and a visitor.

## Visitors

- there is a pattern of how to represent operations(?) on elements of an object structure(? the AST)
- we create a visitor object. It has methods that accept different node types.
- when we traverse our AST, we call the respective node type method on this visitor whenever we "enter" a node of a matching type
- we pass a node and it's parent reference to these visitor object methods
- as we traverse down the AST, we will reach dead ends. This is the "exit" of that AST branch. So the upward traverse of depth first traversal is the "exit"
- so instead of the visitor node type method, we should change it to a node type namespace that have "enter" and "exit" methods. These methods will then record the node and it's parent reference

```js
var visitor = {
  NumberLiteral: {
    enter(node, parent) {},
    exit(node, parent) {},
  },
};
```

## Transform

- it can manipulate the AST in the same language or translate it into an entirely new language
- we can choose to work on the existing AST or create an entirely new one based on it

## Code generation

- can work in different ways. Some compilers will reuse tokens from earlier. Some may have created a separate representation of the code so they can print nodes linearly(why?)
- code generators will know "how" to print all of the different node types of the AST and will recursively call itself to print nested nodes until everything printed.
