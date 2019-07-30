Kinds of CSS Statements
- At-rules
They start with an at sign (@), followed by an identifier to say what kind of rule it is, then a syntax block of some kind, ending with a semi-colon (;). 
**Each type of at-rule, defined by the identifier, will have its own internal syntax and semantics.**
Examples include:
@charset and @import (metadata)
@media or @document (conditional information, also called nested statements, see below.)
@font-face (descriptive information)

- Nested statements
They are a specific subset of at-rule, the syntax of which is a nested block of CSS rules that will only be applied to the document if a specific condition is matched:
The @media at-rule content is applied only if the device which runs the browser matches the expressed condition;
the @supports at-rule content is applied only if the browser actually supports the tested feature;
the @document at-rule content is applied only if the current page matches some conditions.
Specific syntax example:
@media (min-width: 801px) {
  body {
    margin: 0 auto;
    width: 800px;
  }
}
