A filter is a program that takes in textual data and then transforms it into a display that we want.

- ```head``` is a program that prints the first so many lines of it's input. By default it will print the first 10 lines

```tail``` is the opposite o head. By default it will print the last 10 lines.

```sort``` Sort will sort it's input, nice and simple. By default it will sort alphabetically but there are many options available to modify the sorting mechanism. 

```nl``` stands for the number of lines. It writes each FILE to standard output, with line numbers added.

```wc``` stands for word count. Print newline, word, and byte counts for each FILE, and a total line if more than one FILE is specified.  
A word is a non-zero-length sequence of characters delimited by white space.

```cut``` Print newline, word, and byte counts for each FILE, and a total line if more than one FILE is specified.  A word is a non-zero-length sequence of characters delimited by white space. 
Can be useful if your content is separated into fields (columns) and you only want certain fields.

```sed``` stands for Stream Editor. A stream editor is used to perform text transformation on an input stream. An input stream can be a file or input from a pipeline.
- ```sed``` only makes one pass over the inputs.
- If no -e (i.e. script to be added to commands that will be executed) or -f (i.e. content of script-file to be added to commands that will be executed) is given, the first non-option argument will be taken as the sed script to be interpreted. 
	- All remaining arguments will be taken as the names of input files for sed command. 
	- If no input files are specified, then the standard input is read.
	- sed does not identify words but strings of characters.
	- by default, if you change a word, it will only change the first occurance of the word on a line.
	- If you want to make the change on every word on the line, add a "g" after the last delimiter
	- the expression is inluded in single quotes so that any characters included in it which may have a special meaning on the command line doesn't get interpreted and act upon by the command line but get passed through to sed.
```
sed 's/oranges/bananas/g' mysampledata.txt
```

```uniq``` removes duplicate lines from the data. Only works when those lines are adjacent (i.e. one after the other). 

```tac``` is cat in reverse. It does the opposite of cat - prints the last line first, through to the first line.
- A use case is if you want the most recently added orders to be at the top of the file.

```diff``` Compare FILES line by line.

```grep``` or ```egrep``` will search a given set of data and print every line (the entire line) which contains a given pattern.
- ```egrep``` is an extension of ```grep```
- It searches for a string of characters, not a word

```awk``` 
// TODO