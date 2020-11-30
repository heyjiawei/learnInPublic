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

In the sudoers configuration file, `sudo` always obey the last matching line. The matching is determined by matching against the 4-tuple (user, host, target user and command). Each of those elements must match the configuration line or the line will be ignored.

Because the sudoers file includes the current host as a matching criterion for configuration lines, you can use 1 master sudoers file through an administrative domain (an administrative domain is a region of your site in which hostnames and user accounts are guaranteed to be name-equivalent). This makes the initial sudoers setup a little more complicated but it's a great idea. THere is no mystery about who has what permission on what hosts since everything is recorded in one authoritative file. A corollary from this is that sudo permissions might be better expressed in terms of user accounts rather than UNIX groups, unless your group memberships are tightly coordinated site-wide.

## Disabling the root account

If your site standardizes the use of `sudo`, there will be little use for actual root passwords. If you think root password isn't necessary, you can disable root logins entirely by setting root's encrypted password to `*` or prepending a `!` to the encrypted password. (On Linux, it can be done with `passwd -l`). Unlock it with `sudo passwd -u root`

`*` and `!` are just conventions since no software checks for them explicitly. They work since these are not valid password hashes. Therefore, an attempt to verify root's password will simply fail.

In locking the root account, no user can run `su` and the root account continues to exist. All software that usually runs as root continues to do so and `sudo` works normally.

Root password is usually only useful on physical computers when real computers require rescuing when hardware or configuration problems interfere with `sudo` or the boot process.

## System accounts other than root

Root is generally the only user that has special status in the eyes of the kernel but there are several other pseudo-users defined by the system. They can be identified by their low UIDs (usually less than 100). Often, UIDs under 10 are system accounts, UIDs between 10 and 100 are pseudo-users associated with specific pieces of software.

It's also customary to replace the encrypted password field of these special users in the shadow or master.passwd file with a star so that their accounts cannot be logged in to. Their shells should also be set to `/bin/false` or `/bin/nologin` to protect against remote login exploits that use password alternatives such as SSH key files.

The Network File System (NFS) uses an account called "nobody" to represent root users on other systems. For remote roots to be stripped of their rootly powers, the remote UID 0 has to be remapped to something other than the local UID 0. The nobody account acts as a generic alter ego for these remote roots.

The nobody account is suppose to represent a generic and relatively powerless user and hence, it shouldn't own any files. If nobody does own files, remote roots can take control of them.

# Extensions to the traditional access control model

The traditional access control model is the root account model. In reality, the access control model includes a number of refinements. It has 3 layers of software:

1. The standard model (root account model)
2. Extensions that generalizes and fine-tune this basic model
3. Kernel extensions that implement alternative approaches

> These refinements are not architectural layers (meaning planned and built in) but more of historical artifacts. As the standard model deficiencies become widely recognized, over time the community began to develop workarounds for few of the more pressing issues and to maintain compatibility and encourage widespread adoption, they are termed refinements of the traditional system. Some of these refinements are now considered UNIX standards.

## Pluggable Authentication Modules (PAM)

PAM is an authentication technology, not an access control technology. It helps ask the precursor question "How do I know this is really user X?".

User accounts are traditionally secured by passwords stored in encrypted form in `/etc/shadow` or `/etc/master.passwd` file or an equivalent of a network database. Ideally, programs shouldn't assume that "text" like passwords are used at all. This would allow systems to use biometric identification, network identity or some kind of 2 factor identification.

PAM allows this to be possible as it is a wrapper for a variety of method-specific authentication libraries. Administrators specify the authentication method they want the system use, along with the appropriate context for each one and programs that require user authentication simply call the PAM system rather than implement their own forms of authentication. PAM would in turn call the authentication library specified by the system administrator.

# Linux Capabilities

Capability system divide the powers of the root account into a handful of separate permissions.

The traditional powers of root are simply the union of all possible capabilities so there is a fairly direct mapping between the traditional model and the capability model. The capability model is just more granular.

Capabilities can be inherited from a parent process. They can also be enabled or disabled by attributes set on an executable file by a process stared from setuid execution.

Processes can renounce capabilities that they don't plan to use.

