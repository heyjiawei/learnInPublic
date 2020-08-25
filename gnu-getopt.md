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
