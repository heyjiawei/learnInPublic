Insert (or Input) mode and Edit mode. 
- In input mode you may input or enter content into the file. 
- In edit mode you can move around the file, perform actions such as deleting, copying, search and replace, saving etc. 

```vi <filename>``` to create and open a file in vim

```
ZZ 	# save and exit

# Any command beginning with a colon ( : ) 
# requires you to hit <enter> to complete the command.
:q! # discard all changes and exit
:w 	# write to file
:wq # write to file and exit
```

When the file is too large to be read with ```cat```, you can use ```less```

Undo with ```u``` in Edit mode