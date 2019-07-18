apt?
GPG?

- Linux is an extensionless system
Linux the system actually ignores the extension and looks inside the file to determine what type of file it is

- In Linux, file names are case sensitive
t is possible to have two or more files and directories with the same name but letters of different case and Linux sees these all as distinct and separate files

- spaces are usually used in command line to separate items. Hence, spaces in filenames need to be surroounded with quotes or escaped

```
# Using quotes
cd 'Holiday Photos'

# escaped
cd Holiday\ Photos
```

- Hidden files start with a ```.``` in front. To view them you need to include option ```-a```

- Add a directory with ```mkdir```
Option ```-p``` creates parent directories as needed
Option ```-v``` makes mkdir report what it is doing in each step
```
mkdir -pv linuxtutorialwork/foo/bar
```

- Remove a directory with ```rmdir```
Note that a direcotory must be empty before it may be removed

- Create a blank file with ```touch```. touch command allows us to update and access and modification times of a file.

- Copying a file or directory with ```cp```.
when we use ```cp``` the destination can be a file or directory.
	- If file, it will create a copy of the source but name the copied filename specified in ```<destination>```
	- If directory, it will copy the file into that directory and the copy will have the same name as the ```<source>```

- ```mv``` can be used to move files/directory and rename files/directory.
	- When you provide a new name for the file or directory and as part of the move it will also rename it. 
	- If you specify the destination to be the same directory as the source, but with a different name, then we have effectively used mv to rename a file or directory.

- remove files with ```rm```
	- By default, rm does not remove directories.  Use the --recursive (-r or -R) option to remove each listed directory, too, along with all of its contents.

**The linux command line does not have an undo feature **