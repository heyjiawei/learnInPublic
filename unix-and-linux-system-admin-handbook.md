# Booting and System Management Daemons

- most Linux distros now use a system manager daemon called **systemd** instead of the traditional UNIX **init**

## systemd

streamlines the boot process by adding:

- dependency management
- support for concurrent startup processes
- a comprehensive approach to logging
  among other features

During bootstrapping, the kernel is loaded into memory and begins to execute.
The only way Administrators can modify bootstrap configurations is by editing config files for the system startup scrips or by changing the arguments the boot loader passes to the kernel.

The **init** scripts are a series of shell scripts that contain procedures to run before the system is fully booted. They check and mount the filesystems and start system daemons.
These scripts can be unit files that run in sequence by **init** or parsed by **systemd**. The layout of these startup scripts and the manner in which they are executed varies among systems.

When a system is powered on, the CPU (Computer Processing Unit) is hardwired to execute boot code stored in ROM (Read Only Memory). On virtualised systems, this ROM may be imaginary but the concept remains the same.

## System Firmware

A firmware is a class of computer software that provides the low-level control for a device's specific hardware.

The system firmware knows about all the devices that live on the motherboard. In addition to allowing users to configure these devices, the firmware lets you expose the firmware to the operating system, disable the firmware or hide the firmware.

During normal bootstrapping, the system firmware probes for hardware and disks and runs a simple set of health checks before it looks for the next stage of bootstrapping code.

# BIOS

Traditional PC firmware was called the BIOS (Basic Input/Output System). BIOS has become supplanted by UEFI (Unified Extensible Firmware Interface). UEFI may be referred to as UEFI BIOS and most systems that implement UEFI can fall back to the legacy BIOS implementation if the operating system they are booting doesn't support UEFI.

# UEFI

UEFI is the current revision of an earlier standard, EFI. Most of the time, you can treat them as equivalent.

# Boot Loaders

The boot loader's main joib is to identify and load an appropriate operating system kernel. Most boot loaders can also present a boot-time user interface that lets you select which of the several possible kernels or operating systems to invoke.
The boot loader also passes configuration arguments to the kernel. These configurations look similar to shell commands and may be hardwired into the boot loader's configuration to be used on every boot.

## GRUB (GRand Unified Boot loader)

GRUB is the default boot loader on most Linux distributions. It's config file is called grub.cfg and its usually kept /boot/grub along with a selection of other resources and code modules that GRUB might need access to at boot time. Just update grub.cfg to change the boot configuration.

You can create the grub.cfg file yourself but its more common to generate it with grub-mkconfig utility.

# System management daemons

Once the kernel has been loaded and has completed its initialization process, it creates a bunch of processes in user space. Most of these processes are really part of the kernel implementation. THey don't necessarily correspond to programs in the filesystem. THey are not configurable and do not require administrative attention.

You can recognize them in **ps** listings by their low PID and by the brackets around their names.

The exception to this pattern is the system management daemon.

- It has a process ID 1
- it usually runs under the name **init**

The system gives **init** a few special privileges but for the most part it's just a user-level program like any other daemons.

## Responsibilities of init

init goal is to ensure the system runs all the right services and daemons at any given time. To do so, it maintains a notion of mode in which the system should be operating in. These modes are alias as "run levels"

1. Single-user mode. Only a minimal set of filesystems is mounted. No services are running and a root shell is started on the console.
2. Multi-user mode. All common filesystems are mounted and all configured network services are started, along with a window system and graphical login manager for the console.
3. Server mode. Similar to multiuser mode but with no GUI running on the console.

Every mode is associated with a defined complement (a set) of system services. The init daemon starts or stops services as needed to bring the system's actual state into line with the current active mode.

Modes can also have associated milepost tasks that runs when the mode begins or ends.

Init is more recently called systemd nowadays. More concisely, systemd is a flavour of init. It aims to be a one-stop-shopping for all daemon and state-related issues.

## Systemd and init

systemd takes all the init features formerly implemented with monkey-patches, shell script hacks and formalizes them into a unified theory of how services should be configured, accessed and managed.

Systemd defines a dependency model not only among the services but also among "targets" - systemd's term for the operational modes that traditional init calls run levels.
Systemd manages processes in parallel, network connections (networkd), kernel log entries (journald) and logins (logind).

Systemd goes against the UNIX philosophy of keeping system components small, simple and modular. It has monolithic control over many of the OS's other subsystems. Because of this, it not only breeds complexity, but also introduces potential security weaknesses. Additionally, it muddies the distinction between OS platform and the services that run on top of it.

Traditional init still has a role to play when the distribution is small, or doesn't require systemd
s advanced process management functions.

### Systemd in detail

The configuration and control of system services is an area in which Linux distributions have traditionally differed the most from one another. systemd aims to standardize this aspect of system administration, and to do so, it reaches further into the normal operations of the system than any previous alternative.

systemd is not a single daemon but a collection of programs, daemons, libraries, technologies and kernel components. Since it depends heavily on features of the linux kernel, it's a Linux-only proposition and it's hard to port it to BSD or other variant of UNIX.

# Unit

