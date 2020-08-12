# Filesystem in User Space (FUSE)

- allows filesystems to be implemented by a user program. This means that users can implement arbitrary functionality for filesystem calls.
- For example, FUSE can be used so whenever you perform an operation in a virtual filesystem, that operation is forwarded through SSH to a remote machine, performed there, and the output is returned back to you. This way, local programs can see the file as if it was in your computer while in reality it’s in a remote server.
  - This is effectively what sshfs does.
