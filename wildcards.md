Whenever we refer to a path we may also use wildcards in that path to turn it into a set of files or directories.

**wildcards may be used with any command**

Here is the basic set of wildcards:

* - represents zero or more characters
? - represents a single character
[] - represents a range of characters

Under the hood, bash processes the regex expression. 
When it sees a command with the above wildcards, before running the command, it replaces the pattern with every file/directory that matches that pattern

