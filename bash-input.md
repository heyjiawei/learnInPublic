### Using command line arguments
```read``` asks for user input. It reads a line from standard input and split it into fields (whitespace as delimiter).

### Read input during script execution
2 interesting OPTIONS:
```
read -p 'Username: ' uservar
read -sp 'Password: ' passvar

# will result in the following:
Username: ryan
Password:			# no input will show up here
```

- If there are more items than variable names, the remaining items will all be added to the last variable name.

- If there are less items than variable names, the remaining variable names will be set to blank or null.

### Reading from STDIN (data that has been redirected into the Bash script via STDIN)
Each process gets its own set of files (One for STDIN, STDOUT, STDERR):
STDIN - /dev/stdin
STDOUT - /dev/stdout
STDERR - /dev/stderr

To make our scrpt acceptable to piped data:
```
cat /dev/stdin | cut -d ' '
```

So we will pass in salesdata.text as stdin to program file summary.sh
```
cat salesdata.text | summary.sh
```

### Tips
- favour command line arguments wherever possible as they are most convinent for users (the data will be stored in their command history as they can easily run it again).
	- it is also a good approach since your script may be called by other scripts or processes

- When the nature of the data is private (i.e. username and passwords), it would be best to read the data during script execution.

- If the script is only going to process data in a certain way, it is better to work with reading from STDIN