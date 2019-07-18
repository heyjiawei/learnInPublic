A program is a series of instructions.
A process is a running instance of a program. It can be managed.

Linux is a multitasking operating system. 
While we are running some processes, there may be other users on the system also running stuff. And the OS iteself will also be running various processes which it uses to manage everything in general.

```top```
- gets a snapshop of what is currently happening on the system
Top will give you a realtime view of the system and only show the number of processes which will fit on the screen. 

```ps```
- displays information about a selection of the active processes.
If you want a repetitive update of the selection and the displayed
information, use top(1) instead.

```kill```
- Kills a process via its process id.
When you try to kill a process, kill will send a default signal (1) to the process. This will ask the process to quit.
Sometimes, it doesn't work. We can ```kill``` again but supply a signal of 9 - which means to go in with a sledge hammer and make sure the process is truely gone.

**Normal users may kill processes in which they are owners of.**
**Root users may kill anyone's processes**

Linux virtual consoles? process crashes and locks up?


### Foreground jobs
They are programs that ran normally

```
sleep 5
```
### Background jobs
They are programs that are ran in the background 
```
# if we run the same command but put an (&) at the end of the command
# we are telling the terminal to run this process in the background

sleep 5 &

# The output from this is the job number.
```

```jobs``` lists the active jobs and their status

### Move job from foreground to background
- We can move jobs between foreground and background. CTRL + z will allow running foreground process to be paused and moved into the background.

### Move job from background to foreground
```fg``` Move job to the foreground