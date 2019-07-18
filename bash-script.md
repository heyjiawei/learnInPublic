Bash scripts are interpreted by an interpreter (like Bash shell).

**Anything you can run on the command line you may place into a script and they will behave exactly the same. Vice versa, anything you can put into a script, you may run on the command line and again it will perform exactly the same.**

The first line on the screen should always help identify which interpreter should be used. ```#!``` is referred to as **shebang**, followed by the path to the interpreter (no spaces between shebang and path)
```
#!/bin/bash
```

```which``` which  returns the pathnames of the files (or links) which would be executed in the current environment.
- If we don't know where our interpreter is located, we may use ```which``` to find out.

### How the commands work
When we type a command into the command line, the system runs through a preset series of directories to look for the programs we specified. 
- We can find these directories by looking at the PATH variable

When the system has found the command in a directory, it will run it. Otherwise, if will continue to check other directories for the command.
It will not look into any directories apart from these. (Not even your current directory)

- We can override this behaviour by supplying a file/dictionary path (e.g. './' to look for file in current directory)

**Directories are separated by (:)**

### Permissions
A script must have execute permission before we may run it - and this applies even if we are the owner of the file.
- You don't have execute permission by default so you will have to add it. Hence, ```chmod 755 <script>```

### Variables

- To set a variable ```<var_name>=<var_value>```. Make sure there is no spaces on either side of (=) sign and **leave out ($) when setting a variable**
- To refer to a variable, use ($) before the variable name. 
i.e. ```$<var_name>```

When we run a script, the following variables gets set automatically:
$0 - the name of the script
$1 - $9 are command line arguments given to the script. $1 refers to the first argument
$# - How many command line arguments were provided to the script
$* - All of the command line arguments
$@ - All arguments supplied to the Bash script
$? - The exit status of the most recently run process
$$ - The process ID of the current script
$USER - The username of the user running the script
$HOSTNAME - The hostname of the machine the script is running on
$SECONDS - The number of seconds since the script was started
$RANDOM - Returns a different random number each time it is referred to
$LINENO - Returns the current line number in Bash script

Before Bash interprets every line of our script it first checks to see if any variable names are present. If a variable is used, it replaces the variable name with its value. It will then run that line of code and begin the process again on the next line.

```env``` lists other variables which you may also refer to

### $@ vs $*
// TODO

### Exporting variables
- Variables are limited to the process they are created in.
- For scripts to use a variable in another script, they need to export the variable

To export a variable:
```
var1=blah
export var1
```
- When we export a variable, we are creating a new copy of the variable and handing it over to the new process.
- Exporting variables is one way. That is, while the original process may pass variables to the new process. Anything the other process does with the copy of the variable has no impact on the original variable


### Back ticks (\`). Deprecated in favour of Command Substitution
- evaluates the output. Usually used to save the output of a command to a variable.
```
lines=`cat $1 | wc -l`
```

When we are running a program, we copy  those instructions and resources from the hard disk into RAM. We also allocate a bit of space in RAM for the process to store variables and a few flags to allow the operating system (OS) to manage and track the process during its execution.

### Command Substitution $()
- similar to Back Ticks
- unlike Back Ticks, allows nested Command Substitution
```
lines=$(cat $1 | wc -l)
```

### Single quotes ('') or Double quotes ("")
When we enclose our content in quotes, we are indicating to Bash that contents should be considered a single item.

- Single quotes will treat every character literally
- Double quotes will allow you to do substitution

```
myVar='Hello World'

doubleQuote="Double quote $myVar"
echo $doubleQuote 		# Double quote Hello World

singleQuote='Single quote $myVar'
echo $singleQuote 		# Single quote $myVar
```

