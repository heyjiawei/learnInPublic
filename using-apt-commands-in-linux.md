1. Update package database with apt
apt worlks on a database of available packages. If the database is not updated, the system wouldn't know whether there are newer packages. Hence always update the repository first.

```
sudo apt update
```

Hit: There is no change in package version 
Ign: The package is being ignored. Either the package is way too recent that it doesn’t even bother to check or there was an error in retrieving the file but error was trivial and thus it is being ignored. Don’t worry, this is not an error.
Get: There is a new version available. It will download information about the version (kinda like the manifest, not the package itself)

2. Upgrade installed packages with apt
```
sudo apt upgrade
```

OR
```
sudo apt full-upgrade
```
full-upgrade works the same as upgrade except that if system upgrade needs the removal of a package that is already installed on the system, it will do that. Whereas, the normal upgrade command won’t do this.

3. Install new packages 
```
sudo apt install <package_name>
```

Installing multiple packages:
```
sudo apt install <package_1> <package_2> <package_3>
```

What if you run apt install on an already installed package?
This will just look into the database and if a newer version is found, it will upgrade the installed package to the newer one. So no harm is done by using it, unless you don’t want it to be upgraded.


Removing installed packages with apt:
```
sudo apt remove <package_name>
```

Uninstalling packages:
```
sudo apt purge <package_name>
```

- apt remove just removes the binaries of a package. It leaves residue configuration files.
	- If you used apt remove to a get rid of a particular software and then install it again, your software will have the same configuration files. Of course, you will be asked to override the existing configuration files when you install it again.
- apt purge removes everything related to a package including the configuration files.
	- Purge is useful when you have messed up with the configuration of a program. You want to completely erase its traces from the system and perhaps start afresh. 
	- You can use apt purge on an already removed package.

Searching for packages:
```
apt search <package name>
```

See the content of a package:
```
apt show <package name>
```
- This will show information about the given package(s) like its dependencies, installation and download size, different sources the package is available from, the description of the content of the package

Cleaning Ubuntu system
```
sudo apt autoremove
```
This command removes libs and packages that were installed automatically to satisfy the dependencies of an installed package. If the package is removed, these automatically installed packages, though useless, remains in the system.