However, capabilities are not really used directly in the real world. As it happens, capabilities have evolved to become a more enabling technology. THey are used by higher level systems such as Docker but are rarely used on their own.

# Linux namespaces

Linux can segregate processes into hierarchical partitions (known as namespaces) whereby processes can only see a subset of the system's file, network ports and processes. A side effect of this scheme is that it acts as a form of preemptive access control. Instead of having to base access control decisions on potentially subtle criteria, the kernel simply denies the existence of objects that are not visible from inside a given box.

Inside a partition, normal access control rules apply. Because confinement is irreversible, processes can run as root within a partition without fear that they might endanger other parts of the system. In most cases, jailed processes are not even aware that they have been confined.

This is the foundation of Docker.

# Linux types of access control

There is a mixed success of efforts to advance the standard model. Here we list some of them.

## Linux Security Modules (LSM) API

This is a kernel level interface that allows access control systems to integrate themselves as loadable kernel modules. LSM-based systems have no effect unless users load them and turn them on. Unfortunately the LSM system requires explicit cooperation among active modules and none of the current modules include this feature. Linux systems may be effectively limited to a choice of one LSM add-on module.

## Mandatory Access Control (MAC)

The standard UNIX model is considered a form of discretionary access control because it allows the users of access-controlled entities to set the permissions on them.

MAC systems let the administrators write access control policies that override or supplement the discretionary permissions of the traditional model. MAC capabilities are an enabling technology for implementing security models, where security policies control access according to the perceived sensitivity of the resources being controlled.

Available MAC systems range from wholesale replacement for the standard model to lightweight extensions that address specific domains and use cases.

## Role based access control

Permissions, instead of being assigned directly to users, are assigned to intermediate constructs known as "roles" and the roles in turn are assigned to users. To make an access control decision, the system enumerates the roles of the current user and checks to see if any of those roles have the appropriate permissions.

Roles are similar in concept to UNIX groups but they are more general because they can be used outside the context of the filesystem.

# Process

A process represents a running program. An axiom of UNIX philosophy is that as much work should be done within the context of processes rather than being handled specially be the kernel.

The system and user processes follow the same rules so you can use a single set of tools to control them both.

A process consists of

- an address space
  a set of data structures within the kernel

The address space is a set of memory pages that the kernel has marked for the process's use. These pages are units in which memory is managed. The pages contain the code and libraries that the process is executing, the process's variables, its stacks and various extra information needed by the kernel while the process is running.

The process's virtual address space is laid out randomly in physical memory and tracked by the kernel's page tables.

The kernel's internal data structures record various pieces of information about each processes. Some of these are:

1. The process's address space map
2. Current status of the process (sleeping, stopped, runnable, etc.)
3. Execution priority of the process
4. Resources the process has used (CPU, memory, etc.)
5. Information about files and network ports the process has opened
6. Process's signal mask
7. Owner of the process

## Thread

Is an execution context within a process. Every process has at least 1 thread but some processes have many threads. Each thread has its own stack and CPU context but operates within the address space of its enclosing process.

Some computers have multiple cores per CPU. A process's thread can run simultaneously on different cores.

## PID (process ID number)

The kernel assigns a unique ID number to every process.

## PPID (Parent PID)

UNIX and Linux do not have a system call that initiates a new process running a particular program. Instead, the program is run as such:

1. An existing process must clone itself to create a new process
2. The clone can then exchange the program its running for a different one.

When a process is cloned, the original process is referred to as the parent. The copy is called the child. The PPID attribute of a process is the PID of the parent from which it was cloned. If the parent dies, init or systemd becomes the new parent.

> PPID is useful when you are confronted with an unrecognized process.

## UID (real user ID) and EUID (Effective user ID)

The process's UID is the user identification number of the person who created it. It is also the copy of the UID value of the parent process. Usually, only the creator and the superuser can manipulate a process.

The EUID is an extra UID that determines what resources and files a process has permission to access at any give moment. UID and EUID is to maintain a distinction between identity and permission. For most processes, the UID and EUID are the same, the exception being programs that are setuid.

