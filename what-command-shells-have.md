Command shells features:
1. command aliais - shortcut command. Basically allows you to enter a shorter string for the entire command
2. command history - the shell remmebers commands you have typed. This is the up arrow key feature
3. Job control - a mechanism that allows you to start, stop and suspend commands.

Check which shells are available in your system with:
```
ls -F /bin/*sh
```

Check which shell you are using:
```
echo $SHELL
```

Do not use . as the first entry in your PATH: (**Don't** do the following)
```
$PATH=.:/usr/local/sbin: ...
```

It is a security hazard. Imagine someone creating a bad program and naming is a commonly used name (i.e. ls) and leaving it in a commonly accessed directory.
When you enter that directory and enter ls, your $PATH would run all files on that folder. This means you would end up running all bad programs in that folder without knowing it.

In fact, having the . at the end of PATH would avoid this because then the default ls command will always be matched first.
