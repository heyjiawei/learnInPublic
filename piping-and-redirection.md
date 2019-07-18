Every program ran on the command line has 3 default data streams:
STDIN (0) - Standard input. This is data fed into the program
STDOUT (1) - Standard output. 
			This is data printed by the program. Defaults to the terminal.
STDERR (2) - Standard error. 
			This is for error messages. Defaults to the terminal.

Piping and redirection is the means we connect these streams.

Redirection deals with sending data to and from files.
Piping sends data from one program to another.

# Redirection

```>```
- This operator indicate that we wish the program output be saved into a file instead of printed to the screen. 
- It will create a new file if the filename doesn't exist. Then, the program is ran and the output is saved into the file.
- If we save into a file which already exists, then it's contents will be replaced with the new output.
- If we place a number before ```>```, it will redirect to that stream. By default, it redirects to stream 1 (i.e. STDIN)

```>>```
- To appemd new data to the file.

**When piping and redirecting, the actual data will always be the same, but the formatting of that data may be slightly different to what is normally printed to the screen.**

```<```
```
wc -l < myoutput
```
- Reads data from the file and feeds it into the program via it's STDIN stream
- One thing to note here is that when you use ```<```, you will be supplying the command an annonymous data. Hence, the command will be unable to identify the file used.
- This technique can be used when you don't want filenames to be printed. i.e. In the above command, ```wc``` does not print out the filename 'myoutput'. This output is different from output from ```wc -l myoutput```

Commands are read from left to right.
```
wc -l < barry.txt > myoutput
```
This would mean ```wc -l < barry.txt``` is first ran. The output is then added to myoutput

```>&```
- Redirect a stream to another stream. We identify a stream by placing & infrontof the stream. No space between each stream number.
- This may be used when we wish to save both normal output and error messages into a single file.
```
ls -l blah.foo > myoutput > 2>&1
```

# Piping

```|```
- feeds output from the program on the left as input to the program on the right.