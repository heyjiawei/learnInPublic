What is a daemon?

- In multitasking computer operating systems, daemon is a computer program that runs as a background process, rather than being under direct control of an interactive user.

- Systems often start daemons at boot time which will respond to network requests, hardware activity, or other programs by performing some task. Daemons such as cron jobs may also perfom defined tasks at scheduled times.

- daemon processes often end with `d` to indicate so.

- In Linux, `systemd` (the system daemon) is the most common solution for running and setting up daemon processes.
- You can run `systemctl` status to list the current running daemons. Most of them might sound unfamiliar but are responsible for core parts of the system such as managing the network, solving DNS queries or displaying the graphical interface for the system.
- Systemd can be interacted with the systemctl command in order to enable, disable, start, stop, restart or check the status of services (those are the systemctl commands).