An entity that is managed by systemd is known as a unit. A unit can be a service, a socket, a device, a mount point or an automount point, a swap file or a partition, etc.

Within systemd, the behaviour of each unit is defined and configured by a unit file. The unit file may specify the location of the executable file for the daemon, tell systemd how to start and stop the service, and identify any other units that the service depends on.

> In Ubuntu, the unit file is rsync.service; it handles the startup of the rsync daemon that mirrors filesystems

Unit files can live iin several different places. `/usr/lib/systemd/system` is the main place where packages deposit their unit files during installation; on some systems, the path is `/lib/systemd/system` instead.

The contents of the directory where these files live are considered stock so you shouldn't modify them. If you wish to customize them, add customization files in `/etc/systemd/system`

systemd maintains all these directories. If there's any conflict, the files in `/etc` have the highest priority.

By convention, unit files are named with a suffix that varies according to the type of unit being configured. service units have a .service suffix etc. Within the unit file, some sections `[Unit]` apply generally to all kinds of units. Others `[Service]` may appear only in the context of a particular unit type.

# systemctl

systemctl is a all-purpose command for investigating the status of systemd and making changes to its configuration.

# Rebooting and shutdown procedures

`halt` command performs essential duties required for shutting down the system. It logs the shutdown, kills nonessential processes, flushes cached filesystem blocks to disk, and then halts the kernel. On most systems, `halt -p` powers down the system as a final flourish.

`reboot` is identical to `halt` but it causes the machine to reboot instead of halting.

`shutdown` is a layer over `halt` and `reboot`. It provides for scheduled shutdowns and ominous warnings to logged-in users. It is now largely obsolete.

# Standard UNIX Access control

- Access control depends on which user is attempting to perform an operation. In some cases, it depends on that user's membership in a UNIX group
- Objects (such as files and processes) have owners. Owners have broad control over their objects. But these control are not necessarily unrestricted
- You own the objects you create
- The special user account called "root" can act as the owner of any object
- Only root can perform certain sensitive administrative operations

Certain system calls are restricted to root. The implementation checks the identity of the current user and rejects the operation if the user is not root.

Filesystems have their own access control system.

## Filesystem access control

In the standard model, every file has both an owner and a group, sometimes referred to as the "group owner" The owner can set permissions of the file. Although the owners of a file is always a single person, many people can be group owners of the file, as long as they are all part of a single group.

Groups are traditionally defined in the `/etc/group` file. These days they are stored in network database tables.

Owners of a file gets to specify what the group owners can do with it. This allows files to be shared among members of the same project.

## Process ownership

The owner of a process can send the process signals and also reduce (degrade) the process scheduling priority.

## Root account

The root account is UNIX's omnipotent administrative user. It is also known as the superuser account. The actual username is root.

The defining characteristics of the root account is that its UID is 0.

You can change the username of this account or create additional accounts whose UIDs are 0 but this is a bad idea due to security reasons. They also create confusion for others dealing with your system.
Traditional UNIX allows the superuser to perform an valid operation on any file or process. Not all operations are valid - certain operations are forbidden even to the superuser.

The superuser can change the process UID and GID if that process is owned by root.

Once a root process has changed its ownership to become a normal user process, it can't recover its former privileged state.

Traditional UNIX access control also has identity substitution system, that is implemented by the kernel and filesystem in collaboration.

This allows specially marked executable files to run with elevated permissions, usually those of root. It lets developers and administrators set up structured ways for unprivileged users to perform privileged operations.

How? WHen the kernel runs an executable file that has its **setuid** or **setgid** permission bits set, it changes the effective UID or GID of the resulting process to the UID or GID of the file containing the program image. Thus the users's privileges are promoted for the execution of that specific command only.

E.g. passwd command checks to see who's running it and customizes its behaviour accordingly such that users can only change their own password and root can change any password.

Programs that run setuid are prone to security problems. The surest way to minimize the number of setuid problems is to minimize the number of setuid programs. Never use setuid execution on programs that were not explicitly written with setuid execution in mind.

Root account is just another user so most systems let you log in directly to the root account. But this is a bad idea.

1. Root logins leave no record of what operations were performed as root. If you broke something, you won't be able to trace it
2. If the access was unauthorized, you won't be able to figure out what an intruder has done to your system
3. Root leaves no record of who was actually doing the work. If several people have access to root account, you won't be able to tell who used it and when

## `su`

A marginally better way to use root account is the `su` command. If invoked without arguments, `su` prompts for the root password and then starts up a root shell. Root privileges remain in effect until you terminate the shell. `su` doesn't record the commands executed as root but does create a log entry that states who became root and when.

`su` has largely been superseded by `sudo`. `su` is best reserved for emergencies and fixing situations in which `sudo` has been broken or misconfigured.

## `sudo`

This is recommended as the primary method of access to the root account. `sudo` takes a command line argument to be executed as root (or as another restricted user). It consults the file `/etc/sudoers` which lists the people who are authorized to use `sudo` and the commands they are allowed to run on each host. If the proposed command is permitted, `sudo` prompts for the user's own password and executes the command.

`sudo` keeps a log of the command lines that were executed, the hosts on which they were run and the people who ran them, the directories they were run from, the time they were invoked.
