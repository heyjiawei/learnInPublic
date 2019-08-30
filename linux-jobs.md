To freeze a job:
```
^z
```

To restart the frozen job:
```
fg
```

- Foreground jobs refers to program that are on your terminal display at the moment.
- If the process can continue without any output to the screen and without any requirement for input, you can use ```bg``` to move it into the background.
- If the background process is done and needs to write to the screen or read from the keyboard, the system will stop its execution automatically and inform you. Then, you can use fg to bring the program into the foreground to continue running.


To bring a particular process to the foreground:
```
fg <job-id>
```
- if you don't enter a job id, the most recently stopped job will be brought back to foreground.


Do note that if you froze a job, the resources are not released. You have to kill or terminate the job to free up the resources!


To have a program start in the background, add ```&``` at the end of the command line.


To find out what programs are stopped and what tasks are running.
```
jobs
```

To find out what processes are running:
```
ps
```

To terminate processes:
```
kill <process-id>
```

- the kill command sends a signal to the process. By default, kill sends a SIGTERM to the process specified. 
- You can specify other signals by using the number or the name of the signal, without the SIG prefix. ```kill -HUP 3242342```

Some common signals used with kill:
Number 		Name 		Meaning
1 			SIGHUP		Hang up. this signal is sent to every process you are running just before you hang up (i.e. log out of the system)
2 			SIGINT		Interrupt. This signal is sent when you press ```^c```
9 			SIGKILL 	Terminate NOW. Programs cannot ignore it and cannot do anything special when receiving it, even cleaning up the resources.
15 			SIGTERM 	Terminate gracefully - allows program to remove temp files it might have created.