Linux also defines a nonstandard FSUID process parameter that controls the determination of filesystem permissions. It is not frequently used outside the kernel and not portable to other UNIX systems.

## GID and EGID (Group ID and Effective Group ID)

GID is the group identification number of a process. The EGID is related to GID in the same way EUID is related to UID in that it can be upgraded by the execution of a setgid program. As with UID, the kernel maintains a saved GID for each process.

# The life cycle of a process

To create a new process, a process copies itself with the `fork` system call. `fork` creates a copy of the original process and that copy is largely identical to the parent. Technically, Linux systems use `clone` a superset of `fork` that handles threads and includes additional features but `fork` remains in the kernel for backward compatibility but calls `clone` behind the scenes.

The new process has a distinct PID and its own accounting information.

`fork` returns 2 different values. From the child's point of view it returns 0. The parent receives the PID of the newly created child. Since the processes are identical, they must both examine the return value to determine which role they are supposed to play.

After a fork, the child process uses one of the `exec` family of routines to begin execution of a new program. These calls change the program the the process is executing and reset the memory segments to a predefined initial state.

init (or systemd) also plays an important role in process management. When a process completes, it calls a routine named `_exit` to notify the kernel that it is ready to die. It supplies an exit code that tells why its exiting. By convention, 0 indicates a normal / successful termination.

Before a dead process is allowed to disappear, the kernel requires that its death by acknowledged by the process's parent. The parent does with a call to `wait`. The parent receives a copy of the child's exit code and also obtain a summary of the child's resource use if it wishes. This works if the parent outlive their children and are conscientious about calling `wait` so that the dead process can be disposed of. If a parent dies before its children, the kernel recognizes that no `wait` will come forth and adjusts the orphan processes to make them children of init or systemd, which performs the `wait` needed to get rid of them when they die.

## Signals

Signals are process level interrupt requests. When a signal is received, one of the following can happen:

If the receiving process has designated a handler routine for that particular signal, the handler is called with information about the context in which he signal was delivered. OTherwise, the kernel takes some default action on behalf of the process.

This default action differs from signal to signal. Some generate core dumps (a core dump is a copy of a process's memory image, which is sometimes useful for debugging).

Specifying a signal handler is referred to as catching the signal. When the handler completes, execution restarts from the point at which the signal was received.

To prevent signals from arriving, programs can request these signals either be ignored or blocked. An ignored signal is discarded and has no effect on the process. A blocked signal is queued for delivery but the kernel doesn't require the process to act on it until the signal has been explicitly unblocked. The handler for an unblocked signal is called only once, even if the signal was received several times while reception was blocked.

```sh
# kills a process by process id. signal is the number or symbolic name of the signal to be sent
kill [-signal] pid

# kills processes by name
sudo killall httpd

# searches for processes by an attribute and sends the specified signal
sudo pkill -u ben
```

The process can be suspended with a STOP signal and returned to active duty with a CONT signal. The state of being suspended or runnable applies to the process as a while and is inherited by all the processes' threads. Individual threads can in fact be managed similarly.

When runnable, threads must wait for the kernel to complete some background work for them before they can continue execution. E.g. when a thread reads data from a file, the kernel must request the appropriate disk blocks and then arrange for their contents to be delivered into the requesting process's address space. During this time, the requesting thread enters a short sleep state.

Sleeping is a thread-level attribute. When you see entire processes described as "sleeping", it means all its threads are asleep. A "sleeping" process is often describing a single-threaded process, where that single thread is sleeping.

A sleeping thread is effectively blocked until its requests has been satisfied so its process generally receives no CPU time unless it receives a signal or a response to one of its I/O requests.

Some operations can cause processes or threads to enter an uninterruptible sleep state. This state is usually transient and not observed in ps output. A few situations can cause it to persist. A common cause involves server problems on an NFS filesystem mounted with the hard option. Processes in the uninterruptible sleep state cannot be roused even to service a signal, they cannot be killed. To rid them you must fix the underlying problem or reboot.

## zombie processes

these processes have finished executing but have not yet had their status collected by their parent process (or by init/systemd). If you see zombies hanging around, check their PPIDs with `ps` to find out where they are from.
