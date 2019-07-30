Linux man page
- when you open using the man command, the manual will be displayed by 'less' or 'more' linux commands (the commands that was set as your manpager)

section number:
e.g. tty(4)
- Anytime you see a listing like "tty(4)", you can reach that section with
```
man <section number> <page name>
```

checking if a man page exists:
```
whatis <keyword>
```

searching manpage via keywords:
- refresh your manual page cache first followed by searching the keyword
```
mandb
man -k <keyword>
```

Reading Man page syntax:
In the synopsis section, 

**bold text** 
- you should type it exactly as shown

[brackets] 
- text shown in brackets are optional.
- these parameters are -f -c and they are optional. You can omit them entirely too

Underline or Italicised text (a.k.a. argument)
- you may see underlined or italicised text in certain places. They might also be of a different colour.
- These text need to be replaced with an argument
- e.g. Replace file with a file name

Ellipses
- ellipses shown after any argument or expression means that the argument or expression is **repeatable**

[expression]...
- the entire expression within the bracket is repeatable

Comma at the start of a bracket ``` [-m system[,...]] ```
- there can be multiple comma separated values

Or (a.k.a. | )
- it means choose one, as both options are not allowed together at  once
- command ```-a|-b``` means you can only use only -a or -b in a command

- Terminals often use the less utility to read man pages
- man man can help clarify how to read linux man page

What if I don't know which command I want?
- use ```man -k``` or ```apropos```. e.g. ```man -k file | grep search``` then read the descriptions and find the one that suits your need. ```apropos``` works with regular expressions

The sections:
AUTHORS - people who created this command
BUGS - lists of known defacts or implementation limitations
ENVIRONMENT - aspects of your shell that could be affected by the command, or variables that will be used
EXAMPLES / NOTES - self explanatory
REPORTING BUGS - who you should contact if you find bugs on this tool/ documentation
COPYRIGHT
SEE ALSO - other commands, tools or working aspects that are related to this command and could not fit into any of the other sections

Tips/commands that apply to all
- some options and syntax style are common. The following are not always true but they are common defaults.
- ``` -v ``` means verbose. ``` -vvv ``` can be very very verbose
- generally one dash arguments can be stacked. ``` -x -z -y ``` would be the same as ``` -xzy ```
- ``` -R ``` and ``` -r ``` means recursive
- almost all commands have ``` --help ``` option
- ``` --version ``` shows the version of a software
- ``` -p ``` on copy or move utilities means to preserve permissions
- ``` -y ``` means yes or proceed without confirmation in most cases

Some examples to understand the synopsis:
- in ``` [foo [ bar ] ]```, you may use foo, and you may add bar
- ``` [ -S size ] ``` tells that the -S argument is waiting for a mandatory size
