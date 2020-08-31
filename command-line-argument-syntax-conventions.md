# (CLI) Program Argument Syntax Conventions

POSIX recommends these conventions for command line arguments.

[link](https://www.gnu.org/software/libc/manual/html_node/Argument-Syntax.html)

- Arguments are options if they begin with a hyphen delimiter (‘-’).
- Multiple options may follow a hyphen delimiter in a single token if the options do not take arguments. Thus, ‘-abc’ is equivalent to ‘-a -b -c’.
- Option names are single alphanumeric characters
- Certain options require an argument. For example, the ‘-o’ command of the ld command requires an argument—an output file name.
- An option and its argument may or may not appear as separate tokens. (In other words, the whitespace separating them is optional.) Thus, ‘-o foo’ and ‘-ofoo’ are equivalent.
- Options typically precede other non-option arguments.
- The argument ‘--’ terminates all options; any following arguments are treated as non-option arguments, even if they begin with a hyphen.
- A token consisting of a single hyphen character ('-') is interpreted as an ordinary non-option argument
  - By convention, it is used to specify input from or output to the standard input and output streams.
- Options may be supplied in any order, or appear multiple times. The interpretation is left up to the particular application program.

GNU adds long options to these conventions.

- Long options consist of ‘--’ followed by a name made of alphanumeric characters and dashes.
- Option names are typically one to three words long, with hyphens to separate words.
  - Users can abbreviate the option names as long as the abbreviations are unique.
- To specify an argument for a long option, write ‘--name=value’. This syntax enables a long option to accept an argument that is itself optional.

# GNU `getopt` function

[contents here](https://www.gnu.org/software/libc/manual/html_node/Getopt.html)

- shows how to implement command line utility functions

Function: `int getopt (int argc, char *const *argv, const char *options)`

- The options argument is a string that specifies the option characters that are valid for this program.

  - An option character in this string can be followed by a colon (‘:’) to indicate that it takes a **required** argument.
  - If an option character is followed by two colons (‘::’), its argument is **optional**; this is a GNU extension.

- getopt has three ways to deal with options that follow non-options argv elements.

  1. The default is to permute the contents of argv while scanning it so that eventually all the non-options are at the end.

  - This allows options to be given in any order, even with programs that were not written to expect this.

  2. If the options argument string begins with a hyphen (‘-’), this is treated specially.

  It permits arguments that are not options to be returned as if they were associated with option character ‘\1’.

  3. POSIX demands the following behavior: the first non-option stops option processing. This mode is selected by either setting the environment variable `POSIXLY_CORRECT` or beginning the options argument string with a plus sign (‘+’).

- The special argument ‘--’ forces in all cases the end of option scanning.

----- I dont understand the following -----

### `opterr` (int)

- If the value of this variable is nonzero AND it encounters an unknown option character or an option with a missing required argument, `getopt` prints an error message to the standard error stream

  - This is the default behavior.

- If you set this variable to zero, `getopt` does not print any messages, but it still returns the character ? to indicate an error.

### `optopt` (int)

- When `getopt` encounters an unknown option character or an option with a missing required argument, it stores that option character in this variable. You can use this for providing your own diagnostic messages.

### `optind` (int)

- This variable is set by `getopt` to the index of the next element of the argv array to be processed. Once getopt has found all of the option arguments, you can use this variable to determine where the remaining non-option arguments begin. The initial value of this variable is 1.

### `optarg` (char \*)

- This variable is set by getopt to point at the value of the option argument, for those options that accept arguments.
