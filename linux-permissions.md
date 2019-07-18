Permissions specify what a particular can do to a file/directory.

3 Types of permission:
r - read. You may only view the contents of the file
w - write. You may change the contents of the file
x - execute. YOu may execute or run the file if it is a program/script

3 sets of people whom we may specify permissions:
owner - a single person who owns the file. This is typically the person who created the file but ownershop may be granted to someone else.

group - every file belongs to a single group
others - everyone else who is not in the group and not the owner

To view permissions for a file, we use the long listing option for the command ls
```ls -l [path]```

The first 10 characters identify permissions
```
-rwxr----x
```
first char (- or d). d refers to directory, - refers to normal file.
next 3 characters represent permission for owner
next 3 characters represent permission for group
next 3 characters represent permission for others

```chmod``` permission arguments are made up of 3 components
Who are we changing the permission for:
[ugoa] - user (aka owner), group, others, all

Are we granting or revoking the permission:
(+) to grant, - to revoke

Which permission are we setting:
read (r), write (w) or execute (x)

While we may remove these permissions, we may not remove our ability to set those permissions.
This means, if we remove our ability to read, write and execute that file, we can still add those back.

As such, we always have control over every file under our ownership.


### Permissions for directories:

r - you have the ability to read the contents of the directory (ie do an ls)
w - you have the ability to write into the directory (ie create files and directories)
x - you have the ability to enter that directory (ie cd)

**Remember that remember directory permissions are for the directory itself, not the files within**

So, you may have a directory you don't have read permission for, but it may have files within that you have read permission for.

Therefore, as long as you know the file exists and it's name, you can still read the file!

In a Linux system, only 2 people can change the permissions of a file or directory. The owner of the file/directory and the root user.

The root user is a superuser who is allowed to do anything and everything on the system. Typically the administrators of a system would be the only ones who have access to the root account and would use it to maintain the system. 

Typically normal users would mostly only have access to files and directories in their home directory and maybe a few others for the purposes of sharing and collaborating on work and this helps to maintain the security and stability of the system.

Normally, for optimal security, **you should not give either the group or others write access to your home directory**, but execute without read can come in handy sometimes. This allows people to get into your home directory but not allow them to see what is there. An example of when this is used is for personal web pages.

